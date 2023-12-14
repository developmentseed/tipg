from plum import dispatch
from pydantic import BaseModel
from typing import List, Any, Optional, Tuple, Union, Dict, Callable
from functools import partialmethod, partial
from pycql2.cql2_pydantic import (
    make_char_literal,
    NotExpression,
    BinaryComparisonPredicate,
    ArithmeticExpression,
    BooleanExpression,
    CharacterExpression,
    PropertyRef,
    PatternExpression,
    IsLikePredicate,
    SpatialPredicate,
    TemporalPredicate,
    DateInstant,
    TimestampInstant,
    IntervalInstance,
    IntervalArrayItems,
    AndOrExpression,
    NumericExpression,
    BboxLiteral,
    GeometryLiteral,
    ArrayPredicate,
    ArrayElement,
    ArrayExpression,
    ArrayExpressionItems,
    Array,
    IsBetweenPredicate,
    IsInListPredicate,
    IsNullPredicate,
    Casei,
    Accenti,
    Function,
    FunctionRef,
)
from pycql2.cql2_transformer import parser, transformer
from buildpg import asyncpg
from inspect import signature

from functools import reduce
from datetime import date, datetime

# from tipg.collections import Collection
import pgmini
from pgmini import Param as P
from pgmini import build
from tipg.collections import get_collection_index
from tipg.query import NULL, Table, F

transform = transformer.transform
parse = parser.parse

def ensure_list(s)->list:
    """Makes sure that variable is treated as list."""
    if s is None:
        return []
    if isinstance(s, list):
        return s
    if isinstance(s, set):
        return list(s)
    if isinstance(s, tuple):
        return list(s)
    return [s]

class Operator:
    """Filter Operators."""

    OPERATORS: Dict[str, Callable] = {
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
        "+": lambda f, a: f + a,
        "-": lambda f, a: f - a,
        "*": lambda f, a: f * a,
        "/": lambda f, a: f / a,
        "div": lambda f, a: f / a,
        "^": lambda f, a: F('power',f,a),
        "%": lambda f, a: F('mod',f,a),
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


class CQL2SQL:
    """Class to convert CQL2 to SQL."""

    def __init__(self, collection: Optional["Collection"] = None):
        """Init Class."""
        if collection is not None:
            self.collection = collection
            tablecls = type(
                self.collection.table,
                (Table,),
                {f'"{c.name}"': c.type for c in self.collection.properties},
            )
            self.table = tablecls(self.collection.table)
        else:
            self.collection = None
            self.table = Table("mytable")

    def col(self, c: Union[str, PropertyRef]):
        """Return a column."""
        if isinstance(c, PropertyRef):
            return self.table.get(c.property)
        return self.table.get(c)

    def get_args(self, e: BaseModel) -> List[Any]:
        """Sqlify all args, always return as list."""
        return [self.sql(arg) for arg in ensure_list(e.args)]

    @dispatch
    def sql(self, e: NotExpression):  # noqa: F811
        """Get Not Expression."""
        args = self.get_args(e)
        return pgmini.operators.Not(args[0])


    def casei_accenti_arg(self, e):
        """Checks if arg is case insensitive."""
        casei = False
        accenti = False

        if isinstance(e, Casei):
            arg = self.sql(e.casei)
            casei = True
        elif (hasattr(e, 'root') and isinstance(e.root, Casei)):
            arg = self.sql(e.root.casei)
            casei = True
        elif isinstance(e, Accenti):
            arg = self.sql(e.accenti)
            accenti = True
        elif (hasattr(e, 'root') and isinstance(e.root, Accenti)):
            arg = self.sql(e.root.accenti)
            accenti = True
        else:
            arg = self.sql(e)
        return arg, casei, accenti

    def get_args_casei_accenti(self, e) -> bool:
        """Check if arg is case insensitive."""
        args, casei, accenti = zip(*[self.casei_accenti_arg(arg) for arg in ensure_list(e.args)])
        return args, any(casei), any(accenti)

    @dispatch
    def sql(self, e: IsLikePredicate):  # noqa: F811
        """Get Like Expression."""
        args, useilike, unaccent = self.get_args_casei_accenti(e)
        if unaccent:
            args = [F('unaccent',arg) for arg in args]
        left, right = args
        if useilike:
            return left.Ilike(right)
        return left.Like(right)

    @dispatch
    def sql(self, e: IsBetweenPredicate):  # noqa: F811
        """Get Between Expression."""
        left, low, high = self.get_args(e)
        return left.Between(low, high)

    @dispatch
    def sql(self, e: IsInListPredicate):  # noqa: F811
        left = self.sql(e.args[0])
        args = pgmini.array.Array([self.sql(arg) for arg in e.args[1]])
        return left.Any(args)

    @dispatch
    def sql(self, e: IsNullPredicate):  # noqa: F811
        """Get Null Expression."""
        left = self.get_args(e)[0]
        return left.Is(NULL())

    @dispatch
    def sql(  # noqa: F811
        self, e: BinaryComparisonPredicate
    ):
        """Get buildsql for operators."""
        args, casei, unaccent = self.get_args_casei_accenti(e)
        if casei:
            args = [F('lower',arg) for arg in args]
        if unaccent:
            args = [F('unaccent',arg) for arg in args]
        op = Operator(e.op)
        return op.function(*args)

    @dispatch
    def sql(  # noqa: F811
        self, e: ArithmeticExpression
    ):
        """Get buildsql for operators."""
        args = self.get_args(e)
        op = Operator(e.op)
        return op.function(*args)

    @dispatch
    def sql(self, e: AndOrExpression):  # noqa: F811
        args = self.get_args(e)
        if e.op == "or":
            return pgmini.Or(*args)
        return pgmini.And(*args)

    @dispatch
    def sql(self, e: BooleanExpression):  # noqa: F811
        """Get buildsql for boolean expression."""
        if isinstance(e.root, bool):
            if e.root:
                return P(True)
            return P(False)
        return self.sql(e.root)

    @dispatch
    def sql(self, e: PropertyRef):
        """Get buildsql for property."""
        return self.col(e.property)

    @dispatch
    def sql(
        self,
        e: Union[
            CharacterExpression,
            PatternExpression,
            NumericExpression,
            ArithmeticExpression,
        ],
    ):  # noqa: F811
        """Get buildsql for character expression."""
        if hasattr(e, "root"):
            if isinstance(e.root, PropertyRef):
                return self.sql(e.root)
            return P(e.root)
        return P(e)

    @dispatch
    def sql(self, e: BboxLiteral):  # noqa: F811
        box = e.bbox
        if len(box) == 4:
            return F("ST_MAKEENVELOPE", *[P(b) for b in box], P(4326))
        if len(box) == 6:
            return F(
                "ST_MAKEENVELOPE", P(box[0]), P(box[1]), P(box[3]), P(box[4]), P(4326)
            )

    @dispatch
    def sql(self, e: GeometryLiteral):  # noqa: F811
        wkt = e.root.wkt
        if not wkt.startswith("SRID"):
            wkt = "SRID=4326;" + wkt
        return P(wkt).Cast("geometry")

    @dispatch
    def sql(self, e: SpatialPredicate):  # noqa: F811
        """Get buildsql for spatial predicate."""
        op = e.op.upper().replace("S_", "ST_")
        args = self.get_args(e)
        left = args[0]
        right = args[1]

        lsrid = ltyp = rsrid = rtyp = None

        if self.collection:
            if isinstance(left, pgmini.column.Column):
                lname = left._name
                lcol = self.colllection.get_column(lname.strip('"'))
                if lcol:
                    lsrid = lcol.srid
                    ltyp = lcol.type

            if isinstance(right, pgmini.column.Column):
                rname = right._name
                rcol = self.collection.get_column(rname.strip('"'))
                if rcol:
                    rsrid = rcol.srid
                    rtyp = rcol.type

        if (
            (lsrid == rsrid and ltyp == rtyp)
            or (lsrid == 4326 and ltyp == "geometry" and rtyp is None)
            or (rsrid == 4326 and rtyp == "geometry" and ltyp is None)
        ):
            pass
        elif ltyp == "geography" and rtyp is None:
            right = right.Cast("geography")
        elif lsrid != 4326 and rsrid is None:
            right = F("ST_TRANSFORM", right, lsrid)
        elif rtyp == "geography" and ltyp is None:
            left = left.Cast("geography")
        elif rsrid != 4326 and lsrid is None:
            left = F("ST_TRANSFORM", left, rsrid)
        elif ltyp == "geography" and rtyp == "geometry":
            right = right.Cast("geography")
        elif ltyp == "geometry" and rtyp == "geography":
            left = left.Cast("geography")
        elif (lsrid != rsrid) or (lsrid is None and rsrid is None):
            right = F("ST_TRANSFORM", right, F("ST_SRID", left))

        return F(op, left, right)

    temporal_opposites = {
        "T_AFTER": "T_BEFORE",
        "T_METBY": "T_MEETS",
        "T_OVERLAPPEDBY": "T_OVERLAPS",
        "T_STARTEDBY": "T_STARTS",
        "T_CONTAINS": "T_DURING",
        "T_FINISHEDBY": "T_FINISHES",
    }

    temporal_ops = {
        "T_BEFORE": lambda ll, lh, rl, rh: lh < rl,
        "T_MEETS": lambda ll, lh, rl, rh: lh == rl,
        "T_OVERLAPS": lambda ll, lh, rl, rh: pgmini.And(ll < rl, lh > rh, lh < rh),
        "T_STARTS": lambda ll, lh, rl, rh: pgmini.And(ll == rl, lh < rh),
        "T_DURING": lambda ll, lh, rl, rh: pgmini.And(ll > rl, lh < rh),
        "T_FINISHES": lambda ll, lh, rl, rh: pgmini.And(ll > rl, lh == rh),
        "T_EQUALS": lambda ll, lh, rl, rh: pgmini.And(ll == rl, lh == rh),
        "T_DISJOINT": lambda ll, lh, rl, rh: pgmini.Or(ll > rh, lh < rl),
        "T_INTERSECTS": lambda ll, lh, rl, rh: pgmini.And(ll <= rh, lh >= rl),
    }

    @dispatch
    def sql(self, e: DateInstant):  # noqa: F811
        return P(e.date).Cast("date")

    @dispatch
    def sql(self, e: TimestampInstant):  # noqa: F811
        return P(e.timestamp).Cast("timestamptz")

    @dispatch
    def sql(self, e: IntervalInstance):  # noqa: F811
        if e.interval[0].root == "..":
            lower = P("-infinity").Cast("timestamptz")
        else:
            lower = P(e.interval[0].root)

        if e.interval[1].root == "..":
            upper = P("infinity").Cast("timestamptz")
        else:
            upper = P(e.interval[1].root)
        return lower, upper

    def get_temporal_args(self, arg):
        """Get Temporal Arguments."""
        if isinstance(arg, PropertyRef):
            colout = self.col(arg)
            if self.collection:
                col = self.collection.get_column(arg._name.strip('"'))
                if col.type.endswith("range"):
                    return F("lower", self.col(colout)), F("upper", self.col(colout))
            else:
                return colout, colout
        if isinstance(arg, IntervalInstance):
            return self.sql(arg)
        if isinstance(
            arg,
            (
                DateInstant,
                TimestampInstant,
            ),
        ):
            val = self.sql(arg)
            return val, val

    @dispatch
    def sql(self, e: TemporalPredicate):  # noqa: F811
        """Get buildsql for temporal predicate."""
        op = e.op.upper()
        left = self.get_temporal_args(e.args[0])
        right = self.get_temporal_args(e.args[1])
        if op in self.temporal_opposites:
            op = self.temporal_opposites[op]
            tmp = right
            right = left
            left = tmp
        if op == "ANYINTERACTS":
            op = "T_INTERSECTS"
        ll, lh = left
        rl, rh = right
        return self.temporal_ops[op](ll, lh, rl, rh)

    @dispatch
    def sql(self, e: Array):  # noqa: F811
        vals = [self.sql(val) for val in e.root]
        return pgmini.array.Array(vals)

    @dispatch
    def sql(self, e: ArrayExpression):  # noqa: F811
        tuple = e.root
        return self.sql(tuple[0]), self.sql(tuple[1])

    @dispatch
    def sql(self, e: ArrayPredicate):  # noqa: F811
        op = e.op.upper()
        left, right = self.sql(e.args)
        if op == "A_CONTAINEDBY":
            return left.Op("<@", right)
        if op == "A_CONTAINS":
            return left.Op("@>", right)
        if op == "A_EQUALS":
            return left == right
        if op == "A_OVERLAPS":
            return left.Op("&&", right)

    @dispatch
    def sql(self, e: FunctionRef):  # noqa: F811
        return self.sql(e.function)

    @dispatch
    def sql(self, e: Function):  # noqa: F811
        if hasattr(e, 'name'):
            op = e.name
        else:
            op = e.op
        args = self.get_args(e)
        return F(op, *args)



def cql2sql(query: str, collection: Optional["Collection"] = None) -> Tuple[str, Any]:
    cql = transform(parse(query))
    T = CQL2SQL(collection)
    return build(T.sql(cql))
