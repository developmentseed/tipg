"""tipg PMTiles collection models."""

import warnings
from functools import cached_property
from typing import Any

from async_pmtiles import PMTilesReader
from morecantile import Tile, TileMatrixSet
from pydantic import ConfigDict
from starlette.exceptions import HTTPException
from starlette.responses import Response

from tipg.model import Extent

from ..collections import Collection, Column, ItemList
from ..resources.enums import MediaType
from .io import open as open_pmtiles
from .settings import PMTilesCatalogSettings


class PMTilesCollection(Collection):
    """Model for DB Table and Function."""

    source: str

    bounds: list[float] | None = None

    model_config = ConfigDict(arbitrary_types_allowed=True)

    @cached_property
    def extent(self) -> Extent | None:
        """Return extent."""
        extent: dict[str, Any] = {}
        if bbox := self.bounds:
            extent["spatial"] = {
                "bbox": [bbox],
                # The extent calculated in Pg is in WGS84 LON,LAT order
                # so we use `CRS84` as CRS
                "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
            }

        if extent:
            return Extent(**extent)

        return None

    @cached_property
    def dt_bounds(self) -> list[str] | None:
        """Return temporal bounds from collection extent."""
        return None

    @property
    def crs(self):
        """Return crs of set geometry column."""
        return "http://www.opengis.net/def/crs/EPSG/0/3857"

    def get_geometry_column(self, name: str | None = None) -> Column | None:
        """Return the name of the first geometry column."""
        return Column(name="geometry", type="geometry")

    def _tag_geometry_literal(self, geom: Any, srid: int) -> Any:
        """Tag a cql2-json geometry literal, whose coordinates are already in
        ``srid``, with that CRS (returns a cql2-json function call node).

        Not applicable for PMTiles collections.
        """
        pass

    def _reproject_geometry_literal(self, geom: Any, srid: int) -> Any:
        """Reproject a EPSG:4326 cql2-json geometry literal to ``srid``
        (returns a cql2-json function call node).

        Not applicable for PMTiles collections.
        """
        pass

    async def get_vector_layers(
        self,
        set_mvt_layername: bool,
    ) -> list[dict[str, Any]]:
        """Return vector layers."""
        pmtiles: PMTilesReader = await open_pmtiles(self.source)  # type: ignore
        metadata = await pmtiles.metadata()
        return metadata["vector_layers"]

    async def features(self, **kwargs) -> ItemList:
        """Items from PMTiles.

        Not applicable for PMTiles collections.
        """
        raise NotImplementedError

    async def get_tile(
        self,
        *,
        tms: TileMatrixSet,
        tile: Tile,
        **kwargs,
    ) -> Response:  # type: ignore
        """Tile for PmTiles."""
        params = {k for k, v in (kwargs or {}).items() if v is not None}
        if params:
            warnings.warn(
                "Parameter handling not implemented for PMTiles collections. Received parameters: "
                f"{params}",
                stacklevel=2,
            )

        # TODO: Check TMS support, assume they are in WebMercatorQuad
        assert tms.id == "WebMercatorQuad", (
            "Only WebMercatorQuad TMS is supported for PMTiles collections."
        )

        pmtiles: PMTilesReader = await open_pmtiles(self.source)  # type: ignore
        tile_body = await pmtiles.get_tile(tile.x, tile.y, tile.z)
        if not tile_body:
            raise HTTPException(status_code=204, detail="Empty")

        headers: dict[str, str] = {}
        if pmtiles.tile_compression.value != 1:  # None
            compr = pmtiles.tile_compression.name.lower()
            compr = "br" if compr == "brotli" else compr
            headers["Content-Encoding"] = compr

        return Response(
            bytes(tile_body),
            media_type=MediaType[pmtiles.tile_type.name.lower()].value,
            headers=headers,
        )


async def pmtiles_get_collection_index(  # noqa: C901
    *,
    settings: PMTilesCatalogSettings | None = None,
) -> list[Collection]:
    """Fetch Table and Functions index."""
    if not settings:
        settings = PMTilesCatalogSettings()

    # Attach and register file sources as views in the in-memory database.
    collections: list[Collection] = []
    for name, path in settings.sources.items():
        pmtiles: PMTilesReader = await open_pmtiles(path)
        assert pmtiles.tile_type.name == "MVT", (
            f"invalid tile type {pmtiles.tile_type}, expected MVT"
        )

        collection = PMTilesCollection(
            source=path,
            bounds=list(pmtiles.bounds),
            type="pmtiles",
            id=name,
            table=name,
        )
        collections.append(collection)

    return collections
