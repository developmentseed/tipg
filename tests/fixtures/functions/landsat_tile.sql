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

