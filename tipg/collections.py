"""tipg.dbmodel: database events."""

import datetime
import re
from functools import cached_property
from typing import Any, Dict, List, Optional, Tuple, TypedDict, Union

import asyncpg
from fastapi import FastAPI
from morecantile import Tile, TileMatrixSet
from pgmini import And, Or, Select, With, Param
from pydantic import BaseModel, Field, model_validator
from pygeofilter.ast import AstType

from tipg.errors import (
    InvalidDatetime,
    InvalidDatetimeColumnName,
    InvalidGeometryColumnName,
    InvalidLimit,
    InvalidPropertyName,
    MissingDatetimeColumn,
)
from tipg.filter.cql2sql import CQL2SQL
from tipg.filter.filters import bbox_to_wkt
from tipg.logger import logger
from tipg.model import Extent
from tipg.query import (
    NULL,
    Bbox,
    Count,
    F,
    P,
    Table,
    Transform,
    build,
    date_param,
    ensure_list,
    raw_query,
    simplified,
)
import pgmini
from tipg.settings import FeaturesSettings, MVTSettings, TableSettings

mvt_settings = MVTSettings()
features_settings = FeaturesSettings()


def debug_query(q, *p):
    """Utility to print raw statement to use for debugging."""
    logger.debug(raw_query(q, *p))


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


class Collection(BaseModel):
    """Model for DB Table and Function."""

    type: str
    id: str
    table: str
    dbschema: str = Field(..., alias="schema")
    title: Optional[str] = None
    description: Optional[str] = None
    properties: List[Column] = []
    id_column: Optional[str] = None
    geometry_column: Optional[Column] = None
    datetime_column: Optional[Column] = None
    parameters: List[Parameter] = []

    @cached_property
    def T(self):
        """Returns a pgmini Table."""
        tablecls = type(
            self.table,
            (Table,),
            {f'"{c.name}"': c.type for c in self.properties},
        )
        return tablecls(self.table)

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

    @cached_property
    def crs(self):
        """Return crs of set geometry column."""
        if self.geometry_column:
            return f"http://www.opengis.net/def/crs/EPSG/0/{self.geometry_column.srid}"

    @property
    def geometry_columns(self) -> List[Column]:
        """Return geometry columns."""
        return [c for c in self.properties if c.is_geometry]

    @property
    def datetime_columns(self) -> List[Column]:
        """Return datetime columns."""
        return [c for c in self.properties if c.is_datetime]

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
        columns = self.columns(properties)
        cols = self.T.cols(columns)

        if addid:
            cols.append(self.T.create_tipg_id(self.id_column))

        return Select(*cols)

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

        gcol = None
        if geom_as_wkt:
            if geom:
                gcol = F("ST_AsEWKT", geom)
            else:
                gcol = NULL("text")

        else:
            if geom:
                gcol = F("ST_AsGeoJSON", geom).Cast("json")
            else:
                gcol = NULL("json")

        return sel.AddColumns(gcol.As("tipg_geom"))

    def _select_mvt(
        self,
        properties: Optional[List[str]],
        geometry_column: Column,
        tms: TileMatrixSet,
        tile: Tile,
    ):
        """Create MVT from intersecting geometries."""

        geom = self.T.get(geometry_column.name).Cast("geometry")

        # make sure the geometries do not overflow the TMS bbox
        if not tms.is_valid(tile):
            geom = F(
                "ST_Intersection",
                Bbox(tms.box),
                Transform(geom),
            )

        # Transform the geometries to TMS CRS using EPSG code
        if tms_srid := tms.crs.to_epsg():
            transform_logic = Transform(geom, tms_srid)

        # Transform the geometries to TMS CRS using PROJ String
        else:
            tms_proj = tms.crs.to_proj4()
            transform_logic = Transform(geom, tms_proj)

        bbox = tms.xy_bounds(tile)
        sel = self._select_no_geo(properties, addid=False).AddColumns(
            F(
                "ST_AsMVTGeom",
                transform_logic,
                F(
                    "ST_Segmentize",
                    Bbox(bbox),
                    bbox.right - bbox.left,
                ),
                mvt_settings.tile_resolution,
                mvt_settings.tile_buffer,
                mvt_settings.tile_clip,
            ).As("geom")
        )

        return sel

    def _select_count(self):
        return Select(Count())

    def _from(self, function_parameters: Optional[Dict[str, str]]):
        if self.type == "Function":
            if not function_parameters:
                return F(self.id)
            params = []
            for p in self.parameters:
                if p.name in function_parameters:
                    params.append(P(function_parameters[p.name]).Cast(p.type))
            return F(self.id, *params)
        return self.T

    def _geom(
        self,
        geometry_column: Optional[Column],
        bbox_only: Optional[bool],
        simplify: Optional[float],
    ):
        if geometry_column is None:
            return None

        g = self.T.get(geometry_column.name).Cast("geometry")

        # Reproject to WGS84 if needed
        if geometry_column.srid != 4326:
            g = Transform(g)

        # Return BBOX Only
        if bbox_only:
            g = F("ST_Envelope", g)

        # Simplify the geometry
        elif simplify:
            g = simplified(g, simplify)

        return g

    def _where(  # noqa: C901
        self,
        ids: Optional[List[str]] = None,
        datetime: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        properties: Optional[List[Tuple[str, Any]]] = None,
        cql: Optional[Any] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        tile: Optional[Tile] = None,
        tms: Optional[TileMatrixSet] = None,
    ):
        """Construct WHERE query."""
        wheres = []

        # `ids` filter
        if ids is not None:
            ids = ensure_list(ids)
            w = [
                self.T.get(self.id_column) == P(i).Cast(self.id_column_info.type)
                for i in ids
            ]
            wheres.append(Or(*w))

        # `properties filter
        if properties is not None:
            w = []
            for prop, val in properties:
                col = self.get_column(prop)
                if not col:
                    raise InvalidPropertyName(f"Invalid property name: {prop}")
                dbcol = self.T.get(col.name)

                w.append(dbcol == P(val).Cast(col.type))

            if w:
                wheres.append(And(*w))

        # `bbox` filter
        geometry_column = self.get_geometry_column(geom)
        if bbox is not None and geometry_column is not None:
            wheres.append(
                F(
                    "ST_Intersects",
                    Bbox(bbox),
                    self.T.get(geometry_column.name),
                )
            )

        # `datetime` filter
        if datetime:
            if not self.datetime_columns:
                raise MissingDatetimeColumn(
                    "Must have timestamp/timestamptz/date typed column to filter with datetime."
                )

            datetime_column = self.get_datetime_column(dt)
            if not datetime_column:
                raise InvalidDatetimeColumnName(f"Invalid Datetime Column: {dt}.")

            wheres.append(self._datetime_filter_to_sql(datetime, datetime_column.name))

        # `CQL` filter
        if cql is not None:
            print('ADDING CQL FILTER', cql)
            cqlt = CQL2SQL(self)
            print('CQLT', cqlt)
            wheres.append(cqlt.sql(cql))

        if tile and tms and geometry_column:
            # Get Tile Bounds in Geographic CRS (usually epsg:4326)
            left, bottom, right, top = tms.bounds(tile)

            # Truncate bounds to the max TMS bbox
            left, bottom = tms.truncate_lnglat(left, bottom)
            right, top = tms.truncate_lnglat(right, top)

            wheres.append(
                F(
                    "ST_Intersects",
                    Transform(
                        F(
                            "ST_Segmentize",
                            Bbox((left, bottom, right, top)),
                            right - left,
                        ),
                        geometry_column.srid,
                    ),
                    self.T.get(geometry_column.name),
                )
            )

        return wheres

    def _datetime_filter_to_sql(self, interval: List[str], dt_name: str):
        datecol = self.T.get(dt_name)
        if len(interval) == 1:
            return datecol == date_param(interval[0])
        else:
            start = interval[0] if interval[0] not in ["..", ""] else None
            end = interval[1] if interval[1] not in ["..", ""] else None

            if start is None and end is None:
                raise InvalidDatetime(
                    "Double open-ended datetime intervals are not allowed."
                )

            if start is not None and end is not None and start > end:
                raise InvalidDatetime("Start datetime cannot be before end datetime.")

            if not start:
                return datecol <= date_param(end)

            elif not end:
                return datecol >= date_param(start)

            else:
                return And(datecol >= date_param(start), datecol < date_param(end))

    def _sortby(self, sortby: Optional[str]):
        print('SORTBY', sortby)
        sorts = []
        if sortby:
            for s in sortby.strip().split(","):
                parts = re.match("^(?P<direction>[+-]?)(?P<column>.*)$", s).groupdict()  # type:ignore

                direction = parts["direction"]
                column = parts["column"].strip()
                if self.get_column(column):
                    colexpr = self.T.get(column)
                    if direction == "-":
                        sorts.append(colexpr.Desc())
                    else:
                        sorts.append(colexpr.Asc())
                else:
                    raise InvalidPropertyName(f"Property {column} does not exist.")

        else:
            if self.id_column is not None:
                print('sorting by id column')
                idcol = self.T.get(self.id_column)
                print(idcol)
                print(idcol.Asc())
                sorts.append(idcol.Asc())
            else:
                print('sorting by first column')
                sorts.append(self.T.get(self.properties[0].name).Asc())
        print('SORTS', sorts)
        return sorts

    async def _features_query(
        self,
        *,
        pool: asyncpg.Pool,
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
        limit = limit or features_settings.default_features_limit
        offset = offset or 0
        query = (
            self._select(
                properties=properties,
                geometry_column=self.get_geometry_column(geom),
                bbox_only=bbox_only,
                simplify=simplify,
                geom_as_wkt=geom_as_wkt,
            )
            .From(self._from(function_parameters))
            .Where(*self._where(
                ids=ids_filter,
                datetime=datetime_filter,
                bbox=bbox_filter,
                properties=properties_filter,
                cql=cql_filter,
                geom=geom,
                dt=dt,
            ))
            .OrderBy(*self._sortby(sortby))
            .Limit(limit)
            .Offset(offset)
        )

        q, p = build(query)

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
        pool: asyncpg.Pool,
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
        query = self._select_count(
        ).From(
            self._from(function_parameters)
        ).Where(*self._where(
            ids=ids_filter,
            datetime=datetime_filter,
            bbox=bbox_filter,
            properties=properties_filter,
            cql=cql_filter,
            geom=geom,
            dt=dt,
        ))

        q, p = build(query)
        async with pool.acquire() as conn:
            count = await conn.fetchval(q, *p)
            return count

    async def features(
        self,
        pool: asyncpg.Pool,
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
        function_parameters: Optional[Dict[str, str]] = None,
    ) -> ItemList:
        """Build and run Pg query."""
        offset = offset or 0
        function_parameters = function_parameters or {}

        if geom and geom.lower() != "none" and not self.get_geometry_column(geom):
            raise InvalidGeometryColumnName(f"Invalid Geometry Column: {geom}.")

        if limit and limit > features_settings.max_features_per_query:
            raise InvalidLimit(
                f"Limit can not be set higher than the `tipg_max_features_per_query` setting of {features_settings.max_features_per_query}"
            )

        matched = await self._features_count_query(
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
        returned = len(features)

        return ItemList(
            items=features,
            matched=matched,
            next=offset + returned if matched - returned > offset else None,
            prev=max(offset - returned, 0) if offset else None,
        )

    async def get_tile(
        self,
        *,
        pool: asyncpg.Pool,
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
        limit = limit or mvt_settings.max_features_per_tile

        geometry_column = self.get_geometry_column(geom)
        if not geometry_column:
            raise InvalidGeometryColumnName(f"Invalid Geometry Column Name {geom}")

        if limit > mvt_settings.max_features_per_tile:
            raise InvalidLimit(
                f"Limit can not be set higher than the `tipg_max_features_per_tile` setting of {mvt_settings.max_features_per_tile}"
            )
        mvtlayername = (
            self.table if mvt_settings.set_mvt_layername is True else "default"
        )

        baseq = (
            self._select_mvt(
                properties=properties,
                geometry_column=geometry_column,
                tms=tms,
                tile=tile,
            )
            .From(self._from(function_parameters))
            .Where(
                *self._where(
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
            )
            .Limit(limit).Subquery('baseq')
        )
        print('BASEQ', build(baseq, 'raw'))
        query = With(baseq).Select(
            F(
                "ST_AsMVT",
                pgmini.raw.Raw('baseq.*'),
                mvtlayername
            )
        ).From(baseq)

        q, p = build(query)
        print('WITHQUERY', query)
        print('-----')
        print(build(query, 'raw'))
        debug_query(q, *p)

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


async def get_collection_index(  # noqa: C901
    db_pool: asyncpg.Pool,
    schemas: Optional[List[str]] = None,
    tables: Optional[List[str]] = None,
    exclude_tables: Optional[List[str]] = None,
    exclude_table_schemas: Optional[List[str]] = None,
    functions: Optional[List[str]] = None,
    exclude_functions: Optional[List[str]] = None,
    exclude_function_schemas: Optional[List[str]] = None,
    spatial: bool = True,
    spatial_extent: bool = True,
    datetime_extent: bool = True,
) -> Catalog:
    """Fetch Table and Functions index."""
    schemas = schemas or ["public"]

    queryf = F(
        "pg_temp.tipg_catalog",
        schemas,
        tables,
        exclude_tables,
        exclude_table_schemas,
        functions,
        exclude_functions,
        exclude_function_schemas,
        spatial,
        spatial_extent,
        datetime_extent,
    )
    query = Select(queryf.STAR).From(queryf)
    q, p = build(query)

    async with db_pool.acquire() as conn:
        rows = await conn.fetch(q, *p)

        catalog: Dict[str, Collection] = {}
        table_settings = TableSettings()
        table_confs = table_settings.table_config
        fallback_key_names = table_settings.fallback_key_names

        for row in rows:
            table = row[0]
            table_id = table["schema"] + "." + table["name"]
            confid = table["schema"] + "_" + table["name"]

            if table_id == "pg_temp.tipg_catalog":
                continue

            table_conf = table_confs.get(confid, {})

            # Make sure that any properties set in conf exist in table
            properties = sorted(table.get("properties", []), key=lambda d: d["name"])
            properties_setting = table_conf.get("properties", [])
            if properties_setting:
                properties = [p for p in properties if p["name"] in properties_setting]

            # ID Column
            id_column = table_conf.get("pk") or table.get("pk")
            if not id_column and fallback_key_names:
                for p in properties:
                    if p["name"] in fallback_key_names:
                        id_column = p["name"]
                        break

            datetime_column = None
            geometry_column = None

            for c in properties:
                if c.get("type") in ("timestamp", "timestamptz", "date"):
                    if (
                        table_conf.get("datetimecol") == c["name"]
                        or datetime_column is None
                    ):
                        datetime_column = c

                if c.get("type") in ("geometry", "geography"):
                    if (
                        table_conf.get("geomcol") == c["name"]
                        or geometry_column is None
                    ):
                        geometry_column = c

            catalog[table_id] = Collection(
                type=table["entity"],
                id=table_id,
                table=table["name"],
                schema=table["schema"],
                description=table.get("description", None),
                id_column=id_column,
                properties=properties,
                datetime_column=datetime_column,
                geometry_column=geometry_column,
                parameters=table.get("parameters") or [],
            )

        return Catalog(collections=catalog, last_updated=datetime.datetime.now())


async def register_collection_catalog(app: FastAPI, **kwargs: Any) -> None:
    """Register Table catalog."""
    app.state.collection_catalog = await get_collection_index(app.state.pool, **kwargs)
