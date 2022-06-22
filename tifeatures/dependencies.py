"""tifeatures dependencies."""

import re
from typing import List, Optional

from pygeofilter.ast import AstType
from pygeofilter.parsers.cql2_json import parse as cql2_json_parser
from pygeofilter.parsers.cql2_text import parse as cql2_text_parser

from tifeatures.errors import InvalidBBox
from tifeatures.layer import CollectionLayer
from tifeatures.layer import Table as TableLayer
from tifeatures.resources.enums import AcceptType, FilterLang, ResponseType

from fastapi import HTTPException, Path, Query

from starlette.requests import Request


def CollectionParams(
    request: Request,
    collectionId: str = Path(..., description="Collection identifier"),
) -> CollectionLayer:
    """Return Layer Object."""
    # Check function_catalog
    function_catalog = getattr(request.app.state, "tifeatures_function_catalog", {})
    func = function_catalog.get(collectionId)
    if func:
        return func

    # Check table_catalog
    else:
        table_pattern = re.match(  # type: ignore
            r"^(?P<schema>.+)\.(?P<table>.+)$", collectionId
        )
        if not table_pattern:
            raise HTTPException(
                status_code=422, detail=f"Invalid Table format '{collectionId}'."
            )

        assert table_pattern.groupdict()["schema"]
        assert table_pattern.groupdict()["table"]

        table_catalog = getattr(request.app.state, "table_catalog", {})
        if collectionId in table_catalog:
            return TableLayer(**table_catalog[collectionId])

    raise HTTPException(
        status_code=404, detail=f"Table/Function '{collectionId}' not found."
    )


def OutputType(
    request: Request,
    f: Optional[ResponseType] = Query(None, description="Response MediaType."),
) -> Optional[ResponseType]:
    """Output Response type."""
    if f:
        return f

    accept_header = request.headers.get("accept", "")
    if accept_header in AcceptType.__members__.values():
        return ResponseType[AcceptType(accept_header).name]

    return None


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


def filter_query(
    query: Optional[str] = Query(None, description="CQL2 Filter", alias="filter"),
    filter_lang: Optional[FilterLang] = Query(
        FilterLang.cql2_text,
        description="CQL2 Language (cql2-text, cql2-json)",
        alias="filter-lang",
    ),
) -> Optional[AstType]:
    """Parse Filter Query."""
    if query is not None:
        if filter_lang == FilterLang.cql2_json:
            return cql2_json_parser(query)
        else:
            return cql2_text_parser(query)

    return None
