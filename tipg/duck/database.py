"""tipg DuckDB database events."""

import pathlib
from urllib.parse import urlparse

import duckdb
from fastapi import FastAPI

from ..collections import _quote_ident
from ..logger import logger
from .settings import DuckDBSettings


def _quote_literal(value: str) -> str:
    """Quote a SQL string literal."""
    return "'" + value.replace("'", "''") + "'"


def _source_query(path: str) -> str:
    """SQL `SELECT` for a file source."""
    if path.lower().endswith((".parquet", ".parq", ".geoparquet")):
        return f"SELECT * FROM read_parquet({_quote_literal(path)})"

    return f"SELECT * FROM ST_Read({_quote_literal(path)})"


def create_connection(
    settings: DuckDBSettings | None = None,
) -> duckdb.DuckDBPyConnection:
    """Create and configure a DuckDB connection.

    The connection always uses an in-memory primary database, where file
    `sources` are registered as views. When `settings.database` is set, the
    database file is attached, read-only, under its file name
    (without extension).

    Note: views (and settings) must be visible from `connection.cursor()`,
    which creates a new connection to the same database instance, so we
    can't use TEMP views (connection-local) nor session-level `SET`.
    """
    settings = settings or DuckDBSettings()

    config: dict[str, str | int] = {}
    if settings.threads:
        config["threads"] = settings.threads
    if settings.memory_limit:
        config["memory_limit"] = settings.memory_limit

    conn = duckdb.connect(":memory:", config=config)
    conn.execute("INSTALL spatial")
    conn.execute("LOAD spatial")

    # DuckDB GEOMETRY uses [EASTING, NORTHING] (lon/lat) order internally,
    # make sure ST_Transform and GDAL follow it.
    conn.execute("SET GLOBAL geometry_always_xy = true")
    conn.execute("SET GLOBAL TimeZone = 'UTC'")

    if settings.database:
        # use the file name (without extension) as alias, also for URLs
        alias = pathlib.PurePosixPath(urlparse(settings.database).path).stem
        logger.debug(f"Attaching DuckDB database {settings.database} as {alias}")
        conn.execute(
            f"ATTACH {_quote_literal(settings.database)} AS {_quote_ident(alias)} (READ_ONLY)"
        )

    for name, path in settings.sources.items():
        logger.debug(f"Registering DuckDB source {name}: {path}")
        conn.execute(
            f"CREATE OR REPLACE VIEW memory.main.{_quote_ident(name)} AS {_source_query(path)}"
        )

    return conn


async def connect_to_db(
    app: FastAPI,
    *,
    settings: DuckDBSettings | None = None,
) -> None:
    """Connect to DuckDB and store the connection in `app.state.duckdb_connection`."""
    app.state.duckdb_connection = create_connection(settings)


async def close_db_connection(app: FastAPI) -> None:
    """Close the DuckDB connection."""
    app.state.duckdb_connection.close()
