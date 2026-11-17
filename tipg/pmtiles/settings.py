"""tipg PMTiles config."""

from pydantic_settings import BaseSettings


class PMTilesCatalogSettings(BaseSettings):
    """TiPg PMTiles settings."""

    sources: dict[str, str]

    model_config = {
        "env_prefix": "TIPG_PMTILES_",
        "env_file": ".env",
        "env_nested_delimiter": "__",
        "extra": "ignore",
    }
