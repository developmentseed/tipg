CREATE OR REPLACE FUNCTION pg_temp.typ(t text) RETURNS text AS $$
    SELECT replace(replace(replace(replace(t,'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp');
$$ LANGUAGE SQL IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION pg_temp.nspname(n oid) RETURNS text AS $$
    SELECT CASE WHEN n=pg_my_temp_schema() THEN 'pg_temp' ELSE nspname::text END
    FROM pg_namespace WHERE oid=n;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION pg_temp.nspname(n regnamespace) RETURNS text AS $$
    SELECT pg_temp.nspname(n::oid);
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION pg_temp.tipg_pk(
    table_oid oid
) RETURNS text AS $$
    SELECT attname::text
    FROM
        pg_attribute a
        LEFT JOIN
        pg_index i
        ON (a.attrelid=i.indrelid AND a.attnum = ANY(i.indkey))
    WHERE
        a.attrelid = table_oid
        AND
        i.indnatts = 1
    ORDER BY
        i.indisprimary DESC NULLS LAST,
        i.indisunique DESC NULLS LAST
    LIMIT 1;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION pg_temp.tipg_properties(
    att pg_attribute,
    spatial_extent boolean,
    datetime_extent boolean
) RETURNS jsonb AS $$
DECLARE
    attname text := att.attname;
    attdescription text := col_description(att.attrelid, att.attnum);
    atttype text := pg_temp.typ(format_type(att.atttypid, null));
    attmin json;
    attmax json;
    srid int;
    geometry_type text;
    _schemaname text;
    _relname text;
    _n_live_tup bigint;
    _n_mod_since_analyze bigint;
    bounds_geom geometry;
    bounds float[];
BEGIN
    IF atttype IN ('timestamp', 'timestamptz', 'date') AND datetime_extent THEN
        EXECUTE FORMAT(
            $q$
                SELECT to_json(min(%I::timestamptz)), to_json(max(%I::timestamptz))
                FROM %s;
            $q$,
            attname,
            attname,
            att.attrelid::regclass::text
        ) INTO attmin, attmax;
    ELSIF atttype IN ('geometry', 'geography') THEN
        geometry_type := postgis_typmod_type(att.atttypmod);
        srid = coalesce(nullif(postgis_typmod_srid(att.atttypmod),0), 4326);

        IF spatial_extent THEN
            SELECT schemaname, relname, n_live_tup, n_mod_since_analyze
            INTO _schemaname, _relname, _n_live_tup, _n_mod_since_analyze
            FROM pg_stat_user_tables
            WHERE relid = att.attrelid;

            IF _n_live_tup > 0 AND _n_mod_since_analyze = 0 THEN
                bounds_geom := st_setsrid(st_estimatedextent(_schemaname, _relname, attname), srid);
            END IF;

            IF bounds_geom IS NULL THEN
                IF atttype = 'geography' THEN
                    EXECUTE format('SELECT ST_SetSRID(ST_Extent(%I::geometry), %L) FROM %s', attname, srid, att.attrelid::regclass::text) INTO bounds_geom;
                ELSE
                    EXECUTE format('SELECT ST_SetSRID(ST_Extent(%I), %L) FROM %s', attname, srid, att.attrelid::regclass::text) INTO bounds_geom;
                END IF;
            END IF;

            IF bounds_geom IS NOT NULL THEN
                IF srid != 4326 THEN
                    bounds_geom := st_transform(bounds_geom, 4326);
                END IF;
                bounds = ARRAY[ st_xmin(bounds_geom), st_ymin(bounds_geom), st_xmax(bounds_geom), st_ymax(bounds_geom) ];
            END IF;
        END IF;
    END IF;

    RETURN jsonb_strip_nulls(jsonb_build_object(
        'name', attname,
        'type', atttype,
        'description', attdescription,
        'mindt', attmin,
        'maxdt', attmax,
        'geometry_type', geometry_type,
        'srid', srid,
        'bounds', bounds
    ));
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION pg_temp.tipg_tproperties(
    c pg_class,
    spatial_extent boolean,
    datetime_extent boolean
) RETURNS jsonb AS $$
    WITH t AS (
        SELECT
            jsonb_agg(pg_temp.tipg_properties(a, spatial_extent, datetime_extent)) as properties
        FROM
            pg_attribute a
        WHERE
            attnum>0
            and attrelid=c.oid
            and not attisdropped
            and has_column_privilege(c.oid, a.attnum, 'SELECT')
    ) SELECT jsonb_build_object(
        'entity', 'Table',
        'pk', pg_temp.tipg_pk(c.oid),
        'name', c.relname::text,
        'schema', pg_temp.nspname(c.relnamespace),
        'properties', properties
    ) FROM t;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION pg_temp.tipg_tproperties(
    tabl text,
    spatial_extent boolean,
    datetime_extent boolean
) RETURNS jsonb AS $$
    SELECT pg_temp.tipg_tproperties(pg_class, spatial_extent, datetime_extent) FROM pg_class WHERE oid=tabl::regclass;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION pg_temp.tipg_fun_defaults(defaults pg_node_tree) RETURNS text[] AS $$
    WITH d AS (
        SELECT btrim(split_part(btrim(unnest(string_to_array(
                pg_get_expr(defaults,0::oid),
                ','
        ))),'::',1),'''') d
    ) SELECT array_agg(d) FROM d
    ;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION pg_temp.tipg_fproperties(
    p pg_proc
) RETURNS jsonb AS $$
DECLARE
    defaults text[];
    argtypes oid[];
    argmodes text[];
    proargnames text[] := coalesce(p.proargnames, array_fill(null::text, ARRAY[p.pronargs]));
    properties json;
    parameters json;
BEGIN
    IF p.pronargdefaults > 0 AND p.pronargs > 0 THEN
        defaults :=
            array_fill(null::text, ARRAY[p.pronargs-p.pronargdefaults])
            || pg_temp.tipg_fun_defaults(p.proargdefaults)
        ;
    ELSE
        defaults := array_fill(null::text, ARRAY[p.pronargs]);
    END IF;
    argtypes := coalesce(p.proallargtypes, (p.proargtypes::oid[])[:]);
    argmodes := coalesce(p.proargmodes,array_fill('i'::text,ARRAY[cardinality(proargnames)]));

    IF format_type(p.prorettype, null) IS DISTINCT FROM 'record' THEN
        argtypes := argtypes || p.prorettype;
        argmodes := argmodes || 'o'::text;
        proargnames := proargnames || p.proname::text;
    END IF;

    WITH t AS (
        SELECT
            pg_temp.typ(format_type(argtype, null)) as argtype,
            argmode,
            proargname,
            def,
            argnum
        FROM UNNEST(argtypes, argmodes, proargnames, defaults)
        WITH ORDINALITY AS a(argtype, argmode, proargname, def, argnum)
    ) SELECT
        jsonb_agg(json_strip_nulls(json_build_object(
            'name', proargname,
            'type', argtype,
            'geometry_type', CASE WHEN argtype IN ('geometry','geography') THEN 'Geometry' ELSE NULL END
        )) ORDER BY argnum ) FILTER (WHERE argmode IN ('t','b', 'o')),
        jsonb_agg(json_strip_nulls(json_build_object(
            'name', proargname,
            'type', argtype,
            'default', def
        )) ORDER BY argnum ) FILTER (WHERE argmode IN ('i','b'))
    FROM t INTO properties, parameters;
    RETURN jsonb_build_object(
        'entity', 'Function',
        'name', p.proname,
        'schema', pg_temp.nspname(p.pronamespace),
        'properties', properties,
        'parameters', parameters
    );
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION pg_temp.tipg_fproperties(
    func text
) RETURNS jsonb AS $$
    SELECT pg_temp.tipg_fproperties(pg_proc) FROM pg_proc WHERE oid=func::regproc;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION pg_temp.tipg_get_schemas(include text[] DEFAULT NULL, exclude text[] DEFAULT NULL) RETURNS SETOF oid AS $$
DECLARE
BEGIN
    IF include IS NULL OR cardinality(include) = 0 THEN
        include:=string_to_array(current_setting('search_path',false),',');
    END IF;
    RETURN QUERY
        WITH schemas AS (
            SELECT pg_my_temp_schema()::regnamespace::text AS _schema
            UNION
            SELECT btrim(unnest(include))
            EXCEPT
            SELECT btrim(unnest(exclude))
        )
        SELECT DISTINCT oid
        FROM pg_namespace, schemas
        WHERE
            nspname::text=_schema
            AND
            has_schema_privilege(oid, 'usage')
        ;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION pg_temp.tipg_catalog(
    schemas text[] DEFAULT NULL,
    tables text[] DEFAULT NULL,
    exclude_tables text[] DEFAULT NULL,
    exclude_table_schemas text[] DEFAULT NULL,
    functions text[] DEFAULT NULL,
    exclude_functions text[] DEFAULT NULL,
    exclude_function_schemas text[] DEFAULT NULL,
    spatial boolean DEFAULT FALSE,
    spatial_extent boolean DEFAULT TRUE,
    datetime_extent boolean DEFAULT TRUE
) RETURNS SETOF jsonb AS $$
    WITH a AS (
        SELECT
            pg_temp.tipg_tproperties(c, spatial_extent, datetime_extent) as meta
        FROM pg_class c, pg_temp.tipg_get_schemas(schemas,exclude_table_schemas) s
        WHERE
            c.relnamespace=s
            AND relkind IN ('r','v', 'm', 'f', 'p')
            AND has_table_privilege(c.oid, 'SELECT')
            AND c.relname::text NOT IN ('spatial_ref_sys','geometry_columns','geography_columns')
            AND (exclude_tables IS NULL OR concat(pg_temp.nspname(relnamespace),'.',c.relname::text) <> ALL (exclude_tables))
            AND (tables IS NULL OR concat(pg_temp.nspname(relnamespace),'.',c.relname::text) = ANY (tables))

        UNION ALL

        SELECT
            pg_temp.tipg_fproperties(p) as meta
        FROM
            pg_proc p, pg_temp.tipg_get_schemas(schemas,exclude_function_schemas) s
        WHERE
            p.pronamespace=s
            AND proretset
            AND prokind='f'
            AND proargnames is not null
            AND '' != ANY(proargnames)
            AND has_function_privilege(oid, 'execute')
            AND provariadic=0
            AND (exclude_functions IS NULL OR concat(pg_temp.nspname(pronamespace),'.', proname::text) <> ALL (exclude_functions))
            AND (functions IS NULL OR concat(pg_temp.nspname(pronamespace),'.', proname::text) = ANY (functions))
            AND p.proname::text NOT ILIKE 'tipg_%'
    )
    SELECT meta FROM a
    WHERE
        CASE
            WHEN spatial THEN meta @? '$.properties[*] ? (exists (@.geometry_type))'
            ELSE TRUE
        END
    ;
$$ LANGUAGE SQL;
