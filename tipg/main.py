"""tipg app."""

import datetime
from contextlib import asynccontextmanager
from typing import Any

import jinja2
from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware
from starlette.templating import Jinja2Templates
from starlette_cramjam.middleware import CompressionMiddleware

from . import __version__ as tipg_version
from .collections import Catalog
from .errors import DEFAULT_STATUS_CODES, add_exception_handlers
from .extensions.viewer import viewerExtension
from .factory import Endpoints
from .middleware import CacheControlMiddleware, CatalogUpdateMiddleware
from .openapi import _update_openapi
from .pg import (
    CustomSQLSettings,
    PostgresCatalogSettings,
    close_db_connection,
    connect_to_db,
    pg_get_collection_index,
)
from .settings import APISettings

settings = APISettings()

# Postgres Catalog Settings
pg_catalog_settings = PostgresCatalogSettings()
custom_sql_settings = CustomSQLSettings()


async def register_collection_catalog(
    app: FastAPI,
    catalog_settings: PostgresCatalogSettings,
) -> None:
    """Register Table catalog."""
    pg_collections = await pg_get_collection_index(
        connection_pool=app.state.pool,
        settings=catalog_settings,
    )

    app.state.collection_catalog = Catalog(
        collections={col.id: col for col in [*pg_collections]},
        last_updated=datetime.datetime.now(),
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    # Create Connection Pool
    await connect_to_db(
        app,
        schemas=pg_catalog_settings.schemas,
        tipg_schema=pg_catalog_settings.tipg_schema,
        user_sql_files=custom_sql_settings.sql_files,
    )

    # Register Collection Catalog
    await register_collection_catalog(
        app,
        catalog_settings=pg_catalog_settings,
    )

    yield

    # Close the Connection Pool
    await close_db_connection(app)


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

# custom template directory
templates_location: list[Any] = (
    [jinja2.FileSystemLoader(settings.template_directory)]
    if settings.template_directory
    else []
)
# default template directory
templates_location.append(jinja2.PackageLoader(__package__, "templates"))

jinja2_env = jinja2.Environment(loader=jinja2.ChoiceLoader(templates_location))
templates = Jinja2Templates(env=jinja2_env)

ogc_api = Endpoints(
    title=settings.name,
    templates=templates,
    with_tiles_viewer=settings.add_tiles_viewer,
    extensions=[viewerExtension()],
)
app.include_router(ogc_api.router)


if settings.enable_metrics:
    from tipg.metrics import instrument_app

    instrument_app(app)

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

if settings.catalog_ttl:
    app.add_middleware(
        CatalogUpdateMiddleware,  # type: ignore[arg-type]
        func=register_collection_catalog,  # type: ignore[arg-type]
        ttl=settings.catalog_ttl,
        catalog_settings=pg_catalog_settings,
    )

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


if settings.debug:

    @app.get("/rawcatalog", tags=["debug"])
    async def raw_catalog(request: Request):
        """Return parsed catalog data for testing."""
        return request.app.state.collection_catalog

    @app.get("/refresh", tags=["debug"])
    async def refresh(request: Request):
        """Return parsed catalog data for testing."""
        await register_collection_catalog(
            request.app,
            catalog_settings=pg_catalog_settings,
        )
        return request.app.state.collection_catalog
