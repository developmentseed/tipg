"""Test tipg middleware."""

import time


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
