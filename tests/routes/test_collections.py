"""Test /collections endpoints."""


def test_collections(app):
    """Test /collections endpoint."""
    response = app.get("/collections")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert ["links", "numberMatched", "numberReturned", "collections"] == list(body)

    ids = [x["id"] for x in body["collections"]]
    assert "public.landsat_wrs" in ids
    assert "public.my_data" in ids
    assert "public.nongeo_data" in ids
    assert "public.landsat" in ids

    response = app.get("/?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Collections" in response.text


def test_collections_excludes(app_excludes):
    """Test /collections endpoint."""
    response = app_excludes.get("/collections")
    assert response.status_code == 200
    body = response.json()
    ids = [x["id"] for x in body["collections"]]
    assert "public.my_data" in ids
    assert "public.nongeo_data" not in ids


def test_collections_includes(app_includes):
    """Test /collections endpoint."""
    response = app_includes.get("/collections")
    assert response.status_code == 200
    body = response.json()
    ids = [x["id"] for x in body["collections"]]
    assert ["public.nongeo_data"] == ids


def test_collections_landsat(app):
    """Test /collections/{collectionId} endpoint."""
    response = app.get("/collections/public.landsat_wrs")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert body["id"] == "public.landsat_wrs"
    assert ["id", "title", "links", "extent", "itemType", "crs"] == list(body)
    assert ["bbox", "crs"] == list(body["extent"]["spatial"])
    assert not body["extent"].get("temporal")

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
