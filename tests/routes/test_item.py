"""Test /item endpoints."""


def test_item(app):
    """Test /items/{item id} endpoint."""
    response = app.get("/collections/public.landsat_wrs/items/1")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["type"] == "Feature"
    assert body["id"] == 1
    assert body["links"]

    response = app.get("/collections/public.landsat_wrs/items/1?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Collection Item: 1" in response.text

    # json output
    response = app.get("/collections/public.landsat_wrs/items/1?f=json")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    feat = response.json()
    assert {
        "collectionId",
        "itemId",
        "id",
        "pr",
        "row",
        "path",
        "ogc_fid",
        "geometry",
    } == set(feat.keys())

    # not found
    response = app.get("/collections/public.landsat_wrs/items/50000")
    assert response.status_code == 404
