"""tipg.db: database events."""

import logging
from pathlib import Path
from typing import Any, Optional

import orjson
from buildpg import asyncpg

from tipg.dbmodel import get_collection_index
from tipg.settings import APISettings, PostgresSettings

from fastapi import FastAPI


async def con_init(conn):
    """Use json for json returns."""
    await conn.set_type_codec(
        "json", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
    )
    await conn.set_type_codec(
        "jsonb", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
    )


async def connect_to_db(
    app: FastAPI,
    settings: Optional[PostgresSettings] = None,
    **kwargs,
) -> None:
    """Connect."""
    if not settings:
        settings = PostgresSettings()
    apisettings = APISettings()
    logging.warning("Creating database pool.")
    app.state.pool = await asyncpg.create_pool_b(
        settings.database_url,
        min_size=settings.db_min_conn_size,
        max_size=settings.db_max_conn_size,
        max_queries=settings.db_max_queries,
        max_inactive_connection_lifetime=settings.db_max_inactive_conn_lifetime,
        init=con_init,
        **kwargs,
    )
    async with app.state.pool.acquire() as conn:
        logging.warning("Running tmp sql")
        await conn.execute(
            """
            SELECT set_config(
                'search_path',
                'pg_temp,' || current_setting('search_path', false),
                false
                );
            """
        )
        if (
            apisettings.functions_directory
            and Path(apisettings.functions_directory).exists
        ):
            for sqlfile in Path(apisettings.functions_directory).glob("**/*.sql"):
                await conn.execute(sqlfile.read_text())
        dbcatalogsql = Path("tipg/dbcatalog.sql")
        logging.warning(dbcatalogsql.exists())
        logging.warning(dbcatalogsql.read_text())
        await conn.execute(dbcatalogsql.read_text())


async def register_collection_catalog(app: FastAPI, **kwargs: Any) -> None:
    """Register Table catalog."""
    app.state.collection_catalog = await get_collection_index(app.state.pool, **kwargs)


async def close_db_connection(app: FastAPI) -> None:
    """Close connection."""
    await app.state.pool.close()
