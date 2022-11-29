ARG PYTHON_VERSION=3.11

FROM ghcr.io/vincentsarago/uvicorn-gunicorn:${PYTHON_VERSION}

WORKDIR /tmp

COPY README.md README.md
COPY LICENSE LICENSE
COPY tipg/ tipg/
COPY pyproject.toml pyproject.toml

RUN pip install . --no-cache-dir
RUN rm -rf tipg/ README.md pyproject.toml LICENSE

ENV MODULE_NAME tipg.main
ENV VARIABLE_NAME app
