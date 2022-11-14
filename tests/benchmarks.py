"""Benchmark items."""

import pytest


@pytest.mark.parametrize("limit", [1, 10, 50, 100, 200, 250])
@pytest.mark.parametrize("format", ["geojson", "csv", "html"])
def test_benchmark_items(benchmark, format, limit, app):
    """Benchmark items endpoint."""
    params = {"f": format, "limit": limit}

    def f(p):
        return app.get("/collections/public.landsat_wrs/items", params=p)

    benchmark.group = f"Items: {format}"

    response = benchmark(f, params)
    assert response.status_code == 200


@pytest.mark.parametrize("name", ["NewfoundlandandLabrador", "Saskatchewan"])
@pytest.mark.parametrize("format", ["geojson", "html"])
def test_benchmark_item(benchmark, format, name, app):
    """Benchmark big item."""

    params = {"f": format, "prnom": name}

    def f(p):
        return app.get("/collections/public.canada/items", params=p)

    benchmark.group = "Big Feature"

    response = benchmark(f, params)
    assert response.status_code == 200
    if format == "geojson":
        assert response.json()["features"][0]["properties"]["prnom"] == name
