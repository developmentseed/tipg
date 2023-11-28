# Release Notes

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

Note: Minor version `0.X.0` update might break the API, It's recommended to pin `tipg` to minor version: `tipg>=0.1,<0.2`

## [0.5.2] - 2023-11-28

- add `TIPG_DB_SPATIAL_EXTENT` and `TIPG_DB_DATETIME_EXTENT` environment options to control if `tipg` will scan the tables for spatio-temporal extents (author @hrodmn, https://github.com/developmentseed/tipg/pull/143)

## [0.5.1] - 2023-11-15

### fixed

- fix for using `is null` in CQL2 filter (https://github.com/developmentseed/tipg/pull/140)

## [0.5.0] - 2023-11-02

### added

- add `py.typed` file

- add `tipg.collections.ItemList` and `tipg.collections.CollectionList` *TypedDict*

    ```python
    class ItemList(TypedDict):
        """Items."""

        items: List[Feature]
        matched: Optional[int]
        next: Optional[int]
        prev: Optional[int]

    class CollectionList(TypedDict):
        """Collections."""

        collections: List[Collection]
        matched: Optional[int]
        next: Optional[int]
        prev: Optional[int]
    ```

### fixed

- hide map element in HTML pages when collections/items do not have spatial component (https://github.com/developmentseed/tipg/issues/132)

- exclude/include tables and functions (https://github.com/developmentseed/tipg/issues/130)

### changed

- split endpoints registration for more customization

    ```python
    # before
    class OGCFeaturesFactory(EndpointsFactory):

        def register_routes(self):
            @self.router.get("/collections", ...)
            @self.router.get("/collections/{collectionId}", ...)
            ...

    # now
    class OGCFeaturesFactory(EndpointsFactory):

        def register_routes(self):
            self._collections_route()
            self._collection_route()
            self._queryables_route()
            self._items_route()
            self._item_route()

        def _collections_route(self):
            @self.router.get("/collections", ...)

        ...
    ```

- `Collection.features()` method now returns an `ItemList` dict

    ```python
    #before
    collection = Collection()
    features_collection, matched = collection.features(...)

    #now
    collection = Collection()
    items_list = collection.features(...)
    print(items_list["matched"])  # Number of matched items for the query
    print(items_list["next"])  # Next Offset
    print(items_list["prev"])  # Previous Offset
    ```
- rename `catalog_dependency` attribute to `collections_dependency`

- move the `collections_dependency` attribute from the `EndpointsFactory` to `OGCFeaturesFactory` class

- move `/collections` QueryParameters in the `CollectionsParams` dependency

- rename `CatalogParams` to `CollectionsParams`

- the `CollectionsParams` now returns a `CollectionList` object

- move `s_intersects` and `t_intersects` functions from `tipg.factory` to `tipg.dependencies`


## [0.4.4] - 2023-10-03

### fixed

- replace `string_to_table(...)` by `unnest(string_to_array(...))` to support Postgres<14

### changed

- update pydantic minimum version to >=2.4

## [0.4.3] - 2023-08-28

### fixed

- forward `catalog_dependency` in `OGCFeaturesFactory` and `OGCTilesFactory` when using `Endpoints` factory
- allow Factory's prefix with path parameter
- changed `database_url` type in `PostgresSettings` to always be of `pydantic.PostgresDsn` type
- `postgres_port` type in `PostgresSettings` to be of `integer` type
- remove additional `/` prefix for dbname when constructing the database url from individual parameters

### changed

- changed `function_parameters_query` and `properties_filter_query` from dependencies to simple callabe

## [0.4.2] - 2023-08-24

### changed

- replace stamen basemap by OSM in tiles viewer

### fixed

- `limit` option is `less than or equal to` to the `MAX_FEATURES_PER_QUERY` configuration (instead of `less than`)

## [0.4.1] - 2023-08-04

### Fixed

- set `custom_sql_directory` in `CustomSQLSettings` to `None` to ensure it can be properly optional

## [0.4.0] - 2023-08-01

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

- add global variables for conformance classes

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

[unreleased]: https://github.com/developmentseed/tipg/compare/0.5.0...HEAD
[0.5.0]: https://github.com/developmentseed/tipg/compare/0.4.4...0.5.0
[0.4.4]: https://github.com/developmentseed/tipg/compare/0.4.3...0.4.4
[0.4.3]: https://github.com/developmentseed/tipg/compare/0.4.2...0.4.3
[0.4.2]: https://github.com/developmentseed/tipg/compare/0.4.1...0.4.2
[0.4.1]: https://github.com/developmentseed/tipg/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/developmentseed/tipg/compare/0.3.1...0.4.0
[0.3.1]: https://github.com/developmentseed/tipg/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/developmentseed/tipg/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/developmentseed/tipg/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/developmentseed/tipg/compare/9ca80c0bd57d8ce57e37c1709e26d1af1559bc1e...0.1.0
