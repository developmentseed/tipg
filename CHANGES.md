# Release Notes

## Unreleased
Add options to reduce the bandwidth required for returning record geometries.
 - bbox-only=[bool] only return the bounding box in the return geometry
 - geom-column=none don't return geometry as part of the return
 - simplify=[float] Use ST_SnapToGrid(ST_Simplify(geom, [simplify]),[simplify]) to simplify and reduce precision of output geometry.
 - sortby=[+/-][field] support to sorting by a field

## 0.1.0

Initial release
