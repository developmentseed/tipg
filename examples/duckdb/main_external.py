"""tipg app with DuckDB backend.

uv run --group server uvicorn main_external:app

http://127.0.0.1:8000/collections/external/items?url=https://data.source.coop/vida/google-microsoft-osm-open-buildings/geoparquet/by_country/country_iso=FRA/FRA.parquet

"""

import datetime
import hashlib
from contextlib import asynccontextmanager
from typing import Annotated, cast

import duckdb
from fastapi import FastAPI, HTTPException, Path, Query, Request
from starlette.concurrency import run_in_threadpool
from starlette.middleware.cors import CORSMiddleware
from starlette_cramjam.middleware import CompressionMiddleware

from tipg import __version__ as tipg_version
from tipg.collections import Catalog
from tipg.duck import (
    DuckDBCatalogSettings,
    DuckDBSettings,
    close_duckdb_connection,
    connect_to_duckdb,
    duck_get_collection_index,
)
from tipg.duck.collections import DuckCollection
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.extensions.viewer import viewerExtension
from tipg.factory import Endpoints
from tipg.middleware import CacheControlMiddleware
from tipg.openapi import _update_openapi
from tipg.settings import APISettings

settings = APISettings()

duckdb_catalog_settings = DuckDBCatalogSettings()


ALLOWED_SCHEMES = ("http://", "https://", "s3://")


def _quote_literal(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


async def CollectionParams(
    request: Request,
    collectionId: Annotated[str, Path(description="Collection identifier")],
    url: Annotated[str, Query(description="URL of the Geoparquet dataset")],
) -> DuckCollection:
    """Return Layer Object."""
    if collectionId != "external":
        raise HTTPException(404, f"Collection '{collectionId}' not found.")

    # Don't let users read local files (`/etc/...`, `file://`) or arbitrary formats
    if not url.startswith(ALLOWED_SCHEMES) or not url.lower().endswith(
        (".parquet", ".geoparquet")
    ):
        raise HTTPException(422, "`url` must be a remote (geo)parquet file.")

    cache: dict[str, DuckCollection] = request.app.state.external_collections
    if collection := cache.get(url):
        return collection

    # dynamically create DuckCollection based on the URL:
    # 1. register the file as a view in the in-memory database
    # 2. let tipg's catalog builder introspect that single view
    name = "ext_" + hashlib.sha256(url.encode()).hexdigest()[:16]
    conn = request.app.state.duckdb_connection
    view = f'CREATE OR REPLACE VIEW memory.main."{name}" AS SELECT * FROM read_parquet({_quote_literal(url)}'
    try:
        try:
            # file row number as stable feature id (same as tipg's `sources`)
            await run_in_threadpool(conn.execute, f"{view}, file_row_number = true)")
        except duckdb.BinderException:
            await run_in_threadpool(conn.execute, f"{view})")
    except duckdb.Error as e:
        raise HTTPException(422, f"Could not read {url}: {e}") from e

    collections = await duck_get_collection_index(
        connection=conn,
        settings=duckdb_catalog_settings.model_copy(
            update={"schemas": ["main"], "tables": [f"main.{name}"]}
        ),
    )
    if not collections:
        raise HTTPException(422, f"No spatial collection found in {url}.")

    # expose it as `external` so links point back to `/collections/external/...`
    collection = cast(
        DuckCollection, collections[0].model_copy(update={"id": collectionId})
    )
    cache[url] = collection
    return collection


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    # Create Connection Pool
    await connect_to_duckdb(app, settings=DuckDBSettings(database=None, sources={}))

    # cache of url -> DuckCollection
    app.state.external_collections = {}
    # empty catalog so `/collections` doesn't error
    app.state.collection_catalog = Catalog(
        collections={}, last_updated=datetime.datetime.now()
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
