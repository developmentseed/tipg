"""tipg enums."""

from enum import Enum


class MediaType(str, Enum):
    """Responses Media types formerly known as MIME types."""

    xml = "application/xml"
    json = "application/json"
    ndjson = "application/ndjson"
    geojson = "application/geo+json"
    geojsonseq = "application/geo+json-seq"
    schemajson = "application/schema+json"
    html = "text/html"
    text = "text/plain"
    csv = "text/csv"
    openapi30_json = "application/vnd.oai.openapi+json;version=3.0"
    openapi30_yaml = "application/vnd.oai.openapi;version=3.0"
    pbf = "application/x-protobuf"
    mvt = "application/vnd.mapbox-vector-tile"
