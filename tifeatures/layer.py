"""tifeatures.layers."""

import abc
import re
from dataclasses import dataclass
from typing import Any, ClassVar, Dict, List, Optional, Tuple

from buildpg import asyncpg, clauses
from buildpg import funcs as pg_funcs
from buildpg import logic, render
from ciso8601 import parse_rfc3339
from geojson_pydantic import Feature, FeatureCollection
from pydantic import BaseModel, root_validator
from pygeofilter.ast import AstType

from tifeatures.dbmodel import GeometryColumn
from tifeatures.dbmodel import Table as DBTable
from tifeatures.errors import (
    InvalidDatetime,
    InvalidDatetimeColumnName,
    InvalidGeometryColumnName,
    InvalidPropertyName,
    MissingDatetimeColumn,
)
from tifeatures.filter.evaluate import to_filter
from tifeatures.filter.filters import bbox_to_wkt

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


class CollectionLayer(BaseModel, metaclass=abc.ABCMeta):
    """Layer's Abstract BaseClass.

    Attributes:
        id (str): Layer's name.
        bounds (list): Layer's bounds (left, bottom, right, top).
        title (str): Layer's title
        description (str): Layer's description

    """

    id: str
    bounds: List[float] = [-180, -90, 180, 90]
    title: Optional[str]
    description: Optional[str]

    @abc.abstractmethod
    async def features(
        self,
        pool: asyncpg.BuildPgPool,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, Any]]] = None,
        cql_filter: Optional[AstType] = None,
        properties: Optional[List[str]] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        **kwargs: Any,
    ) -> Tuple[FeatureCollection, int]:
        """Return a FeatureCollection and the number of matched items."""
        ...

    @abc.abstractmethod
    async def feature(
        self,
        pool: asyncpg.BuildPgPool,
        item_id: str,
        properties: Optional[List[str]] = None,
        **kwargs: Any,
    ) -> Feature:
        """Return a Feature."""
        ...

    @property
    def queryables(self) -> Dict:
        """Return the queryables."""
        ...


class Table(CollectionLayer, DBTable):
    """Table Reader.

    Attributes:
        id (str): Layer's name.
        bounds (list): Layer's bounds (left, bottom, right, top).
        type (str): Layer's type.
        schema (str): Table's database schema (e.g public).
        geometry_type (str): Table's geometry type (e.g polygon).
        srid (int): Table's SRID
        geometry_column (str): Name of the geomtry column in the table.
        properties (Dict): Properties available in the table.

    """

    type: str = "Table"

    @root_validator
    def bounds_default(cls, values):
        """Get default bounds from the first geometry columns."""
        geoms = values.get("geometry_columns")
        if geoms:
            values["bounds"] = geoms[0].bounds
        return values

    def _select(self, properties: Optional[List[str]]):
        return clauses.Select(self.columns(properties))

    def _select_count(self):
        return clauses.Select(pg_funcs.count("*"))

    def _from(self):
        return clauses.From(self.id)

    def _geom(
        self,
        geometry_column: Optional[GeometryColumn],
        bbox_only: Optional[bool],
        simplify: Optional[float],
    ):
        if geometry_column is None:
            return pg_funcs.cast(None, "json")

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

        g = logic.Func("ST_AsGeoJson", g)

        return g

    def _where(
        self,
        ids: Optional[List[str]] = None,
        datetime: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        properties: Optional[List[Tuple[str, Any]]] = None,
        cql: Optional[AstType] = None,
        geom: str = None,
        dt: str = None,
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
        geometry_column = self.geometry_column(geom)
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

            datetime_column = self.datetime_column(dt)
            if not datetime_column:
                raise InvalidDatetimeColumnName(f"Invalid Datetime Column: {dt}.")

            wheres.append(self._datetime_filter_to_sql(datetime, datetime_column.name))

        # `CQL` filter
        if cql is not None:
            wheres.append(to_filter(cql, [p.name for p in self.properties]))

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
            sorts.append(logic.V(self.id_column))

        return clauses.OrderBy(*sorts)

    def _features_query(
        self,
        *,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        cql_filter: Optional[AstType] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: str = None,
        dt: str = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
    ):
        """Build Features query."""
        return (
            self._select(properties)
            + self._from()
            + self._where(
                ids=ids_filter,
                datetime=datetime_filter,
                bbox=bbox_filter,
                properties=properties_filter,
                cql=cql_filter,
                geom=geom,
                dt=dt,
            )
            + self._sortby(sortby)
            + clauses.Limit(limit or 10)
            + clauses.Offset(offset or 0)
        )

    def _features_count_query(
        self,
        *,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        cql_filter: Optional[AstType] = None,
        geom: str = None,
        dt: str = None,
    ):
        """Build features COUNT query."""
        return (
            self._select_count()
            + self._from()
            + self._where(
                ids=ids_filter,
                datetime=datetime_filter,
                bbox=bbox_filter,
                properties=properties_filter,
                cql=cql_filter,
                geom=geom,
                dt=dt,
            )
        )

    async def query(
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
        geom: str = None,
        dt: str = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        bbox_only: Optional[bool] = None,
        simplify: Optional[float] = None,
    ) -> Tuple[FeatureCollection, int]:
        """Build and run Pg query."""
        if geom and geom.lower() != "none" and not self.geometry_column(geom):
            raise InvalidGeometryColumnName(f"Invalid Geometry Column: {geom}.")

        sql_query = """
            WITH
                features AS (
                    :features_q
                ),
                total_count AS (
                    :count_q
                )
            SELECT json_build_object(
                'type', 'FeatureCollection',
                'features',
                    (
                        SELECT
                            json_agg(
                                json_build_object(
                                    'type', 'Feature',
                                    'id', :id_column,
                                    'geometry', :geometry_q,
                                    'properties', to_jsonb( features.* ) - :geom_columns::text[]
                                )
                            )
                        FROM features
                    ),
                'total_count',
                    (
                        SELECT count FROM total_count
                    )
                )
            ;
        """
        q, p = render(
            sql_query,
            features_q=self._features_query(
                ids_filter=ids_filter,
                bbox_filter=bbox_filter,
                datetime_filter=datetime_filter,
                properties_filter=properties_filter,
                cql_filter=cql_filter,
                sortby=sortby,
                properties=properties,
                geom=geom,
                dt=dt,
                limit=limit,
                offset=offset,
            ),
            count_q=self._features_count_query(
                ids_filter=ids_filter,
                bbox_filter=bbox_filter,
                datetime_filter=datetime_filter,
                properties_filter=properties_filter,
                cql_filter=cql_filter,
                geom=geom,
                dt=dt,
            ),
            id_column=logic.V(self.id_column),
            geometry_q=self._geom(
                geometry_column=self.geometry_column(geom),
                bbox_only=bbox_only,
                simplify=simplify,
            ),
            geom_columns=[g.name for g in self.geometry_columns],
        )
        async with pool.acquire() as conn:
            items = await conn.fetchval(q, *p)

        return (
            FeatureCollection(features=items.get("features") or []),
            items["total_count"],
        )

    async def features(
        self,
        pool: asyncpg.BuildPgPool,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        cql_filter: Optional[AstType] = None,
        properties: Optional[List[str]] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        **kwargs: Any,
    ) -> Tuple[FeatureCollection, int]:
        """Return a FeatureCollection and the number of matched items."""
        return await self.query(
            pool=pool,
            ids_filter=ids_filter,
            bbox_filter=bbox_filter,
            datetime_filter=datetime_filter,
            properties_filter=properties_filter,
            cql_filter=cql_filter,
            properties=properties,
            limit=limit,
            offset=offset,
            **kwargs,
        )

    async def feature(
        self,
        pool: asyncpg.BuildPgPool,
        item_id: str,
        properties: Optional[List[str]] = None,
        **kwargs: Any,
    ) -> Optional[Feature]:
        """Return a Feature."""
        feature_collection, _ = await self.query(
            pool=pool,
            ids_filter=[item_id],
            properties=properties,
            **kwargs,
        )
        if len(feature_collection):
            return feature_collection.features[0]

        return None

    @property
    def queryables(self) -> Dict:
        """Return the queryables."""
        geoms = {
            col.name: {"$ref": geojson_schema.get(col.geometry_type.upper(), "")}
            for col in self.geometry_columns
        }
        props = {
            col.name: {"name": col.name, "type": col.json_type}
            for col in self.properties
            if col.name not in geoms
        }
        return {**geoms, **props}


class Function(CollectionLayer):
    """Function Reader.

    Attributes:
        id (str): Layer's name.
        bounds (list): Layer's bounds (left, bottom, right, top).
        type (str): Layer's type.
        function_name (str): Name of the SQL function to call. Defaults to `id`.
        sql (str): Valid SQL function which returns Tile data.
        options (list, optional): options available for the SQL function.

    """

    type: str = "Function"
    sql: str
    function_name: Optional[str]
    options: Optional[List[Dict[str, Any]]]

    @root_validator
    def function_name_default(cls, values):
        """Define default function's name to be same as id."""
        function_name = values.get("function_name")
        if function_name is None:
            values["function_name"] = values.get("id")
        return values

    @classmethod
    def from_file(cls, id: str, infile: str, **kwargs: Any):
        """load sql from file"""
        with open(infile) as f:
            sql = f.read()

        return cls(id=id, sql=sql, **kwargs)

    async def features(
        self,
        pool: asyncpg.BuildPgPool,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        cql_filter: Optional[AstType] = None,
        properties: Optional[List[str]] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        **kwargs: Any,
    ) -> Tuple[FeatureCollection, int]:
        """Return a FeatureCollection and the number of matched items."""
        # TODO
        pass

    async def feature(
        self,
        pool: asyncpg.BuildPgPool,
        item_id: str,
        properties: Optional[List[str]] = None,
        **kwargs: Any,
    ) -> Feature:
        """Return a Feature."""
        # TODO
        pass

    @property
    def queryables(self) -> Dict:
        """Return the queryables."""
        # TODO
        pass


@dataclass
class FunctionRegistry:
    """function registry"""

    funcs: ClassVar[Dict[str, Function]] = {}

    @classmethod
    def get(cls, key: str):
        """lookup function by name."""
        return cls.funcs.get(key)

    @classmethod
    def register(cls, *args: Function):
        """register function(s)."""
        for func in args:
            cls.funcs[func.id] = func

    @classmethod
    def values(cls):
        """get all values."""
        return cls.funcs.values()
