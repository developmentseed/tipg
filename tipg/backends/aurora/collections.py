"""AWS Aurora Collections."""

import datetime
from typing import Any, Dict, List, Optional

import asyncpg

from tipg.collections import Catalog, Collection
from tipg.settings import TableSettings

from fastapi import FastAPI


async def get_collection_index(  # noqa: C901
    db_pool: asyncpg.BuildPgPool,
    schemas: Optional[List[str]] = None,
    tables: Optional[List[str]] = None,
    exclude_tables: Optional[List[str]] = None,
    exclude_table_schemas: Optional[List[str]] = None,
    functions: Optional[List[str]] = None,
    exclude_functions: Optional[List[str]] = None,
    exclude_function_schemas: Optional[List[str]] = None,
    spatial: bool = True,
    tipg_schema: str = "public",
) -> Catalog:
    """Fetch Table and Functions index."""
    schemas = schemas or ["public"]

    query = f"""
        SELECT {tipg_schema}.tipg_catalog(
            :schemas,
            :tables,
            :exclude_tables,
            :exclude_table_schemas,
            :functions,
            :exclude_functions,
            :exclude_function_schemas,
            :spatial
        );
    """  # noqa: W605

    async with db_pool.acquire() as conn:
        rows = await conn.fetch_b(
            query,
            schemas=schemas,
            tables=tables,
            exclude_tables=exclude_tables,
            exclude_table_schemas=exclude_table_schemas,
            functions=functions,
            exclude_functions=exclude_functions,
            exclude_function_schemas=exclude_function_schemas,
            spatial=spatial,
        )

        catalog: Dict[str, Collection] = {}
        table_settings = TableSettings()
        table_confs = table_settings.table_config
        fallback_key_names = table_settings.fallback_key_names

        for row in rows:
            table = row[0]
            table_id = table["schema"] + "." + table["name"]
            confid = table["schema"] + "_" + table["name"]

            if table_id == f"{tipg_schema}.tipg_catalog":
                continue

            table_conf = table_confs.get(confid, {})

            # Make sure that any properties set in conf exist in table
            properties = sorted(table.get("properties", []), key=lambda d: d["name"])
            properties_setting = table_conf.get("properties", [])
            if properties_setting:
                properties = [p for p in properties if p["name"] in properties_setting]

            # ID Column
            id_column = table_conf.get("pk") or table.get("pk")
            if not id_column and fallback_key_names:
                for p in properties:
                    if p["name"] in fallback_key_names:
                        id_column = p["name"]
                        break

            datetime_column = None
            geometry_column = None

            for c in properties:
                if c.get("type") in ("timestamp", "timestamptz"):
                    if (
                        table_conf.get("datetimecol") == c["name"]
                        or datetime_column is None
                    ):
                        datetime_column = c

                if c.get("type") in ("geometry", "geography"):
                    if (
                        table_conf.get("geomcol") == c["name"]
                        or geometry_column is None
                    ):
                        geometry_column = c

            catalog[table_id] = Collection(
                type=table["entity"],
                id=table_id,
                table=table["name"],
                schema=table["schema"],
                description=table.get("description", None),
                id_column=id_column,
                properties=properties,
                datetime_column=datetime_column,
                geometry_column=geometry_column,
                parameters=table.get("parameters", []),
            )

        return Catalog(collections=catalog, last_updated=datetime.datetime.now())


async def register_collection_catalog(app: FastAPI, **kwargs: Any) -> None:
    """Register Table catalog."""
    app.state.collection_catalog = await get_collection_index(app.state.pool, **kwargs)
