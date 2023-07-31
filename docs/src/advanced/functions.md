

`SQL Functions` are any procedural functions defined in the database that match the following criteria:

  - Must be defined to return `SETOF`
  - Functions defined to return `RECORD` must include typed OUT definitions in the function signature
  - All arguments (`IN` and `OUT`) must be named
  - Functions that return a `geometry` will be usable as Features and Vector Tiles, those that do not, will be available to return json/csv
  - Functions that match these qualifications will be found based on the DB visibility settings (schemas)

`SQL Function` arguments will be exposed to the items API as query parameters. Any argument that does not have a default will be required and will return an error if not set as a query parameter. Functions should have a unique name. Function overloading by argument type is not currently supported.

If a function is defined to have `z`, `x`, or `y` parameters, those will be filled from the path parameters in requests to Tile endpoints. If a function has a `bounds` parameter, that will be populated by the Tile bounding box in requests to Tile endpoints. All other arguments will be filled from query parameters matching the name of the argument and cast to the appropriate types.

At startup, `tipg` application will look for any SQL functions with the above signature and then get displayed as `Collections`:

```bash
curl -s http://127.0.0.1:8000/collections\?f\=json | jq -r '.collections[].id' | grep "public.st_"
public.st_squaregrid
public.st_hexagongrid
public.st_subdivide
```

Note: By default, `tipg` should find `st_squaregrid`, `st_hexagongrid`, and `st_subdivide` functions when using the `public` schema from PostGIS

!!! important

    `SQL Functions` can be pre-existent in the database, or you can tell `tipg` to **register** SQL code dynamically to the `pg_temp` schema at startup, see [customization](../customization/#sql-functions)


### FUNCTION examples

With `geometry` input:

```SQL
CREATE FUNCTION hexagons(
    IN size int DEFAULT 10,
    IN bounds geometry DEFAULT 'srid=4326;POLYGON((-180 -90,-180 90,180 90,180 -90,-180 -90))'::geometry,
    OUT geom geometry,
    OUT i integer,
    OUT j integer
) RETURNS SETOF RECORD AS $$
    SELECT * FROM st_hexagongrid(size, bounds);
$$ LANGUAGE SQL IMMUTABLE PARALLEL SAFE;
```

Only returning geometries:

```sql
CREATE FUNCTION hexagons(
    IN size int DEFAULT 10,
    IN bounds geometry DEFAULT 'srid=4326;POLYGON((-180 -90,-180 90,180 90,180 -90,-180 -90))'::geometry,
    OUT geom geometry,
) RETURNS SETOF geometry AS $$
    SELECT geom FROM st_hexagongrid(size, bounds);
$$ LANGUAGE SQL IMMUTABLE PARALLEL SAFE;
```

With `x`, `y`, `z` input:

```sql
CREATE FUNCTION landsat(
    IN z int,
    IN x int,
    IN y int,
    IN p int default 0,
    OUT path_row text,
    OUT grid_path int,
    OUT grid_row int,
    OUT geom geometry
) RETURNS SETOF RECORD AS $$
    SELECT pr as path_row, path as grid_path, row AS grid_row, geom FROM public.landsat_wrs WHERE path = p AND ST_Intersects(geom, ST_Transform(ST_TileEnvelope(z, x, y), 4326));
$$ LANGUAGE SQL IMMUTABLE PARALLEL SAFE;
```

```bash
curl -s http://127.0.0.1:8000/collections/pg_temp.landsat/queryables?f=schemajson | jq

{
  "title": "pg_temp.landsat",
  "properties": {
    "geom": {
      "$ref": "https://geojson.org/schema/Geometry.json"
    },
    "grid_path": {
      "name": "grid_path",
      "type": "number"
    },
    "grid_row": {
      "name": "grid_row",
      "type": "number"
    },
    "path_row": {
      "name": "path_row",
      "type": "string"
    }
  },
  "type": "object",
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "http://127.0.0.1:8000/collections/pg_temp.landsat/queryables?f=schemajson"
}
```

### VIEW example

```sql
CREATE OR REPLACE VIEW landsat_centroids AS
SELECT ogc_fid, pr, st_pointonsurface(geom) as geom, path, row
FROM public.landsat_wrs;
```

```bash
curl -s http://127.0.0.1:8000/collections/pg_temp.landsat_centroids/queryables?f=schemajson | jq
{
  "title": "pg_temp.landsat_centroids",
  "properties": {
    "geom": {
      "$ref": "https://geojson.org/schema/Geometry.json"
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
  "$id": "http://127.0.0.1:8000/collections/pg_temp.landsat_centroids/queryables?f=schemajson"
}
```
