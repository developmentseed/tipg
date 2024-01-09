"""tipg.factory: router factories."""

import abc
import csv
import json
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, Generator, Iterable, List, Literal, Optional
from urllib.parse import urlencode

import jinja2
import orjson
from morecantile import Tile, TileMatrixSet
from morecantile import tms as default_tms
from morecantile.defaults import TileMatrixSets
from pygeofilter.ast import AstType
from typing_extensions import Annotated

from tipg import model
from tipg.collections import Collection, CollectionList
from tipg.dependencies import (
    CollectionParams,
    CollectionsParams,
    ItemsOutputType,
    OutputType,
    QueryablesOutputType,
    TileParams,
    bbox_query,
    datetime_query,
    filter_query,
    function_parameters_query,
    ids_query,
    properties_filter_query,
    properties_query,
    sortby_query,
)
from tipg.errors import MissingGeometryColumn, NoPrimaryKey, NotFound
from tipg.resources.enums import MediaType
from tipg.resources.response import GeoJSONResponse, SchemaJSONResponse, orjsonDumps
from tipg.settings import FeaturesSettings, MVTSettings, TMSSettings

from fastapi import APIRouter, Depends, Path, Query
from fastapi.responses import ORJSONResponse

from starlette.datastructures import QueryParams
from starlette.requests import Request
from starlette.responses import HTMLResponse, Response, StreamingResponse
from starlette.routing import compile_path, replace_params
from starlette.templating import Jinja2Templates, _TemplateResponse

tms_settings = TMSSettings()
mvt_settings = MVTSettings()
features_settings = FeaturesSettings()

DEFAULT_TEMPLATES = Jinja2Templates(
    directory="",
    loader=jinja2.ChoiceLoader([jinja2.PackageLoader(__package__, "templates")]),
)  # type:ignore


COMMON_CONFORMS = [
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/landingPage",
    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/collections",
    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/simple-query",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/json",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/html",
    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/oas30",
]
FEATURES_CONFORMS = [
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/html",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson",
    "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/filter",
    "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/features-filter",
]
TILES_CONFORMS = [
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/oas30",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/mvt",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tileset",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tilesets-list",
]


def create_csv_rows(data: Iterable[Dict]) -> Generator[str, None, None]:
    """Creates an iterator that returns lines of csv from an iterable of dicts."""

    class DummyWriter:
        """Dummy writer that implements write for use with csv.writer."""

        def write(self, line: str):
            """Return line."""
            return line

    # Get the first row and construct the column names
    row = next(data)  # type: ignore
    fieldnames = row.keys()
    writer = csv.DictWriter(DummyWriter(), fieldnames=fieldnames)

    # Write header
    yield writer.writerow(dict(zip(fieldnames, fieldnames)))

    # Write first row
    yield writer.writerow(row)

    # Write all remaining rows
    for row in data:
        yield writer.writerow(row)


def create_html_response(
    request: Request,
    data: str,
    templates: Jinja2Templates,
    template_name: str,
    router_prefix: Optional[str] = None,
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

    if router_prefix:
        baseurl += router_prefix

    return templates.TemplateResponse(
        f"{template_name}.html",
        {
            "request": request,
            "response": orjson.loads(data),
            "template": {
                "api_root": baseurl,
                "params": request.query_params,
                "title": "",
            },
            "crumbs": crumbs,
            "url": str(request.url),
            "baseurl": baseurl,
            "urlpath": str(request.url.path),
            "urlparams": str(request.url.query),
        },
    )


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

    templates: Jinja2Templates = DEFAULT_TEMPLATES

    # Full application with Landing and Conformance
    with_common: bool = True

    title: str = "OGC API"

    def __post_init__(self):
        """Post Init: register route and configure specific options."""
        self.register_routes()
        if self.with_common:
            self._conformance_route()
            self._landing_route()

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
        data: str,
        template_name: str,
    ) -> _TemplateResponse:
        return create_html_response(
            request,
            data,
            templates=self.templates,
            template_name=template_name,
            router_prefix=self.router_prefix,
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
                    data.model_dump_json(exclude_none=True),
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
                    data.model_dump_json(exclude_none=True),
                    template_name="landing",
                )

            return data


@dataclass
class OGCFeaturesFactory(EndpointsFactory):
    """OGC Features Endpoints Factory."""

    # collections dependency
    collections_dependency: Callable[..., CollectionList] = CollectionsParams

    @property
    def conforms_to(self) -> List[str]:
        """Factory conformances."""
        return FEATURES_CONFORMS

    def links(self, request: Request) -> List[model.Link]:
        """OGC Features API links."""
        return [
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
                href=self.url_for(request, "items", collectionId="{collectionId}"),
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
        ]

    def register_routes(self):
        """Register OGC Features endpoints."""
        self._collections_route()
        self._collection_route()
        self._queryables_route()
        self._items_route()
        self._item_route()

    def _collections_route(self):  # noqa: C901
        @self.router.get(
            "/collections",
            response_model=model.Collections,
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
            tags=["OGC Features API"],
        )
        def collections(
            request: Request,
            collection_list: Annotated[
                CollectionList,
                Depends(self.collections_dependency),
            ],
            output_type: Annotated[
                Optional[MediaType],
                Depends(OutputType),
            ] = None,
        ):
            """List of collections."""
            links: list = [
                model.Link(
                    href=self.url_for(request, "collections"),
                    rel="self",
                    type=MediaType.json,
                ),
            ]

            if next_token := collection_list["next"]:
                query_params = QueryParams(
                    {**request.query_params, "offset": next_token}
                )
                url = self.url_for(request, "collections") + f"?{query_params}"
                links.append(
                    model.Link(
                        href=url,
                        rel="next",
                        type=MediaType.json,
                        title="Next page",
                    ),
                )

            if collection_list["prev"] is not None:
                prev_token = collection_list["prev"]
                qp = dict(request.query_params)
                qp.pop("offset", None)
                query_params = QueryParams({**qp, "offset": prev_token})
                url = self.url_for(request, "collections")
                if query_params:
                    url += f"?{query_params}"

                links.append(
                    model.Link(
                        href=url,
                        rel="prev",
                        type=MediaType.json,
                        title="Previous page",
                    ),
                )

            data = model.Collections(
                links=links,
                numberMatched=collection_list["matched"],
                numberReturned=len(collection_list["collections"]),
                collections=[
                    model.Collection(
                        id=collection.id,
                        title=collection.id,
                        description=collection.description,
                        extent=collection.extent,
                        links=[
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
                    )
                    for collection in collection_list["collections"]
                ],
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump_json(exclude_none=True),
                    template_name="collections",
                )

            return data

    def _collection_route(self):
        @self.router.get(
            "/collections/{collectionId}",
            response_model=model.Collection,
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
            tags=["OGC Features API"],
        )
        def collection(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
        ):
            """Metadata for a feature collection."""

            data = model.Collection.model_validate(
                {
                    **collection.model_dump(),
                    "title": collection.id,
                    "extent": collection.extent,
                    "links": [
                        {
                            "href": self.url_for(
                                request,
                                "collection",
                                collectionId=collection.id,
                            ),
                            "rel": "self",
                            "type": "application/json",
                        },
                        {
                            "title": "Items",
                            "href": self.url_for(
                                request, "items", collectionId=collection.id
                            ),
                            "rel": "items",
                            "type": "application/geo+json",
                        },
                        {
                            "title": "Items (CSV)",
                            "href": self.url_for(
                                request, "items", collectionId=collection.id
                            )
                            + "?f=csv",
                            "rel": "alternate",
                            "type": "text/csv",
                        },
                        {
                            "title": "Items (GeoJSONSeq)",
                            "href": self.url_for(
                                request, "items", collectionId=collection.id
                            )
                            + "?f=geojsonseq",
                            "rel": "alternate",
                            "type": "application/geo+json-seq",
                        },
                        {
                            "title": "Queryables",
                            "href": self.url_for(
                                request,
                                "queryables",
                                collectionId=collection.id,
                            ),
                            "rel": "queryables",
                            "type": "application/schema+json",
                        },
                    ],
                }
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump_json(exclude_none=True),
                    template_name="collection",
                )

            return data

    def _queryables_route(self):
        @self.router.get(
            "/collections/{collectionId}/queryables",
            response_model=model.Queryables,
            response_model_exclude_none=True,
            response_model_by_alias=True,
            response_class=SchemaJSONResponse,
            responses={
                200: {
                    "content": {
                        MediaType.schemajson.value: {},
                        MediaType.html.value: {},
                    }
                },
            },
            tags=["OGC Features API"],
        )
        def queryables(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            output_type: Annotated[
                Optional[MediaType], Depends(QueryablesOutputType)
            ] = None,
        ):
            """Queryables for a feature collection.

            ref: http://docs.ogc.org/DRAFTS/19-079r1.html#filter-queryables
            """
            qs = "?" + str(request.query_params) if request.query_params else ""
            self_url = self.url_for(request, "queryables", collectionId=collection.id)
            data = model.Queryables(
                title=collection.id,
                link=self_url + qs,
                properties=collection.queryables,
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump_json(exclude_none=True),
                    template_name="queryables",
                )

            return data

    def _items_route(self):  # noqa: C901
        @self.router.get(
            "/collections/{collectionId}/items",
            response_class=GeoJSONResponse,
            responses={
                200: {
                    "content": {
                        MediaType.geojson.value: {},
                        MediaType.html.value: {},
                        MediaType.csv.value: {},
                        MediaType.json.value: {},
                        MediaType.geojsonseq.value: {},
                        MediaType.ndjson.value: {},
                    },
                    "model": model.Items,
                },
            },
            tags=["OGC Features API"],
        )
        async def items(  # noqa: C901
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            ids_filter: Annotated[Optional[List[str]], Depends(ids_query)],
            bbox_filter: Annotated[Optional[List[float]], Depends(bbox_query)],
            datetime_filter: Annotated[Optional[List[str]], Depends(datetime_query)],
            properties: Annotated[Optional[List[str]], Depends(properties_query)],
            cql_filter: Annotated[Optional[AstType], Depends(filter_query)],
            sortby: Annotated[Optional[str], Depends(sortby_query)],
            geom_column: Annotated[
                Optional[str],
                Query(
                    description="Select geometry column.",
                    alias="geom-column",
                ),
            ] = None,
            datetime_column: Annotated[
                Optional[str],
                Query(
                    description="Select datetime column.",
                    alias="datetime-column",
                ),
            ] = None,
            limit: Annotated[
                int,
                Query(
                    ge=0,
                    le=features_settings.max_features_per_query,
                    description="Limits the number of features in the response.",
                ),
            ] = features_settings.default_features_limit,
            offset: Annotated[
                Optional[int],
                Query(
                    ge=0,
                    description="Starts the response at an offset.",
                ),
            ] = None,
            bbox_only: Annotated[
                Optional[bool],
                Query(
                    description="Only return the bounding box of the feature.",
                    alias="bbox-only",
                ),
            ] = None,
            simplify: Annotated[
                Optional[float],
                Query(
                    description="Simplify the output geometry to given threshold in decimal degrees.",
                ),
            ] = None,
            output_type: Annotated[
                Optional[MediaType], Depends(ItemsOutputType)
            ] = None,
        ):
            output_type = output_type or MediaType.geojson
            geom_as_wkt = output_type not in [
                MediaType.geojson,
                MediaType.geojsonseq,
                MediaType.html,
            ]

            item_list = await collection.features(
                request.app.state.pool,
                ids_filter=ids_filter,
                bbox_filter=bbox_filter,
                datetime_filter=datetime_filter,
                properties_filter=properties_filter_query(request, collection),
                function_parameters=function_parameters_query(request, collection),
                cql_filter=cql_filter,
                sortby=sortby,
                properties=properties,
                limit=limit,
                offset=offset,
                geom=geom_column,
                dt=datetime_column,
                bbox_only=bbox_only,
                simplify=simplify,
                geom_as_wkt=geom_as_wkt,
            )

            if output_type in (
                MediaType.csv,
                MediaType.json,
                MediaType.ndjson,
            ):
                if any(
                    [f.get("geometry", None) is not None for f in item_list["items"]]
                ):
                    rows = (
                        {
                            "collectionId": collection.id,
                            "itemId": f.get("id"),
                            **f.get("properties", {}),
                            "geometry": f.get("geometry", None),
                        }
                        for f in item_list["items"]
                    )
                else:
                    rows = (
                        {
                            "collectionId": collection.id,
                            "itemId": f.get("id"),
                            **f.get("properties", {}),
                        }
                        for f in item_list["items"]
                    )

                # CSV Response
                if output_type == MediaType.csv:
                    return StreamingResponse(
                        create_csv_rows(rows),
                        media_type=MediaType.csv,
                        headers={
                            "Content-Disposition": "attachment;filename=items.csv"
                        },
                    )

                # JSON Response
                if output_type == MediaType.json:
                    return ORJSONResponse(list(rows))

                # NDJSON Response
                if output_type == MediaType.ndjson:
                    return StreamingResponse(
                        (orjsonDumps(row) + b"\n" for row in rows),
                        media_type=MediaType.ndjson,
                        headers={
                            "Content-Disposition": "attachment;filename=items.ndjson"
                        },
                    )

            qs = "?" + str(request.query_params) if request.query_params else ""
            links: List[Dict] = [
                {
                    "title": "Collection",
                    "href": self.url_for(
                        request, "collection", collectionId=collection.id
                    ),
                    "rel": "collection",
                    "type": "application/json",
                },
                {
                    "title": "Items",
                    "href": self.url_for(request, "items", collectionId=collection.id)
                    + qs,
                    "rel": "self",
                    "type": "application/geo+json",
                },
            ]

            if next_token := item_list["next"]:
                query_params = QueryParams(
                    {**request.query_params, "offset": next_token}
                )
                url = (
                    self.url_for(request, "items", collectionId=collection.id)
                    + f"?{query_params}"
                )
                links.append(
                    {
                        "href": url,
                        "rel": "next",
                        "type": "application/geo+json",
                        "title": "Next page",
                    },
                )

            if item_list["prev"] is not None:
                prev_token = item_list["prev"]
                qp = dict(request.query_params)
                qp.pop("offset")
                query_params = QueryParams({**qp, "offset": prev_token})
                url = self.url_for(request, "items", collectionId=collection.id)
                if query_params:
                    url += f"?{query_params}"

                links.append(
                    {
                        "href": url,
                        "rel": "prev",
                        "type": "application/geo+json",
                        "title": "Previous page",
                    },
                )

            data = {
                "type": "FeatureCollection",
                "id": collection.id,
                "title": collection.title or collection.id,
                "description": collection.description
                or collection.title
                or collection.id,
                "numberMatched": item_list["matched"],
                "numberReturned": len(item_list["items"]),
                "links": links,
                "features": [
                    {
                        **feature,  # type: ignore
                        "links": [
                            {
                                "title": "Collection",
                                "href": self.url_for(
                                    request,
                                    "collection",
                                    collectionId=collection.id,
                                ),
                                "rel": "collection",
                                "type": "application/json",
                            },
                            {
                                "title": "Item",
                                "href": self.url_for(
                                    request,
                                    "item",
                                    collectionId=collection.id,
                                    itemId=feature.get("id"),
                                ),
                                "rel": "item",
                                "type": "application/geo+json",
                            },
                        ],
                    }
                    for feature in item_list["items"]
                ],
            }

            # HTML Response
            if output_type == MediaType.html:
                return self._create_html_response(
                    request, orjsonDumps(data).decode(), template_name="items"
                )

            # GeoJSONSeq Response
            elif output_type == MediaType.geojsonseq:
                return StreamingResponse(
                    (orjsonDumps(f) + b"\n" for f in data["features"]),  # type: ignore
                    media_type=MediaType.geojsonseq,
                    headers={
                        "Content-Disposition": "attachment;filename=items.geojson"
                    },
                )

            # Default to GeoJSON Response
            return GeoJSONResponse(data)

    def _item_route(self):
        @self.router.get(
            "/collections/{collectionId}/items/{itemId}",
            response_class=GeoJSONResponse,
            responses={
                200: {
                    "content": {
                        MediaType.geojson.value: {},
                        MediaType.html.value: {},
                        MediaType.csv.value: {},
                        MediaType.json.value: {},
                        MediaType.geojsonseq.value: {},
                        MediaType.ndjson.value: {},
                    },
                    "model": model.Item,
                },
            },
            tags=["OGC Features API"],
        )
        async def item(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            itemId: Annotated[str, Path(description="Item identifier")],
            bbox_only: Annotated[
                Optional[bool],
                Query(
                    description="Only return the bounding box of the feature.",
                    alias="bbox-only",
                ),
            ] = None,
            simplify: Annotated[
                Optional[float],
                Query(
                    description="Simplify the output geometry to given threshold in decimal degrees.",
                ),
            ] = None,
            geom_column: Annotated[
                Optional[str],
                Query(
                    description="Select geometry column.",
                    alias="geom-column",
                ),
            ] = None,
            datetime_column: Annotated[
                Optional[str],
                Query(
                    description="Select datetime column.",
                    alias="datetime-column",
                ),
            ] = None,
            properties: Optional[List[str]] = Depends(properties_query),
            output_type: Annotated[
                Optional[MediaType], Depends(ItemsOutputType)
            ] = None,
        ):
            if collection.id_column is None:
                raise NoPrimaryKey("No primary key is set on this table")

            output_type = output_type or MediaType.geojson
            geom_as_wkt = output_type not in [
                MediaType.geojson,
                MediaType.geojsonseq,
                MediaType.html,
            ]

            item_list = await collection.features(
                pool=request.app.state.pool,
                bbox_only=bbox_only,
                simplify=simplify,
                ids_filter=[itemId],
                properties=properties,
                function_parameters=function_parameters_query(request, collection),
                geom=geom_column,
                dt=datetime_column,
                geom_as_wkt=geom_as_wkt,
            )

            if not item_list["items"]:
                raise NotFound(
                    f"Item {itemId} in Collection {collection.id} does not exist."
                )

            feature = item_list["items"][0]

            if output_type in (
                MediaType.csv,
                MediaType.json,
                MediaType.ndjson,
            ):
                row = {
                    "collectionId": collection.id,
                    "itemId": feature.get("id"),
                    **feature.get("properties", {}),
                }
                if feature.get("geometry") is not None:
                    row["geometry"] = (feature["geometry"],)
                rows = iter([row])

                # CSV Response
                if output_type == MediaType.csv:
                    return StreamingResponse(
                        create_csv_rows(rows),
                        media_type=MediaType.csv,
                        headers={
                            "Content-Disposition": "attachment;filename=items.csv"
                        },
                    )

                # JSON Response
                if output_type == MediaType.json:
                    return ORJSONResponse(rows.__next__())

                # NDJSON Response
                if output_type == MediaType.ndjson:
                    return StreamingResponse(
                        (orjsonDumps(row) + b"\n" for row in rows),
                        media_type=MediaType.ndjson,
                        headers={
                            "Content-Disposition": "attachment;filename=items.ndjson"
                        },
                    )

            data = {
                **feature,  # type: ignore
                "links": [
                    {
                        "href": self.url_for(
                            request, "collection", collectionId=collection.id
                        ),
                        "rel": "collection",
                        "type": "application/json",
                    },
                    {
                        "href": self.url_for(
                            request,
                            "item",
                            collectionId=collection.id,
                            itemId=itemId,
                        ),
                        "rel": "self",
                        "type": "application/geo+json",
                    },
                ],
            }

            # HTML Response
            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    orjsonDumps(data).decode(),
                    template_name="item",
                )

            # Default to GeoJSON Response
            return GeoJSONResponse(data)


@dataclass
class OGCTilesFactory(EndpointsFactory):
    """OGC Tiles Endpoints Factory."""

    supported_tms: TileMatrixSets = default_tms
    with_viewer: bool = True

    @property
    def conforms_to(self) -> List[str]:
        """Factory conformances."""
        return TILES_CONFORMS

    def links(self, request: Request) -> List[model.Link]:
        """OGC Tiles API links."""
        return [
            model.Link(
                title="Collection Vector Tiles",
                href=self.url_for(
                    request,
                    "collection_get_tile",
                    collectionId="{collectionId}",
                    z="{z}",
                    x="{x}",
                    y="{y}",
                ),
                type=MediaType.mvt,
                rel="data",
            ),
            model.Link(
                title="Collection TileSets",
                href=self.url_for(
                    request,
                    "collection_tileset_list",
                    collectionId="{collectionId}",
                ),
                type=MediaType.json,
                rel="data",
            ),
            model.Link(
                title="Collection TileSet",
                href=self.url_for(
                    request,
                    "collection_tileset",
                    collectionId="{collectionId}",
                    tileMatrixSetId="{tileMatrixSetId}",
                ),
                type=MediaType.json,
                rel="data",
            ),
            model.Link(
                title="TileMatrixSets",
                href=self.url_for(
                    request,
                    "tilematrixsets",
                ),
                type=MediaType.json,
                rel="data",
            ),
            model.Link(
                title="TileMatrixSet",
                href=self.url_for(
                    request,
                    "tilematrixset",
                    tileMatrixSetId="{tileMatrixSetId}",
                ),
                type=MediaType.json,
                rel="data",
            ),
        ]

    def register_routes(self):  # noqa: C901
        """Register OGC Tiles endpoints."""
        self._tilematrixsets_routes()
        self._tilesets_routes()
        self._tile_routes()
        self._tilejson_routes()
        self._stylejson_routes()

    def _tilematrixsets_routes(self):
        @self.router.get(
            r"/tileMatrixSets",
            response_model=model.TileMatrixSetList,
            response_model_exclude_none=True,
            summary="Retrieve the list of available tiling schemes (tile matrix sets).",
            operation_id="getTileMatrixSetsList",
            responses={
                200: {
                    "content": {
                        MediaType.html.value: {},
                        MediaType.json.value: {},
                    },
                },
            },
            tags=["OGC Tiles API"],
        )
        async def tilematrixsets(
            request: Request,
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
        ):
            """
            OGC Specification: http://docs.opengeospatial.org/per/19-069.html#_tilematrixsets
            """
            data = model.TileMatrixSetList(
                tileMatrixSets=[
                    model.TileMatrixSetRef(
                        id=tms_id,
                        title=f"Definition of {tms_id} tileMatrixSets",
                        links=[
                            model.TileMatrixSetLink(
                                href=self.url_for(
                                    request,
                                    "tilematrixset",
                                    tileMatrixSetId=tms_id,
                                ),
                                rel="http://www.opengis.net/def/rel/ogc/1.0/tiling-schemes",
                                type=MediaType.json,
                            )
                        ],
                    )
                    for tms_id in self.supported_tms.list()
                ]
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump_json(exclude_none=True),
                    template_name="tilematrixsets",
                )

            return data

        @self.router.get(
            "/tileMatrixSets/{tileMatrixSetId}",
            response_model=TileMatrixSet,
            response_model_exclude_none=True,
            summary="Retrieve the definition of the specified tiling scheme (tile matrix set).",
            operation_id="getTileMatrixSet",
            responses={
                200: {
                    "content": {
                        MediaType.html.value: {},
                        MediaType.json.value: {},
                    },
                },
            },
            tags=["OGC Tiles API"],
        )
        async def tilematrixset(
            request: Request,
            tileMatrixSetId: Annotated[
                Literal[tuple(self.supported_tms.list())],
                Path(description="Identifier for a supported TileMatrixSet."),
            ],
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
        ):
            """
            OGC Specification: http://docs.opengeospatial.org/per/19-069.html#_tilematrixset
            """
            data = self.supported_tms.get(tileMatrixSetId)

            if output_type == MediaType.html:
                # For visualization purpose we add the tms bbox
                data = {
                    **data.model_dump(exclude_none=True, mode="json"),
                    "bbox": data.bbox,
                }
                return self._create_html_response(
                    request,
                    json.dumps(
                        data,
                    ),
                    template_name="tilematrixset",
                )

            return data

    def _tilesets_routes(self):
        @self.router.get(
            "/collections/{collectionId}/tiles",
            response_model=model.TileSetList,
            response_class=ORJSONResponse,
            response_model_exclude_none=True,
            responses={
                200: {
                    "content": {
                        MediaType.json.value: {},
                        MediaType.html.value: {},
                    }
                }
            },
            summary="Retrieve a list of available vector tilesets for the specified collection.",
            operation_id=".collection.vector.getTileSetsList",
            tags=["OGC Tiles API"],
        )
        async def collection_tileset_list(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
        ):
            """Retrieve a list of available vector tilesets for the specified collection."""
            collection_bbox = None
            if bounds := collection.bounds:
                collection_bbox = {
                    "lowerLeft": [bounds[0], bounds[1]],
                    "upperRight": [bounds[2], bounds[3]],
                    "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
                }

            data = model.TileSetList.model_validate(
                {
                    "tilesets": [
                        {
                            "title": f"'{collection.id}' tileset tiled using {tms} TileMatrixSet",
                            "dataType": "vector",
                            "crs": self.supported_tms.get(tms).crs,
                            "boundingBox": collection_bbox,
                            "links": [
                                {
                                    "href": self.url_for(
                                        request,
                                        "collection_tileset",
                                        collectionId=collection.id,
                                        tileMatrixSetId=tms,
                                    ),
                                    "rel": "self",
                                    "type": "application/json",
                                    "title": f"'{collection.id}' tileset tiled using {tms} TileMatrixSet",
                                },
                                {
                                    "href": self.url_for(
                                        request,
                                        "tilematrixset",
                                        tileMatrixSetId=tms,
                                    ),
                                    "rel": "http://www.opengis.net/def/rel/ogc/1.0/tiling-schemes",
                                    "type": "application/json",
                                    "title": f"Definition of '{tms}' tileMatrixSet",
                                },
                                {
                                    "href": self.url_for(
                                        request,
                                        "collection_get_tile",
                                        tileMatrixSetId=tms,
                                        collectionId=collection.id,
                                        z="{z}",
                                        x="{x}",
                                        y="{y}",
                                    ),
                                    "rel": "tile",
                                    "type": "application/vnd.mapbox-vector-tile",
                                    "title": "Templated link for retrieving Vector tiles",
                                },
                            ],
                        }
                        for tms in self.supported_tms.list()
                    ]
                }
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump_json(exclude_none=True),
                    template_name="tilesets",
                )

            return data

        @self.router.get(
            "/collections/{collectionId}/tiles/{tileMatrixSetId}",
            response_model=model.TileSet,
            response_class=ORJSONResponse,
            response_model_exclude_none=True,
            responses={200: {"content": {MediaType.json.value: {}}}},
            summary="Retrieve the vector tileset metadata for the specified collection and tiling scheme (tile matrix set).",
            operation_id=".collection.vector.getTileSet",
            tags=["OGC Tiles API"],
        )
        async def collection_tileset(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            tileMatrixSetId: Annotated[
                Literal[tuple(self.supported_tms.list())],
                Path(description="Identifier for a supported TileMatrixSet."),
            ],
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
        ):
            """Retrieve the vector tileset metadata for the specified collection and tiling scheme (tile matrix set)."""
            tms = self.supported_tms.get(tileMatrixSetId)

            if bounds := collection.bounds:
                collection_bbox = {
                    "lowerLeft": [bounds[0], bounds[1]],
                    "upperRight": [bounds[2], bounds[3]],
                    "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
                }

                tilematrix_limit = []
                for matrix in tms:
                    ulTile = tms.tile(bounds[0], bounds[3], int(matrix.id))
                    lrTile = tms.tile(bounds[2], bounds[1], int(matrix.id))
                    minx, maxx = (min(ulTile.x, lrTile.x), max(ulTile.x, lrTile.x))
                    miny, maxy = (min(ulTile.y, lrTile.y), max(ulTile.y, lrTile.y))
                    tilematrix_limit.append(
                        {
                            "tileMatrix": matrix.id,
                            "minTileRow": max(miny, 0),
                            "maxTileRow": min(maxy, matrix.matrixHeight),
                            "minTileCol": max(minx, 0),
                            "maxTileCol": min(maxx, matrix.matrixWidth),
                        }
                    )

            else:
                collection_bbox = None
                tilematrix_limit = [
                    {
                        "tileMatrix": matrix.id,
                        "minTileRow": 0,
                        "maxTileRow": matrix.matrixHeight,
                        "minTileCol": 0,
                        "maxTileCol": matrix.matrixWidth,
                    }
                    for matrix in tms
                ]

            data = model.TileSet.model_validate(
                {
                    "title": f"'{collection.id}' tileset tiled using {tileMatrixSetId} TileMatrixSet",
                    "dataType": "vector",
                    "crs": tms.crs,
                    "boundingBox": collection_bbox,
                    "links": [
                        {
                            "href": self.url_for(
                                request,
                                "collection_tileset",
                                collectionId=collection.id,
                                tileMatrixSetId=tileMatrixSetId,
                            ),
                            "rel": "self",
                            "type": "application/json",
                            "title": f"'{collection.id}' tileset tiled using {tileMatrixSetId} TileMatrixSet",
                        },
                        {
                            "href": self.url_for(
                                request,
                                "tilematrixset",
                                tileMatrixSetId=tileMatrixSetId,
                            ),
                            "rel": "http://www.opengis.net/def/rel/ogc/1.0/tiling-schemes",
                            "type": "application/json",
                            "title": f"Definition of '{tileMatrixSetId}' tileMatrixSet",
                        },
                        {
                            "href": self.url_for(
                                request,
                                "collection_get_tile",
                                tileMatrixSetId=tileMatrixSetId,
                                collectionId=collection.id,
                                z="{z}",
                                x="{x}",
                                y="{y}",
                            ),
                            "rel": "tile",
                            "type": "application/vnd.mapbox-vector-tile",
                            "title": "Templated link for retrieving Vector tiles",
                        },
                    ],
                    "tileMatrixSetLimits": tilematrix_limit,
                }
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump_json(exclude_none=True),
                    template_name="tileset",
                )

            return data

    def _tile_routes(self):
        @self.router.get(
            "/collections/{collectionId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}",
            response_class=Response,
            responses={200: {"content": {MediaType.mvt.value: {}}}},
            operation_id=".collection.vector.getTileTms",
            tags=["OGC Tiles API"],
        )
        @self.router.get(
            "/collections/{collectionId}/tiles/{z}/{x}/{y}",
            response_class=Response,
            responses={200: {"content": {MediaType.mvt.value: {}}}},
            operation_id=".collection.vector.getTile",
            tags=["OGC Tiles API"],
        )
        async def collection_get_tile(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            tile: Annotated[Tile, Depends(TileParams)],
            tileMatrixSetId: Annotated[
                Literal[tuple(self.supported_tms.list())],
                f"Identifier selecting one of the TileMatrixSetId supported (default: '{tms_settings.default_tms}')",
            ] = tms_settings.default_tms,
            ids_filter: Annotated[Optional[List[str]], Depends(ids_query)] = None,
            bbox_filter: Annotated[Optional[List[float]], Depends(bbox_query)] = None,
            datetime_filter: Annotated[
                Optional[List[str]], Depends(datetime_query)
            ] = None,
            properties: Annotated[
                Optional[List[str]], Depends(properties_query)
            ] = None,
            cql_filter: Annotated[Optional[AstType], Depends(filter_query)] = None,
            sortby: Annotated[Optional[str], Depends(sortby_query)] = None,
            geom_column: Annotated[
                Optional[str],
                Query(
                    description="Select geometry column.",
                    alias="geom-column",
                ),
            ] = None,
            datetime_column: Annotated[
                Optional[str],
                Query(
                    description="Select datetime column.",
                    alias="datetime-column",
                ),
            ] = None,
            limit: Annotated[
                Optional[int],
                Query(
                    description="Limits the number of features in the response. Defaults to 10000 or TIPG_MAX_FEATURES_PER_TILE environment variable."
                ),
            ] = None,
        ):
            """Return Vector Tile."""
            tms = self.supported_tms.get(tileMatrixSetId)

            tile = await collection.get_tile(
                pool=request.app.state.pool,
                tms=tms,
                tile=tile,
                ids_filter=ids_filter,
                bbox_filter=bbox_filter,
                datetime_filter=datetime_filter,
                properties_filter=properties_filter_query(request, collection),
                function_parameters=function_parameters_query(request, collection),
                cql_filter=cql_filter,
                sortby=sortby,
                properties=properties,
                limit=limit,
                geom=geom_column,
                dt=datetime_column,
            )

            return Response(bytes(tile), media_type=MediaType.mvt.value)

    def _tilejson_routes(self):
        ############################################################################
        # ADDITIONAL ENDPOINTS NOT IN OGC Tiles API (tilejson, style.json, viewer) #
        ############################################################################
        @self.router.get(
            "/collections/{collectionId}/{tileMatrixSetId}/tilejson.json",
            response_model=model.TileJSON,
            responses={200: {"description": "Return a tilejson"}},
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            operation_id=".collection.vector.getTileJSONTms",
            tags=["OGC Tiles API"],
        )
        @self.router.get(
            "/collections/{collectionId}/tilejson.json",
            response_model=model.TileJSON,
            responses={200: {"description": "Return a tilejson"}},
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            operation_id=".collection.vector.getTileJSON",
            tags=["OGC Tiles API"],
        )
        async def collection_tilejson(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            tileMatrixSetId: Annotated[
                Literal[tuple(self.supported_tms.list())],
                f"Identifier selecting one of the TileMatrixSetId supported (default: '{tms_settings.default_tms}')",
            ] = tms_settings.default_tms,
            minzoom: Annotated[
                Optional[int],
                Query(description="Overwrite default minzoom."),
            ] = None,
            maxzoom: Annotated[
                Optional[int],
                Query(description="Overwrite default maxzoom."),
            ] = None,
            geom_column: Annotated[
                Optional[str],
                Query(
                    description="Select geometry column.",
                    alias="geom-column",
                ),
            ] = None,
        ):
            """Return TileJSON document."""
            tms = self.supported_tms.get(tileMatrixSetId)

            geom = collection.get_geometry_column(geom_column)
            if not geom:
                raise MissingGeometryColumn

            path_params: Dict[str, Any] = {
                "tileMatrixSetId": tileMatrixSetId,
                "collectionId": collection.id,
                "z": "{z}",
                "x": "{x}",
                "y": "{y}",
            }
            tile_endpoint = self.url_for(request, "collection_get_tile", **path_params)

            qs_key_to_remove = ["tilematrixsetid", "minzoom", "maxzoom"]
            query_params = [
                (key, value)
                for (key, value) in request.query_params._list
                if key.lower() not in qs_key_to_remove
            ]

            if query_params:
                tile_endpoint += f"?{urlencode(query_params)}"

            # Get Min/Max zoom from layer settings if tms is the default tms
            if tileMatrixSetId == tms_settings.default_tms:
                minzoom = minzoom or tms_settings.default_minzoom
                maxzoom = maxzoom or tms_settings.default_maxzoom

            minzoom = minzoom if minzoom is not None else tms.minzoom
            maxzoom = maxzoom if maxzoom is not None else tms.maxzoom

            tile_json = {
                "minzoom": minzoom,
                "maxzoom": maxzoom,
                "name": collection.id,
                "tiles": [tile_endpoint],
            }
            if collection.bounds:
                tile_json["bounds"] = collection.bounds

            layername = collection.id if mvt_settings.set_mvt_layername else "default"
            tile_json["vector_layers"] = [
                {
                    "id": layername,
                    "fields": {
                        col.name: col.json_type
                        for col in collection.properties
                        if col.type not in ["geometry", "geography"]
                    },
                    "minzoom": minzoom,
                    "maxzoom": maxzoom,
                }
            ]

            return tile_json

    def _stylejson_routes(self):
        @self.router.get(
            "/collections/{collectionId}/{tileMatrixSetId}/style.json",
            response_model=model.StyleJSON,
            responses={200: {"description": "Return a tilejson"}},
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            operation_id=".collection.vector.getStyleJSONTms",
            tags=["OGC Tiles API"],
        )
        @self.router.get(
            "/collections/{collectionId}/style.json",
            response_model=model.StyleJSON,
            responses={200: {"description": "Return a StyleJSON"}},
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            operation_id=".collection.vector.getStyleJSON",
            tags=["OGC Tiles API"],
        )
        async def collection_stylejson(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            tileMatrixSetId: Annotated[
                Literal[tuple(self.supported_tms.list())],
                f"Identifier selecting one of the TileMatrixSetId supported (default: '{tms_settings.default_tms}')",
            ] = tms_settings.default_tms,
            geom_column: Annotated[
                Optional[str],
                Query(
                    description="Select geometry column.",
                    alias="geom-column",
                ),
            ] = None,
            minzoom: Annotated[
                Optional[int],
                Query(description="Overwrite default minzoom."),
            ] = None,
            maxzoom: Annotated[
                Optional[int],
                Query(description="Overwrite default maxzoom."),
            ] = None,
        ):
            """Return Mapbox/Maplibre StyleJSON document."""
            tms = self.supported_tms.get(tileMatrixSetId)

            geom = collection.get_geometry_column(geom_column)
            if not geom:
                raise MissingGeometryColumn

            path_params: Dict[str, Any] = {
                "collectionId": collection.id,
                "tileMatrixSetId": tileMatrixSetId,
                "z": "{z}",
                "x": "{x}",
                "y": "{y}",
            }
            tiles_endpoint = self.url_for(request, "collection_get_tile", **path_params)

            qs_key_to_remove = ["tilematrixsetid", "minzoom", "maxzoom"]
            query_params = [
                (key, value)
                for (key, value) in request.query_params._list
                if key.lower() not in qs_key_to_remove
            ]
            if query_params:
                tiles_endpoint += f"?{urlencode(query_params)}"

            # Get Min/Max zoom from layer settings if tms is the default tms
            if tileMatrixSetId == tms_settings.default_tms:
                minzoom = minzoom or tms_settings.default_minzoom
                maxzoom = maxzoom or tms_settings.default_maxzoom

            minzoom = minzoom if minzoom is not None else tms.minzoom
            maxzoom = maxzoom if maxzoom is not None else tms.maxzoom

            bounds = collection.bounds or [
                180,
                -85.05112877980659,
                180,
                85.0511287798066,
            ]

            style_json = {
                "name": "TiPg",
                "sources": {
                    collection.id: {
                        "type": "vector",
                        "scheme": "xyz",
                        "tiles": [tiles_endpoint],
                        "bounds": bounds,
                        "minzoom": minzoom,
                        "maxzoom": maxzoom,
                    }
                },
                "layers": [],
                "center": [
                    (bounds[0] + bounds[2]) / 2,
                    (bounds[1] + bounds[3]) / 2,
                ],
                "zoom": minzoom,
            }

            layername = collection.id if mvt_settings.set_mvt_layername else "default"
            style_json["layers"] = [
                {
                    "id": f"{collection.id}_fill",
                    "source": collection.id,
                    "source-layer": layername,
                    "type": "fill",
                    "filter": ["==", ["geometry-type"], "Polygon"],
                    "paint": {
                        "fill-color": "rgba(200, 100, 240, 0.4)",
                        "fill-outline-color": "#000",
                    },
                },
                {
                    "id": f"{collection.id}_stroke",
                    "source": collection.id,
                    "source-layer": layername,
                    "type": "line",
                    "filter": ["==", ["geometry-type"], "LineString"],
                    "paint": {
                        "line-color": "#000",
                        "line-width": 1,
                        "line-opacity": 0.75,
                    },
                },
                {
                    "id": f"{collection.id}_point",
                    "source": collection.id,
                    "source-layer": layername,
                    "type": "circle",
                    "filter": ["==", ["geometry-type"], "Point"],
                    "paint": {
                        "circle-color": "#000",
                        "circle-radius": 2.5,
                        "circle-opacity": 0.75,
                    },
                },
            ]

            return style_json

        if self.with_viewer:

            @self.router.get(
                "/collections/{collectionId}/{tileMatrixSetId}/viewer",
                response_class=HTMLResponse,
                operation_id=".collection.vector.viewerTms",
            )
            @self.router.get(
                "/collections/{collectionId}/viewer",
                response_class=HTMLResponse,
                operation_id=".collection.vector.viewer",
            )
            def viewer_endpoint(
                request: Request,
                collection: Annotated[Collection, Depends(self.collection_dependency)],
                tileMatrixSetId: Annotated[
                    Literal["WebMercatorQuad"],
                    "Identifier selecting one of the TileMatrixSetId supported (default: 'WebMercatorQuad')",
                ] = "WebMercatorQuad",
                minzoom: Annotated[
                    Optional[int],
                    Query(description="Overwrite default minzoom."),
                ] = None,
                maxzoom: Annotated[
                    Optional[int],
                    Query(description="Overwrite default maxzoom."),
                ] = None,
                geom_column: Annotated[
                    Optional[str],
                    Query(
                        description="Select geometry column.",
                        alias="geom-column",
                    ),
                ] = None,
            ):
                """Return Simple HTML Viewer for a collection."""
                self.supported_tms.get(tileMatrixSetId)

                tilejson_url = self.url_for(
                    request,
                    "collection_tilejson",
                    collectionId=collection.id,
                    tileMatrixSetId=tileMatrixSetId,
                )
                if request.query_params._list:
                    tilejson_url += f"?{urlencode(request.query_params._list)}"

                return self.templates.TemplateResponse(
                    name="map.html",
                    context={
                        "request": request,
                        "tilejson_endpoint": tilejson_url,
                    },
                    media_type="text/html",
                )


@dataclass
class Endpoints(EndpointsFactory):
    """OGC Features and Tiles Endpoints Factory."""

    # OGC Features dependency
    collections_dependency: Callable[..., CollectionList] = CollectionsParams

    # OGC Tiles dependency
    supported_tms: TileMatrixSets = default_tms
    with_tiles_viewer: bool = True

    ogc_features: OGCFeaturesFactory = field(init=False)
    ogc_tiles: OGCTilesFactory = field(init=False)

    @property
    def conforms_to(self) -> List[str]:
        """Endpoints conformances."""
        return [
            *self.ogc_features.conforms_to,
            *self.ogc_tiles.conforms_to,
        ]

    def links(self, request: Request) -> List[model.Link]:
        """List of available links."""
        return [
            *self.ogc_features.links(request),
            *self.ogc_tiles.links(request),
        ]

    def register_routes(self):
        """Register factory Routes."""
        self.ogc_features = OGCFeaturesFactory(
            collections_dependency=self.collections_dependency,
            collection_dependency=self.collection_dependency,
            router_prefix=self.router_prefix,
            templates=self.templates,
            # We do not want `/` and `/conformance` from the factory
            with_common=False,
        )
        self.router.include_router(self.ogc_features.router)

        self.ogc_tiles = OGCTilesFactory(
            collection_dependency=self.collection_dependency,
            router_prefix=self.router_prefix,
            templates=self.templates,
            supported_tms=self.supported_tms,
            with_viewer=self.with_tiles_viewer,
            # We do not want `/` and `/conformance` from the factory
            with_common=False,
        )
        self.router.include_router(self.ogc_tiles.router)
