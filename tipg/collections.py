"""tipg.dbmodel: database events."""

import abc
import datetime
import re
from functools import lru_cache, reduce
from typing import Any, Dict, List, Optional, Tuple, TypedDict, Union

from buildpg import RawDangerous as raw
from buildpg import asyncpg, clauses
from buildpg import funcs as pg_funcs
from buildpg import logic, render
from ciso8601 import parse_rfc3339
from cql2 import Expr
from geojson_pydantic.geometries import Polygon
from morecantile import Tile, TileMatrixSet
from pydantic import BaseModel, Field, model_validator
from pyproj import Transformer

from tipg.errors import (
    InvalidDatetime,
    InvalidDatetimeColumnName,
    InvalidGeometryColumnName,
    InvalidLimit,
    InvalidPropertyName,
    MissingDatetimeColumn,
)
from tipg.logger import logger
from tipg.model import Extent
from tipg.settings import (
    DatabaseSettings,
    FeaturesSettings,
    MVTSettings,
    TableConfig,
    TableSettings,
)

from fastapi import FastAPI

mvt_settings = MVTSettings()
features_settings = FeaturesSettings()

TransformerFromCRS = lru_cache(Transformer.from_crs)


def bbox_to_wkt(bbox: List[float], srid: int = 4326) -> str:
    """Return WKT representation of a BBOX."""
    poly = Polygon.from_bounds(*bbox)  # type:ignore
    return f"SRID={srid};{poly.wkt}"


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
    logger.debug(qsub.format(None, *p))


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


class ItemList(TypedDict):
    """Items."""

    items: List[Feature]
    matched: Optional[int]
    next: Optional[int]
    prev: Optional[int]


class Column(BaseModel):
    """Model for database Column."""

    name: str
    type: str
    description: Optional[str] = None
    geometry_type: Optional[str] = None
    srid: Optional[int] = None
    bounds: Optional[List[float]] = None
    mindt: Optional[str] = None
    maxdt: Optional[str] = None

    @model_validator(mode="before")
    def sridbounds_default(cls, values):
        """Set default bounds and srid when this is a function."""
        if values.get("geometry_type"):
            values["srid"] = values.get("srid", 4326)
            values["bounds"] = values.get("bounds", [-180, -90, 180, 90])
        return values

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

    @property
    def is_geometry(self) -> bool:
        """Returns true if this property is a geometry column."""
        return self.type in ("geometry", "geography")

    @property
    def is_datetime(self) -> bool:
        """Returns true if this property is a datetime column."""
        return self.type in ("timestamp", "timestamptz", "date")


class Parameter(Column):
    """Model for PostGIS function parameters."""

    default: Optional[str] = None


class Collection(BaseModel, metaclass=abc.ABCMeta):
    """Collection Base Class."""

    type: str
    id: str
    table: str
    title: Optional[str] = None
    description: Optional[str] = None
    table_columns: List[Column] = []
    properties: List[Column] = []
    id_column: Optional[Column] = None
    geometry_column: Optional[Column] = None
    datetime_column: Optional[Column] = None
    parameters: List[Parameter] = []

    @property
    def extent(self) -> Optional[Extent]:
        """Return extent."""
        extent: Dict[str, Any] = {}
        if cols := self.geometry_columns:
            if len(cols) == 1:
                bbox = [cols[0].bounds]
            else:
                minx, miny, maxx, maxy = zip(*[col.bounds for col in cols])
                bbox = [
                    [min(minx), min(miny), max(maxx), max(maxy)],
                    *[col.bounds for col in cols],
                ]

            extent["spatial"] = {
                "bbox": bbox,
                # The extent calculated in Pg is in WGS84 LON,LAT order
                # so we use `CRS84` as CRS
                "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
            }

        if cols := [col for col in self.datetime_columns if col.mindt or col.maxdt]:
            intervals = []
            if len(cols) == 1:
                if cols[0].mindt or cols[0].maxdt:
                    intervals = [[cols[0].mindt, cols[0].maxdt]]

            else:
                mindt = [col.mindt for col in cols if col.mindt]
                maxdt = [col.maxdt for col in cols if col.maxdt]
                intervals = [
                    [min(mindt), max(maxdt)],
                    *[[col.mindt, col.maxdt] for col in cols if col.mindt or col.maxdt],
                ]

            if intervals:
                extent["temporal"] = {"interval": intervals}

        if extent:
            return Extent(**extent)

        return None

    @property
    def bounds(self) -> Optional[List[float]]:
        """Return spatial bounds from collection extent."""
        if self.extent and self.extent.spatial:
            return self.extent.spatial.bbox[0]

        return None

    @property
    def dt_bounds(self) -> Optional[List[str]]:
        """Return temporal bounds from collection extent."""
        if self.extent and self.extent.temporal:
            return self.extent.temporal.interval[0]

        return None

    @property
    def crs(self):
        """Return crs of set geometry column."""
        if self.geometry_column:
            return f"http://www.opengis.net/def/crs/EPSG/0/{self.geometry_column.srid}"

    @property
    def geometry_columns(self) -> List[Column]:
        """Return geometry columns."""
        return [c for c in self.table_columns if c.is_geometry]

    @property
    def datetime_columns(self) -> List[Column]:
        """Return datetime columns."""
        return [c for c in self.table_columns if c.is_datetime]

    def get_geometry_column(self, name: Optional[str] = None) -> Optional[Column]:
        """Return the name of the first geometry column."""
        if (not self.geometry_columns) or (name and name.lower() == "none"):
            return None

        if name is None:
            return self.geometry_column

        for col in self.geometry_columns:
            if col.name == name:
                return col

        return None

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

    def cql_where(  # noqa: C901
        self,
        ids: Optional[List[str]] = None,
        datetime: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        properties: Optional[List[Tuple[str, Any]]] = None,
        cql: Optional[Expr] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        tile: Optional[Tile] = None,
        tms: Optional[TileMatrixSet] = None,
    ) -> Expr:
        """Construct WHERE query."""
        exprs = []

        if cql:
            exprs.append(cql)

        # `ids` filter
        if ids:
            # REF: https://github.com/developmentseed/cql2-rs/issues/91
            if len(ids) == 1:
                exprs.append(Expr(f"{self.id_column.name} = {ids[0]}"))
            else:
                id_list = ", ".join(f"'{id_}'" for id_ in ids)
                exprs.append(Expr(f"{self.id_column.name} IN {id_list}"))

        # `properties` filter
        if properties is not None:
            for prop, val in properties:
                col = self.get_column(prop)
                if not col:
                    raise InvalidPropertyName(f"Invalid property name: {prop}")
                exprs.append(Expr(f"{prop}='{val}'"))

        # `bbox` filter
        geometry_column = self.get_geometry_column(geom)
        if bbox is not None and geometry_column is not None:
            # TODO: should we use bbox_to_wkt(bbox)
            exprs.append(
                Expr(
                    f"S_INTERSECTS({geometry_column.name}, {', '.join(map(str, bbox))})"
                )
            )
            print(exprs[0].reduce().to_sql())

        # `datetime` filter
        if datetime:
            if not self.datetime_columns:
                raise MissingDatetimeColumn(
                    "Must have timestamp/timestamptz/date typed column to filter with datetime."
                )

            datetime_column = self.get_datetime_column(dt)
            if not datetime_column:
                raise InvalidDatetimeColumnName(f"Invalid Datetime Column: {dt}.")

            if len(datetime) == 1:
                # NOTE: should we do parse_rfc3339(datetime[0])
                exprs.append(Expr(f"{datetime_column.name}=TIMESTAMP('{datetime[0]}')"))

            else:
                start = (
                    parse_rfc3339(datetime[0])
                    if datetime[0] not in ["..", ""]
                    else None
                )
                end = (
                    parse_rfc3339(datetime[1])
                    if datetime[1] not in ["..", ""]
                    else None
                )
                if start is None and end is None:
                    raise InvalidDatetime(
                        "Double open-ended datetime intervals are not allowed."
                    )

                if start is not None and end is not None and start > end:
                    raise InvalidDatetime(
                        "Start datetime cannot be before end datetime."
                    )

                if (start and end) and start > end:
                    raise ValueError("Invalid datetime range: start must be <= end")

                startstr, endstr = datetime[:2]
                if startstr not in ["..", ""]:
                    exprs.append(
                        Expr(f"{datetime_column.name}>=TIMESTAMP('{startstr}')")
                    )
                if endstr:
                    exprs.append(Expr(f"{datetime_column.name}<=TIMESTAMP('{endstr}')"))

        # if tile and tms and geometry_column:
        #     # Get tile bounds in the TMS coordinate system
        #     bbox = tms.xy_bounds(tile)
        #     left, bottom, right, top = bbox

        #     # If the geometry column’s SRID does not match the TMS CRS, transform the bounds:
        #     # Use a fallback of 4326 if tms.crs.to_epsg() returns a falsey value.
        #     tms_epsg = tms.crs.to_epsg() or 4326
        #     if geometry_column.srid != tms_epsg:
        #         transformer = TransformerFromCRS(
        #             tms_epsg, geometry_column.srid, always_xy=True
        #         )

        #         left, bottom, right, top = transformer.transform_bounds(
        #             left, bottom, right, top
        #         )

        #     wheres.append(
        #         logic.Func(
        #             "ST_Intersects",
        #             logic.Func(
        #                 "ST_Segmentize",
        #                 logic.Func(
        #                     "ST_MakeEnvelope",
        #                     left,
        #                     bottom,
        #                     right,
        #                     top,
        #                     geometry_column.srid,
        #                 ),
        #                 right - left,
        #             ),
        #             logic.V(geometry_column.name),
        #         )
        #     )
        if exprs:
            return reduce(lambda x, y: x + y, exprs).reduce()

        return None

    @abc.abstractmethod
    async def features(self, *args, **kwargs) -> ItemList:
        """Get Items."""
        ...

    @abc.abstractmethod
    async def get_tile(self, *args, **kwargs) -> bytes:
        """Get MVT Tile."""
        ...


class CollectionList(TypedDict):
    """Collections."""

    collections: List[Collection]
    matched: Optional[int]
    next: Optional[int]
    prev: Optional[int]


class Catalog(TypedDict):
    """Internal Collection Catalog."""

    collections: Dict[str, Collection]
    last_updated: datetime.datetime


class PgCollection(Collection):
    """Model for DB Table and Function."""

    dbschema: str = Field(alias="schema")

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
                id_clause = logic.V(self.id_column.name).as_("tipg_id")
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
        geometry_column: Optional[Column],
        bbox_only: Optional[bool],
        simplify: Optional[float],
        geom_as_wkt: bool = False,
    ):
        sel = self._select_no_geo(properties)

        geom = self._geom(geometry_column, bbox_only, simplify)
        if geom_as_wkt:
            if geom:
                sel = sel.comma(logic.Func("ST_AsEWKT", geom).as_("tipg_geom"))
            else:
                sel = sel.comma(pg_funcs.cast(None, "text").as_("tipg_geom"))

        else:
            if geom:
                sel = sel.comma(
                    pg_funcs.cast(logic.Func("ST_AsGeoJSON", geom), "json").as_(
                        "tipg_geom"
                    )
                )
            else:
                sel = sel.comma(pg_funcs.cast(None, "json").as_("tipg_geom"))

        return sel

    def _select_mvt(
        self,
        properties: Optional[List[str]],
        geometry_column: Column,
        tms: TileMatrixSet,
        tile: Tile,
    ):
        """Create MVT from intersecting geometries."""
        geom = pg_funcs.cast(logic.V(geometry_column.name), "geometry")

        # make sure the geometries do not overflow the TMS bbox
        if not tms.is_valid(tile):
            geom = logic.Func(
                "ST_Intersection",
                logic.Func("ST_MakeEnvelope", *tms.bbox, 4326),
                logic.Func(
                    "ST_Transform",
                    geom,
                    pg_funcs.cast(4326, "int"),
                ),
            )

        # Transform the geometries to TMS CRS using EPSG code
        if tms_srid := tms.crs.to_epsg():
            transform_logic = logic.Func(
                "ST_Transform",
                geom,
                pg_funcs.cast(tms_srid, "int"),
            )

        # Transform the geometries to TMS CRS using PROJ String
        else:
            tms_proj = tms.crs.to_proj4()
            transform_logic = logic.Func(
                "ST_Transform",
                geom,
                pg_funcs.cast(tms_proj, "text"),
            )

        bbox = tms.xy_bounds(tile)
        sel = self._select_no_geo(properties, addid=False).comma(
            logic.Func(
                "ST_AsMVTGeom",
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
                mvt_settings.tile_resolution,
                mvt_settings.tile_buffer,
                mvt_settings.tile_clip,
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
        geometry_column: Optional[Column],
        bbox_only: Optional[bool],
        simplify: Optional[float],
    ):
        if geometry_column is None:
            return None

        g = pg_funcs.cast(logic.V(geometry_column.name), "geometry")

        # Reproject to WGS64 if needed
        if geometry_column.srid != 4326:
            g = logic.Func("ST_Transform", g, pg_funcs.cast(4326, "int"))

        # Return BBOX Only
        if bbox_only:
            g = logic.Func("ST_Envelope", g)

        # Simplify the geometry
        elif simplify:
            g = logic.Func(
                "ST_SnapToGrid",
                logic.Func("ST_Simplify", g, simplify),
                simplify,
            )

        return g

    def _sortby(self, sortby: Optional[str]):
        sorts = []
        if sortby:
            for s in sortby.strip().split(","):
                parts = re.match("^(?P<direction>[+-]?)(?P<column>.*)$", s).groupdict()  # type:ignore

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
                sorts.append(logic.V(self.id_column.name))
            else:
                sorts.append(logic.V(self.properties[0].name))

        return clauses.OrderBy(*sorts)

    async def _features_query(
        self,
        conn: asyncpg.Connection,
        *,
        where: Optional[str] = None,
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
        """Build Features query."""
        limit = limit or features_settings.default_features_limit
        offset = offset or 0

        c = clauses.Clauses(
            self._select(
                properties=properties,
                geometry_column=self.get_geometry_column(geom),
                bbox_only=bbox_only,
                simplify=simplify,
                geom_as_wkt=geom_as_wkt,
            ),
            self._from(function_parameters),
            clauses.Where(where or logic.S(True)),
            self._sortby(sortby),
            clauses.Limit(limit),
            clauses.Offset(offset),
        )

        q, p = render(":c", c=c)
        for r in await conn.fetch(q, *p):
            props = dict(r)
            g = props.pop("tipg_geom")
            id = props.pop("tipg_id")
            feature = Feature(type="Feature", geometry=g, id=id, properties=props)
            yield feature

    async def _features_count_query(
        self,
        conn: asyncpg.Connection,
        *,
        where: Optional[str],
        function_parameters: Optional[Dict[str, str]],
    ) -> int:
        """Build features COUNT query."""
        c = clauses.Clauses(
            self._select_count(),
            self._from(function_parameters),
            clauses.Where(where or logic.S(True)),
        )

        q, p = render(":c", c=c)
        count = await conn.fetchval(q, *p)
        return count

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

        where_filter = self.cql_where(
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
            where=where_filter.to_sql() if where_filter else None,
            function_parameters=function_parameters,
        )

        features = [
            f
            async for f in self._features_query(
                conn,
                where=where_filter.to_sql() if where_filter else None,
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

        c = clauses.Clauses(
            self._select_mvt(
                properties=properties,
                geometry_column=geometry_column,
                tms=tms,
                tile=tile,
            ),
            self._from(function_parameters),
            clauses.Where(where_filter.to_sql() if where_filter else logic.S(True)),
            clauses.Limit(limit),
        )

        q, p = render(
            """
            WITH
            t AS (:c)
            SELECT ST_AsMVT(t.*, :l) FROM t
            """,
            c=c,
            l=self.table if mvt_settings.set_mvt_layername is True else "default",
        )
        debug_query(q, *p)

        tile = await conn.fetchval(q, *p)

        return bytes(tile)


async def pg_get_collection_index(  # noqa: C901
    conn: asyncpg.Connection,
    settings: Optional[DatabaseSettings] = None,
) -> List[Collection]:
    """Fetch Table and Functions index."""
    if not settings:
        settings = DatabaseSettings()

    schemas = settings.schemas or ["public"]

    query = f"""
        SELECT {settings.tipg_schema}.tipg_catalog(
            :schemas,
            :tables,
            :exclude_tables,
            :exclude_table_schemas,
            :functions,
            :exclude_functions,
            :exclude_function_schemas,
            :spatial,
            :spatial_extent,
            :datetime_extent
        );
    """  # noqa: W605

    rows = await conn.fetch_b(
        query,
        schemas=schemas,
        tables=settings.tables,
        exclude_tables=settings.exclude_tables,
        exclude_table_schemas=settings.exclude_table_schemas,
        functions=settings.functions,
        exclude_functions=settings.exclude_functions,
        exclude_function_schemas=settings.exclude_function_schemas,
        spatial=settings.only_spatial_tables,
        spatial_extent=settings.spatial_extent,
        datetime_extent=settings.datetime_extent,
    )

    collections: List[Collection] = []
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

        collections.append(
            PgCollection(
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
            )
        )

    return collections


async def register_collection_catalog(
    app: FastAPI,
    db_settings: Optional[DatabaseSettings] = None,
) -> None:
    """Register Table catalog."""
    async with app.state.pool.acquire() as conn:
        db_collections = await pg_get_collection_index(conn, settings=db_settings)

    app.state.collection_catalog = Catalog(
        collections={col.id: col for col in [*db_collections]},
        last_updated=datetime.datetime.now(),
    )
