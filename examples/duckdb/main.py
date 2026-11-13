"""tipg app with DuckDB backend.

export TIPG_DUCKDB_SOURCES='{"test":"https://data.source.coop/vida/google-microsoft-osm-open-buildings/geoparquet/by_country/country_iso=FRA/FRA.parquet"}'
uv run --group server uvicorn main:app

"""

import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette_cramjam.middleware import CompressionMiddleware

from tipg import __version__ as tipg_version
from tipg.collections import Catalog
from tipg.duck import (
    DuckDBCatalogSettings,
    close_duckdb_connection,
    connect_to_duckdb,
    duck_get_collection_index,
)
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.extensions.viewer import viewerExtension
from tipg.factory import Endpoints
from tipg.middleware import CacheControlMiddleware
from tipg.openapi import _update_openapi
from tipg.settings import APISettings

settings = APISettings()

duckdb_catalog_settings = DuckDBCatalogSettings()


async def register_collection_catalog(
    app: FastAPI,
    catalog_settings: DuckDBCatalogSettings,
) -> None:
    """Register Table catalog."""
    duck_collections = await duck_get_collection_index(
        connection=app.state.duckdb_connection,
        settings=catalog_settings,
    )

    app.state.collection_catalog = Catalog(
        collections={col.id: col for col in [*duck_collections]},
        last_updated=datetime.datetime.now(),
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    # Create Connection Pool
    await connect_to_duckdb(app)

    # Register Collection Catalog
    await register_collection_catalog(
        app,
        catalog_settings=duckdb_catalog_settings,
    )

    yield

    # Close the Connection Pool
    await close_duckdb_connection(app)


app = FastAPI(
    title=settings.name,
    version=tipg_version,
    openapi_url="/api",
    docs_url="/api.html",
    lifespan=lifespan,
    root_path=settings.root_path,
)

# Fix OpenAPI response header for OGC Common compatibility
_update_openapi(app)

ogc_api = Endpoints(
    title=settings.name,
    with_tiles_viewer=False,
    extensions=[viewerExtension()],
)
app.include_router(ogc_api.router)


# Set all CORS enabled origins
if settings.cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET"],
        allow_headers=["*"],
    )

app.add_middleware(
    CacheControlMiddleware,
    cachecontrol=settings.cachecontrol,
    exclude_path={r"^/healthz$", r"^/metrics$"},
)
app.add_middleware(CompressionMiddleware, compression_level=6)

add_exception_handlers(app, DEFAULT_STATUS_CODES)


@app.get(
    "/healthz",
    description="Health Check.",
    summary="Health Check.",
    operation_id="healthCheck",
    tags=["Health Check"],
)
def ping():
    """Health check."""
    return {"ping": "pong!"}
