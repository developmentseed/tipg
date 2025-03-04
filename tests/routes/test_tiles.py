"""Test Tiles endpoints."""

import mapbox_vector_tile
import numpy as np

from tipg.collections import mvt_settings


def test_tilejson(app):
    """Test TileJSON endpoint."""
    response = app.get(
        "/collections/public.landsat_wrs/tiles/WebMercatorQuad/tilejson.json"
    )
    assert response.status_code == 200

    resp_json = response.json()
    assert resp_json["tilejson"] == "3.0.0"
    assert resp_json["name"] == "public.landsat_wrs"
    assert resp_json["minzoom"] == 5
    assert resp_json["maxzoom"] == 12
    assert resp_json["vector_layers"]

    np.testing.assert_almost_equal(
        resp_json["bounds"], [-180.0, -82.6401, 180.0, 82.6401], decimal=4
    )

    response = app.get(
        "/collections/public.landsat_wrs/tiles/WGS1984Quad/tilejson.json"
    )
    assert response.status_code == 200

    resp_json = response.json()
    assert resp_json["tilejson"] == "3.0.0"
    assert resp_json["name"] == "public.landsat_wrs"
    assert resp_json["minzoom"] == 0
    assert resp_json["maxzoom"] == 23
    assert resp_json["vector_layers"]
    assert "WGS1984Quad" in resp_json["tiles"][0]

    np.testing.assert_almost_equal(
        resp_json["bounds"], [-180.0, -82.6401, 180.0, 82.6401], decimal=4
    )

    response = app.get(
        "/collections/public.landsat_wrs/tiles/WebMercatorQuad/tilejson.json?minzoom=1&maxzoom=2"
    )
    assert response.status_code == 200

    resp_json = response.json()
    assert resp_json["name"] == "public.landsat_wrs"
    assert resp_json["minzoom"] == 1
    assert resp_json["maxzoom"] == 2

    response = app.get(
        "/collections/public.landsat_wrs/tiles/WebMercatorQuad/tilejson.json?minzoom=1&maxzoom=2&limit=1000"
    )
    assert response.status_code == 200

    resp_json = response.json()
    assert resp_json["name"] == "public.landsat_wrs"
    assert resp_json["minzoom"] == 1
    assert resp_json["maxzoom"] == 2
    assert "?limit=1000" in resp_json["tiles"][0]

    # Make sure that a non-4326 collection still returns the bounds in 4326
    response = app.get(
        "/collections/public.minnesota/tiles/WebMercatorQuad/tilejson.json"
    )
    assert response.status_code == 200

    resp_json = response.json()

    np.testing.assert_almost_equal(
        resp_json["bounds"],
        [-96.28961808496446, 46.11168980088226, -93.05330550250615, 48.56828559755232],
        decimal=3,
    )


def test_tile(app):
    """request a tile."""
    init_value = mvt_settings.set_mvt_layername
    mvt_settings.set_mvt_layername = False

    name = "landsat_wrs"
    response = app.get(f"/collections/public.{name}/tiles/WebMercatorQuad/0/0/0")
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert "default" in decoded.keys()
    assert len(decoded["default"]["features"]) == 10000

    response = app.get(
        f"/collections/public.{name}/tiles/WebMercatorQuad/0/0/0?limit=1000"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == 1000
    assert sorted(["id", "pr", "row", "path", "ogc_fid"]) == sorted(
        decoded["default"]["features"][0]["properties"]
    )

    response = app.get(
        f"/collections/public.{name}/tiles/WebMercatorQuad/0/0/0?limit=1&properties=pr,row,path"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert sorted(["pr", "row", "path"]) == sorted(
        decoded["default"]["features"][0]["properties"]
    )

    response = app.get(
        f"/collections/public.{name}/tiles/WebMercatorQuad/0/0/0?geom-column=geom"
    )
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"]) == 10000

    # invalid geometry column name
    response = app.get(
        f"/collections/public.{name}/tiles/WebMercatorQuad/0/0/0?geom-column=the_geom"
    )
    assert response.status_code == 404

    mvt_settings.set_mvt_layername = init_value


def test_tile_custom_name(app):
    """Test custom layer name."""
    init_value = mvt_settings.set_mvt_layername
    mvt_settings.set_mvt_layername = True

    name = "landsat_wrs"
    response = app.get(f"/collections/public.{name}/tiles/WebMercatorQuad/0/0/0")
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


def test_stylejson(app):
    """Test StyleJSON endpoint."""
    response = app.get(
        "/collections/public.landsat_wrs/tiles/WebMercatorQuad/style.json"
    )
    assert response.status_code == 200

    resp_json = response.json()
    assert resp_json["version"] == 8
    assert resp_json["name"] == "TiPg"
    assert "sources" in resp_json
    assert "layers" in resp_json
    assert "center" in resp_json
    assert "zoom" in resp_json

    source = resp_json["sources"]["public.landsat_wrs"]
    assert source["minzoom"] == 5
    assert source["maxzoom"] == 12

    np.testing.assert_equal(
        np.around(source["bounds"], 4), [-180.0, -82.6401, 180.0, 82.6401]
    )

    response = app.get("/collections/public.landsat_wrs/tiles/WGS1984Quad/style.json")
    assert response.status_code == 200

    resp_json = response.json()
    assert resp_json["version"] == 8
    assert resp_json["name"] == "TiPg"
    assert "sources" in resp_json
    assert "layers" in resp_json
    assert "center" in resp_json
    assert "zoom" in resp_json

    source = resp_json["sources"]["public.landsat_wrs"]
    assert source["minzoom"] == 0
    assert source["maxzoom"] == 23
    assert "WGS1984Quad" in source["tiles"][0]

    np.testing.assert_equal(
        np.around(source["bounds"], 4), [-180.0, -82.6401, 180.0, 82.6401]
    )

    response = app.get(
        "/collections/public.landsat_wrs/tiles/WebMercatorQuad/style.json?minzoom=1&maxzoom=2"
    )
    assert response.status_code == 200

    resp_json = response.json()
    source = resp_json["sources"]["public.landsat_wrs"]
    assert source["minzoom"] == 1
    assert source["maxzoom"] == 2
    assert "minzoom" not in source["tiles"][0]
    assert "maxzoom" not in source["tiles"][0]

    response = app.get(
        "/collections/public.landsat/tiles/WebMercatorQuad/style.json?geom-column=centroid"
    )
    assert response.status_code == 200
