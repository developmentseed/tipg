"""Helpers for using pgmini."""
import pgmini
from typing import List, Optional, Union, Tuple, Any
import re
from pgmini import Param as P
from pgmini import Literal as L
from pgmini import build


def is_integer(n):
    """
    Check if a value is an integer.

    Args:
        n: The value to check.

    Returns:
        True if the value is an integer, False otherwise.
    """
    try:
        float(n)
    except ValueError:
        return False
    else:
        return float(n).is_integer()


def NULL(type: Optional[str] = None):
    """
    Return typed null.

    Args:
        type (Optional[str]): The type of the null value. Defaults to None.

    Returns:
        pgmini.literal.NULL: The typed null value.
    """
    if type is None:
        return pgmini.literal.NULL
    return pgmini.literal.NULL.As(type)


def quote_ident_part(s: str) -> str:
    """Quote Identifiers."""
    print('quoting', s)
    s = strip_ident(s)
    print(s, type(s))
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
    print('createing function', name, args)
    if re.match(r"^[a-zA-Z_]+$", name):
        return pgmini.func._Func(x_name=name, x_params=args)
    else:
        raise TypeError(
            f"Cannot Create {name}"
            "Only functions that match ^[a-zA-Z_]+ allowed"
        )


def Transform(g, srid: Union[int, str] = 4326):
    """Transform geometry."""
    if is_integer(srid):
        return F("ST_Transform", g, P(srid).Cast("int"))
    else:
        return F("ST_Transform", g, P(srid).Cast("text"))


def Bbox(box, srid: int = 4326):
    """
    Return a bounding box (bbox) as a geometry object.

    Args:
        box (list or object): The bounding box coordinates. If a list is provided,
            it should contain either 4 or 6 elements representing the left, bottom,
            right, top coordinates of the bbox. If an object is provided, it should
            have attributes `left`, `bottom`, `right`, and `top` representing the
            bbox coordinates.
        srid (int, optional): The spatial reference identifier (SRID) of the bbox.
            Defaults to 4326, which corresponds to WGS84 coordinate system.

    Returns:
        F: A geometry object representing the bbox.

    """
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
        """
        Return an id column using existing pkey if available.

        Args:
            id_column (str): The name of the id column.

        Returns:
            The id column as an alias "tipg_id" if available, otherwise the row number as an alias "tipg_id".
        """
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
