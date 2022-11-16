ARG PYTHON_VERSION=3.10

FROM ghcr.io/vincentsarago/uvicorn-gunicorn:${PYTHON_VERSION}

WORKDIR /tmp

COPY README.md README.md
COPY LICENSE LICENSE
COPY tifeatures/ tifeatures/
COPY pyproject.toml pyproject.toml

RUN pip install . --no-cache-dir
RUN rm -rf tifeatures/ README.md pyproject.toml LICENSE

ENV MODULE_NAME tifeatures.main
ENV VARIABLE_NAME app
