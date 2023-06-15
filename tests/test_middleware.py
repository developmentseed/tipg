"""Test tipg middleware."""

import time

from tipg.middleware import CacheControlMiddleware

from fastapi import FastAPI

from starlette.responses import Response
from starlette.testclient import TestClient


def test_middleware(app_middleware_refresh):
    """Test CatalogUpdateMiddleware."""
    # Wait we pass the `ttl`
    time.sleep(2)

    response = app_middleware_refresh.get("/rawcatalog")
    assert response.status_code == 200
    body = response.json()
    assert body["collections"]
    last_updated = body["last_updated"]

    # Because we waited 2 seconds before the request
    # the background task should have been called
    # let's wait until the refresh is done
    time.sleep(5)

    response = app_middleware_refresh.get("/rawcatalog")
    assert response.status_code == 200
    body = response.json()
    assert body["collections"]
    new_updated = body["last_updated"]
    assert last_updated != new_updated


def test_middleware_cache():
    """test CacheControlMiddleware."""
    app = FastAPI()

    @app.get("/route1")
    async def route1():
        """route1."""
        return "yo"

    @app.get("/route2")
    async def route2():
        """route2."""
        return "yeah"

    @app.get("/route3")
    async def route3():
        """route3."""
        return "yeah"

    @app.get("/route4")
    async def route4():
        return "yep"

    @app.get("/route5")
    async def route5():
        return Response(status_code=404)

    app.add_middleware(
        CacheControlMiddleware,
        cachecontrol="public",
        cachecontrol_max_http_code=400,
        exclude_path={r"/route1", r"/route2", r"/route[3]"},
    )

    with TestClient(app) as client:
        response = client.get("/route1")
        assert not response.headers.get("Cache-Control")

        response = client.get("/route2")
        assert not response.headers.get("Cache-Control")

        # No cache because of `/route[3]` regex
        response = client.get("/route3")
        assert not response.headers.get("Cache-Control")

        # cache-control
        response = client.get("/route4")
        assert response.headers["Cache-Control"] == "public"

        # Not cache for status > 400
        response = client.get("/route5")
        assert not response.headers.get("Cache-Control")
