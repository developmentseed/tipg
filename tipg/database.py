"""tipg.db: database events."""

import pathlib
from typing import List, Optional

import orjson
from buildpg import asyncpg

from tipg.logger import logger
from tipg.settings import PostgresSettings

from fastapi import FastAPI

try:
    from importlib.resources import files as resources_files  # type: ignore
except ImportError:
    # Try backported to PY<39 `importlib_resources`.
    from importlib_resources import files as resources_files  # type: ignore

DB_CATALOG_FILE = resources_files(__package__) / "sql" / "dbcatalog.sql"


class connection_factory:
    """Connection creation."""

    schemas: List[str]
    user_sql_files: List[pathlib.Path]

    def __init__(
        self,
        schemas: Optional[List[str]] = None,
        user_sql_files: Optional[List[pathlib.Path]] = None,
    ) -> None:
        """Init."""
        self.schemas = schemas or []
        self.user_sql_files = user_sql_files or []

    async def __call__(self, conn: asyncpg.Connection):
        """Create connection."""
        await conn.set_type_codec(
            "json", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
        )
        await conn.set_type_codec(
            "jsonb", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
        )

        # Note: we add `pg_temp as the first element of the schemas list to make sure
        # we register the custom functions and `dbcatalog` in it.
        schemas = ",".join(["pg_temp", *self.schemas])
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

        # Register custom SQL functions/table/views in pg_temp
        for sqlfile in self.user_sql_files:
            await conn.execute(sqlfile.read_text())

        # Register TiPG functions in `pg_temp`
        await conn.execute(DB_CATALOG_FILE.read_text())


async def connect_to_db(
    app: FastAPI,
    settings: Optional[PostgresSettings] = None,
    schemas: Optional[List[str]] = None,
    user_sql_files: Optional[List[pathlib.Path]] = None,
    **kwargs,
) -> None:
    """Connect."""
    if not settings:
        settings = PostgresSettings()

    con_init = connection_factory(schemas, user_sql_files)

    app.state.pool = await asyncpg.create_pool_b(
        settings.database_url,
        min_size=settings.db_min_conn_size,
        max_size=settings.db_max_conn_size,
        max_queries=settings.db_max_queries,
        max_inactive_connection_lifetime=settings.db_max_inactive_conn_lifetime,
        init=con_init,
        **kwargs,
    )


async def close_db_connection(app: FastAPI) -> None:
    """Close connection."""
    await app.state.pool.close()
