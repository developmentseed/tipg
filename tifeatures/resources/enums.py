"""tifeatures enums."""

from enum import Enum


class ResponseType(str, Enum):
    """Response Type Enums."""

    json = "json"
    html = "html"


class QueryablesResponseType(str, Enum):
    """Response Type Enums."""

    schemajson = "schemajson"
    html = "html"


class ItemsResponseType(str, Enum):
    """Response Type Enums."""

    geojson = "geojson"
    html = "html"
    json = "json"
    csv = "csv"
    geojsonseq = "geojsonseq"
    ndjson = "ndjson"


class ItemResponseType(str, Enum):
    """Response Type Enums."""

    geojson = "geojson"
    html = "html"
    json = "json"


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


class FilterLang(str, Enum):
    """filter language.

    ref: https://github.com/radiantearth/stac-api-spec/tree/master/fragments/filter#get-query-parameters-and-post-json-fields
    """

    cql2_text = "cql2-text"
    cql2_json = "cql2-json"
