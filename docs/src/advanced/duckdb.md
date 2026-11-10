
`TiPg` can serve tables, views and files (GeoParquet, or any format supported by DuckDB's `ST_Read`) through [DuckDB](https://duckdb.org) and its [spatial extension](https://duckdb.org/docs/extensions/spatial/overview), alongside or instead of PostgreSQL/PostGIS.

!!! note

    The DuckDB backend is not used by the default `tipg.main:app` application: you need to create your own application (see examples below).

### Install

```bash
python -m pip install "tipg[duckdb]"
```

### Settings

`tipg.duck.DuckDBSettings` (connection) and `tipg.duck.DuckDBCatalogSettings` (catalog) can be set with `TIPG_DUCKDB_` prefixed environment variables.

| Setting | Env | Default | Description |
| ------- | --- | ------- | ----------- |
| `database` | `TIPG_DUCKDB_DATABASE` | | Path or URL to a DuckDB database file, attached under its file name (without extension). If not set, only `sources` are served |
| `read_only` | `TIPG_DUCKDB_READ_ONLY` | `True` | Attach the database file in read-only mode |
| `threads` | `TIPG_DUCKDB_THREADS` | | Number of threads DuckDB can use |
| `memory_limit` | `TIPG_DUCKDB_MEMORY_LIMIT` | | Maximum memory DuckDB can use (e.g `4GB`) |
| `sources` | `TIPG_DUCKDB_SOURCES` | `{}` | Mapping of name to file path/glob/URL (e.g `'{"countries": "data/countries.parquet"}'`). Parquet files are read with `read_parquet`, other formats with `ST_Read` |
| `schemas` | `TIPG_DUCKDB_SCHEMAS` | `["main"]` | Schemas to look for tables/views in |
| `tables` | `TIPG_DUCKDB_TABLES` | | Only expose those tables (`schema.table`) |
| `exclude_tables` | `TIPG_DUCKDB_EXCLUDE_TABLES` | | Tables (`schema.table`) to exclude |
| `only_spatial_tables` | `TIPG_DUCKDB_ONLY_SPATIAL_TABLES` | `True` | Only expose tables/views with a geometry column |
| `spatial_extent` | `TIPG_DUCKDB_SPATIAL_EXTENT` | `True` | Compute the spatial extent of each collection |
| `datetime_extent` | `TIPG_DUCKDB_DATETIME_EXTENT` | `True` | Compute the temporal extent of each collection |

Table level configuration (`TIPG_TABLE_CONFIG__...`, fallback key names, column sorting) is shared with the PostgreSQL backend (see [Configuration](../user_guide/configuration.md)).

Collections are identified by `{schema}.{table}`; file `sources` are registered as views in the in-memory `main` schema, so a `countries` source is exposed as the `main.countries` collection.

### DuckDB application

```python
"""TiPg DuckDB application."""

import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI

from tipg.collections import Catalog
from tipg.duck import (
    DuckDBCatalogSettings,
    DuckDBSettings,
    close_db_connection,
    connect_to_db,
    duck_get_collection_index,
)
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.factory import Endpoints
from tipg.middleware import CatalogUpdateMiddleware

duckdb_settings = DuckDBSettings()
catalog_settings = DuckDBCatalogSettings()


async def register_collection_catalog(app: FastAPI) -> None:
    """Register Collection catalog."""
    collections = await duck_get_collection_index(
        app.state.duckdb_connection,
        catalog_settings,
    )
    app.state.collection_catalog = Catalog(
        collections={col.id: col for col in collections},
        last_updated=datetime.datetime.now(),
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    await connect_to_db(app, settings=duckdb_settings)
    await register_collection_catalog(app)
    yield
    await close_db_connection(app)


app = FastAPI(title="TiPg DuckDB", lifespan=lifespan)

ogc_api = Endpoints(title="TiPg DuckDB")
app.include_router(ogc_api.router)

app.add_middleware(CatalogUpdateMiddleware, func=register_collection_catalog, ttl=300)

add_exception_handlers(app, DEFAULT_STATUS_CODES)
```

```bash
TIPG_DUCKDB_DATABASE=data.duckdb \
TIPG_DUCKDB_SOURCES='{"countries": "countries.parquet"}' \
uvicorn app:app --port 8000
```

### PostgreSQL and DuckDB in a single application

Each collection carries its own connection (`PgCollection.connection_pool`, `DuckCollection.connection`), so collections from both backends can be served by the same endpoints. Merge the collections from both backends in your `register_collection_catalog` function:

```python
"""TiPg PostgreSQL + DuckDB application."""

import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI

from tipg import duck, pg
from tipg.collections import Catalog
from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from tipg.factory import Endpoints

db_settings = pg.DatabaseSettings()


async def register_collection_catalog(app: FastAPI) -> None:
    """Register Collection catalog."""
    async with app.state.pool.acquire() as conn:
        pg_collections = await pg.pg_get_collection_index(
            conn,
            settings=db_settings,
            connection_pool=app.state.pool,
        )

    duck_collections = await duck.duck_get_collection_index(app.state.duckdb_connection)

    # NOTE: collections are identified by `{schema}.{table}`, make sure
    # both backends don't expose the same ids.
    app.state.collection_catalog = Catalog(
        collections={col.id: col for col in [*pg_collections, *duck_collections]},
        last_updated=datetime.datetime.now(),
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    await pg.connect_to_db(
        app,
        schemas=db_settings.schemas,
        tipg_schema=db_settings.tipg_schema,
        settings=pg.PostgresSettings(),
    )
    await duck.connect_to_db(app, settings=duck.DuckDBSettings())
    await register_collection_catalog(app)
    yield
    await duck.close_db_connection(app)
    await pg.close_db_connection(app)


app = FastAPI(title="TiPg", lifespan=lifespan)
app.include_router(Endpoints(title="TiPg").router)
add_exception_handlers(app, DEFAULT_STATUS_CODES)
```

### Differences with the PostgreSQL backend

- **CRS**: the SRID of a geometry column is read from its type (e.g `GEOMETRY('EPSG:26915')`). Columns without CRS (plain `GEOMETRY`) or in `OGC:CRS84` are assumed to be in `EPSG:4326`.
- **Spatial extent**: computed with a full scan of the geometry column (DuckDB has no equivalent of PostGIS' `ST_EstimatedExtent`). Set `TIPG_DUCKDB_SPATIAL_EXTENT=FALSE` for large datasets.
- **Vector tiles**: `ST_AsMVT` only supports boolean, integer, float and string properties; `DECIMAL` values are cast to `DOUBLE` and other types (dates, timestamps, lists, ...) to `VARCHAR`.
- **Functions**: SQL function layers are not supported.
- **WKT output** (CSV, (nd)json): DuckDB's `ST_AsText` formatting (e.g `SRID=4326;POINT (1 2)`).
