"""tipg logger."""

import logging

logger = logging.getLogger("tipg")
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
logger.addHandler(console_handler)

