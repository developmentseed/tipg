"""tifeatures.factory: router factories."""

import csv
import json
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, Generator, Iterable, List, Optional

import jinja2
from pygeofilter.ast import AstType

from tifeatures import model
from tifeatures.dependencies import (
    CollectionParams,
    ItemOutputType,
    ItemsOutputType,
    OutputType,
    QueryablesOutputType,
    bbox_query,
    datetime_query,
    filter_query,
    ids_query,
    properties_query,
    sortby_query,
)
from tifeatures.errors import NotFound
from tifeatures.layer import CollectionLayer
from tifeatures.layer import Table as TableLayer
from tifeatures.resources.enums import MediaType
from tifeatures.resources.response import (
    GeoJSONResponse,
    JSONResponse,
    SchemaJSONResponse,
)

from fastapi import APIRouter, Depends, Path, Query

from starlette.datastructures import QueryParams
from starlette.requests import Request
from starlette.responses import StreamingResponse
from starlette.templating import Jinja2Templates, _TemplateResponse

DEFAULT_TEMPLATES = Jinja2Templates(
    directory="",
    loader=jinja2.ChoiceLoader([jinja2.PackageLoader(__package__, "templates")]),
)


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

    title: str = "TiFeatures"

    templates: Jinja2Templates = DEFAULT_TEMPLATES

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

    def _create_html_response(
        self,
        request: Request,
        data: str,
        template_name: str,
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

        if self.router_prefix:
            baseurl += self.router_prefix

        return self.templates.TemplateResponse(
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
                "url": str(request.url),
            },
        )

    def register_landing(self) -> None:
        """Register landing endpoint."""

        @self.router.get(
            "/",
            response_model=model.Landing,
            response_model_exclude_none=True,
            response_class=JSONResponse,
            responses={
                200: {
                    "content": {
                        MediaType.json.value: {},
                        MediaType.html.value: {},
                    }
                },
            },
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

            if output_type == MediaType.html:
                return self._create_html_response(
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
            response_class=JSONResponse,
            responses={
                200: {
                    "content": {
                        MediaType.json.value: {},
                        MediaType.html.value: {},
                    }
                },
            },
        )
        def conformance(
            request: Request,
            output_type: Optional[MediaType] = Depends(OutputType),
        ):
            """Get conformance."""
            data = model.Conformance(
                conformsTo=[
                    "http://www.opengis.net/spec/ogcapi-features-1/1.0/req/core",
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
                    "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/filter",
                    "http://www.opengis.net/def/rel/ogc/1.0/queryables",
                ]
            )

            if output_type == MediaType.html:
                return self._create_html_response(
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
            response_class=JSONResponse,
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
                ],
                collections=[
                    model.Collection(
                        **{
                            "id": collection.id,
                            "title": collection.id,
                            "description": collection.description,
                            # TODO: Add Spatial/Temporal Extent
                            "extent": model.Extent(
                                spatial=model.Spatial(
                                    bbox=[collection.bounds],
                                    crs=collection.crs,
                                )
                                if collection.bounds is not None
                                else None
                            ),
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
            response_class=JSONResponse,
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
            # Difference between the collection output Model
            # and the collection database model
            collection_data = collection.dict(exclude={"crs", "bounds"})
            if collection.bounds:
                collection_data["extent"] = model.Extent(
                    spatial=model.Spatial(
                        bbox=[collection.bounds],
                        crs=collection.crs,
                    )
                )

            data = model.Collection(
                **{
                    **collection_data,
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
            response_model=model.Items,
            response_model_exclude_none=True,
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

            # <p_NAME>=VALUE - filter features for a property having a value. Multiple property filters are ANDed together.
            # We exclude  application known query-parameter.
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
                "bbox-only",
                "simplify",
                "sortby",
            ]
            table_property = [prop.name for prop in collection.properties]
            properties_filter = [
                (key, value)
                for (key, value) in request.query_params.items()
                if key.lower() not in exclude and key.lower() in table_property
            ]

            items, matched_items = await collection.features(
                request.app.state.pool,
                ids_filter=ids_filter,
                bbox_filter=bbox_filter,
                datetime_filter=datetime_filter,
                properties_filter=properties_filter,
                cql_filter=cql_filter,
                sortby=sortby,
                properties=properties,
                limit=limit,
                offset=offset,
                geom=geom_column,
                dt=datetime_column,
                bbox_only=bbox_only,
                simplify=simplify,
            )

            if output_type in (
                MediaType.csv,
                MediaType.json,
                MediaType.ndjson,
            ):
                if items and items[0].geometry is not None:
                    rows = (
                        {
                            "collectionId": collection.id,
                            "itemId": f.id,
                            **f.properties,
                            "geometry": f.geometry.wkt,
                        }
                        for f in items
                    )

                else:
                    rows = (
                        {
                            "collectionId": collection.id,
                            "itemId": f.id,
                            **f.properties,
                        }
                        for f in items
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
                    return JSONResponse([row for row in rows])

                # NDJSON Response
                if output_type == MediaType.ndjson:
                    return StreamingResponse(
                        (json.dumps(row) + "\n" for row in rows),
                        media_type=MediaType.ndjson,
                        headers={
                            "Content-Disposition": "attachment;filename=items.ndjson"
                        },
                    )

            qs = "?" + str(request.query_params) if request.query_params else ""
            links = [
                model.Link(
                    title="Collection",
                    href=self.url_for(
                        request, "collection", collectionId=collection.id
                    ),
                    rel="collection",
                    type=MediaType.json,
                ),
                model.Link(
                    title="Items",
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
                    model.Link(
                        href=url,
                        rel="next",
                        type=MediaType.geojson,
                        title="Next page",
                    ),
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
                    model.Link(
                        href=url,
                        rel="prev",
                        type=MediaType.geojson,
                        title="Previous page",
                    ),
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
                                    title="Collection",
                                    href=self.url_for(
                                        request,
                                        "collection",
                                        collectionId=collection.id,
                                    ),
                                    rel="collection",
                                    type=MediaType.json,
                                ),
                                model.Link(
                                    title="Item",
                                    href=self.url_for(
                                        request,
                                        "item",
                                        collectionId=collection.id,
                                        itemId=feature.id,
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

            # HTML Response
            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="items",
                )

            # GeoJSONSeq Response
            elif output_type == MediaType.geojsonseq:
                return StreamingResponse(
                    data.json_seq(exclude_none=True),
                    media_type=MediaType.geojsonseq,
                    headers={
                        "Content-Disposition": "attachment;filename=items.geojson"
                    },
                )

            # Default to GeoJSON Response
            return data

        @self.router.get(
            "/collections/{collectionId}/items/{itemId}",
            response_model=model.Item,
            response_model_exclude_none=True,
            response_class=GeoJSONResponse,
            responses={
                200: {
                    "content": {
                        MediaType.geojson.value: {},
                        MediaType.html.value: {},
                        MediaType.json.value: {},
                    }
                },
            },
        )
        async def item(
            request: Request,
            collection=Depends(self.collection_dependency),
            itemId: str = Path(..., description="Item identifier"),
            geom_column: Optional[str] = Query(
                None,
                description="Select geometry column.",
                alias="geom-column",
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
            output_type: Optional[MediaType] = Depends(ItemOutputType),
        ):
            feature = await collection.feature(
                request.app.state.pool,
                item_id=itemId,
                geom=geom_column,
                bbox_only=bbox_only,
                simplify=simplify,
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

            # HTML Response
            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.json(exclude_none=True),
                    template_name="item",
                )

            # JSON Response
            if output_type == MediaType.json:
                return JSONResponse(
                    {
                        "collectionId": collection.id,
                        "itemId": data.id,
                        **data.properties,
                    },
                )

            # Default to GeoJSON Response
            return data
