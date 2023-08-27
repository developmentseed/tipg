"""tipg app."""

import asyncio
from contextlib import asynccontextmanager
from typing import Any, List

import jinja2

from tipg import __version__ as tipg_version
from tipg.collections import register_collection_catalog
from tipg.database import close_db_connection, connect_to_db
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.factory import Endpoints
from tipg.middleware import CacheControlMiddleware, CatalogUpdateMiddleware, HostHeaderLoggingMiddleware
from tipg.settings import (
    APISettings,
    CustomSQLSettings,
    DatabaseSettings,
    PostgresSettings,
    HostToSchemaLookupSettings,
)

from fastapi import FastAPI, Request

from starlette.middleware.cors import CORSMiddleware
from starlette.templating import Jinja2Templates
from starlette_cramjam.middleware import CompressionMiddleware

settings = APISettings()
postgres_settings = PostgresSettings()
db_settings = DatabaseSettings()
custom_sql_settings = CustomSQLSettings()
host_to_schema_settings = HostToSchemaLookupSettings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    # Create Connection Pool
    await connect_to_db(
        app,
        settings=postgres_settings,
        schemas=db_settings.schemas,
        user_sql_files=custom_sql_settings.sql_files,
    )

    # Register Collection Catalog
    if host_to_schema_settings.enabled:
        await asyncio.gather(*(
            register_collection_catalog(
                app,
                host=host,
                schemas=schemas_map["include"],
                tables=db_settings.tables,
                exclude_tables=db_settings.exclude_tables,
                exclude_table_schemas=schemas_map["exclude"],
                functions=db_settings.functions,
                exclude_functions=db_settings.exclude_functions,
                exclude_function_schemas=db_settings.exclude_function_schemas,
                spatial=db_settings.only_spatial_tables,
            ) for host, schemas_map in host_to_schema_settings.mapping.items()
        ))
    else:
        await register_collection_catalog(
            app,
            schemas=db_settings.schemas,
            tables=db_settings.tables,
            exclude_tables=db_settings.exclude_tables,
            exclude_table_schemas=db_settings.exclude_table_schemas,
            functions=db_settings.functions,
            exclude_functions=db_settings.exclude_functions,
            exclude_function_schemas=db_settings.exclude_function_schemas,
            spatial=db_settings.only_spatial_tables,
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
app.add_middleware(CompressionMiddleware)
app.add_middleware(HostHeaderLoggingMiddleware)

if settings.catalog_ttl:
    app.add_middleware(
        CatalogUpdateMiddleware,
        func=register_collection_catalog,
        ttl=settings.catalog_ttl,
        schemas=db_settings.schemas,
        tables=db_settings.tables,
        exclude_tables=db_settings.exclude_tables,
        exclude_table_schemas=db_settings.exclude_table_schemas,
        functions=db_settings.functions,
        exclude_functions=db_settings.exclude_functions,
        exclude_function_schemas=db_settings.exclude_function_schemas,
        spatial=db_settings.only_spatial_tables,
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
    # TODO: plumb through `host_to_schema_settings.enabled` logic

    @app.get("/rawcatalog", tags=["debug"])
    async def raw_catalog(request: Request):
        """Return parsed catalog data for testing."""
        return getattr(request.app.state, 'collection_catalog', None)

    @app.get("/refresh", tags=["debug"])
    async def refresh(request: Request):
        """Return parsed catalog data for testing."""
        await register_collection_catalog(
            request.app,
            schemas=db_settings.schemas,
            tables=db_settings.tables,
            exclude_tables=db_settings.exclude_tables,
            exclude_table_schemas=db_settings.exclude_table_schemas,
            functions=db_settings.functions,
            exclude_functions=db_settings.exclude_functions,
            exclude_function_schemas=db_settings.exclude_function_schemas,
            spatial=db_settings.only_spatial_tables,
        )
        return getattr(request.app.state, 'collection_catalog', None)
