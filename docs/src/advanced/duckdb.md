
`TiPg` can serve tables, views and files (GeoParquet, or any format supported by DuckDB's `ST_Read`) through [DuckDB](https://duckdb.org) and its [spatial extension](https://duckdb.org/docs/extensions/spatial/overview), alongside or instead of PostgreSQL/PostGIS.

!!! note

    The DuckDB backend is not used by the default `tipg.main:app` application: you need to create your own application (see examples below).

### Install

```bash
python -m pip install "tipg[duckdb]"
```

The DuckDB backend requires `duckdb>=2.0` (CRS aware `GEOMETRY` type).

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
| `query_timeout` | `TIPG_DUCKDB_QUERY_TIMEOUT` | | Maximum duration (in seconds) of items and tiles queries. Longer queries are interrupted and return a `504 Gateway Timeout` error. No timeout when not set |

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
- **Spatial filters**: DuckDB has no spatial index on parquet files. When a GeoParquet (1.1+) source declares a [bbox covering](https://geoparquet.org/releases/v1.1.0/#bbox-covering-encoding) column, spatial filters (`bbox`, tile envelope, and cql2 spatial predicates in the top-level `AND` of the filter) also filter the covering columns, so DuckDB can skip the row groups outside of the filter using their statistics. Without covering, spatial filters scan the whole geometry column. Parquet sources whose covering doesn't match the file (e.g. pointing to missing struct fields) are not added to the catalog (a warning is logged). See [Data layout and performance](#data-layout-and-performance).
- **Parquet metadata cache**: parquet files metadata (footers) are cached in memory (`parquet_metadata_cache`), so they are only fetched once per file.
- **`numberMatched`**: only returned for requests without filter (DuckDB answers `COUNT(*)` from metadata), counting the features matching a filter would need a full scan.
- **Vector tiles**: `ST_AsMVT` only supports boolean, integer, float and string properties; `DECIMAL` values are cast to `DOUBLE` and other types (dates, timestamps, lists, ...) to `VARCHAR`.
- **Functions**: SQL function layers are not supported.
- **WKT output** (CSV, (nd)json): DuckDB's `ST_AsText` formatting (e.g `SRID=4326;POINT (1 2)`).

### Data layout and performance

DuckDB has no spatial index: for a `bbox` filter or a tile, it can only skip the data whose row group statistics show that it's outside of the requested area. How the data is laid out (sorted, grouped, with or without bbox columns) has a much bigger impact on performance than anything in `TiPg`'s configuration, especially for remote files where every row group read is an HTTP request.

For example, a 2.3M polygons GeoParquet file (~870 MB) served from a remote URL:

| Layout | Data read for one tile | Time |
| ------ | ---------------------- | ---- |
| Rows not sorted (every row group covers the whole dataset extent) | ~870 MB (whole file, 463 HTTP requests) | ~16s |
| Bbox filter on row groups which don't overlap the tile | ~0.6 MB (file footer only, 2 HTTP requests) | ~2s |

Row groups can only be skipped when:

1. **the rows are spatially sorted**: features close to each other are stored in the same row groups, so each row group covers a small area. With unsorted rows, every row group covers (almost) the whole dataset extent and overlaps every tile.
2. **DuckDB has statistics to compare with the filter**: a [bbox covering](https://geoparquet.org/releases/v1.1.0/#bbox-covering-encoding) column for GeoParquet files, or the geometry column statistics for DuckDB tables.

#### Recommended: DuckDB tables

For data served often (or from slow remote storage), copy it into a DuckDB database file, sorted along a [Hilbert curve](https://en.wikipedia.org/wiki/Hilbert_curve). DuckDB keeps bounding box statistics of `GEOMETRY` columns for each row group of a table, so no bbox column is needed:

```sql
INSTALL spatial;
LOAD spatial;

CREATE TABLE parcels_raw AS SELECT * FROM read_parquet('https://example.com/parcels.parquet');

CREATE TABLE parcels AS
SELECT * FROM parcels_raw
ORDER BY ST_Hilbert(geometry, (SELECT ST_Extent(ST_Extent_Agg(geometry)) FROM parcels_raw));

DROP TABLE parcels_raw;
```

```bash
TIPG_DUCKDB_DATABASE=parcels.duckdb uvicorn app:app --port 8000
```

!!! note

    Tables are not scanned to build the catalog: collections from DuckDB tables have no spatial extent (see [Differences with the PostgreSQL backend](#differences-with-the-postgresql-backend)).

#### GeoParquet files

For parquet `sources`, write [GeoParquet 1.1](https://geoparquet.org/releases/v1.1.0/) files with:

- **spatially sorted rows** (Hilbert curve, or sorted by bounding box)
- **a bbox covering column**, which follows the specification (a struct column with `xmin`, `ymin`, `xmax` and `ymax` fields, declared in the `covering` of the `geo` metadata). Sources with a covering which doesn't match the file are not served.
- **row groups of 50 000 to 100 000 rows**: smaller row groups mean more HTTP requests, bigger ones more data read outside of the requested area.

With DuckDB (Hilbert sort) and [GDAL](https://gdal.org/en/stable/drivers/vector/parquet.html) (>= 3.9, bbox covering):

```sql
-- DuckDB
COPY (
    SELECT * FROM 'parcels.parquet'
    ORDER BY ST_Hilbert(geometry, (SELECT ST_Extent(ST_Extent_Agg(geometry)) FROM 'parcels.parquet'))
) TO 'parcels_hilbert.parquet' (FORMAT parquet);
```

```bash
# GDAL keeps the rows order
ogr2ogr -f Parquet parcels_sorted.parquet parcels_hilbert.parquet \
  -lco WRITE_COVERING_BBOX=YES \
  -lco ROW_GROUP_SIZE=65536
```

!!! note

    GDAL can also sort the features with `-lco SORT_BY_BBOX=YES`, but in our tests the Hilbert curve sort gave a better spatial grouping: for a tile covering ~1% of a dataset of 1M random points (16 row groups), 1 row group was read with the Hilbert sort and 5 with `SORT_BY_BBOX`.

With [GeoPandas](https://geopandas.org/en/stable/docs/reference/api/geopandas.GeoDataFrame.to_parquet.html):

```python
import geopandas

gdf = geopandas.read_parquet("parcels.parquet")
gdf = gdf.iloc[gdf.hilbert_distance().argsort()]
gdf.to_parquet("parcels_sorted.parquet", write_covering_bbox=True, row_group_size=65536)
```

!!! warning

    DuckDB's `COPY ... TO` doesn't write the bbox `covering` metadata, and adding it with `KV_METADATA` results in two `geo` metadata entries in the file. Use DuckDB to sort the data, but GDAL or GeoPandas to write the final GeoParquet file with a bbox covering.

    DuckDB can write the native Parquet `GEOMETRY` type, with bounding box statistics (`GEOPARQUET_VERSION 'V2'`), but those statistics are not used when the file is read through a view, which is how `TiPg` registers parquet `sources`.

#### Low zoom levels

A good layout only helps when a tile covers a small part of the dataset: a tile at zoom level 5 over the whole dataset still reads every row group, and only returns the first `TIPG_MAX_FEATURES_PER_TILE` features. For large datasets, only request tiles at higher zoom levels (e.g with the `minZoom` option of your map library's source).

Set `TIPG_DUCKDB_QUERY_TIMEOUT` (e.g `10`) so a single expensive request (a low zoom tile, an items request with a filter on a large dataset) can't keep a worker busy for minutes: the query is interrupted and the request returns a `504 Gateway Timeout` error.
