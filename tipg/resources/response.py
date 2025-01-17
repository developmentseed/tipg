"""tipg custom responses."""

import decimal
from typing import Any

import orjson
from asyncpg.pgproto import pgproto

from fastapi.responses import JSONResponse


def default(obj):
    """Instruct orjson what to do with types it does not natively serialize"""
    if isinstance(obj, decimal.Decimal):
        return str(obj)
    elif isinstance(obj, pgproto.UUID):
        return str(obj)


def orjsonDumps(content: Any):
    """Small wrapper function to run the orjson.dumps with the additional options we want"""
    return orjson.dumps(
        content,
        default=default,
        option=orjson.OPT_NON_STR_KEYS | orjson.OPT_SERIALIZE_NUMPY,
    )


class ORJSONResponse(JSONResponse):
    """Custom response handler for using orjson"""

    def render(self, content: Any) -> bytes:
        """Render the content into a JSON response using orjson"""
        return orjsonDumps(content)


class GeoJSONResponse(ORJSONResponse):
    """GeoJSON Response"""

    media_type = "application/geo+json"


class SchemaJSONResponse(ORJSONResponse):
    """Schema Response"""

    media_type = "application/schema+json"
