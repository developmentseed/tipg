"""tifeatures.layers."""

import abc
from dataclasses import dataclass
from typing import Any, ClassVar, Dict, List, Optional

from buildpg import Var as pg_variable
from buildpg import asyncpg, clauses
from buildpg import funcs as pg_funcs
from buildpg import render
from geojson_pydantic import Feature, FeatureCollection
from pydantic import BaseModel, root_validator

from tifeatures.dbmodel import Table as DBTable


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

    async def features(
        self,
        pool: asyncpg.BuildPgPool,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        **kwargs: Any,
    ) -> Items:
        """Return a FeatureCollection."""

        limit = limit or 10
        offset = offset or 0

        async with pool.acquire() as conn:
            sql_query = """
                WITH
                    features AS (
                        SELECT
                        *
                        FROM :tablename
                        -- TODO: WHERE
                        -- TODO: SORT
                        LIMIT :limit OFFSET :offset
                    ),
                    total_count AS (
                        SELECT COUNT(*) FROM :tablename
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
                            'properties', to_jsonb( features.* ) - :geometry_column_str
                        )
                    ),
                    'total_count', total_count.count
                )
                FROM features, total_count
                GROUP BY total_count.count;
            """

            geometry_column = self.geometry_column(kwargs.get("geom"))
            if not geometry_column:
                raise Exception(
                    f"Could not find any geometry column for Table {self.id}"
                )
            geometry_srid = geometry_column.srid

            q, p = render(
                sql_query,
                tablename=pg_variable(self.id),
                id_column=pg_variable(self.id_column),
                geometry_column=pg_variable(geometry_column.name),
                geometry_column_str=geometry_column.name,
                srid=geometry_srid,
                limit=limit,
                offset=offset,
            )

            return await conn.fetchval(q, *p)

    async def feature(
        self,
        pool: asyncpg.BuildPgPool,
        item_id: str,
        **kwargs: Any,
    ) -> Feature:
        """Return a Feature."""
        async with pool.acquire() as conn:
            sql_query = """
                WITH
                features AS (
                    SELECT *
                    FROM :tablename t
                    :where_logic
                    LIMIT 1
                )
                SELECT
                    json_build_object(
                            'type', 'Feature',
                            'id', :id_column,
                            'geometry', ST_AsGeoJSON(
                                CASE
                                    WHEN :srid = 4326 THEN :geometry_column
                                    ELSE ST_Transform(:geometry_column, 4326)
                                END
                                )::json,
                            'properties', to_jsonb( features.* ) - :geometry_column_str
                        )
                FROM features
            """
            geometry_column = self.geometry_column(kwargs.get("geom"))
            if not geometry_column:
                raise Exception(
                    f"Could not find any geometry column for Table {self.id}"
                )
            geometry_srid = geometry_column.srid

            where_logic = clauses.Where(
                pg_variable(self.id_column)
                == pg_funcs.cast(
                    pg_funcs.cast(item_id, "text"),
                    self.id_column_info.type,
                )
            )

            q, p = render(
                sql_query,
                tablename=pg_variable(self.id),
                id_column=pg_variable(self.id_column),
                geometry_column=pg_variable(geometry_column.name),
                geometry_column_str=geometry_column.name,
                srid=geometry_srid,
                where_logic=where_logic,
            )

            return await conn.fetchval(q, *p)


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
