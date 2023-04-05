"""tipg.factory: router factories."""

import abc
import csv
from dataclasses import dataclass, field
from typing import (
    Any,
    Callable,
    Dict,
    Generator,
    Iterable,
    List,
    Literal,
    Optional,
    Tuple,
)
from urllib.parse import urlencode

import jinja2
import orjson
from ciso8601 import parse_rfc3339
from morecantile import TileMatrixSet
from morecantile import tms as default_tms
from morecantile.defaults import TileMatrixSets
from pygeofilter.ast import AstType

from tipg import model
from tipg.dbmodel import Collection
from tipg.dependencies import (
    CollectionParams,
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
from tipg.resources.response import GeoJSONResponse, SchemaJSONResponse
from tipg.settings import TMSSettings

from fastapi import APIRouter, Depends, Path, Query
from fastapi.responses import ORJSONResponse

from starlette.datastructures import QueryParams
from starlette.requests import Request
from starlette.responses import HTMLResponse, Response, StreamingResponse
from starlette.templating import Jinja2Templates, _TemplateResponse

tms_settings = TMSSettings()

DEFAULT_TEMPLATES = Jinja2Templates(
    directory="",
    loader=jinja2.ChoiceLoader([jinja2.PackageLoader(__package__, "templates")]),
)  # type:ignore


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


def s_intersects(bbox: List[float], spatial_extent: List[float]) -> bool:
    """Check if bbox intersects with spatial extent."""
    return (
        (bbox[0] < spatial_extent[2])
        and (bbox[2] > spatial_extent[0])
        and (bbox[3] > spatial_extent[1])
        and (bbox[1] < spatial_extent[3])
    )


def t_intersects(interval: List[str], temporal_extent: List[str]) -> bool:
    """Check if dates intersect with temporal extent."""
    if len(interval) == 1:
        start = end = parse_rfc3339(interval[0])

    else:
        start = parse_rfc3339(interval[0]) if interval[0] not in ["..", ""] else None
        end = parse_rfc3339(interval[1]) if interval[1] not in ["..", ""] else None

    mint, maxt = temporal_extent
    min_ext = parse_rfc3339(mint) if mint is not None else None
    max_ext = parse_rfc3339(maxt) if maxt is not None else None

    if len(interval) == 1:
        if start == min_ext or start == max_ext:
            return True

    if not start:
        return max_ext <= end or min_ext <= end

    elif not end:
        return min_ext >= start or max_ext >= start

    else:
        return min_ext >= start and max_ext <= end

    return False


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
            self.register_common_routes()

    def url_for(self, request: Request, name: str, **path_params: Any) -> str:
        """Return full url (with prefix) for a specific handler."""
        url_path = self.router.url_path_for(name, **path_params)

        base_url = str(request.base_url)
        if self.router_prefix:
            base_url += self.router_prefix.lstrip("/")

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

    def register_common_routes(self):
        """Register Landing (/) and Conformance (/conformance) routes."""

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
            output_type: Optional[MediaType] = Depends(OutputType),
        ):
            """Get conformance."""
            data = model.Conformance(
                conformsTo=[
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core",
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/landingPage",
                    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/collections",
                    "http://www.opengis.net/spec/ogcapi-common-2/1.0/conf/simple-query",
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/json",
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/html",
                    "http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/oas30",
                    *self.conforms_to,
                ]
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="conformance",
                )

            return data

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
            output_type: Optional[MediaType] = Depends(OutputType),
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
                    data.json(exclude_none=True),
                    template_name="landing",
                )

            return data


@dataclass
class OGCFeaturesFactory(EndpointsFactory):
    """OGC Features Endpoints Factory."""

    @property
    def conforms_to(self) -> List[str]:
        """Factory conformances."""
        return [
            "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core",
            "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/html",
            "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30",
            "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson",
            "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/filter",
            "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/features-filter",
        ]

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

    def register_routes(self):  # noqa: C901
        """Register OGC Features endpoints."""

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
        )
        def collections(
            request: Request,
            output_type: Optional[MediaType] = Depends(OutputType),
            bbox_filter: Optional[List[float]] = Depends(bbox_query),
            datetime_filter: Optional[List[str]] = Depends(datetime_query),
            limit: Optional[int] = Query(
                None,
                ge=0,
                le=1000,
                description="Limits the number of collection in the response.",
            ),
            offset: Optional[int] = Query(
                None,
                ge=0,
                description="Starts the response at an offset.",
            ),
        ):
            """List of collections."""
            collection_catalog = getattr(request.app.state, "collection_catalog", {})
            collections_list = list(collection_catalog.values())

            limit = limit or 0
            offset = offset or 0

            # bbox filter
            if bbox_filter is not None:
                collections_list = [
                    collection
                    for collection in collections_list
                    if collection.bounds is not None
                    and s_intersects(bbox_filter, collection.bounds)
                ]

            # datetime filter
            if datetime_filter is not None:
                collections_list = [
                    collection
                    for collection in collections_list
                    if collection.dt_bounds is not None
                    and t_intersects(datetime_filter, collection.dt_bounds)
                ]

            matched_items = len(collections_list)

            if limit:
                collections_list = collections_list[offset : offset + limit]
            else:
                collections_list = collections_list[offset:]

            items_returned = len(collections_list)

            links: list = [
                model.Link(
                    href=self.url_for(request, "collections"),
                    rel="self",
                    type=MediaType.json,
                ),
            ]

            if (matched_items - items_returned) > offset:
                next_offset = offset + items_returned
                query_params = QueryParams(
                    {**request.query_params, "offset": next_offset}
                )
                url = self.url_for(request, "collections") + f"?{query_params}"
                links.append(
                    model.Link(
                        href=url,
                        rel="next",
                        type=MediaType.json,
                        title="Next page",
                    ).dict(exclude_none=True),
                )

            if offset:
                qp = dict(request.query_params)
                qp.pop("offset")
                prev_offset = max(offset - items_returned, 0)
                if prev_offset:
                    query_params = QueryParams({**qp, "offset": prev_offset})
                else:
                    query_params = QueryParams({**qp})

                url = self.url_for(request, "collections")
                if qp:
                    url += f"?{query_params}"

                links.append(
                    model.Link(
                        href=url,
                        rel="prev",
                        type=MediaType.json,
                        title="Previous page",
                    ).dict(exclude_none=True),
                )

            data = model.Collections(
                links=links,
                numberMatched=matched_items,
                numberReturned=items_returned,
                collections=[
                    model.Collection(
                        **{
                            "id": collection.id,
                            "title": collection.id,
                            "description": collection.description,
                            "extent": collection.extent,
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
                    for collection in collections_list
                ],
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="collections",
                )

            return data

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
        )
        def collection(
            request: Request,
            collection=Depends(self.collection_dependency),
            output_type: Optional[MediaType] = Depends(OutputType),
        ):
            """Metadata for a feature collection."""

            data = model.Collection(
                **{
                    **collection.dict(),
                    "title": collection.id,
                    "extent": collection.extent,
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
                            title="Items",
                            href=self.url_for(
                                request, "items", collectionId=collection.id
                            ),
                            rel="items",
                            type=MediaType.geojson,
                        ),
                        model.Link(
                            title="Items (CSV)",
                            href=self.url_for(
                                request, "items", collectionId=collection.id
                            )
                            + "?f=csv",
                            rel="alternate",
                            type=MediaType.csv,
                        ),
                        model.Link(
                            title="Items (GeoJSONSeq)",
                            href=self.url_for(
                                request, "items", collectionId=collection.id
                            )
                            + "?f=geojsonseq",
                            rel="alternate",
                            type=MediaType.geojsonseq,
                        ),
                        model.Link(
                            title="Queryables",
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

            if output_type == MediaType.html:
                return self._create_html_response(
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
                        MediaType.schemajson.value: {},
                        MediaType.html.value: {},
                    }
                },
            },
        )
        def queryables(
            request: Request,
            collection=Depends(self.collection_dependency),
            output_type: Optional[MediaType] = Depends(QueryablesOutputType),
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

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="queryables",
                )

            return data

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
        )
        async def items(  # noqa: C901
            request: Request,
            collection=Depends(self.collection_dependency),
            ids_filter: Optional[List[str]] = Depends(ids_query),
            bbox_filter: Optional[List[float]] = Depends(bbox_query),
            datetime_filter: Optional[List[str]] = Depends(datetime_query),
            properties: Optional[List[str]] = Depends(properties_query),
            properties_filter: List[Tuple[str, str]] = Depends(properties_filter_query),
            function_parameters: Dict[str, str] = Depends(function_parameters_query),
            cql_filter: Optional[AstType] = Depends(filter_query),
            sortby: Optional[str] = Depends(sortby_query),
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
            bbox_only: Optional[bool] = Query(
                None,
                description="Only return the bounding box of the feature.",
                alias="bbox-only",
            ),
            simplify: Optional[float] = Query(
                None,
                description="Simplify the output geometry to given threshold in decimal degrees.",
            ),
            output_type: Optional[MediaType] = Depends(ItemsOutputType),
        ):
            offset = offset or 0

            output_type = output_type or MediaType.geojson
            geom_as_wkt = output_type not in [
                MediaType.geojson,
                MediaType.geojsonseq,
                MediaType.html,
            ]

            items, matched_items = await collection.features(
                request.app.state.pool,
                ids_filter=ids_filter,
                bbox_filter=bbox_filter,
                datetime_filter=datetime_filter,
                properties_filter=properties_filter,
                function_parameters=function_parameters,
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
                if (
                    items["features"]
                    and items["features"][0].get("geometry") is not None
                ):
                    rows = (
                        {
                            "collectionId": collection.id,
                            "itemId": f.get("id"),
                            **f.get("properties", {}),
                            "geometry": f["geometry"],
                        }
                        for f in items["features"]
                    )

                else:
                    rows = (
                        {
                            "collectionId": collection.id,
                            "itemId": f.get("id"),
                            **f.get("properties", {}),
                        }
                        for f in items["features"]
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
                        (orjson.dumps(row) + b"\n" for row in rows),
                        media_type=MediaType.ndjson,
                        headers={
                            "Content-Disposition": "attachment;filename=items.ndjson"
                        },
                    )

            qs = "?" + str(request.query_params) if request.query_params else ""
            links: List[Dict] = [
                model.Link(
                    title="Collection",
                    href=self.url_for(
                        request, "collection", collectionId=collection.id
                    ),
                    rel="collection",
                    type=MediaType.json,
                ).dict(exclude_none=True),
                model.Link(
                    title="Items",
                    href=self.url_for(request, "items", collectionId=collection.id)
                    + qs,
                    rel="self",
                    type=MediaType.geojson,
                ).dict(exclude_none=True),
            ]

            items_returned = len(items["features"])

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
                    model.Link(
                        href=url,
                        rel="next",
                        type=MediaType.geojson,
                        title="Next page",
                    ).dict(exclude_none=True),
                )

            if offset:
                qp = dict(request.query_params)
                qp.pop("offset")
                prev_offset = max(offset - items_returned, 0)
                if prev_offset:
                    query_params = QueryParams({**qp, "offset": prev_offset})
                else:
                    query_params = QueryParams({**qp})

                url = self.url_for(request, "items", collectionId=collection.id)
                if qp:
                    url += f"?{query_params}"

                links.append(
                    model.Link(
                        href=url,
                        rel="prev",
                        type=MediaType.geojson,
                        title="Previous page",
                    ).dict(exclude_none=True),
                )

            data = {
                "type": "FeatureCollection",
                "id": collection.id,
                "title": collection.title or collection.id,
                "description": collection.description
                or collection.title
                or collection.id,
                "numberMatched": matched_items,
                "numberReturned": items_returned,
                "links": links,
                "features": [
                    {
                        **feature,
                        "links": [
                            model.Link(
                                title="Collection",
                                href=self.url_for(
                                    request,
                                    "collection",
                                    collectionId=collection.id,
                                ),
                                rel="collection",
                                type=MediaType.json,
                            ).dict(exclude_none=True),
                            model.Link(
                                title="Item",
                                href=self.url_for(
                                    request,
                                    "item",
                                    collectionId=collection.id,
                                    itemId=feature.get("id"),
                                ),
                                rel="item",
                                type=MediaType.json,
                            ).dict(exclude_none=True),
                        ],
                    }
                    for feature in items["features"]
                ],
            }

            # HTML Response
            if output_type == MediaType.html:
                return self._create_html_response(
                    request, orjson.dumps(data).decode(), template_name="items"
                )

            # GeoJSONSeq Response
            elif output_type == MediaType.geojsonseq:
                return StreamingResponse(
                    (orjson.dumps(f) + b"\n" for f in data["features"]),
                    media_type=MediaType.geojsonseq,
                    headers={
                        "Content-Disposition": "attachment;filename=items.geojson"
                    },
                )

            # Default to GeoJSON Response
            return GeoJSONResponse(data)

        @self.router.get(
            "/collections/{collectionId}/items/{itemId}",
            response_class=GeoJSONResponse,
            responses={
                200: {
                    "content": {
                        MediaType.geojson.value: {},
                        MediaType.html.value: {},
                        MediaType.json.value: {},
                    },
                    "model": model.Item,
                },
            },
        )
        async def item(
            request: Request,
            collection=Depends(self.collection_dependency),
            itemId: str = Path(..., description="Item identifier"),
            bbox_only: Optional[bool] = Query(
                None,
                description="Only return the bounding box of the feature.",
                alias="bbox-only",
            ),
            simplify: Optional[float] = Query(
                None,
                description="Simplify the output geometry to given threshold in decimal degrees.",
            ),
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
            output_type: Optional[MediaType] = Depends(ItemsOutputType),
            properties: Optional[List[str]] = Depends(properties_query),
            function_parameters: Dict[str, str] = Depends(function_parameters_query),
        ):
            if collection.id_column is None:
                raise NoPrimaryKey("No primary key is set on this table")

            output_type = output_type or MediaType.geojson
            geom_as_wkt = output_type not in [
                MediaType.geojson,
                MediaType.geojsonseq,
                MediaType.html,
            ]

            items, _ = await collection.features(
                pool=request.app.state.pool,
                bbox_only=bbox_only,
                simplify=simplify,
                ids_filter=[itemId],
                properties=properties,
                function_parameters=function_parameters,
                geom=geom_column,
                dt=datetime_column,
                geom_as_wkt=geom_as_wkt,
            )

            features = items.get("features", None)

            if not features or len(features) < 1:
                raise NotFound(
                    f"Item {itemId} in Collection {collection.id} does not exist."
                )
            else:
                feature = features[0]

            if output_type in (
                MediaType.csv,
                MediaType.json,
                MediaType.ndjson,
            ):
                if (
                    items["features"]
                    and items["features"][0].get("geometry") is not None
                ):
                    rows = (
                        {
                            "collectionId": collection.id,
                            "itemId": f.get("id"),
                            **f.get("properties", {}),
                            "geometry": f["geometry"],
                        }
                        for f in items["features"]
                    )

                else:
                    rows = (
                        {
                            "collectionId": collection.id,
                            "itemId": f.get("id"),
                            **f.get("properties", {}),
                        }
                        for f in items["features"]
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
                    return ORJSONResponse(rows.__next__())

                # NDJSON Response
                if output_type == MediaType.ndjson:
                    return StreamingResponse(
                        (orjson.dumps(row) + b"\n" for row in rows),
                        media_type=MediaType.ndjson,
                        headers={
                            "Content-Disposition": "attachment;filename=items.ndjson"
                        },
                    )

            data = {
                **feature,
                "links": [
                    model.Link(
                        href=self.url_for(
                            request, "collection", collectionId=collection.id
                        ),
                        rel="collection",
                        type=MediaType.json,
                    ).dict(exclude_none=True),
                    model.Link(
                        href=self.url_for(
                            request,
                            "item",
                            collectionId=collection.id,
                            itemId=itemId,
                        ),
                        rel="self",
                        type=MediaType.geojson,
                    ).dict(exclude_none=True),
                ],
            }

            # HTML Response
            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    orjson.dumps(data).decode(),
                    template_name="item",
                )

            # Default to GeoJSON Response
            return GeoJSONResponse(data)


@dataclass
class OGCTilesFactory(EndpointsFactory):
    """OGC Tiles Endpoints Factory."""

    supported_tms: TileMatrixSets = default_tms

    @property
    def conforms_to(self) -> List[str]:
        """Factory conformances."""
        return [
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/core",
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/oas30",
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/mvt",
        ]

    def links(self, request: Request) -> List[model.Link]:
        """OGC Tiles API links."""
        return [
            model.Link(
                title="Collection Vector Tiles",
                href=self.url_for(
                    request,
                    "tile",
                    collectionId="{collectionId}",
                    tileMatrix="{tileMatrix}",
                    tileCol="{tileCol}",
                    tileRow="{tileRow}",
                ),
                type=MediaType.mvt,
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

        @self.router.get(
            "/collections/{collectionId}/tiles/{tileMatrixSetId}/{tileMatrix}/{tileCol}/{tileRow}",
            response_class=Response,
            responses={200: {"content": {MediaType.mvt.value: {}}}},
        )
        @self.router.get(
            "/collections/{collectionId}/tiles/{tileMatrix}/{tileCol}/{tileRow}",
            response_class=Response,
            responses={200: {"content": {MediaType.mvt.value: {}}}},
        )
        async def tile(
            request: Request,
            collection=Depends(self.collection_dependency),
            tileMatrixSetId: Literal[tuple(self.supported_tms.list())] = Query(
                tms_settings.default_tms,
                description=f"Identifier selecting one of the TileMatrixSetId supported (default: '{tms_settings.default_tms}')",
            ),
            tile=Depends(TileParams),
            ids_filter: Optional[List[str]] = Depends(ids_query),
            bbox_filter: Optional[List[float]] = Depends(bbox_query),
            datetime_filter: Optional[List[str]] = Depends(datetime_query),
            properties: Optional[List[str]] = Depends(properties_query),
            properties_filter: List[Tuple[str, str]] = Depends(properties_filter_query),
            function_parameters: Dict[str, str] = Depends(function_parameters_query),
            cql_filter: Optional[AstType] = Depends(filter_query),
            sortby: Optional[str] = Depends(sortby_query),
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
            limit: Optional[int] = Query(
                None,
                description="Limits the number of features in the response. Defaults to 10000 or TIPG_MAX_FEATURES_PER_TILE environment variable.",
            ),
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
                properties_filter=properties_filter,
                function_parameters=function_parameters,
                cql_filter=cql_filter,
                sortby=sortby,
                properties=properties,
                limit=limit,
                geom=geom_column,
                dt=datetime_column,
            )

            return Response(bytes(tile), media_type=MediaType.mvt.value)

        @self.router.get(
            "/collections/{collectionId}/{tileMatrixSetId}/tilejson.json",
            response_model=model.TileJSON,
            responses={200: {"description": "Return a tilejson"}},
            response_model_exclude_none=True,
        )
        @self.router.get(
            "/collections/{collectionId}/tilejson.json",
            response_model=model.TileJSON,
            responses={200: {"description": "Return a tilejson"}},
            response_model_exclude_none=True,
        )
        async def tilejson(
            request: Request,
            collection=Depends(self.collection_dependency),
            tileMatrixSetId: Literal[tuple(self.supported_tms.list())] = Query(
                tms_settings.default_tms,
                description=f"Identifier selecting one of the TileMatrixSetId supported (default: '{tms_settings.default_tms}')",
            ),
            minzoom: Optional[int] = Query(
                None, description="Overwrite default minzoom."
            ),
            maxzoom: Optional[int] = Query(
                None, description="Overwrite default maxzoom."
            ),
            geom_column: Optional[str] = Query(
                None,
                description="Select geometry column.",
                alias="geom-column",
            ),
        ):
            """Return TileJSON document."""
            tms = self.supported_tms.get(tileMatrixSetId)

            geom = collection.get_geometry_column(geom_column)
            if not geom:
                raise MissingGeometryColumn

            path_params: Dict[str, Any] = {
                "tileMatrixSetId": tms.identifier,
                "collectionId": collection.id,
                "tileMatrix": "{tileMatrix}",
                "tileCol": "{tileCol}",
                "tileRow": "{tileRow}",
            }
            tile_endpoint = self.url_for(request, "tile", **path_params)

            qs_key_to_remove = ["tilematrixsetid", "minzoom", "maxzoom"]
            query_params = [
                (key, value)
                for (key, value) in request.query_params._list
                if key.lower() not in qs_key_to_remove
            ]

            if query_params:
                tile_endpoint += f"?{urlencode(query_params)}"

            # Get Min/Max zoom from layer settings if tms is the default tms
            if tms.identifier == tms_settings.default_tms:
                minzoom = minzoom or tms_settings.default_minzoom
                maxzoom = maxzoom or tms_settings.default_maxzoom

            minzoom = minzoom if minzoom is not None else tms.minzoom
            maxzoom = maxzoom if maxzoom is not None else tms.maxzoom

            bounds = [-180, -90, 180, 90]
            if collection.extent and collection.extent.spatial:
                bounds = collection.extent.spatial.bbox[0]

            tj = {
                "minzoom": minzoom,
                "maxzoom": maxzoom,
                "name": collection.id,
                "bounds": bounds,
                "tiles": [tile_endpoint],
            }
            if bounds := collection.bounds:
                tj["bounds"] = bounds

            return ORJSONResponse(tj)

        @self.router.get(
            "/collections/{collectionId}/{tileMatrixSetId}/viewer",
            response_class=HTMLResponse,
        )
        @self.router.get(
            "/collections/{collectionId}/viewer",
            response_class=HTMLResponse,
        )
        def viewer_endpoint(
            request: Request,
            collection=Depends(self.collection_dependency),
            tileMatrixSetId: Literal["WebMercatorQuad"] = Query(  # noqa
                "WebMercatorQuad",
                description="Identifier selecting one of the TileMatrixSetId supported (default: 'WebMercatorQuad')",
            ),
            minzoom: Optional[int] = Query(  # noqa
                None, description="Overwrite default minzoom."
            ),
            maxzoom: Optional[int] = Query(  # noqa
                None, description="Overwrite default maxzoom."
            ),
            geom_column: Optional[str] = Query(  # noqa
                None,
                description="Select geometry column.",
                alias="geom-column",
            ),
        ):
            """Return Simple HTML Viewer for a collection."""
            tms = self.supported_tms.get(tileMatrixSetId)

            tilejson_url = self.url_for(
                request,
                "tilejson",
                collectionId=collection.id,
                tileMatrixSetId=tms.identifier,
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

        @self.router.get(
            r"/tileMatrixSets",
            response_model=model.TileMatrixSetList,
            response_model_exclude_none=True,
            summary="Retrieve the list of available tiling schemes (tile matrix sets).",
            operation_id="getTileMatrixSetsList",
        )
        async def tilematrixsets(request: Request):
            """
            OGC Specification: http://docs.opengeospatial.org/per/19-069.html#_tilematrixsets
            """
            return {
                "tileMatrixSets": [
                    {
                        "id": tms,
                        "title": tms,
                        "links": [
                            {
                                "href": self.url_for(
                                    request,
                                    "tilematrixset",
                                    tileMatrixSetId=tms,
                                ),
                                "rel": "item",
                                "type": "application/json",
                            }
                        ],
                    }
                    for tms in self.supported_tms.list()
                ]
            }

        @self.router.get(
            r"/tileMatrixSets/{tileMatrixSetId}",
            response_model=TileMatrixSet,
            response_model_exclude_none=True,
            summary="Retrieve the definition of the specified tiling scheme (tile matrix set).",
            operation_id="getTileMatrixSet",
        )
        async def tilematrixset(
            tileMatrixSetId: Literal[tuple(self.supported_tms.list())] = Path(
                ...,
                description="Identifier for a supported TileMatrixSet.",
            ),
        ):
            """
            OGC Specification: http://docs.opengeospatial.org/per/19-069.html#_tilematrixset
            """
            return self.supported_tms.get(tileMatrixSetId)


@dataclass
class Endpoints(EndpointsFactory):
    """OGC Features and Tiles Endpoints Factory."""

    # OGC Tiles dependency
    supported_tms: TileMatrixSets = default_tms

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
            collection_dependency=self.collection_dependency,
            router_prefix=self.router_prefix,
            templates=self.templates,
            # We do not want `/` and `/conformance` from the factory
            with_common=False,
        )
        self.router.include_router(self.ogc_features.router, tags=["OGC Features API"])

        self.ogc_tiles = OGCTilesFactory(
            collection_dependency=self.collection_dependency,
            router_prefix=self.router_prefix,
            templates=self.templates,
            supported_tms=self.supported_tms,
            # We do not want `/` and `/conformance` from the factory
            with_common=False,
        )
        self.router.include_router(self.ogc_tiles.router, tags=["OGC Tiles API"])
