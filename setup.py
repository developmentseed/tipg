"""Fake tifeatures setup.py for github."""
import sys

from setuptools import setup

sys.stderr.write(
    """
===============================
Unsupported installation method
===============================
tifeatures no longer supports installation with `python setup.py install`.
Please use `python -m pip install .` instead.
"""
)
sys.exit(1)


# The below code will never execute, however GitHub is particularly
# picky about where it finds Python packaging metadata.
# See: https://github.com/github/feedback/discussions/6456
#
# To be removed once GitHub catches up.

setup(
    name="tifeatures",
    install_requires=[
        "orjson",
        "asyncpg>=0.23.0",
        "buildpg>=0.3",
        "fastapi>=0.87",
        "jinja2>=2.11.2,<4.0.0",
        "geojson-pydantic>=0.4.3",
        "pygeofilter>=0.2.0,<0.3.0",
        "ciso8601~=2.2.0",
        "starlette-cramjam>=0.3,<0.4",
        "importlib_resources>=1.1.0; python_version < '3.9'",
        "typing_extensions; python_version < '3.9.2'",
    ],
)
