"""viewer Extension."""

from dataclasses import dataclass
from typing import Annotated
from urllib.parse import urlencode

from fastapi import Depends, Query
from starlette.requests import Request
from starlette.responses import HTMLResponse

from ..collections import Collection
from ..factory import EndpointsFactory, FactoryExtension


@dataclass
class viewerExtension(FactoryExtension):
    """Add /viewer endpoint."""

    def register(self, factory: EndpointsFactory):
        """Register endpoint to the tiler factory."""

        @factory.router.get(
            "/collections/{collectionId}/viewer.html",
            response_class=HTMLResponse,
            operation_id=".collection.vector.viewer",
            tags=["Map Viewer"],
        )
        def viewer(
            request: Request,
            collection: Annotated[Collection, Depends(factory.collection_dependency)],
            minzoom: Annotated[
                int | None,
                Query(description="Overwrite default minzoom."),
            ] = None,
            maxzoom: Annotated[
                int | None,
                Query(description="Overwrite default maxzoom."),
            ] = None,
            geom_column: Annotated[
                str | None,
                Query(
                    description="Select geometry column.",
                    alias="geom-column",
                ),
            ] = None,
        ):
            """Return Simple HTML Viewer for a collection."""
            stylejson_url = factory.url_for(
                request,
                "collection_stylejson",
                collectionId=collection.id,
                tileMatrixSetId="WebMercatorQuad",
            )
            if request.query_params._list:
                stylejson_url += f"?{urlencode(request.query_params._list)}"

            return factory._create_html_response(
                request,
                {
                    "title": collection.id,
                    "stylejson_endpoint": stylejson_url,
                },
                template_name="viewer",
                title=f"{collection.id} viewer",
            )
