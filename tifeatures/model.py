"""tifeatures models."""

from typing import Dict, List, Optional

from geojson_pydantic.features import Feature, FeatureCollection
from pydantic import BaseModel, Field

from tifeatures.resources.enums import MediaType


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

    # bbox: List[BBox]
    bbox: List[List[float]]
    crs: str


class Temporal(BaseModel):
    """Temporal Extent model.

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/extent.yaml

    """

    # interval: List[List[Optional[str], Optional[str]]]
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

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/collection.yaml

    """

    id: str
    title: Optional[str]
    description: Optional[str]
    links: List[Link]
    extent: Optional[Extent]
    itemType: str = "feature"
    crs: List[str] = ["http://www.opengis.net/def/crs/EPSG/0/4326"]

    class Config:
        """Collection model configuration."""

        extra = "ignore"


class Collections(BaseModel):
    """
    Collections model.

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/collections.yaml

    """

    collections: List[Collection]
    links: List[Link]


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
