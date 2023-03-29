"""Test /collections endpoints."""


def test_collections_myschema(app_myschema):
    """Test /collections endpoint."""
    collection_number = 4  # 3 custom functions + 1 tables from myschema

    response = app_myschema.get("/collections")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert ["links", "numberMatched", "numberReturned", "collections"] == list(body)
    assert body["numberMatched"] == collection_number
    assert body["numberReturned"] == collection_number
    ids = [x["id"] for x in body["collections"]]
    # custom functions
    assert "pg_temp.landsat_centroids" in ids
    assert "pg_temp.squares" in ids
    assert "pg_temp.hexagons" in ids

    # myschema table
    assert "myschema.landsat" in ids


def test_collections_myschema_and_public_functions(app_myschema_public_functions):
    """Test /collections endpoint."""
    collection_number = (
        7  # 3 custom functions + 1 tables from myschema + 3 functions from public
    )

    response = app_myschema_public_functions.get("/collections")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert ["links", "numberMatched", "numberReturned", "collections"] == list(body)
    assert body["numberMatched"] == collection_number
    assert body["numberReturned"] == collection_number
    ids = [x["id"] for x in body["collections"]]
    # custom functions
    assert "pg_temp.landsat_centroids" in ids
    assert "pg_temp.squares" in ids
    assert "pg_temp.hexagons" in ids
    # public functions
    assert "public.st_hexagongrid" in ids

    # myschema table
    assert "myschema.landsat" in ids

    # no tables from public
    assert "public.my_data" not in ids


def test_collections_myschema_and_public(app_myschema_public):
    """Test /collections endpoint."""
    collection_number = (
        10  # 3 custom functions + 1 tables from myschema + 6 tables from public
    )

    response = app_myschema_public.get("/collections")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert ["links", "numberMatched", "numberReturned", "collections"] == list(body)
    assert body["numberMatched"] == collection_number
    assert body["numberReturned"] == collection_number
    ids = [x["id"] for x in body["collections"]]
    print(ids)
    # custom functions
    assert "pg_temp.landsat_centroids" in ids
    assert "pg_temp.squares" in ids
    assert "pg_temp.hexagons" in ids

    # myschema table
    assert "myschema.landsat" in ids

    # tables from public
    assert "public.my_data" in ids

    # no public functions
    assert "public.st_hexagongrid" not in ids
