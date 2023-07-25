"""tipg.factory: router factories."""

import abc
import csv
import json
import sys
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
from morecantile import Tile, TileMatrixSet
from morecantile import tms as default_tms
from morecantile.defaults import TileMatrixSets
from pygeofilter.ast import AstType

from tipg import model
from tipg.collections import Catalog, Collection
from tipg.dependencies import (
    CatalogParams,
    CollectionParams,
    ItemsOutputType,
    OutputType,
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
from tipg.settings import FeaturesSettings, MVTSettings, TMSSettings

from fastapi import APIRouter, Depends, Path, Query
from fastapi.responses import ORJSONResponse

from starlette.datastructures import QueryParams
from starlette.requests import Request
from starlette.responses import HTMLResponse, Response, StreamingResponse
from starlette.templating import Jinja2Templates, _TemplateResponse

if sys.version_info >= (3, 9):
    from typing import Annotated  # pylint: disable=no-name-in-module
else:
    from typing_extensions import Annotated


tms_settings = TMSSettings()
mvt_settings = MVTSettings()
features_settings = FeaturesSettings()

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
    catalog_dependency: Callable[..., Catalog] = CatalogParams
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
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
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
        def collections(  # noqa: C901
            request: Request,
            bbox_filter: Annotated[Optional[List[float]], Depends(bbox_query)],
            datetime_filter: Annotated[Optional[List[str]], Depends(datetime_query)],
            type_filter: Annotated[
                Optional[Literal["Function", "Table"]],
                Query(alias="type", description="Filter based on Collection type."),
            ] = None,
            limit: Annotated[
                Optional[int],
                Query(
                    ge=0,
                    le=1000,
                    description="Limits the number of collection in the response.",
                ),
            ] = None,
            offset: Annotated[
                Optional[int],
                Query(
                    ge=0,
                    description="Starts the response at an offset.",
                ),
            ] = None,
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
            collection_catalog=Depends(self.catalog_dependency),
        ):
            """List of collections."""
            collections_list = list(collection_catalog["collections"].values())

            limit = limit or 0
            offset = offset or 0

            # type filter
            if type_filter is not None:
                collections_list = [
                    collection
                    for collection in collections_list
                    if collection.type == type_filter
                ]

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
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
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
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            output_type: Annotated[Optional[MediaType], Depends(OutputType)] = None,
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
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            ids_filter: Annotated[Optional[List[str]], Depends(ids_query)],
            bbox_filter: Annotated[Optional[List[float]], Depends(bbox_query)],
            datetime_filter: Annotated[Optional[List[str]], Depends(datetime_query)],
            properties: Annotated[Optional[List[str]], Depends(properties_query)],
            properties_filter: Annotated[
                List[Tuple[str, str]], Depends(properties_filter_query)
            ],
            function_parameters: Annotated[
                Dict[str, str], Depends(function_parameters_query)
            ],
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
                    lt=features_settings.max_features_per_query,
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
                        **feature,  # type: ignore
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
                    (orjson.dumps(f) + b"\n" for f in data["features"]),  # type: ignore
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
                        MediaType.csv.value: {},
                        MediaType.json.value: {},
                        MediaType.geojsonseq.value: {},
                        MediaType.ndjson.value: {},
                    },
                    "model": model.Item,
                },
            },
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
            function_parameters: Dict[str, str] = Depends(function_parameters_query),
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

            features = items.get("features", [])
            if not features:
                raise NotFound(
                    f"Item {itemId} in Collection {collection.id} does not exist."
                )

            feature = features[0]

            if output_type in (
                MediaType.csv,
                MediaType.json,
                MediaType.ndjson,
            ):
                if feature.get("geometry") is not None:
                    rows = iter(
                        [
                            {
                                "collectionId": collection.id,
                                "itemId": feature.get("id"),
                                **feature.get("properties", {}),
                                "geometry": feature["geometry"],
                            },
                        ]
                    )

                else:
                    rows = iter(
                        [
                            {
                                "collectionId": collection.id,
                                "itemId": feature.get("id"),
                                **feature.get("properties", {}),
                            },
                        ]
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
                **feature,  # type: ignore
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
    with_viewer: bool = True

    @property
    def conforms_to(self) -> List[str]:
        """Factory conformances."""
        return [
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/core",
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/oas30",
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/mvt",
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tileset",
            "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tilesets-list",
        ]

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
                    {
                        "id": tms_id,
                        "links": [
                            {
                                "href": self.url_for(
                                    request,
                                    "tilematrixset",
                                    tileMatrixSetId=tms_id,
                                ),
                                "rel": "http://www.opengis.net/def/rel/ogc/1.0/tiling-schemes",
                                "type": "application/json",
                                "title": f"Definition of {tms_id} tileMatrixSets",
                            }
                        ],
                    }
                    for tms_id in self.supported_tms.list()
                ]
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.json(exclude_none=True),
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
                data = {**data.dict(exclude_none=True), "bbox": data.bbox}
                return self._create_html_response(
                    request,
                    json.dumps(data),
                    template_name="tilematrixset",
                )

            return data

        @self.router.get(
            "/collections/{collectionId}/tiles",
            response_model=model.TileSetList,
            response_class=ORJSONResponse,
            response_model_exclude_none=True,
            responses={200: {"content": {MediaType.json.value: {}}}},
            summary="Retrieve a list of available vector tilesets for the specified collection.",
            operation_id=".collection.vector.getTileSetsList",
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

            data = model.TileSetList(
                tilesets=[
                    model.TileSet(
                        title=f"'{collection.id}' tileset tiled using {tms} TileMatrixSet",
                        dataType="vector",
                        crs=self.supported_tms.get(tms).crs,
                        boundingBox=collection_bbox,
                        links=[
                            {
                                "href": self.url_for(
                                    request,
                                    "collection_tileset",
                                    collectionId=collection.id,
                                    tileMatrixSetId=tms,
                                ),
                                "rel": "self",
                                "type": MediaType.json,
                                "title": f"'{collection.id}' tileset tiled using {tms} TileMatrixSet",
                            },
                            {
                                "href": self.url_for(
                                    request,
                                    "tilematrixset",
                                    tileMatrixSetId=tms,
                                ),
                                "rel": "http://www.opengis.net/def/rel/ogc/1.0/tiling-schemes",
                                "type": MediaType.json,
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
                                "type": MediaType.mvt,
                                "title": "Templated link for retrieving Vector tiles",
                            },
                        ],
                    )
                    for tms in self.supported_tms.list()
                ]
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.json(exclude_none=True),
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

            data = model.TileSet(
                title=f"'{collection.id}' tileset tiled using {tileMatrixSetId} TileMatrixSet",
                dataType="vector",
                crs=tms.crs,
                boundingBox=collection_bbox,
                links=[
                    {
                        "href": self.url_for(
                            request,
                            "collection_tileset",
                            collectionId=collection.id,
                            tileMatrixSetId=tileMatrixSetId,
                        ),
                        "rel": "self",
                        "type": MediaType.json,
                        "title": f"'{collection.id}' tileset tiled using {tileMatrixSetId} TileMatrixSet",
                    },
                    {
                        "href": self.url_for(
                            request,
                            "tilematrixset",
                            tileMatrixSetId=tileMatrixSetId,
                        ),
                        "rel": "http://www.opengis.net/def/rel/ogc/1.0/tiling-schemes",
                        "type": MediaType.json,
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
                        "type": MediaType.mvt,
                        "title": "Templated link for retrieving Vector tiles",
                    },
                ],
                tileMatrixSetLimits=tilematrix_limit,
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="tileset",
                )

            return data

        @self.router.get(
            "/collections/{collectionId}/tiles/{tileMatrixSetId}/{z}/{x}/{y}",
            response_class=Response,
            responses={200: {"content": {MediaType.mvt.value: {}}}},
            operation_id=".collection.vector.getTileTms",
        )
        @self.router.get(
            "/collections/{collectionId}/tiles/{z}/{x}/{y}",
            response_class=Response,
            responses={200: {"content": {MediaType.mvt.value: {}}}},
            operation_id=".collection.vector.getTile",
        )
        async def collection_get_tile(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            tile: Annotated[Tile, Depends(TileParams)],
            properties_filter: Annotated[
                List[Tuple[str, str]], Depends(properties_filter_query)
            ],
            function_parameters: Annotated[
                Dict[str, str], Depends(function_parameters_query)
            ],
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
        )
        @self.router.get(
            "/collections/{collectionId}/tilejson.json",
            response_model=model.TileJSON,
            responses={200: {"description": "Return a tilejson"}},
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            operation_id=".collection.vector.getTileJSON",
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

        @self.router.get(
            "/collections/{collectionId}/{tileMatrixSetId}/style.json",
            response_model=model.StyleJSON,
            responses={200: {"description": "Return a tilejson"}},
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            operation_id=".collection.vector.getStyleJSONTms",
        )
        @self.router.get(
            "/collections/{collectionId}/style.json",
            response_model=model.StyleJSON,
            responses={200: {"description": "Return a StyleJSON"}},
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            operation_id=".collection.vector.getStyleJSON",
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
            with_viewer=self.with_tiles_viewer,
            # We do not want `/` and `/conformance` from the factory
            with_common=False,
        )
        self.router.include_router(self.ogc_tiles.router, tags=["OGC Tiles API"])
