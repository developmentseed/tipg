"""Test PgCollection pool handling."""

import pytest
from pydantic import ValidationError

from tipg.pg.collections import PgCollection


def test_collection_holds_shared_pool(app):
    """Collections from the catalog reference the app's (single) pool."""
    collections = list(app.app.state.collection_catalog["collections"].values())
    assert collections

    pool = app.app.state.pool
    assert all(c.connection_pool is pool for c in collections)

    # The pool is excluded from serialization and repr
    collection = collections[0]
    assert "connection_pool" not in collection.model_dump()
    assert "connection_pool" not in collection.model_dump_json()
    assert "connection_pool=" not in repr(collection)


def test_collection_requires_pool():
    """PgCollection can't be created without a pool."""
    with pytest.raises(ValidationError):
        PgCollection(type="Table", id="public.foo", table="foo", schema="public")
