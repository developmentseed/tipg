FROM cgr.dev/chainguard/wolfi-base:latest@sha256:7e62cecd3c5712dba6e52c5260afb8f9d7a23b9bbcdd26ad7508a811e74b766d AS base

ARG PYTHON_VERSION=3.14

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Install runtime dependencies. Versions deliberately unpinned: Wolfi rolls
# forward and garbage-collects old versions, so an "=<version>" pin breaks the
# build within days. The guardrails are the version-scoped names plus the
# digest above.
RUN apk add --no-cache \
      python-${PYTHON_VERSION} \
      libstdc++ bash tzdata curl

# uv as a pass-through stage rather than a direct COPY --from=<image>:
# Dependabot only parses FROM lines (dependabot/dependabot-core#5103), so this
# keeps the version pinned *and* auto-updated by the docker ecosystem.
FROM ghcr.io/astral-sh/uv:0.12.5@sha256:e85be844203885286c60ffad8a858d48afb6c5a5c237ca0e67f12e74b8f174b1 AS uv

# Build stage
FROM base AS builder

ARG PYTHON_VERSION

# Set build labels
LABEL stage=builder
LABEL org.opencontainers.image.source="https://github.com/developmentseed/tipg"
LABEL org.opencontainers.image.description="TiPG: Simple and Fast Geospatial OGC Features and Tiles API for PostGIS."
LABEL org.opencontainers.image.licenses="MIT"

# Install uv
COPY --from=uv /uv /uvx /usr/local/bin/

# Configure uv-managed virtual environment
#   UV_PYTHON: the apk python above, so the venv's interpreter symlinks resolve
#     against the same path in the runtime stage
#   UV_PYTHON_DOWNLOADS: never let uv fetch its own interpreter instead - a
#     managed build isn't copied into the runtime stage, leaving the venv's
#     python symlink (and every console-script shebang, e.g. uvicorn) dangling
#   UV_COMPILE_BYTECODE: .pyc at install time, as pip did, so cold starts
#     don't pay the compile on first import
ENV UV_LINK_MODE=copy \
    UV_PROJECT_ENVIRONMENT=/opt/venv \
    UV_PYTHON=python${PYTHON_VERSION} \
    UV_PYTHON_DOWNLOADS=never \
    UV_COMPILE_BYTECODE=1 \
    PATH="/opt/venv/bin:${PATH}"

WORKDIR /tmp/app

# Copy project metadata and dependencies
COPY pyproject.toml uv.lock README.md LICENSE ./
RUN uv sync --frozen --no-dev --group server --extra metrics --no-install-project

# Copy and install runtime source code to the builder image
COPY tipg/ tipg/
RUN uv pip install --no-deps .

# Runtime stage
FROM base

# Set runtime labels
LABEL org.opencontainers.image.source="https://github.com/developmentseed/tipg"
LABEL org.opencontainers.image.description="TiPG: Simple and Fast Geospatial OGC Features and Tiles API for PostGIS."
LABEL org.opencontainers.image.licenses="MIT"

# The chart execs `command: ["uvicorn"]` — a bare binary, resolved against the
# image's PATH.
ENV PATH="/opt/venv/bin:${PATH}"

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv

WORKDIR /tmp

USER nonroot

###################################################
# For compatibility (might be removed at one point)
ENV MODULE_NAME=tipg.main
ENV VARIABLE_NAME=app
ENV HOST=0.0.0.0
ENV PORT=80
ENV WEB_CONCURRENCY=1
CMD gunicorn -k uvicorn.workers.UvicornWorker ${MODULE_NAME}:${VARIABLE_NAME} --bind ${HOST}:${PORT} --workers ${WEB_CONCURRENCY}
