"""tifeatures.db: database events."""

import json
from typing import List, Optional

from buildpg import asyncpg

from tifeatures.layer import Table
from tifeatures.settings import PostgresSettings

from fastapi import FastAPI


async def table_index(db_pool: asyncpg.BuildPgPool) -> List[Table]:
    """Fetch Table index."""
    async with db_pool.acquire() as conn:
        sql_query = """
            WITH
            geo_tables AS (
                SELECT
                    Format('%s.%s', n.nspname, c.relname) AS id,
                    n.nspname AS schema,
                    c.relname AS tablename,
                    coalesce(d.description, '') AS description,
                    a.attname AS geometry_column,
                    postgis_typmod_srid(a.atttypmod) AS srid,
                    postgis_typmod_type(a.atttypmod) AS geometry_type,
                    coalesce(ia.attname, '') AS id_column,
                    (
                        SELECT
                            json_object_agg(
                                sa.attname, jsonb_build_object('type', st.typname, 'description', coalesce(da.description,''))
                            )
                        FROM pg_attribute sa
                        JOIN pg_type st ON sa.atttypid = st.oid
                        LEFT JOIN pg_description da ON (c.oid = da.objoid and sa.attnum = da.objsubid)
                        WHERE sa.attrelid = c.oid
                        AND sa.attnum > 0
                        AND NOT sa.attisdropped
                        AND st.typname NOT IN ('geometry', 'geography')
                    ) AS props
                FROM pg_class c
                JOIN pg_namespace n ON (c.relnamespace = n.oid)
                JOIN pg_attribute a ON (a.attrelid = c.oid)
                JOIN pg_type t ON (a.atttypid = t.oid)
                LEFT JOIN pg_description d ON (c.oid = d.objoid AND d.objsubid = 0)
                LEFT JOIN pg_index i ON (c.oid = i.indrelid AND i.indisprimary
                AND i.indnatts = 1)
                LEFT JOIN pg_attribute ia ON (ia.attrelid = i.indexrelid)
                LEFT JOIN pg_type it ON (ia.atttypid = it.oid AND it.typname in ('int2', 'int4', 'int8'))
                WHERE c.relkind IN ('r', 'v', 'm', 'p', 'f')
                AND t.typname = 'geometry'
                AND has_table_privilege(c.oid, 'select')
                AND postgis_typmod_srid(a.atttypmod) > 0
            ),
            t AS (
                SELECT
                    id,
                    schema,
                    tablename,
                    description,
                    geometry_column,
                    geometry_type,
                    id_column,
                    srid,
                    props,
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
                                    ST_Transform(ST_SetSRID(ST_EstimatedExtent(schema, tablename, geometry_column), srid), 4326),
                                    ST_MakeEnvelope(-180, -90, 180, 90, 4326)
                                ) as geom
                        ) AS extent
                    ) AS bounds
                FROM
                    geo_tables
            )
            SELECT
                jsonb_agg(
                    jsonb_build_object(
                        'id', id,
                        'schema', schema,
                        'table', tablename,
                        'geometry_column', geometry_column,
                        'geometry_srid', srid,
                        'geometry_type', geometry_type,
                        'id_column', id_column,
                        'properties', props,
                        'bounds', bounds,
                        'description', description
                    )
                )
            FROM t;
        """
        q = await conn.prepare(sql_query)
        content = await q.fetchval()

    return [Table(**table) for table in content]


async def con_init(conn):
    """Use json for json returns."""
    await conn.set_type_codec(
        "json", encoder=json.dumps, decoder=json.loads, schema="pg_catalog"
    )
    await conn.set_type_codec(
        "jsonb", encoder=json.dumps, decoder=json.loads, schema="pg_catalog"
    )


async def connect_to_db(
    app: FastAPI, settings: Optional[PostgresSettings] = None
) -> None:
    """Connect."""
    if not settings:
        settings = PostgresSettings()

    app.state.pool = await asyncpg.create_pool_b(
        settings.database_url,
        min_size=settings.db_min_conn_size,
        max_size=settings.db_max_conn_size,
        max_queries=settings.db_max_queries,
        max_inactive_connection_lifetime=settings.db_max_inactive_conn_lifetime,
        init=con_init,
    )


async def register_table_catalog(app: FastAPI) -> None:
    """Register Table catalog."""
    app.state.table_catalog = await table_index(app.state.pool)


async def close_db_connection(app: FastAPI) -> None:
    """Close connection."""
    await app.state.pool.close()
