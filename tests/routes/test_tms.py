"""test TileMatrixSets endpoints."""

from morecantile import tms


def test_tilematrix(app):
    """test /tileMatrixSet endpoint."""
    response = app.get("/tileMatrixSets")
    assert response.status_code == 200
    body = response.json()

    assert len(body["tileMatrixSets"]) == len(tms.list())
    tileMatrixSets = list(
        filter(lambda m: m["id"] == "WebMercatorQuad", body["tileMatrixSets"])
    )[0]
    assert (
        tileMatrixSets["links"][0]["href"]
        == "http://testserver/tileMatrixSets/WebMercatorQuad"
    )

    response = app.get("/tileMatrixSets?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_tilematrixInfo(app):
    """test /tileMatrixSet endpoint."""
    response = app.get("/tileMatrixSets/WebMercatorQuad")
    assert response.headers["content-type"] == "application/json"
    assert response.status_code == 200
    body = response.json()
    assert body["id"] == "WebMercatorQuad"
    assert body["crs"]
    assert body["tileMatrices"]

    response = app.get("/tileMatrixSets/WebMercatorQuad?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
