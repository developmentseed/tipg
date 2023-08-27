"""tipg config."""

import pathlib
from typing import Any, Dict, List, Optional

from pydantic import (
    DirectoryPath,
    Field,
    FieldValidationInfo,
    PostgresDsn,
    field_validator,
    model_validator,
)
from pydantic_settings import BaseSettings
from typing_extensions import TypedDict


class APISettings(BaseSettings):
    """API settings"""

    name: str = "TiPg: OGC Features and Tiles API"
    debug: bool = False
    cors_origins: str = "*"
    cachecontrol: str = "public, max-age=3600"
    template_directory: Optional[str] = None

    add_tiles_viewer: bool = True

    catalog_ttl: int = 0

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}

    @field_validator("cors_origins")
    def parse_cors_origin(cls, v):
        """Parse CORS origins."""
        return [origin.strip() for origin in v.split(",")]


class TableConfig(TypedDict, total=False):
    """Configuration to add table options with env variables."""

    geomcol: Optional[str]
    datetimecol: Optional[str]
    pk: Optional[str]
    properties: Optional[List[str]]


class TableSettings(BaseSettings):
    """Table configuration settings"""

    fallback_key_names: List[str] = ["ogc_fid", "id", "pkey", "gid"]
    table_config: Dict[str, TableConfig] = {}
    datetime_extent: bool = True

    model_config = {
        "env_prefix": "TIPG_",
        "env_file": ".env",
        "env_nested_delimiter": "__",
        "extra": "ignore",
    }


class TMSSettings(BaseSettings):
    """TiPG TMS settings"""

    default_tms: str = "WebMercatorQuad"
    default_minzoom: int = 0
    default_maxzoom: int = 22

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}


class FeaturesSettings(BaseSettings):
    """TiPG Items settings"""

    default_features_limit: int = Field(10, ge=0)
    max_features_per_query: int = Field(10000, ge=0)

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}

    @model_validator(mode="after")
    def max_default(self):
        """Set default bounds and srid when this is a function."""
        if self.default_features_limit > self.max_features_per_query:
            raise ValueError(
                f"Invalid combination of `limit` ({self.default_features_limit}) and `max features per query` ({self.max_features_per_query}) values"
            )

        return self


class MVTSettings(BaseSettings):
    """TiPG MVT settings"""

    tile_resolution: int = 4096
    tile_buffer: int = 256
    tile_clip: bool = True
    max_features_per_tile: int = 10000

    set_mvt_layername: Optional[bool] = None

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}


class PostgresSettings(BaseSettings):
    """Postgres connection settings.

    Attributes:
        postgres_user: postgres username.
        postgres_pass: postgres password.
        postgres_host: hostname for the connection.
        postgres_port: database port.
        postgres_dbname: database name.

    """

    postgres_user: Optional[str] = None
    postgres_pass: Optional[str] = None
    postgres_host: Optional[str] = None
    postgres_port: Optional[str] = None
    postgres_dbname: Optional[str] = None

    database_url: Optional[PostgresDsn] = None

    db_min_conn_size: int = 1
    db_max_conn_size: int = 10
    db_max_queries: int = 50000
    db_max_inactive_conn_lifetime: float = 300

    model_config = {"env_file": ".env", "extra": "ignore"}

    # https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/app/core/config.py#L42
    @field_validator("database_url", mode="before")
    def assemble_db_connection(cls, v: Optional[str], info: FieldValidationInfo) -> Any:
        """Validate db url settings."""
        if isinstance(v, str):
            return v

        return PostgresDsn.build(
            scheme="postgresql",
            username=info.data.get("postgres_user"),
            password=info.data.get("postgres_pass"),
            host=info.data.get("postgres_host", ""),
            port=int(info.data.get("postgres_port", 5432)),
            path=f"{info.data.get('postgres_dbname') or ''}",
        )


class DatabaseSettings(BaseSettings):
    """TiPg Database settings."""

    schemas: List[str] = ["public"]
    tables: Optional[List[str]] = None
    exclude_tables: Optional[List[str]] = None
    exclude_table_schemas: Optional[List[str]] = None
    functions: Optional[List[str]] = None
    exclude_functions: Optional[List[str]] = None
    exclude_function_schemas: Optional[List[str]] = None

    only_spatial_tables: bool = True

    model_config = {"env_prefix": "TIPG_DB_", "env_file": ".env", "extra": "ignore"}


class CustomSQLSettings(BaseSettings):
    """TiPg Custom SQL settings."""

    custom_sql_directory: Optional[DirectoryPath] = None

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}

    @property
    def sql_files(self) -> Optional[List[pathlib.Path]]:
        """return a list of SQL files within the custom sql directory."""
        if self.custom_sql_directory:
            return list(self.custom_sql_directory.glob("*.sql"))

        return None


class HostToSchemaLookupSettings(BaseSettings):
    enabled: bool = False

    mapping: Dict[str, Optional[Dict[str, List[str]]]] = {}

    model_config = {"env_prefix": "TIPG_MULTI_", "env_file": ".env", "extra": "ignore"}
