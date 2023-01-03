"""tipg.dbmodel: database events."""

import re
from typing import Any, Dict, List, Optional, Tuple, TypedDict, Union

from buildpg import RawDangerous as raw
from buildpg import asyncpg, clauses
from buildpg import funcs as pg_funcs
from buildpg import logic, render
from ciso8601 import parse_rfc3339
from morecantile import Tile, TileMatrixSet
from pydantic import BaseModel, Field, root_validator
from pygeofilter.ast import AstType

from tipg.errors import (
    InvalidDatetime,
    InvalidDatetimeColumnName,
    InvalidGeometryColumnName,
    InvalidLimit,
    InvalidPropertyName,
    MissingDatetimeColumn,
)
from tipg.filter.evaluate import to_filter
from tipg.filter.filters import bbox_to_wkt
from tipg.model import Extent
from tipg.settings import TableSettings, TileSettings

tile_settings = TileSettings()


def debug_query(q, *p):
    """Utility to print raw statement to use for debugging."""

    qsub = re.sub(r"\$([0-9]+)", r"{\1}", q)

    def quote_str(s):
        """Quote strings."""

        if s is None:
            return "null"
        elif isinstance(s, str):
            return f"'{s}'"
        else:
            return s

    p = [quote_str(s) for s in p]
    print("DEBUG QUERY")
    print(qsub.format(None, *p))


# Links to geojson schema
geojson_schema = {
    "GEOMETRY": "https://geojson.org/schema/Geometry.json",
    "POINT": "https://geojson.org/schema/Point.json",
    "MULTIPOINT": "https://geojson.org/schema/MultiPoint.json",
    "LINESTRING": "https://geojson.org/schema/LineString.json",
    "MULTILINESTRING": "https://geojson.org/schema/MultiLineString.json",
    "POLYGON": "https://geojson.org/schema/Polygon.json",
    "MULTIPOLYGON": "https://geojson.org/schema/MultiPolygon.json",
    "GEOMETRYCOLLECTION": "https://geojson.org/schema/GeometryCollection.json",
}


class Feature(TypedDict, total=False):
    """Simple Feature model."""

    type: str
    # Geometry is either a dict or a str (wkt)
    geometry: Optional[Union[Dict, str]]
    properties: Optional[Dict]
    id: Optional[Any]
    bbox: Optional[List[float]]


class FeatureCollection(TypedDict, total=False):
    """Simple FeatureCollection model."""

    type: str
    features: List[Feature]
    bbox: Optional[List[float]]


class Column(BaseModel):
    """Model for database Column."""

    name: str
    type: str
    description: Optional[str]

    @property
    def json_type(self) -> str:
        """Return JSON field type."""
        if self.type.endswith("[]"):
            return "array"

        if self.type in [
            "smallint",
            "integer",
            "bigint",
            "decimal",
            "numeric",
            "real",
            "double precision",
            "smallserial",
            "serial",
            "bigserial",
            # Float8 is not a Postgres type name but is the name we give
            # internally do Double Precision type
            # ref: https://github.com/developmentseed/tipg/pull/60/files#r1011863866
            "float8",
        ]:
            return "number"

        if self.type.startswith("bool"):
            return "boolean"

        if any([self.type.startswith("json"), self.type.startswith("geo")]):
            return "object"

        return "string"


class GeometryColumn(Column):
    """Model for PostGIS geometry/geography column."""

    bounds: List[float] = [-180, -90, 180, 90]
    srid: int = 4326
    geometry_type: str


class DatetimeColumn(Column):
    """Model for PostGIS geometry/geography column."""

    min: Optional[str]
    max: Optional[str]


class Parameter(Column):
    """Model for PostGIS function parameters."""

    default: Optional[str] = None


class Collection(BaseModel):
    """Model for DB Table and Function."""

    type: str
    id: str
    table: str
    dbschema: str = Field(..., alias="schema")
    title: Optional[str]
    description: Optional[str]
    extent: Optional[Extent]
    properties: List[Column] = []
    id_column: Optional[str]
    geometry_columns: List[GeometryColumn] = []
    datetime_columns: List[DatetimeColumn] = []
    geometry_column: Optional[GeometryColumn]
    datetime_column: Optional[DatetimeColumn]
    parameters: List[Parameter] = []
    minzoom: int = tile_settings.default_minzoom
    maxzoom: int = tile_settings.default_maxzoom
    default_tms: str = tile_settings.default_tms

    @root_validator
    def extent_default(cls, values):
        """Get default bounds from the first geometry columns."""
        extent = {}

        geoms = values.get("geometry_columns")
        if geoms:
            # Get the Extent of all the bounds
            minx, miny, maxx, maxy = zip(*[geom.bounds for geom in geoms])
            extent["spatial"] = {
                "bbox": [[min(minx), min(miny), max(maxx), max(maxy)]],
                "crs": f"http://www.opengis.net/def/crs/EPSG/0/{geoms[0].srid}",
            }

        dates = values.get("datetime_columns")
        if dates:
            intervals = []
            for d in dates:
                if d.min or d.max:
                    intervals.append([d.min, d.max])
            if intervals:
                extent["temporal"] = {"interval": intervals}

        if extent:
            values["extent"] = Extent(**extent)

        return values

    def get_datetime_column(self, name: Optional[str] = None) -> Optional[Column]:
        """Return the Column for either the passed in tstz column or the first tstz column."""
        if not self.datetime_columns:
            return None

        if name is None:
            return self.datetime_column

        for col in self.datetime_columns:
            if col.name == name:
                return col

        return None

    def get_geometry_column(
        self, name: Optional[str] = None
    ) -> Optional[GeometryColumn]:
        """Return the name of the first geometry column."""
        if (not self.geometry_columns) or (name and name.lower() == "none"):
            return None

        if name is None:
            return self.geometry_column

        for col in self.geometry_columns:
            if col.name == name:
                return col

        return None

    @property
    def bounds(self) -> Optional[List[float]]:
        """Return bounds from collection extent."""
        if self.extent and self.extent.spatial:
            return self.extent.spatial.bbox[0]

        return None

    @property
    def id_column_info(self) -> Column:  # type: ignore
        """Return Column for a unique identifier."""
        for col in self.properties:
            if col.name == self.id_column:
                return col

    def columns(self, properties: Optional[List[str]] = None) -> List[str]:
        """Return table columns optionally filtered to only include columns from properties."""
        if properties in [[], [""]]:
            return []

        cols = [
            c.name for c in self.properties if c.type not in ["geometry", "geography"]
        ]
        if properties is None:
            return cols

        return [c for c in cols if c in properties]

    def get_column(self, property_name: str) -> Optional[Column]:
        """Return column info."""
        for p in self.properties:
            if p.name == property_name:
                return p

        return None

    def _select_no_geo(self, properties: Optional[List[str]], addid: bool = True):
        nocomma = False
        columns = self.columns(properties)
        if columns:
            sel = logic.as_sql_block(clauses.Select(columns))
        else:
            sel = logic.as_sql_block(raw("SELECT "))
            nocomma = True

        if addid:
            if self.id_column:
                id_clause = logic.V(self.id_column).as_("tipg_id")
            else:
                id_clause = raw(" ROW_NUMBER () OVER () AS tipg_id ")
            if nocomma:
                sel = clauses.Clauses(sel, id_clause)
            else:
                sel = sel.comma(id_clause)

        return logic.as_sql_block(sel)

    def _select(
        self,
        properties: Optional[List[str]],
        geometry_column: Optional[GeometryColumn],
        bbox_only: Optional[bool],
        simplify: Optional[float],
        geom_as_wkt: bool = False,
    ):
        sel = self._select_no_geo(properties)

        geom = self._geom(geometry_column, bbox_only, simplify)
        if geom_as_wkt:
            if geom:
                sel = sel.comma(logic.Func("st_asewkt", geom).as_("tipg_geom"))
            else:
                sel = sel.comma(pg_funcs.cast(None, "text").as_("tipg_geom"))

        else:
            if geom:
                sel = sel.comma(
                    pg_funcs.cast(logic.Func("st_asgeojson", geom), "json").as_(
                        "tipg_geom"
                    )
                )
            else:
                sel = sel.comma(pg_funcs.cast(None, "json").as_("tipg_geom"))

        return sel

    def _select_mvt(
        self,
        properties: Optional[List[str]],
        geometry_column: GeometryColumn,
        tms: TileMatrixSet,
        tile: Tile,
    ):
        bbox = tms.xy_bounds(tile)
        tms_srid = tms.crs.to_epsg()
        if tms_srid:
            transform_logic = logic.Func(
                "st_transform",
                logic.V(geometry_column.name),
                pg_funcs.cast(tms_srid, "int"),
            )
        else:
            tms_proj = str(tms.crs.to_proj4())
            transform_logic = logic.Func(
                "st_transform",
                logic.V(geometry_column.name),
                pg_funcs.cast(tms_proj, "text"),
            )

        sel = self._select_no_geo(properties, addid=False).comma(
            logic.Func(
                "st_asmvtgeom",
                transform_logic,
                logic.Func(
                    "ST_Segmentize",
                    logic.Func(
                        "ST_MakeEnvelope",
                        bbox.left,
                        bbox.bottom,
                        bbox.right,
                        bbox.top,
                    ),
                    bbox.right - bbox.left,
                ),
                tile_settings.tile_resolution,
                tile_settings.tile_buffer,
            ).as_("geom")
        )

        return sel

    def _select_count(self):
        return clauses.Select(pg_funcs.count("*"))

    def _from(self, function_parameters: Optional[Dict[str, str]]):
        if self.type == "Function":
            if not function_parameters:
                return clauses.From(self.id) + raw("()")
            params = []
            for p in self.parameters:
                if p.name in function_parameters:
                    params.append(
                        pg_funcs.cast(
                            pg_funcs.cast(function_parameters[p.name], "text"),
                            p.type,
                        )
                    )
            return clauses.From(logic.Func(self.id, *params))
        return clauses.From(self.id)

    def _geom(
        self,
        geometry_column: Optional[GeometryColumn],
        bbox_only: Optional[bool],
        simplify: Optional[float],
    ):
        if geometry_column is None:
            return None

        g = logic.V(geometry_column.name)
        g = pg_funcs.cast(g, "geometry")

        if geometry_column.srid == 4326:
            g = logic.Func("ST_Transform", g, pg_funcs.cast(4326, "int"))

        if bbox_only:
            g = logic.Func("ST_Envelope", g)
        elif simplify:
            g = logic.Func(
                "ST_SnapToGrid",
                logic.Func("ST_Simplify", g, simplify),
                simplify,
            )

        return g

    def _where(
        self,
        ids: Optional[List[str]] = None,
        datetime: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        properties: Optional[List[Tuple[str, Any]]] = None,
        cql: Optional[AstType] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        tile: Optional[Tile] = None,
        tms: Optional[TileMatrixSet] = None,
    ):
        """Construct WHERE query."""
        wheres = [logic.S(True)]

        # `ids` filter
        if ids is not None:
            if len(ids) == 1:
                wheres.append(
                    logic.V(self.id_column)
                    == pg_funcs.cast(
                        pg_funcs.cast(ids[0], "text"), self.id_column_info.type
                    )
                )
            else:
                w = [
                    logic.V(self.id_column)
                    == logic.S(
                        pg_funcs.cast(
                            pg_funcs.cast(i, "text"), self.id_column_info.type
                        )
                    )
                    for i in ids
                ]
                wheres.append(pg_funcs.OR(*w))

        # `properties filter
        if properties is not None:
            w = []
            for (prop, val) in properties:
                col = self.get_column(prop)
                if not col:
                    raise InvalidPropertyName(f"Invalid property name: {prop}")

                w.append(
                    logic.V(col.name)
                    == logic.S(pg_funcs.cast(pg_funcs.cast(val, "text"), col.type))
                )

            if w:
                wheres.append(pg_funcs.AND(*w))

        # `bbox` filter
        geometry_column = self.get_geometry_column(geom)
        if bbox is not None and geometry_column is not None:
            wheres.append(
                logic.Func(
                    "ST_Intersects",
                    logic.S(bbox_to_wkt(bbox)),
                    logic.V(geometry_column.name),
                )
            )

        # `datetime` filter
        if datetime:
            if not self.datetime_columns:
                raise MissingDatetimeColumn(
                    "Must have timestamp typed column to filter with datetime."
                )

            datetime_column = self.get_datetime_column(dt)
            if not datetime_column:
                raise InvalidDatetimeColumnName(f"Invalid Datetime Column: {dt}.")

            wheres.append(self._datetime_filter_to_sql(datetime, datetime_column.name))

        # `CQL` filter
        if cql is not None:
            wheres.append(to_filter(cql, [p.name for p in self.properties]))

        if tile and tms and geometry_column:
            tilebox = tms.bounds(tile)

            wheres.append(
                logic.Func(
                    "ST_Intersects",
                    logic.Func(
                        "st_transform",
                        logic.Func(
                            "ST_Segmentize",
                            logic.Func(
                                "ST_MakeEnvelope",
                                tilebox.left,
                                tilebox.bottom,
                                tilebox.right,
                                tilebox.top,
                                4326,
                            ),
                            tilebox.right - tilebox.left,
                        ),
                        pg_funcs.cast(geometry_column.srid, "int"),
                    ),
                    logic.V(geometry_column.name),
                )
            )

        return clauses.Where(pg_funcs.AND(*wheres))

    def _datetime_filter_to_sql(self, interval: List[str], dt_name: str):
        if len(interval) == 1:
            return logic.V(dt_name) == logic.S(
                pg_funcs.cast(parse_rfc3339(interval[0]), "timestamptz")
            )

        else:
            start = (
                parse_rfc3339(interval[0]) if not interval[0] in ["..", ""] else None
            )
            end = parse_rfc3339(interval[1]) if not interval[1] in ["..", ""] else None

            if start is None and end is None:
                raise InvalidDatetime(
                    "Double open-ended datetime intervals are not allowed."
                )

            if start is not None and end is not None and start > end:
                raise InvalidDatetime("Start datetime cannot be before end datetime.")

            if not start:
                return logic.V(dt_name) <= logic.S(pg_funcs.cast(end, "timestamptz"))

            elif not end:
                return logic.V(dt_name) >= logic.S(pg_funcs.cast(start, "timestamptz"))

            else:
                return pg_funcs.AND(
                    logic.V(dt_name) >= logic.S(pg_funcs.cast(start, "timestamptz")),
                    logic.V(dt_name) < logic.S(pg_funcs.cast(end, "timestamptz")),
                )

    def _sortby(self, sortby: Optional[str]):
        sorts = []
        if sortby:
            for s in sortby.strip().split(","):
                parts = re.match(
                    "^(?P<direction>[+-]?)(?P<column>.*)$", s
                ).groupdict()  # type:ignore

                direction = parts["direction"]
                column = parts["column"].strip()
                if self.get_column(column):
                    if direction == "-":
                        sorts.append(logic.V(column).desc())
                    else:
                        sorts.append(logic.V(column))
                else:
                    raise InvalidPropertyName(f"Property {column} does not exist.")

        else:
            if self.id_column is not None:
                sorts.append(logic.V(self.id_column))
            else:
                sorts.append(logic.V(self.properties[0].name))

        return clauses.OrderBy(*sorts)

    async def _features_query(
        self,
        *,
        pool: asyncpg.BuildPgPool,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        cql_filter: Optional[AstType] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        bbox_only: Optional[bool] = None,
        simplify: Optional[float] = None,
        geom_as_wkt: bool = False,
        function_parameters: Optional[Dict[str, str]],
    ):
        """Build Features query."""
        c = clauses.Clauses(
            self._select(
                properties=properties,
                geometry_column=self.get_geometry_column(geom),
                bbox_only=bbox_only,
                simplify=simplify,
                geom_as_wkt=geom_as_wkt,
            ),
            self._from(function_parameters),
            self._where(
                ids=ids_filter,
                datetime=datetime_filter,
                bbox=bbox_filter,
                properties=properties_filter,
                cql=cql_filter,
                geom=geom,
                dt=dt,
            ),
            self._sortby(sortby),
            clauses.Limit(limit or 10),
            clauses.Offset(offset or 0),
        )

        q, p = render(":c", c=c)
        async with pool.acquire() as conn:
            for r in await conn.fetch(q, *p):
                props = dict(r)
                g = props.pop("tipg_geom")
                id = props.pop("tipg_id")
                feature = Feature(type="Feature", geometry=g, id=id, properties=props)
                yield feature

    async def _features_count_query(
        self,
        *,
        pool: asyncpg.BuildPgPool,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        cql_filter: Optional[AstType] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        function_parameters: Optional[Dict[str, str]],
    ) -> int:
        """Build features COUNT query."""
        c = clauses.Clauses(
            self._select_count(),
            self._from(function_parameters),
            self._where(
                ids=ids_filter,
                datetime=datetime_filter,
                bbox=bbox_filter,
                properties=properties_filter,
                cql=cql_filter,
                geom=geom,
                dt=dt,
            ),
        )

        q, p = render(":c", c=c)
        async with pool.acquire() as conn:
            count = await conn.fetchval(q, *p)
            return count

    async def features(
        self,
        pool: asyncpg.BuildPgPool,
        *,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        cql_filter: Optional[AstType] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        bbox_only: Optional[bool] = None,
        simplify: Optional[float] = None,
        geom_as_wkt: bool = False,
        function_parameters: Dict[str, str] = {},
    ) -> Tuple[FeatureCollection, int]:
        """Build and run Pg query."""
        if geom and geom.lower() != "none" and not self.get_geometry_column(geom):
            raise InvalidGeometryColumnName(f"Invalid Geometry Column: {geom}.")

        if limit and limit > tile_settings.max_features_per_tile:
            raise

        count = await self._features_count_query(
            pool=pool,
            ids_filter=ids_filter,
            datetime_filter=datetime_filter,
            bbox_filter=bbox_filter,
            properties_filter=properties_filter,
            function_parameters=function_parameters,
            cql_filter=cql_filter,
            geom=geom,
            dt=dt,
        )

        features = [
            f
            async for f in self._features_query(
                pool=pool,
                ids_filter=ids_filter,
                datetime_filter=datetime_filter,
                bbox_filter=bbox_filter,
                properties_filter=properties_filter,
                cql_filter=cql_filter,
                sortby=sortby,
                properties=properties,
                geom=geom,
                dt=dt,
                limit=limit,
                offset=offset,
                bbox_only=bbox_only,
                simplify=simplify,
                geom_as_wkt=geom_as_wkt,
                function_parameters=function_parameters,
            )
        ]

        return (
            FeatureCollection(type="FeatureCollection", features=features),
            count,
        )

    async def get_tile(
        self,
        *,
        pool: asyncpg.BuildPgPool,
        tms: TileMatrixSet,
        tile: Tile,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        function_parameters: Optional[Dict[str, str]] = None,
        cql_filter: Optional[AstType] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        limit: Optional[int] = None,
    ):
        """Build query to get Vector Tile."""
        geometry_column = self.get_geometry_column(geom)
        if not geometry_column:
            raise InvalidGeometryColumnName

        if limit and limit > tile_settings.max_features_per_tile:
            raise InvalidLimit

        c = clauses.Clauses(
            self._select_mvt(
                properties=properties,
                geometry_column=geometry_column,
                tms=tms,
                tile=tile,
            ),
            self._from(function_parameters),
            self._where(
                ids=ids_filter,
                datetime=datetime_filter,
                bbox=bbox_filter,
                properties=properties_filter,
                cql=cql_filter,
                geom=geom,
                dt=dt,
                tms=tms,
                tile=tile,
            ),
            clauses.Limit(limit or 10),
        )

        q, p = render(
            """
            WITH
            t AS (:c)
            SELECT ST_AsMVT(t.*) FROM t
            """,
            c=c,
        )
        # debug_query(q, *p)

        async with pool.acquire() as conn:
            return await conn.fetchval(q, *p)

    @property
    def queryables(self) -> Dict:
        """Return the queryables."""
        if self.geometry_columns:
            geoms = {
                col.name: {"$ref": geojson_schema.get(col.geometry_type.upper(), "")}
                for col in self.geometry_columns
            }
        else:
            geoms = {}

        props = {
            col.name: {"name": col.name, "type": col.json_type}
            for col in self.properties
            if col.name not in geoms
        }

        return {**geoms, **props}


Database = Dict[str, Collection]


async def get_collection_index(
    db_pool: asyncpg.BuildPgPool,
    schemas: Optional[List[str]] = ["public"],
    tables: Optional[List[str]] = None,
    function_schemas: Optional[List[str]] = ["public"],
    functions: Optional[List[str]] = None,
    spatial: bool = True,
) -> Database:
    """Fetch Table and Functions index."""

    query = """
        WITH table_columns AS (
            SELECT
                nspname,
                relname,
                format('%I.%I', nspname, relname) as id,
                c.oid as t_oid,
                obj_description(c.oid, 'pg_class') as description,
                attname,
                atttypmod,
                replace(replace(replace(replace(format_type(atttypid, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp') as typ,
                col_description(attrelid, attnum)
            FROM
                pg_class c
                JOIN pg_namespace n on (c.relnamespace=n.oid)
                JOIN pg_attribute a on (attnum>0 and attrelid=c.oid and not attisdropped)
            WHERE
                relkind IN ('r','v', 'm', 'f', 'p')
                AND has_table_privilege(c.oid, 'SELECT')
                AND has_column_privilege(c.oid,a.attnum, 'SELECT')
                AND n.nspname NOT IN ('pg_catalog', 'information_schema')
                AND c.relname NOT IN ('spatial_ref_sys','geometry_columns','geography_columns')
                AND (:schemas::text[] IS NULL  OR n.nspname = ANY (:schemas))
                AND (:tables::text[] IS NULL OR c.relname = ANY (:tables))
        ),
        grouped as
        (SELECT
            'Table' as entity,
            nspname as dbschema,
            relname as tbl,
            id,
            description,
            (
                SELECT attname
                FROM
                    pg_attribute a
                    LEFT JOIN
                    pg_index i
                        ON (
                            a.attrelid = i.indrelid
                            AND a.attnum = ANY(i.indkey)
                            )
                WHERE
                    a.attrelid = t_oid
                    AND
                    i.indnatts = 1
                ORDER BY
                    i.indisprimary DESC NULLS LAST,
                    i.indisunique DESC NULLS LAST
                LIMIT 1
            ) as id_column,
            coalesce(jsonb_agg(
                jsonb_build_object(
                    'name', attname,
                    'type', typ,
                    'geometry_type', postgis_typmod_type(atttypmod),
                    'srid', postgis_typmod_srid(atttypmod),
                    'description', col_description,
                    'bounds',
                        CASE WHEN postgis_typmod_srid(atttypmod) IS NOT NULL AND postgis_typmod_srid(atttypmod) != 0 THEN
                            (
                                SELECT
                                    ARRAY[
                                        ST_XMin(extent.geom),
                                        ST_YMin(extent.geom),
                                        ST_XMax(extent.geom),
                                        ST_YMax(extent.geom)
                                    ]
                                FROM (
                                    SELECT
                                        coalesce(
                                            ST_Transform(
                                                ST_SetSRID(
                                                    ST_EstimatedExtent(nspname, relname, attname),
                                                    postgis_typmod_srid(atttypmod)
                                                ),
                                                4326
                                            ),
                                            ST_MakeEnvelope(-180, -90, 180, 90, 4326)
                                        ) as geom
                                    ) AS extent
                            )
                        ELSE ARRAY[-180,-90,180,90]
                        END
                )
            ) FILTER (WHERE typ IN ('geometry','geography')), '[]'::jsonb) as geometry_columns,
            coalesce(jsonb_agg(
                jsonb_build_object(
                    'name', attname,
                    'type', typ,
                    'description', col_description
                )
            ) FILTER (WHERE typ LIKE 'timestamp%'), '[]'::jsonb) as datetime_columns,
            coalesce(jsonb_agg(
                jsonb_build_object(
                    'name', attname,
                    'type', typ,
                    'description', col_description
                )
            ),'[]'::jsonb) as properties,
            '[]'::jsonb as parameters
        FROM
            table_columns
        GROUP BY 1,2,3,4,5,6 ORDER BY 1,2,3,4
        ),
        f_init AS (
            SELECT
                'Function' as entity,
                nspname as dbschema,
                proname as tbl,
                format('%s.%s',nspname, proname) as id,
                d.description as description,
                CASE WHEN pronargdefaults > 0 AND pronargs > 0 THEN
                    array_fill(
                        NULL::text,
                        ARRAY[pronargs-pronargdefaults]
                    ) || string_to_array(pg_get_expr(p.proargdefaults, 0::OID),',')
                ELSE array_fill(null::text, ARRAY[pronargs])
                END as defaults,
                coalesce(p.proallargtypes, (p.proargtypes::oid[])[:]) as argtypes,
                coalesce(p.proargmodes,array_fill('i'::text,ARRAY[cardinality(p.proargnames)])) as argmodes,
                p.proargnames,
                cardinality(p.proargnames) as argnamecount,
                p.prorettype as basetype,
                format_type(p.prorettype, null) as basetypename
            FROM
                pg_proc p
                JOIN
                pg_namespace n on (p.pronamespace=n.oid)
                LEFT JOIN pg_description d ON (p.oid = d.objoid)
            WHERE
                proretset
                AND prokind='f'
                AND proargnames is not null
                AND '' != ANY(proargnames)
                AND has_function_privilege(p.oid, 'execute')
                AND has_schema_privilege(n.oid, 'usage')
                AND provariadic=0
                AND (:function_schemas::text[] IS NULL  OR n.nspname = ANY (:function_schemas))
                AND (:functions::text[] IS NULL OR p.proname = ANY (:functions))
        ),
        f AS (
            SELECT
                entity,
                dbschema,
                tbl,
                id,
                description,
                defaults,
                CASE WHEN basetypename = 'record'
                    THEN argtypes
                    ELSE argtypes || basetype
                END as argtypes,
                CASE WHEN basetypename = 'record'
                    THEN argmodes
                    ELSE argmodes || 'o'::text
                END as argmodes,
                CASE WHEN basetypename = 'record'
                    THEN proargnames
                    ELSE proargnames || tbl
                END as proargnames
            FROM f_init
            WHERE TRUE
                --argnamecount = cardinality(argmodes)
                --AND
                --argnamecount = cardinality(argtypes)
        ),
        functions as (
        SELECT
            entity,
            dbschema,
            tbl,
            id,
            description,
            null::text as id_column,
            coalesce(jsonb_agg(
                jsonb_strip_nulls(jsonb_build_object(
                    'name', a.argname,
                    'type', replace(replace(replace(replace(format_type(argtype, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp'),
                    'geometry_type', 'Geometry'
                ))
                ORDER BY a.argnum
            ) FILTER (WHERE argmode IN ('t', 'b', 'o') AND format_type(argtype, null) LIKE 'geo%'),'[]'::jsonb) as geometry_columns,
            coalesce(jsonb_agg(
                jsonb_strip_nulls(jsonb_build_object(
                    'name', a.argname,
                    'type', replace(replace(replace(replace(format_type(argtype, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp')
                ))
                ORDER BY a.argnum
            ) FILTER (WHERE argmode IN ('t', 'b', 'o') AND format_type(argtype, null) LIKE 'timestamp%'),'[]'::jsonb) as datetime_columns,
            coalesce(jsonb_agg(
                jsonb_build_object(
                    'name', a.argname,
                    'type', replace(replace(replace(replace(format_type(argtype, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp')
                )
                ORDER BY a.argnum
            ) FILTER (WHERE argmode IN ('t', 'b', 'o')),'[]'::jsonb) as properties,
            coalesce(jsonb_agg(
                jsonb_strip_nulls(jsonb_build_object(
                    'name', a.argname,
                    'type', replace(replace(replace(replace(format_type(argtype, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp')
                    ,'default', regexp_replace(def, '''([a-zA-Z0-9_\-\.]+)''::\w+', '\1', 'g')
                ))
                ORDER BY a.argnum
            ) FILTER (WHERE argmode IN ('i', 'b')),'[]'::jsonb) as parameters
        FROM
            f
            LEFT JOIN LATERAL unnest(f.argtypes,f.argmodes,f.proargnames,f.defaults) WITH ORDINALITY AS a(argtype,argmode,argname,def,argnum) ON TRUE
        GROUP BY 1,2,3,4,5,6 ORDER BY 1,2,3,4
        ),
        unioned as (
        SELECT * FROM grouped
        UNION ALL
        SELECT * FROM functions
        )
        SELECT * FROM unioned
        WHERE :spatial = FALSE OR jsonb_array_length(geometry_columns)>=1
        ;
    """  # noqa: W605

    async with db_pool.acquire() as conn:
        rows = await conn.fetch_b(
            query,
            schemas=schemas,
            tables=tables,
            function_schemas=function_schemas,
            functions=functions,
            spatial=spatial,
        )

        catalog = {}
        table_settings = TableSettings()
        table_confs = table_settings.table_config
        fallback_key_names = table_settings.fallback_key_names

        for table in rows:
            id = table["id"]

            if table_settings.excludes and id in table_settings.excludes:
                continue

            if table_settings.includes and id not in table_settings.includes:
                continue

            confid = id.replace(".", "_")
            table_conf = table_confs.get(confid, {})

            # Make sure that any properties set in conf exist in table
            properties = table.get("properties", [])
            properties_setting = table_conf.get("properties", [])
            if properties_setting:
                properties = [p for p in properties if p["name"] in properties_setting]

            property_names = [p["name"] for p in properties]

            # ID Column
            id_column = table_conf.get("pk") or table["id_column"]
            if not id_column and fallback_key_names:
                for p in properties:
                    if p["name"] in fallback_key_names:
                        id_column = p["name"]
                        break

            # Datetime Column
            datetime_columns = [
                c
                for c in table.get("datetime_columns", [])
                if c["name"] in property_names
            ]

            datetime_column = None
            for col in datetime_columns:
                if table_conf.get("datetimecol") == col["name"]:
                    datetime_column = col

            if not datetime_column and datetime_columns:
                datetime_column = datetime_columns[0]

            # Geometry Column
            geometry_columns = [
                c
                for c in table.get("geometry_columns", [])
                if c["name"] in property_names
            ]
            geometry_column = None
            for col in geometry_columns:
                if table_conf.get("geomcol") == col["name"]:
                    geometry_column = col
            if not geometry_column and geometry_columns:
                geometry_column = geometry_columns[0]

            catalog[id] = Collection(
                type=table["entity"],
                id=id,
                table=table["tbl"],
                schema=table["dbschema"],
                description=table["description"],
                id_column=id_column,
                geometry_columns=geometry_columns,
                datetime_columns=datetime_columns,
                properties=properties,
                datetime_column=datetime_column,
                geometry_column=geometry_column,
                parameters=table["parameters"],
            )

        return catalog
