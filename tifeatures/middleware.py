"""tifeatures middlewares."""

import re
from typing import Optional, Set

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from fastapi import Response
from starlette.types import ASGIApp
import json

from fastapi.templating import Jinja2Templates


def existsIn(obj: dict, key: str):
    return key in obj


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

            if (
                request.method in ["HEAD", "GET"]
                and response.status_code < 500
            ):
                response.headers["Cache-Control"] = self.cachecontrol

        return response


class HTMLResponseMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, template_directory="templates/html-bootstrap4"):
        super().__init__(app)
        self.template_directory = template_directory
        self.templates = Jinja2Templates(directory="templates/html-bootstrap4")

    async def dispatch(self, request, call_next):

        response = await call_next(request)
        if response.status_code == 200 and (
            request.query_params.get("f") == "html"
            or request.headers.get("content-type", None) == "text/html"
        ):
            data = json.loads(([r async for r in response.body_iterator][0]))
            headers=dict(**response.headers)
            headers['content-type'] = 'text/html'
            route = request.scope['route']
            tpl = f"{route.endpoint.__name__}.html"
            urlpath = request.url.path
            crumbs=[]
            baseurl = str(request.base_url).rstrip('/')
            crumbpath = str(baseurl)
            for crumb in urlpath.split('/'):
                print(crumb)
                print(crumbpath)
                crumbpath = crumbpath.rstrip('/')
                part = crumb
                if part is None or part == '':
                    part = 'Home'
                crumbpath += f"/{crumb}"
                crumbs.append({
                    "url": crumbpath.rstrip('/'),
                    "part": part.capitalize()
                })
            print(crumbs)


            print(request.url)
            return self.templates.TemplateResponse(
                tpl,
                {
                    "request": request,
                    "response": data,
                    "template": {
                        "api_root": baseurl,
                        "params": request.query_params,
                        "title": "",
                    },
                    "crumbs": crumbs,
                    "json_url": str(request.url).replace('f=html','f=json')
                },
                headers=headers
            )
        return response
