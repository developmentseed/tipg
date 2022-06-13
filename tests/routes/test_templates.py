"""Test HTML templates."""


def test_custom_templates(app):
    """Test /collections endpoint."""
    response = app.get("/collections")
    assert response.status_code == 200

    response = app.get("/collections?f=html")
    assert response.status_code == 200
    assert "Custom Collections" in response.text
