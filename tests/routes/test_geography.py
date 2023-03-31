"""test tipg endpoint with table having a geography column."""

import mapbox_vector_tile
import numpy


def test_geography_column(app):
    """Test endpoints with table having geography column."""
    response = app.get("/collections/public.my_data_geo")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert body["id"] == "public.my_data_geo"

    response = app.get("/collections/public.my_data_geo/items")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["type"] == "FeatureCollection"
    assert body["id"] == "public.my_data_geo"
    assert body["title"] == "public.my_data_geo"
    assert body["links"]
    assert body["numberMatched"] == 6
    assert body["numberReturned"] == 6
    assert body["features"][0]["geometry"]["type"] == "Polygon"

    response = app.get("/collections/public.my_data_geo/tilejson.json")
    assert response.status_code == 200
    resp_json = response.json()
    assert resp_json["name"] == "public.my_data_geo"
    assert resp_json["minzoom"] == 5
    assert resp_json["maxzoom"] == 12
    numpy.testing.assert_almost_equal(
        resp_json["bounds"], [-47.5356, 74.8049, -8.97407, 81.8555]
    )

    response = app.get("/collections/public.my_data_geo/tiles/5/11/5")
    assert response.status_code == 200
    decoded = mapbox_vector_tile.decode(response.content)
    assert len(decoded["default"]["features"])
