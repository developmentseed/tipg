"""tipg models."""

from datetime import datetime
from enum import Enum
from typing import Dict, List, Literal, Optional, Tuple, Union

from geojson_pydantic.features import Feature, FeatureCollection
from morecantile.models import CRSType
from pydantic import AnyHttpUrl, AnyUrl, BaseModel, Field, conint, root_validator

from tipg.resources.enums import MediaType


class Link(BaseModel):
    """Link model.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/common-core/link.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    href: str = Field(
        ...,
        description="Supplies the URI to a remote resource (or resource fragment).",
        example="http://data.example.com/buildings/123",
    )
    rel: str = Field(
        ..., description="The type or semantics of the relation.", example="alternate"
    )
    type: Optional[MediaType] = Field(
        description="A hint indicating what the media type of the result of dereferencing the link should be.",
        example="application/geo+json",
    )
    templated: Optional[bool] = Field(
        description="This flag set to true if the link is a URL template."
    )
    varBase: Optional[str] = Field(
        description="A base path to retrieve semantic information about the variables used in URL template.",
        example="/ogcapi/vars/",
    )
    hreflang: Optional[str] = Field(
        description="A hint indicating what the language of the result of dereferencing the link should be.",
        example="en",
    )
    title: Optional[str] = Field(
        description="Used to label the destination of a link such that it can be used as a human-readable identifier.",
        example="Trierer Strasse 70, 53115 Bonn",
    )
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

    class Config:
        """Collection model configuration."""

        extra = "allow"


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
    title: Optional[str]
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


class LayerJSON(BaseModel):
    """
    https://github.com/mapbox/tilejson-spec/tree/master/3.0.0#33-vector_layers
    """

    id: str
    fields: Dict = Field(default_factory=dict)
    description: Optional[str]
    minzoom: Optional[int]
    maxzoom: Optional[int]


class TileJSON(BaseModel):
    """
    TileJSON model.
    Based on https://github.com/mapbox/tilejson-spec/tree/master/2.2.0
    """

    tilejson: str = "3.0.0"
    name: Optional[str]
    description: Optional[str]
    version: str = "1.0.0"
    attribution: Optional[str]
    template: Optional[str]
    legend: Optional[str]
    scheme: SchemeEnum = SchemeEnum.xyz
    tiles: List[str]
    vector_layers: Optional[List[LayerJSON]]
    grids: Optional[List[str]]
    data: Optional[List[str]]
    minzoom: int = Field(0, ge=0, le=30)
    maxzoom: int = Field(30, ge=0, le=30)
    fillzoom: Optional[int]
    bounds: List[float] = [180, -85.05112877980659, 180, 85.0511287798066]
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


class StyleJSON(BaseModel):
    """
    Simple Mapbox/Maplibre Style JSON model.

    Based on https://docs.mapbox.com/help/glossary/style/

    """

    version: int = 8
    name: Optional[str]
    metadata: Optional[Dict]
    layers: List[Dict]
    sources: Dict
    center: List[float] = [0, 0]
    zoom: int = 1


class TimeStamp(BaseModel):
    """TimeStamp model.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/common-geodata/timeStamp.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    __root__: datetime = Field(
        ...,
        description="This property indicates the time and date when the response was generated using RFC 3339 notation.",
        example="2017-08-17T08:05:32Z",
    )


class BoundingBox(BaseModel):
    """BoundingBox model.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/2DBoundingBox.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    lowerLeft: List[float] = Field(
        ...,
        max_items=2,
        min_items=2,
        description="A 2D Point in the CRS indicated elsewhere",
    )
    upperRight: List[float] = Field(
        ...,
        max_items=2,
        min_items=2,
        description="A 2D Point in the CRS indicated elsewhere",
    )
    crs: Optional[CRSType] = Field(name="CRS")
    orderedAxes: Optional[List[str]] = Field(max_items=2, min_items=2)


class Type(Enum):
    """Type enum.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/propertiesSchema.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    array = "array"
    boolean = "boolean"
    integer = "integer"
    null = "null"
    number = "number"
    object = "object"
    string = "string"


class AccessConstraints(Enum):
    """AccessConstraints enum.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/propertiesSchema.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    unclassified = "unclassified"
    restricted = "restricted"
    confidential = "confidential"
    secret = "secret"
    topSecret = "topSecret"


class Properties(BaseModel):
    """Properties model.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/propertiesSchema.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    title: Optional[str]
    description: Optional[str] = Field(description="Implements 'description'")
    type: Optional[Type]
    enum: Optional[List] = Field(
        description="Implements 'acceptedValues'", min_items=1, unique_items=True
    )
    format: Optional[str] = Field(description="Complements implementation of 'type'")
    contentMediaType: Optional[str] = Field(description="Implements 'mediaType'")
    maximum: Optional[float] = Field(description="Implements 'range'")
    exclusiveMaximum: Optional[float] = Field(description="Implements 'range'")
    minimum: Optional[float] = Field(description="Implements 'range'")
    exclusiveMinimum: Optional[float] = Field(description="Implements 'range'")
    pattern: Optional[str]
    maxItems: Optional[conint(ge=0)] = Field(  # type: ignore
        description="Implements 'upperMultiplicity'"
    )
    minItems: Optional[conint(ge=0)] = Field(  # type: ignore
        0, description="Implements 'lowerMultiplicity'"
    )
    observedProperty: Optional[str]
    observedPropertyURI: Optional[AnyUrl]
    uom: Optional[str]
    uomURI: Optional[AnyUrl]


class PropertiesSchema(BaseModel):
    """PropertiesSchema model.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/propertiesSchema.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    type: Literal["object"]
    required: Optional[List[str]] = Field(
        description="Implements 'multiplicity' by citing property 'name' defined as 'additionalProperties'",
        min_items=1,
    )
    properties: Dict[str, Properties]


class Style(BaseModel):
    """Style model.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/style.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    id: str = Field(
        ..., description="An identifier for this style. Implementation of 'identifier'"
    )
    title: Optional[str] = Field(description="A title for this style")
    description: Optional[str] = Field(
        description="Brief narrative description of this style"
    )
    keywords: Optional[List[str]] = Field(description="keywords about this style")
    links: Optional[List[Link]] = Field(
        description="Links to style related resources. Possible link 'rel' values are: 'style' for a URL pointing to the style description, 'styleSpec' for a URL pointing to the specification or standard used to define the style.",
        min_items=1,
    )


class GeospatialData(BaseModel):
    """Geospatial model.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/geospatialData.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    title: Optional[str] = Field(
        description="Title of this tile matrix set, normally used for display to a human",
    )
    description: Optional[str] = Field(
        description="Brief narrative description of this tile matrix set, normally available for display to a human",
    )
    keywords: Optional[str] = Field(
        description="Unordered list of one or more commonly used or formalized word(s) or phrase(s) used to describe this layer",
    )
    id: str = Field(
        ...,
        description="Unique identifier of the Layer. Implementation of 'identifier'",
    )
    dataType: Literal["map", "vector", "coverage"] = Field(
        ..., description="Type of data represented in the tileset"
    )
    geometryDimension: Optional[conint(ge=0, le=3)] = Field(  # type: ignore
        description="The geometry dimension of the features shown in this layer (0: points, 1: curves, 2: surfaces, 3: solids), unspecified: mixed or unknown",
    )
    featureType: Optional[str] = Field(
        description="Feature type identifier. Only applicable to layers of datatype 'geometries'",
    )
    attribution: Optional[str] = Field(
        description="Short reference to recognize the author or provider"
    )
    license: Optional[str] = Field(description="License applicable to the tiles")
    pointOfContact: Optional[str] = Field(
        description="Useful information to contact the authors or custodians for the layer (e.g. e-mail address, a physical address,  phone numbers, etc)",
    )
    publisher: Optional[str] = Field(
        description="Organization or individual responsible for making the layer available",
    )
    theme: Optional[str] = Field(description="Category where the layer can be grouped")
    crs: Optional[CRSType] = Field(name="CRS")
    epoch: Optional[float] = Field(
        description="Epoch of the Coordinate Reference System (CRS)"
    )
    minScaleDenominator: Optional[float] = Field(
        description="Minimum scale denominator for usage of the layer"
    )
    maxScaleDenominator: Optional[float] = Field(
        description="Maximum scale denominator for usage of the layer"
    )
    minCellSize: Optional[float] = Field(
        description="Minimum cell size for usage of the layer"
    )
    maxCellSize: Optional[float] = Field(
        description="Maximum cell size for usage of the layer"
    )
    maxTileMatrix: Optional[str] = Field(
        description="TileMatrix identifier associated with the minScaleDenominator",
    )
    minTileMatrix: Optional[str] = Field(
        description="TileMatrix identifier associated with the maxScaleDenominator",
    )
    boundingBox: Optional[BoundingBox]
    created: Optional[TimeStamp]
    updated: Optional[TimeStamp]
    style: Optional[Style]
    geoDataClasses: Optional[List[str]] = Field(
        description="URI identifying a class of data contained in this layer (useful to determine compatibility with styles or processes)",
    )
    propertiesSchema: Optional[PropertiesSchema]
    links: Optional[List[Link]] = Field(
        description="Links related to this layer. Possible link 'rel' values are: 'geodata' for a URL pointing to the collection of geospatial data.",
        min_items=1,
    )


class TilePoint(BaseModel):
    """TilePoint model.

    Ref: https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/tilePoint.yaml

    Code generated using https://github.com/koxudaxi/datamodel-code-generator/
    """

    coordinates: List[float] = Field(..., max_items=2, min_items=2)
    crs: Optional[CRSType] = Field(name="CRS")
    tileMatrix: Optional[str] = Field(
        description="TileMatrix identifier associated with the scaleDenominator"
    )
    scaleDenominator: Optional[float] = Field(
        description="Scale denominator of the tile matrix selected"
    )
    cellSize: Optional[float] = Field(
        description="Cell size of the tile matrix selected"
    )


class TileMatrixLimits(BaseModel):
    """
    The limits for an individual tile matrix of a TileSet's TileMatrixSet, as defined in the OGC 2D TileMatrixSet and TileSet Metadata Standard

    Based on https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/tileMatrixLimits.yaml
    """

    tileMatrix: str
    minTileRow: int = Field(ge=0)
    maxTileRow: int = Field(ge=0)
    minTileCol: int = Field(ge=0)
    maxTileCol: int = Field(ge=0)


class TileSet(BaseModel):
    """
    TileSet model.

    Based on https://github.com/opengeospatial/ogcapi-tiles/blob/master/openapi/schemas/tms/tileSet.yaml
    """

    title: Optional[str] = Field(description="A title for this tileset")
    description: Optional[str] = Field(
        description="Brief narrative description of this tile set"
    )
    dataType: Literal["map", "vector", "coverage"] = Field(
        ..., description="Type of data represented in the tileset"
    )
    crs: CRSType = Field(..., name="CRS")
    tileMatrixSetURI: Optional[AnyUrl] = Field(
        description="Reference to a Tile Matrix Set on an official source for Tile Matrix Sets"
    )
    links: List[Link] = Field(description="Links to related resources")
    tileMatrixSetLimits: Optional[List[TileMatrixLimits]] = Field(
        description="Limits for the TileRow and TileCol values for each TileMatrix in the tileMatrixSet. If missing, there are no limits other that the ones imposed by the TileMatrixSet. If present the TileMatrices listed are limited and the rest not available at all",
    )
    epoch: Optional[Union[float, int]] = Field(
        description="Epoch of the Coordinate Reference System (CRS)"
    )
    layers: Optional[List[GeospatialData]] = Field(min_items=1)
    boundingBox: Optional[BoundingBox]
    centerPoint: Optional[TilePoint]
    style: Optional[Style]
    attribution: Optional[str] = Field(
        description="Short reference to recognize the author or provider"
    )
    license: Optional[str] = Field(description="License applicable to the tiles")
    accessConstraints: Optional[AccessConstraints] = Field(
        "unclassified",
        description="Restrictions on the availability of the Tile Set that the user needs to be aware of before using or redistributing the Tile Set",
    )
    keywords: Optional[List[str]] = Field(description="keywords about this tileset")
    version: Optional[str] = Field(
        description="Version of the Tile Set. Changes if the data behind the tiles has been changed",
    )
    created: Optional[TimeStamp]
    updated: Optional[TimeStamp]
    pointOfContact: Optional[str] = Field(
        description="Useful information to contact the authors or custodians for the Tile Set",
    )
    mediaTypes: Optional[List[str]] = Field(
        description="Media types available for the tiles"
    )


class TileSetList(BaseModel):
    """
    TileSetList model.

    Based on https://docs.ogc.org/is/20-057/20-057.html#toc34
    """

    tilesets: List[TileSet]
