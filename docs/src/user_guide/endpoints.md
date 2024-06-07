
## OGC Common

### Landing page

Path: `/`

QueryParams:

- **f** (str, one of [`json`, `html`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/json`, `text/html`]): Select response MediaType.

Example:

```json
curl http://127.0.0.1:8081 | jq
{
  "title": "TiPg: OGC Features and Tiles API",
  "links": [
    {
      "href": "http://127.0.0.1:8081/",
      "rel": "self",
      "type": "application/json",
      "title": "Landing Page"
    },
    {
      "href": "http://127.0.0.1:8081/api",
      "rel": "service-desc",
      "type": "application/vnd.oai.openapi+json;version=3.0",
      "title": "the API definition (JSON)"
    },
    {
      "href": "http://127.0.0.1:8081/api.html",
      "rel": "service-doc",
      "type": "text/html",
      "title": "the API documentation"
    },
    {
      "href": "http://127.0.0.1:8081/conformance",
      "rel": "conformance",
      "type": "application/json",
      "title": "Conformance"
    },
    {
      "href": "http://127.0.0.1:8081/collections",
      "rel": "data",
      "type": "application/json",
      "title": "List of Collections"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}",
      "rel": "data",
      "type": "application/json",
      "templated": true,
      "title": "Collection metadata (Template URL)"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/queryables",
      "rel": "queryables",
      "type": "application/schema+json",
      "templated": true,
      "title": "Collection queryables (Template URL)"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/items",
      "rel": "data",
      "type": "application/geo+json",
      "templated": true,
      "title": "Collection Features (Template URL)"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/items/{itemId}",
      "rel": "data",
      "type": "application/geo+json",
      "templated": true,
      "title": "Collection Feature (Template URL)"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/tiles/{z}/{x}/{y}",
      "rel": "data",
      "type": "application/vnd.mapbox-vector-tile",
      "templated": true,
      "title": "Collection Vector Tiles (Template URL)"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/tiles",
      "rel": "data",
      "type": "application/json",
      "templated": true,
      "title": "Collection TileSets (Template URL)"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/tiles/{tileMatrixSetId}",
      "rel": "data",
      "type": "application/json",
      "templated": true,
      "title": "Collection TileSet (Template URL)"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/tiles/{tileMatrixSetId}/viewer",
      "rel": "data",
      "type": "text/html",
      "templated": true,
      "title": "Collection Map viewer (Template URL)"
    },
    {
      "href": "http://127.0.0.1:8081/tileMatrixSets",
      "rel": "data",
      "type": "application/json",
      "title": "TileMatrixSets"
    },
    {
      "href": "http://127.0.0.1:8081/tileMatrixSets/{tileMatrixSetId}",
      "rel": "data",
      "type": "application/json",
      "templated": true,
      "title": "TileMatrixSet (Template URL)"
    }
  ]
}
```

Ref: [https://docs.ogc.org/is/17-069r4/17-069r4.html#_api_landing_page](https://docs.ogc.org/is/17-069r4/17-069r4.html#_api_landing_page)

### Conformance declaration

Path: `/conformance`

QueryParams:

- **f** (str, one of [`json`, `html`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/json`, `text/html`])): Select response MediaType.

Example:

```json
curl http://127.0.0.1:8081/conformance | jq
{
  "conformsTo": [
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/landingPage",
    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/collections",
    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/simple-query",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/json",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/html",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/oas30",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/html",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson",
    "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/filter",
    "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/features-filter",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/oas30",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/mvt",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tileset",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tilesets-list"
  ]
}
```

Ref: [https://docs.ogc.org/is/17-069r4/17-069r4.html#_declaration_of_conformance_classes](https://docs.ogc.org/is/17-069r4/17-069r4.html#_declaration_of_conformance_classes)

---

## OGC Features API

### List Feature Collections

Path: `/collections`

QueryParams:

- **limit** (int): Limits the number of collections in the response.
- **offset** (int): Collection's offset.
- **bbox** (str): Comma (,) delimited bbox coordinates to spatially filter collection in `minx,miny,maxx,maxy` form.
- **datetime** (str): Single datetime or `/` delimited datetime intervals to temporally filter features.

    - interval-bounded            = `date-time/date-time`
    - interval-half-bounded-start = `../date-time`
    - interval-half-bounded-end   = `date-time/..`
    - datetime                    = `date-time`

- **type** * ("Function" or "Table"): Filter collections based on their `type`.

- **f** (str, one of [`json`, `html`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/json`, `text/html`])): Select response MediaType.

\*  **Not in OGC API Features Specification**

Example:

```json
curl http://127.0.0.1:8081/collections?limit=1&offset=2 | jq
{
  "links": [
    {
      "href": "http://127.0.0.1:8081/collections",
      "rel": "self",
      "type": "application/json"
    },
    {
      "href": "http://127.0.0.1:8081/collections?limit=1&offset=3&f=json",
      "rel": "next",
      "type": "application/json",
      "title": "Next page"
    },
    {
      "href": "http://127.0.0.1:8081/collections?limit=1&f=json&offset=1",
      "rel": "prev",
      "type": "application/json",
      "title": "Previous page"
    }
  ],
  "numberMatched": 7,
  "numberReturned": 1,
  "collections": [
    {
      "id": "public.gg_gemeindegrenze_mv",
      "title": "public.gg_gemeindegrenze_mv",
      "links": [
        {
          "href": "http://127.0.0.1:8081/collections/public.gg_gemeindegrenze_mv",
          "rel": "collection",
          "type": "application/json"
        },
        {
          "href": "http://127.0.0.1:8081/collections/public.gg_gemeindegrenze_mv/items",
          "rel": "items",
          "type": "application/geo+json"
        },
        {
          "href": "http://127.0.0.1:8081/collections/public.gg_gemeindegrenze_mv/queryables",
          "rel": "queryables",
          "type": "application/schema+json"
        }
      ],
      "extent": {
        "spatial": {
          "bbox": [
            [
              8.661115396174294,
              47.367809019968455,
              9.4846396724923,
              47.69564287160094
            ]
          ],
          "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
        }
      },
      "itemType": "feature",
      "crs": [
        "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
      ]
    }
  ]
}
```

Ref: [https://docs.ogc.org/is/17-069r4/17-069r4.html#_collections_](https://docs.ogc.org/is/17-069r4/17-069r4.html#_collections_)

### Feature Collection's Metadata

Path: `/collections/{collectionId}`

PathParams:

- **collectionId** (str): Feature Collection Id

QueryParams:

- **f** (str, one of [`json`, `html`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/json`, `text/html`])): Select response MediaType.

Example:

```json
curl http://127.0.0.1:8081/collections/public.countries | jq
{
  "id": "public.countries",
  "title": "public.countries",
  "links": [
    {
      "href": "http://127.0.0.1:8081/collections/public.countries",
      "rel": "self",
      "type": "application/json"
    },
    {
      "href": "http://127.0.0.1:8081/collections/public.countries/items",
      "rel": "items",
      "type": "application/geo+json",
      "title": "Items"
    },
    {
      "href": "http://127.0.0.1:8081/collections/public.countries/items?f=csv",
      "rel": "alternate",
      "type": "text/csv",
      "title": "Items (CSV)"
    },
    {
      "href": "http://127.0.0.1:8081/collections/public.countries/items?f=geojsonseq",
      "rel": "alternate",
      "type": "application/geo+json-seq",
      "title": "Items (GeoJSONSeq)"
    },
    {
      "href": "http://127.0.0.1:8081/collections/public.countries/queryables",
      "rel": "queryables",
      "type": "application/schema+json",
      "title": "Queryables"
    }
  ],
  "extent": {
    "spatial": {
      "bbox": [
        [
          -180,
          -89.99892578125002,
          180,
          83.599609375
        ]
      ],
      "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
    }
  },
  "itemType": "feature",
  "crs": [
    "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
  ]
}
```

Ref: [https://docs.ogc.org/is/17-069r4/17-069r4.html#_collection_](https://docs.ogc.org/is/17-069r4/17-069r4.html#_collection_)


### Feature Collection's Queryables

Path: `/collections/{collectionId}/queryables`

PathParams:

- **collectionId** (str): Feature Collection Id

QueryParams:

- **f** (str, one of [`json`, `html`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/json`, `text/html`])): Select response MediaType.

Example:

```json
curl http://127.0.0.1:8081/collections/public.landsat_wrs/queryables | jq
{
  "title": "public.landsat_wrs",
  "properties": {
    "geom": {
      "$ref": "https://geojson.org/schema/Geometry.json"
    },
    "id": {
      "name": "id",
      "type": "string"
    },
    "ogc_fid": {
      "name": "ogc_fid",
      "type": "number"
    },
    "path": {
      "name": "path",
      "type": "number"
    },
    "pr": {
      "name": "pr",
      "type": "string"
    },
    "row": {
      "name": "row",
      "type": "number"
    }
  },
  "type": "object",
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "http://127.0.0.1:8081/collections/public.landsat_wrs/queryables?f=schemajson"
}
```

Ref: [http://docs.ogc.org/DRAFTS/19-079r1.html#filter-queryables](http://docs.ogc.org/DRAFTS/19-079r1.html#filter-queryables)

### Features

Path: `/collections/{collectionId}/items`

PathParams:

- **collectionId** (str): Feature Collection Id

QueryParams:

- **limit** (int): Limits the number of features in the response. Defaults to 10.
- **offset** (int): Features offset.
- **bbox** (str): Comma (,) delimited bbox coordinates to spatially filter features in `minx,miny,maxx,maxy` form.
- **datetime** (str): Single datetime or `/` delimited datetime intervals to temporally filter features.

    - interval-bounded            = `date-time/date-time`
    - interval-half-bounded-start = `../date-time`
    - interval-half-bounded-end   = `date-time/..`
    - datetime                    = `date-time`

- **ids** * (str): Comma (,) delimited list of item Ids.
- **properties** * (str): Comma (,) delimited list of item properties to return in each feature.
- **filter** (str): CQL2 filter as defined by https://docs.ogc.org/DRAFTS/19-079r1.html#rc_filter
- **filter-lang** (str, one of [`cql2-text`, `cql2-json`]): `Filter` language. Defaults to `cql2-text`.
- **geom-column** * (str): Select geometry column to apply filter on and to create geometry from.
- **datetime-column** * (str): Select datetime column to apply filter on.
- **sortby** (str): Sort the items by a specific column (ascending (default) or descending). argument should be in form of `-/+{column}`.
- **bbox-only**  * (bool): Only return the bounding box of the feature.
- **simplify** * (float): Simplify the output geometry to given threshold in decimal degrees.

- **f** (str, one of [`geojson`, `html`, `json`, `csv`, `geojsonseq`, `ndjson`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/geo+json`, `text/html`, `application/json`, `text/csv`, `application/geo+json-seq`, `application/ndjson`])): Select response MediaType.

\*  **Not in OGC API Features Specification**

!!! Important
    Additional query-parameters (form `PROP=VALUE`) will be considered as a **property filter**.
    Properties (`PROP`) not matching collection's column will be ignored.

!!! Tricks

    `geom-column=None` will return a response without geometry information

Example:

- `http://127.0.0.1:8081/collections/public.countries/items`
- `http://127.0.0.1:8081/collections/public.countries/items?limit=1` *limit to only 1 feature*
- `http://127.0.0.1:8081/collections/public.countries/items?limit=1&offset=2` *limit to only 1 feature and add offset 2 (return the third feature of the collection)*
- `http://127.0.0.1:8081/collections/public.countries/items?sortby=-name` *sort countries by name in the descending order
- `http://127.0.0.1:8081/collections/public.countries/items?bbox=-94.702148,34.488448,-85.429688,41.112469` *limit result to a specific bbox*.
- `http://127.0.0.1:8081/collections/public.countries/items?ids=1,2,3` *limit result to ids `1`, `2` and `3`*
- `http://127.0.0.1:8081/collections/public.countries/items?properties=name` *only return `name` property*

**Property Filter**

  - `http://127.0.0.1:8081/collections/public.countries/items?name=Zimbabwe` *only return features where property `name==Zimbabwe`*

**Datetime**

  - `http://127.0.0.1:8081/collections/public.countries/items?datetime=2004-10-19T10:23:54Z` *return features with datetime column with value `==2004-10-19T10:23:54Z`*.
  - `http://127.0.0.1:8081/collections/public.countries/items?datetime=../2004-10-19T10:23:54Z` *return features with datetime column with value `<=2004-10-19T10:23:54Z`*.
  - `http://127.0.0.1:8081/collections/public.countries/items?datetime=2004-10-19T10:23:54Z/..` *return features with datetime column with value `>=2004-10-19T10:23:54Z`*.
  - `http://127.0.0.1:8081/collections/public.countries/items?datetime=2004-10-19T10:23:54Z/2004-10-20T10:23:54Z` *return features with datetime column with value between `2004-10-19T10:23:54Z` and `2004-10-20T10:23:54Z`*.

**CQL2**

  - `http://127.0.0.1:8081/collections/public.countries/items?filter-lang=cql2-json&filter={"op":"=","args":[{"property":"ogc_fid"},1]}`
  - `http://127.0.0.1:8081/collections/public.countries/items?filter-lang=cql2-text&filter=ogc_fid=1`

Ref: [https://docs.ogc.org/is/17-069r4/17-069r4.html#_items_](https://docs.ogc.org/is/17-069r4/17-069r4.html#_items_) and [https://docs.ogc.org/DRAFTS/19-079r1.html#filter-param](https://docs.ogc.org/DRAFTS/19-079r1.html#filter-param)


### Feature

Path: `/collections/{collectionId}/items/{itemId}`

PathParams:

- **collectionId** (str): Feature Collection Id
- **itemId** (str): Feature Id

QueryParams:

- **geom-column** * (str): Select geometry column to create geometry from.
- **bbox-only**  * (bool): Only return the bounding box of the feature.
- **simplify** * (float): Simplify the output geometry to given threshold in decimal degrees.

- **f** (str, one of [`geojson`, `html`, `json`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/geo+json`, `text/html`, `application/json`])): Select response MediaType.

\*  **Not in OGC API Features Specification**

Example:

```json
curl http://127.0.0.1:8081/collections/public.countries/items/6 | jq
{
  "type": "Feature",
  "geometry": {
    "type": "MultiPolygon",
    "coordinates": [
      [
        [
          [
            12.439160156,
            41.898388672
          ],
          [
            12.430566406,
            41.897558594
          ],
          [
            12.427539063,
            41.900732422
          ],
          [
            12.430566406,
            41.90546875
          ],
          [
            12.438378906,
            41.906201172
          ],
          [
            12.439160156,
            41.898388672
          ]
        ]
      ]
    ]
  },
  "id": 6,
  "properties": {
    "abbrev": "Vat.",
    "abbrev_len": 4,
    "adm0_a3": "VAT",
    "adm0_a3_is": "VAT",
    "adm0_a3_un": -99,
    "adm0_a3_us": "VAT",
    "adm0_a3_wb": -99,
    "adm0_dif": 0,
    "admin": "Vatican",
    ...
  },
  "links": [
    {
      "href": "http://127.0.0.1:8081/collections/public.countries",
      "rel": "collection",
      "type": "application/json"
    },
    {
      "href": "http://127.0.0.1:8081/collections/public.countries/items/6",
      "rel": "self",
      "type": "application/geo+json"
    }
  ]
}
```

Ref: [https://docs.ogc.org/is/17-069r4/17-069r4.html#_feature_](https://docs.ogc.org/is/17-069r4/17-069r4.html#_feature_)

---

## OGC Tiles API

### Vector Tiles

Path:

- `/collections/{collectionId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}`

PathParams:

- **collectionId** (str): Feature Collection Id
- **tileMatrixSetId** (str): TileMatrixSet identifier
- **z** (int): TMS's scale (tileMatrix) identifier
- **x** (int): TMS's column (tileCol) identifier
- **y** (int): TMS's row (tileRow) identifier

QueryParams:

- **limit** (int): Limits the number of features in the response. Defaults to 10000.
- **bbox** (str): Comma (,) delimited bbox coordinates to spatially filter features in `minx,miny,maxx,maxy` form.
- **datetime** (str): Single datetime or `/` delimited datetime intervals to temporally filter features.

    - interval-bounded            = `date-time/date-time`
    - interval-half-bounded-start = `../date-time`
    - interval-half-bounded-end   = `date-time/..`
    - datetime                    = `date-time`

- **ids** * (str): Comma (,) delimited list of item Ids.
- **properties** * (str): Comma (,) delimited list of item properties to return in each feature.
- **filter** (str): CQL2 filter as defined by https://docs.ogc.org/DRAFTS/19-079r1.html#rc_filter
- **filter-lang** (str, one of [`cql2-text`, `cql2-json`]): `Filter` language. Defaults to `cql2-text`.
- **geom-column** * (str): Select geometry column to apply filter on and to create geometry from.
- **datetime-column** * (str): Select datetime column to apply filter on.
- **sortby** (str): Sort the items by a specific column (ascending (default) or descending). argument should be in form of `-/+{column}`.
- **bbox-only**  * (bool): Only return the bounding box of the feature.
- **simplify** * (float): Simplify the output geometry to given threshold in decimal degrees.

\*  **Not in OGC API Features Specification**


### Tileset list

Path:

- `/collections/{collectionId}/tiles`

PathParams:

- **collectionId** (str): Feature Collection Id

### Tileset metadata

Path:

- `/collections/{collectionId}/tiles/{tileMatrixSetId}`

PathParams:

- **collectionId** (str): Feature Collection Id
- **tileMatrixSetId** (str): TileMatrixSet identifier

### TileMatrixSets

List Available TileMatrixSets

Path:

- `/tileMatrixSets`


### TileMatrixSet

Return TileMatrixSet document

Path:

- `/tileMatrixSets/{tileMatrixSetId}`

PathParams:

- **tileMatrixSetId** (str): TileMatrixSet identifier

### TileJSON

Return a TileJSON document. **Not in OGC Tile API specification**

Path:

- `/collections/{collectionId}/{tileMatrixSetId}/tilejson.json`

PathParams:

- **collectionId** (str): Feature Collection Id
- **tileMatrixSetId** (str): TileMatrixSet identifier

QueryParams:

  - **minzoom** (int): Set TileJSON document minzoom (default is the setting default or TMS default)
  - **maxzoom** (int): Set TileJSON document maxzoom (default is the setting default or TMS default)
  - **geom-column** * (str): Select the geometry column to retrieve collection's bounds from.

!!! Important
    Additional query-parameters will be forwarded to the tiles endpoint.

\*  **Not in OGC API Tiles Specification**

Example:
```json
curl http://127.0.0.1:8081/collections/public.landsat_wrs/WebMercatorQuad/tilejson.json | jq
{
  "tilejson": "3.0.0",
  "name": "public.landsat_wrs",
  "version": "1.0.0",
  "scheme": "xyz",
  "tiles": [
    "http://127.0.0.1:8081/collections/public.landsat_wrs/tiles/WebMercatorQuad/{z}/{x}/{y}"
  ],
  "vector_layers": [
    {
      "id": "default",
      "fields": {
        "id": "string",
        "ogc_fid": "number",
        "path": "number",
        "pr": "string",
        "row": "number"
      },
      "minzoom": 0,
      "maxzoom": 22
    }
  ],
  "minzoom": 0,
  "maxzoom": 22,
  "bounds": [
    -180,
    -82.6401,
    180,
    82.6401
  ],
  "center": [
    0,
    0,
    0
  ]
}
```

### StyleJSON

Return a mapbox/maplibre StyleJSON document. **Not in OGC Tile API specification**

Path:

- `/collections/{collectionId}/{tileMatrixSetId}/style.json`

PathParams:

- **collectionId** (str): Feature Collection Id
- **tileMatrixSetId** (str): TileMatrixSet identifier

QueryParams:

  - **minzoom** (int): Set TileJSON document minzoom (default is the setting default or TMS default)
  - **maxzoom** (int): Set TileJSON document maxzoom (default is the setting default or TMS default)
  - **geom-column** * (str): Select the geometry column to retrieve collection's bounds from.

!!! Important
    Additional query-parameters will be forwarded to the tiles endpoint.

\*  **Not in OGC API Tiles Specification**

```json
// http://127.0.0.1:8081/collections/public.landsat_wrs/WebMercatorQuad/style.json
{
  "version": 8,
  "name": "TiPg",
  "layers": [
    {
      "id": "public.landsat_wrs_fill",
      "source": "public.landsat_wrs",
      "source-layer": "default",
      "type": "fill",
      "filter": [
        "==",
        [
          "geometry-type"
        ],
        "Polygon"
      ],
      "paint": {
        "fill-color": "rgba(200, 100, 240, 0.4)",
        "fill-outline-color": "#000"
      }
    },
    {
      "id": "public.landsat_wrs_stroke",
      "source": "public.landsat_wrs",
      "source-layer": "default",
      "type": "line",
      "filter": [
        "==",
        [
          "geometry-type"
        ],
        "LineString"
      ],
      "paint": {
        "line-color": "#000",
        "line-width": 1,
        "line-opacity": 0.75
      }
    },
    {
      "id": "public.landsat_wrs_point",
      "source": "public.landsat_wrs",
      "source-layer": "default",
      "type": "circle",
      "filter": [
        "==",
        [
          "geometry-type"
        ],
        "Point"
      ],
      "paint": {
        "circle-color": "#000",
        "circle-radius": 2.5,
        "circle-opacity": 0.75
      }
    }
  ],
  "sources": {
    "public.landsat_wrs": {
      "type": "vector",
      "scheme": "xyz",
      "tiles": [
        "http://127.0.0.1:8081/collections/public.landsat_wrs/tiles/WebMercatorQuad/{z}/{x}/{y}"
      ],
      "bounds": [
        -180,
        -82.6401,
        180,
        82.6401
      ],
      "minzoom": 0,
      "maxzoom": 22
    }
  },
  "center": [
    0,
    0
  ],
  "zoom": 0
}
```

### Viewer

Simple Map viewer. **Not in OGC Tile API specification**

Path:

- `/collections/{collectionId}/{tileMatrixSetId}/viewer`

PathParams:

- **collectionId** (str): Feature Collection Id
- **tileMatrixSetId** (str): TileMatrixSet identifier

QueryParams:

  - **minzoom** (int): Set TileJSON document minzoom (default is the setting default or TMS default)
  - **maxzoom** (int): Set TileJSON document maxzoom (default is the setting default or TMS default)
  - **geom-column** * (str): Select the geometry column to retrieve collection's bounds from.

!!! Important
    Additional query-parameters will be forwarded to the tiles endpoint.
