CREATE FUNCTION squares(
    IN size int DEFAULT 10,
    IN bounds geometry DEFAULT 'srid=4326;POLYGON((-180 -90,-180 90,180 90,180 -90,-180 -90))'::geometry,
    OUT geom geometry,
    OUT i integer,
    OUT j integer
) RETURNS SETOF RECORD AS $$
    SELECT * FROM st_squaregrid(size, bounds);
$$ LANGUAGE SQL IMMUTABLE PARALLEL SAFE;
