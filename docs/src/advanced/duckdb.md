
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
| `database` | `TIPG_DUCKDB_DATABASE` | | Path or URL to a DuckDB database file, attached (read-only) under its file name (without extension). If not set, only `sources` are served |
| `threads` | `TIPG_DUCKDB_THREADS` | | Number of threads DuckDB can use |
| `memory_limit` | `TIPG_DUCKDB_MEMORY_LIMIT` | | Maximum memory DuckDB can use (e.g `4GB`) |
| `sources` | `TIPG_DUCKDB_SOURCES` | `{}` | Mapping of name to file path/glob/URL (e.g `'{"countries": "data/countries.parquet"}'`). Parquet files are read with `read_parquet`, other formats with `ST_Read` |
| `schemas` | `TIPG_DUCKDB_SCHEMAS` | `["main"]` | Schemas to look for tables/views in |
| `tables` | `TIPG_DUCKDB_TABLES` | | Only expose those tables (`schema.table`) |
| `exclude_tables` | `TIPG_DUCKDB_EXCLUDE_TABLES` | | Tables (`schema.table`) to exclude |
| `only_spatial_tables` | `TIPG_DUCKDB_ONLY_SPATIAL_TABLES` | `True` | Only expose tables/views with a geometry column |
| `spatial_extent` | `TIPG_DUCKDB_SPATIAL_EXTENT` | `True` | Read the spatial extent and geometry type of parquet sources from their GeoParquet metadata (file footers only). For a glob, every matched file's footer is read on each catalog refresh: disable it for sources matching many remote files |
| `metadata_threads` | `TIPG_DUCKDB_METADATA_THREADS` | `16` | Number of parquet sources whose metadata is read concurrently when building the catalog |

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
    close_duckdb_connection,
    connect_to_duckdb,
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
        connection=app.state.duckdb_connection,
        settings=catalog_settings,
    )
    app.state.collection_catalog = Catalog(
        collections={col.id: col for col in collections},
        last_updated=datetime.datetime.now(),
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan."""
    await connect_to_duckdb(app, settings=duckdb_settings)
    await register_collection_catalog(app)
    yield
    await close_duckdb_connection(app)


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

pg_catalog_settings = pg.PostgresCatalogSettings()


async def register_collection_catalog(app: FastAPI) -> None:
    """Register Collection catalog."""
    pg_collections = await pg.pg_get_collection_index(
        connection_pool=app.state.pool,
        settings=pg_catalog_settings,
    )

    duck_collections = await duck.duck_get_collection_index(
        connection=app.state.duckdb_connection,
    )

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
        schemas=pg_catalog_settings.schemas,
        tipg_schema=pg_catalog_settings.tipg_schema,
        settings=pg.PostgresSettings(),
    )
    await duck.connect_to_duckdb(app, settings=duck.DuckDBSettings())
    await register_collection_catalog(app)
    yield
    await duck.close_duckdb_connection(app)
    await pg.close_db_connection(app)


app = FastAPI(title="TiPg", lifespan=lifespan)
app.include_router(Endpoints(title="TiPg").router)
add_exception_handlers(app, DEFAULT_STATUS_CODES)
```

### Differences with the PostgreSQL backend

- **CRS**: the CRS of a geometry column is read from its type (e.g `GEOMETRY('EPSG:26915')`). Columns without CRS (plain `GEOMETRY`) or in `OGC:CRS84` are assumed to be in `EPSG:4326`. CRS without EPSG code (e.g PROJJSON from GeoParquet metadata, or `IGNF:LAMB93`) are supported: the CRS definition is used as is for reprojection (`Column.srid` is then a string), and the collection `crs` is the OGC URI of the CRS authority code (e.g `http://www.opengis.net/def/crs/IGNF/0/LAMB93`), or `None` when the CRS has no authority code. PROJJSON definitions of EPSG CRS are matched to their EPSG code.
- **Extents and geometry type**: tables and views are never scanned to build the catalog. The spatial extent and geometry type of parquet `sources` are read from their [GeoParquet](https://geoparquet.org) metadata (`bbox` and `geometry_types`, in the file footers). Other collections have no spatial extent and a generic `Geometry` type, and no collection has a temporal extent.
- **Items order**: without `sortby`, features are returned in their insertion order (no default sort on the primary key).
- **Feature ids**: single parquet file `sources` are read with `read_parquet(..., file_row_number = true)`, and the added `file_row_number` column (row position in the file, starting at 0) is used as id when the collection has no other id column (`TIPG_TABLE_CONFIG__..._pk` or fallback key names). Looking up a feature by id (`/items/{itemId}`) then only reads one row group. Other collections without primary key use the feature position in the response as `id`, and don't support `/items/{itemId}`.
- **Spatial filters**: DuckDB has no spatial index on parquet files. When a GeoParquet (1.1+) source declares a [bbox covering](https://geoparquet.org/releases/v1.1.0/#bbox-covering-encoding) column, spatial filters (`bbox`, tile envelope, and cql2 spatial predicates in the top-level `AND` of the filter) also filter the covering columns, so DuckDB can skip the row groups outside of the filter using their statistics. Without covering, spatial filters scan the whole geometry column.
- **Parquet metadata cache**: parquet files metadata (footers) are cached in memory (`parquet_metadata_cache`), so they are only fetched once per file.
- **`numberMatched`**: only returned for requests without filter (DuckDB answers `COUNT(*)` from metadata), counting the features matching a filter would need a full scan.
- **Vector tiles**: `ST_AsMVT` only supports boolean, integer, float and string properties; `DECIMAL` values are cast to `DOUBLE` and other types (dates, timestamps, lists, ...) to `VARCHAR`.
- **Functions**: SQL function layers are not supported.
- **WKT output** (CSV, (nd)json): DuckDB's `ST_AsText` formatting (e.g `SRID=4326;POINT (1 2)`).
