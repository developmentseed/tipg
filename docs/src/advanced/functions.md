
`tipg` supports custom Function layers which can be SQL [`VIEWS`](https://www.postgresql.org/docs/current/tutorial-views.html) or [`FUNCTION`](https://www.postgresql.org/docs/current/typeconv-func.html).


If provided (see [customization](https://developmentseed.org/tipg/advanced/customization/#sql-functions)), when starting `tipg` will look for the functions with a [suitable signature](https://github.com/developmentseed/tipg/blob/2543707238a97a0527effff710a83f9bea66440f/tipg/sql/dbcatalog.sql#L258-L267).

Functions can be used in both OGC Tiles and OGC Features APIs.

!!! important
    The SQL functions won't be `hardcoded` within the database but stored in the [`pg_temp` schema](https://www.postgresql.org/docs/current/runtime-config-client.html). This configuration enables `functions version control` and also avoid needing `write` permission on the database.

```bash
curl -s http://127.0.0.1:8081/collections\?f\=json | jq -r '.collections[].id' | grep "pg_temp"
pg_temp.landsat_centroids
pg_temp.hexagons_g
pg_temp.hexagons
pg_temp.squares
pg_temp.landsat
```


### FUNCTION example

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

See https://developmentseed.org/tipg/advanced/customization/#sql-functions to see how to register SQL functions to the application
