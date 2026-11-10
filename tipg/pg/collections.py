"""tipg PostgreSQL collection models."""

import logging
import re
from typing import Any

import asyncpg
from cql2 import Expr
from morecantile import Tile, TileMatrixSet
from pydantic import ConfigDict, Field

from ..collections import Collection, Column, Feature, ItemList
from ..errors import (
    InvalidGeometryColumnName,
    InvalidLimit,
    InvalidPropertyName,
)
from ..logger import logger
from ..settings import FeaturesSettings, MVTSettings, TableConfig, TableSettings
from .settings import DatabaseSettings

mvt_settings = MVTSettings()
features_settings = FeaturesSettings()  # type: ignore [call-arg]


def debug_query(q, *p):
    """Utility to print raw statement to use for debugging."""
    # Formatting the statement is not free: skip it when DEBUG is disabled.
    if not logger.isEnabledFor(logging.DEBUG):
        return

    # Escape literal `{` and `}` (cql2 emits GeoJSON literals containing them)
    # then turn `$N` placeholders into `{N}` format slots.
    qsub = re.sub(r"\$([0-9]+)", r"{\1}", q.replace("{", "{{").replace("}", "}}"))

    def quote_str(s):
        """Quote strings."""

        if s is None:
            return "null"
        elif isinstance(s, str):
            return f"'{s}'"
        else:
            return s

    p = [quote_str(s) for s in p]
    logger.debug(qsub.format(None, *p))


def _quote_ident(name: str) -> str:
    """Quote a PostgreSQL identifier (column/table/schema) safely."""
    return '"' + name.replace('"', '""') + '"'


class PgCollection(Collection):
    """Model for DB Table and Function."""

    dbschema: str = Field(alias="schema")

    # Reference to the (shared) asyncpg pool serving this collection.
    # Excluded from serialization and repr.
    connection_pool: asyncpg.Pool = Field(exclude=True, repr=False)

    model_config = ConfigDict(arbitrary_types_allowed=True)

    @property
    def _qualified_name(self) -> str:
        """SQL-quoted ``"schema"."table"`` identifier for this collection."""
        return f"{_quote_ident(self.dbschema)}.{_quote_ident(self.table)}"

    def _select_property_columns(self, properties: list[str] | None) -> list[str]:
        """Quoted column-name fragments for the property columns to SELECT."""
        return [_quote_ident(c) for c in self.columns(properties)]

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

        g = f"CAST({_quote_ident(geometry_column.name)} AS geometry)"

        if geometry_column.srid != 4326:
            g = f"ST_Transform({g}, 4326)"

        if bbox_only:
            g = f"ST_Envelope({g})"
        elif simplify:
            s = float(simplify)
            g = f"ST_SnapToGrid(ST_SimplifyPreserveTopology({g}, {s}), {s})"

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
                f"ST_AsEWKT({geom}) AS tipg_geom"
                if geom
                else "CAST(NULL AS text) AS tipg_geom"
            )
        else:
            cols.append(
                f"CAST(ST_AsGeoJSON({geom}) AS json) AS tipg_geom"
                if geom
                else "CAST(NULL AS json) AS tipg_geom"
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
        cols = self._select_property_columns(properties)

        geom = f"CAST({_quote_ident(geometry_column.name)} AS geometry)"

        if simplify:
            geom = f"ST_SnapToGrid(ST_SimplifyPreserveTopology({geom}, {simplify}), {simplify})"

        # For tiles that fall outside the TMS's natural domain (e.g. an
        # over-zoomed corner tile), clip the source geometry to the TMS's
        # geographic bbox before reprojecting — otherwise ST_AsMVTGeom can
        # produce garbage near the antimeridian / poles. ``tms.bbox`` is in
        # the TMS's ``geographic_crs``, which is NOT always EPSG:4326 (e.g.
        # CanadianNAD83_LCC uses 4269, EuropeanETRS89_LAEAQuad uses 4258,
        # NZTM2000Quad uses 4167). When the geographic CRS has no EPSG code
        # (WorldCRS84Quad → OGC:CRS84), 4326 is a safe fallback since the
        # coordinate values are identical (only axis order differs, and
        # PostGIS treats 4326 as lon/lat).
        if not tms.is_valid(tile, strict=False):
            west, south, east, north = tms.bbox
            geo_srid = tms.geographic_crs.to_epsg() or 4326
            geom = (
                f"ST_Intersection("
                f"ST_MakeEnvelope({west}, {south}, {east}, {north}, {geo_srid}), "
                f"ST_Transform({geom}, {geo_srid})"
                f")"
            )

        # Reproject to TMS CRS — prefer EPSG code, fall back to PROJ string.
        if tms_srid := tms.crs.to_epsg():
            transformed = f"ST_Transform({geom}, {tms_srid})"
        else:
            tms_proj = tms.crs.to_proj4().replace("'", "''")
            transformed = f"ST_Transform({geom}, '{tms_proj}')"

        bbox = tms.xy_bounds(tile)
        envelope = (
            f"ST_Segmentize("
            f"ST_MakeEnvelope({bbox.left}, {bbox.bottom}, {bbox.right}, {bbox.top}), "
            f"{bbox.right - bbox.left}"
            f")"
        )
        cols.append(
            f"ST_AsMVTGeom("
            f"{transformed}, {envelope}, "
            f"{int(mvt_settings.tile_resolution)}, "
            f"{int(mvt_settings.tile_buffer)}, "
            f"{'TRUE' if mvt_settings.tile_clip else 'FALSE'}"
            f") AS geom"
        )

        return "SELECT " + ", ".join(cols)

    def _from(
        self,
        function_parameters: dict[str, str] | None,
        params: list[Any],
    ) -> str:
        """Build the FROM clause. Function-table parameters are appended to
        ``params`` and referenced via ``$N`` placeholders.
        """
        name = self._qualified_name
        if self.type != "Function":
            return f"FROM {name}"

        if not function_parameters:
            return f"FROM {name}()"

        args = []
        for p in self.parameters:
            if p.name in function_parameters:
                params.append(function_parameters[p.name])
                # Double cast (value → text → target type): asyncpg sends
                # Python strs as text, and the explicit cast to ``p.type``
                # then coerces to whatever the function signature expects.
                args.append(f"CAST(CAST(${len(params)} AS text) AS {p.type})")
        return f"FROM {name}({', '.join(args)})"

    def _sort_expressions(self, sortby: str | None) -> list[tuple[str, str]]:
        """Parse ``sortby`` into ``(column name, SQL fragment)`` pairs.

        The column name is returned alongside the fragment so callers can
        check it against the columns they actually project.
        """
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

    async def _features_query(
        self,
        conn: asyncpg.Connection,
        *,
        where: Expr | None = None,
        sortby: str | None = None,
        properties: list[str] | None = None,
        geom: str | None = None,
        limit: int | None = None,
        offset: int | None = None,
        bbox_only: bool | None = None,
        simplify: float | None = None,
        geom_as_wkt: bool = False,
        function_parameters: dict[str, str] | None,
    ):
        """Build and run the Features query, yielding each row as a Feature."""
        limit = limit or features_settings.default_features_limit
        offset = offset or 0
        params: list[Any] = []

        sql = " ".join(
            [
                self._select(
                    properties=properties,
                    geometry_column=self.get_geometry_column(geom),
                    bbox_only=bbox_only,
                    simplify=simplify,
                    geom_as_wkt=geom_as_wkt,
                ),
                self._from(function_parameters, params),
                self._where_clause(where),
                self._sortby(sortby),
                f"LIMIT {int(limit)}",
                f"OFFSET {int(offset)}",
            ]
        )

        for r in await conn.fetch(sql, *params):
            props = dict(r)
            g = props.pop("tipg_geom")
            id = props.pop("tipg_id")
            feature = Feature(type="Feature", geometry=g, id=id, properties=props)
            yield feature

    async def _features_count_query(
        self,
        conn: asyncpg.Connection,
        *,
        where: Expr | None = None,
        function_parameters: dict[str, str] | None,
    ) -> int:
        """Run the COUNT(*) query for the current filter."""
        params: list[Any] = []
        sql = " ".join(
            [
                "SELECT COUNT(*)",
                self._from(function_parameters, params),
                self._where_clause(where),
            ]
        )
        return await conn.fetchval(sql, *params)  # type: ignore

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
        """Build and run Pg query."""
        limit = limit or features_settings.default_features_limit
        offset = offset or 0

        function_parameters = function_parameters or {}

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

        async with self.connection_pool.acquire() as conn:
            matched = await self._features_count_query(
                conn,
                where=where_filter,
                function_parameters=function_parameters,
            )

            features = [
                f
                async for f in self._features_query(
                    conn,
                    where=where_filter,
                    sortby=sortby,
                    properties=properties,
                    geom=geom,
                    limit=limit,
                    offset=offset,
                    bbox_only=bbox_only,
                    simplify=simplify,
                    geom_as_wkt=geom_as_wkt,
                    function_parameters=function_parameters,
                )
            ]

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
    ):
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

        params: list[Any] = []
        inner_sql = " ".join(
            [
                self._select_mvt(
                    properties=properties,
                    geometry_column=geometry_column,
                    tms=tms,
                    tile=tile,
                    simplify=simplify,
                ),
                self._from(function_parameters, params),
                self._where_clause(where_filter),
                order_by,
                f"LIMIT {int(limit)}",
            ]
        )

        # The ORDER BY above makes LIMIT truncation deterministic, but it does
        # not fix the order rows reach ST_AsMVT: a CTE has not been an
        # optimisation fence since PG12, so it can be inlined and a parallel
        # plan may reorder freely. Only an ORDER BY *inside* the aggregate call
        # guarantees the feature order in the tile. It can only reference
        # columns of ``t``, so an explicit sort column must be projected.
        aggregate_order = ""
        if sortby:
            selected = self.columns(properties)
            if missing := [col for col, _ in sorts if col not in selected]:
                raise InvalidPropertyName(
                    f"Cannot sort by {', '.join(missing)}: not in the selected `properties`."
                )
            aggregate_order = f" {order_by}"

        layer = self.table if mvt_settings.set_mvt_layername is True else "default"
        params.append(layer)
        sql = f"WITH t AS ({inner_sql}) SELECT ST_AsMVT(t.*, ${len(params)}{aggregate_order}) FROM t"
        debug_query(sql, *params)

        async with self.connection_pool.acquire() as conn:
            tile = await conn.fetchval(sql, *params)  # type: ignore

        return bytes(tile)


async def pg_get_collection_index(  # noqa: C901
    conn: asyncpg.Connection,
    settings: DatabaseSettings | None = None,
    *,
    connection_pool: asyncpg.Pool,
) -> list[Collection]:
    """Fetch Table and Functions index."""
    if not settings:
        settings = DatabaseSettings()

    schemas = settings.schemas or ["public"]

    query = f"""
        SELECT {settings.tipg_schema}.tipg_catalog(
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        );
    """

    rows = await conn.fetch(
        query,
        schemas,
        settings.tables,
        settings.exclude_tables,
        settings.exclude_table_schemas,
        settings.functions,
        settings.exclude_functions,
        settings.exclude_function_schemas,
        settings.only_spatial_tables,
        settings.spatial_extent,
        settings.datetime_extent,
    )

    collections: list[Collection] = []
    table_settings = TableSettings()
    table_confs = table_settings.table_config
    fallback_key_names = table_settings.fallback_key_names

    for row in rows:
        table = row[0]
        table_id = table["schema"] + "." + table["name"]
        confid = table["schema"] + "_" + table["name"]

        if table_id == f"{settings.tipg_schema}.tipg_catalog":
            continue

        table_conf = table_confs.get(confid, TableConfig())

        # Make sure that any properties set in conf exist in table
        columns = table.get("properties", [])
        if table_settings.sort_columns:
            columns = sorted(columns, key=lambda d: d["name"])

        properties_setting = table_conf.properties or [c["name"] for c in columns]

        # ID Column
        id_column = None
        if id_name := table_conf.pk or table.get("pk"):
            for p in columns:
                if id_name == p["name"]:
                    id_column = p
                    break

        if id_column is None and fallback_key_names:
            for p in columns:
                if p["name"] in fallback_key_names:
                    id_column = p
                    break

        datetime_column = None
        geometry_column = None

        for c in columns:
            if c.get("type") in ("timestamp", "timestamptz", "date"):
                if table_conf.datetimecol == c["name"] or datetime_column is None:
                    datetime_column = c

            if c.get("type") in ("geometry", "geography"):
                if table_conf.geomcol == c["name"] or geometry_column is None:
                    geometry_column = c

        collection = PgCollection(
            type=table["entity"],
            id=table_id,
            table=table["name"],
            schema=table["schema"],
            description=table.get("description", None),
            table_columns=columns,
            properties=[p for p in columns if p["name"] in properties_setting],
            id_column=id_column,
            datetime_column=datetime_column,
            geometry_column=geometry_column,
            parameters=table.get("parameters") or [],
            connection_pool=connection_pool,
        )
        collections.append(collection)

    return collections
