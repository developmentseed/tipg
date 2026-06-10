"""tipg.factories.utils: shared rendering helpers for the factories."""

import csv
import re
from typing import Any, Dict, Generator, Iterable, Optional

import jinja2

from starlette.requests import Request
from starlette.templating import Jinja2Templates, _TemplateResponse

# NOTE: templates live in ``tipg/templates`` (the top-level package), so the
# loader is anchored to ``tipg`` explicitly rather than to this module's
# package (``tipg.factories``).
jinja2_env = jinja2.Environment(
    loader=jinja2.ChoiceLoader([jinja2.PackageLoader("tipg", "templates")])
)
DEFAULT_TEMPLATES = Jinja2Templates(env=jinja2_env)


def create_csv_rows(data: Iterable[Dict]) -> Generator[str, None, None]:
    """Creates an iterator that returns lines of csv from an iterable of dicts."""

    class DummyWriter:
        """Dummy writer that implements write for use with csv.writer."""

        def write(self, line: str):
            """Return line."""
            return line

    # Get the first row and construct the column names
    row = next(data)  # type: ignore
    fieldnames = row.keys()
    writer = csv.DictWriter(DummyWriter(), fieldnames=fieldnames)

    # Write header
    yield writer.writerow(dict(zip(fieldnames, fieldnames)))

    # Write first row
    yield writer.writerow(row)

    # Write all remaining rows
    for row in data:
        yield writer.writerow(row)


def create_html_response(
    request: Request,
    data: Any,
    templates: Jinja2Templates,
    template_name: str,
    title: Optional[str] = None,
    router_prefix: Optional[str] = None,
    **kwargs: Any,
) -> _TemplateResponse:
    """Create Template response."""
    urlpath = request.url.path
    if root_path := request.scope.get("root_path"):
        urlpath = re.sub(r"^" + root_path, "", urlpath)

    if router_prefix:
        urlpath = re.sub(r"^" + router_prefix, "", urlpath)

    crumbs = []
    baseurl = str(request.base_url).rstrip("/")

    if router_prefix:
        baseurl += router_prefix

    crumbpath = str(baseurl)
    if urlpath == "/":
        urlpath = ""

    for crumb in urlpath.split("/"):
        crumbpath = crumbpath.rstrip("/")
        part = crumb
        if part is None or part == "":
            part = "Home"
        crumbpath += f"/{crumb}"
        crumbs.append({"url": crumbpath.rstrip("/"), "part": part.capitalize()})

    return templates.TemplateResponse(
        request,
        name=f"{template_name}.html",
        context={
            "response": data,
            "template": {
                "api_root": baseurl,
                "params": request.query_params,
                "title": title or template_name,
            },
            "crumbs": crumbs,
            "url": baseurl + urlpath,
            "params": str(request.url.query),
            **kwargs,
        },
    )
