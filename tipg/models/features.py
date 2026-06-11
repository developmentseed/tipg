"""tipg.models.features: OGC API - Features / Common response models."""

from typing import Annotated, Dict, List, Optional

from geojson_pydantic.features import Feature, FeatureCollection
from pydantic import BaseModel, Field

from tipg.models.common import Link


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

    spatial: Optional[Spatial] = None
    temporal: Optional[Temporal] = None


class Collection(BaseModel):
    """Collection model.

    Note: `CRS` is the list of CRS supported by the service not the CRS of the collection

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/collection.yaml

    """

    id: str
    title: Optional[str] = None
    description: Optional[str] = None
    links: List[Link]
    extent: Optional[Extent] = None
    itemType: str = "feature"
    crs: List[str] = ["http://www.opengis.net/def/crs/OGC/1.3/CRS84"]

    model_config = {"extra": "ignore"}


class Collections(BaseModel):
    """
    Collections model.

    Ref: http://beta.schemas.opengis.net/ogcapi/common/part2/0.1/collections/openapi/schemas/collections.yaml

    """

    links: List[Link]
    timeStamp: Optional[str] = None
    numberMatched: Optional[int] = None
    numberReturned: Optional[int] = None
    collections: List[Collection]

    model_config = {"extra": "allow"}


class Item(Feature):
    """Item model

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/featureGeoJSON.yaml

    """

    links: Optional[List[Link]] = None

    model_config = {"arbitrary_types_allowed": True}


class Items(FeatureCollection):
    """Items model

    Ref: http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/featureCollectionGeoJSON.yaml

    """

    id: str
    title: Optional[str] = None
    description: Optional[str] = None
    keywords: Optional[List[str]] = None
    features: List[Item]
    links: Optional[List[Link]] = None
    timeStamp: Optional[str] = None
    numberMatched: Optional[int] = None
    numberReturned: Optional[int] = None

    model_config = {"arbitrary_types_allowed": True}

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

    title: Optional[str] = None
    description: Optional[str] = None
    links: List[Link]


class Queryables(BaseModel):
    """Queryables model.

    Ref: https://docs.ogc.org/DRAFTS/19-079r1.html#filter-queryables

    """

    title: str
    properties: Dict[str, Dict[str, str]]
    type: str = "object"
    schema_name: Annotated[str, Field(alias="$schema")] = (
        "https://json-schema.org/draft/2019-09/schema"
    )
    link: Annotated[str, Field(alias="$id")]

    model_config = {"populate_by_name": True}
