"""tipg app with PMTiles backend, reading a remote PMTiles archive passed in the query.

uv run --group server --extra pmtiles uvicorn main_external:app

http://127.0.0.1:8000/collections/external/viewer.html?url=https://r2-public.protomaps.com/protomaps-sample-datasets/cb_2018_us_zcta510_500k.pmtiles
http://127.0.0.1:8000/collections/external/tiles/WebMercatorQuad/tilejson.json?url=https://r2-public.protomaps.com/protomaps-sample-datasets/cb_2018_us_zcta510_500k.pmtiles

WARNING: this app fetches any user-provided `http(s)://` or `s3://` URL from the server.
Do not expose it publicly without restricting the allowed hosts/buckets.

"""

from typing import Annotated, cast

from cache import AsyncLRU
from fastapi import FastAPI, HTTPException, Path, Query
from morecantile import TileMatrixSets
from morecantile import tms as default_tms
from starlette.middleware.cors import CORSMiddleware
from starlette_cramjam.middleware import CompressionMiddleware

from tipg import __version__ as tipg_version
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.extensions.viewer import viewerExtension
from tipg.factory import OGCTilesFactory
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

# PMTiles collections only support the WebMercatorQuad TMS
supported_tms = TileMatrixSets({"WebMercatorQuad": default_tms.get("WebMercatorQuad")})


@AsyncLRU(maxsize=128)
async def _load_collection(url: str) -> PMTilesCollection:
    """Open the PMTiles archive and create the collection (bounded LRU cache)."""
    collections = await pmtiles_get_collection_index(
        settings=PMTilesCatalogSettings(sources={"external": url})
    )
    if not collections:
        raise HTTPException(422, f"No vector tiles collection found in {url}.")

    return cast(PMTilesCollection, collections[0])


async def CollectionParams(
    collectionId: Annotated[str, Path(description="Collection identifier")],
    url: Annotated[str, Query(description="URL of the PMTiles archive")],
) -> PMTilesCollection:
    """Return Layer Object."""
    if collectionId != "external":
        raise HTTPException(404, f"Collection '{collectionId}' not found.")

    # Don't let users read local files (`/etc/...`, `file://`) or arbitrary formats
    if not url.startswith(ALLOWED_SCHEMES) or not url.lower().endswith(".pmtiles"):
        raise HTTPException(422, "`url` must be a remote PMTiles (.pmtiles) file.")

    return await _load_collection(url)


app = FastAPI(
    title=settings.name,
    version=tipg_version,
    openapi_url="/api",
    docs_url="/api.html",
    root_path=settings.root_path,
)

# Fix OpenAPI response header for OGC Common compatibility
_update_openapi(app)

# PMTiles collections only provide tiles (no features/items endpoints)
ogc_api = OGCTilesFactory(
    title=settings.name,
    supported_tms=supported_tms,
    with_viewer=False,
    extensions=[
        viewerExtension(),
    ],
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
