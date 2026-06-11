"""tipg.collections: build and register the collection catalog.

This module also re-exports the models, the ``PgCollection`` implementation and
the settings singletons that used to live here, so existing
``from tipg.collections import ...`` imports keep working after the split into
``tipg.dbmodel`` / ``tipg.pgcollection``.
"""

import datetime
from typing import List, Optional

import asyncpg

from tipg.dbmodel import (
    Catalog,
    Collection,
    CollectionList,
    Column,
    Feature,
    ItemList,
    Parameter,
)
from tipg.pgcollection import PgCollection, features_settings, mvt_settings
from tipg.settings import DatabaseSettings, TableConfig, TableSettings

from fastapi import FastAPI

__all__ = [
    # re-exported for backwards compatibility (see module docstring)
    "Catalog",
    "Collection",
    "CollectionList",
    "Column",
    "Feature",
    "ItemList",
    "Parameter",
    "PgCollection",
    "features_settings",
    "mvt_settings",
    # defined here
    "pg_get_collection_index",
    "register_collection_catalog",
]


async def pg_get_collection_index(  # noqa: C901
    conn: asyncpg.Connection,
    settings: Optional[DatabaseSettings] = None,
) -> List[Collection]:
    """Fetch Table and Functions index."""
    if not settings:
        settings = DatabaseSettings()

    schemas = settings.schemas or ["public"]

    query = f"""
        SELECT {settings.tipg_schema}.tipg_catalog(
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        );
    """

    rows = await conn.fetch(
        query,
        schemas,
        settings.tables,
        settings.exclude_tables,
        settings.exclude_table_schemas,
        settings.functions,
        settings.exclude_functions,
        settings.exclude_function_schemas,
        settings.only_spatial_tables,
        settings.spatial_extent,
        settings.datetime_extent,
    )

    collections: List[Collection] = []
    table_settings = TableSettings()
    table_confs = table_settings.table_config
    fallback_key_names = table_settings.fallback_key_names

    for row in rows:
        table = row[0]
        table_id = table["schema"] + "." + table["name"]
        confid = table["schema"] + "_" + table["name"]

        if table_id == f"{settings.tipg_schema}.tipg_catalog":
            continue

        table_conf = table_confs.get(confid, TableConfig())

        # Make sure that any properties set in conf exist in table
        columns = table.get("properties", [])
        if table_settings.sort_columns:
            columns = sorted(columns, key=lambda d: d["name"])

        properties_setting = table_conf.properties or [c["name"] for c in columns]

        # ID Column
        id_column = None
        if id_name := table_conf.pk or table.get("pk"):
            for p in columns:
                if id_name == p["name"]:
                    id_column = p
                    break

        if id_column is None and fallback_key_names:
            for p in columns:
                if p["name"] in fallback_key_names:
                    id_column = p
                    break

        datetime_column = None
        geometry_column = None

        for c in columns:
            if c.get("type") in ("timestamp", "timestamptz", "date"):
                if table_conf.datetimecol == c["name"] or datetime_column is None:
                    datetime_column = c

            if c.get("type") in ("geometry", "geography"):
                if table_conf.geomcol == c["name"] or geometry_column is None:
                    geometry_column = c

        collections.append(
            PgCollection(
                type=table["entity"],
                id=table_id,
                table=table["name"],
                schema=table["schema"],
                description=table.get("description", None),
                table_columns=columns,
                properties=[p for p in columns if p["name"] in properties_setting],
                id_column=id_column,
                datetime_column=datetime_column,
                geometry_column=geometry_column,
                parameters=table.get("parameters") or [],
            )
        )

    return collections


async def register_collection_catalog(
    app: FastAPI,
    db_settings: Optional[DatabaseSettings] = None,
) -> None:
    """Register Table catalog."""
    async with app.state.pool.acquire() as conn:
        db_collections = await pg_get_collection_index(conn, settings=db_settings)

    app.state.collection_catalog = Catalog(
        collections={col.id: col for col in [*db_collections]},
        last_updated=datetime.datetime.now(),
    )
