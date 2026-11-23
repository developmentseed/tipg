"""tipg DuckDB database events."""

import pathlib
from collections.abc import Callable
from urllib.parse import urlparse

import duckdb
from fastapi import FastAPI

from ..collections import _quote_ident
from ..logger import logger
from .settings import DuckDBSettings


def _quote_literal(value: str) -> str:
    """Quote a SQL string literal."""
    return "'" + value.replace("'", "''") + "'"


def _is_parquet(path: str) -> bool:
    """Is the source a parquet file (or glob)."""
    return path.lower().endswith((".parquet", ".parq", ".geoparquet"))


def _is_glob(path: str) -> bool:
    """Is the source a glob pattern (multiple files)."""
    return any(c in path for c in ("*", "?", "["))


def _source_query(path: str, file_row_number: bool = False) -> str:
    """SQL `SELECT` for a file source.

    With `file_row_number`, parquet sources get a `file_row_number` column
    (row position in the file), used as stable feature id.
    """
    if _is_parquet(path):
        options = ", file_row_number = true" if file_row_number else ""
        return f"SELECT * FROM read_parquet({_quote_literal(path)}{options})"

    return f"SELECT * FROM ST_Read({_quote_literal(path)})"


def create_connection(  # noqa: C901
    settings: DuckDBSettings,
    on_connect: Callable[[duckdb.DuckDBPyConnection], None] | None = None,
) -> duckdb.DuckDBPyConnection:
    """Create and configure a DuckDB connection.

    The connection always uses an in-memory primary database, where file
    `sources` are registered as views. When `settings.database` is set, the
    database file is attached, read-only, under its file name
    (without extension).

    Note: views (and settings) must be visible from `connection.cursor()`,
    which creates a new connection to the same database instance, so we
    can't use TEMP views (connection-local) nor session-level `SET`.

    `on_connect` is called with the connection after the database is
    attached and before `sources` are registered, e.g to create secrets
    (needed by remote sources) or views.
    """
    config: dict[str, str | bool | int | float | list[str]] = {}
    if settings.threads:
        config["threads"] = settings.threads
    if settings.memory_limit:
        config["memory_limit"] = settings.memory_limit
    # must be set when connecting, before the first `INSTALL`
    if settings.extension_directory:
        config["extension_directory"] = settings.extension_directory
    if settings.custom_extension_repository:
        config["custom_extension_repository"] = settings.custom_extension_repository

    conn = duckdb.connect(":memory:", config=config)
    for extension in dict.fromkeys(["spatial", *settings.extensions]):
        if settings.autoinstall_extensions:
            conn.execute(f"INSTALL {_quote_ident(extension)}")
        conn.execute(f"LOAD {_quote_ident(extension)}")

    # DuckDB GEOMETRY uses [EASTING, NORTHING] (lon/lat) order internally,
    # make sure ST_Transform and GDAL follow it.
    conn.execute("SET GLOBAL geometry_always_xy = true")
    conn.execute("SET GLOBAL TimeZone = 'UTC'")

    # Cache parquet files metadata (footers) in memory, so each query doesn't
    # fetch it again (expensive for remote files with many row groups).
    conn.execute("SET GLOBAL parquet_metadata_cache = true")

    # Attach the main database file if specified in settings.
    if settings.database:
        # use the file name (without extension) as alias, also for URLs
        alias = pathlib.PurePosixPath(urlparse(settings.database).path).stem
        logger.debug(f"Attaching DuckDB database {settings.database} as {alias}")
        conn.execute(
            f"ATTACH {_quote_literal(settings.database)} AS {_quote_ident(alias)} (READ_ONLY)"
        )

    # App-specific setup (secrets, extra views) before sources are registered,
    # so a remote source can rely on it.
    if on_connect:
        on_connect(conn)

    # Attach and register file sources as views in the in-memory database.
    for name, path in settings.sources.items():
        logger.debug(f"Registering DuckDB source {name}: {path}")
        view = f"CREATE OR REPLACE VIEW memory.main.{_quote_ident(name)} AS"

        # Single parquet file: add the row position in the file as a stable
        # feature id (looking up a row position only reads one row group).
        # Not for globs, where row positions are not unique.
        if _is_parquet(path) and not _is_glob(path):
            try:
                conn.execute(f"{view} {_source_query(path, file_row_number=True)}")
                continue
            except duckdb.BinderException as e:
                # e.g the file already has a `file_row_number` column
                logger.debug(f"Could not add `file_row_number` to {name}: {e}")

        conn.execute(f"{view} {_source_query(path)}")

    return conn


async def connect_to_duckdb(
    app: FastAPI,
    *,
    settings: DuckDBSettings | None = None,
    on_connect: Callable[[duckdb.DuckDBPyConnection], None] | None = None,
) -> None:
    """Connect to DuckDB and store the connection in `app.state.duckdb_connection`."""
    if not settings:
        settings = DuckDBSettings()

    app.state.duckdb_connection = create_connection(settings, on_connect=on_connect)


async def close_duckdb_connection(app: FastAPI) -> None:
    """Close the DuckDB connection."""
    app.state.duckdb_connection.close()
