"""tipg app."""

from typing import Any, List

import jinja2

from tipg import __version__ as tipg_version
from tipg.db import close_db_connection, connect_to_db, register_table_catalog
from tipg.dbmodel import Table
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.factory import Endpoints
from tipg.middleware import CacheControlMiddleware
from tipg.settings import APISettings, PostgresSettings

from fastapi import FastAPI, Request

from starlette.middleware.cors import CORSMiddleware
from starlette.templating import Jinja2Templates
from starlette_cramjam.middleware import CompressionMiddleware

settings = APISettings()
postgres_settings = PostgresSettings()

app = FastAPI(
    title=settings.name,
    version=tipg_version,
    openapi_url="/api",
    docs_url="/api.html",
)

# custom template directory
templates_location: List[Any] = (
    [jinja2.FileSystemLoader(settings.template_directory)]
    if settings.template_directory
    else []
)
# default template directory
templates_location.append(jinja2.PackageLoader(__package__, "templates"))

templates = Jinja2Templates(
    directory="",  # we need to set a dummy directory variable, see https://github.com/encode/starlette/issues/1214
    loader=jinja2.ChoiceLoader(templates_location),
)  # type: ignore

# Register endpoints.
endpoints = Endpoints(title=settings.name, templates=templates)
app.include_router(endpoints.router, tags=["OGC API"])

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
app.add_middleware(CompressionMiddleware)
add_exception_handlers(app, DEFAULT_STATUS_CODES)


@app.on_event("startup")
async def startup_event() -> None:
    """Connect to database on startup."""
    await connect_to_db(app, settings=postgres_settings)
    await register_table_catalog(
        app,
        schemas=postgres_settings.db_schemas,
        tables=postgres_settings.db_tables,
        function_schemas=postgres_settings.db_function_schemas,
        functions=postgres_settings.db_functions,
        spatial=postgres_settings.only_spatial_tables,
    )


@app.on_event("shutdown")
async def shutdown_event() -> None:
    """Close database connection."""
    await close_db_connection(app)


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


if settings.DEBUG:

    @app.get("/rawcatalog")
    async def raw_catalog(request: Request):
        """Return parsed catalog data for testing."""
        await startup_event()
        ret = {}
        cat = request.app.state.table_catalog
        for k, v in cat.items():
            ret[k] = Table(**v)
        return ret
