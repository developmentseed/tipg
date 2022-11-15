"""test tifeature.geojson."""

import re

import pytest
from shapely.geometry import shape

from tifeatures.geojson import geojson_to_wkt


def assert_wkt_equivalence(geom):
    """Assert WKT equivalence with Shapely."""
    clean_wkt = re.sub(r"\.0(\D)", r"\1", geojson_to_wkt(geom))
    assert shape(geom).wkt == clean_wkt


@pytest.mark.parametrize("coordinates", [(1.01, 2.01), (1.0, 2.0, 3.0), (1.0, 2.0)])
def test_point(coordinates):
    """Two or three number elements as coordinates should be okay."""
    p = {"type": "Point", "coordinates": coordinates}
    assert_wkt_equivalence(p)


@pytest.mark.parametrize(
    "coordinates",
    [
        [(1.0, 2.0)],
        [(1.0, 2.0), (1.0, 2.0)],
        [(1.0, 2.0, 3.0), (1.0, 2.0, 3.0)],
        [(1.0, 2.0), (1.0, 2.0)],
    ],
)
def test_multi_point_valid_coordinates(coordinates):
    """Two or three number elements as coordinates should be okay."""
    p = {"type": "MultiPoint", "coordinates": coordinates}
    assert_wkt_equivalence(p)


@pytest.mark.parametrize(
    "coordinates",
    [
        [(1.0, 2.0), (3.0, 4.0)],
        [(0.0, 0.0, 0.0), (1.0, 1.0, 1.0)],
        [(1.0, 2.0), (3.0, 4.0), (5.0, 6.0)],
    ],
)
def test_line_string_valid_coordinates(coordinates):
    """A list of two coordinates or more should be okay."""
    linestring = {"type": "LineString", "coordinates": coordinates}
    assert_wkt_equivalence(linestring)


@pytest.mark.parametrize(
    "coordinates",
    [
        [[(1.0, 2.0), (3.0, 4.0)]],
        [[(0.0, 0.0, 0.0), (1.0, 1.0, 1.0)]],
        [[(1.0, 2.0), (3.0, 4.0), (5.0, 6.0)]],
    ],
)
def test_multi_line_string_valid_coordinates(coordinates):
    """A list of two coordinates or more should be okay."""
    multilinestring = {"type": "MultiLineString", "coordinates": coordinates}
    assert_wkt_equivalence(multilinestring)


@pytest.mark.parametrize(
    "coordinates",
    [
        [[(1.0, 2.0), (3.0, 4.0), (5.0, 6.0), (1.0, 2.0)]],
        [[(0.0, 0.0, 0.0), (1.0, 1.0, 0.0), (1.0, 0.0, 0.0), (0.0, 0.0, 0.0)]],
    ],
)
def test_polygon_valid_coordinates(coordinates):
    """Should accept lists of linear rings."""
    polygon = {"type": "Polygon", "coordinates": coordinates}
    assert_wkt_equivalence(polygon)


def test_polygon_with_holes():
    """Check interior and exterior rings."""
    polygon = {
        "type": "Polygon",
        "coordinates": [
            [(0.0, 0.0), (0.0, 10.0), (10.0, 10.0), (10.0, 0.0), (0.0, 0.0)],
            [(2.0, 2.0), (2.0, 4.0), (4.0, 4.0), (4.0, 2.0), (2.0, 2.0)],
        ],
    }
    assert_wkt_equivalence(polygon)


def test_multi_polygon():
    """Should accept sequence of polygons."""
    multi_polygon = {
        "type": "MultiPolygon",
        "coordinates": [
            [
                [
                    (0.0, 0.0, 4.0),
                    (1.0, 0.0, 4.0),
                    (1.0, 1.0, 4.0),
                    (0.0, 1.0, 4.0),
                    (0.0, 0.0, 4.0),
                ],
                [
                    (2.1, 2.1, 4.0),
                    (2.2, 2.1, 4.0),
                    (2.2, 2.2, 4.0),
                    (2.1, 2.2, 4.0),
                    (2.1, 2.1, 4.0),
                ],
            ]
        ],
    }
    assert_wkt_equivalence(multi_polygon)


@pytest.mark.parametrize(
    "coordinates", [[[(1.0, 2.0), (3.0, 4.0), (5.0, 6.0), (1.0, 2.0)]]]
)
def test_geometry_collection_iteration(coordinates):
    """test if geometry collection is iterable"""
    polygon = {"type": "Polygon", "coordinates": coordinates}
    gc = {"type": "GeometryCollection", "geometries": [polygon, polygon]}
    assert_wkt_equivalence(gc)
