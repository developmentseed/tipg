"""test tipg settings classes."""

import pytest
from pydantic import ValidationError

from tipg.settings import PostgresSettings


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
