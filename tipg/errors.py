"""tipg.errors: Error classes."""

import logging
from typing import Callable, Dict, Type

from asyncpg.exceptions._base import PostgresError

from fastapi import FastAPI

from starlette import status
from starlette.requests import Request
from starlette.responses import JSONResponse

logger = logging.getLogger(__name__)


class TiPgError(Exception):
    """Base exception class."""


class NotFound(TiPgError):
    """Invalid table name."""


class NoPrimaryKey(TiPgError):
    """Table has no primary key."""


class MissingGeometryColumn(TiPgError):
    """Table has no geometry column."""


class MissingDatetimeColumn(TiPgError):
    """Table has no datetime column."""


class InvalidBBox(TiPgError):
    """Invalid bounding box coordinates."""


class InvalidPropertyName(TiPgError):
    """Invalid property/column name."""


class InvalidGeometryColumnName(TiPgError):
    """Invalid geometry column name."""


class InvalidDatetimeColumnName(TiPgError):
    """Invalid datetime column name."""


class InvalidDatetime(TiPgError):
    """Invalid datetime."""


class InvalidLimit(TiPgError):
    """Invalid Limit."""


class MissingFunctionParameter(TiPgError):
    """Missing Function Parameter."""


class FunctionDirectoryDoesNotExist(TiPgError):
    """Function Directory Is Set But Does Not Exist."""


class MissingCollectionCatalog(TiPgError):
    """`collection_catalog` not registered in the application state."""


DEFAULT_STATUS_CODES = {
    NotFound: status.HTTP_404_NOT_FOUND,
    InvalidBBox: status.HTTP_422_UNPROCESSABLE_ENTITY,
    InvalidDatetime: status.HTTP_422_UNPROCESSABLE_ENTITY,
    InvalidLimit: status.HTTP_422_UNPROCESSABLE_ENTITY,
    MissingGeometryColumn: status.HTTP_500_INTERNAL_SERVER_ERROR,
    MissingDatetimeColumn: status.HTTP_500_INTERNAL_SERVER_ERROR,
    InvalidPropertyName: status.HTTP_404_NOT_FOUND,
    InvalidGeometryColumnName: status.HTTP_404_NOT_FOUND,
    InvalidDatetimeColumnName: status.HTTP_404_NOT_FOUND,
    PostgresError: status.HTTP_500_INTERNAL_SERVER_ERROR,
    Exception: status.HTTP_500_INTERNAL_SERVER_ERROR,
    NoPrimaryKey: status.HTTP_422_UNPROCESSABLE_ENTITY,
    MissingFunctionParameter: status.HTTP_422_UNPROCESSABLE_ENTITY,
    FunctionDirectoryDoesNotExist: status.HTTP_500_INTERNAL_SERVER_ERROR,
    MissingCollectionCatalog: status.HTTP_500_INTERNAL_SERVER_ERROR,
}


def exception_handler_factory(status_code: int) -> Callable:
    """
    Create a FastAPI exception handler from a status code.
    """

    def handler(request: Request, exc: Exception):
        logger.error(exc, exc_info=True)
        return JSONResponse(content={"detail": str(exc)}, status_code=status_code)

    return handler


def add_exception_handlers(
    app: FastAPI, status_codes: Dict[Type[Exception], int]
) -> None:
    """
    Add exception handlers to the FastAPI app.
    """
    for exc, code in status_codes.items():
        app.add_exception_handler(exc, exception_handler_factory(code))
