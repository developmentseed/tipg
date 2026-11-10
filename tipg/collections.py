"""tipg.dbmodel: database events."""

import abc
import datetime
from collections.abc import Callable
from functools import cached_property, lru_cache, reduce
from typing import Any, TypedDict

from ciso8601 import parse_rfc3339
from cql2 import Expr
from morecantile import Tile, TileMatrixSet
from pydantic import BaseModel, model_validator
from pyproj import Transformer

from .errors import (
    InvalidDatetime,
    InvalidDatetimeColumnName,
    InvalidPropertyName,
    MissingDatetimeColumn,
    NotFound,
)
from .model import Extent

TransformerFromCRS = lru_cache(Transformer.from_crs)

# Wraps a cql2-json geometry node into a backend-specific function call
GeometryLiteralWrapper = Callable[[Any, int], Any]


def _quote_ident(name: str) -> str:
    """Quote a SQL identifier (column/table/schema) safely."""
    return '"' + name.replace('"', '""') + '"'


def _pg_setsrid(geom: Any, srid: int) -> Any:
    """Tag a geometry literal with ``srid`` (PostGIS ``ST_SetSRID``)."""
    return {"op": "st_setsrid", "args": [geom, srid]}


def _pg_transform(geom: Any, srid: int) -> Any:
    """Reproject a EPSG:4326 geometry literal to ``srid`` (PostGIS ``ST_Transform``)."""
    return {"op": "st_transform", "args": [geom, srid]}


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


def _coerce_id(val: str, pg_type: str) -> str | int:
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
    srid: int | None = None,
    tag: GeometryLiteralWrapper = _pg_setsrid,
) -> Expr:
    """Build a cql2 S_INTERSECTS expression against a polygon envelope.

    Coordinates are taken to be in ``srid``; if ``srid`` is non-4326, the
    polygon literal is wrapped with ``tag`` (``ST_SetSRID`` by default) so
    the database does not pick up ``ST_GeomFromGeoJSON``'s 4326 default.
    Pass ``srid=None`` or ``srid=4326`` for the no-op case.
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
        polygon = tag(polygon, srid)
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


def _transform_cql_geom_literals(
    node: Any,
    target_srid: int,
    reproject: GeometryLiteralWrapper = _pg_transform,
) -> Any:
    """Walk a user-supplied cql2-json tree and wrap every GeoJSON geometry
    literal with ``reproject`` (``ST_Transform(<literal>, target_srid)`` by default).

    Per OGC API Features Part 3 Req 7, geometries in a CQL filter are
    CRS84 (≈ EPSG:4326). Wrapping the literal side (rather than the
    column side) keeps PostGIS' spatial index on the column usable and
    lets the planner fold the transform on the constant once.
    """
    if isinstance(node, dict):
        if node.get("type") in _GEOJSON_GEOMETRY_TYPES and (
            "coordinates" in node or "geometries" in node
        ):
            return reproject(node, target_srid)
        return {
            k: _transform_cql_geom_literals(v, target_srid, reproject)
            for k, v in node.items()
        }
    if isinstance(node, list):
        return [
            _transform_cql_geom_literals(item, target_srid, reproject) for item in node
        ]
    return node


# Links to geojson schema
geojson_schema = {
    "GEOMETRY": "https://geojson.org/schema/Geometry.json",
    "POINT": "https://geojson.org/schema/Point.json",
    "MULTIPOINT": "https://geojson.org/schema/MultiPoint.json",
    "LINESTRING": "https://geojson.org/schema/LineString.json",
    "MULTILINESTRING": "https://geojson.org/schema/MultiLineString.json",
    "POLYGON": "https://geojson.org/schema/Polygon.json",
    "MULTIPOLYGON": "https://geojson.org/schema/MultiPolygon.json",
    "GEOMETRYCOLLECTION": "https://geojson.org/schema/GeometryCollection.json",
}


class Feature(TypedDict, total=False):
    """Simple Feature model."""

    type: str
    # Geometry is either a dict or a str (wkt)
    geometry: dict | str | None
    properties: dict | None
    id: Any | None
    bbox: list[float] | None


class ItemList(TypedDict):
    """Items."""

    items: list[Feature]
    matched: int | None
    next: int | None
    prev: int | None


class Column(BaseModel):
    """Model for database Column."""

    name: str
    type: str
    description: str | None = None
    geometry_type: str | None = None
    srid: int | None = None
    bounds: list[float] | None = None
    mindt: str | None = None
    maxdt: str | None = None

    @model_validator(mode="before")
    def sridbounds_default(cls, values):
        """Set default bounds and srid when this is a function."""
        if values.get("geometry_type"):
            values["srid"] = values.get("srid", 4326)
            values["bounds"] = values.get("bounds", [-180, -90, 180, 90])
        return values

    @property
    def json_type(self) -> str:
        """Return JSON field type."""
        if self.type.endswith("[]"):
            return "array"

        if self.type in [
            "smallint",
            "integer",
            "bigint",
            "decimal",
            "numeric",
            "real",
            "double precision",
            "smallserial",
            "serial",
            "bigserial",
            # Float8 is not a Postgres type name but is the name we give
            # internally do Double Precision type
            # ref: https://github.com/developmentseed/tipg/pull/60/files#r1011863866
            "float8",
        ]:
            return "number"

        if self.type.startswith("bool"):
            return "boolean"

        if any([self.type.startswith("json"), self.type.startswith("geo")]):
            return "object"

        return "string"

    @property
    def is_geometry(self) -> bool:
        """Returns true if this property is a geometry column."""
        return self.type in ("geometry", "geography")

    @property
    def is_datetime(self) -> bool:
        """Returns true if this property is a datetime column."""
        return self.type in ("timestamp", "timestamptz", "date")


class Parameter(Column):
    """Model for PostGIS function parameters."""

    default: str | None = None


class Collection(BaseModel, metaclass=abc.ABCMeta):
    """Collection Base Class."""

    type: str
    id: str
    table: str
    title: str | None = None
    description: str | None = None
    table_columns: list[Column] = []
    properties: list[Column] = []
    id_column: Column | None = None
    geometry_column: Column | None = None
    datetime_column: Column | None = None
    parameters: list[Parameter] = []

    @cached_property
    def extent(self) -> Extent | None:
        """Return extent."""
        extent: dict[str, Any] = {}
        if cols := self.geometry_columns:
            if len(cols) == 1:
                bbox = [cols[0].bounds]
            else:
                minx, miny, maxx, maxy = zip(*[col.bounds for col in cols])
                bbox = [
                    [min(minx), min(miny), max(maxx), max(maxy)],
                    *[col.bounds for col in cols],
                ]

            extent["spatial"] = {
                "bbox": bbox,
                # The extent calculated in Pg is in WGS84 LON,LAT order
                # so we use `CRS84` as CRS
                "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
            }

        if cols := [col for col in self.datetime_columns if col.mindt or col.maxdt]:
            intervals = []
            if len(cols) == 1:
                if cols[0].mindt or cols[0].maxdt:
                    intervals = [[cols[0].mindt, cols[0].maxdt]]

            else:
                mindt = [col.mindt for col in cols if col.mindt]
                maxdt = [col.maxdt for col in cols if col.maxdt]
                intervals = [
                    [min(mindt), max(maxdt)],
                    *[[col.mindt, col.maxdt] for col in cols if col.mindt or col.maxdt],
                ]

            if intervals:
                extent["temporal"] = {"interval": intervals}

        if extent:
            return Extent(**extent)

        return None

    @cached_property
    def bounds(self) -> list[float] | None:
        """Return spatial bounds from collection extent."""
        if self.extent and self.extent.spatial:
            return self.extent.spatial.bbox[0]

        return None

    @cached_property
    def dt_bounds(self) -> list[str] | None:
        """Return temporal bounds from collection extent."""
        if self.extent and self.extent.temporal:
            return self.extent.temporal.interval[0]

        return None

    @property
    def crs(self):
        """Return crs of set geometry column."""
        if self.geometry_column:
            return f"http://www.opengis.net/def/crs/EPSG/0/{self.geometry_column.srid}"

    @cached_property
    def geometry_columns(self) -> list[Column]:
        """Return geometry columns."""
        return [c for c in self.table_columns if c.is_geometry]

    @cached_property
    def datetime_columns(self) -> list[Column]:
        """Return datetime columns."""
        return [c for c in self.table_columns if c.is_datetime]

    def get_geometry_column(self, name: str | None = None) -> Column | None:
        """Return the name of the first geometry column."""
        if (not self.geometry_columns) or (name and name.lower() == "none"):
            return None

        if name is None:
            return self.geometry_column

        for col in self.geometry_columns:
            if col.name == name:
                return col

        return None

    def get_datetime_column(self, name: str | None = None) -> Column | None:
        """Return the Column for either the passed in tstz column or the first tstz column."""
        if not self.datetime_columns:
            return None

        if name is None:
            return self.datetime_column

        for col in self.datetime_columns:
            if col.name == name:
                return col

        return None

    def columns(self, properties: list[str] | None = None) -> list[str]:
        """Return table columns optionally filtered to only include columns from properties."""
        if properties in [[], [""]]:
            return []

        cols = [
            c.name for c in self.properties if c.type not in ["geometry", "geography"]
        ]
        if properties is None:
            return cols

        return [c for c in cols if c in properties]

    def get_column(self, property_name: str) -> Column | None:
        """Return column info."""
        for p in self.properties:
            if p.name == property_name:
                return p

        return None

    @property
    def queryables(self) -> dict:
        """Return the queryables."""
        if self.geometry_columns:
            geoms = {
                col.name: {"$ref": geojson_schema.get(col.geometry_type.upper(), "")}
                for col in self.geometry_columns
            }
        else:
            geoms = {}

        props = {
            col.name: {"name": col.name, "type": col.json_type}
            for col in self.properties
            if col.name not in geoms
        }

        return {**geoms, **props}

    def _tag_geometry_literal(self, geom: Any, srid: int) -> Any:
        """Tag a cql2-json geometry literal, whose coordinates are already in
        ``srid``, with that CRS. Defaults to PostGIS ``ST_SetSRID``.
        """
        return _pg_setsrid(geom, srid)

    def _reproject_geometry_literal(self, geom: Any, srid: int) -> Any:
        """Reproject a EPSG:4326 cql2-json geometry literal to ``srid``.
        Defaults to PostGIS ``ST_Transform``.
        """
        return _pg_transform(geom, srid)

    def cql_where(  # noqa: C901
        self,
        ids: list[str] | None = None,
        datetime: list[str] | None = None,
        bbox: list[float] | None = None,
        properties: list[tuple[str, Any]] | None = None,
        cql: Expr | None = None,
        geom: str | None = None,
        dt: str | None = None,
        tile: Tile | None = None,
        tms: TileMatrixSet | None = None,
    ) -> Expr | None:
        """Construct WHERE query as a cql2 Expr."""
        exprs: list[Expr] = []
        geometry_column = self.get_geometry_column(geom)

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
                cql = Expr(
                    _transform_cql_geom_literals(
                        cql.to_json(), col_srid, self._reproject_geometry_literal
                    )
                )
            exprs.append(cql)

        # `ids` filter
        if ids:
            id_prop = {"property": self.id_column.name}
            typed_ids = [_coerce_id(i, self.id_column.type) for i in ids]
            if len(typed_ids) == 1:
                exprs.append(Expr({"op": "=", "args": [id_prop, typed_ids[0]]}))
            else:
                exprs.append(Expr({"op": "in", "args": [id_prop, typed_ids]}))

        # `properties` filter
        if properties is not None:
            for prop, val in properties:
                if not self.get_column(prop):
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
                    geometry_column.name,
                    west,
                    south,
                    east,
                    north,
                    srid=col_srid,
                    tag=self._tag_geometry_literal,
                )
            )

        # `datetime` filter
        if datetime:
            if not self.datetime_columns:
                raise MissingDatetimeColumn(
                    "Must have timestamp/timestamptz/date typed column to filter with datetime."
                )

            datetime_column = self.get_datetime_column(dt)
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
                start = (
                    parse_rfc3339(start_str) if start_str not in ["..", ""] else None
                )
                end = parse_rfc3339(end_str) if end_str not in ["..", ""] else None

                if start is None and end is None:
                    raise InvalidDatetime(
                        "Double open-ended datetime intervals are not allowed."
                    )

                if start is not None and end is not None and start > end:
                    raise InvalidDatetime(
                        "Start datetime cannot be before end datetime."
                    )

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
                transformer = TransformerFromCRS(
                    tms_srid, tile_target_srid, always_xy=True
                )
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
                    tag=self._tag_geometry_literal,
                )
            )

        if exprs:
            # NOTE: do not call .reduce() — cql2-rs constant-folds some
            # predicates (e.g. `"numeric" IS NULL`) incorrectly.
            # TODO: Open a bug in cql2-rs for this.
            return reduce(lambda x, y: x + y, exprs)

        return None

    @abc.abstractmethod
    async def features(self, *args, **kwargs) -> ItemList:
        """Get Items."""
        ...

    @abc.abstractmethod
    async def get_tile(self, *args, **kwargs) -> bytes:
        """Get MVT Tile."""
        ...


class CollectionList(TypedDict):
    """Collections."""

    collections: list[Collection]
    matched: int | None
    next: int | None
    prev: int | None


class Catalog(TypedDict):
    """Internal Collection Catalog."""

    collections: dict[str, Collection]
    last_updated: datetime.datetime
