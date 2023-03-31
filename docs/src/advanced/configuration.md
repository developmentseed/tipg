
`tipg` uses [starlette](https://www.starlette.io/config/)'s configuration pattern which make use of environment variable and/or `.env` file.

Example of `.env` file can be found in [.env.example](https://github.com/developmentseed/tipg/blob/main/.env.example)

## DB connection settings

class: `tipg.settings.PostgresSettings`

#### Database address

You can pass either the Postgres DSN using `DATABASE_URL` or with each specific values for usernane, password, host, port and database name.

- **POSTGRES_USER** (str): Username
- **POSTGRES_PASS** (str): Password
- **POSTGRES_HOST** (str): Hostname (e.g `127.0.0.1`)
- **POSTGRES_PORT** (str): Port number (e.g `5432`)
- **POSTGRES_DBNAME** (str): Database name (e.g `postgis`)

```bash
POSTGRES_USER=username
POSTGRES_PASS=password
POSTGRES_HOST=0.0.0.0
POSTGRES_PORT=5432
POSTGRES_DNAME=postgis
```

Or

- **DATABASE_URL** (str): Full postgres DSN in form of `postgresql://user[:password]@[host][:port][/dbname]`

```bash
DATABASE_URL=postgresql://username:password@0.0.0.0:5432/postgis
```

#### Connection Pools configuration

- **DB_MIN_CONN_SIZE** (int): Number of connection the pool will be initialized with. Default is `1`
- **DB_MAX_CONN_SIZE** (int): Max number of connections in the pool. Default is `10`
- **DB_MAX_QUERIES** (int): Number of queries after a connection is closed and replaced with a new connection. Default is `50000`
- **DB_MAX_INACTIVE_CONN_LIFETIME** (float): Number of seconds after which inactive connections in the pool will be closed. Pass 0 to disable this mechanism. Default is `300`

ref: https://magicstack.github.io/asyncpg/current/api/index.html#connection-pools


## DB visibility settings

class: `tipg.settings.DatabaseSettings`

prefix: **`TIPG_DB_`**

- **SCHEMAS** (list of string): Named schemas, `tipg` can look for `Tables` or `Functions`. Default is `["public"]`

#### `Tables`

- **TABLES** (list of string): Allow only specific `Tables`
- **EXCLUDE_TABLES** (list of string): Excludes specific `Tables`
- **EXCLUDE_TABLE_SCHEMAS** (list of string): Excludes `Schemas` for `Tables` lookup.
- **ONLY_SPATIAL_TABLES** (bool): Accept `Tables` without `geometry` or `geography` column. Default is `True`.

#### `Functions`

- **FUNCTIONS** (list of string): Allow only specific `Functions`
- **EXCLUDE_FUNCTIONS** (list of string): Excludes specific `Functions`
- **EXCLUDE_FUNCTION_SCHEMAS** (list of string): Excludes `Schemas` for `Functions` lookup.

```bash
TIPG_DB_SCHEMAS='["myschema", "public"]'
TIPG_DB_EXCLUDE_FUNCTION_SCHEMAS='["public"]'
```

## Table settings

class: `tipg.settings.TableSettings`

prefix: **`TIPG_`**

- **DATETIME_EXTENT** (bool): Fetch datetime extent by going throught all rows. Default is `True`
- **FALLBACK_KEY_NAMES** (list of string): Primary Key names to look for in the tables. Default is `["ogc_fid", "id", "pkey", "gid"]`
- **TABLE_CONFIG** (dict of `TableConfig`)
    - **TABLE_CONFIG_ _ {schemaId}_{tableId} _ _GEOMCOL** (str): Table's geometry/geography column name
    - **TABLE_CONFIG_ _ {schemaId}_{tableId} _ _DATETIMECOL** (str): Table's datetime column name
    - **TABLE_CONFIG_ _ {schemaId}_{tableId} _ _PK** (str): Table's primary key
    - **TABLE_CONFIG_ _ {schemaId}_{tableId} _ _PROPERTIES** (list of string): Select specific properties from table (for filtering and output)

```bash
TIPG_TABLE_CONFIG__pgstac_items__PK=id
```

## Custom SQL Function

`TiPG` accepts externally defined `SQL Functions` (meaning: not written in the database).

class: `tipg.settings.CustomSQLSettings`

prefix: **`TIPG_`**

- **CUSTOM_SQL_DIRECTORY** (str): path to the directory containing `.sql` files.

```bash
TIPG_CUSTOM_SQL_DIRECTORY=/tmp/functions
```

Note: On each `connection` creation, `TiPG` will look for all the files within the directory and *execute* them within the `pg_temp` schema.

## Vector Tiles settings

class: `tipg.settings.MVTSettings`

prefix: **`TIPG_`**

- **TILE_RESOLUTION** (int): Default is `4096`
- **TILE_BUFFER** (int): Default is `256`
- **TILE_CLIP** (bool): Default is `True`
- **MAX_FEATURE_PER_TILE** (int): Default is `10000`
- **SET_MVT_LAYERNAME** (bool): Set MVT layername from Table ID. Default is `False` ("default")

```bash
TIPG_MAX_FEATURE_PER_TILE=1000
```

## Tile Matrix Sets setting

class: `tipg.settings.TMSSettings`

prefix: **`TIPG_`**

- **DEFAULT_TMS** (str): Default TileMatrixSetId for tiles endpoint. Default is `WebMercatorQuad`
- **DEFAULT_MINZOOM** (int): Default `MinZoom` for tiles endpoints. Default is `0`
- **DEFAULT_MAXZOOM** (int): Default `MaxZoom` for tiles endpoints. Default is `22`

## TiPG Application settings

Settings to control `TiPG` default's FastAPI application.

class: `tipg.settings.APISettings`

prefix: **`TIPG_`**

- **NAME** (str): Set custom name for `TiPG` app. Default is `TiPg: OGC Features and Tiles API`
- **DEBUG** (bool): Default is `False`
- **CORS_ORIGIN** (str): Default is `*`
- **CACHECONTROL** (str): Default is `public, max-age=3600`
- **TEMPLATE_DIRECTORY** (str):
