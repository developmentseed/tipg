"""tipg dependencies."""

import re
import sys
from typing import Dict, List, Optional, Tuple

from morecantile import Tile
from morecantile import tms as default_tms
from pygeofilter.ast import AstType
from pygeofilter.parsers.cql2_json import parse as cql2_json_parser
from pygeofilter.parsers.cql2_text import parse as cql2_text_parser

from tipg.collections import Catalog, Collection
from tipg.errors import InvalidBBox, MissingCollectionCatalog, MissingFunctionParameter
from tipg.resources import enums
from tipg.settings import TMSSettings

from fastapi import Depends, HTTPException, Path, Query

from starlette.requests import Request

if sys.version_info >= (3, 9):
    from typing import Annotated  # pylint: disable=no-name-in-module
else:
    from typing_extensions import Annotated


tms_settings = TMSSettings()


def CollectionParams(
    request: Request,
    collectionId: Annotated[str, Path(description="Collection identifier")],
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

    collection_catalog: Catalog = getattr(request.app.state, "collection_catalog", None)
    if not collection_catalog:
        raise MissingCollectionCatalog("Could not find collections catalog.")

    if collectionId in collection_catalog["collections"]:
        return collection_catalog["collections"][collectionId]

    raise HTTPException(
        status_code=404, detail=f"Table/Function '{collectionId}' not found."
    )


def CatalogParams(request: Request) -> Catalog:
    """Return Collections Catalog."""
    collection_catalog: Catalog = getattr(request.app.state, "collection_catalog", None)
    if not collection_catalog:
        raise MissingCollectionCatalog("Could not find collections catalog.")

    return collection_catalog


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
    f: Annotated[
        Optional[enums.ResponseType],
        Query(
            description="Response MediaType. Defaults to endpoint's default or value defined in `accept` header."
        ),
    ] = None,
) -> Optional[enums.MediaType]:
    """Output MediaType: json or html."""
    if f:
        return enums.MediaType[f.name]

    accepted_media = [enums.MediaType[v] for v in enums.ResponseType.__members__]
    return accept_media_type(request.headers.get("accept", ""), accepted_media)


def QueryablesOutputType(
    request: Request,
    f: Annotated[
        Optional[enums.QueryablesResponseType],
        Query(
            description="Response MediaType. Defaults to endpoint's default or value defined in `accept` header."
        ),
    ] = None,
) -> Optional[enums.MediaType]:
    """Output MediaType: schemajson or html."""
    if f:
        return enums.MediaType[f.name]

    accepted_media = [
        enums.MediaType[v] for v in enums.QueryablesResponseType.__members__
    ]
    return accept_media_type(request.headers.get("accept", ""), accepted_media)


def ItemsOutputType(
    request: Request,
    f: Annotated[
        Optional[enums.ItemsResponseType],
        Query(
            description="Response MediaType. Defaults to endpoint's default or value defined in `accept` header."
        ),
    ] = None,
) -> Optional[enums.MediaType]:
    """Output MediaType: geojson, html, json, csv, geojsonseq, ndjson."""
    if f:
        return enums.MediaType[f.name]

    accepted_media = [enums.MediaType[v] for v in enums.ItemsResponseType.__members__]
    return accept_media_type(request.headers.get("accept", ""), accepted_media)


def ItemOutputType(
    request: Request,
    f: Annotated[
        Optional[enums.ItemResponseType],
        Query(
            description="Response MediaType. Defaults to endpoint's default or value defined in `accept` header."
        ),
    ] = None,
) -> Optional[enums.MediaType]:
    """Output MediaType: geojson, json or html."""
    if f:
        return enums.MediaType[f.name]

    accepted_media = [enums.MediaType[v] for v in enums.ItemResponseType.__members__]
    return accept_media_type(request.headers.get("accept", ""), accepted_media)


def bbox_query(
    bbox: Annotated[
        Optional[str],
        Query(description="Spatial Filter."),
    ] = None
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
    ids: Annotated[Optional[str], Query(description="Filter by Ids.")] = None,
) -> Optional[List[str]]:
    """Ids dependency."""
    return ids.split(",") if ids else None


def datetime_query(
    datetime: Annotated[Optional[str], Query(description="Temporal Filter.")] = None,
) -> Optional[List[str]]:
    """Datetime dependency."""
    if datetime:
        dt = datetime.split("/")
        if len(dt) > 2:
            raise HTTPException(status_code=422, detail="Invalid datetime: {datetime}")

        return dt

    return None


def properties_query(
    properties: Annotated[
        Optional[str],
        Query(
            description="Return only specific properties (comma-separated). If PROP-LIST is empty, no properties are returned. If not present, all properties are returned.",
        ),
    ] = None,
) -> Optional[List[str]]:
    """Return property list."""
    if properties is not None:
        return [p.strip() for p in properties.split(",")]

    return None


def properties_filter_query(
    request: Request,
    collection: Annotated[Collection, Depends(CollectionParams)],
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
    query: Annotated[
        Optional[str], Query(description="CQL2 Filter", alias="filter")
    ] = None,
    filter_lang: Annotated[
        Optional[enums.FilterLang],
        Query(
            description="CQL2 Language (cql2-text, cql2-json). Defaults to cql2-text.",
            alias="filter-lang",
        ),
    ] = None,
) -> Optional[AstType]:
    """Parse Filter Query."""
    if query is not None:
        if filter_lang == enums.FilterLang.cql2_json:
            return cql2_json_parser(query)

        # default to cql2-text
        return cql2_text_parser(query)

    return None


def sortby_query(
    sortby: Annotated[
        Optional[str],
        Query(
            description="Column Sort the items by Column (ascending (default) or descending).",
        ),
    ] = None,
):
    """Sortby dependency."""
    return sortby


def TileParams(
    z: Annotated[
        int,
        Path(
            ge=0,
            le=30,
            description="Identifier (Z) selecting one of the scales defined in the TileMatrixSet and representing the scaleDenominator the tile.",
        ),
    ],
    x: Annotated[
        int,
        Path(
            description="Column (X) index of the tile on the selected TileMatrix. It cannot exceed the MatrixHeight-1 for the selected TileMatrix.",
        ),
    ],
    y: Annotated[
        int,
        Path(
            description="Row (Y) index of the tile on the selected TileMatrix. It cannot exceed the MatrixWidth-1 for the selected TileMatrix.",
        ),
    ],
) -> Tile:
    """Tile parameters."""
    return Tile(x, y, z)


def function_parameters_query(  # noqa: C901
    request: Request,
    collection: Annotated[Collection, Depends(CollectionParams)],
) -> Dict[str, str]:
    """Get parameters for function layers."""
    function_parameters = {}
    errors = []

    is_tile_request = False
    if {"x", "y", "z"}.issubset(request.path_params):
        is_tile_request = True

    if collection.type == "Function" and collection.parameters:
        for col_param in collection.parameters:
            v = request.query_params.get(col_param.name, None)
            if v:
                function_parameters[col_param.name] = v

            elif col_param.name == "z" and is_tile_request:
                function_parameters["z"] = request.path_params.get("z")

            elif col_param.name == "x" and is_tile_request:
                function_parameters["x"] = request.path_params.get("x")

            elif col_param.name == "y" and is_tile_request:
                function_parameters["y"] = request.path_params.get("y")

            elif col_param.type == "geometry" and is_tile_request:
                z = int(request.path_params.get("z"))
                x = int(request.path_params.get("x"))
                y = int(request.path_params.get("y"))
                tms_id = request.path_params.get(
                    "tileMatrixSetId", tms_settings.default_tms
                )
                tms = default_tms.get(tms_id)
                left, bottom, right, top = tms.bounds(x, y, z)

                function_parameters[col_param.name] = (
                    "srid=4326;"
                    "POLYGON(("
                    f"{left} {bottom},"
                    f"{left} {top},"
                    f"{right} {top},"
                    f"{right} {bottom},"
                    f"{left} {bottom}"
                    "))"
                )

            elif col_param.default is not None:
                function_parameters[col_param.name] = col_param.default

            else:
                errors.append(f"{col_param.name} (expected type:{col_param.type}).")

    if errors:
        raise MissingFunctionParameter(
            f"Missing Required parameters for function: {collection.id}. {errors}"
        )

    return function_parameters
