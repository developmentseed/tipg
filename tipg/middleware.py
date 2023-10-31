"""tipg middlewares."""

import re
from datetime import datetime, timedelta
from typing import Any, Optional, Protocol, Set

from tipg.collections import Catalog
from tipg.errors import MissingCollectionCatalog
from tipg.logger import logger

from starlette.background import BackgroundTask
from starlette.datastructures import MutableHeaders
from starlette.requests import Request
from starlette.types import ASGIApp, Message, Receive, Scope, Send


class CacheControlMiddleware:
    """MiddleWare to add CacheControl in response headers."""

    def __init__(
        self,
        app: ASGIApp,
        cachecontrol: Optional[str] = None,
        cachecontrol_max_http_code: Optional[int] = 500,
        exclude_path: Optional[Set[str]] = None,
    ) -> None:
        """Init Middleware.

        Args:
            app (ASGIApp): starlette/FastAPI application.
            cachecontrol (str): Cache-Control string to add to the response.
            exclude_path (set): Set of regex expression to use to filter the path.

        """
        self.app = app
        self.cachecontrol = cachecontrol
        self.cachecontrol_max_http_code = cachecontrol_max_http_code
        self.exclude_path = exclude_path or set()

    async def __call__(self, scope: Scope, receive: Receive, send: Send):
        """Handle call."""
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        async def send_wrapper(message: Message):
            """Send Message."""
            if message["type"] == "http.response.start":
                response_headers = MutableHeaders(scope=message)
                if self.cachecontrol and not response_headers.get("Cache-Control"):
                    if (
                        scope["method"] in ["HEAD", "GET"]
                        and message["status"] < self.cachecontrol_max_http_code
                        and not any(
                            [
                                re.match(path, scope["path"])
                                for path in self.exclude_path
                            ]
                        )
                    ):
                        response_headers["Cache-Control"] = self.cachecontrol

            await send(message)

        await self.app(scope, receive, send_wrapper)


class CatalogUpdateFunc(Protocol):
    """Catalog update function protocol."""

    def __call__(self, app: ASGIApp, **kwargs: Any) -> None:
        """define input/output for the function."""
        ...


class CatalogUpdateMiddleware:
    """Middleware to update the catalog cache."""

    def __init__(
        self,
        app: ASGIApp,
        *,
        func: CatalogUpdateFunc,
        ttl: int = 300,
        **kwargs: Any,
    ) -> None:
        """Init Middleware."""
        self.app = app
        self.func = func
        self.ttl = ttl
        self.kwargs = kwargs

    async def __call__(self, scope: Scope, receive: Receive, send: Send):
        """Handle call."""
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        request = Request(scope)
        background: Optional[BackgroundTask] = None

        catalog: Catalog = getattr(request.app.state, "collection_catalog", None)
        if not catalog:
            raise MissingCollectionCatalog("Could not find collections catalog.")

        last_updated = catalog["last_updated"]
        if not last_updated or datetime.now() > (
            last_updated + timedelta(seconds=self.ttl)
        ):
            logger.debug(
                f"Running catalog refresh in background. Last Updated: {last_updated}"
            )
            background = BackgroundTask(
                self.func,
                request.app,
                **self.kwargs,
            )

        await self.app(scope, receive, send)
        if background:
            await background()
