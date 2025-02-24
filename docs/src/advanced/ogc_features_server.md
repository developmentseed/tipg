
`TiPg` default application comes with both OGC Tiles and Features endpoints but some users might just want one or the other. `TiPg` is built around the notion of endpoints [factories](/tipg/user_guide/factories/) which then makes *easy* to build custom applications with the desired set of endpoints.

The code below shows how to create a simple OGC Features service.

```python
"""OGC Features service."""

from contextlib import asynccontextmanager

import jinja2

from tipg.collections import register_collection_catalog
from tipg.database import close_db_connection, connect_to_db
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.factory import OGCFeaturesFactory
from tipg.middleware import CacheControlMiddleware, CatalogUpdateMiddleware
from tipg.settings import CustomSQLSettings, DatabaseSettings, PostgresSettings

from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware
from starlette.templating import Jinja2Templates
from starlette_cramjam.middleware import CompressionMiddleware

postgres_settings = PostgresSettings()
db_settings = DatabaseSettings()
custom_sql_settings = CustomSQLSettings()


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
    await register_collection_catalog(app, db_settings=db_settings)

    yield

    # Close the Connection Pool
    await close_db_connection(app)


app = FastAPI(
    title="TiPG Features Server",
    openapi_url="/api",
    docs_url="/api.html",
    lifespan=lifespan,
)

templates = Jinja2Templates(
    directory="",  # we need to set a dummy directory variable, see https://github.com/encode/starlette/issues/1214
    loader=jinja2.ChoiceLoader([jinja2.PackageLoader("tipg", "templates")]),
)  # type: ignore

ogc_features = OGCFeaturesFactory(
    title="TiPG Features Server",
    templates=templates,
    with_common=True,
)
app.include_router(ogc_features.router)

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

```
