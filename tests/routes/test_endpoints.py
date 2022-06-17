"""Test endpoints."""


def test_landing(app):
    """Test / endpoint."""
    response = app.get("/")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert body["title"] == "TiFeatures"
    assert body["links"]

    response = app.get("/?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "TiFeatures" in response.text


def test_docs(app):
    """Test /api endpoint."""
    response = app.get("/api")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert body["openapi"]

    response = app.get("/api.html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_conformance(app):
    """Test /conformance endpoint."""
    response = app.get("/conformance")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    body = response.json()
    assert body["conformsTo"]

    response = app.get("/conformance?f=html")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Conformance" in response.text
