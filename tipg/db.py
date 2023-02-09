"""tipg.db: database events."""

from pathlib import Path
from typing import Any, Optional

import orjson
from buildpg import asyncpg

from tipg.dbmodel import get_collection_index
from tipg.settings import PostgresSettings

from fastapi import FastAPI


async def con_init(
    conn,
    settings: Optional[PostgresSettings] = None,
):
    """Use json for json returns."""
    if not settings:
        settings = PostgresSettings()

    await conn.set_type_codec(
        "json", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
    )
    await conn.set_type_codec(
        "jsonb", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
    )
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
        settings.tipg_functions_directory
        and Path(settings.tipg_functions_directory).exists()
    ):
        for sqlfile in Path(settings.tipg_functions_directory).glob("**/*.sql"):
            await conn.execute(sqlfile.read_text())
    dbcatalogsql = Path("tipg/sql/dbcatalog.sql")
    await conn.execute(dbcatalogsql.read_text())


async def connect_to_db(
    app: FastAPI,
    settings: Optional[PostgresSettings] = None,
    **kwargs,
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
        **kwargs,
    )


async def register_collection_catalog(app: FastAPI, **kwargs: Any) -> None:
    """Register Table catalog."""
    app.state.collection_catalog = await get_collection_index(app.state.pool, **kwargs)


async def close_db_connection(app: FastAPI) -> None:
    """Close connection."""
    await app.state.pool.close()
