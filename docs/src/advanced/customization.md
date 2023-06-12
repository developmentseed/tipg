
`Tipg` is designed to be fully customizable, in respect to the OGC standard. This page aims to show some example of customizations.


### HTML Templates

The default `HTML` responses are generated using [Jinja](https://jinja.palletsprojects.com) HTML [templates](https://github.com/developmentseed/tipg/tree/main/tipg/templates).

You can override part or a complete list of templates and then provide `TIPG_TEMPLATE_DIRECTORY` environment to tell the `tipg` application to first look in the provided directory for HTML templates.

When building custom `tipg` application you can set the `templates` attribute of the `Endpoints` Factory.

```python
from fastapi import FastAPI
import jinja2

from tipg.factory import Endpoints

app = FastAPI(openapi_url="/api", docs_url="/api.html")

templates_location = (
    [
        jinja2.FileSystemLoader("{PATH TO YOUR CUSTOM TEMPLATE DIRECTORY}"),
        jinja2.PackageLoader("tipg", "templates"),  # Fallback to default's tipg templates
    ]
)

templates = Jinja2Templates(
    directory="",
    loader=jinja2.ChoiceLoader(templates_location),
)  # type: ignore

ogc_api = Endpoints(templates=templates)
app.include_router(ogc_api.router)
```

Example:

In [`eoAPI`](https://github.com/developmentseed/eoAPI), we use a custom logo by overriding the `header.html` : https://github.com/developmentseed/eoAPI/blob/8a3b3de4e82499994fec022229ac3be70bbc1388/runtime/eoapi/vector/eoapi/vector/templates/header.html

![](https://github.com/developmentseed/tipg/assets/10407788/8c79e668-252b-464c-a50b-8efe7a99d931)
