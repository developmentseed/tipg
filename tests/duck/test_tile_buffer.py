"""Test the tile envelope filter includes the tile buffer."""

import asyncio

import mapbox_vector_tile
import morecantile
import pytest

from tipg.duck import DuckDBCatalogSettings, DuckDBSettings
from tipg.duck.collections import _collection_index
from tipg.duck.database import create_connection
from tipg.settings import MVTSettings

duckdb = pytest.importorskip("duckdb")

tms = morecantile.tms.get("WebMercatorQuad")

# z4 tile covering lon [0, 22.5], lat [0, ~21.94]
TILE = morecantile.Tile(8, 7, 4)
# tile buffer (256px of 4096px) is 1.40625° wide on this tile
POINTS = {
    1: (10.0, 10.0),  # inside the tile
    2: (23.0, 10.0),  # outside the tile, inside its buffer
    3: (25.0, 10.0),  # outside the tile buffer
}


@pytest.fixture
def points():
    """Collection of points around the tile east edge."""
    conn = create_connection(DuckDBSettings())
    values = ", ".join(f"({i}, ST_Point({x}, {y}))" for i, (x, y) in POINTS.items())
    conn.execute(
        f"CREATE VIEW memory.main.points AS SELECT * FROM (VALUES {values}) t(id, geom)"
    )
    (col,) = _collection_index(conn, DuckDBCatalogSettings(tables=["main.points"]))
    yield col
    conn.close()


def test_tile_includes_buffer(points):
    """Features in the tile buffer are encoded in the tile."""
    assert MVTSettings().tile_buffer == 256

    content = asyncio.run(points.get_tile(tms=tms, tile=TILE))
    layer = mapbox_vector_tile.decode(content)["default"]
    ids = sorted(f["properties"]["id"] for f in layer["features"])
    assert ids == [1, 2]


def test_tile_filter_buffer(points):
    """The tile envelope is expanded by `tile_buffer` pixels."""
    bounds = tms.xy_bounds(TILE)
    margin = (bounds.right - bounds.left) * 256 / 4096

    def envelope(where):
        ((w, s), (e, _), (_, n), *_) = where.to_json()["args"][1]["coordinates"][0]
        return w, s, e, n

    # no buffer by default
    w, s, e, n = envelope(points.cql_where(tile=TILE, tms=tms))
    assert (w, s, e, n) == pytest.approx(
        tms.lnglat(bounds.left, bounds.bottom) + tms.lnglat(bounds.right, bounds.top)
    )

    w, s, e, n = envelope(
        points.cql_where(tile=TILE, tms=tms, tile_buffer=256, tile_resolution=4096)
    )
    expected = tms.lnglat(bounds.left - margin, bounds.bottom - margin) + tms.lnglat(
        bounds.right + margin, bounds.top + margin
    )
    assert (w, s, e, n) == pytest.approx(expected)


def test_tile_filter_buffer_clamped(points):
    """The expanded tile envelope stays inside the TMS bounds."""
    where = points.cql_where(
        tile=morecantile.Tile(0, 0, 0), tms=tms, tile_buffer=256, tile_resolution=4096
    )
    coords = where.to_json()["args"][1]["coordinates"][0]
    xs, ys = [c[0] for c in coords], [c[1] for c in coords]
    assert min(xs) >= -180 and max(xs) <= 180
    assert min(ys) >= -85.06 and max(ys) <= 85.06
