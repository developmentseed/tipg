"""Backwards-compat shim for the factory package.

The router factories were split into the ``tipg.factories`` package
(``tipg.factories.base`` / ``features`` / ``tiles`` / ``endpoints`` / ``utils``).
This module re-exports them so existing ``from tipg.factory import ...`` and
``from tipg import factory`` imports keep working. Prefer importing from
``tipg.factories`` directly.
"""

from tipg.factories import *  # noqa: F401,F403
from tipg.factories import __all__ as __all__  # noqa: F401
