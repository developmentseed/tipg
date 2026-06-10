"""tipg.pgcollection: PgCollection implementation."""

import re
from typing import Any, Dict, List, Optional, Tuple

import asyncpg
from cql2 import Expr
from morecantile import Tile, TileMatrixSet
from pydantic import Field

from tipg.dbmodel import Collection, Column, Feature, ItemList
from tipg.errors import InvalidGeometryColumnName, InvalidLimit, InvalidPropertyName
from tipg.filter import cql_where
from tipg.settings import FeaturesSettings, MVTSettings
from tipg.sqlhelpers import _quote_ident, debug_query

mvt_settings = MVTSettings()
features_settings = FeaturesSettings()


class PgCollection(Collection):
    """Model for DB Table and Function."""

    dbschema: str = Field(alias="schema")

    @property
    def _qualified_name(self) -> str:
        """SQL-quoted ``"schema"."table"`` identifier for this collection."""
        return f"{_quote_ident(self.dbschema)}.{_quote_ident(self.table)}"

    def _select_property_columns(self, properties: Optional[List[str]]) -> List[str]:
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
        geometry_column: Optional[Column],
        bbox_only: Optional[bool],
        simplify: Optional[float],
    ) -> Optional[str]:
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
            g = f"ST_SnapToGrid(ST_Simplify({g}, {s}), {s})"

        return g

    def _select(
        self,
        properties: Optional[List[str]],
        geometry_column: Optional[Column],
        bbox_only: Optional[bool],
        simplify: Optional[float],
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
        properties: Optional[List[str]],
        geometry_column: Column,
        tms: TileMatrixSet,
        tile: Tile,
    ) -> str:
        """Build the SELECT clause that emits an MVT geometry per row."""
        cols = self._select_property_columns(properties)

        geom = f"CAST({_quote_ident(geometry_column.name)} AS geometry)"

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
        if not tms.is_valid(tile):
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
        function_parameters: Optional[Dict[str, str]],
        params: List[Any],
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

    def _sortby(self, sortby: Optional[str]) -> str:
        """Build the ORDER BY clause."""
        sorts = []
        if sortby:
            for s in sortby.strip().split(","):
                parts = re.match("^(?P<direction>[+-]?)(?P<column>.*)$", s).groupdict()  # type:ignore

                direction = parts["direction"]
                column = parts["column"].strip()
                if not self.get_column(column):
                    raise InvalidPropertyName(f"Property {column} does not exist.")
                col_sql = _quote_ident(column)
                sorts.append(f"{col_sql} DESC" if direction == "-" else col_sql)
        elif self.id_column is not None:
            sorts.append(_quote_ident(self.id_column.name))
        else:
            sorts.append(_quote_ident(self.properties[0].name))

        return "ORDER BY " + ", ".join(sorts)

    @staticmethod
    def _where_clause(where: Optional[Expr]) -> str:
        """Render a cql2 ``Expr`` (or ``None``) as a WHERE clause."""
        if where is None:
            return "WHERE TRUE"
        return f"WHERE {where.to_sql()}"

    async def _features_query(
        self,
        conn: asyncpg.Connection,
        *,
        where: Optional[Expr] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: Optional[str] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        bbox_only: Optional[bool] = None,
        simplify: Optional[float] = None,
        geom_as_wkt: bool = False,
        function_parameters: Optional[Dict[str, str]],
    ):
        """Build and run the Features query, yielding each row as a Feature."""
        limit = limit or features_settings.default_features_limit
        offset = offset or 0
        params: List[Any] = []

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
        where: Optional[Expr] = None,
        function_parameters: Optional[Dict[str, str]],
    ) -> int:
        """Run the COUNT(*) query for the current filter."""
        params: List[Any] = []
        sql = " ".join(
            [
                "SELECT COUNT(*)",
                self._from(function_parameters, params),
                self._where_clause(where),
            ]
        )
        return await conn.fetchval(sql, *params)

    async def features(
        self,
        conn: asyncpg.Connection,
        *,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        cql_filter: Optional[Expr] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        bbox_only: Optional[bool] = None,
        simplify: Optional[float] = None,
        geom_as_wkt: bool = False,
        function_parameters: Optional[Dict[str, str]] = None,
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

        where_filter = cql_where(
            self,
            ids=ids_filter,
            datetime=datetime_filter,
            bbox=bbox_filter,
            properties=properties_filter,
            cql=cql_filter,
            geom=geom,
            dt=dt,
        )

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
        conn: asyncpg.Connection,
        *,
        tms: TileMatrixSet,
        tile: Tile,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        function_parameters: Optional[Dict[str, str]] = None,
        cql_filter: Optional[Expr] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        limit: Optional[int] = None,
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

        where_filter = cql_where(
            self,
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

        params: List[Any] = []
        inner_sql = " ".join(
            [
                self._select_mvt(
                    properties=properties,
                    geometry_column=geometry_column,
                    tms=tms,
                    tile=tile,
                ),
                self._from(function_parameters, params),
                self._where_clause(where_filter),
                f"LIMIT {int(limit)}",
            ]
        )

        layer = self.table if mvt_settings.set_mvt_layername is True else "default"
        params.append(layer)
        sql = f"WITH t AS ({inner_sql}) " f"SELECT ST_AsMVT(t.*, ${len(params)}) FROM t"
        debug_query(sql, *params)

        tile = await conn.fetchval(sql, *params)

        return bytes(tile)
