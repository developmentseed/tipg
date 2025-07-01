"""tipg app."""

from contextlib import asynccontextmanager
from typing import Any, List

import jinja2

from tipg import __version__ as tipg_version
from tipg.collections import register_collection_catalog
from tipg.database import close_db_connection, connect_to_db
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.factory import Endpoints
from tipg.middleware import CacheControlMiddleware, CatalogUpdateMiddleware
from tipg.openapi import _update_openapi
from tipg.settings import APISettings, CustomSQLSettings, DatabaseSettings

from fastapi import FastAPI, Request

from starlette.middleware.cors import CORSMiddleware
from starlette.templating import Jinja2Templates
from starlette_cramjam.middleware import CompressionMiddleware

settings = APISettings()
db_settings = DatabaseSettings()
custom_sql_settings = CustomSQLSettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    # Create Connection Pool
    await connect_to_db(
        app,
        schemas=db_settings.schemas,
        tipg_schema=db_settings.tipg_schema,
        user_sql_files=custom_sql_settings.sql_files,
    )

    # Register Collection Catalog
    await register_collection_catalog(app, db_settings=db_settings)

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
templates_location: List[Any] = (
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

app.add_middleware(CacheControlMiddleware, cachecontrol=settings.cachecontrol)
app.add_middleware(CompressionMiddleware, compression_level=6)

if settings.catalog_ttl:
    app.add_middleware(
        CatalogUpdateMiddleware,
        func=register_collection_catalog,
        ttl=settings.catalog_ttl,
        db_settings=db_settings,
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
            db_settings=db_settings,
        )
        return request.app.state.collection_catalog
