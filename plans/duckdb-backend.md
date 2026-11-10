# DuckDB backend for tipg (`tipg.duck`)

## Goal
Serve DuckDB tables/views and files (GeoParquet, `ST_Read`-able files) as OGC Features + Tiles collections, and allow mixing them with PostgreSQL collections in a single catalog.

Scope: DuckDB database file + file sources; features + MVT tiles; no app module (`tipg/main.py` untouched).

## DuckDB constraints the design relies on (DuckDB 2.0 + spatial)
- cql2 `to_sql()` output runs as-is (`= SOME(ARRAY[...])`, timestamp casts, `LIKE .. ESCAPE`, `st_intersects(.., st_geomfromgeojson(..))`).
- `ST_AsMVT(t, 'layer' ORDER BY ..)` / `ST_AsMVTGeom(geom, BOX_2D, extent, buffer, clip)` are available.
- Geometry columns carry their CRS in the type (`GEOMETRY('EPSG:26915')`, `GEOMETRY('OGC:CRS84')`, or plain `GEOMETRY`); `ST_CRS` / `ST_SetCRS` exist.
- Comparing geometries in different CRS silently returns no match → filter literals must be reprojected/tagged.
- `SET geometry_always_xy = true` is required for lon/lat axis order; `ST_Transform(g, 'EPSG:a', 'EPSG:b')` (or a PROJ string) then works positionally. Use `EPSG:4326` (not `OGC:CRS84`) as output CRS.
- `ST_AsGeoJSON` returns a JSON string; `ST_Extent_Agg` returns a GEOMETRY; no `ST_EstimatedExtent`.
- Primary keys via `duckdb_constraints()`.

To confirm at the start of implementation: MVT with TIMESTAMP/DATE/LIST/JSON/DECIMAL properties (cast to VARCHAR if unsupported), empty-tile result (NULL → `b""`), TIMESTAMPTZ values in Python with `SET TimeZone = 'UTC'`, TEMP views in `duckdb_views()` / `duckdb_columns()`, CRS reported by `ST_Read`, cql2 emission of `{"op": "st_transform", "args": [geom, "EPSG:4326", "EPSG:n"]}`.

## Changes

### Setup
- Rebase `feat/duckdb-backend` on `main`.
- `pyproject.toml`: `duckdb = ["duckdb>=1.4"]` optional extra; add `tipg[duckdb]` to the dev group; `uv sync`.

### `tipg/collections.py` — two overridable hooks (PG output unchanged)
`cql_where()` hard-codes PG constructs (`st_setsrid(polygon, srid)` in `_s_intersects_bbox`, `st_transform(literal, srid)` in `_transform_cql_geom_literals`). Route them through methods on `Collection` whose defaults keep today's PG output:
```python
def _tag_geometry_literal(self, geom: Any, srid: int) -> Any:       # default: st_setsrid(geom, srid)
def _reproject_geometry_literal(self, geom: Any, srid: int) -> Any:  # default: st_transform(geom, srid)
```
`DuckCollection` overrides with `st_setcrs(geom, 'EPSG:n')` and `st_transform(geom, 'EPSG:4326', 'EPSG:n')`.
Move `_quote_ident` from `tipg/pg/collections.py` to `tipg/collections.py` (same quoting rules in DuckDB).

### `tipg/duck/settings.py` (new)
- `DuckDBSettings` (`TIPG_DUCKDB_`): `database: str = ":memory:"`, `read_only: bool = True`, `threads: int | None`, `memory_limit: str | None`, `sources: dict[str, str] = {}` (collection id → path/glob; parquet via `read_parquet`, others via `ST_Read`).
- `DuckDBCatalogSettings` (`TIPG_DUCKDB_`): `schemas = ["main"]`, `tables`, `exclude_tables`, `only_spatial_tables = True`, `spatial_extent = True`, `datetime_extent = True`.

### `tipg/duck/database.py` (new)
- `connect_to_db(app, *, settings=None)`: `duckdb.connect(database, read_only)`, `INSTALL/LOAD spatial`, `SET geometry_always_xy = true`, `SET TimeZone = 'UTC'`, threads / memory_limit, register each source as `CREATE TEMP VIEW "<id>" AS SELECT * FROM ...`; store on `app.state.duckdb_connection`.
- `close_db_connection(app)`.

### `tipg/duck/collections.py` (new)
`DuckCollection(Collection)`:
- `connection: duckdb.DuckDBPyConnection = Field(exclude=True, repr=False)` (`arbitrary_types_allowed`), plus the fully qualified relation name (`"db"."schema"."table"`).
- `features()` / `get_tile()`: same signatures and validation as `PgCollection` (`InvalidGeometryColumnName`, `InvalidLimit`, sort-column check), same SQL-builder structure (`_select`, `_select_mvt`, `_from`, `_sort_expressions`, `_where_clause`). Queries run in `starlette.concurrency.run_in_threadpool` on a per-call `self.connection.cursor()` (closed after); count + page share the cursor.
- Geometry output: `ST_Transform(g, 'EPSG:<srid>', 'EPSG:4326')` when srid ≠ 4326; `ST_Envelope` for bbox-only; simplify = `ST_ReducePrecision(ST_SimplifyPreserveTopology(g, s), s)`; GeoJSON via `ST_AsGeoJSON` → `orjson.loads`; WKT = `'SRID=4326;' || ST_AsText(g)`; JSON-typed property values decoded with `orjson.loads`.
- Id: primary-key column, else `row_number() OVER ()`.
- MVT: inner `SELECT props, ST_AsMVTGeom(<transformed>, ST_Extent(ST_MakeEnvelope(<tile xy bounds>)), res, buffer, clip) AS geom ... WHERE .. ORDER BY .. LIMIT n`; outer `SELECT ST_AsMVT(t, $1 [ORDER BY ..]) FROM t`. Out-of-domain tiles clipped with `ST_Intersection(ST_MakeEnvelope(tms.bbox), ST_Transform(g, src, 'EPSG:<geo>'))` like PG; TMS CRS as `EPSG:n` or PROJ string; NULL tile → `b""`.
- No function collections: `type` is `Table` / `View`; `function_parameters` accepted and ignored.

`async duck_get_collection_index(connection, settings=None) -> list[Collection]` (blocking work in the threadpool):
- Tables/views of `current_database()` in `settings.schemas` (+ include/exclude filters), plus the TEMP source views. Ids: `schema.table`; sources use their key.
- Columns from `duckdb_columns()`, types normalized to the names `Column` already understands (`GEOMETRY*→geometry`, `TIMESTAMP→timestamp`, `TIMESTAMP WITH TIME ZONE→timestamptz`, `DATE→date`, integer types, `DOUBLE→float8`, `FLOAT→real`, `DECIMAL(..)→numeric`, `BOOLEAN→boolean`, `JSON→json`, `X[]→x[]`, else `text`) so `json_type`, `is_geometry`, `is_datetime` and `_coerce_id` work unchanged.
- Geometry: srid parsed from `GEOMETRY('EPSG:n')` (`OGC:CRS84` / no CRS → 4326); when `spatial_extent`, one scan per table for `ST_Extent_Agg` (→ 4326 if needed) and `min/max(ST_GeometryType)` (single type, else `"Geometry"`).
- Datetime extents (when `datetime_extent`): one `min/max` query per table covering all datetime columns, ISO strings matching PG output (naive timestamps as UTC, dates as midnight UTC).
- id / geometry / datetime column selection with `TableConfig` / `TableSettings` from `tipg.settings` (`fallback_key_names`, `sort_columns`, `table_config` keyed `<schema>_<table>`, sources keyed by id), same logic as `pg_get_collection_index`.
- `only_spatial_tables` filter.

### `tipg/duck/__init__.py`
Export `connect_to_db`, `close_db_connection`, `duck_get_collection_index`, `DuckCollection`, `DuckDBSettings`, `DuckDBCatalogSettings`.

### Docs / changelog
- `docs/src/api/tipg/duck/{collections,database,settings}.md` + mkdocs nav.
- User-guide page: a DuckDB-only app and a mixed PG + DuckDB app (`register_collection_catalog` merging both index lists).
- `CHANGES.md` entries.

## Tests (`tests/duck/`)
- `conftest.py`: session-scoped temp `.duckdb` built via SQL — points (INTEGER PK, TIMESTAMPTZ, DATE, text / double / list props), polygons without PK (`gid` fallback key), a `GEOMETRY('EPSG:26915')` table, a non-spatial table — plus a GeoParquet file declared as a source. App fixture: FastAPI + `Endpoints` + lifespan with a local `register_collection_catalog` (pattern of `tests/conftest.py:create_tipg_app`). A second fixture builds a mixed PG + DuckDB app.
- Coverage: `/collections` (extents, bbox / datetime filters), `/queryables`, `/items` with `ids`, `bbox`, `datetime`, cql2 `filter` (`IN`, `LIKE`, `S_INTERSECTS`, including on the EPSG:26915 table), `sortby`, `properties`, `limit` / `offset` + links, csv / ndjson (WKT path), `/items/{id}` (bad int id → 404), MVT (feature count, layer name, sortby order, empty tile), and the mixed app serving both a PG and a DuckDB collection.

## Verification
1. Confirm the open DuckDB points listed above; adjust casts if needed.
2. `uv run pytest tests/duck -v`, then the full `uv run pytest` (PG suite guards the `cql_where` hook refactor).
3. `uv run pre-commit run --all-files`.
4. Manual: small app over the test `.duckdb` with uvicorn; check `/collections/<id>/items?f=html` and the tile viewer.

## Implementation notes (deviations from the plan above)
- **Open points confirmed**: cql2 emits `st_transform(g, 'EPSG:4326', 'EPSG:n')` / `st_setcrs(g, 'EPSG:n')` as expected; `ST_Read` reports the CRS in the column type; an empty tile is a valid MVT with an empty layer (not NULL).
- **`pytz`**: DuckDB needs it to return `TIMESTAMP WITH TIME ZONE` values to Python → added to the `duckdb` extra.
- **Connection layout**: `connection.cursor()` opens a new connection, which can't see `TEMP` views or session-level `SET`. The connection now always uses an in-memory primary database; `database` (file) is `ATTACH`ed (read-only by default) under its file name, sources are regular views in `memory.main`, and settings use `SET GLOBAL`.
- **Source ids**: sources are exposed as `main.<name>` (same `schema.table` rule as tables) instead of their bare key; duplicate ids across attached databases are skipped with a warning.
- **MVT property casts**: `ST_AsMVT` supports BOOLEAN, integer types (not HUGEINT), FLOAT/DOUBLE, VARCHAR and JSON; DECIMAL/HUGEINT/UBIGINT are cast to DOUBLE, other types (dates, timestamps, lists, UUID, …) to VARCHAR.
- **Tests**: `tests/duck/conftest.py` imports `tipg.factory` inside fixtures; a module-level import read the module-level settings before the PG fixtures set their environment and broke 4 PG tests.
