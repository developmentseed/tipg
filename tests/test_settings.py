"""test tipg settings classes."""

import pytest
from pydantic import ValidationError

from tipg.settings import DatabaseSettings, PostgresSettings


def test_pg_settings(monkeypatch):
    """test PostgresSettings class."""
    # Makes sure we don't have any pg env set
    monkeypatch.delenv("DATABASE_URL", raising=False)
    monkeypatch.delenv("POSTGRES_USER", raising=False)
    monkeypatch.delenv("POSTGRES_PASS", raising=False)
    monkeypatch.delenv("POSTGRES_HOST", raising=False)
    monkeypatch.delenv("POSTGRES_PORT", raising=False)
    monkeypatch.delenv("POSTGRES_DBNAME", raising=False)

    # Should raises a validation error if no env or parameters is passed
    with pytest.raises(ValidationError):
        # we use `_env_file=None` to make sure pydantic do not use any `.env` files in local environment
        PostgresSettings(_env_file=None)

    settings = PostgresSettings(
        postgres_user="user",
        postgres_pass="secret",
        postgres_host="0.0.0.0",
        postgres_port=8888,
        postgres_dbname="db",
        _env_file=None,
    )
    assert str(settings.database_url) == "postgresql://user:secret@0.0.0.0:8888/db"

    # Make sure pydantic will cast the port to integer
    settings = PostgresSettings(
        postgres_user="user",
        postgres_pass="secret",
        postgres_host="0.0.0.0",
        postgres_port="8888",
        postgres_dbname="db",
        _env_file=None,
    )
    assert str(settings.database_url) == "postgresql://user:secret@0.0.0.0:8888/db"
    assert settings.postgres_port == 8888

    settings = PostgresSettings(
        database_url="postgresql://user:secret@0.0.0.0:8888/db", _env_file=None
    )
    assert str(settings.database_url) == "postgresql://user:secret@0.0.0.0:8888/db"
    assert not settings.postgres_port


def test_db_settings(monkeypatch):
    """test DatabaseSettings class."""
    monkeypatch.delenv("TIPG_DB_SCHEMAS", raising=False)
    monkeypatch.delenv("TIPG_DB_APPLICATION_SCHEMA", raising=False)

    settings = DatabaseSettings(_env_file=None)
    assert settings.schemas == ["public"]
    assert settings.tipg_schema == "pg_temp"

    settings = DatabaseSettings(
        schemas=["private"],
        application_schema="pg_tipg_temp",
        _env_file=None,
    )
    assert settings.schemas == ["private"]
    assert settings.tipg_schema == "pg_tipg_temp"


def test_db_settings_env(monkeypatch):
    """test DatabaseSettings class with env variable."""
    monkeypatch.setenv("TIPG_DB_SCHEMAS", '["private"]')
    monkeypatch.setenv("TIPG_DB_APPLICATION_SCHEMA", "pg_tipg_temp")

    settings = DatabaseSettings(_env_file=None)
    assert settings.schemas == ["private"]
    assert settings.tipg_schema == "pg_tipg_temp"
