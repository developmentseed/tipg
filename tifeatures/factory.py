"""tifeatures.factory: router factories."""

import json
from dataclasses import dataclass, field
from typing import Any, Callable, List, Optional

import jinja2
from pygeofilter.ast import AstType

from tifeatures import model
from tifeatures.dependencies import (
    CollectionParams,
    OutputType,
    bbox_query,
    datetime_query,
    filter_query,
    ids_query,
    properties_query,
)
from tifeatures.errors import NotFound
from tifeatures.layer import CollectionLayer
from tifeatures.layer import Table as TableLayer
from tifeatures.resources.enums import MediaType, ResponseType
from tifeatures.resources.response import GeoJSONResponse, SchemaJSONResponse
from tifeatures.settings import APISettings

from fastapi import APIRouter, Depends, Path, Query

from starlette.datastructures import QueryParams
from starlette.requests import Request
from starlette.templating import Jinja2Templates, _TemplateResponse

settings = APISettings()

# custom template directory
templates_location: List[Any] = (
    [jinja2.FileSystemLoader(settings.template_directory)]
    if settings.template_directory
    else []
)
# default template directory
templates_location.append(jinja2.PackageLoader(__package__, "templates"))

templates = Jinja2Templates(
    directory="",  # we need to set a dummy directory variable, see https://github.com/encode/starlette/issues/1214
    loader=jinja2.ChoiceLoader(templates_location),
)


def create_html_response(
    request: Request, data: str, template_name: str
) -> _TemplateResponse:
    """Create Template response."""
    urlpath = request.url.path
    crumbs = []
    baseurl = str(request.base_url).rstrip("/")
    crumbpath = str(baseurl)
    for crumb in urlpath.split("/"):
        crumbpath = crumbpath.rstrip("/")
        part = crumb
        if part is None or part == "":
            part = "Home"
        crumbpath += f"/{crumb}"
        crumbs.append({"url": crumbpath.rstrip("/"), "part": part.capitalize()})

    return templates.TemplateResponse(
        f"{template_name}.html",
        {
            "request": request,
            "response": json.loads(data),
            "template": {
                "api_root": baseurl,
                "params": request.query_params,
                "title": "",
            },
            "crumbs": crumbs,
            "json_url": str(request.url).replace("f=html", "f=json"),
        },
    )


@dataclass
class Endpoints:
    """Endpoints Factory."""

    # FastAPI router
    router: APIRouter = field(default_factory=APIRouter)

    # collection dependency
    collection_dependency: Callable[..., CollectionLayer] = CollectionParams

    # Router Prefix is needed to find the path for routes when prefixed
    # e.g if you mount the route with `/foo` prefix, set router_prefix to foo
    router_prefix: str = ""

    def __post_init__(self):
        """Post Init: register route and configure specific options."""
        self.register_landing()
        self.register_conformance()
        self.register_collections()

    def url_for(self, request: Request, name: str, **path_params: Any) -> str:
        """Return full url (with prefix) for a specific handler."""
        url_path = self.router.url_path_for(name, **path_params)

        base_url = str(request.base_url)
        if self.router_prefix:
            base_url += self.router_prefix.lstrip("/")

        return url_path.make_absolute_url(base_url=base_url)

    def register_landing(self) -> None:
        """Register landing endpoint."""

        @self.router.get(
            "/",
            response_model=model.Landing,
            response_model_exclude_none=True,
            responses={
                200: {
                    "content": {
                        "text/html": {},
                        "application/json": {},
                    }
                },
            },
        )
        def landing(
            request: Request,
            output_type: Optional[ResponseType] = Depends(OutputType),
        ):
            """Get conformance."""
            data = model.Landing(
                title=settings.name,
                links=[
                    model.Link(
                        title="Landing Page",
                        href=self.url_for(request, "landing"),
                        type=MediaType.json,
                        rel="self",
                    ),
                    model.Link(
                        title="HTML Landing Page",
                        href=self.url_for(request, "landing") + "?f=html",
                        type=MediaType.html,
                        rel="alternate",
                    ),
                    model.Link(
                        title="the API definition",
                        href=request.url_for("openapi"),
                        type=MediaType.openapi30_json,
                        rel="service-desc",
                    ),
                    model.Link(
                        title="the API documentation",
                        href=request.url_for("swagger_ui_html"),
                        type=MediaType.html,
                        rel="service-doc",
                    ),
                    model.Link(
                        title="Conformance",
                        href=self.url_for(request, "conformance"),
                        type=MediaType.json,
                        rel="conformance",
                    ),
                    model.Link(
                        title="List of Collections",
                        href=self.url_for(request, "collections"),
                        type=MediaType.json,
                        rel="data",
                    ),
                    model.Link(
                        title="Collection metadata",
                        href=self.url_for(
                            request,
                            "collection",
                            collectionId="{collectionId}",
                        ),
                        type=MediaType.json,
                        rel="data",
                    ),
                    model.Link(
                        title="Collection queryables",
                        href=self.url_for(
                            request,
                            "queryables",
                            collectionId="{collectionId}",
                        ),
                        type=MediaType.schemajson,
                        rel="queryables",
                    ),
                    model.Link(
                        title="Collection Features",
                        href=self.url_for(
                            request, "items", collectionId="{collectionId}"
                        ),
                        type=MediaType.geojson,
                        rel="data",
                    ),
                    model.Link(
                        title="Collection Feature",
                        href=self.url_for(
                            request,
                            "item",
                            collectionId="{collectionId}",
                            itemId="{itemId}",
                        ),
                        type=MediaType.geojson,
                        rel="data",
                    ),
                ],
            )

            if output_type and output_type == ResponseType.html:
                return create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="landing",
                )

            return data

    def register_conformance(self) -> None:
        """Register conformance endpoint."""

        @self.router.get(
            "/conformance",
            response_model=model.Conformance,
            response_model_exclude_none=True,
            responses={
                200: {
                    "content": {
                        "text/html": {},
                        "application/json": {},
                    }
                },
            },
        )
        def conformance(
            request: Request,
            output_type: Optional[ResponseType] = Depends(OutputType),
        ):
            """Get conformance."""
            data = model.Conformance(
                conformsTo=[
                    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core",
                    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas3",
                    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson",
                    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/html",
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core",
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/landing-page",
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/json",
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/html",
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/oas30",
                    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/collections",
                    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/simple-query",
                    "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/filter,",
                    "http://www.opengis.net/def/rel/ogc/1.0/queryables",
                ]
            )
            if output_type and output_type == ResponseType.html:
                return create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="conformance",
                )

            return data

    def register_collections(self):  # noqa
        """Register Collections endpoints."""

        @self.router.get(
            "/collections",
            response_model=model.Collections,
            response_model_exclude_none=True,
            responses={
                200: {
                    "content": {
                        "text/html": {},
                        "application/json": {},
                    }
                },
            },
        )
        def collections(
            request: Request,
            output_type: Optional[ResponseType] = Depends(OutputType),
        ):
            """List of collections."""
            function_catalog = getattr(
                request.app.state, "tifeatures_function_catalog", {}
            )
            table_catalog = getattr(request.app.state, "table_catalog", {})
            # convert all table to Table object
            tables = [TableLayer(**t) for t in table_catalog.values()]

            data = model.Collections(
                links=[
                    model.Link(
                        href=self.url_for(request, "landing"),
                        rel="parent",
                        type=MediaType.json,
                    ),
                    model.Link(
                        href=self.url_for(request, "collections"),
                        rel="self",
                        type=MediaType.json,
                    ),
                    model.Link(
                        href=self.url_for(request, "collections") + "?f=html",
                        rel="alternate",
                        type=MediaType.html,
                    ),
                ],
                collections=[
                    model.Collection(
                        **{
                            "id": collection.id,
                            "title": collection.id,
                            "description": collection.description,
                            # TODO: Add Spatial/Temporal Extent
                            "links": [
                                model.Link(
                                    href=self.url_for(
                                        request,
                                        "collection",
                                        collectionId=collection.id,
                                    ),
                                    rel="collection",
                                    type=MediaType.json,
                                ),
                                model.Link(
                                    href=self.url_for(
                                        request,
                                        "items",
                                        collectionId=collection.id,
                                    ),
                                    rel="items",
                                    type=MediaType.geojson,
                                ),
                                model.Link(
                                    href=self.url_for(
                                        request,
                                        "queryables",
                                        collectionId=collection.id,
                                    ),
                                    rel="queryables",
                                    type=MediaType.schemajson,
                                ),
                            ],
                        }
                    )
                    for collection in [
                        *tables,
                        *list(function_catalog.values()),
                    ]
                ],
            )

            if output_type and output_type == ResponseType.html:
                return create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="collections",
                )

            return data

        @self.router.get(
            "/collections/{collectionId}",
            response_model=model.Collection,
            response_model_exclude_none=True,
            responses={
                200: {
                    "content": {
                        "text/html": {},
                        "application/json": {},
                    }
                },
            },
        )
        def collection(
            request: Request,
            collection=Depends(self.collection_dependency),
            output_type: Optional[ResponseType] = Depends(OutputType),
        ):
            """Metadata for a feature collection."""
            data = model.Collection(
                **{
                    **collection.dict(),
                    "links": [
                        model.Link(
                            href=self.url_for(
                                request,
                                "collection",
                                collectionId=collection.id,
                            ),
                            rel="self",
                            type=MediaType.json,
                        ),
                        model.Link(
                            href=self.url_for(
                                request, "collection", collectionId=collection.id
                            )
                            + "?f=html",
                            rel="alternate",
                            type=MediaType.html,
                        ),
                        model.Link(
                            href=self.url_for(
                                request, "items", collectionId=collection.id
                            ),
                            rel="items",
                            type=MediaType.geojson,
                        ),
                        model.Link(
                            href=self.url_for(
                                request,
                                "queryables",
                                collectionId=collection.id,
                            ),
                            rel="queryables",
                            type=MediaType.schemajson,
                        ),
                    ],
                }
            )

            if output_type and output_type == ResponseType.html:
                return create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="collection",
                )

            return data

        @self.router.get(
            "/collections/{collectionId}/queryables",
            response_model=model.Queryables,
            response_model_exclude_none=True,
            response_model_by_alias=True,
            response_class=SchemaJSONResponse,
            responses={
                200: {
                    "content": {
                        "text/html": {},
                        "application/schema+json": {},
                    }
                },
            },
        )
        def queryables(
            request: Request,
            collection=Depends(self.collection_dependency),
            output_type: Optional[ResponseType] = Depends(OutputType),
        ):
            """Queryables for a feature collection.

            ref: http://docs.ogc.org/DRAFTS/19-079r1.html#filter-queryables
            """
            qs = "?" + str(request.query_params) if request.query_params else ""

            data = model.Queryables(
                **{
                    "title": collection.id,
                    "$id": self.url_for(
                        request, "queryables", collectionId=collection.id
                    )
                    + qs,
                    "properties": collection.queryables,
                }
            )

            if output_type and output_type == ResponseType.html:
                return create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="queryables",
                )

            return data

        @self.router.get(
            "/collections/{collectionId}/items",
            response_model=model.Items,
            response_model_exclude_none=True,
            response_class=GeoJSONResponse,
            responses={
                200: {
                    "content": {
                        "text/html": {},
                        "application/geo+json": {},
                    }
                },
            },
        )
        async def items(
            request: Request,
            collection=Depends(self.collection_dependency),
            ids_filter: Optional[List[str]] = Depends(ids_query),
            bbox_filter: Optional[List[float]] = Depends(bbox_query),
            datetime_filter: Optional[List[str]] = Depends(datetime_query),
            properties: Optional[List[str]] = Depends(properties_query),
            cql_filter: Optional[AstType] = Depends(filter_query),
            geom_column: Optional[str] = Query(
                None,
                description="Select geometry column.",
                alias="geom-column",
            ),
            datetime_column: Optional[str] = Query(
                None,
                description="Select datetime column.",
                alias="datetime-column",
            ),
            limit: int = Query(
                10,
                description="Limits the number of features in the response.",
            ),
            offset: Optional[int] = Query(
                None,
                ge=0,
                description="Starts the response at an offset.",
            ),
            output_type: Optional[ResponseType] = Depends(OutputType),
            bbox_only: Optional[bool] = Query(
                None,
                description="Only return the bounding box of the feature.",
            ),
            simplify: Optional[float] = Query(
                None, description="Simplify the output geometry."
            ),
        ):
            offset = offset or 0

            # <p_NAME>=VALUE - filter features for a property having a value. Multiple property filters are ANDed together.
            exclude = [
                "f",
                "ids",
                "datetime",
                "bbox",
                "properties",
                "filter",
                "filter-lang",
                "geom-column",
                "datetime-column",
                "limit",
                "offset",
                "bbox_only",
                "simplify",
            ]
            properties_filter = [
                (key, value)
                for (key, value) in request.query_params.items()
                if key.lower() not in exclude
            ]

            items, matched_items = await collection.features(
                request.app.state.pool,
                ids_filter=ids_filter,
                bbox_filter=bbox_filter,
                datetime_filter=datetime_filter,
                properties_filter=properties_filter,
                cql_filter=cql_filter,
                properties=properties,
                limit=limit,
                offset=offset,
                geom=geom_column,
                dt=datetime_column,
                bbox_only=bbox_only,
                simplify=simplify,
            )

            qs = "?" + str(request.query_params) if request.query_params else ""
            links = [
                model.Link(
                    href=self.url_for(
                        request, "collection", collectionId=collection.id
                    ),
                    rel="collection",
                    type=MediaType.json,
                ),
                model.Link(
                    href=self.url_for(request, "items", collectionId=collection.id)
                    + qs,
                    rel="self",
                    type=MediaType.geojson,
                ),
            ]

            items_returned = len(items)

            if (matched_items - items_returned) > offset:
                next_offset = offset + items_returned
                query_params = QueryParams(
                    {**request.query_params, "offset": next_offset}
                )
                url = (
                    self.url_for(request, "items", collectionId=collection.id)
                    + f"?{query_params}"
                )
                links.append(
                    model.Link(href=url, rel="next", type=MediaType.geojson),
                )

            if offset:
                query_params = dict(request.query_params)
                query_params.pop("offset")
                prev_offset = max(offset - items_returned, 0)
                if prev_offset:
                    query_params = QueryParams({**query_params, "offset": prev_offset})
                else:
                    query_params = QueryParams({**query_params})

                url = self.url_for(request, "items", collectionId=collection.id)
                if query_params:
                    url += f"?{query_params}"

                links.append(
                    model.Link(href=url, rel="prev", type=MediaType.geojson),
                )

            data = model.Items(
                id=collection.id,
                title=collection.title or collection.id,
                description=collection.description or collection.title or collection.id,
                numberMatched=matched_items,
                numberReturned=items_returned,
                links=links,
                features=[
                    model.Item(
                        **{
                            **feature.dict(),
                            "links": [
                                model.Link(
                                    href=self.url_for(
                                        request,
                                        "collection",
                                        collectionId=collection.id,
                                    ),
                                    rel="collection",
                                    type=MediaType.json,
                                ),
                                model.Link(
                                    href=self.url_for(
                                        request,
                                        "item",
                                        collectionId=collection.id,
                                        itemId=feature.properties[collection.id_column],
                                    ),
                                    rel="item",
                                    type=MediaType.json,
                                ),
                            ],
                        }
                    )
                    for feature in items
                ],
            )

            if output_type and output_type == ResponseType.html:
                return create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="items",
                )

            return data

        @self.router.get(
            "/collections/{collectionId}/items/{itemId}",
            response_model=model.Item,
            response_model_exclude_none=True,
            response_class=GeoJSONResponse,
            responses={
                200: {
                    "content": {
                        "text/html": {},
                        "application/geo+json": {},
                    }
                },
            },
        )
        async def item(
            request: Request,
            collection=Depends(self.collection_dependency),
            itemId: str = Path(..., description="Item identifier"),
            output_type: Optional[ResponseType] = Depends(OutputType),
        ):
            feature = await collection.feature(
                request.app.state.pool,
                item_id=itemId,
            )

            if not feature:
                raise NotFound(
                    f"Item {itemId} in Collection {collection.id} does not exist."
                )

            data = model.Item(
                **feature.dict(),
                links=[
                    model.Link(
                        href=self.url_for(
                            request, "collection", collectionId=collection.id
                        ),
                        rel="collection",
                        type=MediaType.json,
                    ),
                    model.Link(
                        href=self.url_for(
                            request,
                            "item",
                            collectionId=collection.id,
                            itemId=itemId,
                        ),
                        rel="self",
                        type=MediaType.geojson,
                    ),
                ],
            )

            if output_type and output_type == ResponseType.html:
                return create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="item",
                )

            return data
