

## Landing page

Path: `/`

QueryParams:

- **f** (str, one of [`json`, `html`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/json`, `text/html`]): Select response MediaType.

Example:

```json
curl http://127.0.0.1:8081 | jq
{
  "title": "TiFeatures",
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
      "title": "Collection metadata"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/queryables",
      "rel": "queryables",
      "type": "application/schema+json",
      "title": "Collection queryables"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/items",
      "rel": "data",
      "type": "application/geo+json",
      "title": "Collection Features"
    },
    {
      "href": "http://127.0.0.1:8081/collections/{collectionId}/items/{itemId}",
      "rel": "data",
      "type": "application/geo+json",
      "title": "Collection Feature"
    }
  ]
}
```

Ref: https://docs.ogc.org/is/17-069r4/17-069r4.html#_api_landing_page

## Conformance declaration

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
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas3",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/html",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/landing-page",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/json",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/html",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/oas30",
    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/collections",
    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/simple-query",
    "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/filter,",
    "http://www.opengis.net/def/rel/ogc/1.0/queryables"
  ]
}
```

Ref: https://docs.ogc.org/is/17-069r4/17-069r4.html#_declaration_of_conformance_classes

## List Feature Collections

Path: `/collections`

QueryParams:

- **f** (str, one of [`json`, `html`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/json`, `text/html`])): Select response MediaType.

Example:

```json
curl http://127.0.0.1:8081/collections | jq
{
  "collections": [
    {
      "id": "public.countries",
      "title": "public.countries",
      "links": [
        {
          "href": "http://127.0.0.1:8081/collections/public.countries",
          "rel": "collection",
          "type": "application/json"
        },
        {
          "href": "http://127.0.0.1:8081/collections/public.countries/items",
          "rel": "items",
          "type": "application/geo+json"
        },
        {
          "href": "http://127.0.0.1:8081/collections/public.countries/queryables",
          "rel": "queryables",
          "type": "application/schema+json"
        }
      ],
      "itemType": "feature",
      "crs": [
        "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
      ]
    },
    ...
  ],
  "links": [
    {
      "href": "http://127.0.0.1:8081/",
      "rel": "parent",
      "type": "application/json"
    },
    {
      "href": "http://127.0.0.1:8081/collections",
      "rel": "self",
      "type": "application/json"
    }
  ]
}
```

Ref: https://docs.ogc.org/is/17-069r4/17-069r4.html#_collections_

## Feature Collection's Metadata

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
  "itemType": "feature",
  "crs": [
    "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
  ]
}
```

Ref: https://docs.ogc.org/is/17-069r4/17-069r4.html#_collection_


## Feature Collection's Queryables

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
    "ogc_fid": {
      "name": "ogc_fid",
      "type": "number"
    },
    "id": {
      "name": "id",
      "type": "string"
    },
    "pr": {
      "name": "pr",
      "type": "string"
    },
    "path": {
      "name": "path",
      "type": "number"
    },
    "row": {
      "name": "row",
      "type": "number"
    }
  },
  "type": "object",
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "http://127.0.0.1:8081/collections/public.landsat_wrs/queryables"
}
```

Ref: http://docs.ogc.org/DRAFTS/19-079r1.html#filter-queryables

## Features

Path: `/collections/{collectionId}/items`

PathParams:

- **collectionId** (str): Feature Collection Id

QueryParams:

- **limit** (int): Limits the number of features in the response. Defaults to 10.
- **offset** (int): Features offset.
- **bbox** (str): Coma (,) delimited bbox coordinates to spatially filter features in `minx,miny,maxx,maxy` form.
- **datetime** (str): Single datetime or `/` delimited datetime intervals to temporally filter features.

    - interval-bounded            = `date-time/date-time`
    - interval-half-bounded-start = `../date-time`
    - interval-half-bounded-end   = `date-time/..`
    - datetime                    = `date-time`

- **ids** * (str): Coma (,) delimited list of item Ids.
- **properties** * (str): Coma (,) delimited list of item properties to return in each feature.
- **filter** (str): CQL2 filter as defined by https://docs.ogc.org/DRAFTS/19-079r1.html#rc_filter
- **filter-lang** (str, one of [`cql2-text`, `cql2-json`]): `Filter` language. Defaults to `cql2-text`.
- **geom-column** * (str): Select geometry column to apply filter on and to create geometry from.
- **datetime-column** * (str): Select datetime column to apply filter on.
- **bbox-only**  * (bool): Only return the bounding box of the feature.
- **simplify** * (float): Simplify the output geometry to given threshold in decimal degrees.

- **f** (str, one of [`geojson`, `html`, `json`, `csv`, `geojsonseq`, `ndjson`]): Select response MediaType.

HeaderParams:

- **accept** (str, one of [`application/geo+json`, `text/html`, `application/json`, `text/csv`, `application/geo+json-seq`, `application/ndjson`])): Select response MediaType.

\*  **Not in OGC API Features Specification**

!!! Important
    Additional query-parameters (form `PROP=VALUE`) will be considered as a **property filter**.
    Properties (`PROP`) not matching collection's column will be ignored.

Example:

- `http://127.0.0.1:8081/collections/public.countries/items`
- `http://127.0.0.1:8081/collections/public.countries/items?limit=1` *limit to only 1 feature*
- `http://127.0.0.1:8081/collections/public.countries/items?limit=1&offset=2` *limit to only 1 feature and add offset 2 (return the third feature of the collection)*
- `http://127.0.0.1:8081/collections/public.countries/items?bbox=-94.702148,34.488448,-85.429688,41.112469` *limit result to a specific bbox*.
- `http://127.0.0.1:8081/collections/public.countries/items?ids=1,2,3` *limit result to ids `1`, `2` and `3`*
- `http://127.0.0.1:8081/collections/public.countries/items?properties=name` *only return `name` property*

- **Property Filter**
  - `http://127.0.0.1:8081/collections/public.countries/items?name=Zimbabwe` *only return features where property `name==Zimbabwe`*

- **Datetime**
  - `http://127.0.0.1:8081/collections/public.countries/items?datetime=2004-10-19T10:23:54Z` *return features with datetime column with value `==2004-10-19T10:23:54Z`*.
  - `http://127.0.0.1:8081/collections/public.countries/items?datetime=../2004-10-19T10:23:54Z` *return features with datetime column with value `<=2004-10-19T10:23:54Z`*.
  - `http://127.0.0.1:8081/collections/public.countries/items?datetime=2004-10-19T10:23:54Z/..` *return features with datetime column with value `>=2004-10-19T10:23:54Z`*.
  - `http://127.0.0.1:8081/collections/public.countries/items?datetime=2004-10-19T10:23:54Z/2004-10-20T10:23:54Z` *return features with datetime column with value between `2004-10-19T10:23:54Z` and `2004-10-20T10:23:54Z`*.

- **CQL2**
  - `http://127.0.0.1:8081/collections/public.countries/items?filter-lang=cql2-json&filter={"op":"=","args":[{"property":"ogc_fid"},1]}`
  - `http://127.0.0.1:8081/collections/public.countries/items?filter-lang=cql2-text&filter=ogc_fid=1`

Ref: https://docs.ogc.org/is/17-069r4/17-069r4.html#_items_ and https://docs.ogc.org/DRAFTS/19-079r1.html#filter-param


## Feature

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

Example:

```json
{
  "type": "Feature",
  "geometry": {
    "coordinates": [...]
    "type": "MultiPolygon"
  },
  "properties": {
    "gid": 1,
    "name": "Zimbabwe",
    ...
  },
  "id": "1",
  "links": [
    {
      "href": "http://127.0.0.1:8081/collections/public.countries",
      "rel": "collection",
      "type": "application/json"
    },
    {
      "href": "http://127.0.0.1:8081/collections/public.countries/items/1",
      "rel": "self",
      "type": "application/geo+json"
    }
  ]
}
```

Ref: https://docs.ogc.org/is/17-069r4/17-069r4.html#_feature_
