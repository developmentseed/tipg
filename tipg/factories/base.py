"""tipg.factories.base: abstract factory base classes."""

import abc
from dataclasses import dataclass, field
from typing import Annotated, Any, Callable, List, Optional

from tipg import model
from tipg.dbmodel import Collection
from tipg.dependencies import CollectionParams, OutputType
from tipg.factories.utils import DEFAULT_TEMPLATES, create_html_response
from tipg.resources.enums import MediaType
from tipg.resources.response import ORJSONResponse

from fastapi import APIRouter, Depends

from starlette.requests import Request
from starlette.routing import compile_path, replace_params
from starlette.templating import Jinja2Templates, _TemplateResponse

COMMON_CONFORMS = [
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/landingPage",
    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/collections",
    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/simple-query",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/json",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/html",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/oas30",
]


@dataclass
class FactoryExtension(metaclass=abc.ABCMeta):
    """Factory Extension."""

    @abc.abstractmethod
    def register(self, factory: "EndpointsFactory"):
        """Register extension to the factory."""
        ...


# ref: https://github.com/python/mypy/issues/5374
@dataclass  # type: ignore
class EndpointsFactory(metaclass=abc.ABCMeta):
    """Endpoints Factory."""

    # FastAPI router
    router: APIRouter = field(default_factory=APIRouter)

    # collection dependency
    collection_dependency: Callable[..., Collection] = CollectionParams

    # Router Prefix is needed to find the path for routes when prefixed
    # e.g if you mount the route with `/foo` prefix, set router_prefix to foo
    router_prefix: str = ""

    extensions: List[FactoryExtension] = field(default_factory=list)

    templates: Jinja2Templates = DEFAULT_TEMPLATES

    # Full application with Landing and Conformance
    with_common: bool = True

    title: str = "OGC API"

    def __post_init__(self):
        """Post Init: register route and configure specific options."""
        if self.with_common:
            self._landing_route()
            self._conformance_route()

        self.register_routes()

        # Register Extensions
        for ext in self.extensions:
            ext.register(self)

    def url_for(self, request: Request, name: str, **path_params: Any) -> str:
        """Return full url (with prefix) for a specific handler."""
        url_path = self.router.url_path_for(name, **path_params)

        base_url = str(request.base_url)
        if self.router_prefix:
            prefix = self.router_prefix.lstrip("/")
            # If we have prefix with custom path param we check and replace them with
            # the path params provided
            if "{" in prefix:
                _, path_format, param_convertors = compile_path(prefix)
                prefix, _ = replace_params(
                    path_format, param_convertors, request.path_params.copy()
                )
            base_url += prefix

        return str(url_path.make_absolute_url(base_url=base_url))

    def _create_html_response(
        self,
        request: Request,
        data: Any,
        template_name: str,
        title: Optional[str] = None,
        **kwargs: Any,
    ) -> _TemplateResponse:
        return create_html_response(
            request,
            data,
            templates=self.templates,
            template_name=template_name,
            title=title,
            router_prefix=self.router_prefix,
            **kwargs,
        )

    @abc.abstractmethod
    def register_routes(self):
        """Register factory Routes."""
        ...

    @property
    @abc.abstractmethod
    def conforms_to(self) -> List[str]:
        """Endpoints conformances."""
        ...

    @abc.abstractmethod
    def links(self, request: Request) -> List[model.Link]:
        """Register factory Routes."""
        ...

    def _conformance_route(self):
        """Register Conformance (/conformance) route."""

        @self.router.get(
            "/conformance",
            response_model=model.Conformance,
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            responses={
                200: {
                    "content": {
                        MediaType.json.value: {},
                        MediaType.html.value: {},
                    }
                },
            },
            tags=["OGC Common"],
        )
        def conformance(
            request: Request,
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
        ):
            """Get conformance."""
            data = model.Conformance(conformsTo=[*COMMON_CONFORMS, *self.conforms_to])

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump(exclude_none=True, mode="json"),
                    template_name="conformance",
                )

            return data

    def _landing_route(self):
        """Register Landing (/) and Conformance (/conformance) routes."""

        @self.router.get(
            "/",
            response_model=model.Landing,
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            responses={
                200: {
                    "content": {
                        MediaType.json.value: {},
                        MediaType.html.value: {},
                    }
                },
            },
            tags=["OGC Common"],
        )
        def landing(
            request: Request,
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
        ):
            """Get landing page."""
            data = model.Landing(
                title=self.title,
                links=[
                    model.Link(
                        title="Landing Page",
                        href=self.url_for(request, "landing"),
                        type=MediaType.json,
                        rel="self",
                    ),
                    model.Link(
                        title="the API definition (JSON)",
                        href=str(request.url_for("openapi")),
                        type=MediaType.openapi30_json,
                        rel="service-desc",
                    ),
                    model.Link(
                        title="the API documentation",
                        href=str(request.url_for("swagger_ui_html")),
                        type=MediaType.html,
                        rel="service-doc",
                    ),
                    model.Link(
                        title="Conformance",
                        href=self.url_for(request, "conformance"),
                        type=MediaType.json,
                        rel="conformance",
                    ),
                    *self.links(request),
                ],
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump(exclude_none=True, mode="json"),
                    template_name="landing",
                    title=self.title,
                )

            return data
