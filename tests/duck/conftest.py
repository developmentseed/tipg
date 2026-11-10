"""DuckDB backend test fixtures."""

import datetime
from contextlib import asynccontextmanager

import pytest
from fastapi import FastAPI
from starlette.requests import Request
from starlette.testclient import TestClient

duckdb = pytest.importorskip("duckdb")

from tipg.collections import Catalog  # noqa: E402
from tipg.duck import (  # noqa: E402
    DuckDBCatalogSettings,
    DuckDBSettings,
    close_duckdb_connection,
    connect_to_duckdb,
    duck_get_collection_index,
)

FIXTURE_SQL = """
-- 20 points on a diagonal, integer primary key, datetimes and various property types
CREATE TABLE points (
    id INTEGER PRIMARY KEY,
    name VARCHAR,
    value DOUBLE,
    price DECIMAL(10, 2),
    dt TIMESTAMPTZ,
    day DATE,
    tags VARCHAR[],
    props JSON,
    geom GEOMETRY
);
INSERT INTO points
SELECT
    x::INTEGER,
    'point ' || x,
    x * 1.5,
    x * 2.25,
    TIMESTAMPTZ '2020-01-01 00:00:00+00' + to_hours(x::INTEGER),
    DATE '2020-01-01' + x::INTEGER,
    ['a', 'b'],
    '{"rank": ' || x || '}',
    ST_Point(x, x)
FROM range(1, 21) r(x);

-- polygons, no primary key (`gid` fallback key)
CREATE TABLE polygons AS
SELECT x::INTEGER AS gid, 'polygon ' || x AS name, ST_Buffer(ST_Point(x * 10, x * 10), 1) AS geom
FROM range(1, 4) r(x);

-- geometries in a projected CRS (UTM zone 15N, around Minneapolis)
CREATE TABLE utm (id INTEGER PRIMARY KEY, name VARCHAR, geom GEOMETRY('EPSG:26915'));
INSERT INTO utm VALUES
    (1, 'minneapolis', ST_SetCRS(ST_Point(478000, 4980000), 'EPSG:26915')),
    (2, 'duluth', ST_SetCRS(ST_Point(568000, 5182000), 'EPSG:26915'));

-- no geometry
CREATE TABLE nongeo AS SELECT x::INTEGER AS id, 'row ' || x AS name FROM range(1, 4) r(x);
"""


@pytest.fixture(scope="session")
def duckdb_files(tmp_path_factory):
    """Create a DuckDB database file and a GeoParquet file."""
    tmp = tmp_path_factory.mktemp("duckdb")
    database = str(tmp / "test.duckdb")
    parquet = str(tmp / "landmarks.parquet")

    conn = duckdb.connect(database)
    conn.execute("INSTALL spatial")
    conn.execute("LOAD spatial")
    conn.execute(FIXTURE_SQL)
    conn.execute(
        f"COPY (SELECT id, name, geom FROM points WHERE id <= 5) TO '{parquet}' (FORMAT parquet)"
    )
    conn.close()

    return {"database": database, "parquet": parquet}


@pytest.fixture
def duckdb_settings(duckdb_files):
    """DuckDB settings for the test database."""
    return DuckDBSettings(
        database=duckdb_files["database"],
        sources={"landmarks": duckdb_files["parquet"]},
    )


def create_duck_app(
    settings: DuckDBSettings,
    catalog_settings: DuckDBCatalogSettings,
) -> FastAPI:
    """Create a TiPg application serving DuckDB collections."""
    # NOTE: imported here (not at module level) so module-level settings are
    # read after the environment set by the PostgreSQL test fixtures.
    from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
    from tipg.factory import Endpoints

    async def register_collection_catalog(app: FastAPI) -> None:
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
        await connect_to_duckdb(app, settings=settings)
        await register_collection_catalog(app)
        yield
        await close_duckdb_connection(app)

    app = FastAPI(lifespan=lifespan)
    app.include_router(Endpoints(title="TiPg DuckDB").router)
    add_exception_handlers(app, DEFAULT_STATUS_CODES)

    @app.get("/rawcatalog")
    async def raw_catalog(request: Request):
        """Return parsed catalog data for testing."""
        return request.app.state.collection_catalog

    return app


@pytest.fixture
def duck_app(duckdb_settings):
    """DuckDB-only TiPg app (all tables, spatial or not)."""
    app = create_duck_app(
        duckdb_settings, DuckDBCatalogSettings(only_spatial_tables=False)
    )
    with TestClient(app) as client:
        yield client


@pytest.fixture
def mixed_app(database_url, duckdb_settings):
    """TiPg app serving both PostgreSQL and DuckDB collections."""
    from tipg.errors import DEFAULT_STATUS_CODES, add_exception_handlers
    from tipg.factory import Endpoints
    from tipg.pg import (
        PostgresCatalogSettings,
        PostgresSettings,
        close_db_connection,
        connect_to_db,
        pg_get_collection_index,
    )

    postgres_catalog_settings = PostgresCatalogSettings(schemas=["public"])
    duckdb_catalog_settings = DuckDBCatalogSettings(tables=["main.points"])

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        await connect_to_db(
            app,
            schemas=postgres_catalog_settings.schemas,
            tipg_schema=postgres_catalog_settings.tipg_schema,
            settings=PostgresSettings(database_url=database_url),
        )
        await connect_to_duckdb(app, settings=duckdb_settings)

        pg_collections = await pg_get_collection_index(
            connection_pool=app.state.pool,
            settings=postgres_catalog_settings,
        )
        duck_collections = await duck_get_collection_index(
            connection=app.state.duckdb_connection,
            settings=duckdb_catalog_settings,
        )
        app.state.collection_catalog = Catalog(
            collections={col.id: col for col in [*pg_collections, *duck_collections]},
            last_updated=datetime.datetime.now(),
        )

        yield

        await close_duckdb_connection(app)
        await close_db_connection(app)

    app = FastAPI(lifespan=lifespan)
    app.include_router(Endpoints(title="TiPg mixed").router)
    add_exception_handlers(app, DEFAULT_STATUS_CODES)

    with TestClient(app) as client:
        yield client


@pytest.fixture
def duck_app_sources_only(duckdb_files):
    """DuckDB TiPg app without database file (file sources only)."""
    settings = DuckDBSettings(sources={"landmarks": duckdb_files["parquet"]})
    assert settings.database is None
    app = create_duck_app(settings, DuckDBCatalogSettings())
    with TestClient(app) as client:
        yield client
