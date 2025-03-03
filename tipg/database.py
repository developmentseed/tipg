"""tipg.db: database events."""

import pathlib
from importlib.resources import files as resources_files
from typing import List, Optional

import orjson
from buildpg import asyncpg

from tipg.logger import logger
from tipg.settings import PostgresSettings

from fastapi import FastAPI

DB_CATALOG_FILE = resources_files(__package__) / "sql" / "dbcatalog.sql"


class connection_factory:
    """Connection creation."""

    schemas: List[str]
    tipg_schema: str
    user_sql_files: List[pathlib.Path]

    def __init__(
        self,
        schemas: List[str],
        tipg_schema: str,
        user_sql_files: Optional[List[pathlib.Path]] = None,
    ) -> None:
        """Init."""
        self.schemas = schemas
        self.tipg_schema = tipg_schema
        self.user_sql_files = user_sql_files or []

    async def __call__(self, conn: asyncpg.Connection):
        """Create connection."""
        await conn.set_type_codec(
            "json", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
        )
        await conn.set_type_codec(
            "jsonb", encoder=orjson.dumps, decoder=orjson.loads, schema="pg_catalog"
        )

        # Note: we add `{tipg_schema}` as the first element of the schemas list to make sure
        # we register the custom functions and `dbcatalog` in it.
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

        # Register custom SQL functions/table/views in `{tipg_schema}`
        for sqlfile in self.user_sql_files:
            await conn.execute(sqlfile.read_text())

        # Register TiPG functions in `{tipg_schema}`
        await conn.execute(
            DB_CATALOG_FILE.read_text().replace("pg_temp", self.tipg_schema)
        )


async def connect_to_db(
    app: FastAPI,
    *,
    schemas: List[str],
    tipg_schema: str = "pg_temp",
    user_sql_files: Optional[List[pathlib.Path]] = None,
    settings: Optional[PostgresSettings] = None,
    **kwargs,
) -> None:
    """Connect."""
    con_init = connection_factory(schemas, tipg_schema, user_sql_files)

    if not settings:
        settings = PostgresSettings()

    app.state.pool = await asyncpg.create_pool_b(
        str(settings.database_url),
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
