id = 'fa7e1920-9107-422d-a3db-c468cbc5d6df'
id != 'fa7e1920-9107-422d-a3db-c468cbc5d6df'
value < 10.0
value > 10.0
value <= 10.0
value >= 10.0
name LIKE 'foo%'
NOT name LIKE 'foo%'
NOT name LIKE 'foo%'
value BETWEEN 10.0 AND 20.0
NOT (value BETWEEN 10.0 AND 20.0)
NOT (value BETWEEN 10.0 AND 20.0)
value = ANY(ARRAY[1.0, 2.0, 3.0])
NOT value = ANY(ARRAY['a', 'b', 'c'])
NOT value = ANY(ARRAY['a', 'b', 'c'])
value IS NULL
NOT value IS NULL
NOT value IS NULL
NOT name LIKE 'foo%' AND value > 10.0
NOT name LIKE 'foo%' AND value > 10.0
value IS NULL OR value BETWEEN 10.0 AND 20.0
value IS NULL OR value BETWEEN 10.0 AND 20.0
ST_INTERSECTS(geometry, ST_MAKEENVELOPE(-128.098193, -1.1, 180.0, 90.0, 4326))
ST_EQUALS('SRID=4326;POLYGON ((-0.333333 89.0, -102.723546 -0.5, -179.0 -89.0, -1.9 89.0, -0.0 89.0, 2.00001 -1.9, -0.333333 89.0))'::geometry, geometry)
ST_EQUALS('SRID=4326;POLYGON ((-0.333333 89.0, -102.723546 -0.5, -179.0 -89.0, -1.9 89.0, -0.0 89.0, 2.00001 -1.9, -0.333333 89.0))'::geometry, geometry)
ST_DISJOINT(geometry, 'SRID=4326;MULTIPOLYGON (((144.022387 45.176126, -1.1 0.0, 180.0 47.808086, 144.022387 45.176126)))'::geometry)
ST_TOUCHES(geometry, 'SRID=4326;MULTILINESTRING ((-1.9 -0.99999, 75.292574 1.5, -0.5 -4.016458, -31.708594 -74.743801, 179.0 -90.0), (-1.9 -1.1, 1.5 8.547371))'::geometry)
ST_WITHIN('SRID=4326;POLYGON Z ((-49.88024 0.5 -75993.341684, -1.5 -0.99999 -100000.0, 0.0 0.5 -0.333333, -49.88024 0.5 -75993.341684), (-65.887123 2.00001 -100000.0, 0.333333 -53.017711 -79471.332949, 180.0 0.0 1852.616704, -65.887123 2.00001 -100000.0))'::geometry, geometry)
ST_WITHIN('SRID=4326;POLYGON Z ((-49.88024 0.5 -75993.341684, -1.5 -0.99999 -100000.0, 0.0 0.5 -0.333333, -49.88024 0.5 -75993.341684), (-65.887123 2.00001 -100000.0, 0.333333 -53.017711 -79471.332949, 180.0 0.0 1852.616704, -65.887123 2.00001 -100000.0))'::geometry, geometry)
ST_OVERLAPS(geometry, ST_MAKEENVELOPE(-179.912109, 1.9, 180.0, 16.897016, 4326))
ST_CROSSES(geometry, 'SRID=4326;LINESTRING (172.03086 1.5, 1.1 -90.0, -159.757695 0.99999, -180.0 0.5, -12.111235 81.336403, -0.5 64.43958, 0.0 81.991815, -155.93831 90.0)'::geometry)
ST_CONTAINS(geometry, 'SRID=4326;POINT (-3.508362 -1.754181)'::geometry)
'2010-02-10'::date < "updated_at"
"updated_at" < '2012-08-10T05:30:00+00:00'::timestamptz
"updated_at" < '2012-08-10T05:30:00+00:00'::timestamptz
"updated_at" > '2000-01-01T00:00:00+00:00'::timestamptz AND "updated_at" < '2005-01-10T01:01:01.393216+00:00'::timestamptz
"updated_at" > '2000-01-01T00:00:00+00:00'::timestamptz AND "updated_at" < '2005-01-10T01:01:01.393216+00:00'::timestamptz
'-infinity'::timestamptz > "coverage_date" OR '2005-01-10T01:01:01.393216+00:00'::timestamptz < "coverage_date"
"created_at" > '2005-01-10'::date AND "updated_at" < '2010-02-10'::date
"updated_at" = '1851-04-29'::date AND "updated_at" = '1851-04-29'::date
'1991-10-07T08:21:06.393262+00:00'::timestamptz > "coverage_date" AND '2010-02-10T05:29:20.073225+00:00'::timestamptz = "coverage_date"
"coverage_dates" > '1991-10-07'::date AND "coverage_dates" = '2010-02-10T05:29:20.073225+00:00'::timestamptz
"coverage_date" <= '2010-02-10T05:29:20.073225+00:00'::timestamptz AND "coverage_date" >= '1991-10-07T08:21:06.393262+00:00'::timestamptz
'2010-02-10'::date = "coverage_dates"
"coverage_dates" = '2010-02-10T05:29:20.073225+00:00'::timestamptz
"coverage_dates" < '1991-10-07T08:21:06.393262+00:00'::timestamptz AND "coverage_dates" > '2010-02-10T05:29:20.073225+00:00'::timestamptz AND "coverage_dates" < '2010-02-10T05:29:20.073225+00:00'::timestamptz
"coverage_date" < '1991-10-07T08:21:06.393262+00:00'::timestamptz AND "coverage_date" > '1992-10-09T08:08:08.393473+00:00'::timestamptz AND "coverage_date" < '1992-10-09T08:08:08.393473+00:00'::timestamptz
"coverage_dates" = '1991-10-07T08:21:06.393262+00:00'::timestamptz AND "coverage_dates" < '2010-02-10T05:29:20.073225+00:00'::timestamptz
"coverage_dates" = '1991-10-07T08:21:06.393262+00:00'::timestamptz AND "coverage_dates" < 'infinity'::timestamptz
FOO(geometry) IS True
False IS NOT BAR(geometry, 100.0, 'a', 'b', False)
UNACCENT(owner) = UNACCENT('Beyoncé')
LOWER(owner) = LOWER('somebody else')
value > (foo + 10.0)
value < (foo - 10.0)
value != (22.1 * foo)
value = (2.0 / foo)
value <= POWER(2.0, foo)
0.0 = MOD(foo, 2.0)
1.0 = (foo / 2.0)
values <@ ARRAY['a', 'b', 'c']
values @> ARRAY['a', 'b', 'c']
ARRAY['a', True, 1.0, 8.0] = values
values && ARRAY['2012-08-10T05:30:00+00:00'::timestamptz, '2010-02-10'::date, False]
ST_EQUALS(MULTIPOINT(180.0 - 0.5, 179.0 - 47.121701, 180.0 - 0.0, 33.470475 - 0.99999, 179.0 - 15.333062), geometry)
ST_EQUALS('SRID=4326;GEOMETRYCOLLECTION (POINT (1.9 2.00001), POINT (0.0 -2.00001), MULTILINESTRING ((-2.00001 -0.0, -77.292642 -0.5, -87.515626 -0.0, -180.0 12.502773, 21.204842 -1.5, -21.878857 -90.0)), POINT (1.9 0.5), LINESTRING (179.0 1.179148, -148.192487 -65.007816, 0.5 0.333333))'::geometry, geometry)
value = ((-1 * foo) * 2.0) + (bar / 6.1234) - POWER(x, 2.0)
value = ((-1.0 * foo) * 2.0) + (bar / 6.1234) - POWER(x, 2.0)
name ILIKE 'FOO%'
