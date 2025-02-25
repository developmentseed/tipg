"""Test endpoints with non-geo table."""


def test_non_geo(app):
    """Test endpoint with non-geo tables."""
    response = app.get("/collections/public.nongeo_data")
    assert response.status_code == 200
    body = response.json()
    assert body["id"] == "public.nongeo_data"
    # No Extent for non-geo table
    assert sorted(["id", "links", "extent", "itemType", "crs"]) == sorted(body)
    assert body["extent"]["temporal"]
    assert body["extent"]["temporal"]["interval"][0] == [
        "2004-10-19T09:23:54+00:00",
        "2004-10-24T09:23:54+00:00",
    ]
    assert not body["extent"].get("spatial")

    response = app.get("/collections/public.nongeo_data/items")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["type"] == "FeatureCollection"
    assert body["id"] == "public.nongeo_data"
    assert body["title"] == "public.nongeo_data"
    assert body["links"]
    assert body["numberMatched"] == 6
    assert body["numberReturned"] == 6
    assert ["collection", "self"] == [link["rel"] for link in body["links"]]

    response = app.get("/collections/public.nongeo_data/items?f=json")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert len(body) == 6

    response = app.get("/collections/public.nongeo_data/items?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Collection Items: public.nongeo_data" in response.text

    response = app.get("/collections/public.nongeo_data/items?geom-column=geom")
    assert response.status_code == 404

    response = app.get("/collections/public.nongeo_data/queryables")
    assert response.status_code == 200

    # bbox filter should have not effect
    response = app.get("/collections/public.nongeo_data/items?bbox=0,10,0,10")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/geo+json"
    body = response.json()
    assert body["numberMatched"] == 6
    assert body["numberReturned"] == 6
