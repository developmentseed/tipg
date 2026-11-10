"""tipg DuckDB collection models."""

import re
from typing import Any

import duckdb
import orjson
from cql2 import Expr
from morecantile import Tile, TileMatrixSet
from pydantic import ConfigDict, Field
from starlette.concurrency import run_in_threadpool

from ..collections import Collection, Column, Feature, ItemList, _quote_ident
from ..errors import InvalidGeometryColumnName, InvalidLimit, InvalidPropertyName
from ..logger import logger
from ..settings import FeaturesSettings, MVTSettings

mvt_settings = MVTSettings()
features_settings = FeaturesSettings()  # type: ignore [call-arg]

# Column types (as normalized in the catalog) ST_AsMVT can encode as-is
_MVT_NATIVE_TYPES = frozenset(
    {
        "smallint",
        "integer",
        "bigint",
        "real",
        "float8",
        "boolean",
        "text",
        "json",
    }
)


def _quote_literal(value: str) -> str:
    """Quote a SQL string literal."""
    return "'" + value.replace("'", "''") + "'"


def _crs(srid: int) -> str:
    """DuckDB CRS identifier for an EPSG code."""
    return f"EPSG:{srid}"


class DuckCollection(Collection):
    """Model for DuckDB Table and View."""

    database: str
    dbschema: str = Field(alias="schema")

    # Reference to the (shared) DuckDB connection serving this collection.
    # Excluded from serialization and repr.
    connection: duckdb.DuckDBPyConnection = Field(exclude=True, repr=False)

    model_config = ConfigDict(arbitrary_types_allowed=True)

    @property
    def _qualified_name(self) -> str:
        """SQL-quoted ``"database"."schema"."table"`` identifier for this collection."""
        return ".".join(
            _quote_ident(p) for p in (self.database, self.dbschema, self.table)
        )

    def _tag_geometry_literal(self, geom: Any, srid: int) -> Any:
        """Tag a geometry literal with its CRS (DuckDB ``ST_SetCRS``)."""
        return {"op": "st_setcrs", "args": [geom, _crs(srid)]}

    def _reproject_geometry_literal(self, geom: Any, srid: int) -> Any:
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
            elif col.type == "numeric":
                cols.append(f"CAST({q} AS DOUBLE) AS {q}")
            else:
                cols.append(f"CAST({q} AS VARCHAR) AS {q}")
        return cols

    def _select_id(self) -> str:
        """SQL fragment that selects the primary-key column as ``tipg_id``.

        Falls back to ``ROW_NUMBER()`` when the collection has no primary key.
        """
        if self.id_column:
            return f"{_quote_ident(self.id_column.name)} AS tipg_id"
        return "ROW_NUMBER() OVER () AS tipg_id"

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
            g = f"ST_Transform({g}, '{_crs(geometry_column.srid)}', '{_crs(4326)}')"  # type: ignore [arg-type]

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
        cols.append(self._select_id())

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
                f"ST_Transform({geom}, '{src_crs}', '{geo_crs}')"
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
        """Parse ``sortby`` into ``(column name, SQL fragment)`` pairs."""
        if sortby:
            sorts = []
            for s in sortby.strip().split(","):
                parts = re.match("^(?P<direction>[+-]?)(?P<column>.*)$", s).groupdict()  # type:ignore

                direction = parts["direction"]
                column = parts["column"].strip()
                if not self.get_column(column):
                    raise InvalidPropertyName(f"Property {column} does not exist.")
                col_sql = _quote_ident(column)
                sorts.append(
                    (column, f"{col_sql} DESC" if direction == "-" else col_sql)
                )
            return sorts

        if self.id_column is not None:
            column = self.id_column.name
        else:
            column = self.properties[0].name

        return [(column, _quote_ident(column))]

    def _sortby(self, sortby: str | None) -> str:
        """Build the ORDER BY clause."""
        return "ORDER BY " + ", ".join(sql for _, sql in self._sort_expressions(sortby))

    @staticmethod
    def _where_clause(where: Expr | None) -> str:
        """Render a cql2 ``Expr`` (or ``None``) as a WHERE clause."""
        if where is None:
            return "WHERE TRUE"
        return f"WHERE {where.to_sql()}"

    def _row_to_feature(self, row: dict[str, Any], geom_as_wkt: bool) -> Feature:
        """Convert a result row to a Feature."""
        g = row.pop("tipg_geom")
        id = row.pop("tipg_id")
        if g is not None and not geom_as_wkt:
            g = orjson.loads(g)

        # JSON columns are returned as strings
        for name, value in row.items():
            if isinstance(value, str) and (col := self.get_column(name)):
                if col.type == "json":
                    row[name] = orjson.loads(value)

        return Feature(type="Feature", geometry=g, id=id, properties=row)

    def _run_features_queries(
        self, count_sql: str, sql: str, geom_as_wkt: bool
    ) -> tuple[int, list[Feature]]:
        """Run the COUNT and Features queries (blocking)."""
        cursor = self.connection.cursor()
        try:
            logger.debug(count_sql)
            matched = cursor.execute(count_sql).fetchone()[0]  # type: ignore [index]

            logger.debug(sql)
            cursor.execute(sql)
            names = [d[0] for d in cursor.description]  # type: ignore [union-attr]
            features = [
                self._row_to_feature(dict(zip(names, r)), geom_as_wkt)
                for r in cursor.fetchall()
            ]
        finally:
            cursor.close()

        return matched, features

    def _run_tile_query(self, sql: str, layer: str) -> bytes:
        """Run the MVT query (blocking)."""
        cursor = self.connection.cursor()
        try:
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
        function_parameters: dict[str, str] | None = None,
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

        count_sql = " ".join(["SELECT COUNT(*)", self._from(), where])
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
                f"LIMIT {int(limit)}",
                f"OFFSET {int(offset)}",
            ]
        )

        matched, features = await run_in_threadpool(
            self._run_features_queries, count_sql, sql, geom_as_wkt
        )
        returned = len(features)

        return ItemList(
            items=features,
            matched=matched,
            next=offset + returned if matched - returned > offset else None,
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
        function_parameters: dict[str, str] | None = None,
        cql_filter: Expr | None = None,
        sortby: str | None = None,
        properties: list[str] | None = None,
        geom: str | None = None,
        dt: str | None = None,
        limit: int | None = None,
        simplify: float | None = None,
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
        order_by = "ORDER BY " + ", ".join(sql for _, sql in sorts)

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
