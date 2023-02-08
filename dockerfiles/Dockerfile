ARG PYTHON_VERSION=3.11

FROM ghcr.io/vincentsarago/uvicorn-gunicorn:${PYTHON_VERSION}

WORKDIR /tmp

COPY README.md README.md
COPY LICENSE LICENSE
COPY pyproject.toml pyproject.toml
RUN mkdir -p tipg && echo '__version__="0.0.0"' >/tmp/tipg/__init__.py

RUN pip install . --no-cache-dir
COPY tipg tipg
RUN pip install -e . --no-cache-dir

ENV MODULE_NAME tipg.main
ENV VARIABLE_NAME app
