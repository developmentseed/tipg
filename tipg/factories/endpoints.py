"""tipg.factories.endpoints: combined OGC Features + Tiles factory."""

from dataclasses import dataclass, field
from typing import Callable, List

from morecantile import tms as default_tms
from morecantile.defaults import TileMatrixSets

from tipg import model
from tipg.dbmodel import CollectionList
from tipg.dependencies import CollectionsParams
from tipg.factories.base import EndpointsFactory
from tipg.factories.features import OGCFeaturesFactory
from tipg.factories.tiles import OGCTilesFactory

from starlette.requests import Request


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
