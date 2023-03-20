"""test endpoint factories."""

from fastapi import FastAPI

from starlette.testclient import TestClient


def test_features_factory():
    """test OGC Feature Factory."""

    # We import the factory here to make sure they do not mess with the env setting set in conftest
    # ref: https://github.com/developmentseed/tipg/issues/38
    from tipg.factory import OGCFeaturesFactory

    endpoints = OGCFeaturesFactory()
    assert endpoints.with_common
    assert endpoints.title == "OGC API"
    assert len(endpoints.router.routes) == 7
    assert len(endpoints.conforms_to) == 6

    app = FastAPI()
    app.include_router(endpoints.router)
    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        assert response.json()["title"] == "OGC API"
        links = response.json()["links"]
        assert len(links) == 9  # 5 from features + 4 from common
        landing_link = [link for link in links if link["title"] == "Landing Page"][0]
        assert landing_link["href"] == "http://testserver/"
        queryables_link = [
            link for link in links if link["title"] == "Collection queryables"
        ][0]
        assert (
            queryables_link["href"]
            == "http://testserver/collections/{collectionId}/queryables"
        )
        doc_link = [link for link in links if link["title"] == "the API documentation"][
            0
        ]
        assert doc_link["href"] == "http://testserver/docs"

        response = client.get("/conformance")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        body = response.json()["conformsTo"]
        assert len(body) > 6
        assert "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core" in body

    endpoints = OGCFeaturesFactory(
        router_prefix="/features", title="OGC Features API", with_common=True
    )
    assert endpoints.router_prefix == "/features"
    assert endpoints.with_common
    assert endpoints.title == "OGC Features API"
    assert len(endpoints.router.routes) == 7

    app = FastAPI()
    app.include_router(endpoints.router, prefix="/features")
    with TestClient(app) as client:
        response = client.get("/features/")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        assert response.json()["title"] == "OGC Features API"
        links = response.json()["links"]
        assert len(links) == 9
        landing_link = [link for link in links if link["title"] == "Landing Page"][0]
        assert landing_link["href"] == "http://testserver/features/"
        queryables_link = [
            link for link in links if link["title"] == "Collection queryables"
        ][0]
        assert (
            queryables_link["href"]
            == "http://testserver/features/collections/{collectionId}/queryables"
        )
        doc_link = [link for link in links if link["title"] == "the API documentation"][
            0
        ]
        assert doc_link["href"] == "http://testserver/docs"

        response = client.get("/features/conformance")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        body = response.json()["conformsTo"]
        assert len(body) > 6
        assert "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core" in body

    endpoints = OGCFeaturesFactory(title="OGC Features API", with_common=False)
    assert not endpoints.with_common
    assert endpoints.title == "OGC Features API"
    assert len(endpoints.router.routes) == 5
    assert len(endpoints.conforms_to) == 6

    app = FastAPI()
    app.include_router(endpoints.router)
    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 404

        response = client.get("/conformance")
        assert response.status_code == 404


def test_tiles_factory():
    """test OGC Tiles Factory."""

    # We import the factory here to make sure they do not mess with the env setting set in conftest
    # ref: https://github.com/developmentseed/tipg/issues/38
    from tipg.factory import OGCTilesFactory

    endpoints = OGCTilesFactory()
    assert endpoints.with_common
    assert endpoints.title == "OGC API"
    assert len(endpoints.router.routes) == 10
    assert len(endpoints.conforms_to) == 3

    app = FastAPI()
    app.include_router(endpoints.router)
    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        assert response.json()["title"] == "OGC API"
        links = response.json()["links"]
        assert len(links) == 7  # 3 from tiles + 4 from common
        landing_link = [link for link in links if link["title"] == "Landing Page"][0]
        assert landing_link["href"] == "http://testserver/"
        tms_link = [link for link in links if link["title"] == "TileMatrixSets"][0]
        assert tms_link["href"] == "http://testserver/tileMatrixSets"
        doc_link = [link for link in links if link["title"] == "the API documentation"][
            0
        ]
        assert doc_link["href"] == "http://testserver/docs"

        response = client.get("/conformance")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        body = response.json()["conformsTo"]
        assert len(body) > 3
        assert "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core" in body

    endpoints = OGCTilesFactory(
        router_prefix="/map", title="OGC Tiles API", with_common=True
    )
    assert endpoints.router_prefix == "/map"
    assert endpoints.with_common
    assert endpoints.title == "OGC Tiles API"
    assert len(endpoints.router.routes) == 10

    app = FastAPI()
    app.include_router(endpoints.router, prefix="/map")
    with TestClient(app) as client:
        response = client.get("/map/")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        assert response.json()["title"] == "OGC Tiles API"
        links = response.json()["links"]
        assert len(links) == 7
        landing_link = [link for link in links if link["title"] == "Landing Page"][0]
        assert landing_link["href"] == "http://testserver/map/"
        tms_link = [link for link in links if link["title"] == "TileMatrixSets"][0]
        assert tms_link["href"] == "http://testserver/map/tileMatrixSets"
        doc_link = [link for link in links if link["title"] == "the API documentation"][
            0
        ]
        assert doc_link["href"] == "http://testserver/docs"

        response = client.get("/map/conformance")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        body = response.json()["conformsTo"]
        assert len(body) > 6
        assert "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core" in body

    endpoints = OGCTilesFactory(title="OGC Tiles API", with_common=False)
    assert not endpoints.with_common
    assert endpoints.title == "OGC Tiles API"
    assert len(endpoints.router.routes) == 8
    assert len(endpoints.conforms_to) == 3

    app = FastAPI()
    app.include_router(endpoints.router)
    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 404

        response = client.get("/conformance")
        assert response.status_code == 404


def test_endpoints_factory():
    """test OGC Features+Tiles Factory."""

    # We import the factory here to make sure they do not mess with the env setting set in conftest
    # ref: https://github.com/developmentseed/tipg/issues/38
    from tipg.factory import Endpoints

    endpoints = Endpoints()
    assert endpoints.with_common
    assert endpoints.title == "OGC API"
    assert len(endpoints.router.routes) == 15
    assert len(endpoints.conforms_to) == 9  # 3 from tiles + 6 from features

    app = FastAPI()
    app.include_router(endpoints.router)
    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        assert response.json()["title"] == "OGC API"
        links = response.json()["links"]
        assert len(links) == 12  # 3 from tiles + 5 from features + 4 from common
        landing_link = [link for link in links if link["title"] == "Landing Page"][0]
        assert landing_link["href"] == "http://testserver/"
        queryables_link = [
            link for link in links if link["title"] == "Collection queryables"
        ][0]
        assert (
            queryables_link["href"]
            == "http://testserver/collections/{collectionId}/queryables"
        )
        tms_link = [link for link in links if link["title"] == "TileMatrixSets"][0]
        assert tms_link["href"] == "http://testserver/tileMatrixSets"
        doc_link = [link for link in links if link["title"] == "the API documentation"][
            0
        ]
        assert doc_link["href"] == "http://testserver/docs"

        response = client.get("/conformance")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        body = response.json()["conformsTo"]
        assert len(body) > 9  # 3 from tiles + 6 from features
        assert "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core" in body

    endpoints = Endpoints(router_prefix="/ogc", title="OGC Full API", with_common=True)
    assert endpoints.router_prefix == "/ogc"
    assert endpoints.with_common
    assert endpoints.title == "OGC Full API"
    assert len(endpoints.router.routes) == 15
    assert not endpoints.ogc_features.with_common
    assert endpoints.ogc_features.router_prefix == "/ogc"
    assert not endpoints.ogc_tiles.with_common
    assert endpoints.ogc_tiles.router_prefix == "/ogc"

    app = FastAPI()
    app.include_router(endpoints.router, prefix="/ogc")
    with TestClient(app) as client:
        response = client.get("/ogc/")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        assert response.json()["title"] == "OGC Full API"
        links = response.json()["links"]
        assert len(links) == 12
        landing_link = [link for link in links if link["title"] == "Landing Page"][0]
        assert landing_link["href"] == "http://testserver/ogc/"
        queryables_link = [
            link for link in links if link["title"] == "Collection queryables"
        ][0]
        assert (
            queryables_link["href"]
            == "http://testserver/ogc/collections/{collectionId}/queryables"
        )
        tms_link = [link for link in links if link["title"] == "TileMatrixSets"][0]
        assert tms_link["href"] == "http://testserver/ogc/tileMatrixSets"
        doc_link = [link for link in links if link["title"] == "the API documentation"][
            0
        ]
        assert doc_link["href"] == "http://testserver/docs"

        response = client.get("/ogc/conformance")
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/json"
        body = response.json()["conformsTo"]
        assert len(body) > 9
        assert "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core" in body

    # Create Endpoints without landing and conformance
    endpoints = Endpoints(title="Tiles and Features API", with_common=False)
    assert not endpoints.with_common
    assert endpoints.title == "Tiles and Features API"
    assert len(endpoints.router.routes) == 13  # 8 from tiles + 5 from features
    assert len(endpoints.conforms_to) == 9  # 3 from tiles + 6 from features

    app = FastAPI()
    app.include_router(endpoints.router)
    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 404

        response = client.get("/conformance")
        assert response.status_code == 404
