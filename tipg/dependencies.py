"""tipg dependencies."""

import re
from typing import Dict, List, Optional, Tuple

from morecantile import Tile
from morecantile import tms as default_tms
from pygeofilter.ast import AstType
from pygeofilter.parsers.cql2_json import parse as cql2_json_parser
from pygeofilter.parsers.cql2_text import parse as cql2_text_parser

from tipg.dbmodel import Collection
from tipg.errors import InvalidBBox, MissingFunctionParameter
from tipg.resources import enums
from tipg.settings import TMSSettings

from fastapi import Depends, HTTPException, Path, Query

from starlette.requests import Request

tms_settings = TMSSettings()


def CollectionParams(
    request: Request,
    collectionId: str = Path(..., description="Collection identifier"),
) -> Collection:
    """Return Layer Object."""
    collection_pattern = re.match(  # type: ignore
        r"^(?P<schema>.+)\.(?P<collection>.+)$", collectionId
    )
    if not collection_pattern:
        raise HTTPException(
            status_code=422, detail=f"Invalid Collection format '{collectionId}'."
        )

    assert collection_pattern.groupdict()["schema"]
    assert collection_pattern.groupdict()["collection"]

    collection_catalog = getattr(request.app.state, "collection_catalog", {})
    if collectionId in collection_catalog:
        return collection_catalog[collectionId]

    raise HTTPException(
        status_code=404, detail=f"Table/Function '{collectionId}' not found."
    )


def accept_media_type(
    accept: str, mediatypes: List[enums.MediaType]
) -> Optional[enums.MediaType]:
    """Return MediaType based on accept header and available mediatype.

    Links:
    - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept

    """
    accept_values = {}
    for m in accept.replace(" ", "").split(","):
        values = m.split(";")
        if len(values) == 1:
            name = values[0]
            quality = 1.0
        else:
            name = values[0]
            groups = dict([param.split("=") for param in values[1:]])  # type: ignore
            try:
                q = groups.get("q")
                quality = float(q) if q else 1.0
            except ValueError:
                quality = 0

        # if quality is 0 we ignore encoding
        if quality:
            accept_values[name] = quality

    # Create Preference matrix
    media_preference = {
        v: [n for (n, q) in accept_values.items() if q == v]
        for v in sorted(set(accept_values.values()), reverse=True)
    }

    # Loop through available compression and encoding preference
    for _, pref in media_preference.items():
        for media in mediatypes:
            if media.value in pref:
                return media

    # If no specified encoding is supported but "*" is accepted,
    # take one of the available compressions.
    if "*" in accept_values and mediatypes:
        return mediatypes[0]

    return None


def OutputType(
    request: Request,
    f: Optional[enums.ResponseType] = Query(
        None,
        description="Response MediaType. Defaults to endpoint's default or value defined in `accept` header.",
    ),
) -> Optional[enums.MediaType]:
    """Output MediaType: json or html."""
    if f:
        return enums.MediaType[f.name]

    accepted_media = [enums.MediaType[v] for v in enums.ResponseType.__members__]
    return accept_media_type(request.headers.get("accept", ""), accepted_media)


def QueryablesOutputType(
    request: Request,
    f: Optional[enums.QueryablesResponseType] = Query(
        None,
        description="Response MediaType. Defaults to endpoint's default or value defined in `accept` header.",
    ),
) -> Optional[enums.MediaType]:
    """Output MediaType: json or html."""
    if f:
        return enums.MediaType[f.name]

    accepted_media = [
        enums.MediaType[v] for v in enums.QueryablesResponseType.__members__
    ]
    return accept_media_type(request.headers.get("accept", ""), accepted_media)


def ItemsOutputType(
    request: Request,
    f: Optional[enums.ItemsResponseType] = Query(
        None,
        description="Response MediaType. Defaults to endpoint's default or value defined in `accept` header.",
    ),
) -> Optional[enums.MediaType]:
    """Output MediaType: json or html."""
    if f:
        return enums.MediaType[f.name]

    accepted_media = [enums.MediaType[v] for v in enums.ItemsResponseType.__members__]
    return accept_media_type(request.headers.get("accept", ""), accepted_media)


def ItemOutputType(
    request: Request,
    f: Optional[enums.ItemResponseType] = Query(
        None,
        description="Response MediaType. Defaults to endpoint's default or value defined in `accept` header.",
    ),
) -> Optional[enums.MediaType]:
    """Output MediaType: json or html."""
    if f:
        return enums.MediaType[f.name]

    accepted_media = [enums.MediaType[v] for v in enums.ItemResponseType.__members__]
    return accept_media_type(request.headers.get("accept", ""), accepted_media)


def bbox_query(
    bbox: Optional[str] = Query(
        None,
        description="Spatial Filter.",
    )
) -> Optional[List[float]]:
    """BBox dependency."""
    if bbox:
        bounds = list(map(float, bbox.split(",")))
        if len(bounds) == 4:
            if abs(bounds[0]) > 180 or abs(bounds[2]) > 180:
                raise InvalidBBox(f"Invalid longitude in bbox: {bounds}")
            if abs(bounds[1]) > 90 or abs(bounds[3]) > 90:
                raise InvalidBBox(f"Invalid latitude in bbox: {bounds}")

        elif len(bounds) == 6:
            if abs(bounds[0]) > 180 or abs(bounds[3]) > 180:
                raise InvalidBBox(f"Invalid longitude in bbox: {bounds}")
            if abs(bounds[1]) > 90 or abs(bounds[4]) > 90:
                raise InvalidBBox(f"Invalid latitude in bbox: {bounds}")

        else:
            raise InvalidBBox(f"Invalid bbox: {bounds}")

        return bounds

    return None


def ids_query(
    ids: Optional[str] = Query(None, description="Filter by Ids."),
) -> Optional[List[str]]:
    """Ids dependency."""
    return ids.split(",") if ids else None


def datetime_query(
    datetime: Optional[str] = Query(None, description="Temporal Filter."),
) -> Optional[List[str]]:
    """Datetime dependency."""
    if datetime:
        dt = datetime.split("/")
        if len(dt) > 2:
            raise HTTPException(status_code=422, detail="Invalid datetime: {datetime}")

        return dt

    return None


def properties_query(
    properties: Optional[str] = Query(
        None,
        description="Return only specific properties (comma-separated). If PROP-LIST is empty, no properties are returned. If not present, all properties are returned.",
    )
) -> Optional[List[str]]:
    """Return property list."""
    if properties is not None:
        return [p.strip() for p in properties.split(",")]

    return None


def properties_filter_query(
    request: Request,
    collection: Collection = Depends(CollectionParams),
) -> List[Tuple[str, str]]:
    """Get properties to filter on excluding reserved keys."""
    exclude = [
        "f",
        "ids",
        "datetime",
        "bbox",
        "properties",
        "filter",
        "filter-lang",
        "geom-column",
        "datetime-column",
        "limit",
        "offset",
        "bbox-only",
        "simplify",
        "sortby",
    ]
    table_property = [prop.name for prop in collection.properties]
    return [
        (key, value)
        for (key, value) in request.query_params.items()
        if key.lower() not in exclude and key.lower() in table_property
    ]


def filter_query(
    query: Optional[str] = Query(None, description="CQL2 Filter", alias="filter"),
    filter_lang: Optional[enums.FilterLang] = Query(
        None,
        description="CQL2 Language (cql2-text, cql2-json). Defaults to cql2-text.",
        alias="filter-lang",
    ),
) -> Optional[AstType]:
    """Parse Filter Query."""
    if query is not None:
        if filter_lang == enums.FilterLang.cql2_json:
            return cql2_json_parser(query)

        # default to cql2-text
        return cql2_text_parser(query)

    return None


def sortby_query(
    sortby: Optional[str] = Query(
        None,
        description="Column Sort the items by Column (ascending (default) or descending).",
    )
):
    """Sortby dependency."""
    return sortby


def TileParams(
    tileMatrix: int = Path(
        ...,
        ge=0,
        le=30,
        description="Identifier (Z) selecting one of the scales defined in the TileMatrixSet and representing the scaleDenominator the tile.",
    ),
    tileCol: int = Path(
        ...,
        description="Column (X) index of the tile on the selected TileMatrix. It cannot exceed the MatrixHeight-1 for the selected TileMatrix.",
    ),
    tileRow: int = Path(
        ...,
        description="Row (Y) index of the tile on the selected TileMatrix. It cannot exceed the MatrixWidth-1 for the selected TileMatrix.",
    ),
) -> Tile:
    """Tile parameters."""
    return Tile(tileCol, tileRow, tileMatrix)


def function_parameters_query(  # noqa: C901
    request: Request,
    collection: Collection = Depends(CollectionParams),
) -> Dict[str, str]:
    """Get parameters for function layers."""
    function_parameters = {}
    errors = []
    params = request.query_params
    path_params = request.path_params

    if collection.type == "Function" and collection.parameters:
        for param in collection.parameters:
            v = params.get(param.name, None)
            if v:
                function_parameters[param.name] = v

            elif path_params.get("tileMatrix", None):
                z = int(path_params.get("tileMatrix"))
                x = int(path_params.get("tileCol"))
                y = int(path_params.get("tileRow"))
                tilematrix = path_params.get(
                    "tileMatrixSetId", tms_settings.default_tms
                )
                if param.name == "z":
                    function_parameters["z"] = z

                if param.name == "x":
                    function_parameters["x"] = x

                if param.name == "y":
                    function_parameters["y"] = y

                if param.name == "bounds":
                    tms = default_tms.get(tilematrix)
                    left, bottom, right, top = tms.bounds(Tile(x, y, z))
                    function_parameters["bounds"] = (
                        "srid=4326;"
                        "POLYGON(("
                        f"{left} {bottom},"
                        f"{left} {top},"
                        f"{right} {top},"
                        f"{right} {bottom},"
                        f"{left} {bottom}"
                        "))"
                    )

                elif param.default:
                    function_parameters[param.name] = param.default

            else:
                errors.append(f"{param.name} (expected type:{param.type}).")

    if errors:
        raise MissingFunctionParameter(
            f"Missing Required parameters for function: {collection.id}. {errors}"
        )

    return function_parameters
