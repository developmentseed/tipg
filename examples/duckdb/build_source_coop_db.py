"""Create a DuckDB database with one view per Source Cooperative GeoParquet file.

The sources are listed in `source_coop_geoparquet.md` (markdown table with the
product name, title and an example file of each Source Cooperative product).

Views read the remote files directly (no data is copied), using the same form
as tipg file `sources`:

    CREATE VIEW main.<name> AS
    SELECT * FROM read_parquet('https://data.source.coop/<product>/<file>', file_row_number = true)

So the tipg DuckDB catalog reads their GeoParquet metadata (spatial extent,
geometry type, bbox covering) and uses `file_row_number` as feature id.

The remote file footers are read in parallel (`--threads`), then the views are
created sequentially from DuckDB's parquet metadata cache.

Usage:

    python build_source_coop_db.py [source_coop_geoparquet.md] [source_coop.duckdb] [--threads 16]

    TIPG_DUCKDB_DATABASE=source_coop.duckdb uvicorn main:app

"""

import argparse
import pathlib
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

import duckdb

BASE_URL = "https://data.source.coop"
HERE = pathlib.Path(__file__).parent


def quote_literal(value: str) -> str:
    """Quote a SQL string literal."""
    return "'" + value.replace("'", "''") + "'"


def quote_ident(value: str) -> str:
    """Quote a SQL identifier."""
    return '"' + value.replace('"', '""') + '"'


def parse_table(path: pathlib.Path) -> list[dict[str, str]]:
    """Parse the rows of the markdown table.

    Columns: # | Product | Title | Source Cooperative | Example file | ...
    """
    rows = []
    for line in path.read_text().splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 5 or not cells[0].isdigit():
            continue

        rows.append(
            {
                "product": cells[1].strip("`"),
                "title": cells[2],
                "file": cells[4].strip("`"),
            }
        )

    return rows


def view_name(product: str) -> str:
    """View name from the product name (e.g `fiboa/es-an` -> `fiboa_es_an`)."""
    return re.sub(r"[^0-9a-zA-Z]+", "_", product).strip("_").lower()


def create_view(
    conn: duckdb.DuckDBPyConnection, name: str, url: str, title: str
) -> list[str]:
    """Create a view reading a remote parquet file, return its column types.

    Binding the view reads the remote file (HTTP requests), which is the
    slow part. Thread safe: uses its own cursor (connection).
    """
    cursor = conn.cursor()
    try:
        view = f"CREATE OR REPLACE VIEW main.{quote_ident(name)} AS"
        try:
            cursor.execute(
                f"{view} SELECT * FROM read_parquet({quote_literal(url)}, file_row_number = true)"
            )
        except duckdb.BinderException:
            # the file already has a `file_row_number` column
            cursor.execute(f"{view} SELECT * FROM read_parquet({quote_literal(url)})")

        cursor.execute(
            f"COMMENT ON VIEW main.{quote_ident(name)} IS {quote_literal(title)}"
        )
        return [
            r[1]
            for r in cursor.execute(f"DESCRIBE main.{quote_ident(name)}").fetchall()
        ]
    finally:
        cursor.close()


def main(md_path: pathlib.Path, db_path: pathlib.Path, threads: int) -> None:
    """Create the database."""
    rows = parse_table(md_path)
    print(f"{len(rows)} sources")

    conn = duckdb.connect(str(db_path))
    conn.execute("INSTALL spatial")
    conn.execute("LOAD spatial")
    conn.execute("SET parquet_metadata_cache = true")
    # cache HTTP HEAD responses (file size, last modified) too
    conn.execute("SET enable_http_metadata_cache = true")

    sources = {
        view_name(row["product"]): (row, f"{BASE_URL}/{row['product']}/{row['file']}")
        for row in rows
    }

    created, failed, nongeo, conflicts = [], [], [], []

    def _done(name: str, types: list[str]) -> None:
        if not any(t.upper().startswith("GEOMETRY") for t in types):
            nongeo.append(name)
        created.append(name)
        print(f"ok      {name}", flush=True)

    def _failed(name: str, url: str, e: Exception) -> None:
        error = str(e).splitlines()[0]
        failed.append((name, url, error))
        print(f"FAILED  {name}: {error}", flush=True)

    # Create the views in parallel (each one in its own transaction)
    start = time.time()
    with ThreadPoolExecutor(max_workers=threads) as pool:
        futures = {
            pool.submit(create_view, conn, name, url, row["title"]): name
            for name, (row, url) in sources.items()
        }
        for future in as_completed(futures):
            name = futures[future]
            try:
                _done(name, future.result())
            except duckdb.TransactionException:
                # concurrent catalog writes conflicted: retry sequentially
                conflicts.append(name)
            except duckdb.Error as e:
                _failed(name, sources[name][1], e)

    for name in conflicts:
        row, url = sources[name]
        try:
            _done(name, create_view(conn, name, url, row["title"]))
        except duckdb.Error as e:
            _failed(name, url, e)

    conn.close()

    print(f"\ndone in {time.time() - start:.0f}s ({len(conflicts)} retried)")
    print_report(created, failed, nongeo)


def print_report(
    created: list[str], failed: list[tuple[str, str, str]], nongeo: list[str]
) -> None:
    """Print the summary."""
    print(f"\n{len(created)} views created, {len(failed)} failed")
    if nongeo:
        print(
            f"no GEOMETRY column (hidden by `only_spatial_tables`): {', '.join(nongeo)}"
        )
    for name, url, error in failed:
        print(f"  {name}: {url}\n    {error}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument(
        "sources",
        nargs="?",
        type=pathlib.Path,
        default=HERE / "source_coop_geoparquet.md",
        help="markdown table of the sources",
    )
    parser.add_argument(
        "database",
        nargs="?",
        type=pathlib.Path,
        default=HERE / "source_coop.duckdb",
        help="output DuckDB database",
    )
    parser.add_argument(
        "--threads",
        type=int,
        default=16,
        help="number of files read concurrently (default: 16)",
    )
    args = parser.parse_args()
    main(args.sources, args.database, args.threads)
