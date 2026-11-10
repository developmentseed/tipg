"""Test the DuckDB backend through the OGC API endpoints."""

import json

import mapbox_vector_tile
import pytest
from geojson_pydantic import Feature, FeatureCollection

from tipg.duck import DuckCollection


def test_collections(duck_app):
    """List DuckDB tables, views and file sources."""
    response = duck_app.get("/collections")
    assert response.status_code == 200
    ids = {c["id"] for c in response.json()["collections"]}
    assert ids == {
        "main.points",
        "main.polygons",
        "main.utm",
        "main.nongeo",
        "main.landmarks",
    }

    catalog = duck_app.app.state.collection_catalog["collections"]
    assert all(isinstance(c, DuckCollection) for c in catalog.values())
    assert catalog["main.landmarks"].type == "View"
    assert catalog["main.points"].type == "Table"

    # the connection is not serialized
    response = duck_app.get("/rawcatalog")
    assert response.status_code == 200
    assert "connection" not in response.json()["collections"]["main.points"]


def test_collection_metadata(duck_app):
    """Check extents, CRS and queryables."""
    body = duck_app.get("/collections/main.points").json()
    assert body["extent"]["spatial"]["bbox"] == [[1.0, 1.0, 20.0, 20.0]]
    intervals = body["extent"]["temporal"]["interval"]
    # `day` (DATE) is the default datetime column (columns are sorted by name)
    assert intervals[0] == ["2020-01-01T01:00:00+00:00", "2020-01-21T00:00:00+00:00"]
    assert ["2020-01-01T01:00:00+00:00", "2020-01-01T20:00:00+00:00"] in intervals

    # projected table: extent is reprojected to WGS84
    body = duck_app.get("/collections/main.utm").json()
    minx, miny, maxx, maxy = body["extent"]["spatial"]["bbox"][0]
    assert -94 < minx < maxx < -92
    assert 44 < miny < maxy < 47
    utm = duck_app.app.state.collection_catalog["collections"]["main.utm"]
    assert utm.geometry_column.srid == 26915
    assert utm.crs == "http://www.opengis.net/def/crs/EPSG/0/26915"

    body = duck_app.get("/collections/main.nongeo").json()
    assert not body.get("extent")

    body = duck_app.get("/collections/main.points/queryables").json()
    props = body["properties"]
    assert props["geom"] == {"$ref": "https://geojson.org/schema/Point.json"}
    assert props["id"]["type"] == "number"
    assert props["price"]["type"] == "number"
    assert props["name"]["type"] == "string"
    assert props["tags"]["type"] == "array"
    assert props["props"]["type"] == "object"


def test_collections_filters(duck_app):
    """Filter collections by bbox / datetime (uses collection extents)."""
    body = duck_app.get("/collections", params={"bbox": "0,0,5,5"}).json()
    ids = {c["id"] for c in body["collections"]}
    assert {"main.points", "main.landmarks"} <= ids
    assert "main.utm" not in ids

    body = duck_app.get(
        "/collections", params={"datetime": "2019-01-01T00:00:00Z/2019-12-31T00:00:00Z"}
    ).json()
    assert body["numberMatched"] == 0


def test_items(duck_app):
    """Get items."""
    response = duck_app.get("/collections/main.points/items")
    assert response.status_code == 200
    body = response.json()
    FeatureCollection.model_validate(body)
    assert body["numberMatched"] == 20
    assert body["numberReturned"] == 10
    feat = body["features"][0]
    assert feat["id"] == 1
    assert feat["geometry"] == {"type": "Point", "coordinates": [1.0, 1.0]}
    assert feat["properties"]["name"] == "point 1"
    assert feat["properties"]["tags"] == ["a", "b"]
    assert feat["properties"]["props"] == {"rank": 1}
    assert feat["properties"]["dt"] == "2020-01-01T01:00:00+00:00"
    assert "geom" not in feat["properties"]

    # paging
    body = duck_app.get(
        "/collections/main.points/items", params={"limit": 5, "offset": 15}
    ).json()
    assert [f["id"] for f in body["features"]] == [16, 17, 18, 19, 20]
    rels = {link["rel"] for link in body["links"]}
    assert "prev" in rels
    assert "next" not in rels

    # no primary key: `gid` fallback key
    body = duck_app.get("/collections/main.polygons/items").json()
    assert [f["id"] for f in body["features"]] == [1, 2, 3]

    # file source
    body = duck_app.get("/collections/main.landmarks/items").json()
    assert body["numberMatched"] == 5

    # non spatial table
    body = duck_app.get("/collections/main.nongeo/items").json()
    assert body["numberMatched"] == 3
    assert body["features"][0]["geometry"] is None


def test_items_filters(duck_app):
    """Filter items with ids / bbox / datetime / properties / cql2."""
    url = "/collections/main.points/items"

    body = duck_app.get(url, params={"ids": "2,4"}).json()
    assert [f["id"] for f in body["features"]] == [2, 4]

    body = duck_app.get(url, params={"bbox": "0,0,3.5,3.5"}).json()
    assert [f["id"] for f in body["features"]] == [1, 2, 3]

    body = duck_app.get(
        url,
        params={"datetime": "2020-01-01T03:00:00Z/..", "datetime-column": "dt"},
    ).json()
    assert body["numberMatched"] == 18

    body = duck_app.get(url, params={"name": "point 3"}).json()
    assert [f["id"] for f in body["features"]] == [3]

    body = duck_app.get(
        url, params={"filter": "id IN (5, 6, 7) AND name LIKE 'point %'"}
    ).json()
    assert [f["id"] for f in body["features"]] == [5, 6, 7]

    body = duck_app.get(
        url,
        params={
            "filter": "S_INTERSECTS(geom, POLYGON((0 0, 2.5 0, 2.5 2.5, 0 2.5, 0 0)))"
        },
    ).json()
    assert [f["id"] for f in body["features"]] == [1, 2]


def test_items_projected(duck_app):
    """Filter and output items stored in EPSG:26915."""
    url = "/collections/main.utm/items"

    body = duck_app.get(url).json()
    lon, lat = body["features"][0]["geometry"]["coordinates"]
    assert -94 < lon < -93 and 44 < lat < 45.5

    # bbox around Minneapolis only (CRS84)
    body = duck_app.get(url, params={"bbox": "-94,44.5,-93,45.5"}).json()
    assert [f["id"] for f in body["features"]] == [1]

    # cql2 geometries are CRS84 too
    body = duck_app.get(
        url,
        params={
            "filter": "S_INTERSECTS(geom, POLYGON((-93 46, -91 46, -91 47.5, -93 47.5, -93 46)))"
        },
    ).json()
    assert [f["id"] for f in body["features"]] == [2]


def test_items_sortby_properties(duck_app):
    """Sort and select properties."""
    url = "/collections/main.points/items"

    body = duck_app.get(url, params={"sortby": "-value", "limit": 3}).json()
    assert [f["id"] for f in body["features"]] == [20, 19, 18]

    body = duck_app.get(url, params={"properties": "name", "limit": 1}).json()
    assert body["features"][0]["properties"] == {"name": "point 1"}

    response = duck_app.get(url, params={"sortby": "nope"})
    assert response.status_code == 404


def test_items_output_formats(duck_app):
    """CSV / NDJSON outputs use the WKT geometry path."""
    url = "/collections/main.points/items"

    response = duck_app.get(url, params={"f": "csv", "limit": 2})
    assert response.status_code == 200
    rows = response.text.splitlines()
    assert len(rows) == 3
    assert "SRID=4326;POINT (1 1)" in rows[1]

    response = duck_app.get(url, params={"f": "ndjson", "limit": 2})
    assert response.status_code == 200
    first = json.loads(response.text.splitlines()[0])
    assert first["geometry"] == "SRID=4326;POINT (1 1)"

    response = duck_app.get(url, params={"f": "geojsonseq", "limit": 2})
    assert response.status_code == 200
    Feature.model_validate(json.loads(response.text.splitlines()[0]))

    response = duck_app.get(url, params={"f": "html", "limit": 2})
    assert response.status_code == 200


def test_item(duck_app):
    """Get one item."""
    response = duck_app.get("/collections/main.points/items/3")
    assert response.status_code == 200
    assert response.json()["id"] == 3

    response = duck_app.get("/collections/main.points/items/999")
    assert response.status_code == 404

    # non-integer id on an integer key
    response = duck_app.get("/collections/main.points/items/abc")
    assert response.status_code == 404


@pytest.mark.parametrize(
    "collection,count",
    [("main.points", 20), ("main.polygons", 3), ("main.utm", 2), ("main.landmarks", 5)],
)
def test_tiles(duck_app, collection, count):
    """Get vector tiles."""
    response = duck_app.get(f"/collections/{collection}/tiles/WebMercatorQuad/0/0/0")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/vnd.mapbox-vector-tile"
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == count


def test_tiles_options(duck_app):
    """Vector tiles properties, sortby, limit and empty tiles."""
    url = "/collections/main.points/tiles/WebMercatorQuad/0/0/0"

    decoded = mapbox_vector_tile.decode(duck_app.get(url).content)
    props = decoded["default"]["features"][0]["properties"]
    # types not supported by MVT are cast
    assert props["price"] == 2.25
    assert props["day"] == "2020-01-02"
    assert props["tags"] == "[a, b]"

    response = duck_app.get(
        url, params={"sortby": "-id", "limit": 3, "properties": "id"}
    )
    decoded = mapbox_vector_tile.decode(response.content)
    assert [f["properties"]["id"] for f in decoded["default"]["features"]] == [
        20,
        19,
        18,
    ]

    response = duck_app.get(url, params={"sortby": "value", "properties": "id"})
    assert response.status_code == 404

    # tile without data
    response = duck_app.get("/collections/main.points/tiles/WebMercatorQuad/10/0/0")
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert not decoded or not decoded["default"]["features"]


def test_mixed_catalog(mixed_app):
    """Serve PostgreSQL and DuckDB collections from one catalog."""
    ids = {c["id"] for c in mixed_app.get("/collections").json()["collections"]}
    assert "main.points" in ids
    assert "public.landsat_wrs" in ids

    body = mixed_app.get("/collections/main.points/items", params={"limit": 1}).json()
    assert body["numberMatched"] == 20

    body = mixed_app.get(
        "/collections/public.landsat_wrs/items", params={"limit": 1}
    ).json()
    assert body["numberMatched"] == 16269

    response = mixed_app.get("/collections/main.points/tiles/WebMercatorQuad/0/0/0")
    assert response.status_code == 200
    response = mixed_app.get(
        "/collections/public.landsat_wrs/tiles/WebMercatorQuad/0/0/0"
    )
    assert response.status_code == 200
