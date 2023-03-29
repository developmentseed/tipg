window.BENCHMARK_DATA = {
  "lastUpdate": 1680091807437,
  "repoUrl": "https://github.com/developmentseed/tipg",
  "entries": {
    "TiPg Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "vincent.sarago@gmail.com",
            "name": "vincentsarago",
            "username": "vincentsarago"
          },
          "committer": {
            "email": "vincent.sarago@gmail.com",
            "name": "vincentsarago",
            "username": "vincentsarago"
          },
          "distinct": true,
          "id": "e29f717adab8ea1a2808f55553b11daddf20237b",
          "message": "fix workflows",
          "timestamp": "2023-03-29T14:05:05+02:00",
          "tree_id": "5661b8154a9a1b7ee1e4ea19168b173ffe37db22",
          "url": "https://github.com/developmentseed/tipg/commit/e29f717adab8ea1a2808f55553b11daddf20237b"
        },
        "date": 1680091806353,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 118.0082018689884,
            "unit": "iter/sec",
            "range": "stddev: 0.0010250192973965593",
            "extra": "mean: 8.47398726666635 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 99.321289355085,
            "unit": "iter/sec",
            "range": "stddev: 0.0008704120139991101",
            "extra": "mean: 10.068334860463656 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 55.41061239705176,
            "unit": "iter/sec",
            "range": "stddev: 0.0009701688719146955",
            "extra": "mean: 18.047084425531583 msec\nrounds: 47"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 37.08427374115463,
            "unit": "iter/sec",
            "range": "stddev: 0.001463309792512347",
            "extra": "mean: 26.965608305556227 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 22.35447412269926,
            "unit": "iter/sec",
            "range": "stddev: 0.0013184864647363675",
            "extra": "mean: 44.73377429999914 msec\nrounds: 10"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 17.606921920788206,
            "unit": "iter/sec",
            "range": "stddev: 0.012683114002412151",
            "extra": "mean: 56.79584452631191 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 106.23500645527308,
            "unit": "iter/sec",
            "range": "stddev: 0.005594117188969441",
            "extra": "mean: 9.413093041237953 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 97.40765065037978,
            "unit": "iter/sec",
            "range": "stddev: 0.0006186203580288776",
            "extra": "mean: 10.266134059523187 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 49.57553734769715,
            "unit": "iter/sec",
            "range": "stddev: 0.0020029385014040343",
            "extra": "mean: 20.17123875000119 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 34.91656373936137,
            "unit": "iter/sec",
            "range": "stddev: 0.0005719925676814658",
            "extra": "mean: 28.639702562503366 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 19.587810414690843,
            "unit": "iter/sec",
            "range": "stddev: 0.0026080067610396653",
            "extra": "mean: 51.0521584000017 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 16.861845855215854,
            "unit": "iter/sec",
            "range": "stddev: 0.0006369571044138304",
            "extra": "mean: 59.30548817647217 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 105.88406083327453,
            "unit": "iter/sec",
            "range": "stddev: 0.0008543003842752834",
            "extra": "mean: 9.444292107143529 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 81.72262538956745,
            "unit": "iter/sec",
            "range": "stddev: 0.0017770881034579074",
            "extra": "mean: 12.236513391891814 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 42.288968261118754,
            "unit": "iter/sec",
            "range": "stddev: 0.01030246349643128",
            "extra": "mean: 23.646828975002876 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 27.45939602608689,
            "unit": "iter/sec",
            "range": "stddev: 0.013479746522896812",
            "extra": "mean: 36.417406961536344 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 15.00832116355775,
            "unit": "iter/sec",
            "range": "stddev: 0.02481847127512793",
            "extra": "mean: 66.62970422222416 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 11.867857614723183,
            "unit": "iter/sec",
            "range": "stddev: 0.029992760279428123",
            "extra": "mean: 84.26120639999985 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.8270173271253698,
            "unit": "iter/sec",
            "range": "stddev: 0.033718231008324565",
            "extra": "mean: 547.3401840000065 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 40.02092627532212,
            "unit": "iter/sec",
            "range": "stddev: 0.01904599494907731",
            "extra": "mean: 24.986927916674045 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7271371057846017,
            "unit": "iter/sec",
            "range": "stddev: 0.07244467737993869",
            "extra": "mean: 1.3752564572000097 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 15.044669612123265,
            "unit": "iter/sec",
            "range": "stddev: 0.03757916631719832",
            "extra": "mean: 66.46872452381288 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.321588753898889,
            "unit": "iter/sec",
            "range": "stddev: 0.009345790360679692",
            "extra": "mean: 136.58237762500391 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.566001281411692,
            "unit": "iter/sec",
            "range": "stddev: 0.011852401165121212",
            "extra": "mean: 219.0100130000019 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 140.43875073797872,
            "unit": "iter/sec",
            "range": "stddev: 0.0009937536067928048",
            "extra": "mean: 7.120541835819471 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 85.51049022870147,
            "unit": "iter/sec",
            "range": "stddev: 0.00096071904198087",
            "extra": "mean: 11.694471606062102 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 177.1214555823443,
            "unit": "iter/sec",
            "range": "stddev: 0.0013451801928652677",
            "extra": "mean: 5.645843394365607 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 139.53942786361188,
            "unit": "iter/sec",
            "range": "stddev: 0.00027722906303661606",
            "extra": "mean: 7.166433282049976 msec\nrounds: 39"
          }
        ]
      }
    ]
  }
}