# Release Notes

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

Note: Minor version `0.X.0` update might break the API, It's recommended to pin `tipg` to minor version: `tipg>=0.1,<0.2`

## unreleased

### Added

- `type` query parameter to filter collections based on their type (`Function` or `Table`)
- fixed a small bug in the `tipg_properties` SQL function where the bounds property was not properly transformed to 4326 (author @RemcoMeeuwissen, https://github.com/developmentseed/tipg/pull/87)
- fixed a bug where orjson could not properly serialize float values present in the properties of a feature (author @RemcoMeeuwissen, https://github.com/developmentseed/tipg/pull/89)

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

[unreleased]: https://github.com/developmentseed/tipg/compare/0.2.0...HEAD
[0.2.0]: https://github.com/developmentseed/tipg/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/developmentseed/tipg/compare/9ca80c0bd57d8ce57e37c1709e26d1af1559bc1e...0.1.0
