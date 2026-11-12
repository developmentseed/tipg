"""tipg DuckDB collection models."""

import functools
import math
import re
import threading
from collections.abc import Generator, Iterator
from concurrent.futures import ThreadPoolExecutor
from contextlib import contextmanager
from typing import Any

import duckdb
import orjson
from cql2 import Expr
from morecantile import Tile, TileMatrixSet
from pydantic import ConfigDict, Field
from pyproj import CRS
from pyproj.exceptions import CRSError
from starlette.concurrency import run_in_threadpool

from ..collections import Collection, Column, Feature, ItemList, Srid, _quote_ident
from ..errors import (
    InvalidGeometryColumnName,
    InvalidLimit,
    InvalidPropertyName,
    QueryTimeout,
)
from ..logger import logger
from ..settings import FeaturesSettings, MVTSettings, TableConfig, TableSettings
from .settings import DuckDBCatalogSettings

mvt_settings = MVTSettings()
features_settings = FeaturesSettings()  # type: ignore [call-arg]

# Column types (as normalized in the catalog) ST_AsMVT can encode as-is.
# NOTE: `text` is not one of them: unknown DuckDB types (e.g STRUCT, MAP) are
# normalized to `text`, so they must be cast to VARCHAR.
_MVT_NATIVE_TYPES = frozenset({"real", "float8", "boolean", "json"})

# Integer types (as normalized in the catalog) → DuckDB type ST_AsMVT accepts.
# The normalized name may come from a type ST_AsMVT rejects (e.g. ``UINTEGER``
# is normalized to ``bigint``, ``TINYINT`` to ``smallint``), so always cast.
_MVT_INTEGER_CASTS = {
    "smallint": "INTEGER",
    "integer": "INTEGER",
    "bigint": "BIGINT",
}


# cql2 spatial predicates which imply that the bboxes of the geometries intersect
_BBOX_PREDICATES = frozenset(
    {
        "s_intersects",
        "s_equals",
        "s_touches",
        "s_within",
        "s_overlaps",
        "s_crosses",
        "s_contains",
    }
)


def _conjuncts(expr: Any) -> Iterator[Any]:
    """Terms of the top-level ``AND`` of a cql2-json expression."""
    if isinstance(expr, dict) and expr.get("op") == "and":
        for arg in expr.get("args") or []:
            yield from _conjuncts(arg)
    else:
        yield expr


def _coords_bounds(coords: Any) -> list[float] | None:
    """[xmin, ymin, xmax, ymax] of (nested) GeoJSON coordinates."""
    if not isinstance(coords, list) or not coords:
        return None

    # a position
    if all(isinstance(v, (int, float)) for v in coords):
        if len(coords) < 2:
            return None
        x, y = float(coords[0]), float(coords[1])
        return [x, y, x, y]

    bounds = [_coords_bounds(c) for c in coords]
    if any(b is None for b in bounds):
        return None

    return [
        min(b[0] for b in bounds),  # type: ignore [index]
        min(b[1] for b in bounds),  # type: ignore [index]
        max(b[2] for b in bounds),  # type: ignore [index]
        max(b[3] for b in bounds),  # type: ignore [index]
    ]


def _literal_bounds(literal: Any, srid: Srid) -> list[float] | None:
    """Bounds of a cql2-json geometry literal, in the column CRS (``srid``).

    Literals of columns not in EPSG:4326 are expected to be tagged with their
    CRS (``st_setcrs``, see ``DuckCollection._tag_geometry_literal``), other
    ones (e.g reprojected with ``st_transform``) are ignored.
    """
    if isinstance(literal, dict) and literal.get("op") == "st_setcrs":
        literal = (literal.get("args") or [None])[0]
    elif srid != 4326:
        return None

    if not isinstance(literal, dict):
        return None

    if bbox := literal.get("bbox"):
        if len(bbox) == 6:
            bbox = [bbox[0], bbox[1], bbox[3], bbox[4]]
        bounds = [float(v) for v in bbox] if len(bbox) == 4 else None

    elif literal.get("type") == "GeometryCollection":
        parts = [_literal_bounds(g, 4326) for g in literal.get("geometries") or []]
        if not parts or any(p is None for p in parts):
            return None
        bounds = _coords_bounds(
            [[p[0], p[1]] for p in parts] + [[p[2], p[3]] for p in parts]
        )  # type: ignore [index]

    else:
        bounds = _coords_bounds(literal.get("coordinates"))

    if bounds is None or not all(math.isfinite(v) for v in bounds):
        return None

    return bounds


def _quote_literal(value: str) -> str:
    """Quote a SQL string literal."""
    return "'" + value.replace("'", "''") + "'"


def _crs(srid: Srid) -> str:
    """DuckDB CRS identifier for an EPSG code (or a CRS definition, as is)."""
    if isinstance(srid, str):
        return srid
    return f"EPSG:{srid}"


def _crs_literal(srid: Srid) -> str:
    """Quoted DuckDB CRS identifier (SQL string literal)."""
    return _quote_literal(_crs(srid))


@contextmanager
def _interrupt_after(
    cursor: duckdb.DuckDBPyConnection,
    timeout: float | None,
) -> Generator[None]:
    """Interrupt the queries of ``cursor`` still running after ``timeout`` seconds.

    Raises ``QueryTimeout`` for interrupted queries. Interrupting a cursor
    after its query finished has no effect on its next queries.
    """
    if not timeout:
        yield
        return

    timer = threading.Timer(timeout, cursor.interrupt)
    timer.daemon = True
    timer.start()
    try:
        yield
    except duckdb.InterruptException as e:
        raise QueryTimeout(f"Query timeout: interrupted after {timeout}s") from e
    finally:
        timer.cancel()


class DuckCollection(Collection):
    """Model for DuckDB Table and View."""

    database: str
    dbschema: str = Field(alias="schema")

    # Reference to the (shared) DuckDB connection serving this collection.
    # Excluded from serialization and repr.
    connection: duckdb.DuckDBPyConnection = Field(exclude=True, repr=False)

    # GeoParquet bbox covering of geometry columns: column name → SQL
    # expression of its ``xmin``, ``ymin``, ``xmax`` and ``ymax`` columns.
    bbox_coverings: dict[str, dict[str, str]] = {}

    # Maximum duration (seconds) of items and tiles queries (no limit if None)
    query_timeout: float | None = None

    model_config = ConfigDict(arbitrary_types_allowed=True)

    @property
    def _qualified_name(self) -> str:
        """SQL-quoted ``"database"."schema"."table"`` identifier for this collection."""
        return ".".join(
            _quote_ident(p) for p in (self.database, self.dbschema, self.table)
        )

    def _tag_geometry_literal(self, geom: Any, srid: Srid) -> Any:
        """Tag a geometry literal with its CRS (DuckDB ``ST_SetCRS``)."""
        return {"op": "st_setcrs", "args": [geom, _crs(srid)]}

    def _reproject_geometry_literal(self, geom: Any, srid: Srid) -> Any:
        """Reproject a EPSG:4326 geometry literal to ``srid`` (DuckDB ``ST_Transform``)."""
        return {"op": "st_transform", "args": [geom, _crs(4326), _crs(srid)]}

    def _select_property_columns(self, properties: list[str] | None) -> list[str]:
        """Quoted column-name fragments for the property columns to SELECT."""
        return [_quote_ident(c) for c in self.columns(properties)]

    def _select_mvt_property_columns(self, properties: list[str] | None) -> list[str]:
        """Property columns to SELECT for MVT encoding.

        ``ST_AsMVT`` only supports boolean, integer, float and string values:
        decimals are cast to DOUBLE and other types to VARCHAR.
        """
        cols = []
        for name in self.columns(properties):
            col = self.get_column(name)
            q = _quote_ident(name)
            if col is None or col.type in _MVT_NATIVE_TYPES:
                cols.append(q)
            elif cast := _MVT_INTEGER_CASTS.get(col.type):
                cols.append(f"CAST({q} AS {cast}) AS {q}")
            elif col.type == "numeric":
                cols.append(f"CAST({q} AS DOUBLE) AS {q}")
            else:
                cols.append(f"CAST({q} AS VARCHAR) AS {q}")
        return cols

    def _select_id(self) -> str | None:
        """SQL fragment that selects the primary-key column as ``tipg_id``.

        Collections without primary key get their ids from the row position
        (see ``_run_features_queries``): a ``ROW_NUMBER()`` window would
        prevent DuckDB from skipping rows (``OFFSET``) cheaply.
        """
        if self.id_column:
            return f"{_quote_ident(self.id_column.name)} AS tipg_id"
        return None

    def _geom_expr(
        self,
        geometry_column: Column | None,
        bbox_only: bool | None,
        simplify: float | None,
    ) -> str | None:
        """Build the SQL expression for the geometry column (reprojected to
        4326 if needed, optionally bbox-only or simplified).
        """
        if geometry_column is None:
            return None

        g = _quote_ident(geometry_column.name)

        if geometry_column.srid != 4326:
            g = f"ST_Transform({g}, {_crs_literal(geometry_column.srid)}, {_crs_literal(4326)})"  # type: ignore [arg-type]

        if bbox_only:
            g = f"ST_Envelope({g})"
        elif simplify:
            s = float(simplify)
            g = f"ST_ReducePrecision(ST_SimplifyPreserveTopology({g}, {s}), {s})"

        return g

    def _select(
        self,
        properties: list[str] | None,
        geometry_column: Column | None,
        bbox_only: bool | None,
        simplify: float | None,
        geom_as_wkt: bool = False,
    ) -> str:
        """Build the SELECT clause for the main features query."""
        cols = self._select_property_columns(properties)
        if select_id := self._select_id():
            cols.append(select_id)

        geom = self._geom_expr(geometry_column, bbox_only, simplify)
        if geom_as_wkt:
            cols.append(
                f"'SRID=4326;' || ST_AsText({geom}) AS tipg_geom"
                if geom
                else "CAST(NULL AS VARCHAR) AS tipg_geom"
            )
        else:
            cols.append(
                f"ST_AsGeoJSON({geom}) AS tipg_geom"
                if geom
                else "CAST(NULL AS VARCHAR) AS tipg_geom"
            )

        return "SELECT " + ", ".join(cols)

    def _select_mvt(
        self,
        properties: list[str] | None,
        geometry_column: Column,
        tms: TileMatrixSet,
        tile: Tile,
        simplify: float | None = None,
    ) -> str:
        """Build the SELECT clause that emits an MVT geometry per row."""
        cols = self._select_mvt_property_columns(properties)

        geom = _quote_ident(geometry_column.name)
        src_crs = _crs(geometry_column.srid)  # type: ignore [arg-type]

        if simplify:
            geom = f"ST_ReducePrecision(ST_SimplifyPreserveTopology({geom}, {simplify}), {simplify})"

        # For tiles outside the TMS's natural domain, clip the geometry to the
        # TMS's geographic bbox before reprojecting (see PgCollection._select_mvt).
        if not tms.is_valid(tile, strict=False):
            west, south, east, north = tms.bbox
            geo_crs = _crs(tms.geographic_crs.to_epsg() or 4326)
            geom = (
                f"ST_Intersection("
                f"ST_MakeEnvelope({west}, {south}, {east}, {north}), "
                f"ST_Transform({geom}, {_quote_literal(src_crs)}, {_quote_literal(geo_crs)})"
                f")"
            )
            src_crs = geo_crs

        # Reproject to TMS CRS — prefer EPSG code, fall back to PROJ string.
        if tms_srid := tms.crs.to_epsg():
            tms_crs = _crs(tms_srid)
        else:
            tms_crs = tms.crs.to_proj4()

        transformed = f"ST_Transform({geom}, {_quote_literal(src_crs)}, {_quote_literal(tms_crs)})"

        bbox = tms.xy_bounds(tile)
        envelope = f"ST_Extent(ST_MakeEnvelope({bbox.left}, {bbox.bottom}, {bbox.right}, {bbox.top}))"
        cols.append(
            f"ST_AsMVTGeom("
            f"{transformed}, {envelope}, "
            f"{int(mvt_settings.tile_resolution)}, "
            f"{int(mvt_settings.tile_buffer)}, "
            f"{'TRUE' if mvt_settings.tile_clip else 'FALSE'}"
            f") AS geom"
        )

        return "SELECT " + ", ".join(cols)

    def _from(self) -> str:
        """Build the FROM clause."""
        return f"FROM {self._qualified_name}"

    def _sort_expressions(self, sortby: str | None) -> list[tuple[str, str]]:
        """Parse ``sortby`` into ``(column name, SQL fragment)`` pairs.

        Without ``sortby``, no sort is applied: sorting means a full scan of
        the sort column, and DuckDB preserves the insertion order
        (``preserve_insertion_order``), so paging stays stable without it.
        """
        sorts: list[tuple[str, str]] = []
        if not sortby:
            return sorts

        for s in sortby.strip().split(","):
            parts = re.match("^(?P<direction>[+-]?)(?P<column>.*)$", s).groupdict()  # type:ignore

            direction = parts["direction"]
            column = parts["column"].strip()
            if not self.get_column(column):
                raise InvalidPropertyName(f"Property {column} does not exist.")
            col_sql = _quote_ident(column)
            sorts.append((column, f"{col_sql} DESC" if direction == "-" else col_sql))

        return sorts

    def _sortby(self, sortby: str | None) -> str:
        """Build the ORDER BY clause (empty without ``sortby``)."""
        if sorts := self._sort_expressions(sortby):
            return "ORDER BY " + ", ".join(sql for _, sql in sorts)
        return ""

    def _bbox_covering_filter(self, where: Expr) -> str | None:
        """SQL filter on the GeoParquet bbox covering columns.

        For each spatial predicate (e.g the `bbox` or tile filters) between a
        geometry column with a bbox covering and a geometry literal, which is
        part of the top-level ``AND`` of ``where``, filter the covering
        columns with the bounds of the literal. DuckDB uses the row group
        statistics of those columns to skip reading most of the file.
        """
        if not self.bbox_coverings:
            return None

        filters = []
        for expr in _conjuncts(where.to_json()):
            if not isinstance(expr, dict) or expr.get("op") not in _BBOX_PREDICATES:
                continue

            args = expr.get("args") or []
            if len(args) != 2:
                continue

            for prop, literal in (args, args[::-1]):
                if not isinstance(prop, dict) or "property" not in prop:
                    continue

                name = prop["property"]
                covering = self.bbox_coverings.get(name)
                column = self.get_column(name)
                if not covering or not column:
                    continue

                if bounds := _literal_bounds(literal, column.srid or 4326):
                    xmin, ymin, xmax, ymax = bounds
                    filters.append(
                        f"{covering['xmin']} <= {xmax!r} AND {covering['xmax']} >= {xmin!r} "
                        f"AND {covering['ymin']} <= {ymax!r} AND {covering['ymax']} >= {ymin!r}"
                    )
                break

        return " AND ".join(filters) or None

    def _where_clause(self, where: Expr | None) -> str:
        """Render a cql2 ``Expr`` (or ``None``) as a WHERE clause."""
        if where is None:
            return "WHERE TRUE"

        sql = where.to_sql()
        if covering := self._bbox_covering_filter(where):
            sql = f"{covering} AND ({sql})"

        return f"WHERE {sql}"

    def _row_to_feature(
        self, row: dict[str, Any], geom_as_wkt: bool, position: int
    ) -> Feature:
        """Convert a result row to a Feature.

        ``position`` (1-based row position in the matched features) is used as
        id for collections without primary key.
        """
        g = row.pop("tipg_geom")
        id = row.pop("tipg_id", position)
        if g is not None and not geom_as_wkt:
            g = orjson.loads(g)

        # JSON columns are returned as strings
        for name, value in row.items():
            if isinstance(value, str) and (col := self.get_column(name)):
                if col.type == "json":
                    row[name] = orjson.loads(value)

        return Feature(type="Feature", geometry=g, id=id, properties=row)

    def _run_features_queries(
        self,
        count_sql: str | None,
        sql: str,
        geom_as_wkt: bool,
        offset: int,
        limit: int,
    ) -> tuple[int | None, list[Feature], bool]:
        """Run the COUNT (if any) and Features queries (blocking).

        ``sql`` must select up to ``limit + 1`` rows: the extra row tells if
        there are more features. Returns ``(matched, features, has_more)``.
        """
        cursor = self.connection.cursor()
        try:
            with _interrupt_after(cursor, self.query_timeout):
                matched = None
                if count_sql:
                    logger.debug(count_sql)
                    matched = cursor.execute(count_sql).fetchone()[0]  # type: ignore [index]

                logger.debug(sql)
                cursor.execute(sql)
                names = [d[0] for d in cursor.description]  # type: ignore [union-attr]
                rows = cursor.fetchall()
        finally:
            cursor.close()

        features = [
            self._row_to_feature(dict(zip(names, r)), geom_as_wkt, offset + i)
            for i, r in enumerate(rows[:limit], start=1)
        ]

        return matched, features, len(rows) > limit

    def _run_tile_query(self, sql: str, layer: str) -> bytes:
        """Run the MVT query (blocking)."""
        cursor = self.connection.cursor()
        try:
            with _interrupt_after(cursor, self.query_timeout):
                logger.debug(sql)
                tile = cursor.execute(sql, [layer]).fetchone()[0]  # type: ignore [index]
        finally:
            cursor.close()

        return bytes(tile) if tile is not None else b""

    async def features(
        self,
        *,
        ids_filter: list[str] | None = None,
        bbox_filter: list[float] | None = None,
        datetime_filter: list[str] | None = None,
        properties_filter: list[tuple[str, str]] | None = None,
        cql_filter: Expr | None = None,
        sortby: str | None = None,
        properties: list[str] | None = None,
        geom: str | None = None,
        dt: str | None = None,
        limit: int | None = None,
        offset: int | None = None,
        bbox_only: bool | None = None,
        simplify: float | None = None,
        geom_as_wkt: bool = False,
        **kwargs: Any,
    ) -> ItemList:
        """Build and run DuckDB query."""
        limit = limit or features_settings.default_features_limit
        offset = offset or 0

        if geom and geom.lower() != "none" and not self.get_geometry_column(geom):
            raise InvalidGeometryColumnName(f"Invalid Geometry Column: {geom}.")

        if limit and limit > features_settings.max_features_per_query:
            raise InvalidLimit(
                f"Limit can not be set higher than the `tipg_max_features_per_query` setting of {features_settings.max_features_per_query}"
            )

        where_filter = self.cql_where(
            ids=ids_filter,
            datetime=datetime_filter,
            bbox=bbox_filter,
            properties=properties_filter,
            cql=cql_filter,
            geom=geom,
            dt=dt,
        )
        where = self._where_clause(where_filter)

        # Without filter, DuckDB answers COUNT(*) from the table/file metadata.
        # With a filter it is a full scan (while the features query can stop
        # after `limit` rows), so `numberMatched` is not returned.
        count_sql = None
        if where_filter is None:
            count_sql = " ".join(["SELECT COUNT(*)", self._from()])

        sql = " ".join(
            [
                self._select(
                    properties=properties,
                    geometry_column=self.get_geometry_column(geom),
                    bbox_only=bbox_only,
                    simplify=simplify,
                    geom_as_wkt=geom_as_wkt,
                ),
                self._from(),
                where,
                self._sortby(sortby),
                f"LIMIT {int(limit) + 1}",
                f"OFFSET {int(offset)}",
            ]
        )

        matched, features, has_more = await run_in_threadpool(
            self._run_features_queries, count_sql, sql, geom_as_wkt, offset, limit
        )
        returned = len(features)

        return ItemList(
            items=features,
            matched=matched,
            next=offset + returned if has_more else None,
            prev=max(offset - limit, 0) if offset else None,
        )

    async def get_tile(
        self,
        *,
        tms: TileMatrixSet,
        tile: Tile,
        ids_filter: list[str] | None = None,
        bbox_filter: list[float] | None = None,
        datetime_filter: list[str] | None = None,
        properties_filter: list[tuple[str, str]] | None = None,
        cql_filter: Expr | None = None,
        sortby: str | None = None,
        properties: list[str] | None = None,
        geom: str | None = None,
        dt: str | None = None,
        limit: int | None = None,
        simplify: float | None = None,
        **kwargs: Any,
    ) -> bytes:
        """Build query to get Vector Tile."""
        limit = limit or mvt_settings.max_features_per_tile

        geometry_column = self.get_geometry_column(geom)
        if not geometry_column:
            raise InvalidGeometryColumnName(f"Invalid Geometry Column Name {geom}")

        if limit > mvt_settings.max_features_per_tile:
            raise InvalidLimit(
                f"Limit can not be set higher than the `tipg_max_features_per_tile` setting of {mvt_settings.max_features_per_tile}"
            )

        where_filter = self.cql_where(
            ids=ids_filter,
            datetime=datetime_filter,
            bbox=bbox_filter,
            properties=properties_filter,
            cql=cql_filter,
            geom=geom,
            dt=dt,
            tms=tms,
            tile=tile,
        )

        sorts = self._sort_expressions(sortby)
        order_by = self._sortby(sortby)

        inner_sql = " ".join(
            [
                self._select_mvt(
                    properties=properties,
                    geometry_column=geometry_column,
                    tms=tms,
                    tile=tile,
                    simplify=simplify,
                ),
                self._from(),
                self._where_clause(where_filter),
                order_by,
                f"LIMIT {int(limit)}",
            ]
        )

        # Only an ORDER BY inside the aggregate guarantees the feature order
        # in the tile. It can only reference columns of ``t``, so an explicit
        # sort column must be projected.
        aggregate_order = ""
        if sortby:
            selected = self.columns(properties)
            if missing := [col for col, _ in sorts if col not in selected]:
                raise InvalidPropertyName(
                    f"Cannot sort by {', '.join(missing)}: not in the selected `properties`."
                )
            aggregate_order = f" {order_by}"

        layer = self.table if mvt_settings.set_mvt_layername is True else "default"
        sql = f"WITH t AS ({inner_sql}) SELECT ST_AsMVT(t, $1{aggregate_order}) FROM t"

        return await run_in_threadpool(self._run_tile_query, sql, layer)


_DUCK_TYPES = {
    "BOOLEAN": "boolean",
    "TINYINT": "smallint",
    "SMALLINT": "smallint",
    "UTINYINT": "smallint",
    "INTEGER": "integer",
    "USMALLINT": "integer",
    "BIGINT": "bigint",
    "UINTEGER": "bigint",
    "UBIGINT": "numeric",
    "HUGEINT": "numeric",
    "UHUGEINT": "numeric",
    "FLOAT": "real",
    "DOUBLE": "float8",
    "DATE": "date",
    "TIMESTAMP": "timestamp",
    "TIMESTAMP_S": "timestamp",
    "TIMESTAMP_MS": "timestamp",
    "TIMESTAMP_NS": "timestamp",
    "TIMESTAMP WITH TIME ZONE": "timestamptz",
    "JSON": "json",
}

# ST_GeometryType values → PostGIS-style geometry type names
_GEOMETRY_TYPES = {
    "POINT": "Point",
    "LINESTRING": "LineString",
    "POLYGON": "Polygon",
    "MULTIPOINT": "MultiPoint",
    "MULTILINESTRING": "MultiLineString",
    "MULTIPOLYGON": "MultiPolygon",
    "GEOMETRYCOLLECTION": "GeometryCollection",
}

_GEOMETRY_CRS = re.compile(r"^GEOMETRY\('(?P<crs>[^']+)'\)$", re.IGNORECASE)


def _normalize_type(data_type: str) -> str:
    """Map a DuckDB type name to the type names `tipg.collections.Column` understands."""
    t = data_type.upper()
    if t == "GEOMETRY" or _GEOMETRY_CRS.match(t):
        return "geometry"

    if t.endswith("[]"):
        return _normalize_type(data_type[:-2]) + "[]"

    if t.startswith("DECIMAL"):
        return "numeric"

    return _DUCK_TYPES.get(t, "text")


@functools.lru_cache(maxsize=256)
def _parse_crs(crs: str) -> Srid | None:
    """EPSG code of a CRS definition when it is exactly an EPSG CRS, else the
    definition itself (``None`` if it can't be parsed by pyproj).
    """
    try:
        authority = CRS.from_user_input(crs).to_authority(min_confidence=100)
    except CRSError:
        return None

    if authority:
        auth, code = authority
        if auth == "EPSG" and code.isdigit():
            return int(code)
        if (auth, code) == ("OGC", "CRS84"):
            return 4326

    return crs


def _geometry_srid(data_type: str) -> Srid:
    """CRS of a geometry column, from its type (e.g `GEOMETRY('EPSG:26915')`).

    Returns the EPSG code (geometries without CRS, or in OGC:CRS84, are
    assumed to be in EPSG:4326), or the CRS definition (e.g PROJJSON from
    GeoParquet metadata, or `AUTH:CODE`) for CRS without EPSG code.
    """
    if m := _GEOMETRY_CRS.match(data_type):
        crs = m.group("crs")
        auth, _, code = crs.partition(":")
        if auth.upper() == "EPSG" and code.isdigit():
            return int(code)

        if crs.upper() in ("OGC:CRS84", "CRS84"):
            return 4326

        if (srid := _parse_crs(crs)) is not None:
            return srid

        logger.warning(f"Unsupported geometry CRS {crs[:100]}, assuming EPSG:4326")

    return 4326


_PARQUET_VIEW = re.compile(
    r"^CREATE VIEW .+? AS SELECT \* FROM read_parquet\('(?P<path>(?:[^']|'')*)'"
    r"(?P<row_number>, \(file_row_number = true\))?\);?$",
    re.DOTALL | re.IGNORECASE,
)

# Column added by `read_parquet(..., file_row_number = true)`
FILE_ROW_NUMBER = "file_row_number"


def _parquet_view_source(view_sql: str | None) -> tuple[str, bool] | None:
    """Path (or glob) of a view defined as ``SELECT * FROM read_parquet('<path>')``
    and whether the ``file_row_number`` option is set (as done for file sources,
    see ``tipg.duck.database``).
    """
    if view_sql and (m := _PARQUET_VIEW.match(view_sql.strip())):
        return m.group("path").replace("''", "'"), bool(m.group("row_number"))

    return None


_COVERING_KEYS = ("xmin", "ymin", "xmax", "ymax")


def _parse_covering(meta: dict[str, Any]) -> dict[str, str] | None:
    """SQL expressions of a GeoParquet bbox covering (e.g ``"bbox"."xmin"``).

    Returns ``None`` without bbox covering, and an empty dict for a malformed
    one (rejected by ``_valid_covering``).
    """
    covering = (meta.get("covering") or {}).get("bbox")
    if covering is None:
        return None

    if not isinstance(covering, dict):
        return {}

    exprs = {}
    for key in _COVERING_KEYS:
        path = covering.get(key)
        if (
            not path
            or not isinstance(path, list)
            or not all(isinstance(p, str) for p in path)
        ):
            return {}
        exprs[key] = ".".join(_quote_ident(p) for p in path)

    return exprs


def _valid_covering(
    cursor: duckdb.DuckDBPyConnection,
    covering: dict[str, str],
    column_types: dict[str, str],
) -> bool:
    """Check that a bbox covering matches the actual column types.

    GeoParquet metadata can be wrong (e.g. a covering pointing to
    ``bbox.xmin`` while the struct fields are ``min_x``...). The covering
    expressions are bound against typed NULL values, so no data is read.
    """
    if any(key not in covering for key in _COVERING_KEYS):
        return False

    # only bind the columns the covering refers to (e.g. `"bbox"` for `"bbox"."xmin"`)
    exprs = [covering[key] for key in _COVERING_KEYS]
    referenced = {
        name: column_types[name] for name in _covering_columns(covering, column_types)
    }
    if not referenced:
        return False

    columns = ", ".join(
        f"NULL::{dtype} AS {_quote_ident(name)}" for name, dtype in referenced.items()
    )
    try:
        cursor.execute(f"SELECT {', '.join(exprs)} FROM (SELECT {columns}) LIMIT 0")
    except duckdb.Error:
        return False

    return True


def _covering_columns(
    covering: dict[str, str],
    column_types: dict[str, str],
) -> list[str]:
    """Names of the columns a bbox covering refers to."""
    exprs = [covering[key] for key in _COVERING_KEYS]
    return [
        name
        for name in column_types
        if any(e == (q := _quote_ident(name)) or e.startswith(f"{q}.") for e in exprs)
    ]


def _parse_geo_metadata(geo: str) -> dict[str, dict[str, Any]]:
    """Bbox, geometry types and bbox covering per column, from a GeoParquet
    ``geo`` metadata value (each one is ``None`` when unknown).
    """
    columns: dict[str, dict[str, Any]] = {}
    for name, meta in orjson.loads(geo).get("columns", {}).items():
        bbox = meta.get("bbox")
        if not bbox or len(bbox) not in (4, 6):
            bbox = None
        # 3D bbox: [xmin, ymin, zmin, xmax, ymax, zmax]
        elif len(bbox) == 6:
            bbox = [bbox[0], bbox[1], bbox[3], bbox[4]]

        types = meta.get("geometry_types")
        columns[name] = {
            "bbox": [float(v) for v in bbox] if bbox else None,
            "geometry_types": set(types) if types and bbox else None,
            "covering": _parse_covering(meta),
        }

    return columns


def _merge_geo_metadata(col: dict[str, Any], other: dict[str, Any]) -> None:
    """Merge the GeoParquet metadata of a column from another file (in place)."""
    if col["bbox"] is None or other["bbox"] is None:
        col["bbox"] = None
        col["geometry_types"] = None
    else:
        col["bbox"] = [
            min(col["bbox"][0], other["bbox"][0]),
            min(col["bbox"][1], other["bbox"][1]),
            max(col["bbox"][2], other["bbox"][2]),
            max(col["bbox"][3], other["bbox"][3]),
        ]
        if col["geometry_types"] is None or other["geometry_types"] is None:
            col["geometry_types"] = None
        else:
            col["geometry_types"] |= other["geometry_types"]

    # a malformed covering (empty dict) in any file invalidates the source
    if col["covering"] == {} or other["covering"] == {}:
        col["covering"] = {}
    elif col["covering"] != other["covering"]:
        col["covering"] = None


def _geoparquet_metadata(
    cursor: duckdb.DuckDBPyConnection,
    path: str,
) -> dict[str, dict[str, Any]]:
    """Bbox, geometry types and bbox covering of geometry columns, from
    GeoParquet metadata.

    Only the file footers are read. For multiple files (glob), the metadata
    is merged: a column is only returned when every file describes it, its
    bbox (and geometry types) is ``None`` when one file has no bbox and its
    covering is ``None`` when files have different coverings.
    """
    try:
        nfiles = cursor.execute("SELECT count(*) FROM glob($1)", [path]).fetchone()[0]  # type: ignore [index]
        rows = cursor.execute(
            """
            SELECT max(decode(value)) FILTER (WHERE decode(key) = 'geo')
            FROM parquet_kv_metadata($1)
            GROUP BY file_name
            """,
            [path],
        ).fetchall()
    except duckdb.Error as e:
        logger.debug(f"Could not read GeoParquet metadata of {path}: {e}")
        return {}

    # files without any key/value metadata are not listed by `parquet_kv_metadata`
    if not rows or len(rows) != nfiles or any(geo is None for (geo,) in rows):
        return {}

    merged: dict[str, dict[str, Any]] | None = None
    for (geo,) in rows:
        file_columns = _parse_geo_metadata(geo)
        if merged is None:
            merged = file_columns
            continue

        for name in list(merged):
            if (other := file_columns.get(name)) is None:
                del merged[name]
            else:
                _merge_geo_metadata(merged[name], other)

    return merged or {}


def _geoparquet_metadatas(
    connection: duckdb.DuckDBPyConnection,
    paths: set[str],
    max_workers: int,
) -> dict[str, dict[str, dict[str, Any]]]:
    """GeoParquet metadata of multiple parquet sources, read in parallel.

    Each worker uses its own cursor (DuckDB cursors can run queries
    concurrently on the same database instance).
    """

    def _read(path: str) -> dict[str, dict[str, Any]]:
        cursor = connection.cursor()
        try:
            return _geoparquet_metadata(cursor, path)
        finally:
            cursor.close()

    if not paths:
        return {}

    paths_list = sorted(paths)
    with ThreadPoolExecutor(
        max_workers=max(1, min(max_workers, len(paths_list)))
    ) as pool:
        return dict(zip(paths_list, pool.map(_read, paths_list)))


def _apply_geo_metadata(
    cursor: duckdb.DuckDBPyConnection,
    column: dict[str, Any],
    meta: dict[str, Any],
) -> None:
    """Set a geometry column bounds (in EPSG:4326) and type from GeoParquet metadata."""
    xmin, ymin, xmax, ymax = meta["bbox"]
    if column["srid"] != 4326:
        env = f"ST_Transform(ST_MakeEnvelope($1, $2, $3, $4), {_crs_literal(column['srid'])}, {_crs_literal(4326)})"
        xmin, ymin, xmax, ymax = cursor.execute(
            f"SELECT ST_XMin(e), ST_YMin(e), ST_XMax(e), ST_YMax(e) FROM (SELECT {env} AS e)",
            [xmin, ymin, xmax, ymax],
        ).fetchone()  # type: ignore [misc]

    column["bounds"] = [xmin, ymin, xmax, ymax]

    # e.g. "Polygon Z" -> "POLYGON"
    if types := meta["geometry_types"]:
        base_types = {t.split()[0].upper() for t in types}
        if len(base_types) == 1:
            column["geometry_type"] = _GEOMETRY_TYPES.get(base_types.pop(), "Geometry")


def _geometry_metadata(
    cursor: duckdb.DuckDBPyConnection,
    columns: list[dict[str, Any]],
    geo_metadata: dict[str, dict[str, Any]],
) -> None:
    """Add geometry type and bounds to the geometry columns (in place).

    Rows are never scanned: bounds and type only come from ``geo_metadata``
    (GeoParquet file metadata). Other geometry columns have no bounds and a
    generic ``Geometry`` type.
    """
    for c in columns:
        if c["type"] == "geometry":
            c["geometry_type"] = "Geometry"
            if (meta := geo_metadata.get(c["name"])) and meta["bbox"]:
                _apply_geo_metadata(cursor, c, meta)


def _collection_index(  # noqa: C901
    connection: duckdb.DuckDBPyConnection,
    settings: DuckDBCatalogSettings,
) -> list[Collection]:
    """Fetch Tables and Views index (blocking)."""
    cursor = connection.cursor()
    try:
        relations = cursor.execute(
            """
            SELECT database_name, schema_name, table_name, 'Table', comment, NULL
            FROM duckdb_tables()
            WHERE NOT internal AND NOT temporary
            UNION ALL
            SELECT database_name, schema_name, view_name, 'View', comment, sql
            FROM duckdb_views()
            WHERE NOT internal AND NOT temporary
            ORDER BY 1, 2, 3
            """
        ).fetchall()

        columns_rows = cursor.execute(
            """
            SELECT database_name, schema_name, table_name, column_name, data_type, comment
            FROM duckdb_columns()
            WHERE NOT internal
            ORDER BY database_name, schema_name, table_name, column_index
            """
        ).fetchall()

        pk_rows = cursor.execute(
            """
            SELECT database_name, schema_name, table_name, constraint_column_names
            FROM duckdb_constraints()
            WHERE constraint_type = 'PRIMARY KEY'
            """
        ).fetchall()

        table_columns: dict[tuple[str, str, str], list[dict[str, Any]]] = {}
        # raw DuckDB column types, used to validate GeoParquet bbox coverings
        table_types: dict[tuple[str, str, str], dict[str, str]] = {}
        for db, schema, table, name, data_type, comment in columns_rows:
            table_types.setdefault((db, schema, table), {})[name] = data_type
            col: dict[str, Any] = {
                "name": name,
                "type": _normalize_type(data_type),
                "description": comment,
            }
            if col["type"] == "geometry":
                col["srid"] = _geometry_srid(data_type)
            table_columns.setdefault((db, schema, table), []).append(col)

        pks = {
            (db, schema, table): names[0]
            for db, schema, table, names in pk_rows
            if len(names) == 1
        }

        table_settings = TableSettings()
        table_confs = table_settings.table_config
        fallback_key_names = table_settings.fallback_key_names

        # Select the relations to expose
        selected: dict[str, tuple[Any, ...]] = {}
        for db, schema, table, entity, comment, view_sql in relations:
            if schema not in settings.schemas:
                continue

            table_id = f"{schema}.{table}"
            if settings.tables is not None and table_id not in settings.tables:
                continue

            if settings.exclude_tables and table_id in settings.exclude_tables:
                continue

            if table_id in selected:
                logger.warning(
                    f"Collection {table_id} already registered, skipping `{db}`.{table_id}"
                )
                continue

            columns = table_columns.get((db, schema, table), [])
            if settings.only_spatial_tables and not any(
                c["type"] == "geometry" for c in columns
            ):
                continue

            selected[table_id] = (
                db,
                schema,
                table,
                entity,
                comment,
                columns,
                _parquet_view_source(view_sql),
            )

        # Read the GeoParquet metadata of parquet views, in parallel (one
        # footer request per file, which adds up for many remote files)
        geo_metadatas: dict[str, dict[str, dict[str, Any]]] = {}
        if settings.spatial_extent:
            geo_metadatas = _geoparquet_metadatas(
                connection,
                {src[0] for *_, src in selected.values() if src},
                settings.metadata_threads,
            )

        collections: dict[str, Collection] = {}
        for table_id, (
            db,
            schema,
            table,
            entity,
            comment,
            columns,
            parquet_source,
        ) in selected.items():
            geo_metadata = (
                geo_metadatas.get(parquet_source[0], {}) if parquet_source else {}
            )
            # GeoParquet bbox coverings: sources with a covering which doesn't
            # follow the spec (e.g. pointing to missing struct fields) are excluded
            bbox_coverings = {
                name: meta["covering"]
                for name, meta in geo_metadata.items()
                if meta["covering"] is not None
            }
            types = table_types.get((db, schema, table), {})
            if invalid := [
                name
                for name, covering in bbox_coverings.items()
                if not _valid_covering(cursor, covering, types)
            ]:
                logger.warning(
                    f"Collection {table_id} excluded: invalid GeoParquet bbox "
                    f"covering for column(s) {invalid} "
                    f"({ {n: bbox_coverings[n] for n in invalid} })"
                )
                continue

            _geometry_metadata(cursor, columns, geo_metadata)

            table_conf = table_confs.get(f"{schema}_{table}", TableConfig())

            if table_settings.sort_columns:
                columns = sorted(columns, key=lambda d: d["name"])

            cols = [Column(**c) for c in columns]
            properties_setting = table_conf.properties or [c.name for c in cols]

            # ID Column
            id_column = None
            if id_name := table_conf.pk or pks.get((db, schema, table)):
                for column in cols:
                    if id_name == column.name:
                        id_column = column
                        break

            if id_column is None and fallback_key_names:
                for column in cols:
                    if column.name in fallback_key_names:
                        id_column = column
                        break

            # Parquet file source: row position in the file
            if id_column is None and parquet_source and parquet_source[1]:
                for column in cols:
                    if column.name == FILE_ROW_NUMBER:
                        id_column = column
                        break

            datetime_column = None
            geometry_column = None
            for column in cols:
                if column.is_datetime:
                    if table_conf.datetimecol == column.name or datetime_column is None:
                        datetime_column = column

                if column.is_geometry:
                    if table_conf.geomcol == column.name or geometry_column is None:
                        geometry_column = column

            collections[table_id] = DuckCollection(
                type=entity,
                id=table_id,
                table=table,
                database=db,
                schema=schema,
                description=comment,
                table_columns=cols,
                properties=[c for c in cols if c.name in properties_setting],
                id_column=id_column,
                datetime_column=datetime_column,
                geometry_column=geometry_column,
                bbox_coverings=bbox_coverings,
                query_timeout=settings.query_timeout,
                connection=connection,
            )

    finally:
        cursor.close()

    return list(collections.values())


async def duck_get_collection_index(
    *,
    connection: duckdb.DuckDBPyConnection,
    settings: DuckDBCatalogSettings | None = None,
) -> list[Collection]:
    """Fetch Tables and Views index."""
    return await run_in_threadpool(
        _collection_index, connection, settings or DuckDBCatalogSettings()
    )
