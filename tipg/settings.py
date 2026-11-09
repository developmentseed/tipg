"""tipg config."""

from pydantic import (
    Field,
    field_validator,
    model_validator,
)
from pydantic_settings import BaseSettings


class APISettings(BaseSettings):
    """API settings"""

    name: str = "TiPg: OGC Features and Tiles API"
    debug: bool = False
    cors_origins: str = "*"
    cachecontrol: str = "public, max-age=3600"
    template_directory: str | None = None
    root_path: str = ""

    enable_metrics: bool = False

    add_tiles_viewer: bool = True

    catalog_ttl: int = 300

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}

    @field_validator("cors_origins")
    def parse_cors_origin(cls, v):
        """Parse CORS origins."""
        return [origin.strip() for origin in v.split(",")]


class TMSSettings(BaseSettings):
    """TiPG TMS settings"""

    default_tms: str = "WebMercatorQuad"
    default_minzoom: int = 0
    default_maxzoom: int = 22

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}


class FeaturesSettings(BaseSettings):
    """TiPG Items settings"""

    default_features_limit: int = Field(10, ge=0)
    max_features_per_query: int = Field(10000, ge=0)

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}

    @model_validator(mode="after")
    def max_default(self):
        """Set default bounds and srid when this is a function."""
        if self.default_features_limit > self.max_features_per_query:
            raise ValueError(
                f"Invalid combination of `limit` ({self.default_features_limit}) and `max features per query` ({self.max_features_per_query}) values"
            )

        return self


class MVTSettings(BaseSettings):
    """TiPG MVT settings"""

    tile_resolution: int = 4096
    tile_buffer: int = 256
    tile_clip: bool = True
    max_features_per_tile: int = 10000

    set_mvt_layername: bool | None = None

    model_config = {"env_prefix": "TIPG_", "env_file": ".env", "extra": "ignore"}
