"""tipg.duck package: DuckDB integration for TiPg."""

from .collections import DuckCollection, duck_get_collection_index
from .database import close_db_connection, connect_to_db, create_connection
from .settings import DuckDBCatalogSettings, DuckDBSettings

__all__ = [
    "DuckCollection",
    "duck_get_collection_index",
    "close_db_connection",
    "connect_to_db",
    "create_connection",
    "DuckDBCatalogSettings",
    "DuckDBSettings",
]
