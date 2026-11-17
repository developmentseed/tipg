"""TiPG PMTiles I/O utilities."""

from __future__ import annotations

import os
import posixpath
import re
from pathlib import Path
from typing import TYPE_CHECKING, Any
from urllib.parse import urlparse

import httpx2 as httpx
from async_pmtiles import PMTilesReader
from cache import AsyncTTL
from obstore.store import from_url

try:
    from obstore.auth.boto3 import Boto3CredentialProvider

except ImportError:
    Boto3CredentialProvider = None

if TYPE_CHECKING:
    from obstore.store import Store


@AsyncTTL(time_to_live=300)
async def _fetch_bucket_region(bucket: str, use_https: bool = True) -> str | None:
    prefix = "https" if use_https else "http"
    async with httpx.AsyncClient(timeout=5) as client:
        response = await client.head(f"{prefix}://{bucket}.s3.amazonaws.com")
    return response.headers.get("x-amz-bucket-region")


async def _find_bucket_region(bucket: str, use_https: bool = True) -> str | None:
    """Find AWS S3 bucket region (return None if the lookup fails).

    Failures are not cached, so a transient network error will be retried on next call.
    """
    try:
        return await _fetch_bucket_region(bucket, use_https)
    except httpx.HTTPError:
        return None


@AsyncTTL(time_to_live=300)
async def _get_store(url: str) -> Store:
    parsed = urlparse(url)
    if not parsed.scheme:
        url = str(Path(url).resolve())
        parsed = urlparse(f"file://{url}")

    config: dict[str, Any] = {}
    client_options: dict[str, Any] = {}

    s3_hosts = [
        "amazonaws.com",
    ]
    if parsed.scheme == "s3" or any(host in parsed.netloc for host in s3_hosts):
        region_name_env = (
            os.environ.get("AWS_REGION", os.environ.get("AWS_DEFAULT_REGION")) or None
        )
        aws_profile = os.environ.get("AWS_PROFILE")
        # s3:// urls
        if parsed.scheme == "s3":
            # AWS_S3_ENDPOINT and AWS_HTTPS are GDAL config options of vsis3 driver
            # # https://gdal.org/user/virtual_file_systems.html#vsis3-aws-s3-files
            endpoint_url = os.environ.get("AWS_S3_ENDPOINT", None)
            use_https = os.environ.get("AWS_HTTPS", "YES") in ["YES", "TRUE", "ON"]
            if endpoint_url:
                config["endpoint"] = (
                    "https://" + endpoint_url if use_https else "http://" + endpoint_url
                )
                # Custom (non-AWS) endpoint: don't ask amazonaws.com for the region
                region = region_name_env
            else:
                region = await _find_bucket_region(parsed.netloc) or region_name_env

            if region:
                config["region"] = region

            if aws_profile and Boto3CredentialProvider:
                # Use Boto3CredentialProvider for AWS profile support
                from obstore.store import S3Store

                store = S3Store(
                    parsed.netloc,
                    prefix=posixpath.dirname(parsed.path),
                    credential_provider=Boto3CredentialProvider(),
                    config=config,
                    client_options=client_options,
                    virtual_hosted_style_request=False,
                )
                return store

        # https://{bucket}.s3.{region}?.amazonaws.com urls
        else:
            # We assume that https:// url are public object
            config["skip_signature"] = True

            # Get Region from URL or guess if needed
            if expr := re.compile(
                r"(?P<bucket>[a-z0-9\.\-_]+)\.s3"
                r"(\.dualstack)?"
                r"(\.(?P<region>[a-z0-9\-_]+))?"
                r"\.amazonaws\.(com|cn)",
                re.IGNORECASE,
            ).match(parsed.netloc):
                bucket = expr.groupdict()["bucket"]
                if not expr.groupdict().get("region"):
                    if region := (await _find_bucket_region(bucket) or region_name_env):
                        config["region"] = region

    directory = posixpath.dirname(parsed.path)
    store_url = f"{parsed.scheme}://{parsed.netloc}{directory}"

    return from_url(
        store_url,
        config=config,
        client_options=client_options,
    )


@AsyncTTL(time_to_live=300)
async def open(url: str) -> PMTilesReader:
    """Create PMTiles dataset from url"""
    store = await _get_store(url)
    parsed = urlparse(url)
    return await PMTilesReader.open(parsed.path.split("/")[-1], store=store)
