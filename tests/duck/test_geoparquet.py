"""Test GeoParquet metadata (bbox, geometry types) used by the DuckDB catalog."""

import pytest

from tipg.duck import DuckDBCatalogSettings, DuckDBSettings
from tipg.duck.collections import (
    _collection_index,
    _geoparquet_metadata,
    _parquet_view_source,
)
from tipg.duck.database import create_connection

duckdb = pytest.importorskip("duckdb")


@pytest.fixture(scope="module")
def parquet_dir(tmp_path_factory):
    """Write GeoParquet files (DuckDB writes the `geo` metadata)."""
    tmp = tmp_path_factory.mktemp("geoparquet")
    conn = duckdb.connect()
    conn.execute("LOAD spatial")
    conn.execute(
        f"COPY (SELECT 1 AS id, ST_Point(1, 2) AS geom) TO '{tmp}/part-a.parquet'"
    )
    conn.execute(
        f"COPY (SELECT 2 AS id, ST_Buffer(ST_Point(10, 20), 1) AS geom) TO '{tmp}/part-b.parquet'"
    )
    conn.execute(f"COPY (SELECT 1 AS id, 'a' AS name) TO '{tmp}/nongeo.parquet'")
    conn.close()
    return tmp


def test_parquet_view_source():
    """Only plain `SELECT * FROM read_parquet(...)` views are recognized."""
    assert (
        _parquet_view_source(
            "CREATE VIEW a AS SELECT * FROM read_parquet('s3://b/it''s/*.parquet');"
        )
        == "s3://b/it's/*.parquet"
    )
    assert _parquet_view_source(None) is None
    assert (
        _parquet_view_source(
            "CREATE VIEW a AS SELECT * FROM read_parquet('x.parquet') WHERE id > 1;"
        )
        is None
    )
    assert (
        _parquet_view_source("CREATE VIEW a AS SELECT * FROM ST_Read('x.shp');") is None
    )


def test_geoparquet_metadata(parquet_dir):
    """Read and merge bbox/geometry types from the file footers."""
    conn = duckdb.connect()

    meta = _geoparquet_metadata(conn, f"{parquet_dir}/part-a.parquet")
    assert meta == {"geom": {"bbox": [1.0, 2.0, 1.0, 2.0], "geometry_types": {"Point"}}}

    meta = _geoparquet_metadata(conn, f"{parquet_dir}/part-*.parquet")
    assert meta["geom"]["bbox"] == [1.0, 2.0, 11.0, 21.0]
    assert meta["geom"]["geometry_types"] == {"Point", "Polygon"}

    # no `geo` metadata
    assert _geoparquet_metadata(conn, f"{parquet_dir}/nongeo.parquet") == {}
    # mixed files: some files have no `geo` metadata
    assert _geoparquet_metadata(conn, f"{parquet_dir}/*.parquet") == {}
    # errors fall back to an empty dict
    assert _geoparquet_metadata(conn, f"{parquet_dir}/missing.parquet") == {}


def test_catalog_uses_geoparquet_metadata(parquet_dir):
    """Collection extent and geometry type come from the GeoParquet metadata."""
    conn = create_connection(
        DuckDBSettings(
            sources={
                "single": f"{parquet_dir}/part-a.parquet",
                "multi": f"{parquet_dir}/part-*.parquet",
            }
        )
    )
    try:
        collections = {
            c.id: c for c in _collection_index(conn, DuckDBCatalogSettings())
        }
    finally:
        conn.close()

    single = collections["main.single"].geometry_column
    assert single.bounds == [1.0, 2.0, 1.0, 2.0]
    assert single.geometry_type == "Point"

    multi = collections["main.multi"].geometry_column
    assert multi.bounds == [1.0, 2.0, 11.0, 21.0]
    assert multi.geometry_type == "Geometry"
