"""tipg app."""

from typing import Any, List, Optional

import jinja2

from tipg import __version__ as tipg_version
from tipg.db import close_db_connection, connect_to_db, register_collection_catalog
from tipg.dependencies import OutputType
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.factory import OGCFeaturesFactory, OGCTilesFactory, create_html_response
from tipg.middleware import CacheControlMiddleware
from tipg.model import Conformance, Landing, Link
from tipg.resources.enums import MediaType
from tipg.settings import APISettings, DatabaseSettings, PostgresSettings

from fastapi import Depends, FastAPI, Request
from fastapi.responses import ORJSONResponse

from starlette.middleware.cors import CORSMiddleware
from starlette.templating import Jinja2Templates
from starlette_cramjam.middleware import CompressionMiddleware

settings = APISettings()
postgres_settings = PostgresSettings()
db_settings = DatabaseSettings()


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
ogc_features = OGCFeaturesFactory(templates=templates)
app.include_router(ogc_features.router, tags=["OGC Features API"])

ogc_tiles = OGCTilesFactory(templates=templates)
app.include_router(ogc_tiles.router, tags=["OGC Tiles API"])


@app.get(
    "/conformance",
    response_model=Conformance,
    response_model_exclude_none=True,
    response_class=ORJSONResponse,
    responses={
        200: {
            "content": {
                MediaType.json.value: {},
                MediaType.html.value: {},
            }
        },
    },
)
def conformance(
    request: Request, output_type: Optional[MediaType] = Depends(OutputType)
):
    """Get conformance."""
    data = Conformance(
        conformsTo=[
            # OGC Common
            "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core",
            "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/landingPage",
            "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/collections",
            "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/simple-query",
            "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/json",
            "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/html",
            "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/oas30",
            *ogc_features.conforms_to,
            *ogc_tiles.conforms_to,
        ]
    )

    if output_type == MediaType.html:
        return create_html_response(
            request,
            data.json(exclude_none=True),
            templates=templates,
            template_name="conformance",
        )

    return data


@app.get(
    "/",
    response_model=Landing,
    response_model_exclude_none=True,
    response_class=ORJSONResponse,
    responses={
        200: {
            "content": {
                MediaType.json.value: {},
                MediaType.html.value: {},
            }
        },
    },
)
def landing(request: Request, output_type: Optional[MediaType] = Depends(OutputType)):
    """Get landing page."""
    data = Landing(
        title=settings.name,
        links=[
            Link(
                title="Landing Page",
                href=request.url_for("landing"),
                type=MediaType.json,
                rel="self",
            ),
            Link(
                title="the API definition (JSON)",
                href=request.url_for("openapi"),
                type=MediaType.openapi30_json,
                rel="service-desc",
            ),
            Link(
                title="the API documentation",
                href=request.url_for("swagger_ui_html"),
                type=MediaType.html,
                rel="service-doc",
            ),
            Link(
                title="Conformance",
                href=request.url_for("conformance"),
                type=MediaType.json,
                rel="conformance",
            ),
            Link(
                title="List of Collections",
                href=ogc_features.url_for(request, "collections"),
                type=MediaType.json,
                rel="data",
            ),
            Link(
                title="Collection metadata",
                href=ogc_features.url_for(
                    request,
                    "collection",
                    collectionId="{collectionId}",
                ),
                type=MediaType.json,
                rel="data",
            ),
            Link(
                title="Collection queryables",
                href=ogc_features.url_for(
                    request,
                    "queryables",
                    collectionId="{collectionId}",
                ),
                type=MediaType.schemajson,
                rel="queryables",
            ),
            Link(
                title="Collection Features",
                href=ogc_features.url_for(
                    request, "items", collectionId="{collectionId}"
                ),
                type=MediaType.geojson,
                rel="data",
            ),
            Link(
                title="Collection Vector Tiles",
                href=ogc_tiles.url_for(
                    request,
                    "tile",
                    collectionId="{collectionId}",
                    tileMatrix="{tileMatrix}",
                    tileCol="{tileCol}",
                    tileRow="{tileRow}",
                ),
                type=MediaType.mvt,
                rel="data",
            ),
            Link(
                title="Collection Feature",
                href=ogc_features.url_for(
                    request,
                    "item",
                    collectionId="{collectionId}",
                    itemId="{itemId}",
                ),
                type=MediaType.geojson,
                rel="data",
            ),
            Link(
                title="TileMatrixSets",
                href=ogc_tiles.url_for(
                    request,
                    "tilematrixsets",
                ),
                type=MediaType.json,
                rel="data",
            ),
            Link(
                title="TileMatrixSet",
                href=ogc_tiles.url_for(
                    request,
                    "tilematrixset",
                    tileMatrixSetId="{tileMatrixSetId}",
                ),
                type=MediaType.json,
                rel="data",
            ),
        ],
    )

    if output_type == MediaType.html:
        return create_html_response(
            request,
            data.json(exclude_none=True),
            templates=templates,
            template_name="landing",
        )

    return data


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
    await register_collection_catalog(
        app,
        schemas=db_settings.schemas,
        exclude_schemas=db_settings.exclude_schemas,
        tables=db_settings.tables,
        exclude_tables=db_settings.exclude_tables,
        function_schemas=db_settings.function_schemas,
        exclude_function_schemas=db_settings.exclude_function_schemas,
        functions=db_settings.functions,
        exclude_functions=db_settings.exclude_functions,
        spatial=db_settings.only_spatial_tables,
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

    @app.get("/rawcatalog", tags=["debug"])
    async def raw_catalog(request: Request):
        """Return parsed catalog data for testing."""
        return request.app.state.collection_catalog

    @app.get("/refresh", tags=["debug"])
    async def refresh(request: Request):
        """Return parsed catalog data for testing."""
        await startup_event()
        return request.app.state.collection_catalog
