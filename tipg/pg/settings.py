"""tipg config."""

import pathlib

from pydantic import (
    DirectoryPath,
    PostgresDsn,
    ValidationInfo,
    field_validator,
)
from pydantic_settings import BaseSettings


class PostgresSettings(BaseSettings):
    """Postgres connection settings.

    Attributes:
        postgres_user: postgres username.
        postgres_pass: postgres password.
        postgres_host: hostname for the connection.
        postgres_port: database port.
        postgres_dbname: database name.

    """

    postgres_user: str | None = None
    postgres_pass: str | None = None
    postgres_host: str | None = None
    postgres_port: int | None = None
    postgres_dbname: str | None = None

    database_url: PostgresDsn | None = None

    db_min_conn_size: int = 1
    db_max_conn_size: int = 10
    db_max_queries: int = 50000
    db_max_inactive_conn_lifetime: float = 300

    model_config = {"env_file": ".env", "extra": "ignore"}

    # https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/app/core/config.py#L42
    @field_validator("database_url", mode="before")
    def assemble_db_connection(cls, v: str | None, info: ValidationInfo) -> PostgresDsn:
        """Validate db url settings."""
        if isinstance(v, str):
            return PostgresDsn(v)

        return PostgresDsn.build(
            scheme="postgresql",
            username=info.data.get("postgres_user"),
            password=info.data.get("postgres_pass"),
            host=info.data.get("postgres_host", ""),
            port=info.data.get("postgres_port", 5432),
            path=info.data.get("postgres_dbname", ""),
        )


class PostgresCatalogSettings(BaseSettings):
    """TiPg Postgres Catalog settings."""

    schemas: list[str] = ["public"]
    application_schema: str = "pg_temp"
    tables: list[str] | None = None
    exclude_tables: list[str] | None = None
    exclude_table_schemas: list[str] | None = None
    functions: list[str] | None = None
    exclude_functions: list[str] | None = None
    exclude_function_schemas: list[str] | None = None
    datetime_extent: bool = True
    spatial_extent: bool = True

    only_spatial_tables: bool = True

    model_config = {"env_prefix": "TIPG_DB_", "env_file": ".env", "extra": "ignore"}

    @property
    def tipg_schema(self):
        """Compat: use application_schema for input and tipg_schema for attribute.
        see https://github.com/developmentseed/tipg/issues/224
        """
        return self.application_schema


class CustomSQLSettings(BaseSettings):
    """TiPg Custom SQL settings."""

    custom_sql_directory: DirectoryPath | None = None

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}

    @property
    def sql_files(self) -> list[pathlib.Path] | None:
        """return a list of SQL files within the custom sql directory."""
        if self.custom_sql_directory:
            return list(self.custom_sql_directory.glob("*.sql"))

        return None
