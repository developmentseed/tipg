CREATE OR REPLACE FUNCTION landsat_poly_centroid(
    -- mandatory parameters
    xmin float,
    ymin float,
    xmax float,
    ymax float,
    epsg integer,
    -- additional parameters
    query_params json
)
RETURNS bytea
AS $$
DECLARE
    bounds geometry;
    tablename text;
    result bytea;
BEGIN
    WITH
    -- Create bbox enveloppe in given EPSG
    bounds AS (
        SELECT ST_MakeEnvelope(xmin, ymin, xmax, ymax, epsg) AS geom
    ),
    selected_geom AS (
        SELECT t.*
        FROM public.landsat_wrs t, bounds
        WHERE ST_Intersects(t.geom, ST_Transform(bounds.geom, 4326))
    ),
    mvtgeom AS (
      SELECT
        ST_AsMVTGeom(ST_Transform(ST_Centroid(t.geom), epsg), bounds.geom) AS geom, t.path, t.row
        FROM selected_geom t, bounds
      UNION
      SELECT ST_AsMVTGeom(ST_Transform(t.geom, epsg), bounds.geom) AS geom, t.path, t.row
        FROM selected_geom t, bounds
    )
    SELECT ST_AsMVT(mvtgeom.*, 'default')

    -- Put the query result into the result variale.
    INTO result FROM mvtgeom;

    -- Return the answer
    RETURN result;
END;
$$
LANGUAGE 'plpgsql'
IMMUTABLE -- Same inputs always give same outputs
STRICT -- Null input gets null output
PARALLEL SAFE;

COMMENT ON FUNCTION landsat_poly_centroid IS 'Return Combined Polygon/Centroid geometries from landsat table.';
