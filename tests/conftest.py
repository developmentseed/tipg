"""``pytest`` configuration."""

import os

import pytest
import pytest_pgsql

from tipg.settings import CustomSQLSettings, DatabaseSettings, PostgresSettings

from fastapi import FastAPI

from starlette.testclient import TestClient

FIXTURES_DIR = os.path.join(os.path.dirname(__file__), "fixtures")
TEMPLATE_DIRECTORY = os.path.join(FIXTURES_DIR, "templates")
SQL_FUNCTIONS_DIRECTORY = os.path.join(FIXTURES_DIR, "functions")

test_db = pytest_pgsql.TransactedPostgreSQLTestDB.create_fixture(
    "test_db", scope="session", use_restore_state=False
)


@pytest.fixture(scope="session")
def database_url(test_db):
    """
    Session scoped fixture to launch a postgresql database in a separate process.  We use psycopg2 to ingest test data
    because pytest-asyncio event loop is a function scoped fixture and cannot be called within the current scope.  Yields
    a database url which we pass to our application through a monkeypatched environment variable.
    """
    assert test_db.install_extension("postgis")

    # make sure we have a `public` schema
    test_db.create_schema("public", exists_ok=True)

    test_db.run_sql_file(os.path.join(FIXTURES_DIR, "landsat_wrs.sql"))
    assert test_db.has_table("public.landsat_wrs")

    test_db.run_sql_file(os.path.join(FIXTURES_DIR, "my_data.sql"))
    assert test_db.has_table("public.my_data")

    test_db.run_sql_file(os.path.join(FIXTURES_DIR, "nongeo_data.sql"))
    assert test_db.has_table("public.nongeo_data")

    test_db.connection.execute(
        "CREATE TABLE public.landsat AS SELECT geom, ST_Centroid(geom) as centroid, ogc_fid, id, pr, path, row from public.landsat_wrs;"
    )
    test_db.connection.execute("ALTER TABLE public.landsat ADD PRIMARY KEY (ogc_fid);")
    assert test_db.has_table("public.landsat")

    count_landsat = test_db.connection.execute(
        "SELECT COUNT(*) FROM public.landsat_wrs"
    ).scalar()
    count_landsat_centroid = test_db.connection.execute(
        "SELECT COUNT(*) FROM public.landsat"
    ).scalar()
    assert count_landsat == count_landsat_centroid

    # Add table with Huge geometries
    test_db.run_sql_file(os.path.join(FIXTURES_DIR, "canada.sql"))
    assert test_db.has_table("public.canada")

    # add table with geometries not in WGS84
    test_db.run_sql_file(os.path.join(FIXTURES_DIR, "minnesota.sql"))
    assert test_db.has_table("public.minnesota")

    # add a `myschema` schema
    test_db.create_schema("myschema")
    assert test_db.has_schema("myschema")

    test_db.connection.execute(
        "CREATE TABLE myschema.landsat AS SELECT * FROM public.landsat_wrs;"
    )
    assert test_db.has_table("myschema.landsat")
    count_landsat_schema = test_db.connection.execute(
        "SELECT COUNT(*) FROM myschema.landsat"
    ).scalar()
    assert count_landsat == count_landsat_schema

    return str(test_db.connection.engine.url)


def create_tipg_app(
    postgres_settings: PostgresSettings,
    db_settings: DatabaseSettings,
    sql_settings: CustomSQLSettings,
) -> FastAPI:
    """Create TiPG Application."""

    from tipg.db import close_db_connection, connect_to_db, register_collection_catalog
    from tipg.factory import Endpoints

    app = FastAPI(
        title="TiPg: OGC Features and Tiles API",
        openapi_url="/api",
        docs_url="/api.html",
    )
    ogc_api = Endpoints(title="TiPg: OGC Features and Tiles API")
    app.include_router(ogc_api.router)

    @app.on_event("startup")
    async def startup_event() -> None:
        """Connect to database on startup."""
        await connect_to_db(
            app,
            settings=postgres_settings,
            schemas=db_settings.schemas,
            user_sql_files=sql_settings.sql_files,
        )
        await register_collection_catalog(
            app,
            schemas=db_settings.schemas,
            tables=db_settings.tables,
            exclude_tables=db_settings.exclude_tables,
            exclude_table_schemas=db_settings.exclude_table_schemas,
            functions=db_settings.functions,
            exclude_functions=db_settings.exclude_functions,
            exclude_function_schemas=db_settings.exclude_function_schemas,
            spatial=db_settings.only_spatial_tables,
        )

    @app.on_event("shutdown")
    async def shutdown_event() -> None:
        """Close database connection."""
        await close_db_connection(app)

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

    # OGC Tiles Settings
    monkeypatch.setenv("TIPG_DEFAULT_MINZOOM", str(5))
    monkeypatch.setenv("TIPG_DEFAULT_MAXZOOM", str(12))

    from tipg.main import app, db_settings, postgres_settings

    postgres_settings.database_url = database_url

    db_settings.only_spatial_tables = False
    db_settings.exclude_tables = None
    db_settings.tables = None
    db_settings.functions = None

    # Remove middlewares https://github.com/encode/starlette/issues/472
    app.user_middleware = []
    app.middleware_stack = app.build_middleware_stack()

    with TestClient(app) as app:
        yield app


@pytest.fixture
def app_excludes(database_url, monkeypatch):
    """Create APP with but excludes `public.nongeo_data` table."""
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["public"],
        exclude_tables=["public.nongeo_data"],
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
    """Create APP with only `public.nongeo_data` table."""
    postgres_settings = PostgresSettings(database_url=database_url)
    db_settings = DatabaseSettings(
        schemas=["public"],
        tables=["public.nongeo_data"],
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
