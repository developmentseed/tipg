"""Test /collections endpoints."""


def test_collections(app):
    """Test /collections endpoint."""
    response = app.get("/collections")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert ["collections", "links"] == list(body)

    assert list(filter(lambda x: x["id"] == "public.landsat_wrs", body["collections"]))
    assert list(filter(lambda x: x["id"] == "public.my_data", body["collections"]))
    assert list(filter(lambda x: x["id"] == "public.nongeo_data", body["collections"]))
    assert list(filter(lambda x: x["id"] == "public.landsat", body["collections"]))

    response = app.get("/?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Collections" in response.text


def test_collections_landsat(app):
    """Test /collections/{collectionId} endpoint."""
    response = app.get("/collections/public.landsat_wrs")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert body["id"] == "public.landsat_wrs"
    assert ["id", "links", "extent", "itemType", "crs"] == list(body)
    assert ["bbox", "crs"] == list(body["extent"]["spatial"])

    response = app.get("/collections/public.landsat_wrs?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Collection: public.landsat_wrs" in response.text

    # bad collection name
    response = app.get("/collections/public.landsat_wr")
    assert response.status_code == 404
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert body["detail"] == "Table/Function 'public.landsat_wr' not found."

    # bad collection name
    response = app.get("/collections/landsat_wrs")
    assert response.status_code == 422
    body = response.json()
    assert body["detail"] == "Invalid Collection format 'landsat_wrs'."


def test_collections_queryables(app):
    """Test /collections/{collectionId}/queryables endpoint."""
    response = app.get("/collections/public.landsat_wrs/queryables")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/schema+json"
    body = response.json()
    assert body["title"] == "public.landsat_wrs"
    assert body["type"] == "object"
    assert ["title", "properties", "type", "$schema", "$id"] == list(body)

    response = app.get("/collections/public.landsat_wrs/queryables?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Queryables" in response.text

    response = app.get("/collections/public.landsat/queryables")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/schema+json"
    body = response.json()
    assert body["title"] == "public.landsat"
    # 2 geometry column
    assert (
        body["properties"]["geom"]["$ref"] == "https://geojson.org/schema/Geometry.json"
    )
    assert (
        body["properties"]["centroid"]["$ref"]
        == "https://geojson.org/schema/Geometry.json"
    )
