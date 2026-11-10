"""tipg DuckDB settings."""

from pydantic_settings import BaseSettings


class DuckDBSettings(BaseSettings):
    """DuckDB connection settings.

    Attributes:
        database: path to a DuckDB database file, attached under its file name
            (default to an in-memory database only).
        read_only: attach the database file in read-only mode.
        threads: number of threads DuckDB can use.
        memory_limit: maximum memory DuckDB can use (e.g `4GB`).
        sources: mapping of collection id to a file path/glob/URL. Parquet files
            are read with `read_parquet`, other formats with the spatial
            extension's `ST_Read`. Each source is registered as a view in the
            in-memory `memory.main` schema.

    """

    database: str = ":memory:"
    read_only: bool = True
    threads: int | None = None
    memory_limit: str | None = None
    sources: dict[str, str] = {}

    model_config = {
        "env_prefix": "TIPG_DUCKDB_",
        "env_file": ".env",
        "extra": "ignore",
    }


class DuckDBCatalogSettings(BaseSettings):
    """TiPg DuckDB catalog settings."""

    schemas: list[str] = ["main"]
    tables: list[str] | None = None
    exclude_tables: list[str] | None = None
    datetime_extent: bool = True
    spatial_extent: bool = True
    only_spatial_tables: bool = True

    model_config = {
        "env_prefix": "TIPG_DUCKDB_",
        "env_file": ".env",
        "extra": "ignore",
    }
