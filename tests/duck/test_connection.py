"""Test the DuckDB connection settings, on_connect hook and bbox prefilter."""

import asyncio

import pytest

from tipg.duck import DuckDBCatalogSettings, DuckDBSettings
from tipg.duck.collections import _collection_index
from tipg.duck.database import create_connection

duckdb = pytest.importorskip("duckdb")


def _setting(conn, name):
    return conn.execute(f"SELECT current_setting('{name}')").fetchone()[0]


def test_extension_settings(tmp_path):
    """Extensions are loaded and connect-time settings are applied."""
    conn = create_connection(
        DuckDBSettings(
            extensions=["parquet", "spatial"],
            autoinstall_extensions=False,
            custom_extension_repository="http://example.com/extensions",
        )
    )
    loaded = {
        row[0]
        for row in conn.execute(
            "SELECT extension_name FROM duckdb_extensions() WHERE loaded"
        ).fetchall()
    }
    assert {"spatial", "parquet"} <= loaded
    assert _setting(conn, "custom_extension_repository") == (
        "http://example.com/extensions"
    )
    conn.close()


def test_no_autoinstall(tmp_path):
    """Without autoinstall, extensions are only loaded from extension_directory."""
    settings = DuckDBSettings(
        extension_directory=str(tmp_path), autoinstall_extensions=False
    )
    with pytest.raises(duckdb.Error):
        create_connection(settings)

    assert not list(tmp_path.iterdir())


def test_on_connect_runs_before_sources(tmp_path):
    """on_connect runs after ATTACH and before sources are registered."""
    path = tmp_path / "points.parquet"
    seed = duckdb.connect()
    seed.execute("LOAD spatial")
    seed.execute(
        f"COPY (SELECT range AS id, ST_Point(range, range) AS geom FROM range(5)) "
        f"TO '{path}' (FORMAT parquet)"
    )
    seed.close()

    seen = []

    def setup(conn):
        seen.extend(
            row[0]
            for row in conn.execute("SELECT view_name FROM duckdb_views()").fetchall()
        )
        conn.execute(
            "CREATE VIEW memory.main.extra AS SELECT 1 AS id, ST_Point(0, 0) AS geom"
        )

    conn = create_connection(DuckDBSettings(sources={"points": str(path)}), setup)
    assert "points" not in seen

    ids = {col.id for col in _collection_index(conn, DuckDBCatalogSettings())}
    assert {"main.points", "main.extra"} <= ids
    conn.close()


@pytest.fixture
def grid_collection():
    """View over a table with one row group per cell of a 4x4 grid."""
    conn = create_connection(DuckDBSettings())
    conn.execute("SET GLOBAL threads = 1")
    conn.execute(
        """
        CREATE TABLE grid AS
        SELECT range AS id,
            ST_Point((range // 122880) % 4 * 10 + 5, (range // 122880) // 4 * 10 + 5) AS geom
        FROM range(16 * 122880)
        """
    )
    conn.execute("CREATE VIEW memory.main.grid_view AS SELECT * FROM grid")
    (col,) = _collection_index(conn, DuckDBCatalogSettings(tables=["main.grid_view"]))
    yield col
    conn.close()


def test_bbox_prefilter(grid_collection):
    """Spatial filters get a `&&` prefilter, which doesn't change the results."""
    where = grid_collection.cql_where(bbox=[0, 0, 9, 9])
    prefilter = grid_collection._bbox_covering_filter(where)
    assert prefilter == '"geom" && ST_MakeEnvelope(0.0, 0.0, 9.0, 9.0)'

    result = asyncio.run(grid_collection.features(bbox=[0, 0, 9, 9], limit=1))
    assert result["items"]
    point = result["items"][0]["geometry"]["coordinates"]
    assert point == [5.0, 5.0]
