<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/10407788/204477834-2533241a-5927-4f56-959e-4e8494027bc0.png"/>
  <p align="center">Simple and Fast Geospatial OGC Features and Tiles API for PostGIS.</p>
</p>
<p align="center">
  <a href="https://github.com/developmentseed/tipg/actions?query=workflow%3ACI" target="_blank">
      <img src="https://github.com/developmentseed/tipg/workflows/CI/badge.svg" alt="Test">
  </a>
  <a href="https://codecov.io/gh/developmentseed/tipg" target="_blank">
      <img src="https://codecov.io/gh/developmentseed/tipg/branch/main/graph/badge.svg" alt="Coverage">
  </a>
  <a href="https://pypi.org/project/tipg" target="_blank">
      <img src="https://img.shields.io/pypi/v/tipg?color=%2334D058&label=pypi%20package" alt="Package version">
  </a>
  <a href="https://github.com/developmentseed/tipg/blob/main/LICENSE" target="_blank">
      <img src="https://img.shields.io/github/license/developmentseed/tipg.svg" alt="License">
  </a>
</p>

---

**Documentation**: <a href="https://developmentseed.org/tipg/" target="_blank">https://developmentseed.org/tipg/</a>

**Source Code**: <a href="https://github.com/developmentseed/tipg" target="_blank">https://github.com/developmentseed/tipg</a>

---

`tipg`, pronounced *T[ee]pg*, is a **Python** package that helps create lightweight OGC **Features** and **Tiles** API with a PostGIS Database backend. The API has been designed for [OGC Features](https://ogcapi.ogc.org/features) and [OGC Tiles](https://ogcapi.ogc.org/tiles/) specifications.

> **Note**
> This project is the result of the merge between [tifeatures](https://github.com/developmentseed/tifeatures) and [timvt](https://github.com/developmentseed/timvt).

## Install

```bash
$ python -m pip install pip -U
$ python -m pip install tipg

# or from source
$ git clone https://github.com/developmentseed/tipg.git
$ cd tipg
$ python -m pip install -e .
```

## OGC Specifications

Specification | Status | link |
|          -- |     -- |   -- |
OGC Common Part 1: Core                |  ✅ | https://docs.ogc.org/DRAFTS/19-072.html
OGC Common Part 2: Geospatial Data     |  ✅ | http://docs.ogc.org/DRAFTS/20-024.html
OGC Features Part 1: Core              |  ✅ | https://docs.ogc.org/is/17-069r4/17-069r4.html
OGC Features Part 2: CRS by Reference  |  ❌ | https://docs.ogc.org/is/18-058r1/18-058r1.html
OGC Features Part 3: Filtering / CQL2  |  ✅ | https://docs.ogc.org/DRAFTS/19-079r1.html
OGC Tiles Part 1: Core                 |  ✅ | https://docs.ogc.org/is/20-057/20-057.html

Notes:

We chose to avoid implementing the second part of the specification to prevent the introduction of CRS-based GeoJSON. We may review this decision in the future.

While we tried to follow OGC specifications to the letter, some API endpoints might have more capabilities (e.g., geometry column selection).

## PostGIS/PostgreSQL

`tipg` relies greatly on PostGIS' `ST_*` functions. PostGIS must be installed on your PostgreSQL database.

```sql
SELECT name, default_version,installed_version
FROM pg_available_extensions WHERE name LIKE 'postgis%' or name LIKE 'address%';
```

```sql
CREATE EXTENSION postgis;
```

### Configuration

To be able to work, the application will need access to the database. `tipg` uses [Starlette](https://www.starlette.io/config/)'s configuration pattern, which makes use of environment variables or a `.env` file to pass variables to the application.

An example of a `.env` file can be found in [.env.example](https://github.com/developmentseed/tipg/blob/main/.env.example)

```
# you need to define the DATABASE_URL directly
DATABASE_URL=postgresql://username:password@0.0.0.0:5432/postgis
```

More info about configuration options at https://developmentseed.org/tipg/user_guide/configuration/

## Launch

```bash
$ pip install uvicorn

# Set your PostGIS database instance URL in the environment
$ export DATABASE_URL=postgresql://username:password@0.0.0.0:5432/postgis
$ uvicorn tipg.main:app

# or using Docker

$ docker-compose up app
```

<p align="center">
  <img width="700" src="https://github.com/developmentseed/tipg/assets/10407788/e68ff285-8073-4715-9280-63aa3b67e4cf">
  <img width="700" src="https://github.com/developmentseed/tipg/assets/10407788/ffd95cf0-22f9-4a98-9682-bc9324c0868b">
  <img width="700" src="https://github.com/developmentseed/tipg/assets/10407788/9b02371f-49b9-462f-bec0-a2546ea4ec07">
  <img width="700" src="https://github.com/developmentseed/tipg/assets/10407788/3babe432-bb19-4cf0-a808-cbacd997a9a7">
  <img width="700" src="https://github.com/developmentseed/tipg/assets/10407788/2f16dc77-e82a-4756-b528-fb1544ccb9bc">
  <img width="700" src="https://github.com/developmentseed/tipg/assets/10407788/989b3a58-8cd2-46db-bf53-e60609dd82ba">
  <img width="700" src="https://github.com/developmentseed/tipg/assets/10407788/46d9acb0-465d-470d-bdae-2999b47ad65f">
  <img width="700" src="https://github.com/developmentseed/tipg/assets/10407788/d4a079d0-069a-4399-9b56-307fbba5e383">
  <img width="700" src="https://github.com/developmentseed/tipg/assets/10407788/17494573-da43-4fd5-81f9-1cfb4e8c91f2">
</p>


## Docker images

We are publishing two different docker images on `tag` and on every commit to `main` branch:

| | Gunicorn | Uvicorn |
|          -- |     -- |   -- |
main commit | `ghcr.io/developmentseed/tipg:latest` | `ghcr.io/developmentseed/tipg:uvicorn-latest`
tags | `ghcr.io/developmentseed/tipg:0.0.0` | `ghcr.io/developmentseed/tipg:uvicorn-0.0.0`
dockerfile | [/dockerfiles/Dockerfile.gunicorn](https://github.com/developmentseed/tipg/blob/main/dockerfiles/Dockerfile.gunicorn) | [/dockerfiles/Dockerfile.uvicorn](https://github.com/developmentseed/tipg/blob/main/dockerfiles/Dockerfile.uvicorn)

See all version at https://github.com/developmentseed/tipg/pkgs/container/tipg

```
# Gunicorn image
$ docker run \
    -p 8081:8081 \
    -e PORT=8081 \
    -e DATABASE_URL=postgresql://username:password@0.0.0.0:5432/postgis \
    ghcr.io/developmentseed/tipg:latest

# or Uvicorn image
$ docker run \
    -p 8081:8081 \
    -e PORT=8081 \
    -e DATABASE_URL=postgresql://username:password@0.0.0.0:5432/postgis \
    ghcr.io/developmentseed/tipg:uvicorn-latest
```

Note: If you are planning to use the docker image in a kubernetes deployment you may want to use the `uvicorn` image (ref: https://fastapi.tiangolo.com/deployment/server-workers/).

## Contribution & Development

See [CONTRIBUTING.md](https://github.com/developmentseed/tipg/blob/main/CONTRIBUTING.md)

## License

See [LICENSE](https://github.com/developmentseed/tipg/blob/main/LICENSE)

## Authors

Created by [Development Seed](<http://developmentseed.org>)

## Changes

See [CHANGES.md](https://github.com/developmentseed/tipg/blob/main/CHANGES.md).

