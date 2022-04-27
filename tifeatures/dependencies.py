"""tifeatures dependencies."""

import re
from typing import Optional

from geojson_pydantic.geometries import Polygon

from tifeatures.layer import CollectionLayer

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

        table_catalog = getattr(request.app.state, "table_catalog", [])
        for r in table_catalog:
            if r.id == collectionId:
                return r

    raise HTTPException(
        status_code=404, detail=f"Table/Function '{collectionId}' not found."
    )


def bbox_query(
    intersects: Optional[str] = Query(
        None,
        alias="bbox",
        description="Filter features in response to ones intersecting a bounding box",
    )
) -> Optional[Polygon]:
    """BBox dependency."""
    if intersects:
        split_bbox = intersects.split(",")
        if len(split_bbox) not in [4, 6]:
            raise Exception("Invalid BBOX.")

        bounds = tuple(map(float, split_bbox))
        return Polygon.from_bounds(*bounds)

    return None
