"""Test schemas."""


def test_myschema(app_myschema):
    """Available tables should come from `myschema` and functions from `pg_temp`."""
    collection_number = 4  # 3 custom functions + 1 tables from myschema

    response = app_myschema.get("/collections")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    ids = [x["id"] for x in body["collections"]]
    # custom functions
    assert "pg_temp.landsat_centroids" in ids
    assert "pg_temp.squares" in ids
    assert "pg_temp.hexagons" in ids

    # myschema table
    assert "myschema.landsat" in ids

    assert body["numberMatched"] == collection_number


def test_myschema_and_public_functions(app_myschema_public_functions):
    """Available tables should come from `myschema` and functions from `pg_temp` and `public` schema."""
    collection_number = (
        7  # 3 custom functions + 1 tables from myschema + 3 functions from public
    )

    response = app_myschema_public_functions.get("/collections")
    assert response.status_code == 200
    body = response.json()
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

    assert body["numberMatched"] == collection_number


def test_myschema_and_public(app_myschema_public):
    """Available tables should come from `myschema` and `public` and functions from `pg_temp`"""
    collection_number = (
        11  # 3 custom functions + 1 tables from myschema + 7 tables from public
    )

    response = app_myschema_public.get("/collections")
    assert response.status_code == 200
    body = response.json()
    ids = [x["id"] for x in body["collections"]]

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

    assert body["numberMatched"] == collection_number


def test_public_functions(app_only_public_functions):
    """Available functions from `pg_temp` and `public` schema (no tables available)."""
    collection_number = 6  # 3 custom functions + 3 functions from public

    response = app_only_public_functions.get("/collections")
    assert response.status_code == 200
    body = response.json()
    ids = [x["id"] for x in body["collections"]]

    # custom functions
    assert "pg_temp.landsat_centroids" in ids
    assert "pg_temp.squares" in ids
    assert "pg_temp.hexagons" in ids

    # public functions
    assert "public.st_hexagongrid" in ids

    # no myschema table
    assert "myschema.landsat" not in ids

    # no tables from public
    assert "public.my_data" not in ids

    assert body["numberMatched"] == collection_number
