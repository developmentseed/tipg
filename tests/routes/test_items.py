"""Test /items endpoints."""


def test_items(app):
    """Test /items endpoint."""
    response = app.get("/collections/public.landsat_wrs/items")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["type"] == "FeatureCollection"
    assert body["id"] == "public.landsat_wrs"
    assert body["title"] == "public.landsat_wrs"
    assert body["links"]
    assert body["numberMatched"] == 16269
    assert body["numberReturned"] == 10
    assert ["collection", "self", "next"] == [link["rel"] for link in body["links"]]

    response = app.get("/collections/public.landsat_wrs/items?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Collection Items: public.landsat_wrs" in response.text


def test_items_limit_and_offset(app):
    """Test /items endpoint with limit and offset options."""
    response = app.get("/collections/public.landsat_wrs/items?limit=1")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert len(body["features"]) == 1
    assert body["features"][0]["id"] == "1"
    assert body["features"][0]["properties"]["ogc_fid"] == 1
    assert body["numberMatched"] == 16269
    assert body["numberReturned"] == 1

    response = app.get("/collections/public.landsat_wrs/items?limit=1&offset=1")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert len(body["features"]) == 1
    assert body["features"][0]["id"] == "2"
    assert body["features"][0]["properties"]["ogc_fid"] == 2
    assert body["numberMatched"] == 16269
    assert body["numberReturned"] == 1
    assert ["collection", "self", "next", "prev"] == [
        link["rel"] for link in body["links"]
    ]

    # negative offset
    response = app.get("/collections/public.landsat_wrs/items?offset=-1")
    assert response.status_code == 422

    # last item
    response = app.get("/collections/public.landsat_wrs/items?offset=16268")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert len(body["features"]) == 1
    assert body["features"][0]["id"] == "16269"
    assert body["features"][0]["properties"]["ogc_fid"] == 16269
    assert body["numberMatched"] == 16269
    assert body["numberReturned"] == 1
    assert ["collection", "self", "prev"] == [link["rel"] for link in body["links"]]

    # TODO: Fix
    # offset > data
    # response = app.get("/collections/public.landsat_wrs/items?offset=20000")
    # assert response.status_code == 200
    # body = response.json()
    # assert len(body["features"]) == 0
    # assert body["numberMatched"] == 16269
    # assert body["numberReturned"] == 0
