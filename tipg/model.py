"""Backwards-compat shim for the model package.

The response models were split into the ``tipg.models`` package
(``tipg.models.common`` / ``tipg.models.features`` / ``tipg.models.tiles``).
This module re-exports them so existing ``from tipg.model import ...`` and
``from tipg import model`` imports keep working. Prefer importing from
``tipg.models`` directly.
"""

from tipg.models import *  # noqa: F401,F403
from tipg.models import __all__ as __all__  # noqa: F401
