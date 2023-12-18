"""Helpers for using pgmini."""
import re
from contextvars import copy_context
from typing import List
from typing import Literal as TypeLiteral
from typing import Optional, Tuple, Union
import attrs
from pgmini.marks import Marks

import pgmini
from pgmini.alias import extract_alias
from pgmini.utils import (
    CTX_ALIAS_ONLY,
    CTX_CTE,
    CTX_DISABLE_TABLE_IN_COLUMN,
    CTX_FORCE_CAST_BRACKETS,
    CTX_TABLES,
    CompileABC,
)
from datetime import date, datetime

def is_integer(n):
    """Check if a value is an integer."""
    try:
        float(n)
    except ValueError:
        return False
    else:
        return float(n).is_integer()


def NULL(type: Optional[str] = None):
    """Return typed NULL."""
    if type is None:
        return pgmini.literal.NULL
    return pgmini.literal.NULL.As(type)


def strip_ident(s: str) -> str:
    """Strip quotes from identifier."""
    if s.startswith('"') and s.endswith('"'):
        return s[1:-1]
    return s

def quote_ident_part(s: str) -> str:
    """Quote Identifiers."""
    s = strip_ident(s)
    s = s.strip()
    if s in ('AS','ASC','DESC'):
        return s
    if re.match(r"^[a-z][a-z_]*$", s):
        return s
    if re.match(r"^[a-zA-Z][\w\d_]*$", s):
        return f'"{s}"'
    raise TypeError(f"{s} is not a valid identifier")


def quote_ident(s: str) -> str:
    """Quote qualified identifiers."""
    outspacearr = []
    splitbyspace = s.split(" ")
    for spacesplit in splitbyspace:
        splitbycast = spacesplit.split("::")
        outsplitarr=[]
        for castsplit in splitbycast:
            splitbydot = castsplit.split(".")
            outsplitarr.append(".".join(map(quote_ident_part, splitbydot)))
        outbysplit = "::".join(outsplitarr)
        outspacearr.append(outbysplit)
    out = " ".join(outspacearr)
    return out


def F(name: str, *args):
    """Run Postgres Function."""
    if re.match(r"^[a-zA-Z_]+(\.[a-zA-Z_]+)?$", name):
        return pgmini.func._Func(x_name=name, x_params=args)
    else:
        raise TypeError(
            f"Cannot Create {name}" "Only functions that match ^[a-zA-Z_]+ allowed",
        )


def Transform(g, srid: Union[int, str] = 4326):
    """Transform geometry."""
    if is_integer(srid):
        return F("ST_Transform", g, P(srid).Cast("int"))
    else:
        return F("ST_Transform", g, P(srid).Cast("text"))


def Bbox(box, srid: int = 4326):
    """Return Bounding Box."""
    print('BBOX', box, type(box))
    box = list(box)
    #if isinstance(box, (list, tuple)):
    if len(box) == 4:
        left, bottom, right, top = box
    elif len(box) == 6:
        left = box[0]
        bottom = box[1]
        right = box[3]
        top = box[4]
    # else:
    #     left = box.left
    #     bottom = box.bottom
    #     right = box.right
    #     top = box.top

    out = F("ST_MakeEnvelope", left, bottom, right, top, srid)
    print(out)
    return out

def Count():
    """Return Count."""
    return F('count','*')

def date_param(val):
    """Make a parameter from date/time"""
    if isinstance(val, (date, datetime)):
        val = val.isoformat()
    return P(val).Cast("timestamptz")

def simplified(geom, tolerance):
    return F(
        "ST_SnapToGrid",
        F("ST_Simplify", geom, tolerance),
        tolerance,
    )

def row_num(alias: str ='row'):
    """Return Row Number."""
    return F("row_number").Over().As(alias)

class Table(pgmini.Table):
    """PgMini Table with useful functions."""

    def get(self, attr: str) -> pgmini.column.Column:
        """Get attribute via string."""
        return C(attr, self)

    def create_tipg_id(self, id_column: str):
        """Create ID column using existing primary key or row number."""
        if id_column:
            id_column_col = Column(id_column, self)
            return id_column_col.As("tipg_id")
        return row_num("tipg_id")

    def cols(self, colnames: List[str]):
        """Return pgmini columns from list of names."""
        return [self.get(c) for c in colnames]




class Column(pgmini.column.Column):
    """PGMini Column extended to ensure identifier quoting."""

    def _build(self, params: list | dict) -> str:
        out = super()._build(params)
        return quote_ident(out)

    def Desc(self):
        if self._marks:
            marks = attrs.evolve(self._marks, order_by='DESC')
        else:
            marks = Marks(order_by='DESC')
        return attrs.evolve(self, x_marks=marks)

    def Asc(self):
        if self._marks:
            marks = attrs.evolve(self._marks, order_by='ASC')
        else:
            marks = Marks(order_by='ASC')
        return attrs.evolve(self, x_marks=marks)

    def NullsFirst(self):
        if self._marks:
            marks = attrs.evolve(self._marks, order_by_nulls='FIRST')
        else:
            marks = Marks(order_by_nulls='FIRST')
        return attrs.evolve(self, x_marks=marks)

    def NullsLast(self):
        if self._marks:
            marks = attrs.evolve(self._marks, order_by_nulls='LAST')
        else:
            marks = Marks(order_by_nulls='LAST')
        return attrs.evolve(self, x_marks=marks)

class Param(pgmini.param.Param):
    """Make sure that params with a text value have
    an initial cast to text."""
    def _build(self, params: list | dict) -> str:
        if alias := extract_alias(self):
            return alias

        index = len(params) + 1
        if isinstance(params, list):
            params.append(self._value)
            res = '$%d' % index
        else:
            params[f'p{index}'] = self._value
            res = f'%(p{index})s'

        if isinstance(self._value, str):
            print('Param value is a string', self._value)
            res = f'{res}::text'

        if self._marks:
            res = self._marks.build(res)
        print(f"Built Parm {self}, {self._value}, {type(self._value)}, {res}")
        return res

P = Param


def C(name: str, table: Optional[Table] = Table("t")):
    """Return a pgmini column."""
    return Column(name, table)


def raw_query(q, *p):
    """Utility to print raw statement to use for debugging."""
    qsub = re.sub(r"\$([0-9]+)", r"{\1}", q)

    def quote_str(s):
        """Quote strings."""
        if s is None:
            return "null"
        elif isinstance(s, str):
            return f"'{s}'"
        else:
            return s

    p = [quote_str(s) for s in p]
    return qsub.format(None, *p)


def build(
    item: CompileABC,
    driver: TypeLiteral["asyncpg", "psycopg", "raw"] = "asyncpg",
    table_in_column: bool = False,
) -> Union[Tuple[str, list], str]:
    """Build a SQL Query from  CQL2 pydantic model.
    Return as raw SQL or as a tuple of sql and parameters
    ready for asyncpg or psycopg parameter binding.
    """

    def run():
        CTX_FORCE_CAST_BRACKETS.set(False)
        CTX_CTE.set(())
        CTX_TABLES.set(())
        CTX_ALIAS_ONLY.set(False)
        CTX_DISABLE_TABLE_IN_COLUMN.set(not table_in_column)

        if driver == "psycopg":
            params = {}
        else:
            params = []

        query = item._build(params)
        print(f"QUERY: {query}")
        print("PARAMS", params)
        if driver == "raw":
            return raw_query(query, *params)
        else:
            return query, params

    return copy_context().run(run)

def ensure_list(s) -> list:
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
