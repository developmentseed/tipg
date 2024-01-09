"""Tools to convert CQL2 into PostgreSQL SQL."""
from datetime import date, datetime
from inspect import signature
import re
from typing import Any, Callable, Dict, List
from typing import Literal as TypeLiteral
from typing import Optional, Tuple, Union

import pgmini
from pgmini.utils import CompileABC
from plum import dispatch, overload
from pycql2.cql2_pydantic import (
    Accenti,
    AndOrExpression,
    ArithmeticExpression,
    Array,
    ArrayExpression,
    ArrayPredicate,
    BboxLiteral,
    BinaryComparisonPredicate,
    BooleanExpression,
    Casei,
    CharacterExpression,
    DateInstant,
    Function,
    FunctionRef,
    GeometryLiteral,
    IntervalInstance,
    IsBetweenPredicate,
    IsInListPredicate,
    IsLikePredicate,
    IsNullPredicate,
    NotExpression,
    NumericExpression,
    PatternExpression,
    PropertyRef,
    SpatialPredicate,
    TemporalPredicate,
    TimestampInstant,
)
from pycql2.cql2_transformer import parser, transformer
from pydantic import BaseModel
from tipg import collections

from tipg.query import NULL, F, Table, build, strip_ident, ensure_list, P, Param

transform = transformer.transform
parse = parser.parse





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
        "^": lambda f, a: F("power", f, a),
        "%": lambda f, a: F("mod", f, a),
    }

    def __init__(self, operator: Optional[str] = None) -> None:
        """Init."""
        if not operator:
            operator = "=="

        if operator not in self.OPERATORS:
            msg = f"Operator `{operator}` not valid."
            raise Exception(msg)
        self.operator = operator
        self.function = self.OPERATORS[operator]
        self.arity = len(signature(self.function).parameters)


class CQL2SQL:
    """Class to convert CQL2 to SQL."""

    def __init__(self, collection: Optional["Collection"] = None) -> None:
        """Init Class."""
        if collection is not None:
            self.collection = collection
            cols={}
            for ccol in collection.properties:
                print('CCOL', ccol)
                cols[ccol.name] = ccol.type
            # cols = {f'{ccol.name}': ccol.type for ccol in collection.properties}
            print(cols)
            self._cols=cols
            tablecls = type(
                self.collection.table,
                (Table,),
                cols,
            )
            self.table = tablecls(self.collection.table)
        else:
            self.collection = None
            self.table = Table("mytable")

    def col(self, c: Union[str, PropertyRef]) -> pgmini.column.Column:
        """Return a column."""
        if isinstance(c, PropertyRef):
            return self.table.get(c.property)
        return self.table.get(c)

    def get_args(self, e: BaseModel) -> List[CompileABC]:
        """Sqlify all args, always return as list."""
        if hasattr(e, "args"):
            return [self.sql(arg) for arg in ensure_list(e.args)]
        return []

    @overload
    def sql(self, e: NotExpression) -> CompileABC:  # type: ignore[no-redef]
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
        elif hasattr(e, "root") and isinstance(e.root, Casei):
            arg = self.sql(e.root.casei)
            casei = True
        elif isinstance(e, Accenti):
            arg = self.sql(e.accenti)
            accenti = True
        elif hasattr(e, "root") and isinstance(e.root, Accenti):
            arg = self.sql(e.root.accenti)
            accenti = True
        else:
            arg = self.sql(e)
        return arg, casei, accenti

    def get_args_casei_accenti(self, e) -> Tuple[Any, bool, bool]:
        """Check if arg is case insensitive."""
        args, casei, accenti = zip(
            *[self.casei_accenti_arg(arg) for arg in ensure_list(e.args)],
        )
        return args, any(casei), any(accenti)

    @overload
    def sql(self, e: IsLikePredicate) -> CompileABC:  # type: ignore[no-redef]
        """Get Like Expression."""
        args, useilike, unaccent = self.get_args_casei_accenti(e)
        if unaccent:
            args = [F("unaccent", arg) for arg in args]
        left, right = args
        if useilike:
            return left.Ilike(right)
        return left.Like(right)

    @overload
    def sql(self, e: IsBetweenPredicate) -> CompileABC:  # type: ignore[no-redef]
        """Get Between Expression."""
        left, low, high = self.get_args(e)
        return left.Between(low, high)

    @overload
    def sql(self, e: IsInListPredicate) -> CompileABC:  # type: ignore[no-redef]
        """Get In Expression."""
        left = self.sql(e.args[0])
        args = [(left == self.sql(arg)) for arg in e.args[1]]
        # args = pgmini.array.Array([self.sql(arg) for arg in e.args[1]])
        # return left.Any(args)
        return pgmini.Or(*args)

    @overload
    def sql(self, e: IsNullPredicate) -> CompileABC:  # type: ignore[no-redef]
        """Get Null Expression."""
        print('getting null expression', e)
        left = self.get_args(e)[0]
        return left.Is(NULL())

    @overload
    def sql(self, e: BinaryComparisonPredicate) -> CompileABC:  # type: ignore[no-redef]
        """Get binary comparisons expression."""
        print('getting binary comparison predicate', e)
        args, casei, unaccent = self.get_args_casei_accenti(e)
        if casei:
            args = [F("lower", arg) for arg in args]
        if unaccent:
            args = [F("unaccent", arg) for arg in args]
        op = Operator(e.op)
        return op.function(*args)

    @overload
    def sql(self, e: ArithmeticExpression) -> CompileABC:  # type: ignore[no-redef]
        """Get operators expression."""
        args = self.get_args(e)
        op = Operator(e.op)
        return op.function(*args)

    @overload
    def sql(self, e: AndOrExpression) -> CompileABC:  # type: ignore[no-redef]
        """Get and/or expression."""
        print('getting and/or', e)
        args = self.get_args(e)
        if e.op == "or":
            return pgmini.Or(*args)
        return pgmini.And(*args)

    @overload
    def sql(self, e: BooleanExpression) -> CompileABC:  # type: ignore[no-redef]
        """Get boolean expression."""
        print('getting boolean', e)
        if isinstance(e.root, bool):
            if e.root:
                return P(True)
            return P(False)
        return self.sql(e.root)

    @overload
    def sql(self, e: PropertyRef) -> CompileABC:  # type: ignore[no-redef]
        """Get property expression."""
        return self.col(e.property)

    @overload
    def sql(  # type: ignore[no-redef]
        self,
        e:  NumericExpression,
    ) -> CompileABC:
        """Get buildsql for character expression."""
        print('BUILDING Numeric EXPRESSION')
        print(self, e, type(e))
        if isinstance(e, float):
            if e.is_integer():
                print('Is Integer')
                e = int(e)
        if hasattr(e, "root"):
            print(e.root, type(e.root))
            if isinstance(e.root, PropertyRef):
                return self.sql(e.root)
            return P(e.root)
        return P(e)
    @overload
    def sql(  # type: ignore[no-redef]
        self,
        e: Union[
            CharacterExpression,
            PatternExpression
        ],
    ) -> CompileABC:
        """Get buildsql for character expression."""
        print('BUILDING EXPRESSION')
        print(e, type(e))
        if hasattr(e, "root"):
            print(e.root, type(e.root))
            if isinstance(e.root, PropertyRef):
                return self.sql(e.root)
            return P(e.root)
        return P(e)

    @overload
    def sql(self, e: BboxLiteral) -> CompileABC:  # type: ignore[no-redef]
        """Get BBox expression."""
        box = e.bbox
        if len(box) == 4:
            return F("ST_MAKEENVELOPE", *[P(b) for b in box], P(4326))
        if len(box) == 6:
            return F(
                "ST_MAKEENVELOPE",
                P(box[0]),
                P(box[1]),
                P(box[3]),
                P(box[4]),
                P(4326),
            )
        return None

    @overload
    def sql(self, e: GeometryLiteral) -> CompileABC:  # type: ignore[no-redef]
        """Get wkt expression for geometry."""
        wkt = e.root.wkt
        if not wkt.startswith("SRID"):
            wkt = "SRID=4326;" + wkt
        return P(wkt).Cast("geometry")

    def get_collection_geom_info(
        self,
        col = None,
    ) -> Union[Tuple[None, None], Tuple[int, str]]:
        """Get geometry/geography and srid from collectin."""
        print('get_collection_geom', col, type(col))
        if self.collection and col and hasattr(col, '_name'):
            name = col._name
            ccol = self.collection.get_column(strip_ident(name))
            if ccol:
                return ccol.srid, ccol.type
        elif isinstance(col, Param):
            matches = re.match(r'SRID=(\d+);.*', col._value)
            print('MATCHES', matches)
            if matches:
                return int(matches.group(1)), 'geometry'
        return None, None

    @overload
    def sql(self, e: SpatialPredicate) -> CompileABC:  # type: ignore[no-redef]
        """Get buildsql for spatial predicate."""
        print('getting spatial args', e.model_dump_json())
        op = e.op.upper().replace("S_", "ST_")
        args = self.get_args(e)
        left = args[0]
        right = args[1]
        print(left, right)

        lsrid, ltyp = self.get_collection_geom_info(left)
        rsrid, rtyp = self.get_collection_geom_info(right)
        print('Types/SRIDS', lsrid, ltyp, rsrid, rtyp)

        if (
            (lsrid == rsrid and ltyp == rtyp)
            or (lsrid == 4326 and ltyp == "geometry" and rtyp is None)
            or (rsrid == 4326 and rtyp == "geometry" and ltyp is None)
        ):
            return F(op, left, right)

        if ltyp == "geography" and rtyp is None:
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

    @overload
    def sql(self, e: DateInstant) -> CompileABC:  # type: ignore[no-redef]
        """Get date instant date."""
        return self.sql(e.date)

    @overload
    def sql(self, e: TimestampInstant) -> CompileABC:  # type: ignore[no-redef]
        """Get TimestampInstant datetime."""
        return self.sql(e.timestamp)

    @overload
    def sql(self, e: date) -> CompileABC:  # type: ignore[no-redef]
        """Get date expression."""
        return P(e.isoformat()).Cast("date")

    @overload
    def sql(self, e: datetime) -> CompileABC:  # type: ignore[no-redef]
        """Get datetime expression."""
        return P(e.isoformat()).Cast("timestamptz")

    @overload
    def sql(self, e: IntervalInstance) -> Tuple[CompileABC, CompileABC]:  # type: ignore[no-redef]
        """Get Interval Expression."""
        if e.interval[0].root == "..":
            lower = P("-infinity").Cast("timestamptz")
        else:
            lower = self.sql(e.interval[0].root)

        if e.interval[1].root == "..":
            upper = P("infinity").Cast("timestamptz")
        else:
            upper = self.sql(e.interval[1].root)
        return lower, upper

    def get_temporal_args(self, arg) -> Tuple[CompileABC, CompileABC]:
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
        return None

    @overload
    def sql(self, e: TemporalPredicate) -> CompileABC:  # type: ignore[no-redef]
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

    @overload
    def sql(self, e: Array) -> CompileABC:  # type: ignore[no-redef]
        """Get Array Expression."""
        print('Getting Array Expression', e.root)
        vals = [self.sql(val) for val in e.root]
        return pgmini.array.Array(vals)

    @overload
    def sql(self, e: ArrayExpression) -> Tuple[CompileABC, CompileABC]:  # type: ignore[no-redef]
        """Get root of array expression."""
        print('getting root of array expression', e)
        tuple = e.root
        return self.sql(tuple[0]), self.sql(tuple[1])

    @overload
    def sql(self, e: ArrayPredicate) -> CompileABC:  # type: ignore[no-redef]
        """Get Array predicate expression."""
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
        return None

    @overload
    def sql(self, e: FunctionRef) -> CompileABC:  # type: ignore[no-redef]
        """Get reference to function."""
        return self.sql(e.function)

    @overload
    def sql(self, e: Function) -> CompileABC:  # type: ignore[no-redef]
        """Get Function Expression."""
        op = e.name if hasattr(e, "name") else e.op
        args = self.get_args(e)
        return F(op, *args)

    @dispatch
    def sql(self, e):  # type: ignore[no-redef]
        """Fall through."""
        pass


def cql2pgmini(
    query: str,
    collection: Optional["Collection"] = None
) -> Union[Tuple[str, List[Any]], str]:
    """Convert cql2 text into Pgmini expression."""
    print('PARSING:', query)
    cql = transform(parse(query))
    T = CQL2SQL(collection)
    return T.sql(cql)


def cql2sql(
    query: str,
    collection: Optional["Collection"] = None,
    driver: TypeLiteral["asyncpg", "psycopg", "raw"] = "asyncpg",
    table_in_column: bool = False,
) -> Union[Tuple[str, List[Any]], str]:
    """Convert cql2 text into Postgres SQL."""
    out = cql2pgmini(query, collection)

    return build(out, driver=driver, table_in_column=table_in_column)
