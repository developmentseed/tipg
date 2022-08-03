"""tifeatures.dbmodel: database events."""

from typing import Any, Dict, List, Optional

from buildpg import asyncpg
from pydantic import BaseModel, Field


class Column(BaseModel):
    """Model for database Column."""

    name: str
    type: str
    description: Optional[str]

    @property
    def json_type(self) -> str:
        """Return JSON field type."""
        pgtype = self.type

        if pgtype.endswith("[]"):
            return "array"

        if any(
            [
                pgtype.startswith("int"),
                pgtype.startswith("num"),
                pgtype.startswith("float"),
            ]
        ):
            return "number"

        if pgtype.startswith("bool"):
            return "boolean"

        if any([pgtype.startswith("json"), pgtype.startswith("geo")]):
            return "object"

        return "string"


class GeometryColumn(BaseModel):
    """Model for PostGIS geometry/geography column."""

    name: str
    bounds: List[float]
    srid: int
    geometry_type: str


class Table(BaseModel):
    """Model for DB Table."""

    id: str
    table: str
    dbschema: str = Field(..., alias="schema")
    description: Optional[str]
    id_column: str
    geometry_columns: List[GeometryColumn]
    properties: List[Column]

    @property
    def datetime_columns(self) -> List[Column]:
        """Return the name of all timestamptz columns."""
        return [p for p in self.properties if p.type.startswith("timestamp")]

    def datetime_column(self, name: Optional[str] = None) -> Optional[Column]:
        """Return the Column for either the passed in tstz column or the first tstz column."""
        for col in self.datetime_columns:
            if name is None or col.name == name:
                return col

        return None

    def geometry_column(self, name: Optional[str] = None) -> Optional[GeometryColumn]:
        """Return the name of the first geometry column."""
        if name and name.lower() == "none":
            return None

        for col in self.geometry_columns:
            if name is None or col.name == name:
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
        cols = [c.name for c in self.properties]
        if properties is not None:
            if self.id_column not in properties:
                properties.append(self.id_column)

            geom_col = self.geometry_column()
            if geom_col:
                properties.append(geom_col.name)

            cols = [col for col in cols if col in properties]

        if len(cols) < 1:
            raise TypeError("No columns selected")

        return cols

    def get_column(self, property_name: str) -> Optional[Column]:
        """Return column info."""
        for p in self.properties:
            if p.name == property_name:
                return p

        return None


Database = Dict[str, Dict[str, Any]]


async def get_table_index(
    db_pool: asyncpg.BuildPgPool,
    schemas: Optional[List[str]] = ["public"],
    tables: Optional[List[str]] = None,
    spatial: bool = True,
) -> Database:
    """Fetch Table index."""

    query = """
        WITH t AS (
            SELECT
                nspname as schemaname,
                relname as tablename,
                format('%I.%I', nspname, relname) as id,
                c.oid as t_oid,
                obj_description(c.oid, 'pg_class') as description,
                (
                    SELECT
                        attname
                    FROM
                        pg_attribute a
                        LEFT JOIN
                        pg_index i
                        ON (
                            a.attrelid = i.indrelid
                            AND a.attnum = ANY(i.indkey)
                            )
                    WHERE
                        a.attrelid = c.oid
                    ORDER BY
                        i.indisprimary DESC NULLS LAST,
                        i.indisunique DESC NULLS LAST,
                        attname ~* E'id$' DESC NULLS LAST
                    LIMIT 1
                ) as pk,
                (
                    SELECT
                        jsonb_agg(
                            jsonb_build_object(
                                'name', attname,
                                'type', format_type(atttypid, null),
                                'description', col_description(attrelid, attnum)
                            )
                        )
                    FROM
                        pg_attribute
                    WHERE
                        attnum>0
                        AND attrelid=c.oid
                        AND NOT attisdropped
                ) as columns,
                (
                    SELECT
                        coalesce(jsonb_agg(
                            jsonb_build_object(
                                'name', f_geometry_column,
                                'srid', srid,
                                'geometry_type', type,
                                'bounds',
                                    CASE WHEN srid IS NOT NULL AND srid != 0 THEN
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
                                                                ST_EstimatedExtent(f_table_schema, f_table_name, f_geometry_column),
                                                                srid
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
                        ),'[]'::jsonb)
                    FROM
                        (
                        SELECT f_table_schema, f_table_name, f_geometry_column, srid, type
                        FROM geometry_columns
                        UNION ALL
                        SELECT f_table_schema, f_table_name, f_geography_column, 4326, type
                        FROM geography_columns
                        ) as geo
                    WHERE
                        f_table_schema = n.nspname
                        AND f_table_name = c.relname
                ) as geometry_columns
            FROM
                pg_class c
                JOIN pg_namespace n ON (c.relnamespace=n.oid)
            WHERE
                relkind in ('r','v', 'm', 'f', 'p')
                AND n.nspname NOT IN ('pg_catalog', 'information_schema')
                AND c.relname NOT IN ('spatial_ref_sys','geometry_columns')
                AND (:schemas::text[] IS NULL OR n.nspname = ANY (:schemas))
                AND (:tables::text[] IS NULL OR c.relname = ANY (:tables))

        )
        SELECT
                id,
                schemaname as dbschema,
                tablename as tablename,
                geometry_columns,
                pk as id_col,
                columns as properties,
                description
        FROM t
        WHERE :spatial = FALSE OR jsonb_array_length(geometry_columns)>=1
        ;
    """

    async with db_pool.acquire() as conn:
        rows = await conn.fetch_b(
            query, schemas=schemas, tables=tables, spatial=spatial
        )
        keys = [
            "id",
            "schema",
            "table",
            "geometry_columns",
            "id_column",
            "properties",
            "description",
        ]
        return {row["id"]: dict(zip(keys, tuple(row))) for row in rows}
