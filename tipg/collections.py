"""tipg.dbmodel: database events."""

import abc
import datetime
import re
from functools import lru_cache, reduce
from typing import Any, Dict, List, Optional, Tuple, TypedDict, Union

import asyncpg
from ciso8601 import parse_rfc3339
from cql2 import Expr
from morecantile import Tile, TileMatrixSet
from pydantic import BaseModel, Field, model_validator
from pyproj import Transformer

from tipg.errors import (
    InvalidDatetime,
    InvalidDatetimeColumnName,
    InvalidGeometryColumnName,
    InvalidLimit,
    InvalidPropertyName,
    MissingDatetimeColumn,
    NotFound,
)
from tipg.logger import logger
from tipg.model import Extent
from tipg.settings import (
    DatabaseSettings,
    FeaturesSettings,
    MVTSettings,
    TableConfig,
    TableSettings,
)

from fastapi import FastAPI

mvt_settings = MVTSettings()
features_settings = FeaturesSettings()

TransformerFromCRS = lru_cache(Transformer.from_crs)


def _quote_ident(name: str) -> str:
    """Quote a PostgreSQL identifier (column/table/schema) safely."""
    return '"' + name.replace('"', '""') + '"'


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


def _coerce_id(val: str, pg_type: str) -> Union[str, int]:
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


def debug_query(q, *p):
    """Utility to print raw statement to use for debugging."""

    # Escape literal `{` and `}` (cql2 emits GeoJSON literals containing them)
    # then turn `$N` placeholders into `{N}` format slots.
    qsub = re.sub(r"\$([0-9]+)", r"{\1}", q.replace("{", "{{").replace("}", "}}"))

    def quote_str(s):
        """Quote strings."""

        if s is None:
            return "null"
        elif isinstance(s, str):
            return f"'{s}'"
        else:
            return s

    p = [quote_str(s) for s in p]
    logger.debug(qsub.format(None, *p))


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
    geometry: Optional[Union[Dict, str]]
    properties: Optional[Dict]
    id: Optional[Any]
    bbox: Optional[List[float]]


class ItemList(TypedDict):
    """Items."""

    items: List[Feature]
    matched: Optional[int]
    next: Optional[int]
    prev: Optional[int]


class Column(BaseModel):
    """Model for database Column."""

    name: str
    type: str
    description: Optional[str] = None
    geometry_type: Optional[str] = None
    srid: Optional[int] = None
    bounds: Optional[List[float]] = None
    mindt: Optional[str] = None
    maxdt: Optional[str] = None

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

    default: Optional[str] = None


class Collection(BaseModel, metaclass=abc.ABCMeta):
    """Collection Base Class."""

    type: str
    id: str
    table: str
    title: Optional[str] = None
    description: Optional[str] = None
    table_columns: List[Column] = []
    properties: List[Column] = []
    id_column: Optional[Column] = None
    geometry_column: Optional[Column] = None
    datetime_column: Optional[Column] = None
    parameters: List[Parameter] = []

    @property
    def extent(self) -> Optional[Extent]:
        """Return extent."""
        extent: Dict[str, Any] = {}
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

    @property
    def bounds(self) -> Optional[List[float]]:
        """Return spatial bounds from collection extent."""
        if self.extent and self.extent.spatial:
            return self.extent.spatial.bbox[0]

        return None

    @property
    def dt_bounds(self) -> Optional[List[str]]:
        """Return temporal bounds from collection extent."""
        if self.extent and self.extent.temporal:
            return self.extent.temporal.interval[0]

        return None

    @property
    def crs(self):
        """Return crs of set geometry column."""
        if self.geometry_column:
            return f"http://www.opengis.net/def/crs/EPSG/0/{self.geometry_column.srid}"

    @property
    def geometry_columns(self) -> List[Column]:
        """Return geometry columns."""
        return [c for c in self.table_columns if c.is_geometry]

    @property
    def datetime_columns(self) -> List[Column]:
        """Return datetime columns."""
        return [c for c in self.table_columns if c.is_datetime]

    def get_geometry_column(self, name: Optional[str] = None) -> Optional[Column]:
        """Return the name of the first geometry column."""
        if (not self.geometry_columns) or (name and name.lower() == "none"):
            return None

        if name is None:
            return self.geometry_column

        for col in self.geometry_columns:
            if col.name == name:
                return col

        return None

    def get_datetime_column(self, name: Optional[str] = None) -> Optional[Column]:
        """Return the Column for either the passed in tstz column or the first tstz column."""
        if not self.datetime_columns:
            return None

        if name is None:
            return self.datetime_column

        for col in self.datetime_columns:
            if col.name == name:
                return col

        return None

    def columns(self, properties: Optional[List[str]] = None) -> List[str]:
        """Return table columns optionally filtered to only include columns from properties."""
        if properties in [[], [""]]:
            return []

        cols = [
            c.name for c in self.properties if c.type not in ["geometry", "geography"]
        ]
        if properties is None:
            return cols

        return [c for c in cols if c in properties]

    def get_column(self, property_name: str) -> Optional[Column]:
        """Return column info."""
        for p in self.properties:
            if p.name == property_name:
                return p

        return None

    @property
    def queryables(self) -> Dict:
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

    def cql_where(  # noqa: C901
        self,
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
                cql = Expr(_transform_cql_geom_literals(cql.to_json(), col_srid))
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
                    geometry_column.name, west, south, east, north, srid=col_srid
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

    collections: List[Collection]
    matched: Optional[int]
    next: Optional[int]
    prev: Optional[int]


class Catalog(TypedDict):
    """Internal Collection Catalog."""

    collections: Dict[str, Collection]
    last_updated: datetime.datetime


class PgCollection(Collection):
    """Model for DB Table and Function."""

    dbschema: str = Field(alias="schema")

    @property
    def _qualified_name(self) -> str:
        """SQL-quoted ``"schema"."table"`` identifier for this collection."""
        return f"{_quote_ident(self.dbschema)}.{_quote_ident(self.table)}"

    def _select_property_columns(self, properties: Optional[List[str]]) -> List[str]:
        """Quoted column-name fragments for the property columns to SELECT."""
        return [_quote_ident(c) for c in self.columns(properties)]

    def _select_id(self) -> str:
        """SQL fragment that selects the primary-key column as ``tipg_id``.

        Falls back to ``ROW_NUMBER()`` when the collection has no primary key.
        """
        if self.id_column:
            return f"{_quote_ident(self.id_column.name)} AS tipg_id"
        return "ROW_NUMBER() OVER () AS tipg_id"

    def _geom_expr(
        self,
        geometry_column: Optional[Column],
        bbox_only: Optional[bool],
        simplify: Optional[float],
    ) -> Optional[str]:
        """Build the SQL expression for the geometry column (reprojected to
        4326 if needed, optionally bbox-only or simplified).
        """
        if geometry_column is None:
            return None

        g = f"CAST({_quote_ident(geometry_column.name)} AS geometry)"

        if geometry_column.srid != 4326:
            g = f"ST_Transform({g}, 4326)"

        if bbox_only:
            g = f"ST_Envelope({g})"
        elif simplify:
            s = float(simplify)
            g = f"ST_SnapToGrid(ST_Simplify({g}, {s}), {s})"

        return g

    def _select(
        self,
        properties: Optional[List[str]],
        geometry_column: Optional[Column],
        bbox_only: Optional[bool],
        simplify: Optional[float],
        geom_as_wkt: bool = False,
    ) -> str:
        """Build the SELECT clause for the main features query."""
        cols = self._select_property_columns(properties)
        cols.append(self._select_id())

        geom = self._geom_expr(geometry_column, bbox_only, simplify)
        if geom_as_wkt:
            cols.append(
                f"ST_AsEWKT({geom}) AS tipg_geom"
                if geom
                else "CAST(NULL AS text) AS tipg_geom"
            )
        else:
            cols.append(
                f"CAST(ST_AsGeoJSON({geom}) AS json) AS tipg_geom"
                if geom
                else "CAST(NULL AS json) AS tipg_geom"
            )

        return "SELECT " + ", ".join(cols)

    def _select_mvt(
        self,
        properties: Optional[List[str]],
        geometry_column: Column,
        tms: TileMatrixSet,
        tile: Tile,
    ) -> str:
        """Build the SELECT clause that emits an MVT geometry per row."""
        cols = self._select_property_columns(properties)

        geom = f"CAST({_quote_ident(geometry_column.name)} AS geometry)"

        # For tiles that fall outside the TMS's natural domain (e.g. an
        # over-zoomed corner tile), clip the source geometry to the TMS's
        # geographic bbox before reprojecting — otherwise ST_AsMVTGeom can
        # produce garbage near the antimeridian / poles. ``tms.bbox`` is in
        # the TMS's ``geographic_crs``, which is NOT always EPSG:4326 (e.g.
        # CanadianNAD83_LCC uses 4269, EuropeanETRS89_LAEAQuad uses 4258,
        # NZTM2000Quad uses 4167). When the geographic CRS has no EPSG code
        # (WorldCRS84Quad → OGC:CRS84), 4326 is a safe fallback since the
        # coordinate values are identical (only axis order differs, and
        # PostGIS treats 4326 as lon/lat).
        if not tms.is_valid(tile):
            west, south, east, north = tms.bbox
            geo_srid = tms.geographic_crs.to_epsg() or 4326
            geom = (
                f"ST_Intersection("
                f"ST_MakeEnvelope({west}, {south}, {east}, {north}, {geo_srid}), "
                f"ST_Transform({geom}, {geo_srid})"
                f")"
            )

        # Reproject to TMS CRS — prefer EPSG code, fall back to PROJ string.
        if tms_srid := tms.crs.to_epsg():
            transformed = f"ST_Transform({geom}, {tms_srid})"
        else:
            tms_proj = tms.crs.to_proj4().replace("'", "''")
            transformed = f"ST_Transform({geom}, '{tms_proj}')"

        bbox = tms.xy_bounds(tile)
        envelope = (
            f"ST_Segmentize("
            f"ST_MakeEnvelope({bbox.left}, {bbox.bottom}, {bbox.right}, {bbox.top}), "
            f"{bbox.right - bbox.left}"
            f")"
        )
        cols.append(
            f"ST_AsMVTGeom("
            f"{transformed}, {envelope}, "
            f"{int(mvt_settings.tile_resolution)}, "
            f"{int(mvt_settings.tile_buffer)}, "
            f"{'TRUE' if mvt_settings.tile_clip else 'FALSE'}"
            f") AS geom"
        )

        return "SELECT " + ", ".join(cols)

    def _from(
        self,
        function_parameters: Optional[Dict[str, str]],
        params: List[Any],
    ) -> str:
        """Build the FROM clause. Function-table parameters are appended to
        ``params`` and referenced via ``$N`` placeholders.
        """
        name = self._qualified_name
        if self.type != "Function":
            return f"FROM {name}"

        if not function_parameters:
            return f"FROM {name}()"

        args = []
        for p in self.parameters:
            if p.name in function_parameters:
                params.append(function_parameters[p.name])
                # Double cast (value → text → target type): asyncpg sends
                # Python strs as text, and the explicit cast to ``p.type``
                # then coerces to whatever the function signature expects.
                args.append(f"CAST(CAST(${len(params)} AS text) AS {p.type})")
        return f"FROM {name}({', '.join(args)})"

    def _sortby(self, sortby: Optional[str]) -> str:
        """Build the ORDER BY clause."""
        sorts = []
        if sortby:
            for s in sortby.strip().split(","):
                parts = re.match("^(?P<direction>[+-]?)(?P<column>.*)$", s).groupdict()  # type:ignore

                direction = parts["direction"]
                column = parts["column"].strip()
                if not self.get_column(column):
                    raise InvalidPropertyName(f"Property {column} does not exist.")
                col_sql = _quote_ident(column)
                sorts.append(f"{col_sql} DESC" if direction == "-" else col_sql)
        elif self.id_column is not None:
            sorts.append(_quote_ident(self.id_column.name))
        else:
            sorts.append(_quote_ident(self.properties[0].name))

        return "ORDER BY " + ", ".join(sorts)

    @staticmethod
    def _where_clause(where: Optional[Expr]) -> str:
        """Render a cql2 ``Expr`` (or ``None``) as a WHERE clause."""
        if where is None:
            return "WHERE TRUE"
        return f"WHERE {where.to_sql()}"

    async def _features_query(
        self,
        conn: asyncpg.Connection,
        *,
        where: Optional[Expr] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: Optional[str] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        bbox_only: Optional[bool] = None,
        simplify: Optional[float] = None,
        geom_as_wkt: bool = False,
        function_parameters: Optional[Dict[str, str]],
    ):
        """Build and run the Features query, yielding each row as a Feature."""
        limit = limit or features_settings.default_features_limit
        offset = offset or 0
        params: List[Any] = []

        sql = " ".join(
            [
                self._select(
                    properties=properties,
                    geometry_column=self.get_geometry_column(geom),
                    bbox_only=bbox_only,
                    simplify=simplify,
                    geom_as_wkt=geom_as_wkt,
                ),
                self._from(function_parameters, params),
                self._where_clause(where),
                self._sortby(sortby),
                f"LIMIT {int(limit)}",
                f"OFFSET {int(offset)}",
            ]
        )

        for r in await conn.fetch(sql, *params):
            props = dict(r)
            g = props.pop("tipg_geom")
            id = props.pop("tipg_id")
            feature = Feature(type="Feature", geometry=g, id=id, properties=props)
            yield feature

    async def _features_count_query(
        self,
        conn: asyncpg.Connection,
        *,
        where: Optional[Expr] = None,
        function_parameters: Optional[Dict[str, str]],
    ) -> int:
        """Run the COUNT(*) query for the current filter."""
        params: List[Any] = []
        sql = " ".join(
            [
                "SELECT COUNT(*)",
                self._from(function_parameters, params),
                self._where_clause(where),
            ]
        )
        return await conn.fetchval(sql, *params)

    async def features(
        self,
        conn: asyncpg.Connection,
        *,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        cql_filter: Optional[Expr] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        bbox_only: Optional[bool] = None,
        simplify: Optional[float] = None,
        geom_as_wkt: bool = False,
        function_parameters: Optional[Dict[str, str]] = None,
    ) -> ItemList:
        """Build and run Pg query."""
        limit = limit or features_settings.default_features_limit
        offset = offset or 0

        function_parameters = function_parameters or {}

        if geom and geom.lower() != "none" and not self.get_geometry_column(geom):
            raise InvalidGeometryColumnName(f"Invalid Geometry Column: {geom}.")

        if limit and limit > features_settings.max_features_per_query:
            raise InvalidLimit(
                f"Limit can not be set higher than the `tipg_max_features_per_query` setting of {features_settings.max_features_per_query}"
            )

        where_filter = self.cql_where(
            ids=ids_filter,
            datetime=datetime_filter,
            bbox=bbox_filter,
            properties=properties_filter,
            cql=cql_filter,
            geom=geom,
            dt=dt,
        )

        matched = await self._features_count_query(
            conn,
            where=where_filter,
            function_parameters=function_parameters,
        )

        features = [
            f
            async for f in self._features_query(
                conn,
                where=where_filter,
                sortby=sortby,
                properties=properties,
                geom=geom,
                limit=limit,
                offset=offset,
                bbox_only=bbox_only,
                simplify=simplify,
                geom_as_wkt=geom_as_wkt,
                function_parameters=function_parameters,
            )
        ]
        returned = len(features)

        return ItemList(
            items=features,
            matched=matched,
            next=offset + returned if matched - returned > offset else None,
            prev=max(offset - limit, 0) if offset else None,
        )

    async def get_tile(
        self,
        conn: asyncpg.Connection,
        *,
        tms: TileMatrixSet,
        tile: Tile,
        ids_filter: Optional[List[str]] = None,
        bbox_filter: Optional[List[float]] = None,
        datetime_filter: Optional[List[str]] = None,
        properties_filter: Optional[List[Tuple[str, str]]] = None,
        function_parameters: Optional[Dict[str, str]] = None,
        cql_filter: Optional[Expr] = None,
        sortby: Optional[str] = None,
        properties: Optional[List[str]] = None,
        geom: Optional[str] = None,
        dt: Optional[str] = None,
        limit: Optional[int] = None,
    ):
        """Build query to get Vector Tile."""
        limit = limit or mvt_settings.max_features_per_tile

        geometry_column = self.get_geometry_column(geom)
        if not geometry_column:
            raise InvalidGeometryColumnName(f"Invalid Geometry Column Name {geom}")

        if limit > mvt_settings.max_features_per_tile:
            raise InvalidLimit(
                f"Limit can not be set higher than the `tipg_max_features_per_tile` setting of {mvt_settings.max_features_per_tile}"
            )

        where_filter = self.cql_where(
            ids=ids_filter,
            datetime=datetime_filter,
            bbox=bbox_filter,
            properties=properties_filter,
            cql=cql_filter,
            geom=geom,
            dt=dt,
            tms=tms,
            tile=tile,
        )

        params: List[Any] = []
        inner_sql = " ".join(
            [
                self._select_mvt(
                    properties=properties,
                    geometry_column=geometry_column,
                    tms=tms,
                    tile=tile,
                ),
                self._from(function_parameters, params),
                self._where_clause(where_filter),
                f"LIMIT {int(limit)}",
            ]
        )

        layer = self.table if mvt_settings.set_mvt_layername is True else "default"
        params.append(layer)
        sql = f"WITH t AS ({inner_sql}) " f"SELECT ST_AsMVT(t.*, ${len(params)}) FROM t"
        debug_query(sql, *params)

        tile = await conn.fetchval(sql, *params)

        return bytes(tile)


async def pg_get_collection_index(  # noqa: C901
    conn: asyncpg.Connection,
    settings: Optional[DatabaseSettings] = None,
) -> List[Collection]:
    """Fetch Table and Functions index."""
    if not settings:
        settings = DatabaseSettings()

    schemas = settings.schemas or ["public"]

    query = f"""
        SELECT {settings.tipg_schema}.tipg_catalog(
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        );
    """

    rows = await conn.fetch(
        query,
        schemas,
        settings.tables,
        settings.exclude_tables,
        settings.exclude_table_schemas,
        settings.functions,
        settings.exclude_functions,
        settings.exclude_function_schemas,
        settings.only_spatial_tables,
        settings.spatial_extent,
        settings.datetime_extent,
    )

    collections: List[Collection] = []
    table_settings = TableSettings()
    table_confs = table_settings.table_config
    fallback_key_names = table_settings.fallback_key_names

    for row in rows:
        table = row[0]
        table_id = table["schema"] + "." + table["name"]
        confid = table["schema"] + "_" + table["name"]

        if table_id == f"{settings.tipg_schema}.tipg_catalog":
            continue

        table_conf = table_confs.get(confid, TableConfig())

        # Make sure that any properties set in conf exist in table
        columns = table.get("properties", [])
        if table_settings.sort_columns:
            columns = sorted(columns, key=lambda d: d["name"])

        properties_setting = table_conf.properties or [c["name"] for c in columns]

        # ID Column
        id_column = None
        if id_name := table_conf.pk or table.get("pk"):
            for p in columns:
                if id_name == p["name"]:
                    id_column = p
                    break

        if id_column is None and fallback_key_names:
            for p in columns:
                if p["name"] in fallback_key_names:
                    id_column = p
                    break

        datetime_column = None
        geometry_column = None

        for c in columns:
            if c.get("type") in ("timestamp", "timestamptz", "date"):
                if table_conf.datetimecol == c["name"] or datetime_column is None:
                    datetime_column = c

            if c.get("type") in ("geometry", "geography"):
                if table_conf.geomcol == c["name"] or geometry_column is None:
                    geometry_column = c

        collections.append(
            PgCollection(
                type=table["entity"],
                id=table_id,
                table=table["name"],
                schema=table["schema"],
                description=table.get("description", None),
                table_columns=columns,
                properties=[p for p in columns if p["name"] in properties_setting],
                id_column=id_column,
                datetime_column=datetime_column,
                geometry_column=geometry_column,
                parameters=table.get("parameters") or [],
            )
        )

    return collections


async def register_collection_catalog(
    app: FastAPI,
    db_settings: Optional[DatabaseSettings] = None,
) -> None:
    """Register Table catalog."""
    async with app.state.pool.acquire() as conn:
        db_collections = await pg_get_collection_index(conn, settings=db_settings)

    app.state.collection_catalog = Catalog(
        collections={col.id: col for col in [*db_collections]},
        last_updated=datetime.datetime.now(),
    )
