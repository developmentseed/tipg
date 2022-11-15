"""Geojson To WKT."""

from typing import Dict


def _point_wkt_coordinates(geom: Dict) -> str:
    assert geom["type"].lower() == "point"

    return " ".join(str(coordinate) for coordinate in geom["coordinates"])


def _multipoint_wkt_coordinates(geom: Dict):
    assert geom["type"].lower() == "multipoint"

    points = [{"type": "Point", "coordinates": p} for p in geom["coordinates"]]
    return ", ".join(_point_wkt_coordinates(point) for point in points)


def _linestring_wkt_coordinates(geom: Dict):
    assert geom["type"].lower() == "linestring"

    points = [{"type": "Point", "coordinates": p} for p in geom["coordinates"]]
    return ", ".join(_point_wkt_coordinates(point) for point in points)


def _multilinestring_wkt_coordinates(geom: Dict):
    assert geom["type"].lower() == "multilinestring"

    lines = [
        {"type": "LineString", "coordinates": line} for line in geom["coordinates"]
    ]
    return ",".join(f"({_linestring_wkt_coordinates(line)})" for line in lines)


def _linearring_wkt_coordinates(geom: Dict):
    assert geom["type"].lower() == "linearring"

    points = [{"type": "Point", "coordinates": p} for p in geom["coordinates"]]
    return ", ".join(_point_wkt_coordinates(point) for point in points)


def _polygon_wkt_coordinates(geom: Dict):
    assert geom["type"].lower() == "polygon"

    exterior = {"type": "LinearRing", "coordinates": geom["coordinates"][0]}
    interiors = (
        [
            {"type": "LinearRing", "coordinates": interior}
            for interior in geom["coordinates"][1:]
        ]
        if len(geom["coordinates"]) > 1
        else []
    )
    ic = "".join(
        f", ({_linearring_wkt_coordinates(interior)})" for interior in interiors
    )
    return f"({_linearring_wkt_coordinates(exterior)}){ic}"


def _multipolygon_wkt_coordinates(geom: Dict):
    assert geom["type"].lower() == "multipolygon"

    polygons = [
        {"type": "Polygon", "coordinates": poly} for poly in geom["coordinates"]
    ]
    return ",".join(f"({_polygon_wkt_coordinates(poly)})" for poly in polygons)


def geojson_to_wkt(geom: Dict) -> str:
    """Geojson to WKT."""
    geom_type = geom["type"]

    if geom_type == "Point":
        wkt_type = "POINT"
        wkt_inset = " Z " if len(geom["coordinates"]) == 3 else " "
        return f"{wkt_type}{wkt_inset}({_point_wkt_coordinates(geom)})"

    elif geom_type == "MultiPoint":
        wkt_type = "MULTIPOINT"
        wkt_inset = " Z " if len(geom["coordinates"][0]) == 3 else " "
        return f"{wkt_type}{wkt_inset}({_multipoint_wkt_coordinates(geom)})"

    elif geom_type == "LineString":
        wkt_type = "LINESTRING"
        wkt_inset = " Z " if len(geom["coordinates"][0]) == 3 else " "
        return f"{wkt_type}{wkt_inset}({_linestring_wkt_coordinates(geom)})"

    elif geom_type == "MultiLineString":
        wkt_type = "MULTILINESTRING"
        wkt_inset = " Z " if len(geom["coordinates"][0][0]) == 3 else " "
        return f"{wkt_type}{wkt_inset}({_multilinestring_wkt_coordinates(geom)})"

    elif geom_type == "Polygon":
        wkt_type = "POLYGON"
        wkt_inset = " Z " if len(geom["coordinates"][0][0]) == 3 else " "
        return f"{wkt_type}{wkt_inset}({_polygon_wkt_coordinates(geom)})"

    elif geom_type == "MultiPolygon":
        wkt_type = "MULTIPOLYGON"
        wkt_inset = " Z " if len(geom["coordinates"][0][0][0]) == 3 else " "
        return f"{wkt_type}{wkt_inset}({_multipolygon_wkt_coordinates(geom)})"

    elif geom_type == "GeometryCollection":
        wkt_type = "GEOMETRYCOLLECTION"
        wkt_coordinates = ", ".join(geojson_to_wkt(g) for g in geom["geometries"])
        return f"{wkt_type} ({wkt_coordinates})"

    raise ValueError(f"Unknown geometry type: {geom_type}")
