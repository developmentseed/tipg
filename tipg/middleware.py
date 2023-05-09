"""tipg middlewares."""

import re
from datetime import datetime, timedelta
from typing import Optional, Set

from tipg.db import register_collection_catalog
from tipg.logger import logger

from starlette.background import BackgroundTask
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.types import ASGIApp


class CacheControlMiddleware(BaseHTTPMiddleware):
    """MiddleWare to add CacheControl in response headers."""

    def __init__(
        self,
        app: ASGIApp,
        cachecontrol: Optional[str] = None,
        exclude_path: Optional[Set[str]] = None,
    ) -> None:
        """Init Middleware.

        Args:
            app (ASGIApp): starlette/FastAPI application.
            cachecontrol (str): Cache-Control string to add to the response.
            exclude_path (set): Set of regex expression to use to filter the path.

        """
        super().__init__(app)
        self.cachecontrol = cachecontrol
        self.exclude_path = exclude_path or set()

    async def dispatch(self, request: Request, call_next):
        """Add cache-control."""
        response = await call_next(request)
        if self.cachecontrol and not response.headers.get("Cache-Control"):
            for path in self.exclude_path:
                if re.match(path, request.url.path):
                    return response

            if request.method in ["HEAD", "GET"] and response.status_code < 500:
                response.headers["Cache-Control"] = self.cachecontrol

        return response


class CatalogUpdateMiddleware(BaseHTTPMiddleware):
    """Middleware to update the catalog cache."""

    def __init__(
        self,
        app: ASGIApp,
        ttl: int = 300,
    ) -> None:
        """Init Middleware.

        Args:
            app (ASGIApp): starlette/FastAPI application.
            ttl (int): time-to-live value in seconds. Defaults to 300.

        """
        super().__init__(app)
        self.ttl = ttl

    async def dispatch(self, request: Request, call_next):
        """Fetch Catalog either immediately or in background."""
        collection_catalog = getattr(request.app.state, "collection_catalog", {})
        collections = collection_catalog.get("collections")
        last_updated = collection_catalog.get("last_updated")

        if not collections or datetime.now() > (
            last_updated + timedelta(seconds=self.ttl)
        ):
            logger.debug("Running catalog refresh in background.")
            response = await call_next(request)
            response.background = BackgroundTask(
                register_collection_catalog, request.app
            )

        else:
            logger.debug("No need to refresh catalog.")
            response = await call_next(request)

        return response
