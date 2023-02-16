"""tipg.db: database events."""

import pathlib
from typing import Any, List, Optional

import orjson
from buildpg import asyncpg

from tipg.dbmodel import get_collection_index
from tipg.errors import FunctionDirectoryDoesNotExist
from tipg.settings import CustomSQLSettings, PostgresSettings

from fastapi import FastAPI

sql_settings = CustomSQLSettings()


custom_sql: List[pathlib.Path] = []
if user_sql_dir := sql_settings.custom_sql_directory:
    if not pathlib.Path(user_sql_dir).exists():
        raise FunctionDirectoryDoesNotExist

    custom_sql = list(pathlib.Path(user_sql_dir).glob("*.sql"))


async def con_init(conn):
    """Use orjson encoder/decoder and register custom SQL functions."""
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

    # Register custom SQL functions/table/views
    if custom_sql:
        for sqlfile in custom_sql:
            await conn.execute(sqlfile.read_text())

    # Register TiPG functions
    dbcatalogsql = pathlib.Path(__package__) / "sql" / "dbcatalog.sql"
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
