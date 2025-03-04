"""test custom SQL functions."""

import mapbox_vector_tile
import pytest

from tipg.errors import NoPrimaryKey


def test_collections_function(app_functions):
    """Test /collections endpoint."""
    response = app_functions.get("/collections")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert [
        "links",
        "numberMatched",
        "numberReturned",
        "collections",
    ] == list(body)
    ids = [x["id"] for x in body["collections"]]

    # Custom function
    assert "pg_temp.landsat_centroids" in ids
    assert "pg_temp.landsat" in ids
    assert "pg_temp.hexagons" in ids
    assert "pg_temp.hexagons_g" in ids
    assert "pg_temp.squares" in ids

    response = app_functions.get("/collections/pg_temp.landsat_centroids")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert body["id"] == "pg_temp.landsat_centroids"

    response = app_functions.get("/collections/pg_temp.squares")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert body["id"] == "pg_temp.squares"
    assert body["extent"]["spatial"]["bbox"][0] == [-180.0, -90.0, 180.0, 90.0]


def test_queryables_function(app_functions):
    """Test /queryables endpoint."""
    response = app_functions.get("/collections/pg_temp.landsat_centroids/queryables")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/schema+json"
    body = response.json()
    assert {"geom", "ogc_fid", "path", "pr", "row"}.issubset(body["properties"].keys())

    response = app_functions.get("/collections/pg_temp.landsat/queryables")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/schema+json"
    body = response.json()
    assert {"geom", "grid_path", "grid_row", "path_row"}.issubset(
        body["properties"].keys()
    )


def test_items_function(app_functions):
    """Test /items endpoint."""
    response = app_functions.get("/collections/pg_temp.landsat_centroids/items")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["id"] == "pg_temp.landsat_centroids"
    assert body["features"][0]["geometry"]["type"] == "Point"
    assert body["features"][0]["id"] == 1
    assert body["features"][0]["properties"]["ogc_fid"] == 1
    assert body["numberMatched"] == 16269
    assert body["numberReturned"] == 10

    response = app_functions.get("/collections/pg_temp.landsat_centroids/items?path=0")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["numberMatched"] == 0
    assert body["numberReturned"] == 0

    response = app_functions.get("/collections/pg_temp.landsat_centroids/items?path=13")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["numberMatched"] == 104
    assert body["numberReturned"] == 10

    # Check functions that take x/y/z input
    response = app_functions.get("/collections/pg_temp.landsat/items?p=13&x=0&y=0&z=0")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["numberMatched"] == 104
    assert body["numberReturned"] == 10

    response = app_functions.get("/collections/pg_temp.hexagons/items")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["id"] == "pg_temp.hexagons"
    assert body["features"][0]["geometry"]["type"] == "Polygon"
    assert body["features"][0]["id"]
    assert body["features"][0]["properties"]["i"]
    assert body["features"][0]["properties"]["j"]
    assert body["numberMatched"] == 287
    assert body["numberReturned"] == 10

    response = app_functions.get(
        "/collections/pg_temp.hexagons/items",
        params={
            "size": 10,
            "bounds": "POLYGON((-180 -90,-180 90,180 90,180 -90,-180 -90))",
        },
    )
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["id"] == "pg_temp.hexagons"
    assert body["features"][0]["geometry"]["type"] == "Polygon"
    assert body["features"][0]["id"]
    assert body["features"][0]["properties"]["i"] == 0
    assert body["features"][0]["properties"]["j"] == 0
    assert body["numberMatched"] == 287
    assert body["numberReturned"] == 10

    response = app_functions.get("/collections/pg_temp.landsat_centroids/items/1")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["id"] == 1
    assert body["geometry"]["type"] == "Point"
    assert body["properties"]["ogc_fid"] == 1

    # No Primary key for functions
    with pytest.raises(NoPrimaryKey):
        app_functions.get("/collections/pg_temp.hexagons/items/1")


def test_tiles_functions(app_functions):
    """Test Tiles endpoint."""
    response = app_functions.get(
        "/collections/pg_temp.landsat_centroids/tiles/WebMercatorQuad/tilejson.json"
    )
    assert response.status_code == 200
    body = response.json()
    assert body["name"] == "pg_temp.landsat_centroids"
    assert body["minzoom"] == 5
    assert body["maxzoom"] == 12

    response = app_functions.get(
        "/collections/pg_temp.hexagons/tiles/WebMercatorQuad/tilejson.json"
    )
    assert response.status_code == 200
    body = response.json()
    assert body["name"] == "pg_temp.hexagons"
    assert body["minzoom"] == 5
    assert body["maxzoom"] == 12

    response = app_functions.get(
        "/collections/pg_temp.hexagons/tiles/WebMercatorQuad/tilejson.json?minzoom=1&maxzoom=2&size=4"
    )
    assert response.status_code == 200
    body = response.json()
    assert body["name"] == "pg_temp.hexagons"
    assert body["minzoom"] == 1
    assert body["maxzoom"] == 2
    assert "?size=4" in body["tiles"][0]

    # tilesets
    response = app_functions.get("/collections/pg_temp.landsat_centroids/tiles")
    assert response.status_code == 200
    body = response.json()
    assert body["tilesets"]

    response = app_functions.get("/collections/pg_temp.hexagons/tiles")
    assert response.status_code == 200
    assert body["tilesets"]

    # tileset
    response = app_functions.get(
        "/collections/pg_temp.landsat_centroids/tiles/WebMercatorQuad"
    )
    assert response.status_code == 200
    body = response.json()
    assert (
        body["title"]
        == "'pg_temp.landsat_centroids' tileset tiled using WebMercatorQuad TileMatrixSet"
    )

    response = app_functions.get("/collections/pg_temp.hexagons/tiles/WebMercatorQuad")
    assert response.status_code == 200
    body = response.json()
    assert (
        body["title"]
        == "'pg_temp.hexagons' tileset tiled using WebMercatorQuad TileMatrixSet"
    )

    # tiles
    # Check default's function are used
    response = app_functions.get(
        "/collections/pg_temp.squares/tiles/WebMercatorQuad/3/3/3"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == 25

    # Check default's function are used
    response = app_functions.get(
        "/collections/pg_temp.squares/tiles/WebMercatorQuad/3/3/3?size=2"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == 483

    # Check any geometry input column will work
    response = app_functions.get(
        "/collections/pg_temp.hexagons/tiles/WebMercatorQuad/3/3/3"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == 12

    response = app_functions.get(
        "/collections/pg_temp.hexagons_g/tiles/WebMercatorQuad/3/3/3"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == 12

    # Check function with x/y/z input
    response = app_functions.get(
        "/collections/pg_temp.landsat/tiles/WebMercatorQuad/0/0/0?p=13"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == 104
    assert decoded["default"]["features"][0]["properties"]["grid_path"] == 13

    # No features with p=0
    response = app_functions.get(
        "/collections/pg_temp.landsat/tiles/WebMercatorQuad/0/0/0?p=0"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert not decoded

    # default p=0 so it should return nothing
    response = app_functions.get(
        "/collections/pg_temp.landsat/tiles/WebMercatorQuad/0/0/0"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert not decoded
