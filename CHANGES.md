# Release Notes

## 0.1.0a2 (2022-11-21)

* fix package metadata

## 0.1.0a0 (2022-11-16)

* OGC Feature API Part 1: Core  (https://docs.ogc.org/is/17-069r4/17-069r4.html)
* OGC Feature API Part 3: Filtering / CQL2 (https://docs.ogc.org/DRAFTS/19-079r1.html)
* Support multiple output format (json, html, geojson, ndjson, csv, geojson-seg)
* geometry column selection
* datetime column selection
* primary key column selection
* output property filter
* options to reduce the bandwidth required for returning record geometries.
    - bbox-only=[bool] only return the bounding box in the return geometry
    - geom-column=none don't return geometry as part of the return
    - simplify=[float] Use ST_SnapToGrid(ST_Simplify(geom, [simplify]),[simplify]) to simplify and reduce precision of output geometry.
    - sortby=[+/-][field] support to sorting by a field
* ability to use user defined PostgreSQL functions as per the "custom functions" spec in CQL2.
