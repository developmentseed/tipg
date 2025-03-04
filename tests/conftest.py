"""``pytest`` configuration."""

import os
from contextlib import asynccontextmanager

import psycopg
import pytest
from pytest_postgresql.janitor import DatabaseJanitor

from tipg.settings import CustomSQLSettings, DatabaseSettings, PostgresSettings

from fastapi import FastAPI

from starlette.requests import Request
from starlette.testclient import TestClient

FIXTURES_DIR = os.path.join(os.path.dirname(__file__), "fixtures")
TEMPLATE_DIRECTORY = os.path.join(FIXTURES_DIR, "templates")
SQL_FUNCTIONS_DIRECTORY = os.path.join(FIXTURES_DIR, "functions")


@pytest.fixture(scope="session")
def database(postgresql_proc):
    """Create Database Fixture."""
    with DatabaseJanitor(
        user=postgresql_proc.user,
        host=postgresql_proc.host,
        port=postgresql_proc.port,
        dbname="test_db",
        version=postgresql_proc.version,
        password="password",
    ) as jan:
        yield jan


def _get_sql(source: str) -> str:
    with open(source, "r") as fd:
        to_run = fd.readlines()

    return "\n".join(to_run)


@pytest.fixture(scope="session")
def database_url(database):
    """add data to the database fixture"""
    db_url = f"postgresql://{database.user}:{database.password}@{database.host}:{database.port}/{database.dbname}"
    with psycopg.connect(db_url, autocommit=True) as conn:
        with conn.cursor() as cur:
            cur.execute(f"ALTER DATABASE {database.dbname} SET TIMEZONE='UTC';")
            cur.execute("SET TIME ZONE 'UTC';")

            cur.execute("CREATE EXTENSION IF NOT EXISTS postgis;")
            # make sure postgis extension exists
            assert cur.execute(
                "SELECT EXISTS(SELECT 1 FROM pg_extension WHERE extname='postgis' LIMIT 1);"
            ).fetchone()[0]

            cur.execute("CREATE SCHEMA IF NOT EXISTS public;")

            # load table
            cur.execute(_get_sql(os.path.join(FIXTURES_DIR, "landsat_wrs.sql")))
            cur.execute(_get_sql(os.path.join(FIXTURES_DIR, "my_data.sql")))
            cur.execute(_get_sql(os.path.join(FIXTURES_DIR, "nongeo_data.sql")))

            cur.execute(
                "CREATE TABLE public.landsat AS SELECT geom, ST_Centroid(geom) as centroid, ogc_fid, id, pr, path, row from public.landsat_wrs;"
            )
            cur.execute("ALTER TABLE public.landsat ADD PRIMARY KEY (ogc_fid);")

            count_landsat = cur.execute(
                "SELECT COUNT(*) FROM public.landsat_wrs"
            ).fetchone()[0]
            count_landsat_centroid = cur.execute(
                "SELECT COUNT(*) FROM public.landsat"
            ).fetchone()[0]
            assert count_landsat == count_landsat_centroid

            # Add table with Huge geometries
            cur.execute(_get_sql(os.path.join(FIXTURES_DIR, "canada.sql")))

            # add table with geometries not in WGS84
            cur.execute(_get_sql(os.path.join(FIXTURES_DIR, "minnesota.sql")))

            # add a `myschema` schema
            cur.execute("CREATE SCHEMA IF NOT EXISTS myschema;")
            cur.execute(
                "CREATE TABLE myschema.landsat AS SELECT * FROM public.landsat_wrs;"
            )
            count_landsat_schema = cur.execute(
                "SELECT COUNT(*) FROM myschema.landsat"
            ).fetchone()[0]
            assert count_landsat == count_landsat_schema

            # add a `userschema` schema
            cur.execute("CREATE SCHEMA IF NOT EXISTS userschema;")

            cur.execute(
                "CREATE OR REPLACE FUNCTION userschema.test_no_params() RETURNS TABLE(foo integer, location geometry) AS 'SELECT 1, ST_MakePoint(0,0);' LANGUAGE SQL;"
            )

    return db_url


def create_tipg_app(
    postgres_settings: PostgresSettings,
    db_settings: DatabaseSettings,
    sql_settings: CustomSQLSettings,
) -> FastAPI:
    """Create TiPG Application."""

    from tipg.collections import register_collection_catalog
    from tipg.database import close_db_connection, connect_to_db
    from tipg.factory import Endpoints

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        """FastAPI Lifespan."""
        await connect_to_db(
            app,
            schemas=db_settings.schemas,
            tipg_schema=db_settings.tipg_schema,
            user_sql_files=sql_settings.sql_files,
            settings=postgres_settings,
        )
        await register_collection_catalog(app, db_settings=db_settings)
        yield
        await close_db_connection(app)

    app = FastAPI(
        title="TiPg: OGC Features and Tiles API",
        openapi_url="/api",
        docs_url="/api.html",
        lifespan=lifespan,
    )
    ogc_api = Endpoints(title="TiPg: OGC Features and Tiles API")
    app.include_router(ogc_api.router)

    return app


@pytest.fixture(autouse=True)
def app(database_url, monkeypatch):
    """Create app with connection to the pytest database."""
    monkeypatch.setenv("DATABASE_URL", database_url)
    monkeypatch.setenv("ONLY_SPATIAL_TABLES", "FALSE")

    # API config
    monkeypatch.setenv("TIPG_TEMPLATE_DIRECTORY", TEMPLATE_DIRECTORY)

    # Custom Functions
    monkeypatch.setenv("TIPG_CUSTOM_SQL_DIRECTORY", SQL_FUNCTIONS_DIRECTORY)

    # Tables configs
    monkeypatch.setenv("TIPG_TABLE_CONFIG__public_my_data__datetimecol", "datetime")
    monkeypatch.setenv("TIPG_TABLE_CONFIG__public_my_data__geomcol", "geom")
    monkeypatch.setenv("TIPG_TABLE_CONFIG__public_my_data__pk", "ogc_fid")
    monkeypatch.setenv("TIPG_TABLE_CONFIG__public_my_data_alt__datetimecol", "otherdt")
    monkeypatch.setenv("TIPG_TABLE_CONFIG__public_my_data_alt__geomcol", "othergeom")
    monkeypatch.setenv("TIPG_TABLE_CONFIG__public_my_data_alt__pk", "id")
    monkeypatch.setenv("TIPG_TABLE_CONFIG__public_landsat__geomcol", "geom")
    monkeypatch.setenv("TIPG_TABLE_CONFIG__public_my_data_date__datetimecol", "datedt")

    # OGC Tiles Settings
    monkeypatch.setenv("TIPG_DEFAULT_MINZOOM", str(5))
    monkeypatch.setenv("TIPG_DEFAULT_MAXZOOM", str(12))

    monkeypatch.setenv("TIPG_DEBUG", "TRUE")

    from tipg.main import app, db_settings

    db_settings.only_spatial_tables = False
    db_settings.exclude_tables = None
    db_settings.tables = None
    db_settings.functions = None

    with TestClient(app) as app:
        yield app


@pytest.fixture
def app_excludes(database_url, monkeypatch):
    """Create APP with but excludes `public.nongeo_data` and `public.minnesota` tables."""
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["public"],
        exclude_tables=["public.nongeo_data", "public.minnesota"],
        functions=[],
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_includes(database_url, monkeypatch):
    """Create APP with only `public.nongeo_data` and `public.minnesota` table."""
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["public"],
        tables=["public.nongeo_data", "public.minnesota"],
        functions=[],
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_excludes_function(database_url, monkeypatch):
    """Create APP with but excludes `pg_temp.squares` and `public.st_squaregrid` functions."""
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["public"],
        tables=[],
        exclude_functions=["pg_temp.squares", "public.st_squaregrid"],
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_includes_function(database_url, monkeypatch):
    """Create APP with only `public.nongeo_data` table."""
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=[],
        tables=[],
        functions=["pg_temp.hexagons"],
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_empty(database_url, monkeypatch):
    """Create APP with only no table nor function."""
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=[],
        tables=[],
        functions=[],
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_myschema(database_url):
    """Create APP with only tables from `myschema` schema and no function schema.

    Available tables should come from `myschema` and functions from `pg_temp`.
    """
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["myschema"],
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_myschema_public(database_url, monkeypatch):
    """Create APP with only tables from `myschema` and `public` schema and no function schema.

    Available tables should come from `myschema` and `public` and functions from `pg_temp`.
    """
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["myschema", "public"],
        exclude_function_schemas=["public"],
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_no_extents(database_url, monkeypatch):
    """Create APP with tables from `myschema` and `public` schema but without
    calculating the spatial/datetime extents.

    Available tables should come from `myschema` and `public` and functions from `pg_temp`.
    """
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["myschema", "public"],
        spatial_extent=False,
        datetime_extent=False,
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_no_spatial_extent(database_url, monkeypatch):
    """Create APP with tables from `myschema` and `public` schema but without
    calculating the spatial/datetime extents.

    Available tables should come from `myschema` and `public` and functions from `pg_temp`.
    """
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["myschema", "public"],
        spatial_extent=False,
        datetime_extent=True,
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_myschema_public_functions(database_url, monkeypatch):
    """Create APP with only tables from `myschema` schema and functions from `public` schema.

    Available tables should come from `myschema` and functions from `pg_temp` and `public` schema.
    """
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["myschema", "public"],
        exclude_table_schemas=["public"],
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_only_public_functions(database_url, monkeypatch):
    """Create APP with only functions from `pg_temp`and `public` schemas.

    Available functions from `pg_temp` and `public` schema (no tables available).
    """
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["public"],
        exclude_table_schemas=["public"],
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_myschema_public_order(database_url, monkeypatch):
    """Create APP with only tables from `myschema` and `public` schema and no function schema.

    Available tables should come from `myschema` and `public` and functions from `pg_temp`.
    """
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["public", "myschema"],
        exclude_function_schemas=["public"],
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_user_schema(database_url):
    """Create APP with only tables from `userschema` schemas."""
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["userschema"],
        exclude_table_schemas=["public"],
        only_spatial_tables=False,
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=None)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_middleware_refresh(database_url, monkeypatch):
    """Create APP with CatalogUpdateMiddleware middleware."""

    from tipg.collections import register_collection_catalog
    from tipg.database import close_db_connection, connect_to_db
    from tipg.middleware import CatalogUpdateMiddleware

    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["public"],
        exclude_function_schemas=["public"],
    )

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        """FastAPI Lifespan."""
        await connect_to_db(
            app,
            schemas=db_settings.schemas,
            tipg_schema=db_settings.tipg_schema,
            settings=postgres_settings,
        )
        await register_collection_catalog(app, db_settings=db_settings)
        yield
        await close_db_connection(app)

    app = FastAPI(lifespan=lifespan)

    @app.get("/rawcatalog", tags=["debug"])
    async def raw_catalog(request: Request):
        """Return parsed catalog data for testing."""
        return request.app.state.collection_catalog

    # refresh every 2 seconds
    app.add_middleware(
        CatalogUpdateMiddleware,
        func=register_collection_catalog,
        ttl=2,
        db_settings=db_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture
def app_functions(database_url, monkeypatch):
    """Create APP with only custom functions."""
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(schemas=["badschema"], only_spatial_tables=False)
    sql_settings = CustomSQLSettings(custom_sql_directory=SQL_FUNCTIONS_DIRECTORY)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client


@pytest.fixture(autouse=True)
def app_public_table(database_url, monkeypatch):
    """Create app with connection to the pytest database."""
    monkeypatch.setenv("TIPG_TABLE_CONFIG__public_landsat_wrs__properties", '["pr"]')

    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["public"],
        functions=[],
    )
    sql_settings = CustomSQLSettings(custom_sql_directory=None)

    app = create_tipg_app(
        postgres_settings=postgres_settings,
        db_settings=db_settings,
        sql_settings=sql_settings,
    )

    with TestClient(app) as client:
        yield client
