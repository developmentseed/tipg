"""Test tipg Prometheus metrics."""

import os
import subprocess
import sys
import textwrap
from pathlib import Path

import pytest

from tipg.metrics import REQUESTS, instrument_app, resolve_operation

from fastapi import FastAPI

from starlette.testclient import TestClient


def _counter_total() -> float:
    """Sum tipg request counter samples across all label sets."""
    total = 0.0
    for metric in REQUESTS.collect():
        for sample in metric.samples:
            if sample.name == "tipg_http_requests_total":
                total += sample.value
    return total


@pytest.mark.parametrize(
    "route,expected",
    [
        ("/", "landing"),
        ("/conformance", "conformance"),
        ("/collections", "list_collections"),
        ("/collections/{collectionId}", "get_collection"),
        ("/collections/{collectionId}/queryables", "queryables"),
        ("/collections/{collectionId}/items", "list_items"),
        ("/collections/{collectionId}/items/{itemId}", "get_item"),
        ("/collections/{collectionId}/tiles", "tiles"),
        (
            "/collections/{collectionId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}",
            "tiles",
        ),
        ("/tileMatrixSets", "tile_matrix_sets"),
        ("/tileMatrixSets/{tileMatrixSetId}", "tile_matrix_sets"),
        (None, "unknown"),
        ("/api", "other"),
    ],
)
def test_resolve_operation(route, expected):
    """Map tipg route templates to low-cardinality operation labels."""
    assert resolve_operation(route) == expected


def test_metrics_endpoint(app):
    """Metrics returns Prometheus exposition with tipg operation labels."""
    assert app.get("/collections").status_code == 200

    response = app.get("/metrics")
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/plain")
    assert "Cache-Control" not in response.headers
    assert "tipg_http_requests_total{" in response.text
    assert 'operation="list_collections"' in response.text
    assert "tipg_http_request_duration_seconds_bucket{" in response.text
    assert 'status="2xx"' in response.text


def test_metrics_exclude_healthz_and_metrics(app):
    """Health and scrape endpoints are not counted under any operation label."""
    before = _counter_total()
    assert app.get("/healthz").status_code == 200
    assert app.get("/metrics").status_code == 200
    assert _counter_total() == before


def test_healthz_exclusion_is_exact():
    """Only the exact /healthz path is excluded from request counters."""
    app = FastAPI()

    @app.get("/foo/healthz-report")
    def healthz_report():
        return {"ok": True}

    instrument_app(app)

    with TestClient(app) as client:
        before = _counter_total()
        assert client.get("/foo/healthz-report").status_code == 200
        assert _counter_total() == before + 1


def test_custom_metrics_endpoint_excluded():
    """A custom scrape endpoint is excluded from request counters."""
    app = FastAPI()

    @app.get("/hello")
    def hello():
        return {"ok": True}

    instrument_app(app, endpoint="/prom")

    with TestClient(app) as client:
        before = _counter_total()
        assert client.get("/prom").status_code == 200
        assert _counter_total() == before

        assert client.get("/hello").status_code == 200
        assert _counter_total() == before + 1
        body = client.get("/prom").text
        assert 'operation="other"' in body


def test_instrument_app_is_idempotent():
    """Calling instrument_app twice on the same app is a no-op."""
    app = FastAPI()
    instrument_app(app)
    instrument_app(app)

    metric_routes = [
        getattr(route, "path", None)
        for route in app.routes
        if getattr(route, "path", None) == "/metrics"
    ]
    assert len(metric_routes) == 1


def test_optional_metrics_import_error(tmp_path: Path):
    """Missing prometheus packages raise ImportError from tipg.metrics."""
    script = textwrap.dedent(
        """
        import builtins
        import sys

        real_import = builtins.__import__

        def fake_import(name, globals=None, locals=None, fromlist=(), level=0):
            if name.startswith("prometheus_"):
                raise ImportError(name)
            return real_import(name, globals, locals, fromlist, level)

        builtins.__import__ = fake_import
        sys.modules.pop("tipg.metrics", None)

        try:
            import tipg.metrics  # noqa: F401
        except ImportError:
            raise SystemExit(0)
        raise SystemExit(1)
        """
    )
    script_path = tmp_path / "check_import_error.py"
    script_path.write_text(script)
    result = subprocess.run(
        [sys.executable, str(script_path)],
        check=False,
        capture_output=True,
        text=True,
        cwd=str(Path(__file__).resolve().parents[1]),
        env={**os.environ, "PYTHONPATH": str(Path(__file__).resolve().parents[1])},
    )
    assert result.returncode == 0, result.stderr


def test_instrument_app_errors_are_not_swallowed(monkeypatch):
    """Non-ImportError failures from instrumentation propagate to the caller."""
    import tipg.metrics as metrics

    app = FastAPI()
    metrics._INSTRUMENTED_APPS.discard(app)

    def boom(*args, **kwargs):
        raise ValueError("PROMETHEUS_MULTIPROC_DIR is invalid")

    monkeypatch.setattr(metrics, "Instrumentator", boom)
    with pytest.raises(ValueError, match="PROMETHEUS_MULTIPROC_DIR"):
        instrument_app(app)


def test_main_propagates_instrumentation_errors(tmp_path: Path):
    """tipg.main only swallows ImportError from importing tipg.metrics."""
    script = textwrap.dedent(
        """
        import sys
        from types import ModuleType

        fake = ModuleType("tipg.metrics")

        def instrument_app(app):
            raise ImportError("broken installed metrics dependency")

        fake.instrument_app = instrument_app
        sys.modules["tipg.metrics"] = fake
        sys.modules.pop("tipg.main", None)

        try:
            import tipg.main  # noqa: F401
        except ImportError as exc:
            if "broken installed metrics dependency" in str(exc):
                raise SystemExit(0)
            raise
        raise SystemExit(1)
        """
    )
    script_path = tmp_path / "check_main_import.py"
    script_path.write_text(script)
    result = subprocess.run(
        [sys.executable, str(script_path)],
        check=False,
        capture_output=True,
        text=True,
        cwd=str(Path(__file__).resolve().parents[1]),
        env={
            **os.environ,
            "PYTHONPATH": str(Path(__file__).resolve().parents[1]),
            "DATABASE_URL": "postgresql://user:pass@localhost:5432/db",
        },
    )
    assert result.returncode == 0, result.stderr


def test_multiprocess_metrics_exposition(tmp_path: Path):
    """Multiprocess scrape works when PROMETHEUS_MULTIPROC_DIR is set before import."""
    multiproc_dir = tmp_path / "multiproc"
    multiproc_dir.mkdir()
    script = textwrap.dedent(
        f"""
        import os

        os.environ["PROMETHEUS_MULTIPROC_DIR"] = {str(multiproc_dir)!r}

        from fastapi import FastAPI
        from starlette.testclient import TestClient

        from tipg.metrics import instrument_app

        app = FastAPI()

        @app.get("/collections")
        def collections():
            return []

        instrument_app(app)

        with TestClient(app) as client:
            assert client.get("/collections").status_code == 200
            response = client.get("/metrics")
            assert response.status_code == 200
            assert "tipg_http_requests_total" in response.text
            assert 'operation="list_collections"' in response.text
        """
    )
    script_path = tmp_path / "check_multiproc.py"
    script_path.write_text(script)
    result = subprocess.run(
        [sys.executable, str(script_path)],
        check=False,
        capture_output=True,
        text=True,
        cwd=str(Path(__file__).resolve().parents[1]),
        env={**os.environ, "PYTHONPATH": str(Path(__file__).resolve().parents[1])},
    )
    assert result.returncode == 0, result.stderr
