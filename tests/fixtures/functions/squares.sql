CREATE OR REPLACE FUNCTION squares(
    -- mandatory parameters
    xmin float,
    ymin float,
    xmax float,
    ymax float,
    epsg integer,
    -- additional parameters
    query_params json
)
RETURNS bytea AS $$
DECLARE
    result bytea;
    sq_width float;
    bbox_xmin float;
    bbox_ymin float;
    bounds geometry;
    depth integer;
BEGIN
    -- Find the bbox bounds
    bounds := ST_MakeEnvelope(xmin, ymin, xmax, ymax, epsg);

    -- Find the bottom corner of the bounds
    bbox_xmin := ST_XMin(bounds);
    bbox_ymin := ST_YMin(bounds);

    -- We want bbox divided up into depth*depth squares per bbox,
    -- so what is the width of a square?
    depth := coalesce((query_params ->> 'depth')::int, 2);

    sq_width := (ST_XMax(bounds) - ST_XMin(bounds)) / depth;

    WITH mvtgeom AS (
        SELECT
            -- Fill in the bbox with all the squares
            ST_AsMVTGeom(
                ST_SetSRID(
                    ST_MakeEnvelope(
                        bbox_xmin + sq_width * (a - 1),
                        bbox_ymin + sq_width * (b - 1),
                        bbox_xmin + sq_width * a,
                        bbox_ymin + sq_width * b
                    ),
                    epsg
                ),
                bounds
            )

        -- Drive the square generator with a two-dimensional
        -- generate_series setup
        FROM generate_series(1, depth) a, generate_series(1, depth) b
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
