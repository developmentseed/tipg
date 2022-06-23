

`TiFeatures` and [`TiMVT`](https://github.com/developmentseed/timvt) share a lot of in common and it's possible to create a unique FastAPI application with both **Features** and **MVT** endpoints:

```python
"""Features and MVT app."""

from tifeatures.db import close_db_connection, connect_to_db, register_table_catalog
from tifeatures.factory import Endpoints
from timvt.factory import VectorTilerFactory
from fastapi import FastAPI
from starlette_cramjam.middleware import CompressionMiddleware

app = FastAPI(
    title="Features and MVT",
    openapi_url="/api",
    docs_url="/api.html",
)

# Register endpoints.
endpoints = Endpoints()
app.include_router(endpoints.router, tags=["Features"])

# By default the VectorTilerFactory will only create tiles/ and tilejson.json endpoints
mvt_endpoints = VectorTilerFactory()
app.include_router(mvt_endpoints.router)

app.add_middleware(CompressionMiddleware)


@app.on_event("startup")
async def startup_event() -> None:
    """Connect to database on startup."""
    await connect_to_db(app)
    # TiMVT and TiFeatures share the same `Table_catalog` format
    # see https://github.com/developmentseed/timvt/pull/83
    await register_table_catalog(app)


@app.on_event("shutdown")
async def shutdown_event() -> None:
    """Close database connection."""
    await close_db_connection(app)
```

!!! Note
    To run the example, copy the code to a file main.py, and start uvicorn with:

    `uvicorn main:app --reload`


![](https://user-images.githubusercontent.com/10407788/175392407-d8cf4fec-497c-42a7-ae8f-d754962bf1e7.png)
