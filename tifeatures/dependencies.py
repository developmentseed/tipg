"""tifeatures dependencies."""

import re
from typing import List, Optional

from tifeatures.layer import CollectionLayer
from tifeatures.layer import Table as TableLayer
from tifeatures.resources.enums import AcceptType, ResponseType

from fastapi import HTTPException, Path, Query

from starlette.requests import Request


def CollectionParams(
    request: Request,
    collectionId: str = Path(..., description="Collection identifier"),
) -> CollectionLayer:
    """Return Layer Object."""
    # Check function_catalog
    function_catalog = getattr(request.app.state, "function_catalog", {})
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
                status_code=404, detail=f"Invalid Table format '{collectionId}'."
            )

        assert table_pattern.groupdict()["schema"]
        assert table_pattern.groupdict()["table"]

        table_catalog = getattr(request.app.state, "table_catalog", {})

        table = table_catalog.tables[collectionId]
        if table is not None:
            props = {}
            for p in table.properties:
                props[p.name] = p

            return TableLayer(
                id=table.id,
                title=table.id,
                description=table.description,
                type="Table",
                schema=table.dbschema,
                table=table.table,
                geometry_type=table.geom_col().geometry_type,
                geometry_column=table.geom_col().name,
                geometry_srid=table.geom_col().srid,
                id_column=table.id_col,
                properties=props,
            )

    raise HTTPException(
        status_code=404, detail=f"Table/Function '{collectionId}' not found."
    )


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
                raise ValueError(f"Invalid longitude in bbox: {bounds}")
            if abs(bounds[1]) > 90 or abs(bounds[3]) > 90:
                raise ValueError(f"Invalid latitude in bbox: {bounds}")

        elif len(bounds) == 6:
            if abs(bounds[0]) > 180 or abs(bounds[3]) > 180:
                raise ValueError(f"Invalid longitude in bbox: {bounds}")
            if abs(bounds[1]) > 90 or abs(bounds[4]) > 90:
                raise ValueError(f"Invalid latitude in bbox: {bounds}")
        else:
            raise Exception("Invalid BBOX.")

        return bounds

    return None


def datetime_query(
    datetime: Optional[str] = Query(None, description="Temporal Filter."),
) -> Optional[str]:
    """Datetime dependency."""
    # TODO validation / format
    return datetime


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
