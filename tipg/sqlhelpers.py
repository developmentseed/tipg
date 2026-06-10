"""tipg.sqlhelpers: shared low-level SQL/query helpers."""

import re
from functools import lru_cache

from pyproj import Transformer

from tipg.logger import logger

# Cache CRS transformers — building a pyproj Transformer is expensive and the
# same (source, target) pairs recur across every request.
TransformerFromCRS = lru_cache(Transformer.from_crs)


def _quote_ident(name: str) -> str:
    """Quote a PostgreSQL identifier (column/table/schema) safely."""
    return '"' + name.replace('"', '""') + '"'


def debug_query(q, *p):
    """Utility to print raw statement to use for debugging."""

    # Escape literal `{` and `}` (cql2 emits GeoJSON literals containing them)
    # then turn `$N` placeholders into `{N}` format slots.
    qsub = re.sub(r"\$([0-9]+)", r"{\1}", q.replace("{", "{{").replace("}", "}}"))

    def quote_str(s):
        """Quote strings."""

        if s is None:
            return "null"
        elif isinstance(s, str):
            return f"'{s}'"
        else:
            return s

    p = [quote_str(s) for s in p]
    logger.debug(qsub.format(None, *p))
