"""tifeatures app."""

from tifeatures import __version__ as tifeatures_version
from tifeatures.db import close_db_connection, connect_to_db, register_table_catalog
from tifeatures.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tifeatures.factory import Endpoints
from tifeatures.layer import FunctionRegistry
from tifeatures.middleware import CacheControlMiddleware
from tifeatures.settings import APISettings

from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware
from starlette_cramjam.middleware import CompressionMiddleware

settings = APISettings()

app = FastAPI(
    title=settings.name,
    version=tifeatures_version,
    openapi_url="/api",
    docs_url="/api.html",
)

# Register endpoints.
endpoints = Endpoints()
app.include_router(endpoints.router)

# We add the function registry to the application state
app.state.function_catalog = FunctionRegistry()

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
    await connect_to_db(app)
    await register_table_catalog(app)


@app.on_event("shutdown")
async def shutdown_event() -> None:
    """Close database connection."""
    await close_db_connection(app)


@app.get("/healthz", description="Health Check", tags=["Health Check"])
def ping():
    """Health check."""
    return {"ping": "pong!"}
