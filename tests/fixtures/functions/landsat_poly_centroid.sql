CREATE OR REPLACE VIEW landsat_centroids AS
SELECT ogc_fid, pr, st_pointonsurface(geom) as geom, path, row
FROM public.landsat_wrs;
