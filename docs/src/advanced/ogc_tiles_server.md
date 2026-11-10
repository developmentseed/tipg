
`TiPg` default application comes with both OGC Tiles and Features endpoints but some users might just want one or the other. `TiPg` is built around the notion of endpoints [factories](/tipg/user_guide/factories/) which then makes *easy* to build custom applications with the desired set of endpoints.

The code below shows how to create a simple OGC Vector tiles service.

```python
"""OGC Vector Tiles service."""

import datetime
from contextlib import asynccontextmanager

import jinja2

from tipg.collections import Catalog
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.factory import OGCTilesFactory
from tipg.middleware import CacheControlMiddleware, CatalogUpdateMiddleware
from tipg.pg import (
    CustomSQLSettings,
    PostgresCatalogSettings,
    PostgresSettings,
    close_db_connection,
    connect_to_db,
    pg_get_collection_index,
)

from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware
from starlette.templating import Jinja2Templates
from starlette_cramjam.middleware import CompressionMiddleware

postgres_settings = PostgresSettings()
postgres_catalog_settings = PostgresCatalogSettings()
custom_sql_settings = CustomSQLSettings()


async def register_collection_catalog(
    app: FastAPI,
    catalog_settings: PostgresCatalogSettings | None = None,
) -> None:
    """Register Collection catalog."""
    collections = await pg_get_collection_index(
        connection_pool=app.state.pool,
        settings=catalog_settings,
    )

    app.state.collection_catalog = Catalog(
        collections={col.id: col for col in collections},
        last_updated=datetime.datetime.now(),
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    # Create Connection Pool
    await connect_to_db(
        app,
        settings=postgres_settings,
        schemas=postgres_catalog_settings.schemas,
        user_sql_files=custom_sql_settings.sql_files,
    )

    # Register Collection Catalog
    await register_collection_catalog(
        app,
        catalog_settings=postgres_catalog_settings,
    )

    yield

    # Close the Connection Pool
    await close_db_connection(app)


app = FastAPI(
    title="TiPG Vector Tiles Server",
    openapi_url="/api",
    docs_url="/api.html",
    lifespan=lifespan,
)

templates = Jinja2Templates(
    env=jinja2.Environment(
        loader=jinja2.ChoiceLoader([jinja2.PackageLoader("tipg", "templates")])
    )
)

ogc_tiles = OGCTilesFactory(
    title="TiPG Vector Tiles Server",
    templates=templates,
    with_common=True,
    with_viewer=True,
)
app.include_router(ogc_tiles.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)
app.add_middleware(CacheControlMiddleware, cachecontrol="public, max-age=3600")
app.add_middleware(CompressionMiddleware)
app.add_middleware(
    CatalogUpdateMiddleware,
    func=register_collection_catalog,
    ttl=300,
    catalog_settings=postgres_catalog_settings,
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
```
