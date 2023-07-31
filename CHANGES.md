# Release Notes

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

Note: Minor version `0.X.0` update might break the API, It's recommended to pin `tipg` to minor version: `tipg>=0.1,<0.2`

## [unreleased]

### Changed

- update requirement to switch to pydantic~=2.0
  - morecantile>=5.0,<6.0
  - pydantic~=2.0
  - pydantic-settings~=2.0
  - geojson-pydantic>=1.0,<2.0
  - fastapi>=0.100

- move `ResponseType`, `QueryablesResponseType`, `ItemsResponseType`, `ItemResponseType`, `VectorResponseType`, `VectorType` and `FilterLang` from `tipg.enums` to `tipg.dependencies` and use `Literal` instead of `Enum`

- add `func` attribute to `CatalogUpdateMiddleware` to allow custom Catalog Update function

    ```python
    # Before
    app.add_middleware(
        CatalogUpdateMiddleware,
        ttl=300,
    )

    # Now
    app.add_middleware(
        CatalogUpdateMiddleware,
        func=register_collection_catalog,
        ttl=300,
    )
    ```

### Fixed

- remove usage of pydantic models in `/items` and `/items/{itemId}` endpoints to increase performance

## [0.3.1] - 2023-07-28

### Fixed

- fixed wrong media type option for `/queryables` endpoint (`json` instead of `schemajson``)

### Added

- more endpoints in performance benchmarks

## [0.3.0] - 2023-07-27

### Fixed

- added `python-dotenv` dependency via `pydantic[dotenv]`
- `type` query parameter to filter collections based on their type (`Function` or `Table`)
- fixed a small bug in the `tipg_properties` SQL function where the bounds property was not properly transformed to 4326 (author @RemcoMeeuwissen, https://github.com/developmentseed/tipg/pull/87)
- handling functions that are interpreted as collections but lack parameters (author @jackharrhy, https://github.com/developmentseed/tipg/pull/96)
- fixed a bug where Numeric/Decimal postgres datatype could not get serialized by orjson. They will now be encoded as string (author @RemcoMeeuwissen, https://github.com/developmentseed/tipg/pull/89)

### Added

- added popups to leaflet maps on `items` and `item` page. (author @krishnaglodha & @jackharrhy, https://github.com/developmentseed/tipg/pull/91, https://github.com/developmentseed/tipg/pull/94)
- `catalog_dependency` to retrieve the list of collections (defaults to `tipg.dependencies.CatalogParams`)

### Changed

- pin `geojson-pydantic` to `>=0.4.3,<1.0` to avoid geojson-pydantic breaking changes
- pin `pydantic` to `~=1.0`

## [0.2.0] - 2023-06-22

### Changed

- rename `tipg.db` -> `tipg.database`
- rename `tipg.dbmodel` -> `tipg.collections`
- rename `tipg.dbmodel.Database` -> `tipg.collections.Catalog`
- move `register_collection_catalog` from `tipg.dbmodel` to `tipg.collections`

  ```python
  # before
  from tipg.db import close_db_connection, connect_to_db
  from tipg.db import register_collection_catalog
  from tipg.dbmodel import Database, Collection

  # now
  from tipg.collections import Catalog, Collection
  from tipg.collections import register_collection_catalog
  from tipg.database import close_db_connection, connect_to_db
  ```

### Removed

- remove useless `app.state.db_settings`

## [0.1.0] - 2023-06-15

- Initial release

[unreleased]: https://github.com/developmentseed/tipg/compare/0.3.1...HEAD
[0.3.1]: https://github.com/developmentseed/tipg/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/developmentseed/tipg/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/developmentseed/tipg/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/developmentseed/tipg/compare/9ca80c0bd57d8ce57e37c1709e26d1af1559bc1e...0.1.0
