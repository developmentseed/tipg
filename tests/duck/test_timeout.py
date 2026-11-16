"""Test DuckDB query timeout."""

import asyncio
import datetime
import time

import morecantile
import pytest
from fastapi.testclient import TestClient

from tipg.collections import Catalog
from tipg.duck import DuckDBCatalogSettings, DuckDBSettings
from tipg.duck.collections import _collection_index
from tipg.duck.database import create_connection
from tipg.errors import DEFAULT_STATUS_CODES, QueryTimeout

from .conftest import create_duck_app

duckdb = pytest.importorskip("duckdb")

# Never ending scan: 1e11 rows, none of them in the requested bbox/tile
SLOW_VIEW = """
    CREATE VIEW memory.main.slow AS
    SELECT x AS id, ST_Point(x % 10, x % 10) AS geom
    FROM range(100000000000) r(x)
"""


def _slow_collection(conn, query_timeout):
    conn.execute(SLOW_VIEW)
    (col,) = _collection_index(
        conn, DuckDBCatalogSettings(tables=["main.slow"], query_timeout=query_timeout)
    )
    return col


@pytest.fixture
def slow_collection():
    """Collection over a never ending scan, with a 0.5s query timeout."""
    conn = create_connection(DuckDBSettings())
    yield _slow_collection(conn, 0.5)
    conn.close()


def test_features_timeout(slow_collection):
    """Items queries are interrupted after the timeout."""
    assert slow_collection.query_timeout == 0.5

    start = time.perf_counter()
    with pytest.raises(QueryTimeout):
        asyncio.run(slow_collection.features(bbox_filter=[50, 50, 60, 60]))
    assert time.perf_counter() - start < 5

    # the connection is still usable
    assert slow_collection.connection.execute("SELECT 1").fetchone() == (1,)


def test_tile_timeout(slow_collection):
    """Tile queries are interrupted after the timeout."""
    tms = morecantile.tms.get("WebMercatorQuad")
    start = time.perf_counter()
    with pytest.raises(QueryTimeout):
        asyncio.run(slow_collection.get_tile(tms=tms, tile=tms.tile(55, 55, 6)))
    assert time.perf_counter() - start < 5


def test_fast_query_not_interrupted():
    """Queries finishing before the timeout are not affected."""
    conn = create_connection(DuckDBSettings())
    try:
        conn.execute(
            "CREATE VIEW memory.main.fast AS "
            "SELECT x AS id, ST_Point(x, x) AS geom FROM range(100) r(x)"
        )
        (col,) = _collection_index(
            conn, DuckDBCatalogSettings(tables=["main.fast"], query_timeout=0.5)
        )
        items = asyncio.run(col.features(limit=3))
        assert len(items["items"]) == 3
        assert items["matched"] == 100

        # the timer of a finished query doesn't interrupt the next ones
        time.sleep(0.7)
        items = asyncio.run(col.features(limit=3))
        assert len(items["items"]) == 3

        tms = morecantile.tms.get("WebMercatorQuad")
        assert asyncio.run(col.get_tile(tms=tms, tile=tms.tile(5, 5, 4)))
    finally:
        conn.close()


def test_no_timeout_by_default():
    """No timeout unless configured."""
    assert DuckDBCatalogSettings().query_timeout is None


def test_timeout_status_code():
    """Timeouts are returned as `504 Gateway Timeout`."""
    assert DEFAULT_STATUS_CODES[QueryTimeout] == 504

    app = create_duck_app(DuckDBSettings(), DuckDBCatalogSettings())
    with TestClient(app) as client:
        conn = client.app.state.duckdb_connection
        col = _slow_collection(conn, 0.5)
        client.app.state.collection_catalog = Catalog(
            collections={col.id: col}, last_updated=datetime.datetime.now()
        )

        response = client.get(
            "/collections/main.slow/items", params={"bbox": "50,50,60,60"}
        )
        assert response.status_code == 504
        assert "timeout" in response.json()["detail"].lower()

        response = client.get("/collections/main.slow/tiles/WebMercatorQuad/6/41/28")
        assert response.status_code == 504
