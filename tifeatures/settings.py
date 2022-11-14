"""tifeatures config."""

import sys
from functools import lru_cache
from typing import Any, Dict, List, Optional

import pydantic

# Pydantic does not support older versions of typing.TypedDict
# https://github.com/pydantic/pydantic/pull/3374
if sys.version_info < (3, 9, 2):
    from typing_extensions import TypedDict
else:
    from typing import TypedDict


class TableConfig(TypedDict, total=False):
    """Configuration to add table options with env variables."""

    geomcol: Optional[str]
    datetimecol: Optional[str]
    pk: Optional[str]
    properties: Optional[List[str]]


class TableSettings(pydantic.BaseSettings):
    """Table configuration settings"""

    fallback_key_names: List[str] = ["ogc_fid", "id", "pkey", "gid"]
    table_config: Dict[str, TableConfig] = {}

    class Config:
        """model config"""

        env_prefix = "TIFEATURES_"
        env_file = ".env"
        env_nested_delimiter = "__"


class _APISettings(pydantic.BaseSettings):
    """API settings"""

    name: str = "TiFeatures"
    DEBUG: bool = False
    cors_origins: str = "*"
    cachecontrol: str = "public, max-age=3600"
    template_directory: Optional[str] = None

    @pydantic.validator("cors_origins")
    def parse_cors_origin(cls, v):
        """Parse CORS origins."""
        return [origin.strip() for origin in v.split(",")]

    class Config:
        """model config"""

        env_prefix = "TIFEATURES_"
        env_file = ".env"
        env_nested_delimiter = "__"


@lru_cache()
def APISettings() -> _APISettings:
    """This function returns a cached instance of the Settings object."""
    return _APISettings()


class PostgresSettings(pydantic.BaseSettings):
    """Postgres-specific API settings.

    Attributes:
        postgres_user: postgres username.
        postgres_pass: postgres password.
        postgres_host: hostname for the connection.
        postgres_port: database port.
        postgres_dbname: database name.
    """

    postgres_user: Optional[str]
    postgres_pass: Optional[str]
    postgres_host: Optional[str]
    postgres_port: Optional[str]
    postgres_dbname: Optional[str]

    database_url: Optional[pydantic.PostgresDsn] = None

    db_min_conn_size: int = 1
    db_max_conn_size: int = 10
    db_max_queries: int = 50000
    db_max_inactive_conn_lifetime: float = 300

    db_schemas: List[str] = ["public"]
    db_tables: Optional[List[str]]

    only_spatial_tables: bool = True

    class Config:
        """model config"""

        env_file = ".env"

    # https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/app/core/config.py#L42
    @pydantic.validator("database_url", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        """Validate db url settings."""
        if isinstance(v, str):
            return v

        return pydantic.PostgresDsn.build(
            scheme="postgresql",
            user=values.get("postgres_user"),
            password=values.get("postgres_pass"),
            host=values.get("postgres_host", ""),
            port=values.get("postgres_port", 5432),
            path=f"/{values.get('postgres_dbname') or ''}",
        )
