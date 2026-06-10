"""tipg.factories: router factories.

The factory classes are organized into submodules:

* ``base`` — ``EndpointsFactory`` (abstract) and ``FactoryExtension``
* ``features`` — ``OGCFeaturesFactory``
* ``tiles`` — ``OGCTilesFactory``
* ``endpoints`` — ``Endpoints`` (combined Features + Tiles)
* ``utils`` — shared rendering helpers

All public names are re-exported here.
"""

from tipg.factories.base import EndpointsFactory, FactoryExtension
from tipg.factories.endpoints import Endpoints
from tipg.factories.features import OGCFeaturesFactory
from tipg.factories.tiles import OGCTilesFactory
from tipg.factories.utils import create_csv_rows, create_html_response

__all__ = [
    "Endpoints",
    "EndpointsFactory",
    "FactoryExtension",
    "OGCFeaturesFactory",
    "OGCTilesFactory",
    "create_csv_rows",
    "create_html_response",
]
