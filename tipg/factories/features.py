"""tipg.factories.features: OGC API - Features endpoints factory."""

from dataclasses import dataclass
from typing import Annotated, Callable, Dict, List, Optional

import orjson
from cql2 import Expr

from tipg import model
from tipg.dbmodel import Collection, CollectionList
from tipg.dependencies import (
    CollectionsParams,
    ItemsOutputType,
    OutputType,
    QueryablesOutputType,
    bbox_query,
    datetime_query,
    filter_query,
    function_parameters_query,
    ids_query,
    properties_filter_query,
    properties_query,
    sortby_query,
)
from tipg.errors import NoPrimaryKey, NotFound
from tipg.factories.base import EndpointsFactory
from tipg.factories.utils import create_csv_rows
from tipg.resources.enums import MediaType
from tipg.resources.response import (
    GeoJSONResponse,
    ORJSONResponse,
    SchemaJSONResponse,
    orjsonDumps,
)
from tipg.settings import FeaturesSettings

from fastapi import Depends, Path, Query

from starlette.datastructures import QueryParams
from starlette.requests import Request
from starlette.responses import StreamingResponse
from starlette.routing import NoMatchFound

features_settings = FeaturesSettings()

FEATURES_CONFORMS = [
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/html",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30",
    "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson",
    "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/filter",
    "http://www.opengis.net/spec/ogcapi-features-3/1.0/conf/features-filter",
]


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
                title="Collection metadata (Template URL)",
                href=self.url_for(
                    request,
                    "collection",
                    collectionId="{collectionId}",
                ),
                type=MediaType.json,
                rel="data",
                templated=True,
            ),
            model.Link(
                title="Collection queryables (Template URL)",
                href=self.url_for(
                    request,
                    "queryables",
                    collectionId="{collectionId}",
                ),
                type=MediaType.schemajson,
                rel="queryables",
                templated=True,
            ),
            model.Link(
                title="Collection Features (Template URL)",
                href=self.url_for(request, "items", collectionId="{collectionId}"),
                type=MediaType.geojson,
                rel="data",
                templated=True,
            ),
            model.Link(
                title="Collection Feature (Template URL)",
                href=self.url_for(
                    request,
                    "item",
                    collectionId="{collectionId}",
                    itemId="{itemId}",
                ),
                type=MediaType.geojson,
                rel="data",
                templated=True,
            ),
        ]

    def _additional_collection_tiles_links(
        self, request: Request, collection: Collection
    ) -> List[model.Link]:
        links = []
        base_url = str(request.base_url)
        try:
            links.append(
                model.Link(
                    rel="data",
                    title="Collection TileSets",
                    type=MediaType.json,
                    href=str(
                        request.app.url_path_for(
                            "collection_tileset_list",
                            collectionId=collection.id,
                        ).make_absolute_url(base_url=base_url)
                    ),
                ),
            )
            links.append(
                model.Link(
                    rel="data",
                    title="Collection TileSet (Template URL)",
                    type=MediaType.json,
                    templated=True,
                    href=str(
                        request.app.url_path_for(
                            "collection_tileset",
                            collectionId=collection.id,
                            tileMatrixSetId="{tileMatrixSetId}",
                        ).make_absolute_url(base_url=base_url)
                    ),
                ),
            )
        except NoMatchFound:
            pass

        try:
            links.append(
                model.Link(
                    title="Collection Map viewer (Template URL)",
                    href=str(
                        request.app.url_path_for(
                            "map_viewer",
                            collectionId=collection.id,
                            tileMatrixSetId="{tileMatrixSetId}",
                        ).make_absolute_url(base_url=base_url)
                    ),
                    type=MediaType.html,
                    rel="data",
                    templated=True,
                )
            )

        except NoMatchFound:
            pass

        return links

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
                            *self._additional_collection_tiles_links(
                                request, collection
                            ),
                        ],
                    )
                    for collection in collection_list["collections"]
                ],
            ).model_dump(exclude_none=True, mode="json")

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data,
                    template_name="collections",
                    title="Collections list",
                )

            return ORJSONResponse(data)

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
            data = model.Collection(
                id=collection.id,
                title=collection.title,
                description=collection.description,
                extent=collection.extent,
                links=[
                    model.Link(
                        title="Collection",
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
                            request,
                            "items",
                            collectionId=collection.id,
                        ),
                        rel="items",
                        type=MediaType.geojson,
                    ),
                    model.Link(
                        title="Items (CSV)",
                        href=self.url_for(
                            request,
                            "items",
                            collectionId=collection.id,
                        )
                        + "?f=csv",
                        rel="alternate",
                        type=MediaType.csv,
                    ),
                    model.Link(
                        title="Items (GeoJSONSeq)",
                        href=self.url_for(
                            request,
                            "items",
                            collectionId=collection.id,
                        )
                        + "?f=geojsonseq",
                        rel="alternate",
                        type=MediaType.geojsonseq,
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
                    *self._additional_collection_tiles_links(request, collection),
                ],
            ).model_dump(exclude_none=True, mode="json")

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data,
                    template_name="collection",
                    title=f"{collection.id} collection",
                )

            return ORJSONResponse(data)

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
            ).model_dump(exclude_none=True, mode="json", by_alias=True)

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data,
                    template_name="queryables",
                    title=f"{collection.id} queryables",
                )

            return SchemaJSONResponse(data)

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
            cql_filter: Annotated[Optional[Expr], Depends(filter_query)],
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

            async with request.app.state.pool.acquire() as conn:
                item_list = await collection.features(
                    conn,
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
                if any(f.get("geometry", None) is not None for f in item_list["items"]):
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
                    request,
                    orjson.loads(orjsonDumps(data).decode()),
                    template_name="items",
                    title=f"{collection.id} items",
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

            async with request.app.state.pool.acquire() as conn:
                item_list = await collection.features(
                    conn,
                    ids_filter=[itemId],
                    bbox_only=bbox_only,
                    simplify=simplify,
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
                    orjson.loads(orjsonDumps(data).decode()),
                    template_name="item",
                    title=f"{collection.id}/{itemId} item",
                )

            # Default to GeoJSON Response
            return GeoJSONResponse(data)
