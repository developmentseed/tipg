"""tipg.filter: build cql2 filter expressions for the WHERE clause.

Everything here turns tipg's query parameters (ids / bbox / datetime /
properties / tile envelope) and user-supplied CQL into a single ``cql2.Expr``
that the caller renders to SQL via ``Expr.to_sql()``.
"""

from functools import reduce
from typing import TYPE_CHECKING, Any, List, Optional, Tuple

from ciso8601 import parse_rfc3339
from cql2 import Expr
from morecantile import Tile, TileMatrixSet

from tipg.errors import (
    InvalidDatetime,
    InvalidDatetimeColumnName,
    InvalidPropertyName,
    MissingDatetimeColumn,
    NotFound,
)
from tipg.sqlhelpers import TransformerFromCRS

if TYPE_CHECKING:
    from tipg.dbmodel import Collection


_INT_PG_TYPES = frozenset(
    {
        "smallint",
        "integer",
        "bigint",
        "smallserial",
        "serial",
        "bigserial",
    }
)


def _coerce_id(val: str, pg_type: str) -> Any:
    """Parse a URL-supplied id into the primary-key column's Python type.

    IDs always arrive as strings (URL path or query parameters); the
    underlying column is either text or integer. cql2 treats Python ints
    and strs as different literal kinds (and PostgreSQL ``= ANY(text[])``
    does not coerce array elements at runtime), so we normalize here.

    A non-integer string against an integer column means the id can't
    exist, so map the parse failure onto a 404 rather than letting the
    eventual PostgreSQL ``invalid input syntax`` error bubble up as a 500.
    """
    if pg_type not in _INT_PG_TYPES:
        return val
    try:
        return int(val)
    except ValueError as exc:
        raise NotFound(f"Invalid id {val!r} for {pg_type} column.") from exc


def _s_intersects_bbox(
    prop: str,
    west: float,
    south: float,
    east: float,
    north: float,
    srid: Optional[int] = None,
) -> Expr:
    """Build a cql2 S_INTERSECTS expression against a polygon envelope.

    Coordinates are taken to be in ``srid``; if ``srid`` is non-4326, the
    polygon literal is wrapped in ``ST_SetSRID`` so PostGIS does not pick
    up ``ST_GeomFromGeoJSON``'s 4326 default. Pass ``srid=None`` or
    ``srid=4326`` for the no-op case.
    """
    polygon: Any = {
        "type": "Polygon",
        "coordinates": [
            [
                [west, south],
                [east, south],
                [east, north],
                [west, north],
                [west, south],
            ]
        ],
    }
    if srid is not None and srid != 4326:
        polygon = {"op": "st_setsrid", "args": [polygon, srid]}
    return Expr({"op": "s_intersects", "args": [{"property": prop}, polygon]})


_GEOJSON_GEOMETRY_TYPES = frozenset(
    {
        "Point",
        "MultiPoint",
        "LineString",
        "MultiLineString",
        "Polygon",
        "MultiPolygon",
        "GeometryCollection",
    }
)


def _transform_cql_geom_literals(node: Any, target_srid: int) -> Any:
    """Walk a user-supplied cql2-json tree and wrap every GeoJSON geometry
    literal in ``ST_Transform(<literal>, target_srid)``.

    Per OGC API Features Part 3 Req 7, geometries in a CQL filter are
    CRS84 (≈ EPSG:4326). Wrapping the literal side (rather than the
    column side) keeps PostGIS' spatial index on the column usable and
    lets the planner fold the transform on the constant once.
    """
    if isinstance(node, dict):
        if node.get("type") in _GEOJSON_GEOMETRY_TYPES and (
            "coordinates" in node or "geometries" in node
        ):
            return {"op": "st_transform", "args": [node, target_srid]}
        return {
            k: _transform_cql_geom_literals(v, target_srid) for k, v in node.items()
        }
    if isinstance(node, list):
        return [_transform_cql_geom_literals(item, target_srid) for item in node]
    return node


def cql_where(  # noqa: C901
    collection: "Collection",
    ids: Optional[List[str]] = None,
    datetime: Optional[List[str]] = None,
    bbox: Optional[List[float]] = None,
    properties: Optional[List[Tuple[str, Any]]] = None,
    cql: Optional[Expr] = None,
    geom: Optional[str] = None,
    dt: Optional[str] = None,
    tile: Optional[Tile] = None,
    tms: Optional[TileMatrixSet] = None,
) -> Optional[Expr]:
    """Construct WHERE query as a cql2 Expr."""
    exprs: List[Expr] = []
    geometry_column = collection.get_geometry_column(geom)

    # Per OGC API Features Part 3 Req 7, geometries in `cql` and `bbox`
    # are CRS84 (≈ EPSG:4326). When the stored column is in another
    # SRID, wrap their literals in `ST_Transform(literal, <col_srid>)`
    # so the comparison happens in the column's native CRS — PostGIS
    # folds the transform on the constant side and the spatial index
    # on the column stays usable.
    col_srid = geometry_column.srid if geometry_column is not None else None
    needs_srid_wrap = col_srid is not None and col_srid != 4326

    if cql is not None:
        if needs_srid_wrap:
            cql = Expr(_transform_cql_geom_literals(cql.to_json(), col_srid))
        exprs.append(cql)

    # `ids` filter
    if ids:
        id_prop = {"property": collection.id_column.name}
        typed_ids = [_coerce_id(i, collection.id_column.type) for i in ids]
        if len(typed_ids) == 1:
            exprs.append(Expr({"op": "=", "args": [id_prop, typed_ids[0]]}))
        else:
            exprs.append(Expr({"op": "in", "args": [id_prop, typed_ids]}))

    # `properties` filter
    if properties is not None:
        for prop, val in properties:
            if not collection.get_column(prop):
                raise InvalidPropertyName(f"Invalid property name: {prop}")
            exprs.append(Expr({"op": "=", "args": [{"property": prop}, val]}))

    # `bbox` filter — bbox is CRS84 (4326) per OGC API Features.
    # Reproject the four corner coords to the column's CRS in Python
    # so the polygon literal already carries target-CRS coordinates;
    # ST_SetSRID then just tags it, no PostGIS-side transform needed.
    if bbox is not None and geometry_column is not None:
        if len(bbox) == 6:
            west, south, _, east, north, _ = bbox
        else:
            west, south, east, north = bbox
        if needs_srid_wrap:
            transformer = TransformerFromCRS(4326, col_srid, always_xy=True)
            west, south, east, north = transformer.transform_bounds(
                west, south, east, north
            )
        exprs.append(
            _s_intersects_bbox(
                geometry_column.name, west, south, east, north, srid=col_srid
            )
        )

    # `datetime` filter
    if datetime:
        if not collection.datetime_columns:
            raise MissingDatetimeColumn(
                "Must have timestamp/timestamptz/date typed column to filter with datetime."
            )

        datetime_column = collection.get_datetime_column(dt)
        if not datetime_column:
            raise InvalidDatetimeColumnName(f"Invalid Datetime Column: {dt}.")

        dt_prop = {"property": datetime_column.name}

        if len(datetime) == 1:
            parse_rfc3339(datetime[0])
            exprs.append(
                Expr(
                    {
                        "op": "=",
                        "args": [dt_prop, {"timestamp": datetime[0]}],
                    }
                )
            )
        else:
            start_str, end_str = datetime[0], datetime[1]
            start = parse_rfc3339(start_str) if start_str not in ["..", ""] else None
            end = parse_rfc3339(end_str) if end_str not in ["..", ""] else None

            if start is None and end is None:
                raise InvalidDatetime(
                    "Double open-ended datetime intervals are not allowed."
                )

            if start is not None and end is not None and start > end:
                raise InvalidDatetime("Start datetime cannot be before end datetime.")

            if start is not None:
                exprs.append(
                    Expr(
                        {
                            "op": ">=",
                            "args": [dt_prop, {"timestamp": start_str}],
                        }
                    )
                )
            if end is not None:
                # TODO: Understand the correct way to handle inclusive/exclusive end
                # Closed interval uses exclusive upper bound to keep
                # the half-open `[start, end)` semantics tipg has always
                # used; the open-ended `../<end>` form remains inclusive
                # (`<=`)
                op = "<" if start is not None else "<="
                exprs.append(
                    Expr(
                        {
                            "op": op,
                            "args": [dt_prop, {"timestamp": end_str}],
                        }
                    )
                )

    # `tile` envelope filter — reproject tile bounds directly from the
    # TMS CRS to the stored column's CRS (skipping the 4326 round-trip)
    # and tag the resulting polygon literal with `ST_SetSRID` so it
    # carries the column's SRID rather than the 4326 default that
    # `ST_GeomFromGeoJSON` would otherwise apply.
    if tile and tms and geometry_column:
        bounds = tms.xy_bounds(tile)
        west, south, east, north = (
            bounds.left,
            bounds.bottom,
            bounds.right,
            bounds.top,
        )
        # Bounds are now in TMS CRS
        tms_srid = tms.crs.to_epsg() or 4326
        tile_target_srid = col_srid if col_srid is not None else 4326

        # If the TMS CRS is different from the column's SRID,
        # transform the bounds to the column's SRID.
        if tms_srid != tile_target_srid:
            transformer = TransformerFromCRS(tms_srid, tile_target_srid, always_xy=True)
            west, south, east, north = transformer.transform_bounds(
                west, south, east, north
            )

        exprs.append(
            _s_intersects_bbox(
                geometry_column.name,
                west,
                south,
                east,
                north,
                srid=tile_target_srid,
            )
        )

    if exprs:
        # NOTE: do not call .reduce() — cql2-rs constant-folds some
        # predicates (e.g. `"numeric" IS NULL`) incorrectly.
        # TODO: Open a bug in cql2-rs for this.
        return reduce(lambda x, y: x + y, exprs)

    return None
