"""Helpers for using pgmini."""
import re
from contextvars import copy_context
from typing import List
from typing import Literal as TypeLiteral
from typing import Optional, Tuple, Union

import pgmini
from pgmini import Param as P
from pgmini.utils import (
    CTX_ALIAS_ONLY,
    CTX_CTE,
    CTX_DISABLE_TABLE_IN_COLUMN,
    CTX_FORCE_CAST_BRACKETS,
    CTX_TABLES,
    CompileABC,
)


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


def quote_ident_part(s: str) -> str:
    """Quote Identifiers."""
    s = strip_ident(s)
    if re.match(r"^[a-z]+$", s):
        return s
    if re.match(r"^[a-zA-Z][\w\d_]*$", s):
        return f'"{s}"'
    raise TypeError(f"{s} is not a valid identifier")


def quote_ident(s: str) -> str:
    """Quote qualified identifiers."""
    return ".".join(map(quote_ident_part, s.split(".")))


def strip_ident(s: str) -> str:
    """Strip quotes from identifier."""
    if s.startswith('"') and s.endswith('"'):
        return s[1:-1]
    return s


def F(name: str, *args):
    """Run Postgres Function."""
    if re.match(r"^[a-zA-Z_]+$", name):
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
    if isinstance(box, list):
        if len(list) == 4:
            left, bottom, right, top = box
        elif len(list) == 6:
            left = box[0]
            bottom = box[1]
            right = box[3]
            top = box[4]
    else:
        left = box.left
        bottom = box.bottom
        right = box.right
        top = box.top

    return F("ST_MakeEnvelope", left, bottom, right, top, srid)


def Count():
    """Return Count."""
    return F.count("*")


class Table(pgmini.Table):
    """PgMini Table with useful functions."""

    def get(self, attr: str) -> pgmini.column.Column:
        """Get attribute via string."""
        return self.__getattribute__(quote_ident_part(attr))

    def row_num(self):
        """Return Row Number."""
        return F("row_number").Over()

    def tipg_id(self, id_column: str):
        """Create ID column using existing primary key or row number."""
        if id_column:
            return self.get(id_column).As("tipg_id")
        return self.row_num().As("tipg_id")

    def cols(self, colnames: List[str]):
        """Return pgmini columns from list of names."""
        return [self.get(c) for c in colnames]


class Column(pgmini.column.Column):
    """PGMini Column extended to ensure identifier quoting."""

    def _build(self, params: list | dict) -> str:
        out = super()._build(params)
        return quote_ident(out)


def C(name: str, table: Optional[Table] = Table("t")):
    """Return a pgmini column."""
    return table.get(name)


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
        if driver == "raw":
            return raw_query(query, *params)
        else:
            return query, params

    return copy_context().run(run)
