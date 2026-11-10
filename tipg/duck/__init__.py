"""tipg.duck package: DuckDB integration for TiPg."""

from .collections import DuckCollection, duck_get_collection_index
from .database import close_duckdb_connection, connect_to_duckdb, create_connection
from .settings import DuckDBCatalogSettings, DuckDBSettings

__all__ = [
    "DuckCollection",
    "duck_get_collection_index",
    "close_duckdb_connection",
    "connect_to_duckdb",
    "create_connection",
    "DuckDBCatalogSettings",
    "DuckDBSettings",
]
