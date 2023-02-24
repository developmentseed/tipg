"""tipg models."""

from enum import Enum
from typing import Dict, List, Optional, Tuple

from geojson_pydantic.features import Feature, FeatureCollection
from pydantic import AnyHttpUrl, BaseModel, Field, root_validator

from tipg.resources.enums import MediaType


class Link(BaseModel):
    """Link model.

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/link.yaml

    """

    href: str
    rel: Optional[str]
    type: Optional[MediaType]
    hreflang: Optional[str]
    title: Optional[str]
    length: Optional[int]

    class Config:
        """Link model configuration."""

        use_enum_values = True


class Spatial(BaseModel):
    """Spatial Extent model.

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/extent.yaml

    """

    # Bbox
    # One or more bounding boxes that describe the spatial extent of the dataset.
    # The first bounding box describes the overall spatial
    # extent of the data. All subsequent bounding boxes describe
    # more precise bounding boxes, e.g., to identify clusters of data.
    bbox: List[List[float]]
    crs: str = "http://www.opengis.net/def/crs/OGC/1.3/CRS84"


class Temporal(BaseModel):
    """Temporal Extent model.

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/extent.yaml

    """

    # The first time interval describes the overall
    # temporal extent of the data. All subsequent time intervals describe
    # more precise time intervals, e.g., to identify clusters of data.
    # Clients only interested in the overall temporal extent will only need
    # to access the first time interval in the array (a pair of lower and upper
    # bound instants).
    interval: List[List[Optional[str]]]
    trs: str = "http://www.opengis.net/def/uom/ISO-8601/0/Gregorian"


class Extent(BaseModel):
    """Extent model.

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/extent.yaml

    """

    spatial: Optional[Spatial]
    temporal: Optional[Temporal]


class Collection(BaseModel):
    """Collection model.

    Note: `CRS` is the list of CRS supported by the service not the CRS of the collection

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/collection.yaml

    """

    id: str
    title: Optional[str]
    description: Optional[str]
    links: List[Link]
    extent: Optional[Extent]
    itemType: str = "feature"
    crs: List[str] = ["http://www.opengis.net/def/crs/OGC/1.3/CRS84"]

    class Config:
        """Collection model configuration."""

        extra = "ignore"


class Collections(BaseModel):
    """
    Collections model.

    Ref: http://beta.schemas.opengis.net/ogcapi/common/part2/0.1/collections/openapi/schemas/collections.yaml

    """

    links: List[Link]
    timeStamp: Optional[str]
    numberMatched: Optional[int]
    numberReturned: Optional[int]
    collections: List[Collection]


class Item(Feature):
    """Item model

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/featureGeoJSON.yaml

    """

    links: Optional[List[Link]]

    class Config:
        """Link model configuration."""

        arbitrary_types_allowed = True


class Items(FeatureCollection):
    """Items model

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/featureCollectionGeoJSON.yaml

    """

    id: str
    title: Optional[str]
    description: Optional[str]
    keywords: Optional[List[str]]
    features: List[Item]  # type: ignore
    links: Optional[List[Link]]
    timeStamp: Optional[str]
    numberMatched: Optional[int]
    numberReturned: Optional[int]

    class Config:
        """Link model configuration."""

        arbitrary_types_allowed = True

    def json_seq(self, **kwargs):
        """return a GeoJSON sequence representation."""
        for f in self.features:
            yield f.json(**kwargs) + "\n"


class Conformance(BaseModel):
    """Conformance model.

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/confClasses.yaml

    """

    conformsTo: List[str]


class Landing(BaseModel):
    """Landing page model.

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/landingPage.yaml

    """

    title: Optional[str]
    description: Optional[str]
    links: List[Link]


class Queryables(BaseModel):
    """Queryables model.

    Ref: https://docs.ogc.org/DRAFTS/19-079r1.html#filter-queryables

    """

    title: str
    properties: Dict[str, Dict[str, str]]
    type: str = "object"
    schema_name: str = Field(
        "https://json-schema.org/draft/2019-09/schema", alias="$schema"
    )
    link: str = Field(..., alias="$id")


class TileMatrixSetLink(BaseModel):
    """
    TileMatrixSetLink model.
    Based on http://docs.opengeospatial.org/per/19-069.html#_tilematrixsets
    """

    href: AnyHttpUrl
    rel: str = "item"
    type: MediaType = MediaType.json

    class Config:
        """Config for model."""

        use_enum_values = True


class TileMatrixSetRef(BaseModel):
    """
    TileMatrixSetRef model.
    Based on http://docs.opengeospatial.org/per/19-069.html#_tilematrixsets
    """

    id: str
    title: str
    links: List[TileMatrixSetLink]


class TileMatrixSetList(BaseModel):
    """
    TileMatrixSetList model.
    Based on http://docs.opengeospatial.org/per/19-069.html#_tilematrixsets
    """

    tileMatrixSets: List[TileMatrixSetRef]


class SchemeEnum(str, Enum):
    """TileJSON scheme choice."""

    xyz = "xyz"
    tms = "tms"


class TileJSON(BaseModel):
    """
    TileJSON model.
    Based on https://github.com/mapbox/tilejson-spec/tree/master/2.2.0
    """

    tilejson: str = "2.2.0"
    name: Optional[str]
    description: Optional[str]
    version: str = "1.0.0"
    attribution: Optional[str]
    template: Optional[str]
    legend: Optional[str]
    scheme: SchemeEnum = SchemeEnum.xyz
    tiles: List[str]
    grids: Optional[List[str]]
    data: Optional[List[str]]
    minzoom: int = Field(0, ge=0, le=30)
    maxzoom: int = Field(30, ge=0, le=30)
    bounds: List[float] = [-180, -90, 180, 90]
    center: Optional[Tuple[float, float, int]]

    @root_validator
    def compute_center(cls, values):
        """Compute center if it does not exist."""
        bounds = values["bounds"]
        if not values.get("center"):
            values["center"] = (
                (bounds[0] + bounds[2]) / 2,
                (bounds[1] + bounds[3]) / 2,
                values["minzoom"],
            )
        return values

    class Config:
        """TileJSON model configuration."""

        use_enum_values = True
