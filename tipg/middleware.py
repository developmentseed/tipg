"""tipg middlewares."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Any, Optional, Protocol

from tipg.collections import Catalog
from tipg.errors import MissingCollectionCatalog
from tipg.logger import logger

from starlette.background import BackgroundTask
from starlette.datastructures import MutableHeaders
from starlette.requests import Request
from starlette.types import ASGIApp, Message, Receive, Scope, Send


@dataclass(frozen=True)
class CacheControlMiddleware:
    """MiddleWare to add CacheControl in response headers.

    Args:
        app (ASGIApp): starlette/FastAPI application.
        cachecontrol (str): Cache-Control string to add to the response.
        exclude_path (set): Set of regex expression to use to filter the path.

    """

    app: ASGIApp
    cachecontrol: str | None = None
    cachecontrol_max_http_code: int = 500
    exclude_path: set[str] = field(default_factory=set)

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
                            re.match(path, scope["path"]) for path in self.exclude_path
                        )
                    ):
                        response_headers["Cache-Control"] = self.cachecontrol

            await send(message)

        await self.app(scope, receive, send_wrapper)


class CatalogUpdateFunc(Protocol):
    """Catalog update function protocol."""

    async def __call__(self, app: ASGIApp, **kwargs: Any) -> None:
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
