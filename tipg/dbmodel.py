"""tipg.dbmodel: database events."""

from typing import Any, Dict, List, Optional

from buildpg import asyncpg
from pydantic import BaseModel, Field

from tipg.settings import TableSettings, TileSettings

tile_settings = TileSettings()


class Column(BaseModel):
    """Model for database Column."""

    name: str
    type: str
    description: Optional[str]

    @property
    def json_type(self) -> str:
        """Return JSON field type."""
        if self.type.endswith("[]"):
            return "array"

        if self.type in [
            "smallint",
            "integer",
            "bigint",
            "decimal",
            "numeric",
            "real",
            "double precision",
            "smallserial",
            "serial",
            "bigserial",
            # Float8 is not a Postgres type name but is the name we give
            # internally do Double Precision type
            # ref: https://github.com/developmentseed/tipg/pull/60/files#r1011863866
            "float8",
        ]:
            return "number"

        if self.type.startswith("bool"):
            return "boolean"

        if any([self.type.startswith("json"), self.type.startswith("geo")]):
            return "object"

        return "string"


class GeometryColumn(Column):
    """Model for PostGIS geometry/geography column."""

    bounds: List[float] = [-180, -90, 180, 90]
    srid: int = 4326
    geometry_type: str


class DatetimeColumn(Column):
    """Model for PostGIS geometry/geography column."""

    min: Optional[str]
    max: Optional[str]


class Parameter(Column):
    """Model for PostGIS function parameters."""

    default: Optional[str] = None


class Table(BaseModel):
    """Model for DB Table."""

    type: str
    id: str
    table: str
    dbschema: str = Field(..., alias="schema")
    description: Optional[str]
    properties: List[Column] = []
    id_column: Optional[str]
    geometry_columns: List[GeometryColumn] = []
    datetime_columns: List[DatetimeColumn] = []
    geometry_column: Optional[GeometryColumn]
    datetime_column: Optional[DatetimeColumn]
    parameters: List[Parameter] = []
    minzoom: int = tile_settings.default_minzoom
    maxzoom: int = tile_settings.default_maxzoom
    default_tms: str = tile_settings.default_tms

    def get_datetime_column(self, name: Optional[str] = None) -> Optional[Column]:
        """Return the Column for either the passed in tstz column or the first tstz column."""
        if not self.datetime_columns:
            return None

        if name is None:
            return self.datetime_column

        for col in self.datetime_columns:
            if col.name == name:
                return col

        return None

    def get_geometry_column(
        self, name: Optional[str] = None
    ) -> Optional[GeometryColumn]:
        """Return the name of the first geometry column."""
        if (not self.geometry_columns) or (name and name.lower() == "none"):
            return None

        if name is None:
            return self.geometry_column

        for col in self.geometry_columns:
            if col.name == name:
                return col

        return None

    @property
    def id_column_info(self) -> Column:  # type: ignore
        """Return Column for a unique identifier."""
        for col in self.properties:
            if col.name == self.id_column:
                return col

    def columns(self, properties: Optional[List[str]] = None) -> List[str]:
        """Return table columns optionally filtered to only include columns from properties."""
        if properties in [[], [""]]:
            return []

        cols = [
            c.name for c in self.properties if c.type not in ["geometry", "geography"]
        ]
        if properties is None:
            return cols

        return [c for c in cols if c in properties]

    def get_column(self, property_name: str) -> Optional[Column]:
        """Return column info."""
        for p in self.properties:
            if p.name == property_name:
                return p

        return None


Database = Dict[str, Dict[str, Any]]


async def get_table_index(
    db_pool: asyncpg.BuildPgPool,
    schemas: Optional[List[str]] = ["public"],
    tables: Optional[List[str]] = None,
    functions: Optional[List[str]] = None,
    spatial: bool = True,
) -> Database:
    """Fetch Table index."""

    query = """
        WITH table_columns AS (
            SELECT
                nspname,
                relname,
                format('%I.%I', nspname, relname) as id,
                c.oid as t_oid,
                obj_description(c.oid, 'pg_class') as description,
                attname,
                atttypmod,
                replace(replace(replace(replace(format_type(atttypid, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp') as typ,
                col_description(attrelid, attnum)
            FROM
                pg_class c
                JOIN pg_namespace n on (c.relnamespace=n.oid)
                JOIN pg_attribute a on (attnum>0 and attrelid=c.oid and not attisdropped)
            WHERE
                relkind IN ('r','v', 'm', 'f', 'p')
                AND has_table_privilege(c.oid, 'SELECT')
                AND has_column_privilege(c.oid,a.attnum, 'SELECT')
                AND n.nspname NOT IN ('pg_catalog', 'information_schema')
                AND c.relname NOT IN ('spatial_ref_sys','geometry_columns','geography_columns')
                AND (:schemas::text[] IS NULL  OR n.nspname = ANY (:schemas))
                AND (:tables::text[] IS NULL OR c.relname = ANY (:tables))
        ),
        grouped as
        (SELECT
            'Table' as entity,
            nspname as dbschema,
            relname as tbl,
            id,
            description,
            (
                SELECT attname
                FROM
                    pg_attribute a
                    LEFT JOIN
                    pg_index i
                        ON (
                            a.attrelid = i.indrelid
                            AND a.attnum = ANY(i.indkey)
                            )
                WHERE
                    a.attrelid = t_oid
                    AND
                    i.indnatts = 1
                ORDER BY
                    i.indisprimary DESC NULLS LAST,
                    i.indisunique DESC NULLS LAST
                LIMIT 1
            ) as id_column,
            coalesce(jsonb_agg(
                jsonb_build_object(
                    'name', attname,
                    'type', typ,
                    'geometry_type', postgis_typmod_type(atttypmod),
                    'srid', postgis_typmod_srid(atttypmod),
                    'description', col_description,
                    'bounds',
                        CASE WHEN postgis_typmod_srid(atttypmod) IS NOT NULL AND postgis_typmod_srid(atttypmod) != 0 THEN
                            (
                                SELECT
                                    ARRAY[
                                        ST_XMin(extent.geom),
                                        ST_YMin(extent.geom),
                                        ST_XMax(extent.geom),
                                        ST_YMax(extent.geom)
                                    ]
                                FROM (
                                    SELECT
                                        coalesce(
                                            ST_Transform(
                                                ST_SetSRID(
                                                    ST_EstimatedExtent(nspname, relname, attname),
                                                    postgis_typmod_srid(atttypmod)
                                                ),
                                                4326
                                            ),
                                            ST_MakeEnvelope(-180, -90, 180, 90, 4326)
                                        ) as geom
                                    ) AS extent
                            )
                        ELSE ARRAY[-180,-90,180,90]
                        END
                )
            ) FILTER (WHERE typ IN ('geometry','geography')), '[]'::jsonb) as geometry_columns,
            coalesce(jsonb_agg(
                jsonb_build_object(
                    'name', attname,
                    'type', typ,
                    'description', col_description
                )
            ) FILTER (WHERE typ LIKE 'timestamp%'), '[]'::jsonb) as datetime_columns,
            coalesce(jsonb_agg(
                jsonb_build_object(
                    'name', attname,
                    'type', typ,
                    'description', col_description
                )
            ),'[]'::jsonb) as properties,
            '[]'::jsonb as parameters
        FROM
            table_columns
        GROUP BY 1,2,3,4,5,6 ORDER BY 1,2,3,4
        ),
        f AS (
            SELECT
                'Function' as entity,
                nspname as dbschema,
                proname as tbl,
                format('%s.%s',nspname, proname) as id,
                d.description as description,
                CASE WHEN pronargdefaults > 0 AND pronargs > 0 THEN
                    array_fill(
                        NULL::text,
                        ARRAY[pronargs-pronargdefaults]
                    ) || string_to_array(pg_get_expr(p.proargdefaults, 0::OID),',')
                ELSE array_fill(null::text, ARRAY[pronargs])
                END as defaults,
                p.proallargtypes,
                p.proargmodes,
                p.proargnames
            FROM
                pg_proc p
                JOIN
                pg_namespace n on (p.pronamespace=n.oid)
                LEFT JOIN pg_description d ON (p.oid = d.objoid)
            WHERE
                proretset
                AND nspname='public'
                AND prokind='f'
                AND proargnames is not null
                AND '' != ANY(proargnames)
                AND has_function_privilege(p.oid, 'execute')
                AND has_schema_privilege(n.oid, 'usage')
                AND provariadic=0
                AND cardinality(p.proargnames) = cardinality(p.proargmodes)
                AND cardinality(p.proargmodes) = cardinality(p.proallargtypes)
        ), functions as (
        SELECT
            entity,
            dbschema,
            tbl,
            id,
            description,
            null::text as id_column,
            coalesce(jsonb_agg(
                jsonb_strip_nulls(jsonb_build_object(
                    'name', a.argname,
                    'type', replace(replace(replace(replace(format_type(argtype, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp'),
                    'geometry_type', 'Geometry'
                ))
                ORDER BY a.argnum
            ) FILTER (WHERE argmode IN ('t', 'b', 'o') AND format_type(argtype, null) LIKE 'geo%'),'[]'::jsonb) as geometry_columns,
            coalesce(jsonb_agg(
                jsonb_strip_nulls(jsonb_build_object(
                    'name', a.argname,
                    'type', replace(replace(replace(replace(format_type(argtype, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp')
                ))
                ORDER BY a.argnum
            ) FILTER (WHERE argmode IN ('t', 'b', 'o') AND format_type(argtype, null) LIKE 'timestamp%'),'[]'::jsonb) as datetime_columns,
            coalesce(jsonb_agg(
                jsonb_build_object(
                    'name', a.argname,
                    'type', replace(replace(replace(replace(format_type(argtype, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp')
                )
                ORDER BY a.argnum
            ) FILTER (WHERE argmode IN ('t', 'b', 'o')),'[]'::jsonb) as properties,
            coalesce(jsonb_agg(
                jsonb_strip_nulls(jsonb_build_object(
                    'name', a.argname,
                    'type', replace(replace(replace(replace(format_type(argtype, null),'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp')
                    ,'default', regexp_replace(def, '''([a-zA-Z0-9_\-\.]+)''::\w+', '\1', 'g')
                ))
                ORDER BY a.argnum
            ) FILTER (WHERE argmode IN ('i', 'b')),'[]'::jsonb) as parameters
        FROM
            f
            LEFT JOIN LATERAL unnest(f.proallargtypes,f.proargmodes,f.proargnames,f.defaults) WITH ORDINALITY AS a(argtype,argmode,argname,def,argnum) ON TRUE
        GROUP BY 1,2,3,4,5,6 ORDER BY 1,2,3,4
        ),
        unioned as (
        SELECT * FROM grouped
        UNION ALL
        SELECT * FROM functions
        )
        SELECT * FROM unioned
        WHERE :spatial = FALSE OR jsonb_array_length(geometry_columns)>=1
        ;
    """  # noqa: W605

    async with db_pool.acquire() as conn:
        rows = await conn.fetch_b(
            query,
            schemas=schemas,
            tables=tables,
            functions=functions,
            spatial=spatial,
        )

        catalog = {}
        table_settings = TableSettings()
        table_confs = table_settings.table_config
        fallback_key_names = table_settings.fallback_key_names

        for table in rows:
            id = table["id"]
            confid = id.replace(".", "_")
            table_conf = table_confs.get(confid, {})

            # Make sure that any properties set in conf exist in table
            properties = table.get("properties", [])
            properties_setting = table_conf.get("properties", [])
            if properties_setting:
                properties = [p for p in properties if p["name"] in properties_setting]

            property_names = [p["name"] for p in properties]

            # ID Column
            id_column = table_conf.get("pk") or table["id_column"]
            if not id_column and fallback_key_names:
                for p in properties:
                    if p["name"] in fallback_key_names:
                        id_column = p["name"]
                        break

            # Datetime Column
            datetime_columns = [
                c
                for c in table.get("datetime_columns", [])
                if c["name"] in property_names
            ]

            datetime_column = None
            for col in datetime_columns:
                if table_conf.get("datetimecol") == col["name"]:
                    datetime_column = col

            if not datetime_column and datetime_columns:
                datetime_column = datetime_columns[0]

            # Geometry Column
            geometry_columns = [
                c
                for c in table.get("geometry_columns", [])
                if c["name"] in property_names
            ]
            geometry_column = None
            for col in geometry_columns:
                if table_conf.get("geomcol") == col["name"]:
                    geometry_column = col
            if not geometry_column and geometry_columns:
                geometry_column = geometry_columns[0]

            catalog[id] = {
                "type": table["entity"],
                "id": id,
                "table": table["tbl"],
                "schema": table["dbschema"],
                "description": table["description"],
                "id_column": id_column,
                "geometry_columns": geometry_columns,
                "datetime_columns": datetime_columns,
                "properties": properties,
                "datetime_column": datetime_column,
                "geometry_column": geometry_column,
                "parameters": table["parameters"],
            }

        return catalog
