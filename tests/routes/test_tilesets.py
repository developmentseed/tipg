"""test tileset endpoints."""

import pytest
from morecantile import tms


def test_tilesets(app):
    """test /collections/{collectionId}/tiles endpoint."""
    response = app.get("/collections/public.landsat/tiles")
    assert response.status_code == 200
    body = response.json()

    assert len(body["tilesets"]) == len(tms.list())
    tileset = list(
        filter(
            lambda m: m["title"]
            == "'public.landsat' tileset tiled using WebMercatorQuad TileMatrixSet",
            body["tilesets"],
        )
    )[0]
    assert tileset["dataType"] == "vector"
    assert tileset["crs"] == "http://www.opengis.net/def/crs/EPSG/0/3857"
    assert tileset["boundingBox"]
    assert tileset["links"]

    response = app.get("/collections/public.landsat/tiles?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


@pytest.mark.parametrize("tms_name", tms.list())
def test_tileset(app, tms_name):
    """test /collections/{collectionId}/tiles/tileMatrixSetId endpoint."""
    response = app.get(f"/collections/public.landsat/tiles/{tms_name}")
    assert response.status_code == 200
    tileset = response.json()

    assert tileset["dataType"] == "vector"
    assert tileset["boundingBox"]
    assert tileset["links"]
    assert tileset["tileMatrixSetLimits"]

    response = app.get(f"/collections/public.landsat/tiles/{tms_name}?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
