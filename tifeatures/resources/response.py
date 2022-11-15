"""tifeatures custom responses."""

from fastapi.responses import ORJSONResponse


class GeoJSONResponse(ORJSONResponse):
    """GeoJSON Response"""

    media_type = "application/geo+json"


class SchemaJSONResponse(ORJSONResponse):
    """Schema Response"""

    media_type = "application/schema+json"
