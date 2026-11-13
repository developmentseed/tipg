"""tipg DuckDB settings."""

from pydantic_settings import BaseSettings


class DuckDBSettings(BaseSettings):
    """DuckDB connection settings.

    Attributes:
        database: path or URL to a DuckDB database file, attached (read-only)
            under its file name (without extension). If not set, only `sources`
            are served.
        threads: number of threads DuckDB can use.
        memory_limit: maximum memory DuckDB can use (e.g `4GB`).
        sources: mapping of collection id to a file path/glob/URL. Parquet files
            are read with `read_parquet`, other formats with the spatial
            extension's `ST_Read`. Each source is registered as a view in the
            in-memory `memory.main` schema.

    """

    database: str | None = None
    threads: int | None = None
    memory_limit: str | None = None
    sources: dict[str, str] = {}

    model_config = {
        "env_prefix": "TIPG_DUCKDB_",
        "env_file": ".env",
        "extra": "ignore",
    }


class DuckDBCatalogSettings(BaseSettings):
    """TiPg DuckDB catalog settings.

    Attributes:
        spatial_extent: read the spatial extent and geometry type of parquet
            sources from their GeoParquet metadata (`bbox` and `geometry_types`).
            Only the file footers are read, rows are never scanned. For a glob,
            the footer of every matched file is read (one request per file for
            remote files), on startup and on each catalog refresh: disable it
            for sources matching many (remote) files. When disabled, or when
            the metadata is missing, collections have no spatial extent
            (world bbox) and a generic `Geometry` type. Tables and other views
            never have a spatial extent. The GeoParquet bbox `covering`
            columns (if any) are also read from this metadata and used to
            speed up spatial filters (`bbox`, tiles, cql2 spatial predicates).
        metadata_threads: number of parquet sources whose metadata is read
            concurrently when building the catalog.

    """

    schemas: list[str] = ["main"]
    tables: list[str] | None = None
    exclude_tables: list[str] | None = None
    spatial_extent: bool = True
    metadata_threads: int = 16
    only_spatial_tables: bool = True

    model_config = {
        "env_prefix": "TIPG_DUCKDB_",
        "env_file": ".env",
        "extra": "ignore",
    }
