<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/10407788/172736520-18da1910-87ac-41a9-b6f0-6c6ae503bd5e.png"/>
  <p align="center">Simple and Fast Geospatial Features API for PostGIS.</p>
</p>
<p align="center">
  <a href="https://github.com/developmentseed/tifeatures/actions?query=workflow%3ACI" target="_blank">
      <img src="https://github.com/developmentseed/tifeatures/workflows/CI/badge.svg" alt="Test">
  </a>
  <a href="https://codecov.io/gh/developmentseed/tifeatures" target="_blank">
      <img src="https://codecov.io/gh/developmentseed/tifeatures/branch/master/graph/badge.svg" alt="Coverage">
  </a>
  <a href="https://pypi.org/project/tifeatures" target="_blank">
      <img src="https://img.shields.io/pypi/v/tifeatures?color=%2334D058&label=pypi%20package" alt="Package version">
  </a>
  <a href="https://github.com/developmentseed/tifeatures/blob/master/LICENSE" target="_blank">
      <img src="https://img.shields.io/github/license/developmentseed/tifeatures.svg" alt="License">

  </a>
</p>

---

**Documentation**: <a href="https://developmentseed.org/tifeatures/" target="_blank">https://developmentseed.org/tifeatures/</a>

**Source Code**: <a href="https://github.com/developmentseed/tifeatures" target="_blank">https://github.com/developmentseed/tifeatures</a>

---

`TiFeatures`, pronounced *T[ee]Features*, is a **python** package which helps creating lightweight **Features** server for PostGIS Database. The API has been designed with respect to [OGC Features API specification](https://github.com/opengeospatial/ogcapi-features).

## Install

```bash
$ python -m pip install pip -U
$ python -m pip install tifeatures

# or from source
$ git clone https://github.com/developmentseed/tifeatures.git
$ cd tifeatures
$ python -m pip install -e .
```

## OGC Specification

Specification | Status | link |
|          -- |     -- |   -- |
Part 1: Core             | ✅ | https://docs.ogc.org/is/17-069r4/17-069r4.html
Part 2: CRS by Reference | ❌ | https://docs.ogc.org/is/18-058r1/18-058r1.html
Part 3: Filtering / CQL2 | ✅ | https://docs.ogc.org/DRAFTS/19-079r1.html

Notes:

The project authors choose not to implement the Part 2 of the specification to avoid the introduction of CRS based GeoJSON. This might change in the future.

While the authors tried to follow the specification (part 1 and 3) to the letter, some API endpoints might have more capabilities (e.g geometry column selection).

## PostGIS/PostgreSQL

`TiFeatures` rely a lot of `ST_*` PostGIS functions. You need to make sure your PostgreSQL database has PostGIS installed.

```sql
SELECT name, default_version,installed_version
FROM pg_available_extensions WHERE name LIKE 'postgis%' or name LIKE 'address%';
```

```sql
CREATE EXTENSION postgis;
```

### Configuration

To be able to work, the application will need access to the database. `tifeatures` uses [starlette](https://www.starlette.io/config/)'s configuration pattern which make use of environment variable and/or `.env` file to pass variable to the application.

Example of `.env` file can be found in [.env.example](https://github.com/developmentseed/tifeatures/blob/master/.env.example)

```
# you need define the DATABASE_URL directly
DATABASE_URL=postgresql://username:password@0.0.0.0:5432/postgis
```

## Launch

```bash
$ pip install uvicorn

# Set your postgis database instance URL in the environment
$ export DATABASE_URL=postgresql://username:password@0.0.0.0:5432/postgis
$ uvicorn tifeatures.main:app

# or using Docker

$ docker-compose up
```

<p align="center">
  <img src="https://user-images.githubusercontent.com/10407788/199774870-2e385617-bae8-4513-9349-d97e43670767.png"/>
</p>

## Contribution & Development

See [CONTRIBUTING.md](https://github.com/developmentseed/tifeatures/blob/master/CONTRIBUTING.md)

## License

See [LICENSE](https://github.com/developmentseed/tifeatures/blob/master/LICENSE)

## Authors

Created by [Development Seed](<http://developmentseed.org>)

## Changes

See [CHANGES.md](https://github.com/developmentseed/tifeatures/blob/master/CHANGES.md).

