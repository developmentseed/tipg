
`tipg` creates endpoints using *Endpoint Factories classes* which abstract the definition of input dependency for all the endpoints.

```python
# pseudo code
class Factory:

    collections_dependency: Callable
    collection_dependency: Callable
    items_dependency: Callable
    item_dependency: Callable

    def __init__(
        self,
        collections_dependency: Callable,
        collection_dependency: Callable,
        items_dependency: Callable,
        item_dependency: Callable,
    ):
        self.collections_dependency = collections_dependency
        self.collection_dependency = collection_dependency
        self.items_dependency = items_dependency
        self.item_dependency = item_dependency

        self.router = APIRouter()

        self.register_routes()

    def register_routes(self):

        @self.router.get("/collections")
        def collections(
            request: Request,
            collection_list=Depends(self.collections_dependency),
        ):
            ...

        @self.router.get("/collections/{collectionId}")
        def collection(
            request: Request,
            collection=Depends(self.collection_dependency),
        ):
            ...

        @self.router.get("/collections/{collectionId}/items")
        def items(
            request: Request,
            collection=Depends(self.collection_dependency),
            item_list=Depends(self.items_dependency),
        ):
            ...

        @self.router.get("/collections/{collectionId}/items/{itemId}")
        def item(
            request: Request,
            collection=Depends(self.collection_dependency),
            feature=Depends(self.item_dependency)
        ):
            ...



# Create FastAPI Application
app = FastAPI()

# Create a Factory instance
endpoints = Factory(collection_dependency=lambda: ["collection1", "collection2"])

# Register the factory router (with the registered endpoints) to the application
app.include_router(endpoints.router)
```

## OGC Features API Factory

```python
from tipg.factory import OGCFeaturesFactory

app = FastAPI()
endpoints = OGCFeaturesFactory(with_common=True)
app.include_router(endpoints.router, tags=["OGC Features API"])
```

#### Creation Options

- **collections_dependency** (Callable[..., tipg.collections.CollectionList]): Callable which return a CollectionList dictionary

- **collection_dependency** (Callable[..., tipg.collections.Collection]): Callable which return a Collection instance

- **items_dependency** (Callable[..., tipg.collections.ItemList]): Callable which return a ItemList dictionary

- **item_dependency** (Callable[..., tipg.collections.Feature]): Callable which return a Feature dictionary

- **with_common** (bool, optional): Create Full OGC Features API set of endpoints with OGC Common endpoints (landing `/` and conformance `/conformance`). Defaults to `True`

- **router** (fastapi.APIRouter, optional): FastAPI

- **router_prefix** (str, optional): *prefix* for the whole set of endpoints

- **templates** (starlette.templating.Jinja2Templates, optional): Templates to be used in endpoint's responses

- **title** (str, optional): Title of for the endpoints (only used if `with_common=True`)

#### Endpoints

| Method | Path                                                            | Output                                            | Description
| ------ | --------------------------------------------------------------- |-------------------------------------------------- |--------------
| `GET`  | `/collections`                                                  | HTML / JSON                                       | list of available collections
| `GET`  | `/collections/{collectionId}`                                   | HTML / JSON                                       | collection's metadata
| `GET`  | `/collections/{collectionId}/queryables`                        | HTML / SchemaJSON                                 | available queryable for a collection
| `GET`  | `/collections/{collectionId}/items`                             | HTML / JSON / NDJSON / GeoJSON/ GeoJSONSeq / CSV  | a set of items for a collection
| `GET`  | `/collections/{collectionId}/items/{itemId}`                    | HTML / JSON/GeoJSON                               | one collection's item
| `GET`  | `/conformance`                                                  | HTML / JSON                                       | conformance class landing Page
| `GET`  | `/`                                                             | HTML / JSON                                       | landing page


## OGC Tiles API Factory

```python
from tipg.factory import OGCTilesFactory

app = FastAPI()
endpoints = OGCTilesFactory(with_common=True)
app.include_router(endpoints.router, tags=["OGC Tiles API"])
```

#### Creation Options

- **collection_dependency** (Callable[..., tipg.collections.Collection]): Callable which return a Collection instance

- **supported_tms** (morecantile.TileMatrixSets): morecantile TileMatrixSets instance (holds a set of TileMatrixSet documents)

- **with_viewer** (bool, optional): add `/viewer` endpoint to visualize the Vector tile. Defaults to `True`

- **with_common** (bool, optional): Create Full OGC Features API set of endpoints with OGC Common endpoints (landing `/` and conformance `/conformance`). Defaults to `True`

- **router** (fastapi.APIRouter, optional): FastAPI

- **router_prefix** (str, optional): *prefix* for the whole set of endpoints

- **templates** (starlette.templating.Jinja2Templates, optional): Templates to be used in endpoint's responses

- **title** (str, optional): Title of for the endpoints (only used if `with_common=True`)

#### Endpoints

| Method | Path                                                                                     | Output                        | Description
| ------ | ---------------------------------------------------------------------------------------- |------------------------------ |--------------
| `GET`  | `/collections/{collectionId}/tiles[/{TileMatrixSetId}]/{z}/{x}/{y}`                      | Mapbox Vector Tile (Protobuf) | create a web map vector tile from collection's items
| `GET`  | `/collections/{collectionId}/tiles`                                                      | JSON                          | list of available vector tilesets
| `GET`  | `/collections/{collectionId}/tiles/{TileMatrixSetId}]`                                   | JSON                          | vector tileset metadata
| `GET`  | `/tileMatrixSets`                                                                        | JSON                          | list of available TileMatrixSets
| `GET`  | `/tileMatrixSets/{tileMatrixSetId}`                                                      | JSON                          | TileMatrixSet document
| `GET`  | `/collections/{collectionId}[/{TileMatrixSetId}]/tilejson.json`                          | JSON                          | Mapbox TileJSON document
| `GET`  | `/collections/{collectionId}[/{TileMatrixSetId}]/style.json`                             | JSON                          | Mapbox/Maplibre StyleJSON document
| `GET`  | `/collections/{collectionId}[/{TileMatrixSetId}]/viewer`                                 | HTML                          | simple map viewer **[OPTIONAL]**
| `GET`  | `/conformance`                                                                           | HTML / JSON                   | conformance class landing Page
| `GET`  | `/`                                                                                      | HTML / JSON                   | landing page

## OGC Features + Tiles API Factory

```python
from tipg.factory import Endpoints

app = FastAPI()
endpoints = Endpoints()
app.include_router(endpoints.router)
```

#### Creation Options

- **collections_dependency** (Callable[..., tipg.collections.CollectionList]): Callable which return a CollectionList dictionary

- **collection_dependency** (Callable[..., tipg.collections.Collection]): Callable which return a Collection instance

- **items_dependency** (Callable[..., tipg.collections.ItemList]): Callable which return a ItemList dictionary

- **item_dependency** (Callable[..., tipg.collections.Feature]): Callable which return a Feature dictionary

- **supported_tms** (morecantile.TileMatrixSets): morecantile TileMatrixSets instance (holds a set of TileMatrixSet documents)

- **with_tiles_viewer** (bool, optional): add `/viewer` endpoint to visualize the Vector tile. Defaults to `True`

- **with_common** (bool, optional): Create Full OGC Features API set of endpoints with OGC Common endpoints (landing `/` and conformance `/conformance`). Defaults to `True`

- **router** (fastapi.APIRouter, optional): FastAPI

- **router_prefix** (str, optional): *prefix* for the whole set of endpoints

- **templates** (starlette.templating.Jinja2Templates, optional): Templates to be used in endpoint's responses

- **title** (str, optional): Title of for the endpoints (only used if `with_common=True`)

#### Endpoints

| Method | Path                                                                                     | Output                        | Description
| ------ | ---------------------------------------------------------------------------------------- |------------------------------ |--------------
| `GET`  | `/collections`                                                                           | HTML / JSON                                       | list of available collections
| `GET`  | `/collections/{collectionId}`                                                            | HTML / JSON                                       | collection's metadata
| `GET`  | `/collections/{collectionId}/queryables`                                                 | HTML / SchemaJSON                                 | available queryable for a collection
| `GET`  | `/collections/{collectionId}/items`                                                      | HTML / JSON / NDJSON / GeoJSON/ GeoJSONSeq / CSV  | a set of items for a collection
| `GET`  | `/collections/{collectionId}/items/{itemId}`                                             | HTML / JSON/GeoJSON                               | one collection's item
| `GET`  | `/collections/{collectionId}/tiles[/{TileMatrixSetId}]/{z}/{x}/{y}`                      | Mapbox Vector Tile (Protobuf) | create a web map vector tile from collection's items
| `GET`  | `/collections/{collectionId}/tiles`                                                      | JSON                          | list of available vector tilesets
| `GET`  | `/collections/{collectionId}/tiles/{TileMatrixSetId}]`                                   | JSON                          | vector tileset metadata
| `GET`  | `/tileMatrixSets`                                                                        | JSON                          | list of available TileMatrixSets
| `GET`  | `/tileMatrixSets/{tileMatrixSetId}`                                                      | JSON                          | TileMatrixSet document
| `GET`  | `/collections/{collectionId}[/{TileMatrixSetId}]/tilejson.json`                          | JSON                          | Mapbox TileJSON document
| `GET`  | `/collections/{collectionId}[/{TileMatrixSetId}]/style.json`                             | JSON                          | Mapbox/Maplibre StyleJSON document
| `GET`  | `/collections/{collectionId}[/{TileMatrixSetId}]/viewer`                                 | HTML                          | simple map viewer
| `GET`  | `/conformance`                                                                           | HTML / JSON                   | conformance class landing Page
| `GET`  | `/`                                                                                      | HTML / JSON                   | landing page
