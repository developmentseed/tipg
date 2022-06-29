"""tifeatures custom responses."""

try:
    import orjson

    from fastapi.responses import ORJSONResponse as JSONResponse
except ImportError:  # pragma: nocover
    orjson = None  # type: ignore
    from starlette.reponses import JSONResponse


class GeoJSONResponse(JSONResponse):
    """GeoJSON Response"""

    media_type = "application/geo+json"


class SchemaJSONResponse(JSONResponse):
    """Schema Response"""

    media_type = "application/schema+json"
