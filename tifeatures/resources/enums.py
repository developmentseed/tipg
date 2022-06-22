"""tifeatures enums."""

from enum import Enum


class ResponseType(str, Enum):
    """Response Type Enums."""

    html = "html"
    json = "json"


class AcceptType(str, Enum):
    """Accept Headers Enums."""

    html = "text/html"
    json = "application/json"
    geojson = "application/geo+json"


class MediaType(str, Enum):
    """Responses Media types formerly known as MIME types."""

    xml = "application/xml"
    json = "application/json"
    geojson = "application/geo+json"
    html = "text/html"
    text = "text/plain"
    openapi30_json = "application/vnd.oai.openapi+json;version=3.0"
    openapi30_yaml = "application/vnd.oai.openapi;version=3.0"


class FilterLang(str, Enum):
    """filter language.

    ref: https://github.com/radiantearth/stac-api-spec/tree/master/fragments/filter#get-query-parameters-and-post-json-fields
    """

    cql2_text = "cql2-text"
    cql2_json = "cql2-json"
