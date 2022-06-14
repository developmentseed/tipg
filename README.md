<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/10407788/172736520-18da1910-87ac-41a9-b6f0-6c6ae503bd5e.png"/>
  <p align="center">Simple and Fast Geospatial Feature Server for PostGIS.</p>
</p>

<p align="center">
  <a href="https://github.com/developmentseed/tifeatures/actions?query=workflow%3ACI" target="_blank">
      <img src="https://github.com/developmentseed/tifeatures/workflows/CI/badge.svg" alt="Test">
  </a>
  <a href="https://codecov.io/gh/developmentseed/tifeatures" target="_blank">
      <img src="https://codecov.io/gh/developmentseed/tifeatures/branch/master/graph/badge.svg" alt="Coverage">
  </a>
  <a href="https://github.com/developmentseed/tifeatures/blob/master/LICENSE" target="_blank">
      <img src="https://img.shields.io/github/license/developmentseed/tifeatures.svg" alt="License">

  </a>
</p>

---

**Source Code**: <a href="https://github.com/developmentseed/tifeatures" target="_blank">https://github.com/developmentseed/tifeatures</a>

---


## Install

```bash
$ git clone https://github.com/developmentseed/tifeatures.git
$ cd tifeatures
$ python -m pip install -e .  # or .["all"] to install optional dependencies
```

## Launch

```bash
$ pip install uvicorn

$ uvicorn tifeatures.main:app
```

![](https://user-images.githubusercontent.com/10407788/152539521-eadb9680-44ea-4647-b65d-d6644169db85.png)

### Configuration

To be able to work, the application will need access to the PostGIS database. `tifeatures` uses [starlette](https://www.starlette.io/config/)'s configuration pattern which make use of environment variable and/or `.env` file to pass variable to the application.

Example of `.env` file can be found in [.env.example](https://github.com/developmentseed/tifeatures/blob/master/.env.example)

```
# you need define the DATABASE_URL directly
DATABASE_URL=postgresql://username:password@0.0.0.0:5432/postgis
```

## Contribution & Development

See [CONTRIBUTING.md](https://github.com/developmentseed/tifeatures/blob/master/CONTRIBUTING.md)

## License

See [LICENSE](https://github.com/developmentseed/tifeatures/blob/master/LICENSE)

## Authors

Created by [Development Seed](<http://developmentseed.org>)

## Changes

See [CHANGES.md](https://github.com/developmentseed/tifeatures/blob/master/CHANGES.md).

