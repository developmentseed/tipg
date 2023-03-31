window.BENCHMARK_DATA = {
  "lastUpdate": 1680267080016,
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
      },
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
          "id": "6eacd39192dcca67849950d508df0ff3f888df0f",
          "message": "lower case debug",
          "timestamp": "2023-03-31T14:10:45+02:00",
          "tree_id": "7d63bf15388ba16474e5d0a4a6cad16b71d7eeff",
          "url": "https://github.com/developmentseed/tipg/commit/6eacd39192dcca67849950d508df0ff3f888df0f"
        },
        "date": 1680264965026,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 135.36916053055117,
            "unit": "iter/sec",
            "range": "stddev: 0.0003241743907024866",
            "extra": "mean: 7.387206924241155 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 108.79633395963114,
            "unit": "iter/sec",
            "range": "stddev: 0.0005300079369315051",
            "extra": "mean: 9.191486179773758 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 59.25493746408831,
            "unit": "iter/sec",
            "range": "stddev: 0.0014252235739865694",
            "extra": "mean: 16.876230788464746 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 39.25841429804153,
            "unit": "iter/sec",
            "range": "stddev: 0.006215509226927669",
            "extra": "mean: 25.472246342101663 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 22.192509839388887,
            "unit": "iter/sec",
            "range": "stddev: 0.007560406457735884",
            "extra": "mean: 45.06024813043575 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 18.845363428122113,
            "unit": "iter/sec",
            "range": "stddev: 0.008206210972177294",
            "extra": "mean: 53.06345000000073 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 127.20497096670728,
            "unit": "iter/sec",
            "range": "stddev: 0.0015409633385021436",
            "extra": "mean: 7.861328000001864 msec\nrounds: 105"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 96.69782420624149,
            "unit": "iter/sec",
            "range": "stddev: 0.0007682395401439497",
            "extra": "mean: 10.341494322221301 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 53.50306396493633,
            "unit": "iter/sec",
            "range": "stddev: 0.0008338743489624221",
            "extra": "mean: 18.69051837209469 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 31.467008660605657,
            "unit": "iter/sec",
            "range": "stddev: 0.001989317833334391",
            "extra": "mean: 31.779315625000137 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 17.940233851125544,
            "unit": "iter/sec",
            "range": "stddev: 0.004367872893699313",
            "extra": "mean: 55.740633500006545 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 13.790419940343334,
            "unit": "iter/sec",
            "range": "stddev: 0.004925856229518223",
            "extra": "mean: 72.5141079333298 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 115.90752668440452,
            "unit": "iter/sec",
            "range": "stddev: 0.0007341822994150458",
            "extra": "mean: 8.627567411759388 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 89.38160275865773,
            "unit": "iter/sec",
            "range": "stddev: 0.0014065400276655423",
            "extra": "mean: 11.187984653845753 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 43.52755253346471,
            "unit": "iter/sec",
            "range": "stddev: 0.008822019699804808",
            "extra": "mean: 22.973954238092833 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 26.740244078130086,
            "unit": "iter/sec",
            "range": "stddev: 0.013622157994962126",
            "extra": "mean: 37.39681646428445 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 14.70797703653384,
            "unit": "iter/sec",
            "range": "stddev: 0.019150372356778824",
            "extra": "mean: 67.99031556250412 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.971208282997955,
            "unit": "iter/sec",
            "range": "stddev: 0.01874566286539766",
            "extra": "mean: 71.57577066665984 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.3352810481807555,
            "unit": "iter/sec",
            "range": "stddev: 0.0490570407192477",
            "extra": "mean: 428.2139833999963 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 49.91667310866622,
            "unit": "iter/sec",
            "range": "stddev: 0.01302589949784753",
            "extra": "mean: 20.033386396225723 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.8330592696072046,
            "unit": "iter/sec",
            "range": "stddev: 0.0742151697777061",
            "extra": "mean: 1.200394781600005 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 19.2189175649401,
            "unit": "iter/sec",
            "range": "stddev: 0.023172735563799472",
            "extra": "mean: 52.03206666665968 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.46190899063227,
            "unit": "iter/sec",
            "range": "stddev: 0.013036624121505684",
            "extra": "mean: 118.17664325000976 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.364557772845492,
            "unit": "iter/sec",
            "range": "stddev: 0.011686714412042179",
            "extra": "mean: 186.40865516666358 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 153.2009725983437,
            "unit": "iter/sec",
            "range": "stddev: 0.0004432077830637403",
            "extra": "mean: 6.527373704224194 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 92.44568954403515,
            "unit": "iter/sec",
            "range": "stddev: 0.0014751759212340944",
            "extra": "mean: 10.817162000005037 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 183.0517591949079,
            "unit": "iter/sec",
            "range": "stddev: 0.00039666059391524745",
            "extra": "mean: 5.462935753243599 msec\nrounds: 77"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 118.99522245201128,
            "unit": "iter/sec",
            "range": "stddev: 0.0018440128228715004",
            "extra": "mean: 8.403698731714064 msec\nrounds: 41"
          }
        ]
      },
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
          "id": "40d06fa9d34c6bb442b651ab713cdf1507ab4c33",
          "message": "do not fail on benchmark",
          "timestamp": "2023-03-31T14:17:45+02:00",
          "tree_id": "77a0e102997fcb2fb37ca6fc84ea5378a51b8234",
          "url": "https://github.com/developmentseed/tipg/commit/40d06fa9d34c6bb442b651ab713cdf1507ab4c33"
        },
        "date": 1680265381315,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 125.54600338600262,
            "unit": "iter/sec",
            "range": "stddev: 0.0005534306065413059",
            "extra": "mean: 7.9652077567567705 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 103.87918206085797,
            "unit": "iter/sec",
            "range": "stddev: 0.0007183506585857761",
            "extra": "mean: 9.626567904762155 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 57.4978377192674,
            "unit": "iter/sec",
            "range": "stddev: 0.0006870639333260266",
            "extra": "mean: 17.39195837037368 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 33.66425101008801,
            "unit": "iter/sec",
            "range": "stddev: 0.010299648168483938",
            "extra": "mean: 29.705101702703402 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 21.011064577339926,
            "unit": "iter/sec",
            "range": "stddev: 0.011393311691023035",
            "extra": "mean: 47.5939710869521 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 17.334422286877597,
            "unit": "iter/sec",
            "range": "stddev: 0.013429046550531263",
            "extra": "mean: 57.68868344444419 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 123.63560406087132,
            "unit": "iter/sec",
            "range": "stddev: 0.0005582333405128432",
            "extra": "mean: 8.088284985509963 msec\nrounds: 69"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 96.32741417874722,
            "unit": "iter/sec",
            "range": "stddev: 0.0009292417528270062",
            "extra": "mean: 10.381260708860912 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 54.84559940520235,
            "unit": "iter/sec",
            "range": "stddev: 0.0005006036950733302",
            "extra": "mean: 18.233003392158125 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 34.58423131586771,
            "unit": "iter/sec",
            "range": "stddev: 0.0012104181675179214",
            "extra": "mean: 28.91491185293994 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 19.439680391669874,
            "unit": "iter/sec",
            "range": "stddev: 0.005198452629923723",
            "extra": "mean: 51.44117495000131 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 15.990419548943072,
            "unit": "iter/sec",
            "range": "stddev: 0.005015248642141144",
            "extra": "mean: 62.5374460588245 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 96.80146314510526,
            "unit": "iter/sec",
            "range": "stddev: 0.010104464654259624",
            "extra": "mean: 10.330422366664038 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 95.4573814999263,
            "unit": "iter/sec",
            "range": "stddev: 0.00044119305701100696",
            "extra": "mean: 10.475879227849678 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 45.424929888811306,
            "unit": "iter/sec",
            "range": "stddev: 0.0083918769728102",
            "extra": "mean: 22.01434327907046 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 26.122070686418404,
            "unit": "iter/sec",
            "range": "stddev: 0.014837281272681135",
            "extra": "mean: 38.28180437931086 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 15.615207624681,
            "unit": "iter/sec",
            "range": "stddev: 0.020730785745105014",
            "extra": "mean: 64.04013472221948 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 12.185413366768145,
            "unit": "iter/sec",
            "range": "stddev: 0.027664035302888707",
            "extra": "mean: 82.06533253333721 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.8745209382906856,
            "unit": "iter/sec",
            "range": "stddev: 0.03254965252444936",
            "extra": "mean: 533.4696346000101 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 38.51599115320708,
            "unit": "iter/sec",
            "range": "stddev: 0.0195080680908616",
            "extra": "mean: 25.96324202127494 msec\nrounds: 47"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7418843123239469,
            "unit": "iter/sec",
            "range": "stddev: 0.0768041678924576",
            "extra": "mean: 1.347919053399994 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 15.044383063604743,
            "unit": "iter/sec",
            "range": "stddev: 0.03710022390048018",
            "extra": "mean: 66.4699905454543 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.140342489098245,
            "unit": "iter/sec",
            "range": "stddev: 0.010065054753005237",
            "extra": "mean: 140.04930457142402 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.57485714818712,
            "unit": "iter/sec",
            "range": "stddev: 0.010423231515192349",
            "extra": "mean: 218.58606019999343 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 151.59280296942933,
            "unit": "iter/sec",
            "range": "stddev: 0.0002546645962413747",
            "extra": "mean: 6.596619235292214 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 92.67564885232879,
            "unit": "iter/sec",
            "range": "stddev: 0.00022669056676311565",
            "extra": "mean: 10.79032100000098 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 189.37024608147948,
            "unit": "iter/sec",
            "range": "stddev: 0.0004580560108379243",
            "extra": "mean: 5.280660614285385 msec\nrounds: 70"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 125.93904916162263,
            "unit": "iter/sec",
            "range": "stddev: 0.0028842063745373745",
            "extra": "mean: 7.940348975611685 msec\nrounds: 41"
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
          "id": "ffc44c2e1e0ab2363cb2a30b164d490a96954733",
          "message": "Merge pull request #51 from developmentseed/moveToRuff\n\nuse ruff for linting",
          "timestamp": "2023-03-31T14:46:04+02:00",
          "tree_id": "eaed05fc5166fbc6057f8e72af121240d75c0843",
          "url": "https://github.com/developmentseed/tipg/commit/ffc44c2e1e0ab2363cb2a30b164d490a96954733"
        },
        "date": 1680267079492,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 145.40767130886678,
            "unit": "iter/sec",
            "range": "stddev: 0.0006643622577483739",
            "extra": "mean: 6.877216250000018 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 125.21161295405794,
            "unit": "iter/sec",
            "range": "stddev: 0.000326042686570854",
            "extra": "mean: 7.986479659573711 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 66.09309498680756,
            "unit": "iter/sec",
            "range": "stddev: 0.00048232307380480623",
            "extra": "mean: 15.130173586206002 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 40.57493704262507,
            "unit": "iter/sec",
            "range": "stddev: 0.008140453347587631",
            "extra": "mean: 24.645756047618086 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.18528346435896,
            "unit": "iter/sec",
            "range": "stddev: 0.012744079435026737",
            "extra": "mean: 41.34745832000135 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.62387567652697,
            "unit": "iter/sec",
            "range": "stddev: 0.011225075718005146",
            "extra": "mean: 48.48749166666808 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 149.30851277842967,
            "unit": "iter/sec",
            "range": "stddev: 0.0002489922799927745",
            "extra": "mean: 6.697541763636589 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 122.75774530181775,
            "unit": "iter/sec",
            "range": "stddev: 0.00023263665932234624",
            "extra": "mean: 8.146125505493398 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 65.865632950928,
            "unit": "iter/sec",
            "range": "stddev: 0.0008145991362448422",
            "extra": "mean: 15.18242450877276 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 41.68076197818887,
            "unit": "iter/sec",
            "range": "stddev: 0.0004607466676240322",
            "extra": "mean: 23.991883846156416 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.583389542295876,
            "unit": "iter/sec",
            "range": "stddev: 0.004254088795755799",
            "extra": "mean: 42.40272579166534 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.57841159201109,
            "unit": "iter/sec",
            "range": "stddev: 0.0007133568453753574",
            "extra": "mean: 51.07666652631038 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 144.15498311465814,
            "unit": "iter/sec",
            "range": "stddev: 0.0003563074809292577",
            "extra": "mean: 6.936978371428332 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 108.08859332261207,
            "unit": "iter/sec",
            "range": "stddev: 0.0005690448301376527",
            "extra": "mean: 9.251670035295026 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 52.1200074725334,
            "unit": "iter/sec",
            "range": "stddev: 0.00822572086854337",
            "extra": "mean: 19.186489958332942 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 30.86769127379969,
            "unit": "iter/sec",
            "range": "stddev: 0.015859546232653513",
            "extra": "mean: 32.39633282353041 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.91081286337251,
            "unit": "iter/sec",
            "range": "stddev: 0.024719371372768154",
            "extra": "mean: 59.13376299999874 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.969258415062857,
            "unit": "iter/sec",
            "range": "stddev: 0.027238828397971104",
            "extra": "mean: 71.58576141176643 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.9609493795232766,
            "unit": "iter/sec",
            "range": "stddev: 0.036374444997135866",
            "extra": "mean: 509.9570699999958 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 41.410488708187124,
            "unit": "iter/sec",
            "range": "stddev: 0.021519537903115366",
            "extra": "mean: 24.148471346156644 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7770953314488813,
            "unit": "iter/sec",
            "range": "stddev: 0.07017552454911402",
            "extra": "mean: 1.2868434020000052 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.58301924221427,
            "unit": "iter/sec",
            "range": "stddev: 0.03773195333183504",
            "extra": "mean: 60.30264968000324 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.533801294125421,
            "unit": "iter/sec",
            "range": "stddev: 0.007995027385089695",
            "extra": "mean: 117.18107388888812 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.321421711609184,
            "unit": "iter/sec",
            "range": "stddev: 0.011149226657705581",
            "extra": "mean: 187.91970533333333 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 173.01166655228468,
            "unit": "iter/sec",
            "range": "stddev: 0.0006417587243271343",
            "extra": "mean: 5.779957039473964 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 109.41205048949648,
            "unit": "iter/sec",
            "range": "stddev: 0.0002047885988697827",
            "extra": "mean: 9.13976107317356 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 229.6120954008542,
            "unit": "iter/sec",
            "range": "stddev: 0.00019248281243205274",
            "extra": "mean: 4.355171265059932 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 168.06880811378278,
            "unit": "iter/sec",
            "range": "stddev: 0.00016759893915836886",
            "extra": "mean: 5.949944021278468 msec\nrounds: 47"
          }
        ]
      }
    ]
  }
}