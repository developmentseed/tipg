"""Test pg_mvt.main.app."""


def test_health(app):
    """Test /healthz endpoint."""
    response = app.get("/healthz")
    assert response.status_code == 200
    assert response.json() == {"ping": "pong!"}

    response = app.get("/rawcatalog")
    assert response.status_code == 200
    body = response.json()
    assert body["collections"]
    assert body["last_updated"]
