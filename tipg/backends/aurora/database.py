"""tipg.db: database events."""

from typing import List, Optional

import orjson
from buildpg import asyncpg

from tipg.logger import logger
from tipg.settings import PostgresSettings

from fastapi import FastAPI


class connection_factory:
    """Connection creation."""

    tipg_schema: str
    schemas: List[str]

    def __init__(self, tipg_schema: str, schemas: Optional[List[str]] = None) -> None:
        """Init."""
        self.tipg_schema = tipg_schema
        self.schemas = schemas or []

    async def __call__(self, conn: asyncpg.Connection):
        """Create connection."""
        await conn.set_type_codec(
            "json", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
        )
        await conn.set_type_codec(
            "jsonb", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
        )

        schemas = ",".join([self.tipg_schema, *self.schemas])

        logger.debug(f"Looking for Tables and Functions in {schemas} schemas")

        await conn.execute(
            f"""
            SELECT set_config(
                'search_path',
                '{schemas},' || current_setting('search_path', false),
                false
                );
            """
        )


async def connect_to_db(
    app: FastAPI,
    settings: Optional[PostgresSettings] = None,
    schemas: Optional[List[str]] = None,
    tipg_schema: str = "public",
    **kwargs,
) -> None:
    """Connect."""
    if not settings:
        settings = PostgresSettings()

    con_init = connection_factory(tipg_schema, schemas)

    app.state.pool = await asyncpg.create_pool_b(
        settings.database_url,
        min_size=settings.db_min_conn_size,
        max_size=settings.db_max_conn_size,
        max_queries=settings.db_max_queries,
        max_inactive_connection_lifetime=settings.db_max_inactive_conn_lifetime,
        init=con_init,
        **kwargs,
    )

    query = """
        SELECT COUNT(*)
        FROM pg_proc p INNER JOIN pg_namespace ns ON (p.pronamespace = ns.oid)
        WHERE ns.nspname = :schema AND p.proname = 'tipg_catalog';
    """

    async with app.state.pool.acquire() as conn:
        rows = await conn.fetch_b(query, schema=tipg_schema)
        assert rows, f"Couldn't find `tipg_catalog` in {tipg_schema}"


async def close_db_connection(app: FastAPI) -> None:
    """Close connection."""
    await app.state.pool.close()
