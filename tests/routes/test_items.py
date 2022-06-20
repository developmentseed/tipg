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


def test_items_bbox(app):
    """Test /items endpoint with bbox options."""
    response = app.get(
        "/collections/public.landsat_wrs/items?bbox=-94.702148,34.488448,-85.429688,41.112469"
    )
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert len(body["features"]) == 10
    assert body["numberMatched"] == 45
    assert body["numberReturned"] == 10

    response = app.get(
        "/collections/public.landsat_wrs/items?bbox=-200,34.488448,-85.429688,41.112469"
    )
    assert response.status_code == 422

    response = app.get(
        "/collections/public.landsat_wrs/items?bbox=-94.702148,91,-85.429688,41.112469"
    )
    assert response.status_code == 422

    response = app.get(
        "/collections/public.landsat_wrs/items?bbox=-200,34.488448,0,-85.429688,41.112469,0"
    )
    assert response.status_code == 422

    response = app.get(
        "/collections/public.landsat_wrs/items?bbox=-94.702148,91,0,-85.429688,41.112469,0"
    )
    assert response.status_code == 422

    # more than 6 coordinates
    response = app.get("/collections/public.landsat_wrs/items?bbox=0,1,2,3,4,5,6")
    assert response.status_code == 422


def test_items_ids(app):
    """Test /items endpoint with ids options."""
    response = app.get("/collections/public.landsat_wrs/items?ids=1")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert len(body["features"]) == 1
    assert body["numberMatched"] == 1
    assert body["numberReturned"] == 1
    assert body["features"][0]["id"] == "1"
    assert body["features"][0]["properties"]["ogc_fid"] == 1

    response = app.get("/collections/public.landsat_wrs/items?ids=1,2")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert len(body["features"]) == 2
    assert body["numberMatched"] == 2
    assert body["numberReturned"] == 2
    assert body["features"][0]["id"] == "1"
    assert body["features"][0]["properties"]["ogc_fid"] == 1
    assert body["features"][1]["id"] == "2"
    assert body["features"][1]["properties"]["ogc_fid"] == 2
