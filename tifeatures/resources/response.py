"""tifeatures custom responses."""

from starlette import responses


class GeoJSONResponse(responses.JSONResponse):
    """GeoJSON Response"""

    media_type = "application/geo+json"


class SchemaJSONResponse(responses.JSONResponse):
    """Schema Response"""

    media_type = "application/schema+json"
