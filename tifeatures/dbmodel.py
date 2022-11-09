"""tifeatures.dbmodel: database events."""

from typing import Any, Dict, List, Optional

from buildpg import asyncpg
from pydantic import BaseModel, Field, root_validator, validator

from tifeatures.settings import APISettings, TableConfig

settings = APISettings()


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

        if pgtype in [
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
            # ref: https://github.com/developmentseed/tifeatures/pull/60/files#r1011863866
            "float8",
        ]:
            return "number"

        if pgtype.startswith("bool"):
            return "boolean"

        if any([pgtype.startswith("json"), pgtype.startswith("geo")]):
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


class Table(BaseModel):
    """Model for DB Table."""

    properties: List[Column] = []
    table_config: Optional[TableConfig]
    id: str
    table: str
    dbschema: str = Field(..., alias="schema")
    description: Optional[str]
    id_column: Optional[str]
    geometry_columns: Optional[List[GeometryColumn]] = []
    datetime_columns: Optional[List[DatetimeColumn]] = []

    @root_validator(pre=True)
    def validate_table_config(cls, values):
        """Get table configurations from settings."""
        id = values.get("id").replace(".", "_")
        if settings.table_config and id in settings.table_config:
            values["table_config"] = settings.table_config.get(id)
        return values

    @validator("id_column", always=True)
    def validate_id_column(cls, v, values):
        """Get primary key."""
        table_config = values.get("table_config", None)
        if table_config is not None:
            return table_config.pk
        if v is not None:
            return v
        if settings.fallback_key_names:
            for c in values.get("properties", []):
                if c.name in settings.fallback_key_names:
                    return c.name

    @validator("geometry_columns", "datetime_columns", always=True)
    def validate_list_columns(cls, v):
        """Validate List Columns."""
        if v is None:
            return []
        return v

    def datetime_column(self, name: Optional[str] = None) -> Optional[Column]:
        """Return the Column for either the passed in tstz column or the first tstz column."""
        if self.datetime_columns is None or len(self.datetime_columns) == 0:
            return None

        if name is None:
            name = getattr(self.table_config, "datetimecol", None)
        for col in self.datetime_columns:
            if name is None or col.name == name:
                return col

        return None

    def geometry_column(self, name: Optional[str] = None) -> Optional[GeometryColumn]:
        """Return the name of the first geometry column."""
        if self.geometry_columns is None or len(self.geometry_columns) == 0:
            return None
        if name and name.lower() == "none":
            return None
        if name is None:
            name = (
                getattr(self.table_config, "geomcol", None)
                if self.table_config
                else None
            )
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
            if self.id_column and self.id_column not in properties:
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
        WITH table_columns AS (
            SELECT
                nspname,
                relname,
                format('%I.%I', nspname, relname) as id,
                c.oid as t_oid,
                obj_description(c.oid, 'pg_class') as description,
                attname,
                atttypmod,
                replace(replace(replace(replace(format_type(atttypid, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp') as "type",
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
            nspname,
            relname,
            id,
            t_oid,
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
            jsonb_agg(
                jsonb_build_object(
                    'name', attname,
                    'type', "type",
                    'geometry_type', postgis_typmod_type(atttypmod),
                    'srid', postgis_typmod_srid(atttypmod),
                    'description', description,
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
            ) FILTER (WHERE "type" IN ('geometry','geography')) as geometry_columns,
            jsonb_agg(
                jsonb_build_object(
                    'name', attname,
                    'type', "type",
                    'description', description
                )
            ) FILTER (WHERE type LIKE 'timestamp%') as datetime_columns,
            jsonb_agg(
                jsonb_build_object(
                    'name', attname,
                    'type', "type",
                    'description', description
                )
            ) as properties
        FROM
            table_columns
        GROUP BY 1,2,3,4,5,6 ORDER BY 1,2
        )
        SELECT
            id,
            relname as table,
            nspname as dbschema,
            description,
            id_column,
            geometry_columns,
            datetime_columns,
            properties
        FROM grouped
        WHERE :spatial = FALSE OR jsonb_array_length(geometry_columns)>=1
        ;

    """

    # query = """
    #     WITH t AS (
    #         SELECT
    #             nspname as schemaname,
    #             relname as tablename,
    #             format('%I.%I', nspname, relname) as id,
    #             c.oid as t_oid,
    #             obj_description(c.oid, 'pg_class') as description,
    #             (
    #                 SELECT
    #                     attname
    #                 FROM
    #                     pg_attribute a
    #                     LEFT JOIN
    #                     pg_index i
    #                     ON (
    #                         a.attrelid = i.indrelid
    #                         AND a.attnum = ANY(i.indkey)
    #                         )
    #                 WHERE
    #                     a.attrelid = c.oid
    #                 ORDER BY
    #                     i.indisprimary DESC NULLS LAST,
    #                     i.indisunique DESC NULLS LAST,
    #                     attname = ANY(:pkeycols) DESC NULLS LAST
    #                 LIMIT 1
    #             ) as pk,
    #             (
    #                 SELECT
    #                     jsonb_agg(
    #                         jsonb_build_object(
    #                             'name', attname,
    #                             'type', replace(replace(replace(replace(format_type(atttypid, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp'),
    #                             'description', col_description(attrelid, attnum)
    #                         )
    #                     )
    #                 FROM
    #                     pg_attribute
    #                 WHERE
    #                     attnum>0
    #                     AND attrelid=c.oid
    #                     AND NOT attisdropped
    #             ) as columns,
    #             (
    #                 SELECT
    #                     coalesce(jsonb_agg(
    #                         jsonb_build_object(
    #                             'name', f_geometry_column,
    #                             'srid', srid,
    #                             'geometry_type', type,
    #                             'bounds',
    #                                 CASE WHEN srid IS NOT NULL AND srid != 0 THEN
    #                                     (
    #                                         SELECT
    #                                             ARRAY[
    #                                                 ST_XMin(extent.geom),
    #                                                 ST_YMin(extent.geom),
    #                                                 ST_XMax(extent.geom),
    #                                                 ST_YMax(extent.geom)
    #                                             ]
    #                                         FROM (
    #                                             SELECT
    #                                                 coalesce(
    #                                                     ST_Transform(
    #                                                         ST_SetSRID(
    #                                                             ST_EstimatedExtent(f_table_schema, f_table_name, f_geometry_column),
    #                                                             srid
    #                                                         ),
    #                                                         4326
    #                                                     ),
    #                                                     ST_MakeEnvelope(-180, -90, 180, 90, 4326)
    #                                                 ) as geom
    #                                             ) AS extent
    #                                     )
    #                                 ELSE ARRAY[-180,-90,180,90]
    #                                 END
    #                         )
    #                     ),'[]'::jsonb)
    #                 FROM
    #                     (
    #                     SELECT f_table_schema, f_table_name, f_geometry_column, srid, type
    #                     FROM geometry_columns
    #                     UNION ALL
    #                     SELECT f_table_schema, f_table_name, f_geography_column, 4326, type
    #                     FROM geography_columns
    #                     ) as geo
    #                 WHERE
    #                     f_table_schema = n.nspname
    #                     AND f_table_name = c.relname
    #             ) as geometry_columns
    #         FROM
    #             pg_class c
    #             JOIN pg_namespace n ON (c.relnamespace=n.oid)
    #         WHERE
    #             relkind in ('r','v', 'm', 'f', 'p')
    #             AND n.nspname NOT IN ('pg_catalog', 'information_schema')
    #             AND c.relname NOT IN ('spatial_ref_sys','geometry_columns')
    #             AND (:schemas::text[] IS NULL OR n.nspname = ANY (:schemas))
    #             AND (:tables::text[] IS NULL OR c.relname = ANY (:tables))

    #     )
    #     SELECT
    #             id,
    #             schemaname as dbschema,
    #             tablename as tablename,
    #             geometry_columns,
    #             pk as id_col,
    #             columns as properties,
    #             description
    #     FROM t
    #     WHERE :spatial = FALSE OR jsonb_array_length(geometry_columns)>=1
    #     ;
    # """

    async with db_pool.acquire() as conn:
        rows = await conn.fetch_b(
            query,
            schemas=schemas,
            tables=tables,
            spatial=spatial,
        )
        catalog = {}
        for table in rows:
            catalog[table["id"]] = {
                "id": table["id"],
                "table": table["table"],
                "schema": table["dbschema"],
                "description": table["description"],
                "id_column": table["id_column"],
                "geometry_columns": table["geometry_columns"],
                "datetime_columns": table["datetime_columns"],
                "properties": table["properties"],
            }
        return catalog
