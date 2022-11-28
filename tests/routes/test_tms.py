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


def test_tilematrixInfo(app):
    """test /tileMatrixSet endpoint."""
    response = app.get("/tileMatrixSets/WebMercatorQuad")
    assert response.status_code == 200
    body = response.json()
    assert body["type"] == "TileMatrixSetType"
    assert body["identifier"] == "WebMercatorQuad"
