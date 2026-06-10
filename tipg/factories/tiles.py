"""tipg.factories.tiles: OGC API - Tiles endpoints factory."""

from dataclasses import dataclass
from typing import Annotated, Any, Dict, List, Literal, Optional
from urllib.parse import urlencode

from cql2 import Expr
from morecantile import Tile, TileMatrixSet
from morecantile import tms as default_tms
from morecantile.defaults import TileMatrixSets

from tipg import model
from tipg.dbmodel import Collection
from tipg.dependencies import (
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
from tipg.errors import MissingGeometryColumn
from tipg.factories.base import EndpointsFactory
from tipg.resources.enums import MediaType
from tipg.resources.response import ORJSONResponse
from tipg.settings import MVTSettings, TMSSettings

from fastapi import Depends, Path, Query

from starlette.requests import Request
from starlette.responses import HTMLResponse, Response

tms_settings = TMSSettings()
mvt_settings = MVTSettings()

TILES_CONFORMS = [
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/core",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/oas30",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/mvt",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tileset",
    "http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tilesets-list",
]


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
        links = [
            model.Link(
                title="Collection Vector Tiles (Template URL)",
                href=self.url_for(
                    request,
                    "collection_get_tile",
                    collectionId="{collectionId}",
                    tileMatrixSetId="{tileMatrixSetId}",
                    z="{z}",
                    x="{x}",
                    y="{y}",
                ),
                type=MediaType.mvt,
                rel="data",
                templated=True,
            ),
            model.Link(
                title="Collection TileSets (Template URL)",
                href=self.url_for(
                    request,
                    "collection_tileset_list",
                    collectionId="{collectionId}",
                ),
                type=MediaType.json,
                rel="data",
                templated=True,
            ),
            model.Link(
                title="Collection TileSet (Template URL)",
                href=self.url_for(
                    request,
                    "collection_tileset",
                    collectionId="{collectionId}",
                    tileMatrixSetId="{tileMatrixSetId}",
                ),
                type=MediaType.json,
                rel="data",
                templated=True,
            ),
        ]

        if self.with_viewer:
            links.append(
                model.Link(
                    title="Collection Map viewer (Template URL)",
                    href=self.url_for(
                        request,
                        "map_viewer",
                        collectionId="{collectionId}",
                        tileMatrixSetId="{tileMatrixSetId}",
                    ),
                    type=MediaType.html,
                    rel="data",
                    templated=True,
                )
            )

        links += [
            model.Link(
                title="TileMatrixSets",
                href=self.url_for(
                    request,
                    "tilematrixsets",
                ),
                type=MediaType.json,
                rel="http://www.opengis.net/def/rel/ogc/1.0/tiling-schemes",
            ),
            model.Link(
                title="TileMatrixSet (Template URL)",
                href=self.url_for(
                    request,
                    "tilematrixset",
                    tileMatrixSetId="{tileMatrixSetId}",
                ),
                type=MediaType.json,
                rel="data",
                templated=True,
            ),
        ]

        return links

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
                            )
                        ],
                    )
                    for tms_id in self.supported_tms.list()
                ]
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump(exclude_none=True, mode="json"),
                    template_name="tilematrixsets",
                    title="TileMatrixSets list",
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
            tms = self.supported_tms.get(tileMatrixSetId)

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    {
                        **tms.model_dump(exclude_none=True, mode="json"),
                        # For visualization purpose we add the tms bbox
                        "bbox": tms.bbox,
                    },
                    template_name="tilematrixset",
                    title=f"{tileMatrixSetId} TileMatrixSet",
                )

            return tms

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
                                    "rel": "http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme",
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
                    data.model_dump(exclude_none=True, mode="json"),
                    template_name="tilesets",
                    title=f"{collection.id} tilesets",
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

            links = [
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
                    "rel": "http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme",
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
                    "templated": True,
                },
            ]

            if self.with_viewer:
                links.append(
                    {
                        "href": self.url_for(
                            request,
                            "map_viewer",
                            tileMatrixSetId=tileMatrixSetId,
                            collectionId=collection.id,
                        ),
                        "type": "text/html",
                        "rel": "data",
                        "title": f"Map viewer for '{tileMatrixSetId}' tileMatrixSet",
                    }
                )

            data = model.TileSet.model_validate(
                {
                    "title": f"'{collection.id}' tileset tiled using {tileMatrixSetId} TileMatrixSet",
                    "dataType": "vector",
                    "crs": tms.crs,
                    "boundingBox": collection_bbox,
                    "links": links,
                    "tileMatrixSetLimits": tilematrix_limit,
                }
            )

            if output_type == MediaType.html:
                return self._create_html_response(
                    request,
                    data.model_dump(exclude_none=True, mode="json"),
                    template_name="tileset",
                    title=f"{collection.id} {tileMatrixSetId} tileset",
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
        async def collection_get_tile(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            tileMatrixSetId: Annotated[
                Literal[tuple(self.supported_tms.list())],
                Path(
                    description="Identifier selecting one of the TileMatrixSetId supported."
                ),
            ],
            tile: Annotated[Tile, Depends(TileParams)],
            ids_filter: Annotated[Optional[List[str]], Depends(ids_query)] = None,
            bbox_filter: Annotated[Optional[List[float]], Depends(bbox_query)] = None,
            datetime_filter: Annotated[
                Optional[List[str]], Depends(datetime_query)
            ] = None,
            properties: Annotated[
                Optional[List[str]], Depends(properties_query)
            ] = None,
            cql_filter: Annotated[Optional[Expr], Depends(filter_query)] = None,
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

            async with request.app.state.pool.acquire() as conn:
                tile = await collection.get_tile(
                    conn,
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

            return Response(tile, media_type=MediaType.mvt.value)

    def _tilejson_routes(self):
        ############################################################################
        # ADDITIONAL ENDPOINTS NOT IN OGC Tiles API (tilejson, style.json, viewer) #
        ############################################################################
        @self.router.get(
            "/collections/{collectionId}/tiles/{tileMatrixSetId}/tilejson.json",
            response_model=model.TileJSON,
            responses={200: {"description": "Return a tilejson"}},
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            operation_id=".collection.vector.getTileJSONTms",
            tags=["OGC Tiles API"],
        )
        async def collection_tilejson(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            tileMatrixSetId: Annotated[
                Literal[tuple(self.supported_tms.list())],
                Path(
                    description="Identifier selecting one of the TileMatrixSetId supported."
                ),
            ],
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
            "/collections/{collectionId}/tiles/{tileMatrixSetId}/style.json",
            response_model=model.StyleJSON,
            responses={200: {"description": "Return a tilejson"}},
            response_model_exclude_none=True,
            response_class=ORJSONResponse,
            operation_id=".collection.vector.getStyleJSONTms",
            tags=["OGC Tiles API"],
        )
        async def collection_stylejson(
            request: Request,
            collection: Annotated[Collection, Depends(self.collection_dependency)],
            tileMatrixSetId: Annotated[
                Literal[tuple(self.supported_tms.list())],
                Path(
                    description="Identifier selecting one of the TileMatrixSetId supported."
                ),
            ],
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

            bounds = list(collection.bounds) or list(tms.bbox)

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
                "/collections/{collectionId}/tiles/{tileMatrixSetId}/map.html",
                response_class=HTMLResponse,
                operation_id=".collection.vector.map",
                tags=["Map Viewer"],
            )
            def map_viewer(
                request: Request,
                collection: Annotated[Collection, Depends(self.collection_dependency)],
                tileMatrixSetId: Annotated[
                    Literal[tuple(self.supported_tms.list())],
                    Path(
                        description="Identifier selecting one of the TileMatrixSetId supported."
                    ),
                ],
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
                tms = self.supported_tms.get(tileMatrixSetId)

                tilejson_url = self.url_for(
                    request,
                    "collection_tilejson",
                    collectionId=collection.id,
                    tileMatrixSetId=tileMatrixSetId,
                )
                if request.query_params._list:
                    tilejson_url += f"?{urlencode(request.query_params._list)}"

                return self._create_html_response(
                    request,
                    {
                        "title": collection.id,
                        "tilejson_endpoint": tilejson_url,
                        "tms": tms,
                        "resolutions": [matrix.cellSize for matrix in tms],
                    },
                    template_name="map",
                    title=f"{collection.id} viewer",
                )
