"""tifeatures.layers."""

import abc
from dataclasses import dataclass
from typing import Any, ClassVar, Dict, List, Optional

from buildpg import asyncpg, clauses
from buildpg import funcs as pg_funcs
from buildpg import logic, render
from geojson_pydantic import Feature, FeatureCollection
from pydantic import BaseModel, root_validator
from pygeofilter.ast import AstType

from tifeatures.dbmodel import Table as DBTable
from tifeatures.errors import MissingGeometryColumn
from tifeatures.filter.evaluate import to_filter
from tifeatures.filter.filters import bbox_to_wkt


class Items(FeatureCollection):
    """Custom FeatureCollection Model return by `features` methods."""

    total_count: int


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
        ids: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        datetime: Optional[List[str]] = None,
        filter_query: Optional[AstType] = None,
        properties: Optional[List[str]] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        **kwargs: Any,
    ) -> Items:
        """Return a FeatureCollection."""
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

    def _where(
        self,
        ids: Optional[List[str]] = None,
        datetime: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        filter_query: Optional[AstType] = None,
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
                    == logic.S(pg_funcs.cast(i, self.id_column_info.type))
                    for i in ids
                ]
                wheres.append(pg_funcs.OR(*w))

        # `bbox`` filter
        geometry_column = self.geometry_column(geom)
        if bbox is not None and geometry_column is not None:
            wheres.append(
                logic.Func(
                    "ST_Intersects",
                    logic.S(bbox_to_wkt(bbox)),
                    logic.V(geometry_column.name),
                )
            )

        # datetime filter
        datetime_column = self.datetime_column(dt)
        if datetime is not None and datetime_column is not None:
            if len(datetime) == 1:
                wheres.append(logic.V(datetime_column) == logic.S(datetime[0]))
            else:
                wheres.append(
                    pg_funcs.AND(
                        logic.V(datetime_column) >= logic.S(datetime[0]),
                        logic.V(datetime_column) < logic.S(datetime[1]),
                    )
                )

        # filter
        if filter_query is not None:
            wheres.append(to_filter(filter_query, [p.name for p in self.properties]))

        return clauses.Where(pg_funcs.AND(*wheres))

    def _features_query(
        self,
        ids: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        datetime: Optional[List[str]] = None,
        filter_query: Optional[AstType] = None,
        properties: Optional[List[str]] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        **kwargs: Any,
    ):
        """Build Features query."""
        return (
            self._select(properties)
            + self._from()
            + self._where(
                ids=ids,
                datetime=datetime,
                bbox=bbox,
                filter_query=filter_query,
                **kwargs,
            )
            + clauses.Limit(limit or 10)
            + clauses.Offset(offset or 0)
        )

    def _features_count_query(
        self,
        ids: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        datetime: Optional[List[str]] = None,
        filter_query: Optional[AstType] = None,
        **kwargs: Any,
    ):
        """Build features COUNT query."""
        return (
            self._select_count()
            + self._from()
            + self._where(
                ids=ids,
                datetime=datetime,
                bbox=bbox,
                filter_query=filter_query,
                **kwargs,
            )
        )

    async def query(
        self,
        pool: asyncpg.BuildPgPool,
        ids: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        datetime: Optional[List[str]] = None,
        filter_query: Optional[AstType] = None,
        properties: Optional[List[str]] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        **kwargs: Any,
    ):
        """Build and run Pg query."""
        geom = kwargs.get("geom")
        geometry_column = self.geometry_column(geom)
        if not geometry_column:
            raise MissingGeometryColumn("Must have geometry column for geojson output.")

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
                'features', json_agg(
                    json_build_object(
                        'type', 'Feature',
                        'id', :id_column,
                        'geometry', ST_AsGeoJSON(
                            CASE
                                WHEN :srid = 4326 THEN :geometry_column
                                ELSE ST_Transform(:geometry_column, 4326)
                            END
                            )::json,
                        'properties', to_jsonb( features.* ) - :geom_columns
                    )
                ),
                'total_count', total_count.count
            )
            FROM features, total_count
            GROUP BY total_count.count;
        """
        q, p = render(
            sql_query,
            features_q=self._features_query(
                ids=ids,
                bbox=bbox,
                datetime=datetime,
                filter_query=filter_query,
                properties=properties,
                limit=limit,
                offset=offset,
                **kwargs,
            ),
            count_q=self._features_count_query(
                ids=ids,
                bbox=bbox,
                datetime=datetime,
                filter_query=filter_query,
                **kwargs,
            ),
            id_column=logic.V(self.id_column),
            srid=geometry_column.srid,
            geometry_column=logic.V(geometry_column.name),
            geom_columns=geometry_column.name,
        )

        async with pool.acquire() as conn:
            return await conn.fetchval(q, *p)

    async def features(
        self,
        pool: asyncpg.BuildPgPool,
        ids: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        datetime: Optional[List[str]] = None,
        filter_query: Optional[AstType] = None,
        properties: Optional[List[str]] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        **kwargs: Any,
    ) -> Items:
        """Return a FeatureCollection."""
        return await self.query(
            pool=pool,
            ids=ids,
            bbox=bbox,
            datetime=datetime,
            filter_query=filter_query,
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
    ) -> Feature:
        """Return a Feature."""
        geojson = await self.query(
            pool=pool,
            ids=[item_id],
            properties=properties,
            **kwargs,
        )
        return geojson["features"][0]


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
        ids: Optional[List[str]] = None,
        bbox: Optional[List[float]] = None,
        datetime: Optional[List[str]] = None,
        filter_query: Optional[AstType] = None,
        properties: Optional[List[str]] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        **kwargs: Any,
    ) -> FeatureCollection:
        """Return a FeatureCollection."""
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
