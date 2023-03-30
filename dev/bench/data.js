window.BENCHMARK_DATA = {
  "lastUpdate": 1680215770372,
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
      },
      {
        "commit": {
          "author": {
            "email": "vincent.sarago@gmail.com",
            "name": "Vincent Sarago",
            "username": "vincentsarago"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e10b29a17ba2ac2727d0b34739eaf5ab95668b5e",
          "message": "Merge pull request #48 from developmentseed/schemasFiltering\n\nupdate search_path with user schemas",
          "timestamp": "2023-03-31T00:30:58+02:00",
          "tree_id": "0a732e64d35d924a0b0b07950fbba7c90c6935f5",
          "url": "https://github.com/developmentseed/tipg/commit/e10b29a17ba2ac2727d0b34739eaf5ab95668b5e"
        },
        "date": 1680215769550,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 149.83142993003838,
            "unit": "iter/sec",
            "range": "stddev: 0.00044738546708013267",
            "extra": "mean: 6.674167098765163 msec\nrounds: 81"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 124.82275726884693,
            "unit": "iter/sec",
            "range": "stddev: 0.000766476208559317",
            "extra": "mean: 8.011359642105731 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 70.00187773511385,
            "unit": "iter/sec",
            "range": "stddev: 0.0004860512090228835",
            "extra": "mean: 14.285331084745847 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 42.38387157250966,
            "unit": "iter/sec",
            "range": "stddev: 0.009073785748169244",
            "extra": "mean: 23.59388047619047 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.095457619086297,
            "unit": "iter/sec",
            "range": "stddev: 0.011571439008796376",
            "extra": "mean: 39.847848769231135 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 19.921435058674724,
            "unit": "iter/sec",
            "range": "stddev: 0.016338656284690202",
            "extra": "mean: 50.197186952380385 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 152.48096537224566,
            "unit": "iter/sec",
            "range": "stddev: 0.0003628161621071373",
            "extra": "mean: 6.55819562499975 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 121.30087542756948,
            "unit": "iter/sec",
            "range": "stddev: 0.0004266193185467915",
            "extra": "mean: 8.243963586207707 msec\nrounds: 87"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 63.168496878747774,
            "unit": "iter/sec",
            "range": "stddev: 0.0019235369584782716",
            "extra": "mean: 15.830675881357518 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 42.427949510669734,
            "unit": "iter/sec",
            "range": "stddev: 0.0009093950720202503",
            "extra": "mean: 23.56936904878048 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 24.114444452553407,
            "unit": "iter/sec",
            "range": "stddev: 0.0008873628165103074",
            "extra": "mean: 41.46892133333443 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.12755455274277,
            "unit": "iter/sec",
            "range": "stddev: 0.001665647873733915",
            "extra": "mean: 49.68313449999968 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 136.17174525198425,
            "unit": "iter/sec",
            "range": "stddev: 0.000916228555298157",
            "extra": "mean: 7.343667352941034 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 107.96389010288549,
            "unit": "iter/sec",
            "range": "stddev: 0.000743550347766999",
            "extra": "mean: 9.262356136362243 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 53.898783192080835,
            "unit": "iter/sec",
            "range": "stddev: 0.007928134139689893",
            "extra": "mean: 18.553294541664656 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 30.85763514046069,
            "unit": "iter/sec",
            "range": "stddev: 0.015490355642510672",
            "extra": "mean: 32.40689039999681 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 17.782572099719303,
            "unit": "iter/sec",
            "range": "stddev: 0.02250756712241557",
            "extra": "mean: 56.23483455555819 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.28444234615114,
            "unit": "iter/sec",
            "range": "stddev: 0.025795424054172705",
            "extra": "mean: 70.0062330588246 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.9632175925901034,
            "unit": "iter/sec",
            "range": "stddev: 0.034615213186040765",
            "extra": "mean: 509.36788860000206 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 44.117489787657554,
            "unit": "iter/sec",
            "range": "stddev: 0.0194095904477744",
            "extra": "mean: 22.666747469384877 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.770830223919836,
            "unit": "iter/sec",
            "range": "stddev: 0.06457455021399412",
            "extra": "mean: 1.2973025303999974 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.606066160957,
            "unit": "iter/sec",
            "range": "stddev: 0.03907021078847613",
            "extra": "mean: 60.21895795833506 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.393172213716156,
            "unit": "iter/sec",
            "range": "stddev: 0.007173330847099153",
            "extra": "mean: 119.14446344444072 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.199726437400254,
            "unit": "iter/sec",
            "range": "stddev: 0.009031888497934699",
            "extra": "mean: 192.31780980000508 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 175.9908327301773,
            "unit": "iter/sec",
            "range": "stddev: 0.0001625491598611007",
            "extra": "mean: 5.682114144735955 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 107.69407670386259,
            "unit": "iter/sec",
            "range": "stddev: 0.0005135007886483872",
            "extra": "mean: 9.285561756101055 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 230.9563428421142,
            "unit": "iter/sec",
            "range": "stddev: 0.00009497178191421679",
            "extra": "mean: 4.329822630953321 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 166.70474541287683,
            "unit": "iter/sec",
            "range": "stddev: 0.0007353257339825508",
            "extra": "mean: 5.998629478262931 msec\nrounds: 46"
          }
        ]
      }
    ]
  }
}