"""Test GeoParquet metadata (bbox, geometry types) used by the DuckDB catalog."""

import asyncio
import json

import morecantile
import pytest
from cql2 import Expr

from tipg.duck import DuckDBCatalogSettings, DuckDBSettings
from tipg.duck.collections import (
    _collection_index,
    _geoparquet_metadata,
    _literal_bounds,
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
    # no id column, `value` not in insertion order
    conn.execute(
        f"COPY (SELECT 'f' || x AS name, 100 - x AS value, ST_Point(x, x) AS geom "
        f"FROM range(1, 26) r(x)) TO '{tmp}/noid.parquet'"
    )
    conn.execute(
        f"COPY (SELECT 42 AS file_row_number, ST_Point(0, 0) AS geom) TO '{tmp}/frn.parquet'"
    )

    # GeoParquet 1.1 with a bbox covering column (5 row groups, points on a
    # diagonal from 0 to 99.99): DuckDB doesn't write coverings, so the
    # geometry is written as WKB with our own `geo` metadata
    (tmp / "covering").mkdir()
    geo = json.dumps(
        {
            "version": "1.1.0",
            "primary_column": "geom",
            "columns": {
                "geom": {
                    "encoding": "WKB",
                    "geometry_types": ["Point"],
                    "bbox": [0, 0, 99.99, 99.99],
                    "covering": {
                        "bbox": {
                            "xmin": ["bbox", "xmin"],
                            "ymin": ["bbox", "ymin"],
                            "xmax": ["bbox", "xmax"],
                            "ymax": ["bbox", "ymax"],
                        }
                    },
                }
            },
        }
    )
    conn.execute(
        f"""
        COPY (
            SELECT
                x AS fid,
                ST_AsWKB(ST_Point(x / 100, x / 100)) AS geom,
                {{'xmin': x / 100, 'ymin': x / 100, 'xmax': x / 100, 'ymax': x / 100}} AS bbox
            FROM range(0, 10000) r(x)
        ) TO '{tmp}/covering/points.parquet'
        (FORMAT parquet, ROW_GROUP_SIZE 2048, KV_METADATA {{geo: '{geo}'}})
        """
    )

    conn.close()
    return tmp


def test_parquet_view_source():
    """Only plain `SELECT * FROM read_parquet(...)` views are recognized."""
    assert _parquet_view_source(
        "CREATE VIEW a AS SELECT * FROM read_parquet('s3://b/it''s/*.parquet');"
    ) == ("s3://b/it's/*.parquet", False)
    # as stored by DuckDB for `read_parquet('x.parquet', file_row_number = true)`
    assert _parquet_view_source(
        "CREATE VIEW a AS SELECT * FROM read_parquet('x.parquet', (file_row_number = true));"
    ) == ("x.parquet", True)
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
    assert meta == {
        "geom": {
            "bbox": [1.0, 2.0, 1.0, 2.0],
            "geometry_types": {"Point"},
            "covering": None,
        }
    }

    meta = _geoparquet_metadata(conn, f"{parquet_dir}/covering/points.parquet")
    assert meta["geom"]["covering"] == {
        "xmin": '"bbox"."xmin"',
        "ymin": '"bbox"."ymin"',
        "xmax": '"bbox"."xmax"',
        "ymax": '"bbox"."ymax"',
    }

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


def test_features_without_id_column(parquet_dir):
    """No default sort, ids are row positions for collections without primary key."""
    conn = create_connection(
        # a glob: no `file_row_number` id (row numbers are not unique across files)
        DuckDBSettings(sources={"noid": f"{parquet_dir}/noid*.parquet"})
    )
    try:
        (collection,) = _collection_index(conn, DuckDBCatalogSettings())
        assert collection.id_column is None
        # no ORDER BY without `sortby` (would be a full scan)
        assert collection._sortby(None) == ""

        items = asyncio.run(collection.features(limit=10, offset=10))
        assert items["matched"] == 25
        assert [f["id"] for f in items["items"]] == list(range(11, 21))
        # insertion order
        assert [f["properties"]["name"] for f in items["items"]] == [
            f"f{x}" for x in range(11, 21)
        ]

        # explicit sort: ids are positions in the sorted features
        items = asyncio.run(collection.features(sortby="value", limit=5))
        assert [f["id"] for f in items["items"]] == [1, 2, 3, 4, 5]
        assert [f["properties"]["value"] for f in items["items"]] == [
            75,
            76,
            77,
            78,
            79,
        ]
    finally:
        conn.close()


def test_file_row_number_id(parquet_dir):
    """Single parquet file sources use the row position in the file as id."""
    conn = create_connection(
        DuckDBSettings(
            sources={
                "noid": f"{parquet_dir}/noid.parquet",
                # already has a `file_row_number` column
                "frn": f"{parquet_dir}/frn.parquet",
            }
        )
    )
    try:
        collections = {
            c.id: c for c in _collection_index(conn, DuckDBCatalogSettings())
        }
        col = collections["main.noid"]
        assert col.id_column.name == "file_row_number"

        # ids are stable: same id for a feature with or without filter/sort
        items = asyncio.run(col.features(limit=3))
        assert [f["id"] for f in items["items"]] == [0, 1, 2]
        assert [f["properties"]["name"] for f in items["items"]] == ["f1", "f2", "f3"]

        items = asyncio.run(col.features(cql_filter=Expr("value < 80"), limit=2))
        assert [f["id"] for f in items["items"]] == [20, 21]
        assert [f["properties"]["name"] for f in items["items"]] == ["f21", "f22"]

        items = asyncio.run(col.features(sortby="-name", limit=1))
        assert [f["id"] for f in items["items"]] == [8]  # "f9"

        # item lookup
        items = asyncio.run(col.features(ids_filter=["20"]))
        assert [f["properties"]["name"] for f in items["items"]] == ["f21"]

        # existing `file_row_number` column: plain view, regular column
        col = collections["main.frn"]
        assert col.get_column("file_row_number")
        items = asyncio.run(col.features())
        assert items["items"][0]["properties"]["file_row_number"] == 42
    finally:
        conn.close()


def test_literal_bounds():
    """Bounds of cql2-json geometry literals."""
    point = {"type": "Point", "coordinates": [1, 2]}
    polygon = {
        "type": "Polygon",
        "coordinates": [[[0, 0], [2, 0], [2, 3], [0, 3], [0, 0]]],
    }
    assert _literal_bounds(point, 4326) == [1.0, 2.0, 1.0, 2.0]
    assert _literal_bounds(polygon, 4326) == [0.0, 0.0, 2.0, 3.0]
    assert _literal_bounds({"bbox": [0, 1, 2, 3]}, 4326) == [0.0, 1.0, 2.0, 3.0]
    assert _literal_bounds(
        {"type": "GeometryCollection", "geometries": [point, polygon]}, 4326
    ) == [0.0, 0.0, 2.0, 3.0]
    # tagged with the column CRS: coordinates are in the column CRS
    tagged = {"op": "st_setcrs", "args": [polygon, "EPSG:26915"]}
    assert _literal_bounds(tagged, 26915) == [0.0, 0.0, 2.0, 3.0]
    # untagged literal for a projected column, or reprojected literal: ignored
    assert _literal_bounds(polygon, 26915) is None
    transformed = {"op": "st_transform", "args": [polygon, "EPSG:4326", "EPSG:26915"]}
    assert _literal_bounds(transformed, 26915) is None
    assert _literal_bounds({"property": "geom"}, 4326) is None


@pytest.fixture
def covering_collection(parquet_dir):
    """Collection of a GeoParquet file with a bbox covering column."""
    conn = create_connection(
        DuckDBSettings(sources={"cov": f"{parquet_dir}/covering/points.parquet"})
    )
    (collection,) = _collection_index(conn, DuckDBCatalogSettings())
    yield collection
    conn.close()


def _row_groups_scanned(collection, where_clause: str) -> str:
    """`Row Groups Scanned: x / y` from the query profile."""
    plan = collection.connection.execute(
        f"EXPLAIN ANALYZE SELECT count(*) {collection._from()} {where_clause}"
    ).fetchall()[0][1]
    (line,) = [line for line in plan.splitlines() if "Row Groups Scanned" in line]
    return line.strip("│ ").split(":")[1].strip()


def test_bbox_covering_filter(covering_collection):
    """Spatial filters also filter the bbox covering columns (row group pruning)."""
    col = covering_collection
    assert col.bbox_coverings == {
        "geom": {
            "xmin": '"bbox"."xmin"',
            "ymin": '"bbox"."ymin"',
            "xmax": '"bbox"."xmax"',
            "ymax": '"bbox"."ymax"',
        }
    }
    assert col.geometry_column.geometry_type == "Point"

    # no spatial filter
    assert col._where_clause(None) == "WHERE TRUE"
    where = col.cql_where(cql=Expr("fid > 10"))
    assert col._where_clause(where) == f"WHERE {where.to_sql()}"

    # bbox filter
    where = col.cql_where(bbox=[12, 12, 15, 15])
    clause = col._where_clause(where)
    assert clause.startswith(
        'WHERE "bbox"."xmin" <= 15.0 AND "bbox"."xmax" >= 12.0 '
        'AND "bbox"."ymin" <= 15.0 AND "bbox"."ymax" >= 12.0 AND ('
    )
    assert _row_groups_scanned(col, clause) == "1 / 5"
    assert _row_groups_scanned(col, f"WHERE {where.to_sql()}") == "5 / 5"

    items = asyncio.run(col.features(bbox_filter=[12, 12, 15, 15], limit=1000))
    assert len(items["items"]) == 301
    assert items["matched"] is None

    # cql2 spatial filter, combined with other filters
    where = col.cql_where(
        cql=Expr(
            "fid > 10 AND S_INTERSECTS(geom, POLYGON((12 12, 15 12, 15 15, 12 15, 12 12)))"
        )
    )
    assert _row_groups_scanned(col, col._where_clause(where)) == "1 / 5"

    # spatial filter under OR/NOT: the covering filter can't be applied
    where = col.cql_where(
        cql=Expr(
            "fid = 1 OR S_INTERSECTS(geom, POLYGON((12 12, 15 12, 15 15, 12 15, 12 12)))"
        )
    )
    assert col._where_clause(where) == f"WHERE {where.to_sql()}"
    where = col.cql_where(
        cql=Expr("NOT S_INTERSECTS(geom, POLYGON((12 12, 15 12, 15 15, 12 15, 12 12)))")
    )
    assert col._where_clause(where) == f"WHERE {where.to_sql()}"
    where = col.cql_where(
        cql=Expr("S_DISJOINT(geom, POLYGON((12 12, 15 12, 15 15, 12 15, 12 12)))")
    )
    assert col._where_clause(where) == f"WHERE {where.to_sql()}"


def test_bbox_covering_tile(covering_collection):
    """Tile envelope filter also filters the bbox covering columns."""
    col = covering_collection
    tms = morecantile.tms.get("WebMercatorQuad")
    tile = tms.tile(13.5, 13.5, 6)
    where = col.cql_where(tms=tms, tile=tile)
    assert _row_groups_scanned(col, col._where_clause(where)) == "1 / 5"

    content = asyncio.run(col.get_tile(tms=tms, tile=tile))
    assert content
