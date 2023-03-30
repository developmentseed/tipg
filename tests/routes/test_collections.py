"""Test /collections endpoints."""

collection_number = 14


def test_collections(app):
    """Test /collections endpoint."""
    response = app.get("/collections")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert ["links", "numberMatched", "numberReturned", "collections"] == list(body)
    assert body["numberMatched"] == collection_number
    assert body["numberReturned"] == collection_number

    ids = [x["id"] for x in body["collections"]]
    assert "public.landsat_wrs" in ids
    assert "public.my_data" in ids
    assert "public.nongeo_data" in ids
    assert "public.landsat" in ids

    response = app.get("/?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Collections" in response.text


def test_collections_search(app):
    """Test /collections endpoint."""
    response = app.get("/collections", params={"limit": 1})
    body = response.json()
    assert body["numberMatched"] == collection_number
    assert body["numberReturned"] == 1
    rels = [x["rel"] for x in body["links"]]
    assert "next" in rels
    assert "prev" not in rels

    response = app.get("/collections", params={"limit": 1, "offset": 1})
    body = response.json()
    assert body["numberMatched"] == collection_number
    assert body["numberReturned"] == 1
    rels = [x["rel"] for x in body["links"]]
    assert "next" in rels
    assert "prev" in rels

    response = app.get(
        "/collections", params={"limit": 1, "offset": collection_number - 1}
    )
    body = response.json()
    assert body["numberMatched"] == collection_number
    assert body["numberReturned"] == 1
    rels = [x["rel"] for x in body["links"]]
    assert "next" not in rels
    assert "prev" in rels

    response = app.get("/collections", params={"bbox": "-180,81,180,87"})
    body = response.json()
    assert (
        body["numberMatched"] == collection_number - 3
    )  # 2 collections are not within the bbox
    ids = [x["id"] for x in body["collections"]]
    assert "public.nongeo_data" not in ids
    assert "public.canada" not in ids

    response = app.get("/collections", params={"datetime": "../2022-12-31T23:59:59Z"})
    body = response.json()
    assert body["numberMatched"] == 4
    ids = [x["id"] for x in body["collections"]]
    assert sorted(
        [
            "public.my_data",
            "public.my_data_alt",
            "public.my_data_geo",
            "public.nongeo_data",
        ]
    ) == sorted(ids)

    response = app.get("/collections", params={"datetime": "2022-12-31T23:59:59Z/.."})
    body = response.json()
    assert body["numberMatched"] == 0

    response = app.get("/collections", params={"datetime": "2003-12-31T23:59:59Z/.."})
    body = response.json()
    assert body["numberMatched"] == 4
    ids = [x["id"] for x in body["collections"]]
    assert sorted(
        [
            "public.my_data",
            "public.my_data_alt",
            "public.my_data_geo",
            "public.nongeo_data",
        ]
    ) == sorted(ids)

    response = app.get("/collections", params={"datetime": "2004-12-31T23:59:59Z/.."})
    body = response.json()
    assert body["numberMatched"] == 3
    ids = [x["id"] for x in body["collections"]]
    assert sorted(
        ["public.my_data", "public.my_data_alt", "public.my_data_geo"]
    ) == sorted(ids)

    response = app.get(
        "/collections", params={"datetime": "2004-01-01T00:00:00Z/2004-12-31T23:59:59Z"}
    )
    body = response.json()
    assert body["numberMatched"] == 1
    ids = [x["id"] for x in body["collections"]]
    assert ["public.nongeo_data"] == ids


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
    assert body["crs"] == ["http://www.opengis.net/def/crs/OGC/1.3/CRS84"]
    assert ["bbox", "crs"] == list(body["extent"]["spatial"])
    assert (
        body["extent"]["spatial"]["crs"]
        == "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
    )
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
