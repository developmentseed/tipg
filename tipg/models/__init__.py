"""tipg.models: OGC API response/serialization models.

Models are organized into submodules:

* ``common`` — models shared by the features and tiles APIs
* ``features`` — OGC API - Features / Common response models
* ``tiles`` — OGC API - Tiles response models

All public names are re-exported here, so ``from tipg.models import Item`` works
regardless of which submodule defines the model.
"""

from tipg.models.common import Link
from tipg.models.features import (
    Collection,
    Collections,
    Conformance,
    Extent,
    Item,
    Items,
    Landing,
    Queryables,
    Spatial,
    Temporal,
)
from tipg.models.tiles import (
    AccessConstraints,
    BoundingBox,
    GeospatialData,
    LayerJSON,
    Properties,
    PropertiesSchema,
    Style,
    StyleJSON,
    TileJSON,
    TileMatrixLimits,
    TileMatrixSetLink,
    TileMatrixSetList,
    TileMatrixSetRef,
    TilePoint,
    TileSet,
    TileSetList,
    TimeStamp,
    Type,
)
from tipg.resources.enums import MediaType

__all__ = [
    "AccessConstraints",
    "BoundingBox",
    "Collection",
    "Collections",
    "Conformance",
    "Extent",
    "GeospatialData",
    "Item",
    "Items",
    "Landing",
    "LayerJSON",
    "Link",
    "MediaType",
    "Properties",
    "PropertiesSchema",
    "Queryables",
    "Spatial",
    "Style",
    "StyleJSON",
    "Temporal",
    "TileJSON",
    "TileMatrixLimits",
    "TileMatrixSetLink",
    "TileMatrixSetList",
    "TileMatrixSetRef",
    "TilePoint",
    "TileSet",
    "TileSetList",
    "TimeStamp",
    "Type",
]
