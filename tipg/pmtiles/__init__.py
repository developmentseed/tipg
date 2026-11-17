"""tipg.pmtiles package"""

import warnings

from ..errors import TipgExperimentalWarning
from .collections import PMTilesCollection, pmtiles_get_collection_index
from .settings import PMTilesCatalogSettings

__all__ = [
    "pmtiles_get_collection_index",
    "PMTilesCatalogSettings",
    "PMTilesCollection",
]


warnings.warn(
    "This module is experimental, its contents are subject to change and deprecation.",
    category=TipgExperimentalWarning,
    stacklevel=2,
)
