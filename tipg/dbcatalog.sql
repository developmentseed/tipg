CREATE OR REPLACE FUNCTION pg_temp.typ(t text) RETURNS text AS $$
    SELECT replace(replace(replace(replace(t,'character varying','text'),'double precision','float8'),'timestamp with time zone','timestamptz'),'timestamp without time zone','timestamp');
$$ LANGUAGE SQL IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION pg_temp.nspname(n oid) RETURNS text AS $$
    SELECT CASE WHEN n=pg_my_temp_schema() THEN 'tipgtmp' ELSE nspname END
    FROM pg_namespace WHERE oid=n;
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
    att pg_attribute
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
    IF atttype IN ('timestamp', 'timestamptz') THEN
        EXECUTE FORMAT(
            $q$
                SELECT to_json(min(%I)), to_json(max(%I))
                FROM %s;
            $q$,
            attname,
            attname,
            att.attrelid::regclass::text
        ) INTO attmin, attmax;
    ELSIF atttype IN ('geometry', 'geography') THEN
        geometry_type := postgis_typmod_type(att.atttypmod);
        srid = coalesce(nullif(postgis_typmod_srid(att.atttypmod),0), 4326);

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
                bounds_geom := st_transform(bounds_geom, srid);
            END IF;
            bounds = ARRAY[ st_xmin(bounds_geom), st_ymin(bounds_geom), st_xmax(bounds_geom), st_ymax(bounds_geom) ];
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
    c pg_class
) RETURNS jsonb AS $$
    WITH t AS (
        SELECT
            jsonb_agg(pg_temp.tipg_properties(a)) as properties
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
        'schema', c.relnamespace::regnamespace::text,
        'properties', properties
    ) FROM t;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION pg_temp.tipg_tproperties(
    tabl text
) RETURNS jsonb AS $$
    SELECT pg_temp.tipg_tproperties(pg_class) FROM pg_class WHERE oid=tabl::regclass;
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
            || string_to_array(pg_get_expr(p.proargdefaults, 0::OID),',')
        ;
    ELSE
        defaults := array_fill(null::text, ARRAY[p.pronargs]);
    END IF;
    argtypes := coalesce(p.proallargtypes, (p.proargtypes::oid[])[:]);
    argmodes := coalesce(p.proargmodes,array_fill('i'::text,ARRAY[cardinality(proargnames)]));

    IF format_type(p.prorettype, null) IS DISTINCT FROM 'record' THEN
        argtypes := argtypes || p.prorettype;
        argmodes := argmodes || 'o'::text;
        proargnames := proargnames || p.proname;
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
            'default', regexp_replace(def, '''([a-zA-Z0-9_\-\.]+)''::\w+', '\1', 'g')
        )) ORDER BY argnum ) FILTER (WHERE argmode IN ('i','b'))
    FROM t INTO properties, parameters;
    RETURN jsonb_build_object(
        'entity', 'Function',
        'name', p.proname,
        'schema', p.pronamespace::regnamespace::text,
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


CREATE OR REPLACE FUNCTION pg_temp.tipg_catalog(
    schemas text[] DEFAULT '{public}',
    tables text[] DEFAULT NULL,
    function_schemas text[] DEFAULT '{public}',
    functions text[] DEFAULT NULL,
    spatial boolean DEFAULT FALSE
) RETURNS SETOF jsonb AS $$
    WITH a AS (
        SELECT
            pg_temp.tipg_tproperties(c) as meta
        FROM pg_class c
        WHERE
            relkind IN ('r','v', 'm', 'f', 'p')
            AND has_table_privilege(c.oid, 'SELECT')
            AND c.relnamespace::regnamespace::text NOT IN ('pg_catalog', 'information_schema')
            AND c.relname::text NOT IN ('spatial_ref_sys','geometry_columns','geography_columns')
            AND (schemas IS NULL  OR c.relnamespace::regnamespace::text = ANY (schemas))
            AND (tables IS NULL OR c.relname::text = ANY (tables))
        UNION ALL
        SELECT
            pg_temp.tipg_fproperties(p) as meta
        FROM
            pg_proc p
        WHERE
            proretset
            AND prokind='f'
            AND proargnames is not null
            AND '' != ANY(proargnames)
            AND (pg_function_is_visible(oid) OR pronamespace = pg_my_temp_schema())
            AND has_function_privilege(oid, 'execute')
            AND has_schema_privilege(pronamespace, 'usage')
            AND provariadic=0
            AND (function_schemas IS NULL  OR p.pronamespace::regnamespace::text = ANY (function_schemas))
            AND (functions IS NULL OR proname::text = ANY (functions))
    )
    SELECT meta FROM a
    WHERE
        CASE
            WHEN spatial THEN meta @? '$.properties[*] ? (exists (@.geometry_type))'
            ELSE TRUE
        END
    ;
$$ LANGUAGE SQL;
