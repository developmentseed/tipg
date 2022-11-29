-- Custom "hexagon" layer
-- Adapted from https://github.com/CrunchyData/pg_tileserv
--
--
-- Given an input ZXY tile coordinate, output a set of hexagons
-- (and hexagon coordinates) in web mercator that cover that tile
CREATE OR REPLACE FUNCTION tilehexagons(
    bounds geometry,
    step integer,
    epsg integer,
    OUT geom geometry(Polygon, 3857), OUT i integer, OUT j integer)
RETURNS SETOF record AS $$
DECLARE
    maxbounds geometry := ST_TileEnvelope(0, 0, 0);
    edge float8;
BEGIN
    edge := (ST_XMax(bounds) - ST_XMin(bounds)) / pow(2, step);
    FOR geom, i, j IN
    SELECT ST_SetSRID(hexagon(h.i, h.j, edge), epsg), h.i, h.j
    FROM hexagoncoordinates(bounds, edge) h
    LOOP
        IF maxbounds ~ geom AND bounds && geom THEN
            RETURN NEXT;
        END IF;
    END LOOP;
END;
$$
LANGUAGE 'plpgsql'
IMMUTABLE
STRICT
PARALLEL SAFE;

-- Given coordinates in the hexagon tiling that has this
-- edge size, return the built-out hexagon
CREATE OR REPLACE FUNCTION hexagon(
    i integer,
    j integer,
    edge float8
)
RETURNS geometry AS $$
DECLARE
    h float8 := edge*cos(pi()/6.0);
    cx float8 := 1.5*i*edge;
    cy float8 := h*(2*j+abs(i%2));
BEGIN
RETURN ST_MakePolygon(ST_MakeLine(ARRAY[
            ST_MakePoint(cx - 1.0*edge, cy + 0),
            ST_MakePoint(cx - 0.5*edge, cy + -1*h),
            ST_MakePoint(cx + 0.5*edge, cy + -1*h),
            ST_MakePoint(cx + 1.0*edge, cy + 0),
            ST_MakePoint(cx + 0.5*edge, cy + h),
            ST_MakePoint(cx - 0.5*edge, cy + h),
            ST_MakePoint(cx - 1.0*edge, cy + 0)
        ]));
END;
$$
LANGUAGE 'plpgsql'
IMMUTABLE
STRICT
PARALLEL SAFE;

-- Given a square bounds, find all the hexagonal cells
-- of a hex tiling (determined by edge size)
-- that might cover that square (slightly over-determined)
CREATE OR REPLACE FUNCTION hexagoncoordinates(
    bounds geometry,
    edge float8,
    OUT i integer,
    OUT j integer
)
RETURNS SETOF record AS $$
DECLARE
    h float8 := edge*cos(pi()/6);
    mini integer := floor(st_xmin(bounds) / (1.5*edge));
    minj integer := floor(st_ymin(bounds) / (2*h));
    maxi integer := ceil(st_xmax(bounds) / (1.5*edge));
    maxj integer := ceil(st_ymax(bounds) / (2*h));
BEGIN
    FOR i, j IN
    SELECT a, b
    FROM generate_series(mini, maxi) a,
         generate_series(minj, maxj) b
    LOOP
        RETURN NEXT;
    END LOOP;
END;
$$
LANGUAGE 'plpgsql'
IMMUTABLE
STRICT
PARALLEL SAFE;

-- Given an input tile, generate the covering hexagons Step parameter determines
-- how many hexagons to generate per tile.
CREATE OR REPLACE FUNCTION hexagon(
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
    step integer;
    bounds geometry;
BEGIN
    -- Find the bbox bounds
    bounds := ST_MakeEnvelope(xmin, ymin, xmax, ymax, epsg);

    step := coalesce((query_params ->> 'step')::int, 4);

    WITH
    rows AS (
        -- All the hexes that interact with this tile
        SELECT h.i, h.j, h.geom
        FROM TileHexagons(bounds, step, epsg) h
    ),
    mvt AS (
        -- Usual tile processing, ST_AsMVTGeom simplifies, quantizes,
        -- and clips to tile boundary
        SELECT ST_AsMVTGeom(rows.geom, bounds) AS geom, rows.i, rows.j
        FROM rows
    )
    -- Generate MVT encoding of final input record
    SELECT ST_AsMVT(mvt, 'default')
    INTO result
    FROM mvt;

    RETURN result;
END;
$$
LANGUAGE 'plpgsql'
STABLE
STRICT
PARALLEL SAFE;

