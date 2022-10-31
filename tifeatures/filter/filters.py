"""tifeatures.filter.filters"""

import re
from datetime import timedelta
from functools import reduce
from inspect import signature
from typing import Any, Callable, Dict, List

from buildpg import V
from buildpg.funcs import AND as and_
from buildpg.funcs import NOT as not_
from buildpg.funcs import OR as or_
from buildpg.funcs import any
from buildpg.logic import Func
from geojson_pydantic.geometries import Polygon, parse_geometry_obj


def bbox_to_wkt(bbox: List[float], srid: int = 4326) -> str:
    """Return WKT representation of a BBOX."""
    poly = Polygon.from_bounds(*bbox)  # type:ignore
    return f"SRID={srid};{poly.wkt}"


def parse_geometry(geom: Dict[str, Any]) -> str:
    """Parse geometry object and return WKT."""
    wkt = parse_geometry_obj(geom).wkt  # type:ignore
    sridtxt = "" if wkt.startswith("SRID=") else "SRID=4326;"
    return f"{sridtxt}{wkt}"


# ------------------------------------------------------------------------------
# Filters
# ------------------------------------------------------------------------------
class Operator:
    """Filter Operators."""

    OPERATORS: Dict[str, Callable] = {
        "is_null": lambda f, a=None: f.is_(None),
        "is_not_null": lambda f, a=None: f.isnot(None),
        "==": lambda f, a: f == a,
        "=": lambda f, a: f == a,
        "eq": lambda f, a: f == a,
        "!=": lambda f, a: f != a,
        "<>": lambda f, a: f != a,
        "ne": lambda f, a: f != a,
        ">": lambda f, a: f > a,
        "gt": lambda f, a: f > a,
        "<": lambda f, a: f < a,
        "lt": lambda f, a: f < a,
        ">=": lambda f, a: f >= a,
        "ge": lambda f, a: f >= a,
        "<=": lambda f, a: f <= a,
        "le": lambda f, a: f <= a,
        "like": lambda f, a: f.like(a),
        "ilike": lambda f, a: f.ilike(a),
        "not_ilike": lambda f, a: ~f.ilike(a),
        "in": lambda f, a: f == any(a),
        "not_in": lambda f, a: ~f == any(a),
        "any": lambda f, a: f.any(a),
        "not_any": lambda f, a: f.not_(f.any(a)),
        "INTERSECTS": lambda f, a: Func("st_intersects", f, a),
        "DISJOINT": lambda f, a: Func("st_disjoint", f, a),
        "CONTAINS": lambda f, a: Func("st_contains", f, a),
        "WITHIN": lambda f, a: Func("st_within", f, a),
        "TOUCHES": lambda f, a: Func("st_touches", f, a),
        "CROSSES": lambda f, a: Func("st_crosses", f, a),
        "OVERLAPS": lambda f, a: Func("st_overlaps", f, a),
        "EQUALS": lambda f, a: Func("st_equals", f, a),
        "RELATE": lambda f, a, pattern: Func("st_relate", f, a, pattern),
        "DWITHIN": lambda f, a, distance: Func("st_dwithin", f, a, distance),
        "BEYOND": lambda f, a, distance: ~Func("st_dwithin", f, a, distance),
        "+": lambda f, a: f + a,
        "-": lambda f, a: f - a,
        "*": lambda f, a: f * a,
        "/": lambda f, a: f / a,
    }

    def __init__(self, operator: str = None):
        """Init."""
        if not operator:
            operator = "=="

        if operator not in self.OPERATORS:
            raise Exception("Operator `{}` not valid.".format(operator))

        self.operator = operator
        self.function = self.OPERATORS[operator]
        self.arity = len(signature(self.function).parameters)


def func(name, *args):
    """Return results of running SQL function with arguments."""
    return Func(name, *args)


def combine(sub_filters, combinator: str = "AND"):
    """Combine filters using a logical combinator

    :param sub_filters: the filters to combine
    :param combinator: a string: "AND" / "OR"
    :return: the combined filter

    """
    assert combinator in ("AND", "OR")
    _op = and_ if combinator == "AND" else or_

    def test(acc, q):
        return _op(acc, q)

    return reduce(test, sub_filters)


def negate(sub_filter):
    """Negate a filter, opposing its meaning.

    :param sub_filter: the filter to negate
    :return: the negated filter

    """
    return not_(sub_filter)


def runop(lhs, rhs=None, op: str = "=", negate: bool = False):
    """Compare a filter with an expression using a comparison operation.

    :param lhs: the field to compare
    :param rhs: the filter expression
    :param op: a string denoting the operation.
    :return: a comparison expression object

    """
    _op = Operator(op)

    if negate:
        return not_(_op.function(lhs, rhs))
    return _op.function(lhs, rhs)


def between(lhs, low, high, negate=False):
    """Create a filter to match elements that have a value within a certain range.

    :param lhs: the field to compare
    :param low: the lower value of the range
    :param high: the upper value of the range
    :param not_: whether the range shall be inclusive (the default) or exclusive
    :return: a comparison expression object

    """
    l_op = Operator("<=")
    g_op = Operator(">=")
    if negate:
        return not_(and_(g_op.function(lhs, low), l_op.function(lhs, high)))

    return and_(g_op.function(lhs, low), l_op.function(lhs, high))


def like(lhs, rhs, case=False, negate=False):
    """Create a filter to filter elements according to a string attribute using wildcard expressions.

    :param lhs: the field to compare
    :param rhs: the wildcard pattern: a string containing any number of '%' characters as wildcards.
    :param case: whether the lookup shall be done case sensitively or not
    :param not_: whether the range shall be inclusive (the default) or exclusive
    :return: a comparison expression object

    """
    if case:
        _op = Operator("like")
    else:
        _op = Operator("ilike")

    if negate:
        return not_(_op.function(lhs, rhs))

    return _op.function(lhs, rhs)


def temporal(lhs, time_or_period, op):
    """Create a temporal filter for the given temporal attribute.

    :param lhs: the field to compare
    :type lhs: :class:`django.db.models.F`
    :param time_or_period: the time instant or time span to use as a filter
    :type time_or_period: :class:`datetime.datetime` or a tuple of two datetimes or a tuple of one datetime and one :class:`datetime.timedelta`
    :param op: the comparison operation. one of ``"BEFORE"``, ``"BEFORE OR DURING"``, ``"DURING"``, ``"DURING OR AFTER"``, ``"AFTER"``.
    :type op: str
    :return: a comparison expression object
    :rtype: :class:`django.db.models.Q`

    """
    low = None
    high = None
    equal = None
    if op in ("BEFORE", "AFTER"):
        if op == "BEFORE":
            high = time_or_period
        else:
            low = time_or_period
    elif op == "TEQUALS":
        equal = time_or_period
    else:
        low, high = time_or_period

        if isinstance(low, timedelta):
            low = high - low
        if isinstance(high, timedelta):
            high = low + high
    if low is not None or high is not None:
        if low is not None and high is not None:
            return between(lhs, low, high)
        elif low is not None:
            return runop(lhs, low, ">=")
        else:
            return runop(lhs, high, "<=")
    elif equal is not None:
        return runop(lhs, equal, "==")


UNITS_LOOKUP = {"kilometers": "km", "meters": "m"}


def spatial(lhs, rhs, op, pattern=None, distance=None, units=None):
    """Create a spatial filter for the given spatial attribute.

    :param lhs: the field to compare
    :param rhs: the time instant or time span to use as a filter
    :param op: the comparison operation. one of ``"INTERSECTS"``, ``"DISJOINT"``, `"CONTAINS"``, ``"WITHIN"``, ``"TOUCHES"``, ``"CROSSES"``, ``"OVERLAPS"``, ``"EQUALS"``, ``"RELATE"``, ``"DWITHIN"``, ``"BEYOND"``
    :param pattern: the spatial relation pattern
    :param distance: the distance value for distance based lookups: ``"DWITHIN"`` and ``"BEYOND"``
    :param units: the units the distance is expressed in
    :return: a comparison expression object

    """

    _op = Operator(op)
    if op == "RELATE":
        return _op.function(lhs, rhs, pattern)
    elif op in ("DWITHIN", "BEYOND"):
        if units == "kilometers":
            distance = distance / 1000
        elif units == "miles":
            distance = distance / 1609
        return _op.function(lhs, rhs, distance)
    else:
        return _op.function(lhs, rhs)


def bbox(lhs, minx, miny, maxx, maxy, crs: int = 4326):
    """Create a bounding box filter for the given spatial attribute.

    :param lhs: the field to compare
    :param minx: the lower x part of the bbox
    :param miny: the lower y part of the bbox
    :param maxx: the upper x part of the bbox
    :param maxy: the upper y part of the bbox
    :param crs: the CRS the bbox is expressed in
    :return: a comparison expression object

    """

    return Func("st_intersects", lhs, bbox_to_wkt([minx, miny, maxx, maxy], crs))


def quote_ident(s: str) -> str:
    """quote."""
    if re.match(r"^[a-z]+$", s):
        return s
    if re.match(r"^[a-zA-Z][\w\d_]*$", s):
        return f'"{s}"'
    raise TypeError(f"{s} is not a valid identifier")


def attribute(name: str, fields: List[str]):
    """Create an attribute lookup expression using a field mapping dictionary.

    :param name: the field filter name
    :param field_mapping: the dictionary to use as a lookup.

    """
    if name in fields:
        return V(name)
    elif name.lower() == "true":
        return True
    elif name.lower() == "false":
        return False
    else:
        raise TypeError(f"Field {name} not in table.")


def literal(value):
    """literal value."""
    return value
