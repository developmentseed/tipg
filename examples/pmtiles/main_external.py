"""tipg app with PMTiles backend.

uv run --group server uvicorn main_external:app

http://127.0.0.1:8000/collections/external/items?url=https://data.source.coop/vida/google-microsoft-osm-open-buildings/geoparquet/by_country/country_iso=FRA/FRA.parquet

"""

import datetime
from contextlib import asynccontextmanager
from typing import Annotated, cast

from fastapi import FastAPI, HTTPException, Path, Query, Request
from starlette.middleware.cors import CORSMiddleware
from starlette_cramjam.middleware import CompressionMiddleware

from tipg import __version__ as tipg_version
from tipg.collections import Catalog
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.extensions.viewer import viewerExtension
from tipg.factory import Endpoints
from tipg.middleware import CacheControlMiddleware
from tipg.openapi import _update_openapi
from tipg.pmtiles import (
    PMTilesCatalogSettings,
    PMTilesCollection,
    pmtiles_get_collection_index,
)
from tipg.settings import APISettings

settings = APISettings()


ALLOWED_SCHEMES = ("http://", "https://", "s3://")


async def CollectionParams(
    request: Request,
    collectionId: Annotated[str, Path(description="Collection identifier")],
    url: Annotated[str, Query(description="URL of the PMTiles dataset")],
) -> PMTilesCollection:
    """Return Layer Object."""
    if collectionId != "external":
        raise HTTPException(404, f"Collection '{collectionId}' not found.")

    # Don't let users read local files (`/etc/...`, `file://`) or arbitrary formats
    if not url.startswith(ALLOWED_SCHEMES) or not url.lower().endswith((".pmtiles")):
        raise HTTPException(422, "`url` must be a remote (geo)parquet file.")

    cache: dict[str, PMTilesCollection] = request.app.state.collection_catalog
    if collection := cache.get(url):
        return collection

    collections = await pmtiles_get_collection_index(
        settings=PMTilesCatalogSettings(sources={"external": url})
    )
    if not collections:
        raise HTTPException(422, f"No spatial collection found in {url}.")

    # expose it as `external` so links point back to `/collections/external/...`
    collection = cast(
        PMTilesCollection, collections[0].model_copy(update={"id": collectionId})
    )
    cache[url] = collection
    return collection


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    app.state.collection_catalog = Catalog(
        collections={}, last_updated=datetime.datetime.now()
    )
    yield


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
    collection_dependency=CollectionParams,  # type: ignore
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

# NOTE: PMTiles vector tiles should not be compressed by the middleware
app.add_middleware(
    CompressionMiddleware,
    compression_level=6,
    exclude_mediatype={"application/vnd.mapbox-vector-tile", "application/x-protobuf"},
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
