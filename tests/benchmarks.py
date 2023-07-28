"""Benchmark Tipg Endpoints."""

import pytest


@pytest.mark.parametrize("limit", [1, 10])
@pytest.mark.parametrize("format", ["json", "html"])
def test_benchmark_collections(benchmark, format, limit, app):
    """Benchmark collections endpoint."""
    params = {"f": format, "limit": limit}

    def f(p):
        return app.get("/collections", params=p)

    benchmark.group = f"Collections - {format}"

    response = benchmark(f, params)
    assert response.status_code == 200


@pytest.mark.parametrize("format", ["json", "html"])
def test_benchmark_collection(benchmark, format, app):
    """Benchmark collection endpoint."""
    params = {"f": format}

    def f(p):
        return app.get("/collections/public.landsat_wrs", params=p)

    benchmark.group = f"Collection - {format}"

    response = benchmark(f, params)
    assert response.status_code == 200


def test_benchmark_queryables(benchmark, app):
    """Benchmark queryables endpoint."""

    def f():
        return app.get(
            "/collections/public.landsat_wrs/queryables", params={"f": "schemajson"}
        )

    benchmark.group = "Queryables"

    response = benchmark(f)
    assert response.status_code == 200


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


@pytest.mark.parametrize("tms", ["WGS1984Quad", "WebMercatorQuad"])
@pytest.mark.parametrize("tile", ["0/0/0", "4/8/5", "6/33/25"])
def test_benchmark_tile(benchmark, tile, tms, app):
    """Benchmark items endpoint."""

    def f(input_tms, input_tile):
        return app.get(
            f"/collections/public.landsat_wrs/tiles/{input_tms}/{input_tile}"
        )

    benchmark.group = f"Tiles-{tms}"

    response = benchmark(f, tms, tile)
    assert response.status_code == 200


@pytest.mark.parametrize(
    "endpoint",
    [
        "/tileMatrixSets",
        "/tileMatrixSets/WGS1984Quad",
        "/tileMatrixSets/WebMercatorQuad",
        "/collections/public.landsat_wrs/tiles",
        "/collections/public.landsat_wrs/tiles/WGS1984Quad",
        "/collections/public.landsat_wrs/tiles/WebMercatorQuad",
    ],
)
def test_benchmark_tilematrixset_endpoints(benchmark, endpoint, app):
    """Benchmark tilematrixset endpoint."""

    def f(endpoint):
        return app.get(endpoint, params={"f": "json"})

    response = benchmark(f, endpoint)
    assert response.status_code == 200
