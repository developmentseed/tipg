"""Test Tiles endpoints."""

import mapbox_vector_tile
import numpy as np

from tipg.dbmodel import mvt_settings


def test_tilejson(app):
    """Test TileJSON endpoint."""
    response = app.get("/collections/public.landsat_wrs/tilejson.json")
    assert response.status_code == 200

    resp_json = response.json()
    assert resp_json["name"] == "public.landsat_wrs"
    assert resp_json["minzoom"] == 5
    assert resp_json["maxzoom"] == 12

    np.testing.assert_almost_equal(
        resp_json["bounds"], [-180.0, -82.6401, 180.0, 82.6401]
    )

    response = app.get(
        "/collections/public.landsat_wrs/tilejson.json?minzoom=1&maxzoom=2"
    )
    assert response.status_code == 200

    resp_json = response.json()
    assert resp_json["name"] == "public.landsat_wrs"
    assert resp_json["minzoom"] == 1
    assert resp_json["maxzoom"] == 2

    response = app.get(
        "/collections/public.landsat_wrs/tilejson.json?minzoom=1&maxzoom=2&limit=1000"
    )
    assert response.status_code == 200

    resp_json = response.json()
    assert resp_json["name"] == "public.landsat_wrs"
    assert resp_json["minzoom"] == 1
    assert resp_json["maxzoom"] == 2
    assert "?limit=1000" in resp_json["tiles"][0]


def test_tile(app):
    """request a tile."""
    init_value = mvt_settings.set_mvt_layername
    mvt_settings.set_mvt_layername = False

    name = "landsat_wrs"
    response = app.get(f"/collections/public.{name}/tiles/0/0/0")
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert "default" in decoded.keys()
    assert len(decoded["default"]["features"]) == 10000

    response = app.get(f"/collections/public.{name}/tiles/0/0/0?limit=1000")
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == 1000
    assert sorted(["id", "pr", "row", "path", "ogc_fid"]) == sorted(
        decoded["default"]["features"][0]["properties"]
    )

    response = app.get(
        f"/collections/public.{name}/tiles/0/0/0?limit=1&properties=pr,row,path"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert sorted(["pr", "row", "path"]) == sorted(
        decoded["default"]["features"][0]["properties"]
    )

    response = app.get(f"/collections/public.{name}/tiles/0/0/0?geom-column=geom")
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == 10000

    # invalid geometry column name
    response = app.get(f"/collections/public.{name}/tiles/0/0/0?geom-column=the_geom")
    assert response.status_code == 404

    mvt_settings.set_mvt_layername = init_value


def test_tile_custom_name(app):
    """Test custom layer name."""
    init_value = mvt_settings.set_mvt_layername
    mvt_settings.set_mvt_layername = True

    name = "landsat_wrs"
    response = app.get(f"/collections/public.{name}/tiles/0/0/0")
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert name in decoded.keys()
    assert len(decoded[name]["features"]) == 10000

    mvt_settings.set_mvt_layername = init_value


def test_tile_tms(app):
    """request a tile with specific TMS."""
    init_value = mvt_settings.set_mvt_layername
    mvt_settings.set_mvt_layername = False

    name = "landsat_wrs"
    response = app.get(f"/collections/public.{name}/tiles/WorldCRS84Quad/0/0/0")
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert "default" in decoded.keys()
    assert len(decoded["default"]["features"]) > 1000

    response = app.get(
        f"/collections/public.{name}/tiles/WorldCRS84Quad/0/0/0?limit=1000"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) <= 1000
    assert sorted(["id", "pr", "row", "path", "ogc_fid"]) == sorted(
        decoded["default"]["features"][0]["properties"]
    )

    response = app.get(
        f"/collections/public.{name}/tiles/WorldCRS84Quad/0/0/0?limit=1&properties=pr,row,path"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert sorted(["pr", "row", "path"]) == sorted(
        decoded["default"]["features"][0]["properties"]
    )

    mvt_settings.set_mvt_layername = init_value


def test_tile_tms_custom_name(app):
    """test layername with tms."""
    init_value = mvt_settings.set_mvt_layername
    mvt_settings.set_mvt_layername = True

    name = "landsat_wrs"
    response = app.get(f"/collections/public.{name}/tiles/WorldCRS84Quad/0/0/0")
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert name in decoded.keys()
    assert len(decoded[name]["features"]) > 1000

    mvt_settings.set_mvt_layername = init_value


# def test_function_tilejson(app):
#     """Test TileJSON endpoint."""
#     response = app.get("/collections/squares/tilejson.json")
#     assert response.status_code == 200
#     resp_json = response.json()
#     assert resp_json["name"] == "squares"
#     assert resp_json["minzoom"] == 5
#     assert resp_json["maxzoom"] == 12
#     np.testing.assert_almost_equal(resp_json["bounds"], [-180.0, -90, 180.0, 90])

#     response = app.get("/collections/squares/tilejson.json?minzoom=1&maxzoom=2")
#     assert response.status_code == 200
#     resp_json = response.json()
#     assert resp_json["name"] == "squares"
#     assert resp_json["minzoom"] == 1
#     assert resp_json["maxzoom"] == 2

#     response = app.get("/collections/squares/tilejson.json?minzoom=1&maxzoom=2&depth=4")
#     assert response.status_code == 200
#     resp_json = response.json()
#     assert resp_json["name"] == "squares"
#     assert resp_json["minzoom"] == 1
#     assert resp_json["maxzoom"] == 2
#     assert "?depth=4" in resp_json["tiles"][0]


# def test_function_tile(app):
#     """request a tile."""
#     name = squares
#     response = app.get("/collections/{name}/tiles/0/0/0")
#     assert response.status_code == 200
#     decoded = mapbox_vector_tile.decode(response.content)
#     assert name in decoded.keys()
#     assert len(decoded[name]["features"]) == 4

#     response = app.get("/collections/squares/tiles/0/0/0?depth=4")
#     assert response.status_code == 200
#     decoded = mapbox_vector_tile.decode(response.content)
#     assert len(decoded[name]["features"]) == 16
