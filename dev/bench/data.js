window.BENCHMARK_DATA = {
  "lastUpdate": 1702987778147,
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
          "id": "497ae966d67efa0c5abf28370d709c7f58411530",
          "message": "more docs",
          "timestamp": "2023-04-05T10:22:08+02:00",
          "tree_id": "2f2cb668d007edd77dbd54a327b52dd939c6c580",
          "url": "https://github.com/developmentseed/tipg/commit/497ae966d67efa0c5abf28370d709c7f58411530"
        },
        "date": 1680683297438,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 165.09925088585013,
            "unit": "iter/sec",
            "range": "stddev: 0.00017787083003509296",
            "extra": "mean: 6.0569626732673765 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 134.07108908914458,
            "unit": "iter/sec",
            "range": "stddev: 0.0002518678822478075",
            "extra": "mean: 7.458729594827821 msec\nrounds: 116"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 70.66539471710401,
            "unit": "iter/sec",
            "range": "stddev: 0.0007109046074236426",
            "extra": "mean: 14.151198107692135 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 44.420132229225466,
            "unit": "iter/sec",
            "range": "stddev: 0.005217078345990565",
            "extra": "mean: 22.512314795453648 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 26.037249952487848,
            "unit": "iter/sec",
            "range": "stddev: 0.006400309030207377",
            "extra": "mean: 38.4065138148144 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.868341200923854,
            "unit": "iter/sec",
            "range": "stddev: 0.009987869815239157",
            "extra": "mean: 47.919477181814976 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 163.63955778586427,
            "unit": "iter/sec",
            "range": "stddev: 0.00016329621152122372",
            "extra": "mean: 6.110991825757569 msec\nrounds: 132"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 131.1930729152971,
            "unit": "iter/sec",
            "range": "stddev: 0.0003120125510873538",
            "extra": "mean: 7.62235366379165 msec\nrounds: 116"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 71.60864079875908,
            "unit": "iter/sec",
            "range": "stddev: 0.000344677139961757",
            "extra": "mean: 13.964795153845863 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 45.64158594681565,
            "unit": "iter/sec",
            "range": "stddev: 0.00025518064133823695",
            "extra": "mean: 21.909843386363935 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 26.396681677208864,
            "unit": "iter/sec",
            "range": "stddev: 0.0003874527154851811",
            "extra": "mean: 37.8835496153825 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 21.76806936220387,
            "unit": "iter/sec",
            "range": "stddev: 0.0003560273977030228",
            "extra": "mean: 45.93884663636319 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 153.2246603558945,
            "unit": "iter/sec",
            "range": "stddev: 0.00016827120746758053",
            "extra": "mean: 6.526364605261991 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 118.19644429495226,
            "unit": "iter/sec",
            "range": "stddev: 0.0002484676303929392",
            "extra": "mean: 8.460491396040299 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 55.18865551537628,
            "unit": "iter/sec",
            "range": "stddev: 0.007039632692217715",
            "extra": "mean: 18.119665910712154 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 34.248815907353105,
            "unit": "iter/sec",
            "range": "stddev: 0.009509365449014597",
            "extra": "mean: 29.198089729732914 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.590116433934753,
            "unit": "iter/sec",
            "range": "stddev: 0.015715995407586215",
            "extra": "mean: 53.792024571432 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 15.367751733301706,
            "unit": "iter/sec",
            "range": "stddev: 0.017177517461327747",
            "extra": "mean: 65.0713271111098 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.666156233544111,
            "unit": "iter/sec",
            "range": "stddev: 0.020153253885890503",
            "extra": "mean: 375.0717934000079 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 54.64719935620456,
            "unit": "iter/sec",
            "range": "stddev: 0.012081718582486025",
            "extra": "mean: 18.299199442623614 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9776041312827934,
            "unit": "iter/sec",
            "range": "stddev: 0.04574392992769722",
            "extra": "mean: 1.0229089342000008 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 20.581337473996456,
            "unit": "iter/sec",
            "range": "stddev: 0.024194670162177388",
            "extra": "mean: 48.58770725000028 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.986376464565426,
            "unit": "iter/sec",
            "range": "stddev: 0.00833168729983661",
            "extra": "mean: 111.27955788889368 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.410712739410044,
            "unit": "iter/sec",
            "range": "stddev: 0.011076794259795504",
            "extra": "mean: 184.8185346666611 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 190.78769836929177,
            "unit": "iter/sec",
            "range": "stddev: 0.00011049905857360049",
            "extra": "mean: 5.24142808235143 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 113.78659250097914,
            "unit": "iter/sec",
            "range": "stddev: 0.00014100462375334094",
            "extra": "mean: 8.788381636363662 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 243.78075029190063,
            "unit": "iter/sec",
            "range": "stddev: 0.0001241654273002228",
            "extra": "mean: 4.102046608694944 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 178.63782667542912,
            "unit": "iter/sec",
            "range": "stddev: 0.00010872871720255214",
            "extra": "mean: 5.5979185294104665 msec\nrounds: 51"
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
          "id": "b0b14ce5ce67a7bb3bb7770fe3876937dea41244",
          "message": "Merge pull request #56 from developmentseed/optionalViewer\n\nadd option to add/remove viewer in tiles endpoints",
          "timestamp": "2023-04-05T14:19:07+02:00",
          "tree_id": "f9c5bb659ab5769fd62df841dab18f6897df1f14",
          "url": "https://github.com/developmentseed/tipg/commit/b0b14ce5ce67a7bb3bb7770fe3876937dea41244"
        },
        "date": 1680697474178,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 160.03803745278768,
            "unit": "iter/sec",
            "range": "stddev: 0.00017148577798210466",
            "extra": "mean: 6.2485145151508545 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 126.03420787386267,
            "unit": "iter/sec",
            "range": "stddev: 0.0002815988306234652",
            "extra": "mean: 7.9343538303570575 msec\nrounds: 112"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 69.28631437015456,
            "unit": "iter/sec",
            "range": "stddev: 0.0005424004849661028",
            "extra": "mean: 14.432864687499602 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 42.26167988435677,
            "unit": "iter/sec",
            "range": "stddev: 0.0059376420812161075",
            "extra": "mean: 23.662097738101313 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.454082225848147,
            "unit": "iter/sec",
            "range": "stddev: 0.007255127693026856",
            "extra": "mean: 39.286429230770636 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.31809754929217,
            "unit": "iter/sec",
            "range": "stddev: 0.011040865202416176",
            "extra": "mean: 49.21720636363602 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 161.4363998442425,
            "unit": "iter/sec",
            "range": "stddev: 0.00020016100824970522",
            "extra": "mean: 6.194389870963567 msec\nrounds: 124"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 124.9424879789329,
            "unit": "iter/sec",
            "range": "stddev: 0.0005768780115140421",
            "extra": "mean: 8.003682463635702 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 69.49495725503863,
            "unit": "iter/sec",
            "range": "stddev: 0.0005753616476966924",
            "extra": "mean: 14.389533276927033 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 43.35046033737805,
            "unit": "iter/sec",
            "range": "stddev: 0.001016849611032072",
            "extra": "mean: 23.06780579069815 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 24.949296891190095,
            "unit": "iter/sec",
            "range": "stddev: 0.0024980947117468526",
            "extra": "mean: 40.081289839999954 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.83717117644049,
            "unit": "iter/sec",
            "range": "stddev: 0.0013873498254948365",
            "extra": "mean: 47.991159238095065 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 150.84312869878235,
            "unit": "iter/sec",
            "range": "stddev: 0.0002573220968055478",
            "extra": "mean: 6.629403729730995 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 114.46855287751347,
            "unit": "iter/sec",
            "range": "stddev: 0.0003655865827099091",
            "extra": "mean: 8.736023779998732 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 54.20824474836035,
            "unit": "iter/sec",
            "range": "stddev: 0.00549894657792827",
            "extra": "mean: 18.447378339625125 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.51027035434418,
            "unit": "iter/sec",
            "range": "stddev: 0.010560316484784246",
            "extra": "mean: 30.75951042856754 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.281118592179773,
            "unit": "iter/sec",
            "range": "stddev: 0.017088445272939325",
            "extra": "mean: 54.70124789999318 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.45697067345716,
            "unit": "iter/sec",
            "range": "stddev: 0.021670762749163148",
            "extra": "mean: 69.17078429411143 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.3344969673932945,
            "unit": "iter/sec",
            "range": "stddev: 0.023572908959834",
            "extra": "mean: 428.3578063999812 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 49.119869912373055,
            "unit": "iter/sec",
            "range": "stddev: 0.015033897427123438",
            "extra": "mean: 20.358360105267803 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9046130061244777,
            "unit": "iter/sec",
            "range": "stddev: 0.03787919507527348",
            "extra": "mean: 1.1054450834000022 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 17.994010001360767,
            "unit": "iter/sec",
            "range": "stddev: 0.03121344034119962",
            "extra": "mean: 55.57404936000239 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.720154088145838,
            "unit": "iter/sec",
            "range": "stddev: 0.009994890094252867",
            "extra": "mean: 114.67687266666518 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.3512445281302705,
            "unit": "iter/sec",
            "range": "stddev: 0.01321545624432471",
            "extra": "mean: 186.8724172000043 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 182.18084861502194,
            "unit": "iter/sec",
            "range": "stddev: 0.0008747604133700936",
            "extra": "mean: 5.489051168672314 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 108.40890923885064,
            "unit": "iter/sec",
            "range": "stddev: 0.0010724271630052921",
            "extra": "mean: 9.22433411627417 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 233.8830451224293,
            "unit": "iter/sec",
            "range": "stddev: 0.0006247658524214026",
            "extra": "mean: 4.2756412696633745 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 169.6166680263919,
            "unit": "iter/sec",
            "range": "stddev: 0.0010382835453139293",
            "extra": "mean: 5.895647000001218 msec\nrounds: 49"
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
          "id": "f76e299b2c19118011d444d61b9a371c55306067",
          "message": "Merge pull request #58 from developmentseed/defaultLimit\n\nadd setting to set Limit value",
          "timestamp": "2023-04-11T21:27:17+02:00",
          "tree_id": "914e583214a3c9398348e52d229fddb69ee9dc77",
          "url": "https://github.com/developmentseed/tipg/commit/f76e299b2c19118011d444d61b9a371c55306067"
        },
        "date": 1681241530743,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 131.49129893556162,
            "unit": "iter/sec",
            "range": "stddev: 0.0003817692047662113",
            "extra": "mean: 7.60506594805226 msec\nrounds: 77"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 106.24287880262284,
            "unit": "iter/sec",
            "range": "stddev: 0.00037171800291851183",
            "extra": "mean: 9.412395553190835 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 62.578550864192046,
            "unit": "iter/sec",
            "range": "stddev: 0.00036032639382739746",
            "extra": "mean: 15.979916220338813 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 38.954887086381696,
            "unit": "iter/sec",
            "range": "stddev: 0.010694972407599465",
            "extra": "mean: 25.670720025000193 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 23.92529640480268,
            "unit": "iter/sec",
            "range": "stddev: 0.01309786692804454",
            "extra": "mean: 41.79676536000045 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.071299203172323,
            "unit": "iter/sec",
            "range": "stddev: 0.01372767242721669",
            "extra": "mean: 49.822385181819584 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 122.59251390939745,
            "unit": "iter/sec",
            "range": "stddev: 0.0005988458777823773",
            "extra": "mean: 8.15710493333267 msec\nrounds: 105"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 95.80474209899396,
            "unit": "iter/sec",
            "range": "stddev: 0.007091666126491496",
            "extra": "mean: 10.437896685392788 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 57.41001105582679,
            "unit": "iter/sec",
            "range": "stddev: 0.001889809889172382",
            "extra": "mean: 17.418564839285214 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 38.44306274075012,
            "unit": "iter/sec",
            "range": "stddev: 0.000609198526573985",
            "extra": "mean: 26.012495589743622 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 22.971793164890865,
            "unit": "iter/sec",
            "range": "stddev: 0.0006340217025318299",
            "extra": "mean: 43.531647391304155 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 18.628908582906746,
            "unit": "iter/sec",
            "range": "stddev: 0.0034351123455314448",
            "extra": "mean: 53.68001005263218 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 119.93613858557869,
            "unit": "iter/sec",
            "range": "stddev: 0.00041582042444175763",
            "extra": "mean: 8.337770515151815 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 92.98096925053365,
            "unit": "iter/sec",
            "range": "stddev: 0.000592212962873876",
            "extra": "mean: 10.754888963412915 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 47.258092692471145,
            "unit": "iter/sec",
            "range": "stddev: 0.010384859995323455",
            "extra": "mean: 21.16039693999994 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 28.59851961711502,
            "unit": "iter/sec",
            "range": "stddev: 0.018901041551780642",
            "extra": "mean: 34.96684490624968 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 15.707089076113506,
            "unit": "iter/sec",
            "range": "stddev: 0.030176030319305134",
            "extra": "mean: 63.66552040000499 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 12.93346758150934,
            "unit": "iter/sec",
            "range": "stddev: 0.03271774107667883",
            "extra": "mean: 77.31878505882484 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.794969246513677,
            "unit": "iter/sec",
            "range": "stddev: 0.04149255983587481",
            "extra": "mean: 557.1126090000007 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 40.08752881011599,
            "unit": "iter/sec",
            "range": "stddev: 0.02243612603507894",
            "extra": "mean: 24.945413939999526 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7465421954594689,
            "unit": "iter/sec",
            "range": "stddev: 0.0851001425596208",
            "extra": "mean: 1.3395090138 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 15.280524121264932,
            "unit": "iter/sec",
            "range": "stddev: 0.04381606183111969",
            "extra": "mean: 65.44278141666382 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.357193512554852,
            "unit": "iter/sec",
            "range": "stddev: 0.009295485267176523",
            "extra": "mean: 119.65739437500389 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.132977049015949,
            "unit": "iter/sec",
            "range": "stddev: 0.010380908646376637",
            "extra": "mean: 194.81871640001032 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 156.40852782208998,
            "unit": "iter/sec",
            "range": "stddev: 0.00030934900478106454",
            "extra": "mean: 6.393513281689282 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 98.79076531585956,
            "unit": "iter/sec",
            "range": "stddev: 0.00022000506086604837",
            "extra": "mean: 10.122403615385931 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 213.15866289780277,
            "unit": "iter/sec",
            "range": "stddev: 0.0002877245400175171",
            "extra": "mean: 4.691341118420517 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 161.85585273134944,
            "unit": "iter/sec",
            "range": "stddev: 0.0003618032142373158",
            "extra": "mean: 6.1783369777787005 msec\nrounds: 45"
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
          "id": "90367414922915c61c5316007ca7ba939adf92fe",
          "message": "Merge pull request #64 from developmentseed/ZXYTileParam\n\nswitch to z/x/y tile parameter",
          "timestamp": "2023-04-17T17:24:18+02:00",
          "tree_id": "45e3aa23a2e289628a53cf5c32926f7570f62616",
          "url": "https://github.com/developmentseed/tipg/commit/90367414922915c61c5316007ca7ba939adf92fe"
        },
        "date": 1681745375864,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 129.54008781300524,
            "unit": "iter/sec",
            "range": "stddev: 0.000556411535052732",
            "extra": "mean: 7.7196180493835085 msec\nrounds: 81"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 104.29701884196028,
            "unit": "iter/sec",
            "range": "stddev: 0.0007498740427345674",
            "extra": "mean: 9.588001757895737 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 57.19430367042147,
            "unit": "iter/sec",
            "range": "stddev: 0.0009130721843920735",
            "extra": "mean: 17.48425867307409 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 38.654135948561006,
            "unit": "iter/sec",
            "range": "stddev: 0.0006118454260845988",
            "extra": "mean: 25.870452810813052 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 21.866040588649824,
            "unit": "iter/sec",
            "range": "stddev: 0.008369606514621267",
            "extra": "mean: 45.733016727275164 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 17.809051280932643,
            "unit": "iter/sec",
            "range": "stddev: 0.010209355905891641",
            "extra": "mean: 56.15122244443506 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 118.59046769687062,
            "unit": "iter/sec",
            "range": "stddev: 0.0012297447856058305",
            "extra": "mean: 8.432380944445741 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 89.29641729847962,
            "unit": "iter/sec",
            "range": "stddev: 0.0006555446742973447",
            "extra": "mean: 11.198657575000226 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 49.04707634883127,
            "unit": "iter/sec",
            "range": "stddev: 0.00165569980525932",
            "extra": "mean: 20.388575108694095 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 31.177701443545036,
            "unit": "iter/sec",
            "range": "stddev: 0.0009918951453890478",
            "extra": "mean: 32.07420539999551 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 17.380730247403463,
            "unit": "iter/sec",
            "range": "stddev: 0.0019568916545398556",
            "extra": "mean: 57.53498188888765 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 14.321476034334433,
            "unit": "iter/sec",
            "range": "stddev: 0.0035890006374932953",
            "extra": "mean: 69.82520500000078 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 123.33403379812897,
            "unit": "iter/sec",
            "range": "stddev: 0.0003414557936371331",
            "extra": "mean: 8.108062058821353 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 95.08435142333038,
            "unit": "iter/sec",
            "range": "stddev: 0.0006018238989495988",
            "extra": "mean: 10.516977662789579 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 46.629421321773,
            "unit": "iter/sec",
            "range": "stddev: 0.005771478231076355",
            "extra": "mean: 21.445687543479398 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 26.476269266476702,
            "unit": "iter/sec",
            "range": "stddev: 0.01227754782052829",
            "extra": "mean: 37.7696717741938 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 14.894526471203704,
            "unit": "iter/sec",
            "range": "stddev: 0.021123830942843005",
            "extra": "mean: 67.13875744444427 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 11.209168929207172,
            "unit": "iter/sec",
            "range": "stddev: 0.0252137336244316",
            "extra": "mean: 89.21267993333117 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.9895635795078035,
            "unit": "iter/sec",
            "range": "stddev: 0.08862058712976777",
            "extra": "mean: 502.622791400006 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 40.28823134173244,
            "unit": "iter/sec",
            "range": "stddev: 0.016890960147912498",
            "extra": "mean: 24.821144207543135 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7459609658546699,
            "unit": "iter/sec",
            "range": "stddev: 0.055624868809794364",
            "extra": "mean: 1.340552717600002 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.02102583827826,
            "unit": "iter/sec",
            "range": "stddev: 0.03835258580508514",
            "extra": "mean: 62.4179756086997 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.255362472866708,
            "unit": "iter/sec",
            "range": "stddev: 0.01469062984580117",
            "extra": "mean: 137.82908899999921 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.397163214124103,
            "unit": "iter/sec",
            "range": "stddev: 0.013818472719960307",
            "extra": "mean: 227.4193499999967 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 130.9858868303602,
            "unit": "iter/sec",
            "range": "stddev: 0.0036603320530067098",
            "extra": "mean: 7.63441027272732 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 82.70507096753097,
            "unit": "iter/sec",
            "range": "stddev: 0.001541380334902618",
            "extra": "mean: 12.09115702702907 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 154.9162008303938,
            "unit": "iter/sec",
            "range": "stddev: 0.0015901696890456148",
            "extra": "mean: 6.4551027887317325 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 115.87212915961796,
            "unit": "iter/sec",
            "range": "stddev: 0.0013507343664752054",
            "extra": "mean: 8.630203028568367 msec\nrounds: 35"
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
          "id": "71af728ca44ee623d9168c1be8bdf300b3215eb1",
          "message": "Merge pull request #62 from developmentseed/StyleJSON\n\nadd styleJSON and update TileJSON",
          "timestamp": "2023-04-17T22:00:53+02:00",
          "tree_id": "ebce5ab55442d7c5bf1b3c5fa8d2624b8f94a85f",
          "url": "https://github.com/developmentseed/tipg/commit/71af728ca44ee623d9168c1be8bdf300b3215eb1"
        },
        "date": 1681761991528,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 164.69606548886574,
            "unit": "iter/sec",
            "range": "stddev: 0.00017464884054315758",
            "extra": "mean: 6.07179046464595 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 134.9786713985315,
            "unit": "iter/sec",
            "range": "stddev: 0.0003267911383281764",
            "extra": "mean: 7.408577885964282 msec\nrounds: 114"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 71.0611268417631,
            "unit": "iter/sec",
            "range": "stddev: 0.0008204202957512043",
            "extra": "mean: 14.072391537313667 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 44.34804497861987,
            "unit": "iter/sec",
            "range": "stddev: 0.005161353554336072",
            "extra": "mean: 22.548908311112665 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.734147231085228,
            "unit": "iter/sec",
            "range": "stddev: 0.007401142885741504",
            "extra": "mean: 38.85887459259047 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.551533508349063,
            "unit": "iter/sec",
            "range": "stddev: 0.011780827873424224",
            "extra": "mean: 48.65816945454459 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 164.19571405596466,
            "unit": "iter/sec",
            "range": "stddev: 0.0001776949828357601",
            "extra": "mean: 6.09029295161236 msec\nrounds: 124"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 130.96890767497624,
            "unit": "iter/sec",
            "range": "stddev: 0.0007148183110146704",
            "extra": "mean: 7.63540001785528 msec\nrounds: 112"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 71.16132108248526,
            "unit": "iter/sec",
            "range": "stddev: 0.00024893017074350155",
            "extra": "mean: 14.052577787880995 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 44.321360887257406,
            "unit": "iter/sec",
            "range": "stddev: 0.00029724503013487595",
            "extra": "mean: 22.562484093025777 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 24.96841730490239,
            "unit": "iter/sec",
            "range": "stddev: 0.0028259210856809917",
            "extra": "mean: 40.05059623076936 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.844287792364533,
            "unit": "iter/sec",
            "range": "stddev: 0.000982482284344418",
            "extra": "mean: 47.974774190476765 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 152.85597761062508,
            "unit": "iter/sec",
            "range": "stddev: 0.00024047046405841215",
            "extra": "mean: 6.542105945946922 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 115.41838194300476,
            "unit": "iter/sec",
            "range": "stddev: 0.0003129197739814942",
            "extra": "mean: 8.664131164945756 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 54.05443522414682,
            "unit": "iter/sec",
            "range": "stddev: 0.007873459759123175",
            "extra": "mean: 18.499869545455674 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 33.27817210082061,
            "unit": "iter/sec",
            "range": "stddev: 0.010557798353030938",
            "extra": "mean: 30.049727400001657 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.219563580703664,
            "unit": "iter/sec",
            "range": "stddev: 0.017332821660069084",
            "extra": "mean: 54.88605671428375 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.930167382791801,
            "unit": "iter/sec",
            "range": "stddev: 0.0197369384749943",
            "extra": "mean: 66.97848552941069 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.516980117971832,
            "unit": "iter/sec",
            "range": "stddev: 0.025279438201008492",
            "extra": "mean: 397.30150940000044 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 54.24939798798695,
            "unit": "iter/sec",
            "range": "stddev: 0.01256164907550356",
            "extra": "mean: 18.433384278687132 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9180544321887046,
            "unit": "iter/sec",
            "range": "stddev: 0.05497794172463161",
            "extra": "mean: 1.0892600318000007 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 18.92243976142231,
            "unit": "iter/sec",
            "range": "stddev: 0.028713311189646106",
            "extra": "mean: 52.84730788461681 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.877383256585485,
            "unit": "iter/sec",
            "range": "stddev: 0.008141993646228316",
            "extra": "mean: 112.64580688889068 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.3913558768427885,
            "unit": "iter/sec",
            "range": "stddev: 0.010671935758137102",
            "extra": "mean: 185.48209816666864 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 192.20263781327935,
            "unit": "iter/sec",
            "range": "stddev: 0.00011517284062357569",
            "extra": "mean: 5.20284222618983 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 114.05414859091539,
            "unit": "iter/sec",
            "range": "stddev: 0.00019166582387611614",
            "extra": "mean: 8.767765244443302 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 250.047893582072,
            "unit": "iter/sec",
            "range": "stddev: 0.00010733267398971271",
            "extra": "mean: 3.999233849461623 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 181.4377085604089,
            "unit": "iter/sec",
            "range": "stddev: 0.00013532270033072085",
            "extra": "mean: 5.511533450980805 msec\nrounds: 51"
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
          "id": "2bc89d378a13a114d7b51d9259e9d33a5592425d",
          "message": "add flake8 rules in ruff",
          "timestamp": "2023-04-25T11:34:47+02:00",
          "tree_id": "7d79ecef5526a9b2bc0815aa3443187027773846",
          "url": "https://github.com/developmentseed/tipg/commit/2bc89d378a13a114d7b51d9259e9d33a5592425d"
        },
        "date": 1682415635515,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 102.11619754079658,
            "unit": "iter/sec",
            "range": "stddev: 0.0023068281960068526",
            "extra": "mean: 9.792765732395086 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 88.35545056592957,
            "unit": "iter/sec",
            "range": "stddev: 0.0023956166360289753",
            "extra": "mean: 11.317920893333167 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 49.91612608015937,
            "unit": "iter/sec",
            "range": "stddev: 0.0024505127681605696",
            "extra": "mean: 20.03360594117658 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 32.33073366817088,
            "unit": "iter/sec",
            "range": "stddev: 0.01017586791114495",
            "extra": "mean: 30.930321911763016 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 20.162089256982558,
            "unit": "iter/sec",
            "range": "stddev: 0.012917474171222505",
            "extra": "mean: 49.59803457142611 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 16.152204259504412,
            "unit": "iter/sec",
            "range": "stddev: 0.01674162875833528",
            "extra": "mean: 61.91105461111116 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 103.99944891013786,
            "unit": "iter/sec",
            "range": "stddev: 0.0027412178594636524",
            "extra": "mean: 9.615435567010204 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 84.54861727272049,
            "unit": "iter/sec",
            "range": "stddev: 0.002355704165495119",
            "extra": "mean: 11.827514538462461 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 46.568534508462996,
            "unit": "iter/sec",
            "range": "stddev: 0.00263600959473951",
            "extra": "mean: 21.473727068183088 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 29.42566908831591,
            "unit": "iter/sec",
            "range": "stddev: 0.004371462468378489",
            "extra": "mean: 33.98393412903128 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 17.88522445968152,
            "unit": "iter/sec",
            "range": "stddev: 0.004744482077597684",
            "extra": "mean: 55.91207436363406 msec\nrounds: 11"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 16.320070745221503,
            "unit": "iter/sec",
            "range": "stddev: 0.0012503959443431753",
            "extra": "mean: 61.27424418750138 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 104.2527420883626,
            "unit": "iter/sec",
            "range": "stddev: 0.0012028248646682468",
            "extra": "mean: 9.592073838714185 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 77.86560563878312,
            "unit": "iter/sec",
            "range": "stddev: 0.0018740964408632476",
            "extra": "mean: 12.842640749999154 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 36.343875082539796,
            "unit": "iter/sec",
            "range": "stddev: 0.011654930998737769",
            "extra": "mean: 27.514952594595965 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 22.632638280153003,
            "unit": "iter/sec",
            "range": "stddev: 0.021427470028505487",
            "extra": "mean: 44.18397836000054 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 14.169594813435136,
            "unit": "iter/sec",
            "range": "stddev: 0.023565547737541062",
            "extra": "mean: 70.57364823529277 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 11.57150590002389,
            "unit": "iter/sec",
            "range": "stddev: 0.02985792560302432",
            "extra": "mean: 86.41917557142976 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.6987906281318046,
            "unit": "iter/sec",
            "range": "stddev: 0.044737326059010964",
            "extra": "mean: 588.6540598000124 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 35.59180161357398,
            "unit": "iter/sec",
            "range": "stddev: 0.022745510286580936",
            "extra": "mean: 28.096358000001345 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6754491506591249,
            "unit": "iter/sec",
            "range": "stddev: 0.08892341579006316",
            "extra": "mean: 1.4804963468000039 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.044678562340854,
            "unit": "iter/sec",
            "range": "stddev: 0.04429871004099751",
            "extra": "mean: 76.6596122105251 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.335602878042117,
            "unit": "iter/sec",
            "range": "stddev: 0.013668695219195686",
            "extra": "mean: 136.3214471428559 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.027162755298789,
            "unit": "iter/sec",
            "range": "stddev: 0.013534394555170576",
            "extra": "mean: 248.31377840000073 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 138.6274807654689,
            "unit": "iter/sec",
            "range": "stddev: 0.0010199591055211979",
            "extra": "mean: 7.213576950819788 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 79.8225016143325,
            "unit": "iter/sec",
            "range": "stddev: 0.001275334367216195",
            "extra": "mean: 12.527795794117852 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 184.5216698012596,
            "unit": "iter/sec",
            "range": "stddev: 0.0006532039534955849",
            "extra": "mean: 5.419417681820553 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 118.41073196176933,
            "unit": "iter/sec",
            "range": "stddev: 0.003334650454515933",
            "extra": "mean: 8.445180461538444 msec\nrounds: 39"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "bitner@dbspatial.com",
            "name": "David Bitner",
            "username": "bitner"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a788f2a53ec6e312baf1eace97f0afc6d6e6a6af",
          "message": "Merge pull request #68 from developmentseed/catalogttlbg\n\napproach using background tasks",
          "timestamp": "2023-05-10T10:44:57-05:00",
          "tree_id": "d947d29eaf99c93a4cb69ff70b89c04dd3abbc41",
          "url": "https://github.com/developmentseed/tipg/commit/a788f2a53ec6e312baf1eace97f0afc6d6e6a6af"
        },
        "date": 1683748465315,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 159.36923717302193,
            "unit": "iter/sec",
            "range": "stddev: 0.00019918729043696132",
            "extra": "mean: 6.274736691588308 msec\nrounds: 107"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 122.88623685709406,
            "unit": "iter/sec",
            "range": "stddev: 0.00041009175819649144",
            "extra": "mean: 8.13760780357293 msec\nrounds: 112"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 68.66999630692605,
            "unit": "iter/sec",
            "range": "stddev: 0.0002321941454844405",
            "extra": "mean: 14.562400666666994 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 43.32610600712485,
            "unit": "iter/sec",
            "range": "stddev: 0.005716236122057628",
            "extra": "mean: 23.080772590907504 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.63023102988637,
            "unit": "iter/sec",
            "range": "stddev: 0.007211380595777783",
            "extra": "mean: 39.01642551851915 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.595620688202658,
            "unit": "iter/sec",
            "range": "stddev: 0.01137209298402693",
            "extra": "mean: 48.5540113181832 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 149.51457377832813,
            "unit": "iter/sec",
            "range": "stddev: 0.0003987760768803209",
            "extra": "mean: 6.688311210936604 msec\nrounds: 128"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 121.86891683685738,
            "unit": "iter/sec",
            "range": "stddev: 0.0005267843536226381",
            "extra": "mean: 8.205537769230139 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 66.28668068635163,
            "unit": "iter/sec",
            "range": "stddev: 0.00039171515926383514",
            "extra": "mean: 15.085986953121022 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 43.52680858111258,
            "unit": "iter/sec",
            "range": "stddev: 0.00039642235012024086",
            "extra": "mean: 22.974346904769998 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.478225788483925,
            "unit": "iter/sec",
            "range": "stddev: 0.0005561887111347993",
            "extra": "mean: 39.2492008000022 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 21.155358862743906,
            "unit": "iter/sec",
            "range": "stddev: 0.00038910029860423284",
            "extra": "mean: 47.269347047620705 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 151.79305837373602,
            "unit": "iter/sec",
            "range": "stddev: 0.00022361024803677464",
            "extra": "mean: 6.5879165405433655 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 113.79922981099698,
            "unit": "iter/sec",
            "range": "stddev: 0.00037840239800938084",
            "extra": "mean: 8.787405693877245 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 54.22269929540038,
            "unit": "iter/sec",
            "range": "stddev: 0.0060789716269368695",
            "extra": "mean: 18.442460685184447 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.255828367058704,
            "unit": "iter/sec",
            "range": "stddev: 0.01274687300400388",
            "extra": "mean: 31.002149088232713 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.365555446305613,
            "unit": "iter/sec",
            "range": "stddev: 0.017591904159545018",
            "extra": "mean: 54.4497553000042 msec\nrounds: 10"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.685000054205654,
            "unit": "iter/sec",
            "range": "stddev: 0.02054960782058258",
            "extra": "mean: 68.09669705882015 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.343264195565453,
            "unit": "iter/sec",
            "range": "stddev: 0.03127039988751465",
            "extra": "mean: 426.7551229999867 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 49.887252402724506,
            "unit": "iter/sec",
            "range": "stddev: 0.015024683620658055",
            "extra": "mean: 20.04520096491397 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9017251199034613,
            "unit": "iter/sec",
            "range": "stddev: 0.052812309572735534",
            "extra": "mean: 1.1089854080000123 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 19.292791405259926,
            "unit": "iter/sec",
            "range": "stddev: 0.027981952799247527",
            "extra": "mean: 51.832831185194024 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 9.01823255756428,
            "unit": "iter/sec",
            "range": "stddev: 0.008877062989635155",
            "extra": "mean: 110.88647288888372 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.356098953456716,
            "unit": "iter/sec",
            "range": "stddev: 0.009785616751578066",
            "extra": "mean: 186.70304800000395 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 193.83163109270447,
            "unit": "iter/sec",
            "range": "stddev: 0.0001248582163257391",
            "extra": "mean: 5.159116674417948 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 110.58294712889892,
            "unit": "iter/sec",
            "range": "stddev: 0.0003091303894342151",
            "extra": "mean: 9.042985613635064 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 245.67547451218988,
            "unit": "iter/sec",
            "range": "stddev: 0.00015997872361975693",
            "extra": "mean: 4.070410373626376 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 177.42557869899738,
            "unit": "iter/sec",
            "range": "stddev: 0.00020671824796528643",
            "extra": "mean: 5.6361659200024405 msec\nrounds: 50"
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
          "id": "e06f60a9d00e06231c45bd7e9d98f666d1833497",
          "message": "publish tipg:uvicorn",
          "timestamp": "2023-06-08T21:16:52+02:00",
          "tree_id": "45e1348f27fe904df30d4609e94d4218c568a323",
          "url": "https://github.com/developmentseed/tipg/commit/e06f60a9d00e06231c45bd7e9d98f666d1833497"
        },
        "date": 1686252174616,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 77.95498530296003,
            "unit": "iter/sec",
            "range": "stddev: 0.004660672367392654",
            "extra": "mean: 12.827915958339986 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 72.62960094297499,
            "unit": "iter/sec",
            "range": "stddev: 0.0039262914163589605",
            "extra": "mean: 13.768490904764139 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 44.82606620001345,
            "unit": "iter/sec",
            "range": "stddev: 0.004742098276395703",
            "extra": "mean: 22.308448739133393 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 31.5725634055962,
            "unit": "iter/sec",
            "range": "stddev: 0.005421268791958832",
            "extra": "mean: 31.6730696571426 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 18.2550758010069,
            "unit": "iter/sec",
            "range": "stddev: 0.010803042738273061",
            "extra": "mean: 54.779285000002176 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 14.987506115154142,
            "unit": "iter/sec",
            "range": "stddev: 0.019759406639013977",
            "extra": "mean: 66.72224133332507 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 72.87624611994003,
            "unit": "iter/sec",
            "range": "stddev: 0.0058829628510686585",
            "extra": "mean: 13.72189229332965 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 68.15101500052893,
            "unit": "iter/sec",
            "range": "stddev: 0.002794225224273799",
            "extra": "mean: 14.673295768114956 msec\nrounds: 69"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 42.56809693492247,
            "unit": "iter/sec",
            "range": "stddev: 0.0015183580749774336",
            "extra": "mean: 23.491771350003887 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 24.319490683136745,
            "unit": "iter/sec",
            "range": "stddev: 0.014977874659642785",
            "extra": "mean: 41.119282185190045 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 16.030015929489917,
            "unit": "iter/sec",
            "range": "stddev: 0.014478790356572123",
            "extra": "mean: 62.38296982352535 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 10.997931222303219,
            "unit": "iter/sec",
            "range": "stddev: 0.02429038018061497",
            "extra": "mean: 90.92619146154081 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 81.85518102438361,
            "unit": "iter/sec",
            "range": "stddev: 0.001444371857965089",
            "extra": "mean: 12.216697678575931 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 64.14980526456738,
            "unit": "iter/sec",
            "range": "stddev: 0.0039900328043393374",
            "extra": "mean: 15.588511857141084 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 34.62137587776564,
            "unit": "iter/sec",
            "range": "stddev: 0.015935377592048196",
            "extra": "mean: 28.88388963889257 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 20.737281184669268,
            "unit": "iter/sec",
            "range": "stddev: 0.03580677989005012",
            "extra": "mean: 48.222329199995784 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 11.779143777510908,
            "unit": "iter/sec",
            "range": "stddev: 0.043329411600066585",
            "extra": "mean: 84.8958140666582 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 9.813320324272269,
            "unit": "iter/sec",
            "range": "stddev: 0.05897317811884538",
            "extra": "mean: 101.90230900000276 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.5143639408146021,
            "unit": "iter/sec",
            "range": "stddev: 0.04474244039734858",
            "extra": "mean: 660.3432458000043 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 27.236980448516476,
            "unit": "iter/sec",
            "range": "stddev: 0.03392505777948487",
            "extra": "mean: 36.71478936111169 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.5899202145180266,
            "unit": "iter/sec",
            "range": "stddev: 0.09974163732534018",
            "extra": "mean: 1.6951444879999826 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 11.973221250421018,
            "unit": "iter/sec",
            "range": "stddev: 0.05891021647488052",
            "extra": "mean: 83.51971278947482 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.242064443965733,
            "unit": "iter/sec",
            "range": "stddev: 0.014470875174848092",
            "extra": "mean: 160.20340850000517 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 3.9639382839294726,
            "unit": "iter/sec",
            "range": "stddev: 0.022641633031732073",
            "extra": "mean: 252.27436159997296 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 95.33873693260895,
            "unit": "iter/sec",
            "range": "stddev: 0.003158290361686382",
            "extra": "mean: 10.48891596609738 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 81.49847701006115,
            "unit": "iter/sec",
            "range": "stddev: 0.0007031641432115005",
            "extra": "mean: 12.270167942850614 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 121.17394413603097,
            "unit": "iter/sec",
            "range": "stddev: 0.0029597612821808065",
            "extra": "mean: 8.252599245902163 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 126.78092091417525,
            "unit": "iter/sec",
            "range": "stddev: 0.001257604146710763",
            "extra": "mean: 7.887622149999629 msec\nrounds: 20"
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
          "id": "1043f4db0b067fe44c35d1456761d61a4e2ad3cc",
          "message": "Merge pull request #71 from developmentseed/OGCTile1.0TMS2.0\n\nOGC Tiles 1.0 impl",
          "timestamp": "2023-06-12T10:07:03+02:00",
          "tree_id": "a6672ba8d5f7c714fe59cccb77e4c7b6e2993aa6",
          "url": "https://github.com/developmentseed/tipg/commit/1043f4db0b067fe44c35d1456761d61a4e2ad3cc"
        },
        "date": 1686557646393,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 100.45516954860068,
            "unit": "iter/sec",
            "range": "stddev: 0.0019954433789014727",
            "extra": "mean: 9.954689285713616 msec\nrounds: 70"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 88.4560387640328,
            "unit": "iter/sec",
            "range": "stddev: 0.0015946650193992644",
            "extra": "mean: 11.305050666666425 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 49.75582980918972,
            "unit": "iter/sec",
            "range": "stddev: 0.0016099668071587997",
            "extra": "mean: 20.09814736956319 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 31.04743473131651,
            "unit": "iter/sec",
            "range": "stddev: 0.0017205571067393157",
            "extra": "mean: 32.208780166669726 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 19.088444139381636,
            "unit": "iter/sec",
            "range": "stddev: 0.0029483997944523255",
            "extra": "mean: 52.38771649999939 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 14.904848462806328,
            "unit": "iter/sec",
            "range": "stddev: 0.011435608070722317",
            "extra": "mean: 67.09226212499964 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 98.11796892218358,
            "unit": "iter/sec",
            "range": "stddev: 0.0021352936714991886",
            "extra": "mean: 10.191813089741904 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 81.68006360793929,
            "unit": "iter/sec",
            "range": "stddev: 0.0015312793345593685",
            "extra": "mean: 12.242889584415067 msec\nrounds: 77"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 43.6874000514222,
            "unit": "iter/sec",
            "range": "stddev: 0.003931808460919712",
            "extra": "mean: 22.889894999998884 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 26.25667186134501,
            "unit": "iter/sec",
            "range": "stddev: 0.0029973657418348337",
            "extra": "mean: 38.08555803571575 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 14.962754311494065,
            "unit": "iter/sec",
            "range": "stddev: 0.008939640124609977",
            "extra": "mean: 66.83261511764726 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 12.59763693904227,
            "unit": "iter/sec",
            "range": "stddev: 0.00816667624683857",
            "extra": "mean: 79.37996664285711 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 97.62968081522544,
            "unit": "iter/sec",
            "range": "stddev: 0.001596698485622393",
            "extra": "mean: 10.242786739133221 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 77.97541252558933,
            "unit": "iter/sec",
            "range": "stddev: 0.0012638697009224524",
            "extra": "mean: 12.824555428569592 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 38.66601309647688,
            "unit": "iter/sec",
            "range": "stddev: 0.011681649733551711",
            "extra": "mean: 25.862506111112776 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 23.925077490574377,
            "unit": "iter/sec",
            "range": "stddev: 0.01488879722507448",
            "extra": "mean: 41.7971478000004 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 14.812344680003644,
            "unit": "iter/sec",
            "range": "stddev: 0.002250367493431275",
            "extra": "mean: 67.51125642856388 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 10.96530743316464,
            "unit": "iter/sec",
            "range": "stddev: 0.028273086351442683",
            "extra": "mean: 91.19671346153908 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.7090101655321988,
            "unit": "iter/sec",
            "range": "stddev: 0.05008282241398545",
            "extra": "mean: 585.1340268000058 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 37.15198668912911,
            "unit": "iter/sec",
            "range": "stddev: 0.02207144174245578",
            "extra": "mean: 26.91646097872354 msec\nrounds: 47"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6710012014805262,
            "unit": "iter/sec",
            "range": "stddev: 0.08248143909203408",
            "extra": "mean: 1.4903102972 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.931465640802541,
            "unit": "iter/sec",
            "range": "stddev: 0.04004768963425336",
            "extra": "mean: 71.7799566666694 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.91286794500066,
            "unit": "iter/sec",
            "range": "stddev: 0.014453680970789794",
            "extra": "mean: 144.65776114285435 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.218906264464574,
            "unit": "iter/sec",
            "range": "stddev: 0.01652982750860733",
            "extra": "mean: 237.02825740000435 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 132.60562468975255,
            "unit": "iter/sec",
            "range": "stddev: 0.0006182692967941074",
            "extra": "mean: 7.541158245282771 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 89.57799880560064,
            "unit": "iter/sec",
            "range": "stddev: 0.0015123983307441544",
            "extra": "mean: 11.163455461537698 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 166.4885883727124,
            "unit": "iter/sec",
            "range": "stddev: 0.0004714092087127355",
            "extra": "mean: 6.006417675674765 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 142.60027536190444,
            "unit": "iter/sec",
            "range": "stddev: 0.0010129059846049743",
            "extra": "mean: 7.012609179485143 msec\nrounds: 39"
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
          "id": "e849f4f129a28f07fbde92d1448a1a2f297a3f5f",
          "message": "add customization docs",
          "timestamp": "2023-06-12T10:39:56+02:00",
          "tree_id": "d3c45fd4233c82f611ed7a81894e5b6922c08468",
          "url": "https://github.com/developmentseed/tipg/commit/e849f4f129a28f07fbde92d1448a1a2f297a3f5f"
        },
        "date": 1686559530297,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 166.0590311872493,
            "unit": "iter/sec",
            "range": "stddev: 0.00017665415164649467",
            "extra": "mean: 6.021954920791951 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 135.01634289743296,
            "unit": "iter/sec",
            "range": "stddev: 0.00011942528912455735",
            "extra": "mean: 7.406510786325058 msec\nrounds: 117"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 69.6314677248426,
            "unit": "iter/sec",
            "range": "stddev: 0.004516527894378161",
            "extra": "mean: 14.361323014928027 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 46.382342843192426,
            "unit": "iter/sec",
            "range": "stddev: 0.0005492744244705614",
            "extra": "mean: 21.559928600001083 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 26.117339061992784,
            "unit": "iter/sec",
            "range": "stddev: 0.007120542755091601",
            "extra": "mean: 38.28873981481706 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 22.19998622268995,
            "unit": "iter/sec",
            "range": "stddev: 0.00038760402847938893",
            "extra": "mean: 45.04507299999716 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 163.8020786725383,
            "unit": "iter/sec",
            "range": "stddev: 0.00014723536611577733",
            "extra": "mean: 6.104928631578177 msec\nrounds: 133"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 131.27996790613292,
            "unit": "iter/sec",
            "range": "stddev: 0.0001817883328186278",
            "extra": "mean: 7.617308382608796 msec\nrounds: 115"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 66.60320666745783,
            "unit": "iter/sec",
            "range": "stddev: 0.004772355347540976",
            "extra": "mean: 15.01429210447607 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 44.85938106126532,
            "unit": "iter/sec",
            "range": "stddev: 0.0006951940088675689",
            "extra": "mean: 22.291881348837176 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.746876152559146,
            "unit": "iter/sec",
            "range": "stddev: 0.0010610699900993998",
            "extra": "mean: 38.83966326923135 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 21.291167208116292,
            "unit": "iter/sec",
            "range": "stddev: 0.0008419781633931977",
            "extra": "mean: 46.967833666666955 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 156.9123514238593,
            "unit": "iter/sec",
            "range": "stddev: 0.0001631586934812091",
            "extra": "mean: 6.3729846052638095 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 117.36808647551216,
            "unit": "iter/sec",
            "range": "stddev: 0.0011193659684374272",
            "extra": "mean: 8.520203660376122 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 56.668768028530465,
            "unit": "iter/sec",
            "range": "stddev: 0.005863106816632122",
            "extra": "mean: 17.64640444444707 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 33.40782811912969,
            "unit": "iter/sec",
            "range": "stddev: 0.010816393347646561",
            "extra": "mean: 29.933104194444443 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.173929390456877,
            "unit": "iter/sec",
            "range": "stddev: 0.017541131990634198",
            "extra": "mean: 55.023873952382566 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.798238298978825,
            "unit": "iter/sec",
            "range": "stddev: 0.020490950461684563",
            "extra": "mean: 67.57561135294101 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.5995395377387154,
            "unit": "iter/sec",
            "range": "stddev: 0.014580152258281994",
            "extra": "mean: 384.6835123999995 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 51.55956974075086,
            "unit": "iter/sec",
            "range": "stddev: 0.014626160443898332",
            "extra": "mean: 19.395041600000695 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9207990552471996,
            "unit": "iter/sec",
            "range": "stddev: 0.048351226476625264",
            "extra": "mean: 1.0860132776000058 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 21.877135148567756,
            "unit": "iter/sec",
            "range": "stddev: 0.021891357968789774",
            "extra": "mean: 45.70982412500513 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 9.066471123166785,
            "unit": "iter/sec",
            "range": "stddev: 0.009091861833016933",
            "extra": "mean: 110.29649644444186 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.566937835208485,
            "unit": "iter/sec",
            "range": "stddev: 0.011798940191351248",
            "extra": "mean: 179.63196816666974 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 197.34953295999983,
            "unit": "iter/sec",
            "range": "stddev: 0.00011796439891209797",
            "extra": "mean: 5.06715159139843 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 133.1044708961619,
            "unit": "iter/sec",
            "range": "stddev: 0.00023927444152076042",
            "extra": "mean: 7.512895647060006 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 252.97493753428833,
            "unit": "iter/sec",
            "range": "stddev: 0.00011700963917532416",
            "extra": "mean: 3.952960754716896 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 230.45169245756037,
            "unit": "iter/sec",
            "range": "stddev: 0.0001462436567037166",
            "extra": "mean: 4.33930421311251 msec\nrounds: 61"
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
          "id": "2543707238a97a0527effff710a83f9bea66440f",
          "message": "Merge pull request #74 from developmentseed/fixAndTestFunctions\n\nfix and tests functions",
          "timestamp": "2023-06-12T17:17:17+02:00",
          "tree_id": "e17da1c558c961f0764c8c53f580a3a5fa56c331",
          "url": "https://github.com/developmentseed/tipg/commit/2543707238a97a0527effff710a83f9bea66440f"
        },
        "date": 1686583366697,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 154.13374129659763,
            "unit": "iter/sec",
            "range": "stddev: 0.0002069151581806682",
            "extra": "mean: 6.487872101123611 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 131.67377135315465,
            "unit": "iter/sec",
            "range": "stddev: 0.00032684823051184174",
            "extra": "mean: 7.594526910890686 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 66.88945905607359,
            "unit": "iter/sec",
            "range": "stddev: 0.006372819492800623",
            "extra": "mean: 14.950038677419974 msec\nrounds: 62"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 45.07250135632739,
            "unit": "iter/sec",
            "range": "stddev: 0.0004678886519374587",
            "extra": "mean: 22.18647667442174 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.5335877573322,
            "unit": "iter/sec",
            "range": "stddev: 0.009984580363935333",
            "extra": "mean: 39.1641006153881 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 21.06316929456701,
            "unit": "iter/sec",
            "range": "stddev: 0.01047848635299372",
            "extra": "mean: 47.476236173914145 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 157.88761276584725,
            "unit": "iter/sec",
            "range": "stddev: 0.00030796927690013396",
            "extra": "mean: 6.333619100841269 msec\nrounds: 119"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 126.90472459146939,
            "unit": "iter/sec",
            "range": "stddev: 0.0002205564725498341",
            "extra": "mean: 7.8799272699987455 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 68.4002015261405,
            "unit": "iter/sec",
            "range": "stddev: 0.00027081864921567496",
            "extra": "mean: 14.619839966667788 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 42.73885216823415,
            "unit": "iter/sec",
            "range": "stddev: 0.0003938100812924304",
            "extra": "mean: 23.397914292683193 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.083576185300608,
            "unit": "iter/sec",
            "range": "stddev: 0.011919352888388647",
            "extra": "mean: 43.32084387499672 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.14707268367902,
            "unit": "iter/sec",
            "range": "stddev: 0.0010388308653183108",
            "extra": "mean: 49.63500234999856 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 146.0827490845126,
            "unit": "iter/sec",
            "range": "stddev: 0.00034332298710634975",
            "extra": "mean: 6.8454352499998095 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 110.80132885957629,
            "unit": "iter/sec",
            "range": "stddev: 0.0004879736244051541",
            "extra": "mean: 9.025162516483416 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 52.72141566375115,
            "unit": "iter/sec",
            "range": "stddev: 0.007985944277379337",
            "extra": "mean: 18.967624207548635 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 31.102507723577922,
            "unit": "iter/sec",
            "range": "stddev: 0.015349945984146756",
            "extra": "mean: 32.15174830555315 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.89098796724713,
            "unit": "iter/sec",
            "range": "stddev: 0.024889117661481924",
            "extra": "mean: 59.20316809999946 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.800136490493419,
            "unit": "iter/sec",
            "range": "stddev: 0.02853194784057574",
            "extra": "mean: 72.4630514117651 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.0269430373553456,
            "unit": "iter/sec",
            "range": "stddev: 0.023724738840734814",
            "extra": "mean: 493.35377539999854 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 43.034273648858544,
            "unit": "iter/sec",
            "range": "stddev: 0.019264304449286177",
            "extra": "mean: 23.237292399996726 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.8023856711793779,
            "unit": "iter/sec",
            "range": "stddev: 0.07631516621093837",
            "extra": "mean: 1.2462834717999898 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.091687624545052,
            "unit": "iter/sec",
            "range": "stddev: 0.03764543384092538",
            "extra": "mean: 62.143885919999775 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.853056690603838,
            "unit": "iter/sec",
            "range": "stddev: 0.007731087295376544",
            "extra": "mean: 112.95533677778735 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.3770394827343635,
            "unit": "iter/sec",
            "range": "stddev: 0.010843957210753959",
            "extra": "mean: 185.97594516666524 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 189.94051681377815,
            "unit": "iter/sec",
            "range": "stddev: 0.00021670132320825475",
            "extra": "mean: 5.264806144443746 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 130.7658932212932,
            "unit": "iter/sec",
            "range": "stddev: 0.00014536210988581628",
            "extra": "mean: 7.6472539999991795 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 244.90790514665778,
            "unit": "iter/sec",
            "range": "stddev: 0.00013875182257612297",
            "extra": "mean: 4.0831675049491425 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 223.78191961150753,
            "unit": "iter/sec",
            "range": "stddev: 0.0001115368386294779",
            "extra": "mean: 4.4686362586219275 msec\nrounds: 58"
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
          "id": "58b9994084f3fe0e87cffe0b3cb47daa1215002f",
          "message": "Merge pull request #76 from developmentseed/Annotations\n\nswitch to Annotation type hint",
          "timestamp": "2023-06-14T23:28:54+02:00",
          "tree_id": "c0b583bdc6cca223ccdc065cc7da420612adf808",
          "url": "https://github.com/developmentseed/tipg/commit/58b9994084f3fe0e87cffe0b3cb47daa1215002f"
        },
        "date": 1686778455324,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 162.39311616508706,
            "unit": "iter/sec",
            "range": "stddev: 0.0001836597858730831",
            "extra": "mean: 6.157896489795855 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 133.65287971035795,
            "unit": "iter/sec",
            "range": "stddev: 0.00020929146083126698",
            "extra": "mean: 7.482068490908101 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 71.89799414341714,
            "unit": "iter/sec",
            "range": "stddev: 0.00021169207085051123",
            "extra": "mean: 13.908593861537629 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 43.797845325877155,
            "unit": "iter/sec",
            "range": "stddev: 0.005444447501359034",
            "extra": "mean: 22.832173422220116 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.232223899234384,
            "unit": "iter/sec",
            "range": "stddev: 0.00869871964769842",
            "extra": "mean: 39.631861384613934 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.582719524279952,
            "unit": "iter/sec",
            "range": "stddev: 0.010433393360003866",
            "extra": "mean: 48.58444477273141 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 164.16615537379056,
            "unit": "iter/sec",
            "range": "stddev: 0.00020926694186553782",
            "extra": "mean: 6.091389529852217 msec\nrounds: 134"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 131.19345263959326,
            "unit": "iter/sec",
            "range": "stddev: 0.00022464854152721414",
            "extra": "mean: 7.622331601769334 msec\nrounds: 113"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 70.78700900079673,
            "unit": "iter/sec",
            "range": "stddev: 0.00025861527578684385",
            "extra": "mean: 14.126885909090252 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 44.13715463963566,
            "unit": "iter/sec",
            "range": "stddev: 0.0004557082765567105",
            "extra": "mean: 22.656648534882873 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.18593941150609,
            "unit": "iter/sec",
            "range": "stddev: 0.0007297708410755209",
            "extra": "mean: 39.70469330769351 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 21.083481965439262,
            "unit": "iter/sec",
            "range": "stddev: 0.0009291407372889449",
            "extra": "mean: 47.43049566666611 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 154.59809196702892,
            "unit": "iter/sec",
            "range": "stddev: 0.00021575570264052246",
            "extra": "mean: 6.46838513513653 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 117.29409431982074,
            "unit": "iter/sec",
            "range": "stddev: 0.00033352626054855485",
            "extra": "mean: 8.525578425741905 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 54.741773762848645,
            "unit": "iter/sec",
            "range": "stddev: 0.00637504717509847",
            "extra": "mean: 18.267584903846604 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 35.97186029285098,
            "unit": "iter/sec",
            "range": "stddev: 0.0004674938630394849",
            "extra": "mean: 27.79950749999825 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.492131069355587,
            "unit": "iter/sec",
            "range": "stddev: 0.015549669410787543",
            "extra": "mean: 54.0770555999984 msec\nrounds: 10"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.49182329260827,
            "unit": "iter/sec",
            "range": "stddev: 0.021593334417382398",
            "extra": "mean: 69.00442958823974 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.4589457757447586,
            "unit": "iter/sec",
            "range": "stddev: 0.025149951812374848",
            "extra": "mean: 406.6783456000053 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 53.4417476853929,
            "unit": "iter/sec",
            "range": "stddev: 0.013735711657333519",
            "extra": "mean: 18.711962899995648 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.8852691457942962,
            "unit": "iter/sec",
            "range": "stddev: 0.05424893433360473",
            "extra": "mean: 1.1295999693999987 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 21.03175446322664,
            "unit": "iter/sec",
            "range": "stddev: 0.023455335785626176",
            "extra": "mean: 47.547150749998934 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 9.145837280545615,
            "unit": "iter/sec",
            "range": "stddev: 0.008564639911561304",
            "extra": "mean: 109.33936055555351 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.482782707593804,
            "unit": "iter/sec",
            "range": "stddev: 0.011561812248786713",
            "extra": "mean: 182.38913583333746 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 197.8273599777915,
            "unit": "iter/sec",
            "range": "stddev: 0.00012344781218381852",
            "extra": "mean: 5.054912526317199 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 132.21066980082182,
            "unit": "iter/sec",
            "range": "stddev: 0.00017983807257754205",
            "extra": "mean: 7.563686058822039 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 253.88108695462654,
            "unit": "iter/sec",
            "range": "stddev: 0.00014787951388429084",
            "extra": "mean: 3.9388518932043146 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 230.6020868286504,
            "unit": "iter/sec",
            "range": "stddev: 0.00022347625601912697",
            "extra": "mean: 4.336474200006061 msec\nrounds: 60"
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
          "id": "9401d5c2e7dc7bbd31d486b32caa61f8f1842e6b",
          "message": "Merge pull request #75 from developmentseed/FixFunctionsAndDocs\n\nfix function parameters and add docs",
          "timestamp": "2023-06-14T23:44:05+02:00",
          "tree_id": "5a8d44c47dffce3c0ead5a5f76ebf5c0426159ea",
          "url": "https://github.com/developmentseed/tipg/commit/9401d5c2e7dc7bbd31d486b32caa61f8f1842e6b"
        },
        "date": 1686779398809,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 143.3725060706479,
            "unit": "iter/sec",
            "range": "stddev: 0.00026640640440286846",
            "extra": "mean: 6.9748379756104875 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 117.56009217190204,
            "unit": "iter/sec",
            "range": "stddev: 0.0006112868475210118",
            "extra": "mean: 8.506287988765369 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 65.58225445567646,
            "unit": "iter/sec",
            "range": "stddev: 0.00027650736865122966",
            "extra": "mean: 15.248027203393052 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 39.84173992352892,
            "unit": "iter/sec",
            "range": "stddev: 0.00923772552204825",
            "extra": "mean: 25.09930544999719 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 23.677222419990184,
            "unit": "iter/sec",
            "range": "stddev: 0.013823121588774615",
            "extra": "mean: 42.234683708327246 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 18.87383537942876,
            "unit": "iter/sec",
            "range": "stddev: 0.016980379356131253",
            "extra": "mean: 52.98340161904423 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 150.2190184330633,
            "unit": "iter/sec",
            "range": "stddev: 0.000686732757978137",
            "extra": "mean: 6.656946706422491 msec\nrounds: 109"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 123.00461845190486,
            "unit": "iter/sec",
            "range": "stddev: 0.00023160361540627044",
            "extra": "mean: 8.129776040815921 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 65.7366576485575,
            "unit": "iter/sec",
            "range": "stddev: 0.0005071169512530902",
            "extra": "mean: 15.212212421054597 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 40.98909011886117,
            "unit": "iter/sec",
            "range": "stddev: 0.0006948239955725141",
            "extra": "mean: 24.39673574358873 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.58757212994754,
            "unit": "iter/sec",
            "range": "stddev: 0.0006211964089368848",
            "extra": "mean: 42.39520686956874 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.22616463828603,
            "unit": "iter/sec",
            "range": "stddev: 0.00034287462570205984",
            "extra": "mean: 52.012453799997616 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 144.18333588399426,
            "unit": "iter/sec",
            "range": "stddev: 0.00029513660474572066",
            "extra": "mean: 6.9356142571466854 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 111.51607884979737,
            "unit": "iter/sec",
            "range": "stddev: 0.0004103962596192123",
            "extra": "mean: 8.96731673418068 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 51.42518756894164,
            "unit": "iter/sec",
            "range": "stddev: 0.009135406614212756",
            "extra": "mean: 19.44572392000282 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 30.190253571199737,
            "unit": "iter/sec",
            "range": "stddev: 0.01627305678713746",
            "extra": "mean: 33.123272636370274 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.103852637716635,
            "unit": "iter/sec",
            "range": "stddev: 0.02623262930818254",
            "extra": "mean: 62.096941799995875 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 12.884665487380097,
            "unit": "iter/sec",
            "range": "stddev: 0.03053572329735004",
            "extra": "mean: 77.6116385000023 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.9165363807471005,
            "unit": "iter/sec",
            "range": "stddev: 0.032497534576550705",
            "extra": "mean: 521.7745981999997 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 42.4269993106533,
            "unit": "iter/sec",
            "range": "stddev: 0.020470939083002477",
            "extra": "mean: 23.569896911113926 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7534776905970294,
            "unit": "iter/sec",
            "range": "stddev: 0.047340850527359486",
            "extra": "mean: 1.3271793079999952 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.099482480257915,
            "unit": "iter/sec",
            "range": "stddev: 0.038459991822453",
            "extra": "mean: 62.11379783333134 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 9.027830340858001,
            "unit": "iter/sec",
            "range": "stddev: 0.008201123010524525",
            "extra": "mean: 110.7685858333222 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.308419423297891,
            "unit": "iter/sec",
            "range": "stddev: 0.008262805857336067",
            "extra": "mean: 188.3799903999943 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 179.3993521629623,
            "unit": "iter/sec",
            "range": "stddev: 0.0013028310344591753",
            "extra": "mean: 5.574156137930882 msec\nrounds: 87"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 128.14535811007667,
            "unit": "iter/sec",
            "range": "stddev: 0.00015943179767319567",
            "extra": "mean: 7.803638108693734 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 240.63243606783817,
            "unit": "iter/sec",
            "range": "stddev: 0.00017023428400054824",
            "extra": "mean: 4.155715731182989 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 219.6888767751859,
            "unit": "iter/sec",
            "range": "stddev: 0.00017119953469641204",
            "extra": "mean: 4.551891814820145 msec\nrounds: 54"
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
          "id": "eea26680d19570e335b87e144d47a0e97e7355bb",
          "message": "Merge pull request #78 from developmentseed/FastAPILifespan\n\nuse new lifespan style",
          "timestamp": "2023-06-15T11:00:22+02:00",
          "tree_id": "054d9f83ce437cd305813a1d1cd08e08e635deb3",
          "url": "https://github.com/developmentseed/tipg/commit/eea26680d19570e335b87e144d47a0e97e7355bb"
        },
        "date": 1686819950447,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 146.35730094037808,
            "unit": "iter/sec",
            "range": "stddev: 0.0014847317216275283",
            "extra": "mean: 6.832593888892309 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 124.48580186840496,
            "unit": "iter/sec",
            "range": "stddev: 0.0002598686560698657",
            "extra": "mean: 8.033044612245089 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 68.55085203431086,
            "unit": "iter/sec",
            "range": "stddev: 0.0006225553803816377",
            "extra": "mean: 14.587710733332433 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 41.53215103390125,
            "unit": "iter/sec",
            "range": "stddev: 0.007724414712050469",
            "extra": "mean: 24.07773195237913 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.68464006942285,
            "unit": "iter/sec",
            "range": "stddev: 0.009473505997073885",
            "extra": "mean: 40.51102212499794 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 19.717526800678304,
            "unit": "iter/sec",
            "range": "stddev: 0.014328126228963496",
            "extra": "mean: 50.71629977272804 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 154.1880319993054,
            "unit": "iter/sec",
            "range": "stddev: 0.00021804907421863254",
            "extra": "mean: 6.485587675212723 msec\nrounds: 117"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 124.04426894971888,
            "unit": "iter/sec",
            "range": "stddev: 0.0003169849883235513",
            "extra": "mean: 8.061638062499673 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 66.06549292312096,
            "unit": "iter/sec",
            "range": "stddev: 0.0003136774713350361",
            "extra": "mean: 15.136494949998772 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 41.4105832658183,
            "unit": "iter/sec",
            "range": "stddev: 0.0007682594603011604",
            "extra": "mean: 24.148416205125844 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 24.110205434461662,
            "unit": "iter/sec",
            "range": "stddev: 0.00047892959021615206",
            "extra": "mean: 41.47621233333254 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.83358898879312,
            "unit": "iter/sec",
            "range": "stddev: 0.0003571319869052622",
            "extra": "mean: 50.41951814999521 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 146.91780344347515,
            "unit": "iter/sec",
            "range": "stddev: 0.0003324197903772264",
            "extra": "mean: 6.806527027779434 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 113.89748998855217,
            "unit": "iter/sec",
            "range": "stddev: 0.0003195171647423013",
            "extra": "mean: 8.779824736265127 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 53.43075730421689,
            "unit": "iter/sec",
            "range": "stddev: 0.007708209426768538",
            "extra": "mean: 18.71581183673542 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 31.090113995417024,
            "unit": "iter/sec",
            "range": "stddev: 0.01433456520947848",
            "extra": "mean: 32.16456524242431 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.855754904438477,
            "unit": "iter/sec",
            "range": "stddev: 0.022877436290499105",
            "extra": "mean: 59.32691865000237 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.881333417468825,
            "unit": "iter/sec",
            "range": "stddev: 0.025076126569327194",
            "extra": "mean: 72.03918888235621 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.1020469269683795,
            "unit": "iter/sec",
            "range": "stddev: 0.023214958901069938",
            "extra": "mean: 475.72677239999734 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 45.646473892310034,
            "unit": "iter/sec",
            "range": "stddev: 0.018025268342354118",
            "extra": "mean: 21.907497222221757 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.8087022365754895,
            "unit": "iter/sec",
            "range": "stddev: 0.06174594103706953",
            "extra": "mean: 1.2365490717999932 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 17.060213665868908,
            "unit": "iter/sec",
            "range": "stddev: 0.03387354610315027",
            "extra": "mean: 58.615913000001 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.787506150278158,
            "unit": "iter/sec",
            "range": "stddev: 0.007891384304570955",
            "extra": "mean: 113.79792888888574 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.3528631235919075,
            "unit": "iter/sec",
            "range": "stddev: 0.010919612288713893",
            "extra": "mean: 186.81591083333635 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 183.77067900773994,
            "unit": "iter/sec",
            "range": "stddev: 0.00018814073825443257",
            "extra": "mean: 5.441564483515254 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 129.15390090227967,
            "unit": "iter/sec",
            "range": "stddev: 0.0001673565641640504",
            "extra": "mean: 7.742700708332606 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 242.88584055260714,
            "unit": "iter/sec",
            "range": "stddev: 0.00009977727045319261",
            "extra": "mean: 4.117160546390138 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 221.4360802017493,
            "unit": "iter/sec",
            "range": "stddev: 0.00015953075543198252",
            "extra": "mean: 4.515975892857682 msec\nrounds: 56"
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
          "id": "43606f12f0912048e712bd1fb0dc47e026e1bf44",
          "message": "Merge pull request #79 from developmentseed/rewriteMiddleWare\n\nrewrite middleware in pure asgi",
          "timestamp": "2023-06-15T11:03:47+02:00",
          "tree_id": "d275b74db9c78ae12de8500a771ec2f7e793435c",
          "url": "https://github.com/developmentseed/tipg/commit/43606f12f0912048e712bd1fb0dc47e026e1bf44"
        },
        "date": 1686820179334,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 145.0064251311301,
            "unit": "iter/sec",
            "range": "stddev: 0.00040406501205087045",
            "extra": "mean: 6.896246142856736 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 118.06851199011025,
            "unit": "iter/sec",
            "range": "stddev: 0.0003339857836942505",
            "extra": "mean: 8.469658701921837 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 65.40307483040732,
            "unit": "iter/sec",
            "range": "stddev: 0.0009791874611491428",
            "extra": "mean: 15.289801016130179 msec\nrounds: 62"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 40.978016025181255,
            "unit": "iter/sec",
            "range": "stddev: 0.007334637972832053",
            "extra": "mean: 24.403328833330868 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.655282366828366,
            "unit": "iter/sec",
            "range": "stddev: 0.009626810551089562",
            "extra": "mean: 40.55925968000338 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 19.75715226873119,
            "unit": "iter/sec",
            "range": "stddev: 0.014199429229015513",
            "extra": "mean: 50.61458181818326 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 144.8009366058645,
            "unit": "iter/sec",
            "range": "stddev: 0.00028940412778338077",
            "extra": "mean: 6.906032677964733 msec\nrounds: 118"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 113.43918982920273,
            "unit": "iter/sec",
            "range": "stddev: 0.000624494721579905",
            "extra": "mean: 8.815295679611504 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 62.787966310746675,
            "unit": "iter/sec",
            "range": "stddev: 0.0007072602315345966",
            "extra": "mean: 15.926618725805772 msec\nrounds: 62"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 40.951292421198225,
            "unit": "iter/sec",
            "range": "stddev: 0.0004703731375603104",
            "extra": "mean: 24.41925372500222 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.891465278138,
            "unit": "iter/sec",
            "range": "stddev: 0.0009450024126488702",
            "extra": "mean: 41.85595100000228 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.15871368538036,
            "unit": "iter/sec",
            "range": "stddev: 0.0013258038146423947",
            "extra": "mean: 49.60633975000235 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 140.5689184924779,
            "unit": "iter/sec",
            "range": "stddev: 0.0002684108563056191",
            "extra": "mean: 7.113948166667526 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 107.47106032722158,
            "unit": "iter/sec",
            "range": "stddev: 0.000318401471383164",
            "extra": "mean: 9.304830499999337 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 52.06570275547803,
            "unit": "iter/sec",
            "range": "stddev: 0.007160078506674616",
            "extra": "mean: 19.206501537036996 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 30.988330866040545,
            "unit": "iter/sec",
            "range": "stddev: 0.014143087489476555",
            "extra": "mean: 32.27021178787912 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.95456629344153,
            "unit": "iter/sec",
            "range": "stddev: 0.02186688872719695",
            "extra": "mean: 58.98116074999962 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.103798327444625,
            "unit": "iter/sec",
            "range": "stddev: 0.023964507930604086",
            "extra": "mean: 70.90288564705982 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.290586659351642,
            "unit": "iter/sec",
            "range": "stddev: 0.023368183953737895",
            "extra": "mean: 436.5693809999982 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 47.24602531509841,
            "unit": "iter/sec",
            "range": "stddev: 0.017082377586703966",
            "extra": "mean: 21.16580163793017 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.8712929992884202,
            "unit": "iter/sec",
            "range": "stddev: 0.0801631195005101",
            "extra": "mean: 1.14771953959999 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 18.728436345936927,
            "unit": "iter/sec",
            "range": "stddev: 0.029340099174760482",
            "extra": "mean: 53.3947405714384 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.805024246234053,
            "unit": "iter/sec",
            "range": "stddev: 0.008198032721053723",
            "extra": "mean: 113.57152144444171 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.301022737448977,
            "unit": "iter/sec",
            "range": "stddev: 0.011218538653381002",
            "extra": "mean: 188.64284299999667 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 188.6251474499081,
            "unit": "iter/sec",
            "range": "stddev: 0.0002493874078339622",
            "extra": "mean: 5.301520043956828 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 127.65599432851998,
            "unit": "iter/sec",
            "range": "stddev: 0.00018290976799068033",
            "extra": "mean: 7.833553020835993 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 243.5827051070738,
            "unit": "iter/sec",
            "range": "stddev: 0.00031471208747926914",
            "extra": "mean: 4.10538178217711 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 221.02238689999731,
            "unit": "iter/sec",
            "range": "stddev: 0.00020360249467102817",
            "extra": "mean: 4.52442856140385 msec\nrounds: 57"
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
          "id": "0fe15d3caa05fb7acda968652e16d5ae7a42949e",
          "message": "update webpage logo",
          "timestamp": "2023-06-15T11:23:29+02:00",
          "tree_id": "1a14fa59e8ef5c8b673f80d9dfee6cea5168eeb9",
          "url": "https://github.com/developmentseed/tipg/commit/0fe15d3caa05fb7acda968652e16d5ae7a42949e"
        },
        "date": 1686821350915,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 164.36038295354751,
            "unit": "iter/sec",
            "range": "stddev: 0.00013357248309889502",
            "extra": "mean: 6.084191226803274 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 133.07126325439546,
            "unit": "iter/sec",
            "range": "stddev: 0.00019369743937324037",
            "extra": "mean: 7.514770473684289 msec\nrounds: 114"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 71.07792785638473,
            "unit": "iter/sec",
            "range": "stddev: 0.0002750354717130788",
            "extra": "mean: 14.069065181817521 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 44.944226000084115,
            "unit": "iter/sec",
            "range": "stddev: 0.0002623063905632816",
            "extra": "mean: 22.249799117647026 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.47173194458343,
            "unit": "iter/sec",
            "range": "stddev: 0.0067351884893610695",
            "extra": "mean: 39.25920711538621 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.189657790899854,
            "unit": "iter/sec",
            "range": "stddev: 0.011380307742074415",
            "extra": "mean: 49.53030954545119 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 160.64040609586291,
            "unit": "iter/sec",
            "range": "stddev: 0.0006597266314103265",
            "extra": "mean: 6.225083864661331 msec\nrounds: 133"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 129.24938175125703,
            "unit": "iter/sec",
            "range": "stddev: 0.000372829644541792",
            "extra": "mean: 7.73698091588956 msec\nrounds: 107"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 70.2872756711046,
            "unit": "iter/sec",
            "range": "stddev: 0.0003361144329964693",
            "extra": "mean: 14.22732621874978 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 43.91160985078171,
            "unit": "iter/sec",
            "range": "stddev: 0.0008497924549274267",
            "extra": "mean: 22.77302069767315 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.353764736156425,
            "unit": "iter/sec",
            "range": "stddev: 0.0006042135906670618",
            "extra": "mean: 39.44187423076947 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.878383271296048,
            "unit": "iter/sec",
            "range": "stddev: 0.0014655044241986426",
            "extra": "mean: 47.896428904761834 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 153.62314714663114,
            "unit": "iter/sec",
            "range": "stddev: 0.00027311032007267314",
            "extra": "mean: 6.509435710528142 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 118.38757724069833,
            "unit": "iter/sec",
            "range": "stddev: 0.000270253483230304",
            "extra": "mean: 8.446832204082202 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 55.935297465019815,
            "unit": "iter/sec",
            "range": "stddev: 0.005351435212109227",
            "extra": "mean: 17.877798909094363 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 31.507707361814578,
            "unit": "iter/sec",
            "range": "stddev: 0.013228804748867524",
            "extra": "mean: 31.738266085711434 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.405519501667357,
            "unit": "iter/sec",
            "range": "stddev: 0.016643142237185007",
            "extra": "mean: 54.33152810000337 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.651996871355095,
            "unit": "iter/sec",
            "range": "stddev: 0.020181162342661513",
            "extra": "mean: 68.25008282352401 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.5564527633317184,
            "unit": "iter/sec",
            "range": "stddev: 0.016661445209570504",
            "extra": "mean: 391.1670163999986 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 50.78267876868583,
            "unit": "iter/sec",
            "range": "stddev: 0.014140933481451875",
            "extra": "mean: 19.691753649999082 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.913134410543739,
            "unit": "iter/sec",
            "range": "stddev: 0.045115355128649476",
            "extra": "mean: 1.0951290286000017 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 20.06521847007661,
            "unit": "iter/sec",
            "range": "stddev: 0.027900235647413615",
            "extra": "mean: 49.83748377777727 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.959034242547759,
            "unit": "iter/sec",
            "range": "stddev: 0.008289638683857424",
            "extra": "mean: 111.61917377777779 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.370926741190258,
            "unit": "iter/sec",
            "range": "stddev: 0.011290426349451174",
            "extra": "mean: 186.18760750000263 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 197.5849359663809,
            "unit": "iter/sec",
            "range": "stddev: 0.00016603777794609216",
            "extra": "mean: 5.061114578948216 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 131.7805491692448,
            "unit": "iter/sec",
            "range": "stddev: 0.0003452563125584347",
            "extra": "mean: 7.588373294117232 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 253.81240494056223,
            "unit": "iter/sec",
            "range": "stddev: 0.00012903342909482756",
            "extra": "mean: 3.9399177523816458 msec\nrounds: 105"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 234.17171882393635,
            "unit": "iter/sec",
            "range": "stddev: 0.00012652519976966273",
            "extra": "mean: 4.270370499999861 msec\nrounds: 60"
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
          "id": "21613ae251c4e5093b2126097845e41a230cec3e",
          "message": "fix action",
          "timestamp": "2023-06-15T11:48:12+02:00",
          "tree_id": "5d36b53978b59551b84ac672929f67db995d8b08",
          "url": "https://github.com/developmentseed/tipg/commit/21613ae251c4e5093b2126097845e41a230cec3e"
        },
        "date": 1686822852504,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 131.72503464106862,
            "unit": "iter/sec",
            "range": "stddev: 0.0002920352172967365",
            "extra": "mean: 7.591571357144474 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 104.70559959722284,
            "unit": "iter/sec",
            "range": "stddev: 0.00048482310512172757",
            "extra": "mean: 9.550587588885012 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 62.231993324070245,
            "unit": "iter/sec",
            "range": "stddev: 0.0006509055905678535",
            "extra": "mean: 16.06890518181775 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 39.10030130405276,
            "unit": "iter/sec",
            "range": "stddev: 0.009831470701265471",
            "extra": "mean: 25.57525048781017 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 23.67093165441672,
            "unit": "iter/sec",
            "range": "stddev: 0.012064128431115128",
            "extra": "mean: 42.24590796000257 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 19.928071656123244,
            "unit": "iter/sec",
            "range": "stddev: 0.012774764830327356",
            "extra": "mean: 50.18046990476034 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 124.20567529715683,
            "unit": "iter/sec",
            "range": "stddev: 0.001449752615481041",
            "extra": "mean: 8.051161894233434 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 107.9370026970034,
            "unit": "iter/sec",
            "range": "stddev: 0.000299627254213015",
            "extra": "mean: 9.264663414891755 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 60.28134891891697,
            "unit": "iter/sec",
            "range": "stddev: 0.0004894383027255548",
            "extra": "mean: 16.588878947368556 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 39.047445740571156,
            "unit": "iter/sec",
            "range": "stddev: 0.0004626589422006779",
            "extra": "mean: 25.60986976315785 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 22.801630805548456,
            "unit": "iter/sec",
            "range": "stddev: 0.0008434766531606326",
            "extra": "mean: 43.8565122173921 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.010847018981067,
            "unit": "iter/sec",
            "range": "stddev: 0.0005807732879024508",
            "extra": "mean: 52.60154894737549 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 123.65297685084603,
            "unit": "iter/sec",
            "range": "stddev: 0.0005132685950628872",
            "extra": "mean: 8.0871486111186 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 97.36921298985969,
            "unit": "iter/sec",
            "range": "stddev: 0.0003198440701877587",
            "extra": "mean: 10.270186738637221 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 48.653945585300924,
            "unit": "iter/sec",
            "range": "stddev: 0.009216696795885125",
            "extra": "mean: 20.553317679997463 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 29.20323572170416,
            "unit": "iter/sec",
            "range": "stddev: 0.01712651568969424",
            "extra": "mean: 34.242780818181366 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.412431550649124,
            "unit": "iter/sec",
            "range": "stddev: 0.02632702371047054",
            "extra": "mean: 60.929423950008754 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.493203239381836,
            "unit": "iter/sec",
            "range": "stddev: 0.0303030287993095",
            "extra": "mean: 74.11138647058672 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.9023070344220008,
            "unit": "iter/sec",
            "range": "stddev: 0.03521151000845972",
            "extra": "mean: 525.6774968000059 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 42.5066593759664,
            "unit": "iter/sec",
            "range": "stddev: 0.020431789301484263",
            "extra": "mean: 23.525725490566494 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.784932958054242,
            "unit": "iter/sec",
            "range": "stddev: 0.0722459629523474",
            "extra": "mean: 1.2739941541999769 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.04288244295255,
            "unit": "iter/sec",
            "range": "stddev: 0.03833592741111614",
            "extra": "mean: 62.33293820832605 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.603624251095088,
            "unit": "iter/sec",
            "range": "stddev: 0.00724999804277445",
            "extra": "mean: 116.23008755556914 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.2852092620732565,
            "unit": "iter/sec",
            "range": "stddev: 0.010074153667617892",
            "extra": "mean: 189.20726700000614 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 171.24200252468827,
            "unit": "iter/sec",
            "range": "stddev: 0.0004198311820766784",
            "extra": "mean: 5.839688775280633 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 119.50170676656029,
            "unit": "iter/sec",
            "range": "stddev: 0.0002145314149924713",
            "extra": "mean: 8.368081319151722 msec\nrounds: 47"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 233.75606291102773,
            "unit": "iter/sec",
            "range": "stddev: 0.00014557856431380174",
            "extra": "mean: 4.277963906247943 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 205.6937972871007,
            "unit": "iter/sec",
            "range": "stddev: 0.0002552384577694483",
            "extra": "mean: 4.8615953090905935 msec\nrounds: 55"
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
          "id": "436e053a2ed9074b9995dbe54e60bc1d314a4b10",
          "message": "remove useless app.state.db_settings` and update docs",
          "timestamp": "2023-06-19T08:59:26+02:00",
          "tree_id": "ce556608e599c79889393d1f0a33b2d85c6acce1",
          "url": "https://github.com/developmentseed/tipg/commit/436e053a2ed9074b9995dbe54e60bc1d314a4b10"
        },
        "date": 1687158283502,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 160.64775850451608,
            "unit": "iter/sec",
            "range": "stddev: 0.0002757937579474062",
            "extra": "mean: 6.224798959593876 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 125.3686081048401,
            "unit": "iter/sec",
            "range": "stddev: 0.0009368187445299783",
            "extra": "mean: 7.976478443182085 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 67.97061390051111,
            "unit": "iter/sec",
            "range": "stddev: 0.00027900555699834917",
            "extra": "mean: 14.712240225808529 msec\nrounds: 62"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 40.22013752992548,
            "unit": "iter/sec",
            "range": "stddev: 0.007802356426600883",
            "extra": "mean: 24.863167095238243 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.781630798412984,
            "unit": "iter/sec",
            "range": "stddev: 0.00706619321596969",
            "extra": "mean: 40.35246946153519 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.574724131337767,
            "unit": "iter/sec",
            "range": "stddev: 0.003323323190153273",
            "extra": "mean: 48.603324818187005 msec\nrounds: 11"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 157.92383464692406,
            "unit": "iter/sec",
            "range": "stddev: 0.0004185864509931907",
            "extra": "mean: 6.3321664031001745 msec\nrounds: 129"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 121.25194134798929,
            "unit": "iter/sec",
            "range": "stddev: 0.0039668238527501894",
            "extra": "mean: 8.247290632073522 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 69.47559621321254,
            "unit": "iter/sec",
            "range": "stddev: 0.0007455276642010973",
            "extra": "mean: 14.393543265625475 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 43.428167781778775,
            "unit": "iter/sec",
            "range": "stddev: 0.0007603086048266188",
            "extra": "mean: 23.02652980952081 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.786414148617645,
            "unit": "iter/sec",
            "range": "stddev: 0.0003341496642182799",
            "extra": "mean: 38.7801108846151 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 21.25411354390822,
            "unit": "iter/sec",
            "range": "stddev: 0.0003092673750299463",
            "extra": "mean: 47.04971571428424 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 153.8241221383254,
            "unit": "iter/sec",
            "range": "stddev: 0.0001667276949233298",
            "extra": "mean: 6.500930972976762 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 114.88249501627577,
            "unit": "iter/sec",
            "range": "stddev: 0.0005552765927169241",
            "extra": "mean: 8.704546326734347 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 55.59165752629255,
            "unit": "iter/sec",
            "range": "stddev: 0.0056801652399210145",
            "extra": "mean: 17.98831055769549 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.70610068699104,
            "unit": "iter/sec",
            "range": "stddev: 0.011601647332028049",
            "extra": "mean: 30.5753354571477 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 17.396324200883917,
            "unit": "iter/sec",
            "range": "stddev: 0.01957267001456827",
            "extra": "mean: 57.48340789999702 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.663169150058472,
            "unit": "iter/sec",
            "range": "stddev: 0.019170799588781477",
            "extra": "mean: 68.19808117647011 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.5189720599977385,
            "unit": "iter/sec",
            "range": "stddev: 0.023916506773626594",
            "extra": "mean: 396.98733299999276 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 47.22334613551984,
            "unit": "iter/sec",
            "range": "stddev: 0.0171233927285257",
            "extra": "mean: 21.17596658928481 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9190169611485669,
            "unit": "iter/sec",
            "range": "stddev: 0.047902704930118827",
            "extra": "mean: 1.0881191994000006 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 21.950655300048734,
            "unit": "iter/sec",
            "range": "stddev: 0.02157646897500838",
            "extra": "mean: 45.55672649999565 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.95716169345653,
            "unit": "iter/sec",
            "range": "stddev: 0.009032095093791256",
            "extra": "mean: 111.64250844444723 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.4293856763851664,
            "unit": "iter/sec",
            "range": "stddev: 0.01249800714865176",
            "extra": "mean: 184.18290016667052 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 190.92273147051856,
            "unit": "iter/sec",
            "range": "stddev: 0.0006261690335692383",
            "extra": "mean: 5.237720999997403 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 127.76547704303148,
            "unit": "iter/sec",
            "range": "stddev: 0.0004998660460600077",
            "extra": "mean: 7.826840419992322 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 250.85035165903201,
            "unit": "iter/sec",
            "range": "stddev: 0.00018680448323257727",
            "extra": "mean: 3.9864404948463004 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 232.88801638347257,
            "unit": "iter/sec",
            "range": "stddev: 0.00014797142242791458",
            "extra": "mean: 4.293909216665763 msec\nrounds: 60"
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
          "id": "881bdc0f12d416e35b22c2076c0ca1e1399537d9",
          "message": "Merge pull request #81 from developmentseed/RenameSubmodules\n\nrefactor submodule names",
          "timestamp": "2023-06-22T20:05:51+02:00",
          "tree_id": "3031ad6589e4a39c6fc69a27e085b6256b6e6a2d",
          "url": "https://github.com/developmentseed/tipg/commit/881bdc0f12d416e35b22c2076c0ca1e1399537d9"
        },
        "date": 1687457538279,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 94.42967665581455,
            "unit": "iter/sec",
            "range": "stddev: 0.002634974126031291",
            "extra": "mean: 10.589891180554249 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 76.0316047329765,
            "unit": "iter/sec",
            "range": "stddev: 0.001798165694335168",
            "extra": "mean: 13.152425277777665 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 43.64798299856231,
            "unit": "iter/sec",
            "range": "stddev: 0.0018273623342269345",
            "extra": "mean: 22.91056610870056 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 26.05473137372394,
            "unit": "iter/sec",
            "range": "stddev: 0.013397751999098224",
            "extra": "mean: 38.380744965518815 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 15.765596039025304,
            "unit": "iter/sec",
            "range": "stddev: 0.015341707773245037",
            "extra": "mean: 63.429254277773836 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 13.947134407956252,
            "unit": "iter/sec",
            "range": "stddev: 0.012166041991040086",
            "extra": "mean: 71.69931620000322 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 92.54010228256385,
            "unit": "iter/sec",
            "range": "stddev: 0.0024091217733870607",
            "extra": "mean: 10.806125942530077 msec\nrounds: 87"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 75.82250629661537,
            "unit": "iter/sec",
            "range": "stddev: 0.0016190980177426823",
            "extra": "mean: 13.188696191181414 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 41.21490003447095,
            "unit": "iter/sec",
            "range": "stddev: 0.0029318673735015343",
            "extra": "mean: 24.2630698888904 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 23.659955537264405,
            "unit": "iter/sec",
            "range": "stddev: 0.005037521790290201",
            "extra": "mean: 42.26550630769365 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 14.099720882228253,
            "unit": "iter/sec",
            "range": "stddev: 0.005088771140063114",
            "extra": "mean: 70.92338978571077 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 11.584842180755475,
            "unit": "iter/sec",
            "range": "stddev: 0.011829330370140589",
            "extra": "mean: 86.3196912307689 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 95.4198137099362,
            "unit": "iter/sec",
            "range": "stddev: 0.0021886991296603975",
            "extra": "mean: 10.480003692313526 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 74.43523366321367,
            "unit": "iter/sec",
            "range": "stddev: 0.0015895693344897478",
            "extra": "mean: 13.434498029851769 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 35.47462888051996,
            "unit": "iter/sec",
            "range": "stddev: 0.00992941583538424",
            "extra": "mean: 28.189160297294215 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 20.897496374924213,
            "unit": "iter/sec",
            "range": "stddev: 0.019341379288204626",
            "extra": "mean: 47.852622250000344 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 12.378518457709001,
            "unit": "iter/sec",
            "range": "stddev: 0.02642332218447627",
            "extra": "mean: 80.78511199999282 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 9.885107374013154,
            "unit": "iter/sec",
            "range": "stddev: 0.02956920348669282",
            "extra": "mean: 101.16228000000167 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.6098286307222198,
            "unit": "iter/sec",
            "range": "stddev: 0.03176141852075863",
            "extra": "mean: 621.1841316000005 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 31.862359119542454,
            "unit": "iter/sec",
            "range": "stddev: 0.023516612793257008",
            "extra": "mean: 31.384995575756353 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6541939188899553,
            "unit": "iter/sec",
            "range": "stddev: 0.042873929710744205",
            "extra": "mean: 1.528598739799986 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.918241991783772,
            "unit": "iter/sec",
            "range": "stddev: 0.04038095721339829",
            "extra": "mean: 71.84815442857803 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.372118997960081,
            "unit": "iter/sec",
            "range": "stddev: 0.013052709542849391",
            "extra": "mean: 156.93366685715253 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 3.927616488378082,
            "unit": "iter/sec",
            "range": "stddev: 0.016199928459362863",
            "extra": "mean: 254.60734340000502 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 116.11813138753054,
            "unit": "iter/sec",
            "range": "stddev: 0.0015022954326771407",
            "extra": "mean: 8.611919500001411 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 89.84098460166706,
            "unit": "iter/sec",
            "range": "stddev: 0.0008776892880214083",
            "extra": "mean: 11.130777388891666 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 152.6647407692931,
            "unit": "iter/sec",
            "range": "stddev: 0.00039792560837573866",
            "extra": "mean: 6.5503009729744965 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 144.76128866786843,
            "unit": "iter/sec",
            "range": "stddev: 0.00047377391420864415",
            "extra": "mean: 6.907924136364521 msec\nrounds: 44"
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
          "id": "4d3ea35a9985eac9374dfc3bfae40d02724bd8fc",
          "message": "Bump version: 0.1.0 → 0.2.0",
          "timestamp": "2023-06-22T20:10:09+02:00",
          "tree_id": "1470e2ff8418d368c856e81a4595488e8481fddd",
          "url": "https://github.com/developmentseed/tipg/commit/4d3ea35a9985eac9374dfc3bfae40d02724bd8fc"
        },
        "date": 1687457790076,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 163.58887985223132,
            "unit": "iter/sec",
            "range": "stddev: 0.00010094766510140244",
            "extra": "mean: 6.112884939998935 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 134.1484915889513,
            "unit": "iter/sec",
            "range": "stddev: 0.0002252813874209393",
            "extra": "mean: 7.454425973451361 msec\nrounds: 113"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 71.33338821608798,
            "unit": "iter/sec",
            "range": "stddev: 0.00010350402204018352",
            "extra": "mean: 14.018680803030575 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 44.994623367480386,
            "unit": "iter/sec",
            "range": "stddev: 0.0002170163056045733",
            "extra": "mean: 22.224877666666824 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.21337964399054,
            "unit": "iter/sec",
            "range": "stddev: 0.007149101533414917",
            "extra": "mean: 39.66148188461297 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.821397921408273,
            "unit": "iter/sec",
            "range": "stddev: 0.007830281727348891",
            "extra": "mean: 48.027514952385296 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 163.37078184218947,
            "unit": "iter/sec",
            "range": "stddev: 0.0001447400446796207",
            "extra": "mean: 6.1210455671685855 msec\nrounds: 134"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 131.54527634089473,
            "unit": "iter/sec",
            "range": "stddev: 0.00018494406628009413",
            "extra": "mean: 7.601945336361124 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 69.96254476722609,
            "unit": "iter/sec",
            "range": "stddev: 0.0013481171174980781",
            "extra": "mean: 14.293362303031168 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 45.059360940946675,
            "unit": "iter/sec",
            "range": "stddev: 0.00021220537497011467",
            "extra": "mean: 22.19294679546315 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.773167338793154,
            "unit": "iter/sec",
            "range": "stddev: 0.00038746562401835097",
            "extra": "mean: 38.8000429615348 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.36214355442378,
            "unit": "iter/sec",
            "range": "stddev: 0.008169431693318458",
            "extra": "mean: 49.11074304761714 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 154.87912550350632,
            "unit": "iter/sec",
            "range": "stddev: 0.0001781811021083042",
            "extra": "mean: 6.456648026317536 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 117.98057100164135,
            "unit": "iter/sec",
            "range": "stddev: 0.00022998338782800014",
            "extra": "mean: 8.4759718613846 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 55.55256935244618,
            "unit": "iter/sec",
            "range": "stddev: 0.005375888163365065",
            "extra": "mean: 18.000967581816564 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.84221887405062,
            "unit": "iter/sec",
            "range": "stddev: 0.010423405492523203",
            "extra": "mean: 30.44861261764876 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 17.640329562096756,
            "unit": "iter/sec",
            "range": "stddev: 0.017834994503143752",
            "extra": "mean: 56.68828331578736 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.692789470500411,
            "unit": "iter/sec",
            "range": "stddev: 0.01881248892886033",
            "extra": "mean: 68.06059543749399 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.5127796076032793,
            "unit": "iter/sec",
            "range": "stddev: 0.0283926946859071",
            "extra": "mean: 397.96566200002417 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 55.09067022547588,
            "unit": "iter/sec",
            "range": "stddev: 0.012501368150989584",
            "extra": "mean: 18.15189388524746 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9446395419091599,
            "unit": "iter/sec",
            "range": "stddev: 0.039142361577034615",
            "extra": "mean: 1.058604849399967 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 21.252705994895305,
            "unit": "iter/sec",
            "range": "stddev: 0.025414743374658606",
            "extra": "mean: 47.05283177775999 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 9.20437771208375,
            "unit": "iter/sec",
            "range": "stddev: 0.00847517761623816",
            "extra": "mean: 108.64395522221709 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.469052992656321,
            "unit": "iter/sec",
            "range": "stddev: 0.011148315415443873",
            "extra": "mean: 182.84701233335454 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 197.48372427678885,
            "unit": "iter/sec",
            "range": "stddev: 0.00022783435644111466",
            "extra": "mean: 5.063708432996847 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 132.03238506582971,
            "unit": "iter/sec",
            "range": "stddev: 0.0005188028256591567",
            "extra": "mean: 7.5738993846200104 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 253.7136967835471,
            "unit": "iter/sec",
            "range": "stddev: 0.00011040924483986871",
            "extra": "mean: 3.9414505904785204 msec\nrounds: 105"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 231.8272676162613,
            "unit": "iter/sec",
            "range": "stddev: 0.00016250702639912837",
            "extra": "mean: 4.313556426223677 msec\nrounds: 61"
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
          "id": "fad27145c6b48a1a99c21aeeb85ba60983ea853a",
          "message": "Merge pull request #82 from developmentseed/CollectionTypeFilter\n\nadd collection type filter",
          "timestamp": "2023-06-28T17:44:24+02:00",
          "tree_id": "ffbd816191fe156551837c883bf2857a34119ed9",
          "url": "https://github.com/developmentseed/tipg/commit/fad27145c6b48a1a99c21aeeb85ba60983ea853a"
        },
        "date": 1687967447073,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 153.24840020925302,
            "unit": "iter/sec",
            "range": "stddev: 0.0007133153513773289",
            "extra": "mean: 6.525353600002023 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 128.09981963627362,
            "unit": "iter/sec",
            "range": "stddev: 0.00017291375839663194",
            "extra": "mean: 7.806412240387208 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 68.09503388180597,
            "unit": "iter/sec",
            "range": "stddev: 0.0005103200584988338",
            "extra": "mean: 14.685358725802557 msec\nrounds: 62"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 41.41993960535723,
            "unit": "iter/sec",
            "range": "stddev: 0.007193833682599946",
            "extra": "mean: 24.14296132558003 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.370631807951852,
            "unit": "iter/sec",
            "range": "stddev: 0.009143780861421357",
            "extra": "mean: 41.032994461543325 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 19.295526714735697,
            "unit": "iter/sec",
            "range": "stddev: 0.01502089125622414",
            "extra": "mean: 51.82548342856665 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 155.31606324620014,
            "unit": "iter/sec",
            "range": "stddev: 0.00016144783648924387",
            "extra": "mean: 6.438484076272551 msec\nrounds: 118"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 123.81584468662531,
            "unit": "iter/sec",
            "range": "stddev: 0.00019933196412201247",
            "extra": "mean: 8.076510744896778 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 64.71748489093382,
            "unit": "iter/sec",
            "range": "stddev: 0.0005495298387592336",
            "extra": "mean: 15.451774766668791 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 41.33731131291589,
            "unit": "iter/sec",
            "range": "stddev: 0.0006227886388368754",
            "extra": "mean: 24.1912201891938 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.58961402832757,
            "unit": "iter/sec",
            "range": "stddev: 0.0008564551489056224",
            "extra": "mean: 42.39153717390843 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.673436863868854,
            "unit": "iter/sec",
            "range": "stddev: 0.0005572299127208399",
            "extra": "mean: 50.82995955000342 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 139.63820679301736,
            "unit": "iter/sec",
            "range": "stddev: 0.0009455079706334897",
            "extra": "mean: 7.161363805554149 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 111.2693661342255,
            "unit": "iter/sec",
            "range": "stddev: 0.00042892565345460247",
            "extra": "mean: 8.98719957471213 msec\nrounds: 87"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 52.30319639061275,
            "unit": "iter/sec",
            "range": "stddev: 0.007946403087213115",
            "extra": "mean: 19.119290387756827 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 30.79224865608097,
            "unit": "iter/sec",
            "range": "stddev: 0.014177626483553096",
            "extra": "mean: 32.475705531252785 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.724566810347326,
            "unit": "iter/sec",
            "range": "stddev: 0.022177108059151247",
            "extra": "mean: 59.792281099998945 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.676855469973074,
            "unit": "iter/sec",
            "range": "stddev: 0.023772128335498837",
            "extra": "mean: 73.11622194118051 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.0778164328836923,
            "unit": "iter/sec",
            "range": "stddev: 0.023952765975596025",
            "extra": "mean: 481.27446879999525 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 46.115797924573165,
            "unit": "iter/sec",
            "range": "stddev: 0.017274689210948053",
            "extra": "mean: 21.684542933326156 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7991019738046713,
            "unit": "iter/sec",
            "range": "stddev: 0.03811275467628806",
            "extra": "mean: 1.2514047427999913 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 18.144162446862186,
            "unit": "iter/sec",
            "range": "stddev: 0.028465759690017866",
            "extra": "mean: 55.114145000004555 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.761971058779205,
            "unit": "iter/sec",
            "range": "stddev: 0.007916353021197716",
            "extra": "mean: 114.12957122222325 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.352708845186784,
            "unit": "iter/sec",
            "range": "stddev: 0.01116240292144533",
            "extra": "mean: 186.821295333336 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 189.12734926433876,
            "unit": "iter/sec",
            "range": "stddev: 0.00009779633978678001",
            "extra": "mean: 5.287442582417438 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 130.25386078896824,
            "unit": "iter/sec",
            "range": "stddev: 0.00015556056530917808",
            "extra": "mean: 7.677315619996534 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 241.94329255038033,
            "unit": "iter/sec",
            "range": "stddev: 0.00010231115326109068",
            "extra": "mean: 4.133199930689411 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 221.88878119409412,
            "unit": "iter/sec",
            "range": "stddev: 0.00010278947782903512",
            "extra": "mean: 4.50676232758818 msec\nrounds: 58"
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
          "id": "12a5e544259e32809f981b9d83f9b04eff6ba0d6",
          "message": "Merge pull request #87 from RemcoMeeuwissen/transform-to-4326\n\nSmall fix to transform to 4326",
          "timestamp": "2023-07-12T23:36:32+02:00",
          "tree_id": "27757648853590c9767e702c71f65cc4cff0e5ae",
          "url": "https://github.com/developmentseed/tipg/commit/12a5e544259e32809f981b9d83f9b04eff6ba0d6"
        },
        "date": 1689198157468,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 110.10762630583372,
            "unit": "iter/sec",
            "range": "stddev: 0.001275534471915872",
            "extra": "mean: 9.082023049179273 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 85.32463867058173,
            "unit": "iter/sec",
            "range": "stddev: 0.0012819172715469252",
            "extra": "mean: 11.719944151896893 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 48.6597526635193,
            "unit": "iter/sec",
            "range": "stddev: 0.0019685951132461174",
            "extra": "mean: 20.55086483720888 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 29.785577675295304,
            "unit": "iter/sec",
            "range": "stddev: 0.010157319672527355",
            "extra": "mean: 33.57329546874688 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 16.856955901036695,
            "unit": "iter/sec",
            "range": "stddev: 0.0123778814116792",
            "extra": "mean: 59.32269182352791 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 14.656064435781941,
            "unit": "iter/sec",
            "range": "stddev: 0.014321943730412331",
            "extra": "mean: 68.23114106666708 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 105.09612079598969,
            "unit": "iter/sec",
            "range": "stddev: 0.0009087048195060722",
            "extra": "mean: 9.51509905813915 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 79.19410918686644,
            "unit": "iter/sec",
            "range": "stddev: 0.00199741198417844",
            "extra": "mean: 12.627201824322562 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 44.994095264182604,
            "unit": "iter/sec",
            "range": "stddev: 0.0015474546431017797",
            "extra": "mean: 22.22513852381085 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 26.512622031114734,
            "unit": "iter/sec",
            "range": "stddev: 0.003121651917690342",
            "extra": "mean: 37.71788391304406 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 15.071969018094263,
            "unit": "iter/sec",
            "range": "stddev: 0.004713224816189869",
            "extra": "mean: 66.34833171428868 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 12.793452473206479,
            "unit": "iter/sec",
            "range": "stddev: 0.0058329246293893355",
            "extra": "mean: 78.1649833846114 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 105.78518686527907,
            "unit": "iter/sec",
            "range": "stddev: 0.0009253183312835429",
            "extra": "mean: 9.453119379309062 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 78.72774811151125,
            "unit": "iter/sec",
            "range": "stddev: 0.001489919977943321",
            "extra": "mean: 12.702001822579556 msec\nrounds: 62"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 38.85802714627966,
            "unit": "iter/sec",
            "range": "stddev: 0.008331123234484712",
            "extra": "mean: 25.734708461537064 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 22.772701140774213,
            "unit": "iter/sec",
            "range": "stddev: 0.017100066063907612",
            "extra": "mean: 43.912226038461185 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 12.536409798594708,
            "unit": "iter/sec",
            "range": "stddev: 0.019879691430425863",
            "extra": "mean: 79.76765406249697 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 10.56096234192545,
            "unit": "iter/sec",
            "range": "stddev: 0.02824130205621895",
            "extra": "mean: 94.68834066665958 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.6755513974744456,
            "unit": "iter/sec",
            "range": "stddev: 0.05655022324394742",
            "extra": "mean: 596.8184571999984 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 33.71119670595962,
            "unit": "iter/sec",
            "range": "stddev: 0.022841742455864605",
            "extra": "mean: 29.663734833335518 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6611121604327401,
            "unit": "iter/sec",
            "range": "stddev: 0.06244181295553205",
            "extra": "mean: 1.5126026411999987 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.669478323229248,
            "unit": "iter/sec",
            "range": "stddev: 0.041435031418217805",
            "extra": "mean: 73.15568131818524 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.533390277491871,
            "unit": "iter/sec",
            "range": "stddev: 0.012238641981089893",
            "extra": "mean: 153.05989042857146 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.153321383989506,
            "unit": "iter/sec",
            "range": "stddev: 0.02338444236343124",
            "extra": "mean: 240.77115820000472 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 124.49921480302044,
            "unit": "iter/sec",
            "range": "stddev: 0.0010578378991703637",
            "extra": "mean: 8.03217917142831 msec\nrounds: 70"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 82.88753553075365,
            "unit": "iter/sec",
            "range": "stddev: 0.0012372385870711117",
            "extra": "mean: 12.064540145833766 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 151.80713290109122,
            "unit": "iter/sec",
            "range": "stddev: 0.000864389313595989",
            "extra": "mean: 6.587305753620565 msec\nrounds: 69"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 135.09891460030798,
            "unit": "iter/sec",
            "range": "stddev: 0.0006195386315895239",
            "extra": "mean: 7.401983968254031 msec\nrounds: 63"
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
          "id": "03dc1347e7c1ea71d7dd7dd5c4293e69309dea13",
          "message": "Merge pull request #91 from krishnaglodha/fix/addpopup\n\nadded popup in item and items",
          "timestamp": "2023-07-17T10:50:27+02:00",
          "tree_id": "cc2256768c6d30516de512c65c48e39a3802eed3",
          "url": "https://github.com/developmentseed/tipg/commit/03dc1347e7c1ea71d7dd7dd5c4293e69309dea13"
        },
        "date": 1689584169156,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 150.82940308605052,
            "unit": "iter/sec",
            "range": "stddev: 0.00033458961190861014",
            "extra": "mean: 6.630007011494201 msec\nrounds: 87"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 128.62419572898486,
            "unit": "iter/sec",
            "range": "stddev: 0.00025047314553748996",
            "extra": "mean: 7.774586999999834 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 66.76842985355263,
            "unit": "iter/sec",
            "range": "stddev: 0.0004140704027545932",
            "extra": "mean: 14.977138180325081 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 43.09373931477636,
            "unit": "iter/sec",
            "range": "stddev: 0.0003314913565349183",
            "extra": "mean: 23.20522692856944 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 23.963953735197894,
            "unit": "iter/sec",
            "range": "stddev: 0.010805543579655675",
            "extra": "mean: 41.72934112000121 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.195574171079002,
            "unit": "iter/sec",
            "range": "stddev: 0.009783507248037551",
            "extra": "mean: 49.515799428572144 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 154.1982595380069,
            "unit": "iter/sec",
            "range": "stddev: 0.0003311510054471722",
            "extra": "mean: 6.485157504346015 msec\nrounds: 115"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 116.53624832221328,
            "unit": "iter/sec",
            "range": "stddev: 0.00041186605155787596",
            "extra": "mean: 8.5810210505068 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 65.71421771517942,
            "unit": "iter/sec",
            "range": "stddev: 0.0005360980200539154",
            "extra": "mean: 15.217407050849037 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 38.88900785490257,
            "unit": "iter/sec",
            "range": "stddev: 0.007856848746971692",
            "extra": "mean: 25.71420705128465 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.472186895223942,
            "unit": "iter/sec",
            "range": "stddev: 0.0006662927407307775",
            "extra": "mean: 42.603614416664236 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.551441923486564,
            "unit": "iter/sec",
            "range": "stddev: 0.0010381994816238548",
            "extra": "mean: 51.147122749996754 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 144.34300206137095,
            "unit": "iter/sec",
            "range": "stddev: 0.00028604915250144655",
            "extra": "mean: 6.92794237142737 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 110.35724982312234,
            "unit": "iter/sec",
            "range": "stddev: 0.00037081294996688216",
            "extra": "mean: 9.061479890109378 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 51.04193251006557,
            "unit": "iter/sec",
            "range": "stddev: 0.00850422483749642",
            "extra": "mean: 19.59173469387739 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 30.69508015609047,
            "unit": "iter/sec",
            "range": "stddev: 0.013876224013155039",
            "extra": "mean: 32.57851078787887 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.401106850274978,
            "unit": "iter/sec",
            "range": "stddev: 0.02378177209746123",
            "extra": "mean: 60.97149473684663 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.233446048909967,
            "unit": "iter/sec",
            "range": "stddev: 0.02072463403286405",
            "extra": "mean: 70.25705486666614 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.0964739138989774,
            "unit": "iter/sec",
            "range": "stddev: 0.025758765018037276",
            "extra": "mean: 476.9913870000039 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 43.92601487035199,
            "unit": "iter/sec",
            "range": "stddev: 0.017996745944520737",
            "extra": "mean: 22.765552553572377 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7929373510381776,
            "unit": "iter/sec",
            "range": "stddev: 0.05729623725508751",
            "extra": "mean: 1.261133680600011 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.24253846799259,
            "unit": "iter/sec",
            "range": "stddev: 0.03446249995275843",
            "extra": "mean: 61.56673120833863 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.596548718369954,
            "unit": "iter/sec",
            "range": "stddev: 0.008832904437866338",
            "extra": "mean: 116.32575266666043 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.293238094594304,
            "unit": "iter/sec",
            "range": "stddev: 0.011340135527870306",
            "extra": "mean: 188.92027566665584 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 182.6073625814731,
            "unit": "iter/sec",
            "range": "stddev: 0.0004043353063087333",
            "extra": "mean: 5.476230453489161 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 128.76059812385128,
            "unit": "iter/sec",
            "range": "stddev: 0.00016873833068691962",
            "extra": "mean: 7.766351000001783 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 237.6718382097568,
            "unit": "iter/sec",
            "range": "stddev: 0.00010095423137681268",
            "extra": "mean: 4.207482079208106 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 219.9624639555136,
            "unit": "iter/sec",
            "range": "stddev: 0.00012103576073493465",
            "extra": "mean: 4.546230215907407 msec\nrounds: 88"
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
          "id": "09926e009f1e3467a934c51bfbfb55ed154e9925",
          "message": "Merge pull request #94 from jackharrhy/fix-popup-xss\n\ngenerate popup contents without string concat.",
          "timestamp": "2023-07-17T18:09:09+02:00",
          "tree_id": "3e8ff6d6a110e7de53098796b07d426be8206167",
          "url": "https://github.com/developmentseed/tipg/commit/09926e009f1e3467a934c51bfbfb55ed154e9925"
        },
        "date": 1689610658937,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 157.08993949514078,
            "unit": "iter/sec",
            "range": "stddev: 0.00131095681256047",
            "extra": "mean: 6.3657800315782325 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 130.4336905745461,
            "unit": "iter/sec",
            "range": "stddev: 0.00042979914363284056",
            "extra": "mean: 7.666730854544632 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 68.6533728993382,
            "unit": "iter/sec",
            "range": "stddev: 0.00029994622009924183",
            "extra": "mean: 14.565926738460943 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 41.666960677142725,
            "unit": "iter/sec",
            "range": "stddev: 0.005848809272266471",
            "extra": "mean: 23.99983065116076 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.24964340535619,
            "unit": "iter/sec",
            "range": "stddev: 0.007605760164139921",
            "extra": "mean: 41.23771980000015 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 21.12975741770604,
            "unit": "iter/sec",
            "range": "stddev: 0.00029231187255902966",
            "extra": "mean: 47.32662000000213 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 161.28585928995386,
            "unit": "iter/sec",
            "range": "stddev: 0.00022130476877193415",
            "extra": "mean: 6.200171573642028 msec\nrounds: 129"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 129.8145039805777,
            "unit": "iter/sec",
            "range": "stddev: 0.00022843822165496768",
            "extra": "mean: 7.703299472219343 msec\nrounds: 108"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 65.18330175847625,
            "unit": "iter/sec",
            "range": "stddev: 0.00507403414497331",
            "extra": "mean: 15.341352355934665 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 41.95817625568928,
            "unit": "iter/sec",
            "range": "stddev: 0.0027260480949199625",
            "extra": "mean: 23.83325704878333 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.33899253829354,
            "unit": "iter/sec",
            "range": "stddev: 0.00047933065673579637",
            "extra": "mean: 39.46486816667042 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.847083660219795,
            "unit": "iter/sec",
            "range": "stddev: 0.0005487279622434933",
            "extra": "mean: 47.96834014285607 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 153.81684997747553,
            "unit": "iter/sec",
            "range": "stddev: 0.00019055174015492114",
            "extra": "mean: 6.5012383243216645 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 113.31261258287795,
            "unit": "iter/sec",
            "range": "stddev: 0.0005230053657856481",
            "extra": "mean: 8.825142913976944 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 53.25101657077926,
            "unit": "iter/sec",
            "range": "stddev: 0.006165693832716742",
            "extra": "mean: 18.778984222223016 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.07567431954046,
            "unit": "iter/sec",
            "range": "stddev: 0.010787551927474093",
            "extra": "mean: 31.176273647060984 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 17.35671288691875,
            "unit": "iter/sec",
            "range": "stddev: 0.018377960863238722",
            "extra": "mean: 57.614595950001046 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.937586890075076,
            "unit": "iter/sec",
            "range": "stddev: 0.022728332493805396",
            "extra": "mean: 71.74843162499656 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.376007733487004,
            "unit": "iter/sec",
            "range": "stddev: 0.031639011327349406",
            "extra": "mean: 420.8740509999984 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 49.51442080314458,
            "unit": "iter/sec",
            "range": "stddev: 0.01482081018555134",
            "extra": "mean: 20.19613647457816 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9128918734977471,
            "unit": "iter/sec",
            "range": "stddev: 0.04423541774682363",
            "extra": "mean: 1.0954199823999944 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 19.529232685642768,
            "unit": "iter/sec",
            "range": "stddev: 0.028005493756600875",
            "extra": "mean: 51.20528881481176 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.875278856947379,
            "unit": "iter/sec",
            "range": "stddev: 0.00825992006152124",
            "extra": "mean: 112.67251611111027 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.249840876666751,
            "unit": "iter/sec",
            "range": "stddev: 0.011593922632730068",
            "extra": "mean: 190.48196383333504 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 193.8056997202763,
            "unit": "iter/sec",
            "range": "stddev: 0.0002798692247970352",
            "extra": "mean: 5.159806968749218 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 131.95496073517506,
            "unit": "iter/sec",
            "range": "stddev: 0.0001649083732080034",
            "extra": "mean: 7.578343356161761 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 251.0762254428134,
            "unit": "iter/sec",
            "range": "stddev: 0.00014461193399800207",
            "extra": "mean: 3.982854203883059 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 231.16644101096043,
            "unit": "iter/sec",
            "range": "stddev: 0.00015163738411850874",
            "extra": "mean: 4.325887423912827 msec\nrounds: 92"
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
          "id": "ef9aa7e01d573e13c142187c26fc51618932396e",
          "message": "Merge pull request #98 from developmentseed/pinGeojsonDependency\n\nupdate dependencies to avoid pydantic breaking changes",
          "timestamp": "2023-07-25T10:52:48+02:00",
          "tree_id": "539b3540cd50def6cd989c62868ac5909c583c9b",
          "url": "https://github.com/developmentseed/tipg/commit/ef9aa7e01d573e13c142187c26fc51618932396e"
        },
        "date": 1690275532094,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 162.8768418077316,
            "unit": "iter/sec",
            "range": "stddev: 0.00014291144866682533",
            "extra": "mean: 6.139608239582965 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 131.26408173475374,
            "unit": "iter/sec",
            "range": "stddev: 0.00015357209475316236",
            "extra": "mean: 7.61823026363531 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 70.31550556529096,
            "unit": "iter/sec",
            "range": "stddev: 0.0002209649164937221",
            "extra": "mean: 14.221614307692876 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 42.444965773471324,
            "unit": "iter/sec",
            "range": "stddev: 0.0056235848459243445",
            "extra": "mean: 23.559920046513824 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.822152775287208,
            "unit": "iter/sec",
            "range": "stddev: 0.0074784378140253654",
            "extra": "mean: 40.286594360002255 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 19.841980362402648,
            "unit": "iter/sec",
            "range": "stddev: 0.011376590894339475",
            "extra": "mean: 50.39819522726867 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 160.72512203156603,
            "unit": "iter/sec",
            "range": "stddev: 0.0003211231980091524",
            "extra": "mean: 6.221802711113217 msec\nrounds: 135"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 129.9964730620807,
            "unit": "iter/sec",
            "range": "stddev: 0.00020534991985704585",
            "extra": "mean: 7.692516392521229 msec\nrounds: 107"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 70.06935558240505,
            "unit": "iter/sec",
            "range": "stddev: 0.0003675542916446458",
            "extra": "mean: 14.271574095239826 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 42.97037261559688,
            "unit": "iter/sec",
            "range": "stddev: 0.0010405199918245348",
            "extra": "mean: 23.271848465122034 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 24.799471842675526,
            "unit": "iter/sec",
            "range": "stddev: 0.0024719022472045873",
            "extra": "mean: 40.32343939999464 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 21.08552326189145,
            "unit": "iter/sec",
            "range": "stddev: 0.000683283063092806",
            "extra": "mean: 47.425903904757845 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 152.7215737736532,
            "unit": "iter/sec",
            "range": "stddev: 0.00020406499752298704",
            "extra": "mean: 6.547863378373038 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 115.84325586254252,
            "unit": "iter/sec",
            "range": "stddev: 0.00044184675780720867",
            "extra": "mean: 8.632354059407495 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 55.31530787649797,
            "unit": "iter/sec",
            "range": "stddev: 0.0055446640081864",
            "extra": "mean: 18.078178326923386 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 35.603734936562866,
            "unit": "iter/sec",
            "range": "stddev: 0.0004790439509488224",
            "extra": "mean: 28.086940928578283 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.33330858336726,
            "unit": "iter/sec",
            "range": "stddev: 0.01539929712629881",
            "extra": "mean: 54.54552818181666 msec\nrounds: 11"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.229131382497883,
            "unit": "iter/sec",
            "range": "stddev: 0.019392425393389413",
            "extra": "mean: 70.2783587499951 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.3727071535424833,
            "unit": "iter/sec",
            "range": "stddev: 0.027937398687746674",
            "extra": "mean: 421.45951239999704 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 48.81996667569068,
            "unit": "iter/sec",
            "range": "stddev: 0.01629437126460049",
            "extra": "mean: 20.48342242105499 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.905479818860201,
            "unit": "iter/sec",
            "range": "stddev: 0.05973554059286627",
            "extra": "mean: 1.1043868446000034 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 19.77948457750188,
            "unit": "iter/sec",
            "range": "stddev: 0.025886823406096333",
            "extra": "mean: 50.55743470370544 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 9.211923157137715,
            "unit": "iter/sec",
            "range": "stddev: 0.007922079125153454",
            "extra": "mean: 108.55496544444856 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.494551211989546,
            "unit": "iter/sec",
            "range": "stddev: 0.010938470154822907",
            "extra": "mean: 181.9984856666584 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 197.89803374213903,
            "unit": "iter/sec",
            "range": "stddev: 0.0001627437607611295",
            "extra": "mean: 5.053107305265089 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 133.66390270906405,
            "unit": "iter/sec",
            "range": "stddev: 0.00014528656655729143",
            "extra": "mean: 7.481451459461147 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 253.99985005861294,
            "unit": "iter/sec",
            "range": "stddev: 0.00011601850889689538",
            "extra": "mean: 3.9370101981132675 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 230.46653455834206,
            "unit": "iter/sec",
            "range": "stddev: 0.0001472328339323106",
            "extra": "mean: 4.3390247608676225 msec\nrounds: 92"
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
          "id": "2061bbc06ab6959a90bcfa1bb88bd573e2809373",
          "message": "Merge pull request #99 from developmentseed/catalogDependency\n\nadd Catalog Dependency",
          "timestamp": "2023-07-25T11:02:26+02:00",
          "tree_id": "7b2bf21d8eb5be7bfd6b876f9f78896eec02c62e",
          "url": "https://github.com/developmentseed/tipg/commit/2061bbc06ab6959a90bcfa1bb88bd573e2809373"
        },
        "date": 1690276055742,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 160.73088745874577,
            "unit": "iter/sec",
            "range": "stddev: 0.0008477948339344006",
            "extra": "mean: 6.221579534653328 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 131.18424312560626,
            "unit": "iter/sec",
            "range": "stddev: 0.00019136217282508819",
            "extra": "mean: 7.622866711534252 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 70.25219942992248,
            "unit": "iter/sec",
            "range": "stddev: 0.00037083638633051135",
            "extra": "mean: 14.234429784614978 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 43.19384768209505,
            "unit": "iter/sec",
            "range": "stddev: 0.005580918752098889",
            "extra": "mean: 23.151445255814185 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.681535945349005,
            "unit": "iter/sec",
            "range": "stddev: 0.008139005494555887",
            "extra": "mean: 40.51611707692123 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.050194093349155,
            "unit": "iter/sec",
            "range": "stddev: 0.010989972202283033",
            "extra": "mean: 49.874828909098184 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 163.17242368177452,
            "unit": "iter/sec",
            "range": "stddev: 0.00018007095632830772",
            "extra": "mean: 6.128486526315504 msec\nrounds: 133"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 131.43505934857544,
            "unit": "iter/sec",
            "range": "stddev: 0.0002322912721582009",
            "extra": "mean: 7.608320070430572 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 71.09938152294555,
            "unit": "iter/sec",
            "range": "stddev: 0.0006921350357553041",
            "extra": "mean: 14.064819954548758 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 44.432300333765156,
            "unit": "iter/sec",
            "range": "stddev: 0.0007073382518883997",
            "extra": "mean: 22.50614963637335 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.836842715238934,
            "unit": "iter/sec",
            "range": "stddev: 0.0004436099682314585",
            "extra": "mean: 38.70441953846729 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.9081978321747,
            "unit": "iter/sec",
            "range": "stddev: 0.0005151181300728728",
            "extra": "mean: 47.828129809502 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 153.76964096432596,
            "unit": "iter/sec",
            "range": "stddev: 0.00020822780867590387",
            "extra": "mean: 6.503234277772663 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 117.79915695116237,
            "unit": "iter/sec",
            "range": "stddev: 0.00037352664752489617",
            "extra": "mean: 8.489025099004603 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 54.73728173833255,
            "unit": "iter/sec",
            "range": "stddev: 0.005735706523901559",
            "extra": "mean: 18.269084036368938 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.70661186611327,
            "unit": "iter/sec",
            "range": "stddev: 0.010276801681195663",
            "extra": "mean: 30.57485758823224 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.325455064432763,
            "unit": "iter/sec",
            "range": "stddev: 0.015187151019613094",
            "extra": "mean: 54.568904100005966 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.442825146040152,
            "unit": "iter/sec",
            "range": "stddev: 0.019494042619571987",
            "extra": "mean: 69.23853123529464 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.570630415068958,
            "unit": "iter/sec",
            "range": "stddev: 0.032980797626313285",
            "extra": "mean: 389.00963520000005 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 52.48264231035394,
            "unit": "iter/sec",
            "range": "stddev: 0.014000218007707151",
            "extra": "mean: 19.053918704903257 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9173636366557715,
            "unit": "iter/sec",
            "range": "stddev: 0.04390309031968965",
            "extra": "mean: 1.0900802691999842 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 19.420962143517784,
            "unit": "iter/sec",
            "range": "stddev: 0.030304060950199413",
            "extra": "mean: 51.49075481483157 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.91661053858425,
            "unit": "iter/sec",
            "range": "stddev: 0.0073012562479160366",
            "extra": "mean: 112.15023866667353 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.386958382769641,
            "unit": "iter/sec",
            "range": "stddev: 0.01204326734994344",
            "extra": "mean: 185.63351133332162 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 195.1233501024895,
            "unit": "iter/sec",
            "range": "stddev: 0.00019313072245827218",
            "extra": "mean: 5.124963257727715 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 131.85896380628483,
            "unit": "iter/sec",
            "range": "stddev: 0.0005367869416681082",
            "extra": "mean: 7.583860597214374 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 250.59048574668736,
            "unit": "iter/sec",
            "range": "stddev: 0.00023965552132327656",
            "extra": "mean: 3.990574490568899 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 231.57511954291996,
            "unit": "iter/sec",
            "range": "stddev: 0.00011095163612761794",
            "extra": "mean: 4.31825319565326 msec\nrounds: 92"
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
          "id": "212d04b8c3855647c5c838bd86f99f224a52dd7b",
          "message": "add python-dotenv",
          "timestamp": "2023-07-25T11:31:58+02:00",
          "tree_id": "54afd9f2b4a79c19ea0fd62eff333ad152526dac",
          "url": "https://github.com/developmentseed/tipg/commit/212d04b8c3855647c5c838bd86f99f224a52dd7b"
        },
        "date": 1690277894988,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 105.00325163571058,
            "unit": "iter/sec",
            "range": "stddev: 0.0010169796231847665",
            "extra": "mean: 9.523514599998443 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 87.78636793902102,
            "unit": "iter/sec",
            "range": "stddev: 0.0007291133369957465",
            "extra": "mean: 11.391290282047315 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 47.811910893223505,
            "unit": "iter/sec",
            "range": "stddev: 0.001228633490402312",
            "extra": "mean: 20.91529038095259 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 28.883540506574608,
            "unit": "iter/sec",
            "range": "stddev: 0.008791621050958194",
            "extra": "mean: 34.62179436666967 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 17.432584218807882,
            "unit": "iter/sec",
            "range": "stddev: 0.011289843905308823",
            "extra": "mean: 57.36384161110822 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 14.302747018488358,
            "unit": "iter/sec",
            "range": "stddev: 0.01245222382226618",
            "extra": "mean: 69.91663900000162 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 103.47716751981328,
            "unit": "iter/sec",
            "range": "stddev: 0.0008407276568322371",
            "extra": "mean: 9.663967655555755 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 78.11131776800298,
            "unit": "iter/sec",
            "range": "stddev: 0.0017439816085647699",
            "extra": "mean: 12.802242089553296 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 43.22166784107944,
            "unit": "iter/sec",
            "range": "stddev: 0.0009460560136786619",
            "extra": "mean: 23.136543542856156 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 26.391769656115443,
            "unit": "iter/sec",
            "range": "stddev: 0.0020038642735650094",
            "extra": "mean: 37.89060047999783 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 14.846047746779767,
            "unit": "iter/sec",
            "range": "stddev: 0.002811127261065107",
            "extra": "mean: 67.35799433333418 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 12.188881986866368,
            "unit": "iter/sec",
            "range": "stddev: 0.0043335044426142805",
            "extra": "mean: 82.04197900000256 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 100.68838072758113,
            "unit": "iter/sec",
            "range": "stddev: 0.0007731553135188455",
            "extra": "mean: 9.931632555553396 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 74.01738951955632,
            "unit": "iter/sec",
            "range": "stddev: 0.0030334791376776206",
            "extra": "mean: 13.510338671641312 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 38.24080331553383,
            "unit": "iter/sec",
            "range": "stddev: 0.00888762771810401",
            "extra": "mean: 26.150078274997668 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 23.419021132710945,
            "unit": "iter/sec",
            "range": "stddev: 0.013031787318397266",
            "extra": "mean: 42.70033296153578 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 12.803280403926665,
            "unit": "iter/sec",
            "range": "stddev: 0.023091136311944368",
            "extra": "mean: 78.10498313333105 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 10.104908467916458,
            "unit": "iter/sec",
            "range": "stddev: 0.025669768684655887",
            "extra": "mean: 98.96180684615257 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.8090879926799093,
            "unit": "iter/sec",
            "range": "stddev: 0.03709925361481404",
            "extra": "mean: 552.7647101999946 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 37.28878165330165,
            "unit": "iter/sec",
            "range": "stddev: 0.01934732301181426",
            "extra": "mean: 26.817717170211097 msec\nrounds: 47"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6866186540727094,
            "unit": "iter/sec",
            "range": "stddev: 0.07817089856328971",
            "extra": "mean: 1.4564125137999895 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 15.27703100679635,
            "unit": "iter/sec",
            "range": "stddev: 0.036974224320526015",
            "extra": "mean: 65.45774500000205 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.554344791313247,
            "unit": "iter/sec",
            "range": "stddev: 0.018246665639017397",
            "extra": "mean: 152.5705515714313 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.043692544365607,
            "unit": "iter/sec",
            "range": "stddev: 0.020120889614549404",
            "extra": "mean: 247.29872239999509 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 126.54978183676988,
            "unit": "iter/sec",
            "range": "stddev: 0.0009175786530689313",
            "extra": "mean: 7.902028636365799 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 89.43707994684456,
            "unit": "iter/sec",
            "range": "stddev: 0.0005896479763260558",
            "extra": "mean: 11.181044826087048 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 154.59202436722595,
            "unit": "iter/sec",
            "range": "stddev: 0.0010980549418486722",
            "extra": "mean: 6.468639013514357 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 143.79954404461074,
            "unit": "iter/sec",
            "range": "stddev: 0.0009297213461523417",
            "extra": "mean: 6.954124970589415 msec\nrounds: 68"
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
          "id": "d82345bc831fdb7f6f7d87d8705256194c52eb74",
          "message": "Merge pull request #96 from jackharrhy/fix-functions-without-params\n\nfix function based collections without params",
          "timestamp": "2023-07-25T12:00:19+02:00",
          "tree_id": "b88bf18a247eae9f32660fe878bfd78fd2a7fe02",
          "url": "https://github.com/developmentseed/tipg/commit/d82345bc831fdb7f6f7d87d8705256194c52eb74"
        },
        "date": 1690279557794,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 147.6843872139382,
            "unit": "iter/sec",
            "range": "stddev: 0.0003965843132542051",
            "extra": "mean: 6.771196460675172 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 122.07321596718607,
            "unit": "iter/sec",
            "range": "stddev: 0.0003837201132353725",
            "extra": "mean: 8.19180515624988 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 66.26072124147035,
            "unit": "iter/sec",
            "range": "stddev: 0.0005756287985380435",
            "extra": "mean: 15.091897299996996 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 41.51872109155455,
            "unit": "iter/sec",
            "range": "stddev: 0.0007345007397036521",
            "extra": "mean: 24.0855203076911 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 23.06508607474991,
            "unit": "iter/sec",
            "range": "stddev: 0.010393128132840717",
            "extra": "mean: 43.355571999999256 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 18.840460433646307,
            "unit": "iter/sec",
            "range": "stddev: 0.012490159939016336",
            "extra": "mean: 53.077259100003005 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 122.17063906352409,
            "unit": "iter/sec",
            "range": "stddev: 0.006015271471279031",
            "extra": "mean: 8.18527272727155 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 109.73744650569799,
            "unit": "iter/sec",
            "range": "stddev: 0.0007354138473109917",
            "extra": "mean: 9.11265964210381 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 59.52040603877231,
            "unit": "iter/sec",
            "range": "stddev: 0.0006591653141157724",
            "extra": "mean: 16.800960654545737 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 37.60410676813701,
            "unit": "iter/sec",
            "range": "stddev: 0.0026505493424491613",
            "extra": "mean: 26.59284014285715 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 21.936398398632065,
            "unit": "iter/sec",
            "range": "stddev: 0.0023682327445616914",
            "extra": "mean: 45.58633472221945 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 17.847738897177624,
            "unit": "iter/sec",
            "range": "stddev: 0.0035988112931765077",
            "extra": "mean: 56.02950635714064 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 131.56996084964695,
            "unit": "iter/sec",
            "range": "stddev: 0.000314188819532124",
            "extra": "mean: 7.600519096777427 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 106.99816750607526,
            "unit": "iter/sec",
            "range": "stddev: 0.00039152298150208533",
            "extra": "mean: 9.345954452380886 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 48.0192400571532,
            "unit": "iter/sec",
            "range": "stddev: 0.008643942567900482",
            "extra": "mean: 20.82498595999823 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 27.290515719062352,
            "unit": "iter/sec",
            "range": "stddev: 0.019291810433902223",
            "extra": "mean: 36.642766677417626 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 15.496152587913079,
            "unit": "iter/sec",
            "range": "stddev: 0.02621048499740607",
            "extra": "mean: 64.53214721052727 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.556907973677824,
            "unit": "iter/sec",
            "range": "stddev: 0.025106102391975502",
            "extra": "mean: 73.76313256249922 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.999749696129927,
            "unit": "iter/sec",
            "range": "stddev: 0.03252189993674356",
            "extra": "mean: 500.0625838000019 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 40.45541960421821,
            "unit": "iter/sec",
            "range": "stddev: 0.020815020731728105",
            "extra": "mean: 24.718567000000462 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7745983615666685,
            "unit": "iter/sec",
            "range": "stddev: 0.05669248544009443",
            "extra": "mean: 1.2909916281999927 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 17.27678484680565,
            "unit": "iter/sec",
            "range": "stddev: 0.031180264279218745",
            "extra": "mean: 57.881139857158814 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.412960980765318,
            "unit": "iter/sec",
            "range": "stddev: 0.011306347912375565",
            "extra": "mean: 118.86421466666913 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.179645963083899,
            "unit": "iter/sec",
            "range": "stddev: 0.011396115931285629",
            "extra": "mean: 193.06338833332384 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 181.56865256917774,
            "unit": "iter/sec",
            "range": "stddev: 0.00021091527212534252",
            "extra": "mean: 5.507558633332918 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 125.61026770074818,
            "unit": "iter/sec",
            "range": "stddev: 0.00022743750511270666",
            "extra": "mean: 7.961132623189558 msec\nrounds: 69"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 216.84198217968503,
            "unit": "iter/sec",
            "range": "stddev: 0.0005233457988317943",
            "extra": "mean: 4.6116531030940076 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 210.24746318390163,
            "unit": "iter/sec",
            "range": "stddev: 0.00030318728144414475",
            "extra": "mean: 4.756299956519849 msec\nrounds: 69"
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
          "id": "09c9a8e2d8c723c57fe68ab8ea3e5845e857e0f1",
          "message": "Merge pull request #89 from RemcoMeeuwissen/fix-decimal-error\n\nFixed a bug where floats in the database would not be serialized corr…",
          "timestamp": "2023-07-26T17:29:13+02:00",
          "tree_id": "e25d6e93cef954669373c72b02dcbba720f72d1e",
          "url": "https://github.com/developmentseed/tipg/commit/09c9a8e2d8c723c57fe68ab8ea3e5845e857e0f1"
        },
        "date": 1690385719767,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 146.18751005180297,
            "unit": "iter/sec",
            "range": "stddev: 0.00029832764698919614",
            "extra": "mean: 6.8405296707334315 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 120.38756003476055,
            "unit": "iter/sec",
            "range": "stddev: 0.00029826656208947",
            "extra": "mean: 8.30650608510764 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 67.60263446534374,
            "unit": "iter/sec",
            "range": "stddev: 0.00044847616515546125",
            "extra": "mean: 14.792322931033798 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 40.20836591090399,
            "unit": "iter/sec",
            "range": "stddev: 0.008988461427947429",
            "extra": "mean: 24.870446170726197 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 23.288125653753895,
            "unit": "iter/sec",
            "range": "stddev: 0.013378839088361016",
            "extra": "mean: 42.94033855999942 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 18.17812090940749,
            "unit": "iter/sec",
            "range": "stddev: 0.019792512389984716",
            "extra": "mean: 55.01118652382177 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 151.3327212210829,
            "unit": "iter/sec",
            "range": "stddev: 0.00018346444056715366",
            "extra": "mean: 6.607956243244275 msec\nrounds: 111"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 118.76741005719592,
            "unit": "iter/sec",
            "range": "stddev: 0.00042365365117087847",
            "extra": "mean: 8.419818193546703 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 63.07405677048163,
            "unit": "iter/sec",
            "range": "stddev: 0.0016585666018277432",
            "extra": "mean: 15.854378982453454 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 37.35981928488639,
            "unit": "iter/sec",
            "range": "stddev: 0.0029133472516693934",
            "extra": "mean: 26.766724763161307 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 22.926316446709453,
            "unit": "iter/sec",
            "range": "stddev: 0.0005463700381408414",
            "extra": "mean: 43.617996913042134 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 18.869425987452864,
            "unit": "iter/sec",
            "range": "stddev: 0.0005825550337440239",
            "extra": "mean: 52.995782736843466 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 135.0724075304927,
            "unit": "iter/sec",
            "range": "stddev: 0.00040276175779324955",
            "extra": "mean: 7.403436558826784 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 101.22630861657937,
            "unit": "iter/sec",
            "range": "stddev: 0.0012319796687617075",
            "extra": "mean: 9.878854752945271 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 49.27847190556349,
            "unit": "iter/sec",
            "range": "stddev: 0.009704152078359809",
            "extra": "mean: 20.292837040815403 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 29.63249262229695,
            "unit": "iter/sec",
            "range": "stddev: 0.016618072396826198",
            "extra": "mean: 33.74673918749416 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.007019499286542,
            "unit": "iter/sec",
            "range": "stddev: 0.026188953326994925",
            "extra": "mean: 62.47259210526803 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.119575880097665,
            "unit": "iter/sec",
            "range": "stddev: 0.02429894988819139",
            "extra": "mean: 70.82365706250116 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.879165021991727,
            "unit": "iter/sec",
            "range": "stddev: 0.04335137191477952",
            "extra": "mean: 532.1512417999884 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 43.08388816961201,
            "unit": "iter/sec",
            "range": "stddev: 0.020065420963998985",
            "extra": "mean: 23.210532811319506 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7208458288005087,
            "unit": "iter/sec",
            "range": "stddev: 0.062489376785663894",
            "extra": "mean: 1.387259189200006 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 15.116968259964022,
            "unit": "iter/sec",
            "range": "stddev: 0.040397484796777294",
            "extra": "mean: 66.15083016668184 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.55581499944816,
            "unit": "iter/sec",
            "range": "stddev: 0.008374062458492352",
            "extra": "mean: 116.87957255556587 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.117666418353592,
            "unit": "iter/sec",
            "range": "stddev: 0.013699994045810519",
            "extra": "mean: 195.40155966666362 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 181.42094304596816,
            "unit": "iter/sec",
            "range": "stddev: 0.00033807579256629316",
            "extra": "mean: 5.512042784093684 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 126.40577747277955,
            "unit": "iter/sec",
            "range": "stddev: 0.00015474747881671572",
            "extra": "mean: 7.911030808819967 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 235.4387070442592,
            "unit": "iter/sec",
            "range": "stddev: 0.00011828061156006256",
            "extra": "mean: 4.2473899578968295 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 217.4276206829725,
            "unit": "iter/sec",
            "range": "stddev: 0.00011603969520798529",
            "extra": "mean: 4.599231674700993 msec\nrounds: 83"
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
          "id": "b221c04cee4e04d4f915c22d24059b78ecd7a1f0",
          "message": "Bump version: 0.2.0 → 0.3.0",
          "timestamp": "2023-07-27T01:31:28+02:00",
          "tree_id": "97a48a26fbeb50540dccf613b575430e41a7402d",
          "url": "https://github.com/developmentseed/tipg/commit/b221c04cee4e04d4f915c22d24059b78ecd7a1f0"
        },
        "date": 1690414640060,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 163.99835462203632,
            "unit": "iter/sec",
            "range": "stddev: 0.00013590631526260664",
            "extra": "mean: 6.097622151787314 msec\nrounds: 112"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 131.89288972563457,
            "unit": "iter/sec",
            "range": "stddev: 0.00017109394123749128",
            "extra": "mean: 7.581909851851863 msec\nrounds: 108"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 69.9067717720951,
            "unit": "iter/sec",
            "range": "stddev: 0.00018149112777717606",
            "extra": "mean: 14.30476582812501 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 42.3602657149329,
            "unit": "iter/sec",
            "range": "stddev: 0.005808810662568753",
            "extra": "mean: 23.607028500000144 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.782744902528837,
            "unit": "iter/sec",
            "range": "stddev: 0.007255799218981546",
            "extra": "mean: 40.350655423078656 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 19.929534839976935,
            "unit": "iter/sec",
            "range": "stddev: 0.010679224949665481",
            "extra": "mean: 50.176785761907794 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 162.07547605591162,
            "unit": "iter/sec",
            "range": "stddev: 0.00018769819453157412",
            "extra": "mean: 6.169964909774673 msec\nrounds: 133"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 130.92418432512713,
            "unit": "iter/sec",
            "range": "stddev: 0.0001838545982765252",
            "extra": "mean: 7.63800825000121 msec\nrounds: 108"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 69.17395727363494,
            "unit": "iter/sec",
            "range": "stddev: 0.0003111440886636293",
            "extra": "mean: 14.456307538460596 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 44.41337518833174,
            "unit": "iter/sec",
            "range": "stddev: 0.0007194817381772395",
            "extra": "mean: 22.515739813954053 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.23033143167309,
            "unit": "iter/sec",
            "range": "stddev: 0.0005040269474214216",
            "extra": "mean: 39.63483407691753 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.94286029579706,
            "unit": "iter/sec",
            "range": "stddev: 0.0008052366305702815",
            "extra": "mean: 47.748969619048935 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 154.17223999305912,
            "unit": "iter/sec",
            "range": "stddev: 0.00016772981834538235",
            "extra": "mean: 6.486252000003504 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 117.13054824490762,
            "unit": "iter/sec",
            "range": "stddev: 0.00023798870314024426",
            "extra": "mean: 8.537482450001903 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 55.66157600370841,
            "unit": "iter/sec",
            "range": "stddev: 0.0050491666522661785",
            "extra": "mean: 17.9657148035725 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.80307552263518,
            "unit": "iter/sec",
            "range": "stddev: 0.009891416966225029",
            "extra": "mean: 30.48494642857398 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.218640173595244,
            "unit": "iter/sec",
            "range": "stddev: 0.015639093820834542",
            "extra": "mean: 54.888838600003 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.379071215156278,
            "unit": "iter/sec",
            "range": "stddev: 0.019725252532199315",
            "extra": "mean: 69.54552105882532 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.5548172289323636,
            "unit": "iter/sec",
            "range": "stddev: 0.024185337516436558",
            "extra": "mean: 391.4174324000044 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 52.58035757113382,
            "unit": "iter/sec",
            "range": "stddev: 0.012849280796398741",
            "extra": "mean: 19.018508929825 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9402115984562898,
            "unit": "iter/sec",
            "range": "stddev: 0.03827049720294203",
            "extra": "mean: 1.063590368000007 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 22.202407190538096,
            "unit": "iter/sec",
            "range": "stddev: 0.020684992914153533",
            "extra": "mean: 45.04016125000021 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.95564081246,
            "unit": "iter/sec",
            "range": "stddev: 0.008242105019332958",
            "extra": "mean: 111.66146800000041 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.455393063925138,
            "unit": "iter/sec",
            "range": "stddev: 0.011136893963916726",
            "extra": "mean: 183.30484866667027 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 192.22413473324917,
            "unit": "iter/sec",
            "range": "stddev: 0.0004134576947355003",
            "extra": "mean: 5.2022603789462085 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 132.05119145022482,
            "unit": "iter/sec",
            "range": "stddev: 0.00013179581227348825",
            "extra": "mean: 7.5728207297314585 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 249.04050683784044,
            "unit": "iter/sec",
            "range": "stddev: 0.00015431250215822338",
            "extra": "mean: 4.01541103773587 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 228.36798784400196,
            "unit": "iter/sec",
            "range": "stddev: 0.0001136653364245568",
            "extra": "mean: 4.378897451612612 msec\nrounds: 93"
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
          "id": "5b56d5a361649f81fb0937df84f30c4b7edfb6f5",
          "message": "Merge pull request #103 from developmentseed/fixQueryables\n\nfix queryable mediatype and add more benchmarks",
          "timestamp": "2023-07-28T11:07:26+02:00",
          "tree_id": "163a8118953eb99a57ae4aba666aa91a04fa5193",
          "url": "https://github.com/developmentseed/tipg/commit/5b56d5a361649f81fb0937df84f30c4b7edfb6f5"
        },
        "date": 1690535613569,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 202.51897260257877,
            "unit": "iter/sec",
            "range": "stddev: 0.0014283228472898124",
            "extra": "mean: 4.937808972408675 msec\nrounds: 145"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 74.20033929055055,
            "unit": "iter/sec",
            "range": "stddev: 0.0013100572335618492",
            "extra": "mean: 13.477027323072504 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 205.11501743333085,
            "unit": "iter/sec",
            "range": "stddev: 0.00768592623385865",
            "extra": "mean: 4.87531343396167 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 116.41186648832058,
            "unit": "iter/sec",
            "range": "stddev: 0.0010435404014175328",
            "extra": "mean: 8.590189558556114 msec\nrounds: 111"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 233.67830422532305,
            "unit": "iter/sec",
            "range": "stddev: 0.0010250747421822542",
            "extra": "mean: 4.27938743956202 msec\nrounds: 182"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 271.2123775590695,
            "unit": "iter/sec",
            "range": "stddev: 0.0007912901141325826",
            "extra": "mean: 3.6871473529345167 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 298.54969209153825,
            "unit": "iter/sec",
            "range": "stddev: 0.0012380950744016938",
            "extra": "mean: 3.349526147537912 msec\nrounds: 244"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 109.75499796886919,
            "unit": "iter/sec",
            "range": "stddev: 0.0012883314082100473",
            "extra": "mean: 9.11120239174565 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 88.15754091086673,
            "unit": "iter/sec",
            "range": "stddev: 0.0009515402702006115",
            "extra": "mean: 11.34332910908969 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 51.62538527194908,
            "unit": "iter/sec",
            "range": "stddev: 0.0010557106378578786",
            "extra": "mean: 19.37031548979752 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 31.28144351374806,
            "unit": "iter/sec",
            "range": "stddev: 0.002961787791145995",
            "extra": "mean: 31.96783420689983 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 18.62451043495671,
            "unit": "iter/sec",
            "range": "stddev: 0.023675760529220144",
            "extra": "mean: 53.692686499994124 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 15.388027199598103,
            "unit": "iter/sec",
            "range": "stddev: 0.014647573454757352",
            "extra": "mean: 64.98558827775645 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 107.17996298520201,
            "unit": "iter/sec",
            "range": "stddev: 0.0013955778358363945",
            "extra": "mean: 9.330102121215202 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 89.68788900570752,
            "unit": "iter/sec",
            "range": "stddev: 0.0018110326054271869",
            "extra": "mean: 11.14977742353109 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 50.799699193952165,
            "unit": "iter/sec",
            "range": "stddev: 0.0011797164283022374",
            "extra": "mean: 19.685155933345616 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 33.483685974006,
            "unit": "iter/sec",
            "range": "stddev: 0.0018301469722615115",
            "extra": "mean: 29.865290242427857 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 17.7753691915576,
            "unit": "iter/sec",
            "range": "stddev: 0.005409680563549354",
            "extra": "mean: 56.25762194998174 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 14.55082242674367,
            "unit": "iter/sec",
            "range": "stddev: 0.004005975450082535",
            "extra": "mean: 68.7246377333319 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 87.27230638217964,
            "unit": "iter/sec",
            "range": "stddev: 0.0032659903187607243",
            "extra": "mean: 11.458388593752034 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 74.02717501149428,
            "unit": "iter/sec",
            "range": "stddev: 0.0015764818276248703",
            "extra": "mean: 13.50855276923277 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 37.30931974390455,
            "unit": "iter/sec",
            "range": "stddev: 0.010755659092412013",
            "extra": "mean: 26.802954512816495 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 22.99942637129659,
            "unit": "iter/sec",
            "range": "stddev: 0.01560237600637189",
            "extra": "mean: 43.479345260889005 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 12.692017492989322,
            "unit": "iter/sec",
            "range": "stddev: 0.02783118819451325",
            "extra": "mean: 78.78968024999722 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 10.9097476560638,
            "unit": "iter/sec",
            "range": "stddev: 0.032428126695096045",
            "extra": "mean: 91.66114850000083 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.6925156651955384,
            "unit": "iter/sec",
            "range": "stddev: 0.03992066098597475",
            "extra": "mean: 590.8364811999945 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 33.376369888841666,
            "unit": "iter/sec",
            "range": "stddev: 0.02474516252772601",
            "extra": "mean: 29.96131704347867 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6363946734359932,
            "unit": "iter/sec",
            "range": "stddev: 0.07758402345501894",
            "extra": "mean: 1.5713519326000096 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.126210017518677,
            "unit": "iter/sec",
            "range": "stddev: 0.04503454404264476",
            "extra": "mean: 76.18345270000759 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.218287935057197,
            "unit": "iter/sec",
            "range": "stddev: 0.009475881291940226",
            "extra": "mean: 138.53700614286677 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.440751405050426,
            "unit": "iter/sec",
            "range": "stddev: 0.010554228134858755",
            "extra": "mean: 225.18711560001066 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 142.70422267507286,
            "unit": "iter/sec",
            "range": "stddev: 0.0006841178929308271",
            "extra": "mean: 7.007501118428201 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 104.90149361612781,
            "unit": "iter/sec",
            "range": "stddev: 0.00034654351651692915",
            "extra": "mean: 9.532752733334368 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 173.9578480087039,
            "unit": "iter/sec",
            "range": "stddev: 0.001338161465229377",
            "extra": "mean: 5.748519031748228 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 187.88918753736007,
            "unit": "iter/sec",
            "range": "stddev: 0.00013290524649129664",
            "extra": "mean: 5.3222860405480175 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 236.42139222899286,
            "unit": "iter/sec",
            "range": "stddev: 0.00021656108700195443",
            "extra": "mean: 4.229735687502512 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 67.89948045484856,
            "unit": "iter/sec",
            "range": "stddev: 0.0014375524808720752",
            "extra": "mean: 14.72765319117537 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 64.52472859343712,
            "unit": "iter/sec",
            "range": "stddev: 0.001309633717668366",
            "extra": "mean: 15.49793423077972 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 13.45823689721071,
            "unit": "iter/sec",
            "range": "stddev: 0.007530971503977255",
            "extra": "mean: 74.30393800002548 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 83.65954468033804,
            "unit": "iter/sec",
            "range": "stddev: 0.0010336480791151698",
            "extra": "mean: 11.953208732141515 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 74.63303857482894,
            "unit": "iter/sec",
            "range": "stddev: 0.0015180085814139258",
            "extra": "mean: 13.398891685180084 msec\nrounds: 54"
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
          "id": "9ab9dfa8353beb2ae928fbfa75087522a9ab67af",
          "message": "Bump version: 0.3.0 → 0.3.1",
          "timestamp": "2023-07-28T11:08:16+02:00",
          "tree_id": "d5059504e6c2a0890448348a9ffe3588e985decf",
          "url": "https://github.com/developmentseed/tipg/commit/9ab9dfa8353beb2ae928fbfa75087522a9ab67af"
        },
        "date": 1690535646012,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 286.76431861406854,
            "unit": "iter/sec",
            "range": "stddev: 0.00008631645712990422",
            "extra": "mean: 3.487184196531139 msec\nrounds: 173"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 93.16741445249104,
            "unit": "iter/sec",
            "range": "stddev: 0.0048601690665402795",
            "extra": "mean: 10.733366444444274 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 331.1665752847282,
            "unit": "iter/sec",
            "range": "stddev: 0.0004170698124405977",
            "extra": "mean: 3.019628412499742 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 149.6852038516404,
            "unit": "iter/sec",
            "range": "stddev: 0.0002073632217206974",
            "extra": "mean: 6.68068703030357 msec\nrounds: 132"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 321.3984230600226,
            "unit": "iter/sec",
            "range": "stddev: 0.00010395858433282049",
            "extra": "mean: 3.111402944915027 msec\nrounds: 236"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 369.8120972271591,
            "unit": "iter/sec",
            "range": "stddev: 0.00013126390478508941",
            "extra": "mean: 2.704075955053857 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 428.55551621483454,
            "unit": "iter/sec",
            "range": "stddev: 0.00008922848198768916",
            "extra": "mean: 2.3334199704915264 msec\nrounds: 305"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 155.72262554154105,
            "unit": "iter/sec",
            "range": "stddev: 0.000504483262753289",
            "extra": "mean: 6.421674413222868 msec\nrounds: 121"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 128.39329700588343,
            "unit": "iter/sec",
            "range": "stddev: 0.00014634961680762984",
            "extra": "mean: 7.788568588235385 msec\nrounds: 102"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 67.8772736430315,
            "unit": "iter/sec",
            "range": "stddev: 0.0006327792356177469",
            "extra": "mean: 14.732471508196221 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 44.081607982785386,
            "unit": "iter/sec",
            "range": "stddev: 0.0003530081623505423",
            "extra": "mean: 22.685197880951097 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 23.35282556630204,
            "unit": "iter/sec",
            "range": "stddev: 0.013460126464505945",
            "extra": "mean: 42.82137067999997 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 20.392610104973738,
            "unit": "iter/sec",
            "range": "stddev: 0.009992079435067289",
            "extra": "mean: 49.03737161905042 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 154.20994533333356,
            "unit": "iter/sec",
            "range": "stddev: 0.00019333902967295114",
            "extra": "mean: 6.4846660689648985 msec\nrounds: 116"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 123.9004723224775,
            "unit": "iter/sec",
            "range": "stddev: 0.0002240856687799088",
            "extra": "mean: 8.070994252526221 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 65.32580323816155,
            "unit": "iter/sec",
            "range": "stddev: 0.0007065386519347086",
            "extra": "mean: 15.307886783332 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 41.47027674106725,
            "unit": "iter/sec",
            "range": "stddev: 0.0005445667071152338",
            "extra": "mean: 24.113656300000486 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 24.04888286556055,
            "unit": "iter/sec",
            "range": "stddev: 0.00044361496464213825",
            "extra": "mean: 41.58197308333437 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.565070938241742,
            "unit": "iter/sec",
            "range": "stddev: 0.0015025850679868417",
            "extra": "mean: 51.11149370000021 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 147.26623118270118,
            "unit": "iter/sec",
            "range": "stddev: 0.0002374096732250611",
            "extra": "mean: 6.790422977276995 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 101.92727049243763,
            "unit": "iter/sec",
            "range": "stddev: 0.005094840757490294",
            "extra": "mean: 9.810917089889049 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 52.254645824650176,
            "unit": "iter/sec",
            "range": "stddev: 0.007604973333825073",
            "extra": "mean: 19.137054403845337 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 30.829754515686652,
            "unit": "iter/sec",
            "range": "stddev: 0.013477882325261469",
            "extra": "mean: 32.43619729411679 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.792801315667823,
            "unit": "iter/sec",
            "range": "stddev: 0.022320962820431643",
            "extra": "mean: 59.549326000004044 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.762283437033314,
            "unit": "iter/sec",
            "range": "stddev: 0.025428806629403767",
            "extra": "mean: 72.66236047057947 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.15747557290408,
            "unit": "iter/sec",
            "range": "stddev: 0.034427315609366446",
            "extra": "mean: 463.5046683999974 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 46.52843960605907,
            "unit": "iter/sec",
            "range": "stddev: 0.0171304142536",
            "extra": "mean: 21.492231599999265 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.8080933854748051,
            "unit": "iter/sec",
            "range": "stddev: 0.05234569413066211",
            "extra": "mean: 1.2374807392000093 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.85727368076158,
            "unit": "iter/sec",
            "range": "stddev: 0.03381256955190462",
            "extra": "mean: 59.32157351999649 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.71820430688592,
            "unit": "iter/sec",
            "range": "stddev: 0.008223568872350472",
            "extra": "mean: 114.70251955556579 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.289346777609338,
            "unit": "iter/sec",
            "range": "stddev: 0.011246058703993067",
            "extra": "mean: 189.05926233333048 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 185.62194753418638,
            "unit": "iter/sec",
            "range": "stddev: 0.00022190245007439917",
            "extra": "mean: 5.38729397726973 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 128.61958857522302,
            "unit": "iter/sec",
            "range": "stddev: 0.00010604749713943805",
            "extra": "mean: 7.774865485712163 msec\nrounds: 70"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 239.85122126550894,
            "unit": "iter/sec",
            "range": "stddev: 0.00007737705626186187",
            "extra": "mean: 4.16925123300926 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 220.33329131503334,
            "unit": "iter/sec",
            "range": "stddev: 0.00009342415493519985",
            "extra": "mean: 4.538578777776239 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 282.83060862519676,
            "unit": "iter/sec",
            "range": "stddev: 0.00023708223776374031",
            "extra": "mean: 3.5356852105253798 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 88.06658951731735,
            "unit": "iter/sec",
            "range": "stddev: 0.00031340708312263283",
            "extra": "mean: 11.355044012501025 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 85.1710554567315,
            "unit": "iter/sec",
            "range": "stddev: 0.00028491168310076703",
            "extra": "mean: 11.741077935895943 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 17.639522306499206,
            "unit": "iter/sec",
            "range": "stddev: 0.00045765218661362317",
            "extra": "mean: 56.69087759998774 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 105.76408558275295,
            "unit": "iter/sec",
            "range": "stddev: 0.0001168761347963868",
            "extra": "mean: 9.455005397059574 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 96.96005271377315,
            "unit": "iter/sec",
            "range": "stddev: 0.0001396444242341492",
            "extra": "mean: 10.313525746030768 msec\nrounds: 63"
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
          "id": "10d2a56bf6b56d1623dc1ae6f22ceaa95eb59b7d",
          "message": "Merge pull request #102 from developmentseed/pydantic2.0\n\nupdate to pydantic 2.0",
          "timestamp": "2023-07-29T10:01:17+02:00",
          "tree_id": "77e2842a6822d543323399fdc5ca616fd9a3fd6b",
          "url": "https://github.com/developmentseed/tipg/commit/10d2a56bf6b56d1623dc1ae6f22ceaa95eb59b7d"
        },
        "date": 1690618026578,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 347.63624223001307,
            "unit": "iter/sec",
            "range": "stddev: 0.0001117491255011305",
            "extra": "mean: 2.876570042252244 msec\nrounds: 142"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 222.6552207039787,
            "unit": "iter/sec",
            "range": "stddev: 0.00011635561210881972",
            "extra": "mean: 4.491248832334838 msec\nrounds: 167"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 346.7739622912217,
            "unit": "iter/sec",
            "range": "stddev: 0.0002520407915469434",
            "extra": "mean: 2.883722853332908 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 187.66529824316132,
            "unit": "iter/sec",
            "range": "stddev: 0.006705304639214229",
            "extra": "mean: 5.328635658065466 msec\nrounds: 155"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 447.4476939647223,
            "unit": "iter/sec",
            "range": "stddev: 0.0001440240619515655",
            "extra": "mean: 2.2348980975614148 msec\nrounds: 246"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 425.6996979748443,
            "unit": "iter/sec",
            "range": "stddev: 0.00015402354901536736",
            "extra": "mean: 2.3490737831321944 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 508.80856331630497,
            "unit": "iter/sec",
            "range": "stddev: 0.0000874752558931561",
            "extra": "mean: 1.9653757269378775 msec\nrounds: 271"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 147.25991090804237,
            "unit": "iter/sec",
            "range": "stddev: 0.00043197708198756447",
            "extra": "mean: 6.790714416664683 msec\nrounds: 108"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 129.12697500731562,
            "unit": "iter/sec",
            "range": "stddev: 0.0003450980139072363",
            "extra": "mean: 7.74431523655956 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 84.95783918076378,
            "unit": "iter/sec",
            "range": "stddev: 0.00024122813613854606",
            "extra": "mean: 11.770544185714423 msec\nrounds: 70"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 59.75287915459385,
            "unit": "iter/sec",
            "range": "stddev: 0.00047060081978880216",
            "extra": "mean: 16.735595240737773 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 31.708059527266705,
            "unit": "iter/sec",
            "range": "stddev: 0.018593055089518282",
            "extra": "mean: 31.53772305555533 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 29.59634175773027,
            "unit": "iter/sec",
            "range": "stddev: 0.015574939294630651",
            "extra": "mean: 33.787959612907564 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 124.03755471262741,
            "unit": "iter/sec",
            "range": "stddev: 0.008147417156635374",
            "extra": "mean: 8.062074444444017 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 107.42755892640803,
            "unit": "iter/sec",
            "range": "stddev: 0.0006055328874540195",
            "extra": "mean: 9.308598370787127 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 60.1143213504334,
            "unit": "iter/sec",
            "range": "stddev: 0.0005309796111959867",
            "extra": "mean: 16.634971127271825 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 38.85338674307326,
            "unit": "iter/sec",
            "range": "stddev: 0.0003799320056733728",
            "extra": "mean: 25.737782052636096 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 22.652690445171817,
            "unit": "iter/sec",
            "range": "stddev: 0.000501562852586111",
            "extra": "mean: 44.144866695652894 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 18.98843744674015,
            "unit": "iter/sec",
            "range": "stddev: 0.00037395620243871905",
            "extra": "mean: 52.66362768420819 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 135.67397546348246,
            "unit": "iter/sec",
            "range": "stddev: 0.00035730987283902365",
            "extra": "mean: 7.370610292680312 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 96.05307464782533,
            "unit": "iter/sec",
            "range": "stddev: 0.0016375328449299508",
            "extra": "mean: 10.410910880952631 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 53.426981846772186,
            "unit": "iter/sec",
            "range": "stddev: 0.013378665733785843",
            "extra": "mean: 18.717134403511427 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 33.55005251682379,
            "unit": "iter/sec",
            "range": "stddev: 0.023084724699384846",
            "extra": "mean: 29.80621265789514 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.67281392506666,
            "unit": "iter/sec",
            "range": "stddev: 0.035838392685145534",
            "extra": "mean: 53.553792374998466 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 15.834618932849153,
            "unit": "iter/sec",
            "range": "stddev: 0.038502360495151385",
            "extra": "mean: 63.152766999999294 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.650569828829924,
            "unit": "iter/sec",
            "range": "stddev: 0.006459550032306911",
            "extra": "mean: 605.8513747999939 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 36.985737651181736,
            "unit": "iter/sec",
            "range": "stddev: 0.02834651287412336",
            "extra": "mean: 27.037449122447036 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6811502502483415,
            "unit": "iter/sec",
            "range": "stddev: 0.06288951191163777",
            "extra": "mean: 1.4681048706000013 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.896597103048512,
            "unit": "iter/sec",
            "range": "stddev: 0.05006085976834651",
            "extra": "mean: 71.96006278260948 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.54544307539835,
            "unit": "iter/sec",
            "range": "stddev: 0.007466780455798991",
            "extra": "mean: 117.0214336666662 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.243863091292697,
            "unit": "iter/sec",
            "range": "stddev: 0.011021901952097308",
            "extra": "mean: 190.69910533333237 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 172.43188040076868,
            "unit": "iter/sec",
            "range": "stddev: 0.00011225784241635338",
            "extra": "mean: 5.799391607142399 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 120.65338380670893,
            "unit": "iter/sec",
            "range": "stddev: 0.000293788096531491",
            "extra": "mean: 8.288205174601948 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 209.00828376383876,
            "unit": "iter/sec",
            "range": "stddev: 0.00016941295246266134",
            "extra": "mean: 4.784499360465126 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 199.46832903604312,
            "unit": "iter/sec",
            "range": "stddev: 0.00012450571184145074",
            "extra": "mean: 5.0133272025320075 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 513.2823511193628,
            "unit": "iter/sec",
            "range": "stddev: 0.00007495579445069315",
            "extra": "mean: 1.9482454399984852 msec\nrounds: 325"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 651.2938888803793,
            "unit": "iter/sec",
            "range": "stddev: 0.00010388856556741968",
            "extra": "mean: 1.5354051635876262 msec\nrounds: 379"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 568.9938081962266,
            "unit": "iter/sec",
            "range": "stddev: 0.004559422771215148",
            "extra": "mean: 1.757488369109166 msec\nrounds: 382"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 47.65164679134862,
            "unit": "iter/sec",
            "range": "stddev: 0.0004888724832032812",
            "extra": "mean: 20.985633600002984 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 222.13102761327522,
            "unit": "iter/sec",
            "range": "stddev: 0.0001131033474932489",
            "extra": "mean: 4.50184744897942 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 218.7584351371738,
            "unit": "iter/sec",
            "range": "stddev: 0.00010967386274578008",
            "extra": "mean: 4.571252301073301 msec\nrounds: 93"
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
          "id": "8a55a62862ab344ea0b1f54f24b0b8dda01dda4b",
          "message": "Merge pull request #105 from developmentseed/customCatalogFuncInMiddleware\n\nallow custom function in middleware",
          "timestamp": "2023-07-31T12:18:01+02:00",
          "tree_id": "fbde86e2b2bd49d74060972e8d4635c376e52eac",
          "url": "https://github.com/developmentseed/tipg/commit/8a55a62862ab344ea0b1f54f24b0b8dda01dda4b"
        },
        "date": 1690799110901,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 278.71544482350714,
            "unit": "iter/sec",
            "range": "stddev: 0.00046021207566134393",
            "extra": "mean: 3.5878887179475707 msec\nrounds: 117"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 178.8703157702964,
            "unit": "iter/sec",
            "range": "stddev: 0.0006218431123226768",
            "extra": "mean: 5.590642559630692 msec\nrounds: 109"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 285.6631887986418,
            "unit": "iter/sec",
            "range": "stddev: 0.00030800856480145427",
            "extra": "mean: 3.5006260491787753 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 179.10599415236453,
            "unit": "iter/sec",
            "range": "stddev: 0.0008303054311373497",
            "extra": "mean: 5.583286057692214 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 389.9159392997291,
            "unit": "iter/sec",
            "range": "stddev: 0.0001292476783230711",
            "extra": "mean: 2.564655350576213 msec\nrounds: 174"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 372.9029641574772,
            "unit": "iter/sec",
            "range": "stddev: 0.0001877049024908442",
            "extra": "mean: 2.681662781252925 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 402.7558616050596,
            "unit": "iter/sec",
            "range": "stddev: 0.0006595685730006517",
            "extra": "mean: 2.4828937213099955 msec\nrounds: 183"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 112.813510926242,
            "unit": "iter/sec",
            "range": "stddev: 0.0022797810785194815",
            "extra": "mean: 8.86418649494744 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 95.5611400119002,
            "unit": "iter/sec",
            "range": "stddev: 0.0022360691563050486",
            "extra": "mean: 10.464504712642295 msec\nrounds: 87"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 69.38285397058672,
            "unit": "iter/sec",
            "range": "stddev: 0.0009713893477169291",
            "extra": "mean: 14.4127827377053 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 49.979267577499535,
            "unit": "iter/sec",
            "range": "stddev: 0.0017947047417054462",
            "extra": "mean: 20.008296409093354 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 28.76220461640985,
            "unit": "iter/sec",
            "range": "stddev: 0.013330333123149435",
            "extra": "mean: 34.76784945161904 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 24.5465698300114,
            "unit": "iter/sec",
            "range": "stddev: 0.01582622706529066",
            "extra": "mean: 40.73888966666817 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 108.78723330191318,
            "unit": "iter/sec",
            "range": "stddev: 0.002141848655535085",
            "extra": "mean: 9.19225509876455 msec\nrounds: 81"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 94.11421303421307,
            "unit": "iter/sec",
            "range": "stddev: 0.0007147553545802457",
            "extra": "mean: 10.625387683329752 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 50.93695487712613,
            "unit": "iter/sec",
            "range": "stddev: 0.0011090505392466617",
            "extra": "mean: 19.632111939401828 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 30.43939608980401,
            "unit": "iter/sec",
            "range": "stddev: 0.003070968989040103",
            "extra": "mean: 32.85216293548479 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 19.497174569997714,
            "unit": "iter/sec",
            "range": "stddev: 0.0014442466680549483",
            "extra": "mean: 51.28948281248924 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 15.35366425762779,
            "unit": "iter/sec",
            "range": "stddev: 0.005329770121126705",
            "extra": "mean: 65.13103212499871 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 108.19786738788818,
            "unit": "iter/sec",
            "range": "stddev: 0.00108766668593488",
            "extra": "mean: 9.242326342856748 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 90.63590935592231,
            "unit": "iter/sec",
            "range": "stddev: 0.0008928280754597501",
            "extra": "mean: 11.033154597401944 msec\nrounds: 77"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 50.12828098630962,
            "unit": "iter/sec",
            "range": "stddev: 0.011300243255340726",
            "extra": "mean: 19.948818916673144 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 28.989649249048487,
            "unit": "iter/sec",
            "range": "stddev: 0.020430974467612335",
            "extra": "mean: 34.49507068571458 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 22.02157054991327,
            "unit": "iter/sec",
            "range": "stddev: 0.0019062293637007294",
            "extra": "mean: 45.41002185713491 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.235208248493898,
            "unit": "iter/sec",
            "range": "stddev: 0.03456925990543105",
            "extra": "mean: 70.24835763156477 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.577355863343541,
            "unit": "iter/sec",
            "range": "stddev: 0.04048718092704633",
            "extra": "mean: 633.9723477999996 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 33.62723026875854,
            "unit": "iter/sec",
            "range": "stddev: 0.02733257481091729",
            "extra": "mean: 29.737804511632717 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6376210732779191,
            "unit": "iter/sec",
            "range": "stddev: 0.02035979991969709",
            "extra": "mean: 1.5683295956000052 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 12.96326703439684,
            "unit": "iter/sec",
            "range": "stddev: 0.04848703617575701",
            "extra": "mean: 77.14104764999377 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.031910274399878,
            "unit": "iter/sec",
            "range": "stddev: 0.009640354149116853",
            "extra": "mean: 142.2088680000034 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.387545429303559,
            "unit": "iter/sec",
            "range": "stddev: 0.011540020485440972",
            "extra": "mean: 227.91786799999727 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 131.61867649260435,
            "unit": "iter/sec",
            "range": "stddev: 0.001311562148144681",
            "extra": "mean: 7.597705938459197 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 94.95006460687657,
            "unit": "iter/sec",
            "range": "stddev: 0.0009191854647195392",
            "extra": "mean: 10.531851706897912 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 184.09250932349966,
            "unit": "iter/sec",
            "range": "stddev: 0.00022198639556609014",
            "extra": "mean: 5.4320515466641455 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 153.14913678244096,
            "unit": "iter/sec",
            "range": "stddev: 0.0015958781867165314",
            "extra": "mean: 6.529583000004562 msec\nrounds: 69"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 407.29613588231945,
            "unit": "iter/sec",
            "range": "stddev: 0.0012943119536191637",
            "extra": "mean: 2.4552160256411844 msec\nrounds: 273"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 543.1394493007977,
            "unit": "iter/sec",
            "range": "stddev: 0.00013812967419820198",
            "extra": "mean: 1.841147795998495 msec\nrounds: 250"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 534.7519592239221,
            "unit": "iter/sec",
            "range": "stddev: 0.00014616851956417444",
            "extra": "mean: 1.8700258741478677 msec\nrounds: 294"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 38.40526470426876,
            "unit": "iter/sec",
            "range": "stddev: 0.0012607111800344438",
            "extra": "mean: 26.03809680001632 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 177.60436953578377,
            "unit": "iter/sec",
            "range": "stddev: 0.0010236316765277408",
            "extra": "mean: 5.630492102270715 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 181.94643835408982,
            "unit": "iter/sec",
            "range": "stddev: 0.00020974558584597346",
            "extra": "mean: 5.496122974684884 msec\nrounds: 79"
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
          "id": "7286527686ffebbeee1ce81f4b14f93e67235403",
          "message": "fix dsn construct",
          "timestamp": "2023-07-31T12:27:31+02:00",
          "tree_id": "d8ccec0121b677dde443c7f4f5f2a3b60e9be155",
          "url": "https://github.com/developmentseed/tipg/commit/7286527686ffebbeee1ce81f4b14f93e67235403"
        },
        "date": 1690799612740,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 377.71211390431563,
            "unit": "iter/sec",
            "range": "stddev: 0.00013139400062925984",
            "extra": "mean: 2.6475190050518904 msec\nrounds: 198"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 232.3271183165135,
            "unit": "iter/sec",
            "range": "stddev: 0.00020023611645186352",
            "extra": "mean: 4.304275829899627 msec\nrounds: 194"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 378.94718732399724,
            "unit": "iter/sec",
            "range": "stddev: 0.00015814277424633475",
            "extra": "mean: 2.638890150001316 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 212.40213870501398,
            "unit": "iter/sec",
            "range": "stddev: 0.00399191450038647",
            "extra": "mean: 4.708050521980897 msec\nrounds: 182"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 495.40196268165187,
            "unit": "iter/sec",
            "range": "stddev: 0.00011322423292332025",
            "extra": "mean: 2.018562854670412 msec\nrounds: 289"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 466.2997894252864,
            "unit": "iter/sec",
            "range": "stddev: 0.00014187328211069788",
            "extra": "mean: 2.1445431086994446 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 552.537982236958,
            "unit": "iter/sec",
            "range": "stddev: 0.00011010651980381874",
            "extra": "mean: 1.8098303322994838 msec\nrounds: 322"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 158.39041777216588,
            "unit": "iter/sec",
            "range": "stddev: 0.00017889343398061518",
            "extra": "mean: 6.313513241933826 msec\nrounds: 124"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 138.28673915770636,
            "unit": "iter/sec",
            "range": "stddev: 0.0007580990509207676",
            "extra": "mean: 7.231351365220709 msec\nrounds: 115"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 91.35430812909183,
            "unit": "iter/sec",
            "range": "stddev: 0.00028179241130272495",
            "extra": "mean: 10.94639125925961 msec\nrounds: 81"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 60.24464189106877,
            "unit": "iter/sec",
            "range": "stddev: 0.0014587983170594764",
            "extra": "mean: 16.598986542374142 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 34.77148067441637,
            "unit": "iter/sec",
            "range": "stddev: 0.013629089037301392",
            "extra": "mean: 28.75920094871786 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 29.756613650621308,
            "unit": "iter/sec",
            "range": "stddev: 0.013713415567284231",
            "extra": "mean: 33.60597451515188 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 146.58370329736334,
            "unit": "iter/sec",
            "range": "stddev: 0.0010027750788373728",
            "extra": "mean: 6.822040769234594 msec\nrounds: 117"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 114.91111994543311,
            "unit": "iter/sec",
            "range": "stddev: 0.002256374504636824",
            "extra": "mean: 8.702377981128908 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 66.01645825993816,
            "unit": "iter/sec",
            "range": "stddev: 0.0012481275535443706",
            "extra": "mean: 15.147737796876726 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 42.72528039103436,
            "unit": "iter/sec",
            "range": "stddev: 0.0011770970330490793",
            "extra": "mean: 23.40534669047705 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 24.850570142055982,
            "unit": "iter/sec",
            "range": "stddev: 0.001364246341136007",
            "extra": "mean: 40.240525440003694 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.481826422749425,
            "unit": "iter/sec",
            "range": "stddev: 0.0012563477220513528",
            "extra": "mean: 48.82377085713837 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 142.15695615444866,
            "unit": "iter/sec",
            "range": "stddev: 0.000416531686667675",
            "extra": "mean: 7.034478136360308 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 119.29641327974556,
            "unit": "iter/sec",
            "range": "stddev: 0.00036374847184965353",
            "extra": "mean: 8.382481689998826 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 65.15535912999754,
            "unit": "iter/sec",
            "range": "stddev: 0.008113071771998583",
            "extra": "mean: 15.34793167212549 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 37.93749896716877,
            "unit": "iter/sec",
            "range": "stddev: 0.01604060045866516",
            "extra": "mean: 26.359144045457583 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 21.66745253356227,
            "unit": "iter/sec",
            "range": "stddev: 0.02513485001321875",
            "extra": "mean: 46.15217217857191 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 18.94005423672482,
            "unit": "iter/sec",
            "range": "stddev: 0.02530610479143542",
            "extra": "mean: 52.798159260864054 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.0790430460914,
            "unit": "iter/sec",
            "range": "stddev: 0.0343486636804605",
            "extra": "mean: 480.99052200001324 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 48.1367167869039,
            "unit": "iter/sec",
            "range": "stddev: 0.018449733049073682",
            "extra": "mean: 20.774162983048743 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.8605752380722784,
            "unit": "iter/sec",
            "range": "stddev: 0.04816452302976771",
            "extra": "mean: 1.1620134483999778 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 18.19577944192157,
            "unit": "iter/sec",
            "range": "stddev: 0.033897056505308394",
            "extra": "mean: 54.95779959258479 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.960445832280199,
            "unit": "iter/sec",
            "range": "stddev: 0.008691587656239423",
            "extra": "mean: 111.60158977776291 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.414545626708649,
            "unit": "iter/sec",
            "range": "stddev: 0.012174221886499451",
            "extra": "mean: 184.68770399998866 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 181.4795868171031,
            "unit": "iter/sec",
            "range": "stddev: 0.000168224368551209",
            "extra": "mean: 5.51026160869437 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 125.54349569608836,
            "unit": "iter/sec",
            "range": "stddev: 0.00015557482190898113",
            "extra": "mean: 7.965366859154279 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 229.05438253828942,
            "unit": "iter/sec",
            "range": "stddev: 0.00014333004209821678",
            "extra": "mean: 4.3657754499975 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 211.47565597969634,
            "unit": "iter/sec",
            "range": "stddev: 0.00014570206301753688",
            "extra": "mean: 4.728676666670369 msec\nrounds: 87"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 535.849414356135,
            "unit": "iter/sec",
            "range": "stddev: 0.00015865230623031545",
            "extra": "mean: 1.866195937158163 msec\nrounds: 366"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 708.7449810587152,
            "unit": "iter/sec",
            "range": "stddev: 0.00007751026957901431",
            "extra": "mean: 1.4109447357302076 msec\nrounds: 473"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 699.5140170961059,
            "unit": "iter/sec",
            "range": "stddev: 0.00006971543031679814",
            "extra": "mean: 1.4295639194641192 msec\nrounds: 447"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 50.672009658473655,
            "unit": "iter/sec",
            "range": "stddev: 0.000647140952879379",
            "extra": "mean: 19.73476100000653 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 228.81241622966346,
            "unit": "iter/sec",
            "range": "stddev: 0.00009522558094604729",
            "extra": "mean: 4.370392203700522 msec\nrounds: 108"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 222.4848352755302,
            "unit": "iter/sec",
            "range": "stddev: 0.00011605437351787853",
            "extra": "mean: 4.494688362744264 msec\nrounds: 102"
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
          "id": "ed443307f9b4bb9073638f992e7a687cde3f4f77",
          "message": "add global conformance classes variables",
          "timestamp": "2023-08-01T08:32:53+02:00",
          "tree_id": "8ac4a1db58bc827794c3a5274898ee93bcd15989",
          "url": "https://github.com/developmentseed/tipg/commit/ed443307f9b4bb9073638f992e7a687cde3f4f77"
        },
        "date": 1690873412020,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 355.9886646493779,
            "unit": "iter/sec",
            "range": "stddev: 0.0001033118535507717",
            "extra": "mean: 2.8090782075460883 msec\nrounds: 159"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 222.7537971771644,
            "unit": "iter/sec",
            "range": "stddev: 0.00010816779257686385",
            "extra": "mean: 4.489261295082044 msec\nrounds: 183"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 357.44095864723727,
            "unit": "iter/sec",
            "range": "stddev: 0.000130139223537629",
            "extra": "mean: 2.7976648333324103 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 195.6149717646286,
            "unit": "iter/sec",
            "range": "stddev: 0.005641832992215358",
            "extra": "mean: 5.112083144654378 msec\nrounds: 159"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 460.99243373100484,
            "unit": "iter/sec",
            "range": "stddev: 0.00007815686987733758",
            "extra": "mean: 2.169233000000849 msec\nrounds: 253"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 444.8380992022307,
            "unit": "iter/sec",
            "range": "stddev: 0.00011382405676900851",
            "extra": "mean: 2.248008886364258 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 509.7175058250684,
            "unit": "iter/sec",
            "range": "stddev: 0.00008032004223390596",
            "extra": "mean: 1.961871013987095 msec\nrounds: 286"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 150.44380594514095,
            "unit": "iter/sec",
            "range": "stddev: 0.00019473579443971486",
            "extra": "mean: 6.647000145453965 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 123.00449641263015,
            "unit": "iter/sec",
            "range": "stddev: 0.0008167461334460552",
            "extra": "mean: 8.129784106797251 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 85.16762403730691,
            "unit": "iter/sec",
            "range": "stddev: 0.0005016688021764838",
            "extra": "mean: 11.74155098611133 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 57.078571736232334,
            "unit": "iter/sec",
            "range": "stddev: 0.009294643902388955",
            "extra": "mean: 17.51970957894905 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 36.809007300180774,
            "unit": "iter/sec",
            "range": "stddev: 0.010699521648467228",
            "extra": "mean: 27.16726348648606 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 29.02756621784164,
            "unit": "iter/sec",
            "range": "stddev: 0.016513143082636912",
            "extra": "mean: 34.45001184375407 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 138.56227945120338,
            "unit": "iter/sec",
            "range": "stddev: 0.0003334462383122227",
            "extra": "mean: 7.216971342854993 msec\nrounds: 105"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 116.00187996978202,
            "unit": "iter/sec",
            "range": "stddev: 0.000268410589667246",
            "extra": "mean: 8.620549945056887 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 64.24431469548861,
            "unit": "iter/sec",
            "range": "stddev: 0.0003054834277202687",
            "extra": "mean: 15.565579689656527 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 39.609711738248436,
            "unit": "iter/sec",
            "range": "stddev: 0.0008413733073946946",
            "extra": "mean: 25.246333692309282 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.59075293523305,
            "unit": "iter/sec",
            "range": "stddev: 0.0006212956154994842",
            "extra": "mean: 42.38949060869053 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.08919539309989,
            "unit": "iter/sec",
            "range": "stddev: 0.002686238390384306",
            "extra": "mean: 52.385654785715424 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 141.71527789065283,
            "unit": "iter/sec",
            "range": "stddev: 0.00021820776990673067",
            "extra": "mean: 7.056402209305884 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 103.6131765898839,
            "unit": "iter/sec",
            "range": "stddev: 0.0080006154897564",
            "extra": "mean: 9.651282133334702 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 59.95804748741611,
            "unit": "iter/sec",
            "range": "stddev: 0.01080721088180493",
            "extra": "mean: 16.678328296295476 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 37.774215525937784,
            "unit": "iter/sec",
            "range": "stddev: 0.017380304262079784",
            "extra": "mean: 26.473084512194486 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 20.080868561699795,
            "unit": "iter/sec",
            "range": "stddev: 0.02999385163224944",
            "extra": "mean: 49.798642769232515 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 18.215111793262462,
            "unit": "iter/sec",
            "range": "stddev: 0.027896104856480468",
            "extra": "mean: 54.899470909088095 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.9085991611890845,
            "unit": "iter/sec",
            "range": "stddev: 0.032307721108128636",
            "extra": "mean: 523.9444825999954 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 37.345052874218155,
            "unit": "iter/sec",
            "range": "stddev: 0.026397809428230067",
            "extra": "mean: 26.777308452825043 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7491332503571992,
            "unit": "iter/sec",
            "range": "stddev: 0.04623618740210678",
            "extra": "mean: 1.3348760043999959 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.05082011735677,
            "unit": "iter/sec",
            "range": "stddev: 0.042809911347628404",
            "extra": "mean: 62.302112458330804 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.39307426452861,
            "unit": "iter/sec",
            "range": "stddev: 0.010642371627283747",
            "extra": "mean: 119.14585388887468 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.250059351264982,
            "unit": "iter/sec",
            "range": "stddev: 0.012278507984562993",
            "extra": "mean: 190.47403716665676 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 168.86099644281103,
            "unit": "iter/sec",
            "range": "stddev: 0.00022211760039143853",
            "extra": "mean: 5.9220306705857615 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 120.05555648555628,
            "unit": "iter/sec",
            "range": "stddev: 0.00014294069729537792",
            "extra": "mean: 8.329477029414367 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 183.2507004602369,
            "unit": "iter/sec",
            "range": "stddev: 0.008380476585426996",
            "extra": "mean: 5.45700506185507 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 198.66009747427137,
            "unit": "iter/sec",
            "range": "stddev: 0.00010992970349732899",
            "extra": "mean: 5.033723494117941 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 509.1522499704589,
            "unit": "iter/sec",
            "range": "stddev: 0.00006761143232458129",
            "extra": "mean: 1.96404906402362 msec\nrounds: 328"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 655.8079359148294,
            "unit": "iter/sec",
            "range": "stddev: 0.0000737560745334783",
            "extra": "mean: 1.5248366865293186 msec\nrounds: 386"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 644.3504387218894,
            "unit": "iter/sec",
            "range": "stddev: 0.0000924301040506494",
            "extra": "mean: 1.5519505224262196 msec\nrounds: 379"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 45.69150325192192,
            "unit": "iter/sec",
            "range": "stddev: 0.0006172021814872651",
            "extra": "mean: 21.885907199998655 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 216.70675727385228,
            "unit": "iter/sec",
            "range": "stddev: 0.0002948092535268957",
            "extra": "mean: 4.614530772274444 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 209.97923049689015,
            "unit": "iter/sec",
            "range": "stddev: 0.00020126320733921456",
            "extra": "mean: 4.762375772278156 msec\nrounds: 101"
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
          "id": "8718f4e6eff5ffc0446f9472d68ff4f2b76b36b7",
          "message": "Bump version: 0.3.1 → 0.4.0",
          "timestamp": "2023-08-01T14:07:55+02:00",
          "tree_id": "bbb85c25075e60b92c9efbfdfb292c38343142ef",
          "url": "https://github.com/developmentseed/tipg/commit/8718f4e6eff5ffc0446f9472d68ff4f2b76b36b7"
        },
        "date": 1690892046424,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 336.7392224836744,
            "unit": "iter/sec",
            "range": "stddev: 0.00022988230867294554",
            "extra": "mean: 2.969657032003397 msec\nrounds: 125"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 214.24754872824263,
            "unit": "iter/sec",
            "range": "stddev: 0.00033153502686018594",
            "extra": "mean: 4.667497975757132 msec\nrounds: 165"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 332.48222282220877,
            "unit": "iter/sec",
            "range": "stddev: 0.00021621466043511214",
            "extra": "mean: 3.0076796031730666 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 201.8690929544467,
            "unit": "iter/sec",
            "range": "stddev: 0.0003634636896124336",
            "extra": "mean: 4.9537053214265825 msec\nrounds: 140"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 450.77568101107147,
            "unit": "iter/sec",
            "range": "stddev: 0.00018664253486750033",
            "extra": "mean: 2.2183982901585124 msec\nrounds: 193"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 313.87715174585963,
            "unit": "iter/sec",
            "range": "stddev: 0.007134356085740312",
            "extra": "mean: 3.1859598395033255 msec\nrounds: 81"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 488.28102208402254,
            "unit": "iter/sec",
            "range": "stddev: 0.0001494954252349151",
            "extra": "mean: 2.048000955949342 msec\nrounds: 227"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 147.84409253505015,
            "unit": "iter/sec",
            "range": "stddev: 0.00045059739462554243",
            "extra": "mean: 6.7638820249982246 msec\nrounds: 120"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 136.25303343291887,
            "unit": "iter/sec",
            "range": "stddev: 0.000425167764138489",
            "extra": "mean: 7.339286141415175 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 91.32506722367184,
            "unit": "iter/sec",
            "range": "stddev: 0.0005632155987743808",
            "extra": "mean: 10.949896128199025 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 65.7900198558148,
            "unit": "iter/sec",
            "range": "stddev: 0.0008573838794201178",
            "extra": "mean: 15.199873813560123 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 36.505698888231976,
            "unit": "iter/sec",
            "range": "stddev: 0.013502658421384775",
            "extra": "mean: 27.39298329999542 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 31.255075042810088,
            "unit": "iter/sec",
            "range": "stddev: 0.016045925030521914",
            "extra": "mean: 31.994803999999988 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 146.1166538270297,
            "unit": "iter/sec",
            "range": "stddev: 0.00041571181314521466",
            "extra": "mean: 6.843846842973712 msec\nrounds: 121"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 117.05900428976837,
            "unit": "iter/sec",
            "range": "stddev: 0.0004350613905970535",
            "extra": "mean: 8.542700376338377 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 63.908958724823584,
            "unit": "iter/sec",
            "range": "stddev: 0.0008722019574513241",
            "extra": "mean: 15.647258537034793 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 41.789781654521825,
            "unit": "iter/sec",
            "range": "stddev: 0.0009872846763183474",
            "extra": "mean: 23.929294684213694 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.685359100927062,
            "unit": "iter/sec",
            "range": "stddev: 0.001715765986455262",
            "extra": "mean: 42.22017473912225 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.199649707847055,
            "unit": "iter/sec",
            "range": "stddev: 0.002971122426748765",
            "extra": "mean: 52.08428357894945 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 140.22313047697125,
            "unit": "iter/sec",
            "range": "stddev: 0.0004938603793568664",
            "extra": "mean: 7.131491050003547 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 119.03732057788564,
            "unit": "iter/sec",
            "range": "stddev: 0.0006718229949947578",
            "extra": "mean: 8.400726722891113 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 67.0112726283392,
            "unit": "iter/sec",
            "range": "stddev: 0.008372612514098569",
            "extra": "mean: 14.922862389828694 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 36.73894074397234,
            "unit": "iter/sec",
            "range": "stddev: 0.021162363096427852",
            "extra": "mean: 27.21907544827806 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 21.639782964042723,
            "unit": "iter/sec",
            "range": "stddev: 0.02702129072500112",
            "extra": "mean: 46.21118435714574 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 17.836559865195877,
            "unit": "iter/sec",
            "range": "stddev: 0.028950805749745394",
            "extra": "mean: 56.064622750000126 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.9615335857091667,
            "unit": "iter/sec",
            "range": "stddev: 0.0351874482868636",
            "extra": "mean: 509.8051887999986 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 43.19831927019922,
            "unit": "iter/sec",
            "range": "stddev: 0.020913324744044677",
            "extra": "mean: 23.14904878000334 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7612481591805351,
            "unit": "iter/sec",
            "range": "stddev: 0.03546776643266132",
            "extra": "mean: 1.3136320763999947 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.005174932840106,
            "unit": "iter/sec",
            "range": "stddev: 0.04242620015144281",
            "extra": "mean: 62.47979195454822 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.792561384744603,
            "unit": "iter/sec",
            "range": "stddev: 0.008908270013247564",
            "extra": "mean: 113.73250139999413 msec\nrounds: 10"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.530054039061245,
            "unit": "iter/sec",
            "range": "stddev: 0.007634471632902721",
            "extra": "mean: 180.83005933333615 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 168.16795554234446,
            "unit": "iter/sec",
            "range": "stddev: 0.0003759080585668816",
            "extra": "mean: 5.946436089889916 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 116.87949956018507,
            "unit": "iter/sec",
            "range": "stddev: 0.000749883716017865",
            "extra": "mean: 8.555820342857194 msec\nrounds: 70"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 215.81436554215065,
            "unit": "iter/sec",
            "range": "stddev: 0.0007011568152934483",
            "extra": "mean: 4.633611842695848 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 199.3717105602847,
            "unit": "iter/sec",
            "range": "stddev: 0.00030327394860300795",
            "extra": "mean: 5.0157567349437295 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 514.8621850895909,
            "unit": "iter/sec",
            "range": "stddev: 0.00016731166933271402",
            "extra": "mean: 1.9422673269857462 msec\nrounds: 315"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 671.5977784185854,
            "unit": "iter/sec",
            "range": "stddev: 0.00014479044072184045",
            "extra": "mean: 1.4889864620378954 msec\nrounds: 461"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 649.7823800699699,
            "unit": "iter/sec",
            "range": "stddev: 0.00016194238885891936",
            "extra": "mean: 1.5389767877244038 msec\nrounds: 391"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 49.319296548602324,
            "unit": "iter/sec",
            "range": "stddev: 0.001633496027404733",
            "extra": "mean: 20.276039400005175 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 231.98051373455272,
            "unit": "iter/sec",
            "range": "stddev: 0.0003454147879534396",
            "extra": "mean: 4.310706894736278 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 217.05548398563346,
            "unit": "iter/sec",
            "range": "stddev: 0.0003173430966531262",
            "extra": "mean: 4.607116952945489 msec\nrounds: 85"
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
          "id": "fb77a7185a0e704ab430ec1afd8ea39905d14534",
          "message": "Merge pull request #108 from jackharrhy/fix-custom-sql-dir-not-optional\n\nfix custom sql dir not optional",
          "timestamp": "2023-08-04T16:46:41+02:00",
          "tree_id": "f978da05c766dec472341dc2a69f2fdc0238f7f3",
          "url": "https://github.com/developmentseed/tipg/commit/fb77a7185a0e704ab430ec1afd8ea39905d14534"
        },
        "date": 1691160818674,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 274.3847715885969,
            "unit": "iter/sec",
            "range": "stddev: 0.0021802932418432666",
            "extra": "mean: 3.6445171290313647 msec\nrounds: 155"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 180.52281340933288,
            "unit": "iter/sec",
            "range": "stddev: 0.0006995746594475077",
            "extra": "mean: 5.539466071429511 msec\nrounds: 154"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 296.1443327967591,
            "unit": "iter/sec",
            "range": "stddev: 0.00033373352971744554",
            "extra": "mean: 3.3767318474613184 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 173.13281161142115,
            "unit": "iter/sec",
            "range": "stddev: 0.0012182197686508435",
            "extra": "mean: 5.775912668965358 msec\nrounds: 145"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 375.6616741823571,
            "unit": "iter/sec",
            "range": "stddev: 0.0005337673006657883",
            "extra": "mean: 2.6619697156398527 msec\nrounds: 211"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 250.89179240001016,
            "unit": "iter/sec",
            "range": "stddev: 0.009712453437613849",
            "extra": "mean: 3.985782039476392 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 423.45006685130267,
            "unit": "iter/sec",
            "range": "stddev: 0.0004055009002218291",
            "extra": "mean: 2.3615535296423906 msec\nrounds: 253"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 122.58241159752548,
            "unit": "iter/sec",
            "range": "stddev: 0.0008151513318933591",
            "extra": "mean: 8.157777180002768 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 105.37011536800748,
            "unit": "iter/sec",
            "range": "stddev: 0.0018505057837135735",
            "extra": "mean: 9.49035688636648 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 73.99420982300542,
            "unit": "iter/sec",
            "range": "stddev: 0.0005788537740851672",
            "extra": "mean: 13.514570969701627 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 49.958608550183826,
            "unit": "iter/sec",
            "range": "stddev: 0.0014315019328407404",
            "extra": "mean: 20.01657029729905 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 30.653551069863042,
            "unit": "iter/sec",
            "range": "stddev: 0.013855007363460603",
            "extra": "mean: 32.622647787882144 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 24.241854259364956,
            "unit": "iter/sec",
            "range": "stddev: 0.016966741785872208",
            "extra": "mean: 41.25096988460305 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 115.3220076223768,
            "unit": "iter/sec",
            "range": "stddev: 0.0007633078262399948",
            "extra": "mean: 8.671371758238125 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 87.21179939716254,
            "unit": "iter/sec",
            "range": "stddev: 0.0021453846602799316",
            "extra": "mean: 11.466338349997804 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 47.48635433776881,
            "unit": "iter/sec",
            "range": "stddev: 0.002923531832305988",
            "extra": "mean: 21.058681255820023 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 33.13525375475183,
            "unit": "iter/sec",
            "range": "stddev: 0.0019883085933570833",
            "extra": "mean: 30.179337312501886 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 20.01130872408341,
            "unit": "iter/sec",
            "range": "stddev: 0.002785782365754906",
            "extra": "mean: 49.971744166662624 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 14.22894121679907,
            "unit": "iter/sec",
            "range": "stddev: 0.01031498929117397",
            "extra": "mean: 70.27929800000672 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 106.9270973544238,
            "unit": "iter/sec",
            "range": "stddev: 0.0018784425068976913",
            "extra": "mean: 9.352166333341769 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 91.52869419987078,
            "unit": "iter/sec",
            "range": "stddev: 0.0013252899567413447",
            "extra": "mean: 10.925535524589748 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 47.83353200846646,
            "unit": "iter/sec",
            "range": "stddev: 0.01417858697774938",
            "extra": "mean: 20.90583651282539 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 29.839125424444525,
            "unit": "iter/sec",
            "range": "stddev: 0.02152490987929095",
            "extra": "mean: 33.51304657142496 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.84314851004292,
            "unit": "iter/sec",
            "range": "stddev: 0.03724820510820347",
            "extra": "mean: 59.3713223750143 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 15.232956142190408,
            "unit": "iter/sec",
            "range": "stddev: 0.03477274737487962",
            "extra": "mean: 65.64713970588546 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.5815377112706173,
            "unit": "iter/sec",
            "range": "stddev: 0.03528049381372359",
            "extra": "mean: 632.2960197999919 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 35.30570009733197,
            "unit": "iter/sec",
            "range": "stddev: 0.026562353406788107",
            "extra": "mean: 28.32403825000398 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6537335835782201,
            "unit": "iter/sec",
            "range": "stddev: 0.08094548456110058",
            "extra": "mean: 1.5296751232000134 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 12.54357571128716,
            "unit": "iter/sec",
            "range": "stddev: 0.052699284756476214",
            "extra": "mean: 79.72208427778406 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.859715731899242,
            "unit": "iter/sec",
            "range": "stddev: 0.009129431087359944",
            "extra": "mean: 145.7786355999815 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 3.1800831180614204,
            "unit": "iter/sec",
            "range": "stddev: 0.029267345500715178",
            "extra": "mean: 314.4571896000002 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 136.66044199566474,
            "unit": "iter/sec",
            "range": "stddev: 0.0008110523637079429",
            "extra": "mean: 7.3174064520567175 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 90.17202986040289,
            "unit": "iter/sec",
            "range": "stddev: 0.0012641482703841375",
            "extra": "mean: 11.089913375002425 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 148.60208696967882,
            "unit": "iter/sec",
            "range": "stddev: 0.001577711040110143",
            "extra": "mean: 6.729380592104624 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 155.95319603577806,
            "unit": "iter/sec",
            "range": "stddev: 0.0009250755545807017",
            "extra": "mean: 6.412180227268856 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 378.74265654113486,
            "unit": "iter/sec",
            "range": "stddev: 0.0013993856822063523",
            "extra": "mean: 2.6403152186038255 msec\nrounds: 215"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 425.5051004122827,
            "unit": "iter/sec",
            "range": "stddev: 0.0052103549650832515",
            "extra": "mean: 2.350148092305062 msec\nrounds: 325"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 531.7102241649773,
            "unit": "iter/sec",
            "range": "stddev: 0.0003297737763000506",
            "extra": "mean: 1.8807236621609957 msec\nrounds: 148"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 40.7638317000643,
            "unit": "iter/sec",
            "range": "stddev: 0.0003194973683859287",
            "extra": "mean: 24.53155059999972 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 178.43288106212285,
            "unit": "iter/sec",
            "range": "stddev: 0.0006672112549243847",
            "extra": "mean: 5.604348223530852 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 172.61727072920985,
            "unit": "iter/sec",
            "range": "stddev: 0.001276351315360658",
            "extra": "mean: 5.793163081397176 msec\nrounds: 86"
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
          "id": "0c5bfbd8937eb498cd7c90c69c016b69fff6e319",
          "message": "Merge pull request #112 from developmentseed/LimitLEthenMaxLimit\n\nfix limit max bounds",
          "timestamp": "2023-08-23T11:24:53+02:00",
          "tree_id": "8e0b9db4a11ba79dd9da458b3ebd33dbbc7f40ac",
          "url": "https://github.com/developmentseed/tipg/commit/0c5bfbd8937eb498cd7c90c69c016b69fff6e319"
        },
        "date": 1692783096000,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 351.1752606863668,
            "unit": "iter/sec",
            "range": "stddev: 0.00011059761992607813",
            "extra": "mean: 2.847580999998448 msec\nrounds: 178"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 220.1762759876583,
            "unit": "iter/sec",
            "range": "stddev: 0.00010529192068997087",
            "extra": "mean: 4.541815395479092 msec\nrounds: 177"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 351.3360628599826,
            "unit": "iter/sec",
            "range": "stddev: 0.0001500494713953132",
            "extra": "mean: 2.846277697369565 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 212.9796120257455,
            "unit": "iter/sec",
            "range": "stddev: 0.00019551290553956635",
            "extra": "mean: 4.695285104938201 msec\nrounds: 162"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 457.6419480075752,
            "unit": "iter/sec",
            "range": "stddev: 0.00009760291984425956",
            "extra": "mean: 2.1851143767604264 msec\nrounds: 284"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 439.1698390104227,
            "unit": "iter/sec",
            "range": "stddev: 0.00012414094220100923",
            "extra": "mean: 2.277023399997802 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 507.485634735596,
            "unit": "iter/sec",
            "range": "stddev: 0.00009023914922209182",
            "extra": "mean: 1.9704991265831746 msec\nrounds: 316"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 152.2029653307068,
            "unit": "iter/sec",
            "range": "stddev: 0.00015597030790511765",
            "extra": "mean: 6.570174226416672 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 130.86682970526815,
            "unit": "iter/sec",
            "range": "stddev: 0.0002487036518960445",
            "extra": "mean: 7.641355737371731 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 87.32523875103531,
            "unit": "iter/sec",
            "range": "stddev: 0.0006077940594295685",
            "extra": "mean: 11.451443068492546 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 55.849340669675016,
            "unit": "iter/sec",
            "range": "stddev: 0.011661470097079551",
            "extra": "mean: 17.905314333334257 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 35.893723183046774,
            "unit": "iter/sec",
            "range": "stddev: 0.01344751405391408",
            "extra": "mean: 27.86002429729322 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 28.009283330344573,
            "unit": "iter/sec",
            "range": "stddev: 0.02014271140280111",
            "extra": "mean: 35.702448656250496 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 134.60028054475552,
            "unit": "iter/sec",
            "range": "stddev: 0.00043365143672364326",
            "extra": "mean: 7.429405020203454 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 112.15971636431846,
            "unit": "iter/sec",
            "range": "stddev: 0.00038894833287451643",
            "extra": "mean: 8.91585706896573 msec\nrounds: 87"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 61.78076198877681,
            "unit": "iter/sec",
            "range": "stddev: 0.0005766335901664156",
            "extra": "mean: 16.186268472727185 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 38.80772794421775,
            "unit": "iter/sec",
            "range": "stddev: 0.0006621520606558554",
            "extra": "mean: 25.768063552635716 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 22.62447585028216,
            "unit": "iter/sec",
            "range": "stddev: 0.000798223413385812",
            "extra": "mean: 44.199919000003206 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 18.840546333205975,
            "unit": "iter/sec",
            "range": "stddev: 0.001166290156320366",
            "extra": "mean: 53.077017105259095 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 128.6318646171046,
            "unit": "iter/sec",
            "range": "stddev: 0.0004261343565260571",
            "extra": "mean: 7.77412348780511 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 104.09962772450977,
            "unit": "iter/sec",
            "range": "stddev: 0.0011143061160842857",
            "extra": "mean: 9.60618228766782 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 56.20542255725287,
            "unit": "iter/sec",
            "range": "stddev: 0.01311265320243794",
            "extra": "mean: 17.79187762499898 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.48270472705144,
            "unit": "iter/sec",
            "range": "stddev: 0.026610896628608802",
            "extra": "mean: 30.785613710523457 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 20.132685127259236,
            "unit": "iter/sec",
            "range": "stddev: 0.03279029201958347",
            "extra": "mean: 49.670473346151965 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 15.91821629133545,
            "unit": "iter/sec",
            "range": "stddev: 0.03883719621542745",
            "extra": "mean: 62.82110895454517 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.6303696174439473,
            "unit": "iter/sec",
            "range": "stddev: 0.04494669807172677",
            "extra": "mean: 613.3578479999983 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 36.35652557161021,
            "unit": "iter/sec",
            "range": "stddev: 0.03034765075247402",
            "extra": "mean: 27.50537858823539 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.678035562599935,
            "unit": "iter/sec",
            "range": "stddev: 0.06211166388144272",
            "extra": "mean: 1.4748488945999951 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 14.269359755938586,
            "unit": "iter/sec",
            "range": "stddev: 0.05355542517536898",
            "extra": "mean: 70.08022904348056 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.311078122262174,
            "unit": "iter/sec",
            "range": "stddev: 0.002802798976217195",
            "extra": "mean: 120.32133320000753 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.201277210235694,
            "unit": "iter/sec",
            "range": "stddev: 0.007989603377698318",
            "extra": "mean: 192.26046980001001 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 171.1454145186599,
            "unit": "iter/sec",
            "range": "stddev: 0.00037911883770080397",
            "extra": "mean: 5.842984475000179 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 122.02348796946103,
            "unit": "iter/sec",
            "range": "stddev: 0.00012378270087726992",
            "extra": "mean: 8.195143546874117 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 216.17627233705068,
            "unit": "iter/sec",
            "range": "stddev: 0.00012151801990327828",
            "extra": "mean: 4.625854582416208 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 198.049633941588,
            "unit": "iter/sec",
            "range": "stddev: 0.0003306496942746104",
            "extra": "mean: 5.049239325001409 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 509.4110316514264,
            "unit": "iter/sec",
            "range": "stddev: 0.00006688845143508362",
            "extra": "mean: 1.9630513237182265 msec\nrounds: 312"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 660.2658973514885,
            "unit": "iter/sec",
            "range": "stddev: 0.0001619481363040681",
            "extra": "mean: 1.5145413446480882 msec\nrounds: 383"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 644.5778345470698,
            "unit": "iter/sec",
            "range": "stddev: 0.00021703528643257744",
            "extra": "mean: 1.5514030213320589 msec\nrounds: 375"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 47.85429248457596,
            "unit": "iter/sec",
            "range": "stddev: 0.0007156984752543712",
            "extra": "mean: 20.896766999999272 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 222.45208096883132,
            "unit": "iter/sec",
            "range": "stddev: 0.00031052295981707974",
            "extra": "mean: 4.495350169999597 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 216.83401323426452,
            "unit": "iter/sec",
            "range": "stddev: 0.00022403511412344047",
            "extra": "mean: 4.611822587628877 msec\nrounds: 97"
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
          "id": "8ee337e7dd81397d3ac3959984948541631c652b",
          "message": "replace stamen by osm",
          "timestamp": "2023-08-23T13:12:52+02:00",
          "tree_id": "1d68134f299d34d7daae12a98a8c22c46ba08961",
          "url": "https://github.com/developmentseed/tipg/commit/8ee337e7dd81397d3ac3959984948541631c652b"
        },
        "date": 1692789893200,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 198.35354865381453,
            "unit": "iter/sec",
            "range": "stddev: 0.0022683598745776275",
            "extra": "mean: 5.041502946565856 msec\nrounds: 131"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 127.47223970238488,
            "unit": "iter/sec",
            "range": "stddev: 0.008916232056562081",
            "extra": "mean: 7.8448452960012665 msec\nrounds: 125"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 205.01572461298022,
            "unit": "iter/sec",
            "range": "stddev: 0.0009342142313904138",
            "extra": "mean: 4.877674636361462 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 133.27994757051576,
            "unit": "iter/sec",
            "range": "stddev: 0.0018045745598911527",
            "extra": "mean: 7.503004152000585 msec\nrounds: 125"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 270.44314624241247,
            "unit": "iter/sec",
            "range": "stddev: 0.0018101867403058616",
            "extra": "mean: 3.6976348407944015 msec\nrounds: 201"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 246.41219227808105,
            "unit": "iter/sec",
            "range": "stddev: 0.0013080918135224575",
            "extra": "mean: 4.05824075000104 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 293.48710589046544,
            "unit": "iter/sec",
            "range": "stddev: 0.001132219527662965",
            "extra": "mean: 3.407304716048471 msec\nrounds: 243"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 91.8440773935854,
            "unit": "iter/sec",
            "range": "stddev: 0.001432294552791577",
            "extra": "mean: 10.888018349998063 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 82.84292384408063,
            "unit": "iter/sec",
            "range": "stddev: 0.0015296574295448192",
            "extra": "mean: 12.07103701315647 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 58.44876080617316,
            "unit": "iter/sec",
            "range": "stddev: 0.0013205033664885882",
            "extra": "mean: 17.109002589741536 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 44.12684304099972,
            "unit": "iter/sec",
            "range": "stddev: 0.0008326786904044281",
            "extra": "mean: 22.661942959999806 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 24.364070820585013,
            "unit": "iter/sec",
            "range": "stddev: 0.019374620963849842",
            "extra": "mean: 41.044044214282444 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 18.79901096022226,
            "unit": "iter/sec",
            "range": "stddev: 0.02960732117161317",
            "extra": "mean: 53.19428783333061 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 77.34253853316639,
            "unit": "iter/sec",
            "range": "stddev: 0.0031547265306611384",
            "extra": "mean: 12.929495449275631 msec\nrounds: 69"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 65.46814440226618,
            "unit": "iter/sec",
            "range": "stddev: 0.0036228104084009157",
            "extra": "mean: 15.274604300001897 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 33.924139310735555,
            "unit": "iter/sec",
            "range": "stddev: 0.005613507235015529",
            "extra": "mean: 29.477534885713144 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 22.51068200096423,
            "unit": "iter/sec",
            "range": "stddev: 0.005581407270812178",
            "extra": "mean: 44.423354208333876 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 12.259243813859888,
            "unit": "iter/sec",
            "range": "stddev: 0.0074144680346482925",
            "extra": "mean: 81.57109975000527 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 10.148555785877464,
            "unit": "iter/sec",
            "range": "stddev: 0.014946795071464201",
            "extra": "mean: 98.536187916667 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 84.3955806535726,
            "unit": "iter/sec",
            "range": "stddev: 0.0012720616412450303",
            "extra": "mean: 11.848961666663627 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 73.65324063298849,
            "unit": "iter/sec",
            "range": "stddev: 0.0015402545044678419",
            "extra": "mean: 13.577135118642843 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 42.45818219092993,
            "unit": "iter/sec",
            "range": "stddev: 0.012830571249688224",
            "extra": "mean: 23.552586295454347 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 24.278793804507053,
            "unit": "iter/sec",
            "range": "stddev: 0.024811030266266257",
            "extra": "mean: 41.188207620691706 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 15.580241480908946,
            "unit": "iter/sec",
            "range": "stddev: 0.038358828674951335",
            "extra": "mean: 64.18385756249911 msec\nrounds: 16"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 12.475680385667262,
            "unit": "iter/sec",
            "range": "stddev: 0.0422910875265749",
            "extra": "mean: 80.15594894117793 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.375604916002815,
            "unit": "iter/sec",
            "range": "stddev: 0.07459592773507814",
            "extra": "mean: 726.9529123999973 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 28.611292297765043,
            "unit": "iter/sec",
            "range": "stddev: 0.031454817262221914",
            "extra": "mean: 34.951234973686056 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.5925339349283278,
            "unit": "iter/sec",
            "range": "stddev: 0.08663548458668195",
            "extra": "mean: 1.6876670534000027 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.462967962641237,
            "unit": "iter/sec",
            "range": "stddev: 0.0543593478575802",
            "extra": "mean: 74.2778266111104 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.006239805654169,
            "unit": "iter/sec",
            "range": "stddev: 0.0067459334469639675",
            "extra": "mean: 166.49351880000154 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 3.751480579020586,
            "unit": "iter/sec",
            "range": "stddev: 0.01682986338157055",
            "extra": "mean: 266.56142260000024 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 104.90104534193765,
            "unit": "iter/sec",
            "range": "stddev: 0.001852325958819851",
            "extra": "mean: 9.532793469696886 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 77.46722943763076,
            "unit": "iter/sec",
            "range": "stddev: 0.0023833990084964948",
            "extra": "mean: 12.908684191489057 msec\nrounds: 47"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 138.76218506166947,
            "unit": "iter/sec",
            "range": "stddev: 0.0020008920007003753",
            "extra": "mean: 7.2065743239454925 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 120.43683845016703,
            "unit": "iter/sec",
            "range": "stddev: 0.0024953630964628325",
            "extra": "mean: 8.303107362069857 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 348.1610023459707,
            "unit": "iter/sec",
            "range": "stddev: 0.0010109668485546108",
            "extra": "mean: 2.8722343779510697 msec\nrounds: 254"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 427.6961601629596,
            "unit": "iter/sec",
            "range": "stddev: 0.0005524023892408437",
            "extra": "mean: 2.3381084357151645 msec\nrounds: 280"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 432.0708701635866,
            "unit": "iter/sec",
            "range": "stddev: 0.0010684444869703156",
            "extra": "mean: 2.3144351287125406 msec\nrounds: 303"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 35.586796270838725,
            "unit": "iter/sec",
            "range": "stddev: 0.0014004476523779112",
            "extra": "mean: 28.100309799998513 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 156.73869473484942,
            "unit": "iter/sec",
            "range": "stddev: 0.0005951477670171625",
            "extra": "mean: 6.3800454743589174 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 149.9458075666864,
            "unit": "iter/sec",
            "range": "stddev: 0.0016760561004696794",
            "extra": "mean: 6.669076089741711 msec\nrounds: 78"
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
          "id": "7f560400b8ca0f851a3835b65f6dc555905987d1",
          "message": "Bump version: 0.4.1 → 0.4.2",
          "timestamp": "2023-08-24T10:26:13+02:00",
          "tree_id": "5cc9d66cd2ff9f74cbcc6eee23d20dc2b362da05",
          "url": "https://github.com/developmentseed/tipg/commit/7f560400b8ca0f851a3835b65f6dc555905987d1"
        },
        "date": 1692865965482,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 321.0333360692814,
            "unit": "iter/sec",
            "range": "stddev: 0.00013893762909992846",
            "extra": "mean: 3.1149413087249997 msec\nrounds: 149"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 188.02749608986,
            "unit": "iter/sec",
            "range": "stddev: 0.005096088537376831",
            "extra": "mean: 5.318371093566502 msec\nrounds: 171"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 314.6994656362525,
            "unit": "iter/sec",
            "range": "stddev: 0.00019369878150175284",
            "extra": "mean: 3.1776348840574666 msec\nrounds: 69"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 192.73275966675138,
            "unit": "iter/sec",
            "range": "stddev: 0.0002353129239471544",
            "extra": "mean: 5.188531527951299 msec\nrounds: 161"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 413.17655253021286,
            "unit": "iter/sec",
            "range": "stddev: 0.00011032100450786559",
            "extra": "mean: 2.4202728685260437 msec\nrounds: 251"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 394.0713744420855,
            "unit": "iter/sec",
            "range": "stddev: 0.00016225716223562756",
            "extra": "mean: 2.537611369046458 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 459.2956120980983,
            "unit": "iter/sec",
            "range": "stddev: 0.00010768381276925884",
            "extra": "mean: 2.1772470140350824 msec\nrounds: 285"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 132.68415195742497,
            "unit": "iter/sec",
            "range": "stddev: 0.000597166416869997",
            "extra": "mean: 7.536695115788018 msec\nrounds: 95"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 119.53176371537451,
            "unit": "iter/sec",
            "range": "stddev: 0.0004610283501388436",
            "extra": "mean: 8.365977117021133 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 79.05344874244446,
            "unit": "iter/sec",
            "range": "stddev: 0.0005134121110545427",
            "extra": "mean: 12.64966950724683 msec\nrounds: 69"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 55.10349911422278,
            "unit": "iter/sec",
            "range": "stddev: 0.0006564959610907585",
            "extra": "mean: 18.147667862745394 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 34.61472511168205,
            "unit": "iter/sec",
            "range": "stddev: 0.0004663743203026604",
            "extra": "mean: 28.88943929999641 msec\nrounds: 10"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 26.881884840386373,
            "unit": "iter/sec",
            "range": "stddev: 0.017849387801061708",
            "extra": "mean: 37.19977248387123 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 126.39692487285116,
            "unit": "iter/sec",
            "range": "stddev: 0.00039107207757935436",
            "extra": "mean: 7.911584882353339 msec\nrounds: 102"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 105.09589216717958,
            "unit": "iter/sec",
            "range": "stddev: 0.00029517365378043655",
            "extra": "mean: 9.515119757575931 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 55.65636850457983,
            "unit": "iter/sec",
            "range": "stddev: 0.0014690061276341885",
            "extra": "mean: 17.967395769231914 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 36.437768047941546,
            "unit": "iter/sec",
            "range": "stddev: 0.0006365103097411149",
            "extra": "mean: 27.444051970589687 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 21.136476282801414,
            "unit": "iter/sec",
            "range": "stddev: 0.0015833344733025554",
            "extra": "mean: 47.31157580952564 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 17.525206318685466,
            "unit": "iter/sec",
            "range": "stddev: 0.0013957404915761519",
            "extra": "mean: 57.060669176476104 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 124.38150437731834,
            "unit": "iter/sec",
            "range": "stddev: 0.00022831845132946935",
            "extra": "mean: 8.039780552632996 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 92.20625542588667,
            "unit": "iter/sec",
            "range": "stddev: 0.0023469402737279596",
            "extra": "mean: 10.84525117500057 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 53.90336971891784,
            "unit": "iter/sec",
            "range": "stddev: 0.01162604378978923",
            "extra": "mean: 18.551715880000756 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 35.175447148252125,
            "unit": "iter/sec",
            "range": "stddev: 0.018429659601643188",
            "extra": "mean: 28.428920769232928 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 19.78991925459045,
            "unit": "iter/sec",
            "range": "stddev: 0.027612303480114227",
            "extra": "mean: 50.53077716666484 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 15.98297952052562,
            "unit": "iter/sec",
            "range": "stddev: 0.03238175224232871",
            "extra": "mean: 62.566557050003276 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.7246290756602434,
            "unit": "iter/sec",
            "range": "stddev: 0.0333606589248284",
            "extra": "mean: 579.8348260000012 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 35.217308007756436,
            "unit": "iter/sec",
            "range": "stddev: 0.026398392805377105",
            "extra": "mean: 28.395128888890515 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6876045893767304,
            "unit": "iter/sec",
            "range": "stddev: 0.04691290996107222",
            "extra": "mean: 1.4543242082000005 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 15.222335284195612,
            "unit": "iter/sec",
            "range": "stddev: 0.04333734240131064",
            "extra": "mean: 65.69294272727238 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.596345075083812,
            "unit": "iter/sec",
            "range": "stddev: 0.0025998974066651806",
            "extra": "mean: 131.64225560000204 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.610467859249983,
            "unit": "iter/sec",
            "range": "stddev: 0.011108559119185239",
            "extra": "mean: 216.89772720000633 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 151.3879955586381,
            "unit": "iter/sec",
            "range": "stddev: 0.0004879300179907673",
            "extra": "mean: 6.605543565788632 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 101.86476628035535,
            "unit": "iter/sec",
            "range": "stddev: 0.001765099979118353",
            "extra": "mean: 9.816937067796035 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 191.43775241423796,
            "unit": "iter/sec",
            "range": "stddev: 0.0001684876331251218",
            "extra": "mean: 5.223630069768967 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 172.33670737131078,
            "unit": "iter/sec",
            "range": "stddev: 0.0008179858808695659",
            "extra": "mean: 5.802594323944197 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 460.58504456979273,
            "unit": "iter/sec",
            "range": "stddev: 0.00015924762969733358",
            "extra": "mean: 2.1711516945454563 msec\nrounds: 275"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 588.3012390066857,
            "unit": "iter/sec",
            "range": "stddev: 0.00008895825345798501",
            "extra": "mean: 1.6998094406335862 msec\nrounds: 379"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 569.5862091928216,
            "unit": "iter/sec",
            "range": "stddev: 0.0001695267995816632",
            "extra": "mean: 1.7556604845070447 msec\nrounds: 355"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 43.15383856673039,
            "unit": "iter/sec",
            "range": "stddev: 0.0002726183411737109",
            "extra": "mean: 23.172909600003777 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 199.3023252485973,
            "unit": "iter/sec",
            "range": "stddev: 0.00011160937725369315",
            "extra": "mean: 5.017502925531161 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 191.18471653719814,
            "unit": "iter/sec",
            "range": "stddev: 0.00035875588730159303",
            "extra": "mean: 5.230543623529831 msec\nrounds: 85"
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
          "id": "638fed0ac2e2d427b013464a592056223da6229e",
          "message": "Merge pull request #113 from developmentseed/FowardCatalogDep\n\nforward dependency to Factories",
          "timestamp": "2023-08-25T17:22:12-04:00",
          "tree_id": "9b82ce3deffad54855017d916f6e1f91f31bd4e2",
          "url": "https://github.com/developmentseed/tipg/commit/638fed0ac2e2d427b013464a592056223da6229e"
        },
        "date": 1692998873422,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 349.0268506065629,
            "unit": "iter/sec",
            "range": "stddev: 0.00018471419277522622",
            "extra": "mean: 2.8651090833330763 msec\nrounds: 168"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 204.15284156957745,
            "unit": "iter/sec",
            "range": "stddev: 0.005389049315644362",
            "extra": "mean: 4.898290870270299 msec\nrounds: 185"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 354.45995859360147,
            "unit": "iter/sec",
            "range": "stddev: 0.00012989143115946575",
            "extra": "mean: 2.821193129874872 msec\nrounds: 77"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 212.44912125104673,
            "unit": "iter/sec",
            "range": "stddev: 0.00021206971726801804",
            "extra": "mean: 4.707009349397688 msec\nrounds: 166"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 453.31812857788964,
            "unit": "iter/sec",
            "range": "stddev: 0.00010471810364684962",
            "extra": "mean: 2.2059563405000224 msec\nrounds: 279"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 434.01526638658936,
            "unit": "iter/sec",
            "range": "stddev: 0.00012319438168549002",
            "extra": "mean: 2.304066417583736 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 492.8662488253101,
            "unit": "iter/sec",
            "range": "stddev: 0.0005644799865948021",
            "extra": "mean: 2.028948020651413 msec\nrounds: 339"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 143.41769618313577,
            "unit": "iter/sec",
            "range": "stddev: 0.00025302921370213703",
            "extra": "mean: 6.9726402432448795 msec\nrounds: 111"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 130.0063227779472,
            "unit": "iter/sec",
            "range": "stddev: 0.00024287340884673544",
            "extra": "mean: 7.6919335816306065 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 85.07875586722021,
            "unit": "iter/sec",
            "range": "stddev: 0.0002562058947423978",
            "extra": "mean: 11.753815506666191 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 59.78273161847331,
            "unit": "iter/sec",
            "range": "stddev: 0.0003802952114549287",
            "extra": "mean: 16.727238333334913 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 33.09222420060152,
            "unit": "iter/sec",
            "range": "stddev: 0.016921472318622698",
            "extra": "mean: 30.218579263155814 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 28.809445786822565,
            "unit": "iter/sec",
            "range": "stddev: 0.016956007973555294",
            "extra": "mean: 34.7108378064461 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 144.13632249415483,
            "unit": "iter/sec",
            "range": "stddev: 0.0002888013870396779",
            "extra": "mean: 6.93787646788722 msec\nrounds: 109"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 116.91208453364783,
            "unit": "iter/sec",
            "range": "stddev: 0.0003105940439149177",
            "extra": "mean: 8.5534357204297 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 62.838665128409374,
            "unit": "iter/sec",
            "range": "stddev: 0.000986753502113863",
            "extra": "mean: 15.913768982146946 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 40.5624903436597,
            "unit": "iter/sec",
            "range": "stddev: 0.0006565667083859446",
            "extra": "mean: 24.653318657894225 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.323498912412752,
            "unit": "iter/sec",
            "range": "stddev: 0.001359628450342104",
            "extra": "mean: 42.87521369565184 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 18.529949944441437,
            "unit": "iter/sec",
            "range": "stddev: 0.005607180944548401",
            "extra": "mean: 53.96668652631613 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 138.1945905172497,
            "unit": "iter/sec",
            "range": "stddev: 0.00027106875907849994",
            "extra": "mean: 7.236173255820589 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 113.23308799667164,
            "unit": "iter/sec",
            "range": "stddev: 0.00043310507100961267",
            "extra": "mean: 8.831340888887478 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 62.83877329126837,
            "unit": "iter/sec",
            "range": "stddev: 0.00926170244734859",
            "extra": "mean: 15.913741590161706 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 35.99071437111218,
            "unit": "iter/sec",
            "range": "stddev: 0.020240600859600544",
            "extra": "mean: 27.78494446341544 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 21.400392919775843,
            "unit": "iter/sec",
            "range": "stddev: 0.02574267916736449",
            "extra": "mean: 46.72811399999633 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 16.863330428748547,
            "unit": "iter/sec",
            "range": "stddev: 0.03245847554655074",
            "extra": "mean: 59.30026718181383 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.8679738533498567,
            "unit": "iter/sec",
            "range": "stddev: 0.02961922959657111",
            "extra": "mean: 535.3393989999859 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 37.4035369514652,
            "unit": "iter/sec",
            "range": "stddev: 0.026039914006590042",
            "extra": "mean: 26.735439520000455 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7677278692877645,
            "unit": "iter/sec",
            "range": "stddev: 0.07863283918511996",
            "extra": "mean: 1.3025448730000107 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.010887456837704,
            "unit": "iter/sec",
            "range": "stddev: 0.04283750223467742",
            "extra": "mean: 62.457499791676696 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.580726475022233,
            "unit": "iter/sec",
            "range": "stddev: 0.0035865882734659326",
            "extra": "mean: 116.54024900000195 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.339053056601821,
            "unit": "iter/sec",
            "range": "stddev: 0.010572807658926951",
            "extra": "mean: 187.29913139999326 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 167.77175678994683,
            "unit": "iter/sec",
            "range": "stddev: 0.00036062545453042583",
            "extra": "mean: 5.9604788024722035 msec\nrounds: 81"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 118.24093026256621,
            "unit": "iter/sec",
            "range": "stddev: 0.00027843017884810985",
            "extra": "mean: 8.45730829230958 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 212.50535179301747,
            "unit": "iter/sec",
            "range": "stddev: 0.00032616617753859756",
            "extra": "mean: 4.705763838710334 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 196.92885080968662,
            "unit": "iter/sec",
            "range": "stddev: 0.00011936636105644734",
            "extra": "mean: 5.077976111110336 msec\nrounds: 81"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 506.79247149165417,
            "unit": "iter/sec",
            "range": "stddev: 0.0001017252667850463",
            "extra": "mean: 1.9731942683692136 msec\nrounds: 313"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 656.1380861995661,
            "unit": "iter/sec",
            "range": "stddev: 0.00016680388526371816",
            "extra": "mean: 1.5240694314700203 msec\nrounds: 394"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 648.2961976363388,
            "unit": "iter/sec",
            "range": "stddev: 0.0001439150361686797",
            "extra": "mean: 1.5425048051275925 msec\nrounds: 390"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 48.90207123550996,
            "unit": "iter/sec",
            "range": "stddev: 0.00019723420482102585",
            "extra": "mean: 20.44903159999194 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 224.80784111422523,
            "unit": "iter/sec",
            "range": "stddev: 0.00010192352690924675",
            "extra": "mean: 4.448243419996629 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 217.94305444485673,
            "unit": "iter/sec",
            "range": "stddev: 0.0001014958047902868",
            "extra": "mean: 4.588354524750486 msec\nrounds: 101"
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
          "id": "3a8ea56f48731379e0911dbadbc82194c22ee070",
          "message": "Merge pull request #114 from developmentseed/changeDependencies\n\nchange dependencies to callables",
          "timestamp": "2023-08-26T09:48:03-04:00",
          "tree_id": "eadbb09e4d32fe92d21606e14157efd754583722",
          "url": "https://github.com/developmentseed/tipg/commit/3a8ea56f48731379e0911dbadbc82194c22ee070"
        },
        "date": 1693058051537,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 354.8189832504806,
            "unit": "iter/sec",
            "range": "stddev: 0.00021211029390692308",
            "extra": "mean: 2.8183384971092735 msec\nrounds: 173"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 203.8019393871527,
            "unit": "iter/sec",
            "range": "stddev: 0.005596770176637011",
            "extra": "mean: 4.906724651429093 msec\nrounds: 175"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 356.23717306438834,
            "unit": "iter/sec",
            "range": "stddev: 0.00013614221981625874",
            "extra": "mean: 2.8071186153817087 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 215.10421156138602,
            "unit": "iter/sec",
            "range": "stddev: 0.0001756802403327898",
            "extra": "mean: 4.6489094413412815 msec\nrounds: 179"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 465.1603382062862,
            "unit": "iter/sec",
            "range": "stddev: 0.00008541233333546759",
            "extra": "mean: 2.1497963559320628 msec\nrounds: 295"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 445.5487186480368,
            "unit": "iter/sec",
            "range": "stddev: 0.00012394722268124433",
            "extra": "mean: 2.2444234673917993 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 513.4133906225769,
            "unit": "iter/sec",
            "range": "stddev: 0.00013595465207386198",
            "extra": "mean: 1.9477481855067649 msec\nrounds: 345"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 161.0946205484162,
            "unit": "iter/sec",
            "range": "stddev: 0.00027332609861216727",
            "extra": "mean: 6.207531924999661 msec\nrounds: 120"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 141.7460998934488,
            "unit": "iter/sec",
            "range": "stddev: 0.00022714851163441793",
            "extra": "mean: 7.054867828827071 msec\nrounds: 111"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 88.7741440859488,
            "unit": "iter/sec",
            "range": "stddev: 0.0003630637617214493",
            "extra": "mean: 11.264541160000666 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 59.29522381931243,
            "unit": "iter/sec",
            "range": "stddev: 0.009336282911839668",
            "extra": "mean: 16.864764741377034 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 36.4274354590112,
            "unit": "iter/sec",
            "range": "stddev: 0.012570243971892084",
            "extra": "mean: 27.45183643589782 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 28.615882911183864,
            "unit": "iter/sec",
            "range": "stddev: 0.01752398634943111",
            "extra": "mean: 34.94562803124879 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 146.7666362173419,
            "unit": "iter/sec",
            "range": "stddev: 0.0003954689496395259",
            "extra": "mean: 6.813537638889079 msec\nrounds: 108"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 119.1048134473573,
            "unit": "iter/sec",
            "range": "stddev: 0.0005007774524277617",
            "extra": "mean: 8.395966301076374 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 64.81690499441942,
            "unit": "iter/sec",
            "range": "stddev: 0.0005217811096699657",
            "extra": "mean: 15.428073896556734 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 40.18486815522681,
            "unit": "iter/sec",
            "range": "stddev: 0.0008297368864455074",
            "extra": "mean: 24.884988949999354 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.458412556258683,
            "unit": "iter/sec",
            "range": "stddev: 0.001768292519201639",
            "extra": "mean: 42.628630458338534 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 19.40868080693123,
            "unit": "iter/sec",
            "range": "stddev: 0.000804159521934981",
            "extra": "mean: 51.5233368999958 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 124.48623157086337,
            "unit": "iter/sec",
            "range": "stddev: 0.0014300630444807727",
            "extra": "mean: 8.033016883724635 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 120.2072387822552,
            "unit": "iter/sec",
            "range": "stddev: 0.00042475559824126574",
            "extra": "mean: 8.318966562499716 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 57.91284512970061,
            "unit": "iter/sec",
            "range": "stddev: 0.01432141471951672",
            "extra": "mean: 17.267326406782768 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 38.177122925171375,
            "unit": "iter/sec",
            "range": "stddev: 0.01757886526484605",
            "extra": "mean: 26.193697255815696 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 19.539273475625087,
            "unit": "iter/sec",
            "range": "stddev: 0.03217177725837222",
            "extra": "mean: 51.17897557693141 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 17.925540667551143,
            "unit": "iter/sec",
            "range": "stddev: 0.029682683210546002",
            "extra": "mean: 55.78632290908816 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.8614299659050022,
            "unit": "iter/sec",
            "range": "stddev: 0.033640043571790394",
            "extra": "mean: 537.2213934000001 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 45.633987912103834,
            "unit": "iter/sec",
            "range": "stddev: 0.02160643719957927",
            "extra": "mean: 21.913491363632563 msec\nrounds: 11"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7509026972645225,
            "unit": "iter/sec",
            "range": "stddev: 0.07861838881757618",
            "extra": "mean: 1.3317304673999957 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 15.914031262843073,
            "unit": "iter/sec",
            "range": "stddev: 0.042879876756057644",
            "extra": "mean: 62.83762947826131 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.208011080868333,
            "unit": "iter/sec",
            "range": "stddev: 0.0024713633032154175",
            "extra": "mean: 121.8321941999875 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.213598905302809,
            "unit": "iter/sec",
            "range": "stddev: 0.00868533270749243",
            "extra": "mean: 191.80608599999687 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 179.33451791322545,
            "unit": "iter/sec",
            "range": "stddev: 0.00032115660298987153",
            "extra": "mean: 5.576171345239123 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 124.92758884635482,
            "unit": "iter/sec",
            "range": "stddev: 0.0004174086894089251",
            "extra": "mean: 8.004636999997444 msec\nrounds: 69"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 237.83806333962198,
            "unit": "iter/sec",
            "range": "stddev: 0.0002837488814482964",
            "extra": "mean: 4.204541468083035 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 216.92348228935626,
            "unit": "iter/sec",
            "range": "stddev: 0.00032665981294296374",
            "extra": "mean: 4.609920463410645 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 512.7281082909576,
            "unit": "iter/sec",
            "range": "stddev: 0.00009072974250000949",
            "extra": "mean: 1.9503514315476742 msec\nrounds: 336"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 657.545585309494,
            "unit": "iter/sec",
            "range": "stddev: 0.00006955688987832678",
            "extra": "mean: 1.52080710804152 msec\nrounds: 398"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 647.9168287509029,
            "unit": "iter/sec",
            "range": "stddev: 0.00015580721871208582",
            "extra": "mean: 1.5434079740263367 msec\nrounds: 385"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 47.35969824369578,
            "unit": "iter/sec",
            "range": "stddev: 0.0003790088799645641",
            "extra": "mean: 21.114999400003853 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 222.7756026433057,
            "unit": "iter/sec",
            "range": "stddev: 0.0002352716401513595",
            "extra": "mean: 4.488821882354583 msec\nrounds: 102"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 218.1887631439125,
            "unit": "iter/sec",
            "range": "stddev: 0.00023098324598600157",
            "extra": "mean: 4.5831874455442145 msec\nrounds: 101"
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
          "id": "6478f8d117daf12e76c087a6197a7876007c2a05",
          "message": "Merge pull request #117 from developmentseed/fixUrlFor\n\nallow prefix with path parameters",
          "timestamp": "2023-08-27T10:46:44-04:00",
          "tree_id": "675a98257c3030c3962bda79102b61725464862d",
          "url": "https://github.com/developmentseed/tipg/commit/6478f8d117daf12e76c087a6197a7876007c2a05"
        },
        "date": 1693147986255,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 295.3165348876867,
            "unit": "iter/sec",
            "range": "stddev: 0.0002872796479674789",
            "extra": "mean: 3.386197120253747 msec\nrounds: 158"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 167.34458388126907,
            "unit": "iter/sec",
            "range": "stddev: 0.007146535111775273",
            "extra": "mean: 5.975693845637094 msec\nrounds: 149"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 305.800105116454,
            "unit": "iter/sec",
            "range": "stddev: 0.0001496675548704794",
            "extra": "mean: 3.270110059704468 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 179.87115152257013,
            "unit": "iter/sec",
            "range": "stddev: 0.00028852267640231934",
            "extra": "mean: 5.559535209149537 msec\nrounds: 153"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 377.9114999484628,
            "unit": "iter/sec",
            "range": "stddev: 0.00039063250440481037",
            "extra": "mean: 2.646122174467762 msec\nrounds: 235"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 382.8109463259811,
            "unit": "iter/sec",
            "range": "stddev: 0.00014838998901989036",
            "extra": "mean: 2.6122554999993497 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 414.0304903472904,
            "unit": "iter/sec",
            "range": "stddev: 0.0006198106135695866",
            "extra": "mean: 2.4152810561395994 msec\nrounds: 285"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 134.46988551291125,
            "unit": "iter/sec",
            "range": "stddev: 0.00040053767516968147",
            "extra": "mean: 7.436609291260116 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 120.37332364184803,
            "unit": "iter/sec",
            "range": "stddev: 0.0003642393439044593",
            "extra": "mean: 8.307488484536186 msec\nrounds: 97"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 75.9741646655492,
            "unit": "iter/sec",
            "range": "stddev: 0.00046638567555502906",
            "extra": "mean: 13.162369134325662 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 52.27347335537828,
            "unit": "iter/sec",
            "range": "stddev: 0.00047297812608711377",
            "extra": "mean: 19.13016174000063 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 28.593838072930332,
            "unit": "iter/sec",
            "range": "stddev: 0.02076061448493233",
            "extra": "mean: 34.9725698750003 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 26.032649773319744,
            "unit": "iter/sec",
            "range": "stddev: 0.016548395724354147",
            "extra": "mean: 38.41330055555377 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 123.273588797236,
            "unit": "iter/sec",
            "range": "stddev: 0.001021321096199363",
            "extra": "mean: 8.112037702129603 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 90.5025919836134,
            "unit": "iter/sec",
            "range": "stddev: 0.002231396210705231",
            "extra": "mean: 11.04940729411443 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 53.07038624068857,
            "unit": "iter/sec",
            "range": "stddev: 0.0006079487770070069",
            "extra": "mean: 18.842900359999817 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 33.422145223360424,
            "unit": "iter/sec",
            "range": "stddev: 0.0016286388054384607",
            "extra": "mean: 29.92028169697047 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 19.651397319042584,
            "unit": "iter/sec",
            "range": "stddev: 0.0010348967567378453",
            "extra": "mean: 50.88696664999901 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 16.44092518811379,
            "unit": "iter/sec",
            "range": "stddev: 0.0008994509292172195",
            "extra": "mean: 60.82382764705752 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 128.1117514614871,
            "unit": "iter/sec",
            "range": "stddev: 0.00036057890684834063",
            "extra": "mean: 7.805685181820495 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 92.15114055591543,
            "unit": "iter/sec",
            "range": "stddev: 0.008822490140177032",
            "extra": "mean: 10.851737634144857 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 51.555263935155764,
            "unit": "iter/sec",
            "range": "stddev: 0.013219398414273498",
            "extra": "mean: 19.396661439998866 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 31.32266861764213,
            "unit": "iter/sec",
            "range": "stddev: 0.021037439093705583",
            "extra": "mean: 31.925759972978856 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 17.36534182902665,
            "unit": "iter/sec",
            "range": "stddev: 0.03514766301546389",
            "extra": "mean: 57.5859669130424 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.797233924091014,
            "unit": "iter/sec",
            "range": "stddev: 0.036470116199489006",
            "extra": "mean: 67.58019810526375 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.5882842133648545,
            "unit": "iter/sec",
            "range": "stddev: 0.013013309243021156",
            "extra": "mean: 629.6102369999971 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 30.949622455147612,
            "unit": "iter/sec",
            "range": "stddev: 0.03168184640750574",
            "extra": "mean: 32.310571847821606 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6446609196558758,
            "unit": "iter/sec",
            "range": "stddev: 0.05586596643930856",
            "extra": "mean: 1.5512030736000042 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.467612514062706,
            "unit": "iter/sec",
            "range": "stddev: 0.05087869451208701",
            "extra": "mean: 74.25221055000009 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.028549443509692,
            "unit": "iter/sec",
            "range": "stddev: 0.003536260825883599",
            "extra": "mean: 142.27686780000113 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.39949555700711,
            "unit": "iter/sec",
            "range": "stddev: 0.010370792555175605",
            "extra": "mean: 227.29878619999795 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 153.4797098541762,
            "unit": "iter/sec",
            "range": "stddev: 0.0004226984868446525",
            "extra": "mean: 6.515519223681864 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 96.91699610842554,
            "unit": "iter/sec",
            "range": "stddev: 0.0007746243175576754",
            "extra": "mean: 10.31810766071674 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 195.63943921003334,
            "unit": "iter/sec",
            "range": "stddev: 0.0003370560045338458",
            "extra": "mean: 5.111443807229617 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 178.29737816061132,
            "unit": "iter/sec",
            "range": "stddev: 0.0004886651234561886",
            "extra": "mean: 5.608607430554556 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 429.30996139419244,
            "unit": "iter/sec",
            "range": "stddev: 0.00018325948333989094",
            "extra": "mean: 2.3293193494799898 msec\nrounds: 289"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 478.263596059878,
            "unit": "iter/sec",
            "range": "stddev: 0.005152280410787148",
            "extra": "mean: 2.0908971710127844 msec\nrounds: 345"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 543.5564707363901,
            "unit": "iter/sec",
            "range": "stddev: 0.0000796252058516512",
            "extra": "mean: 1.8397352507739209 msec\nrounds: 323"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 41.457807071362275,
            "unit": "iter/sec",
            "range": "stddev: 0.00020881114515270275",
            "extra": "mean: 24.12090920001333 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 187.47738380953538,
            "unit": "iter/sec",
            "range": "stddev: 0.0004063421950877155",
            "extra": "mean: 5.3339767159111515 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 185.37023129796435,
            "unit": "iter/sec",
            "range": "stddev: 0.00011374399863229694",
            "extra": "mean: 5.394609441861237 msec\nrounds: 86"
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
          "id": "53bc1463e65c4be4e8296af4b22be5acb92db1d6",
          "message": "Merge pull request #119 from developmentseed/pgSettingsTypeAndTests\n\nfix pg settings type and add tests",
          "timestamp": "2023-08-27T21:23:17-04:00",
          "tree_id": "7946a615ba65d1c3685b097a084eae53883ccc53",
          "url": "https://github.com/developmentseed/tipg/commit/53bc1463e65c4be4e8296af4b22be5acb92db1d6"
        },
        "date": 1693186180100,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 356.3392793070587,
            "unit": "iter/sec",
            "range": "stddev: 0.0007458461824013178",
            "extra": "mean: 2.8063142574251456 msec\nrounds: 202"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 219.53648542548544,
            "unit": "iter/sec",
            "range": "stddev: 0.0034166586329881844",
            "extra": "mean: 4.555051512562442 msec\nrounds: 199"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 380.0978010187121,
            "unit": "iter/sec",
            "range": "stddev: 0.00016252413224482397",
            "extra": "mean: 2.6309018292657007 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 224.91727525045275,
            "unit": "iter/sec",
            "range": "stddev: 0.00023461650309154796",
            "extra": "mean: 4.446079114583205 msec\nrounds: 192"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 483.0960559837545,
            "unit": "iter/sec",
            "range": "stddev: 0.00023640938359862753",
            "extra": "mean: 2.06998170987682 msec\nrounds: 324"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 464.73063425238195,
            "unit": "iter/sec",
            "range": "stddev: 0.00029387231192979507",
            "extra": "mean: 2.151784122449153 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 558.4121954624368,
            "unit": "iter/sec",
            "range": "stddev: 0.00017060180997258357",
            "extra": "mean: 1.7907918346444276 msec\nrounds: 381"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 169.66065854339112,
            "unit": "iter/sec",
            "range": "stddev: 0.0002837303529486717",
            "extra": "mean: 5.894118345321922 msec\nrounds: 139"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 147.41571632483476,
            "unit": "iter/sec",
            "range": "stddev: 0.00045462806345551244",
            "extra": "mean: 6.783537230158495 msec\nrounds: 126"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 96.36234014752274,
            "unit": "iter/sec",
            "range": "stddev: 0.0002807420394415098",
            "extra": "mean: 10.377498081398635 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 64.28222159647986,
            "unit": "iter/sec",
            "range": "stddev: 0.00611553064344146",
            "extra": "mean: 15.556400746030855 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 39.66910763611432,
            "unit": "iter/sec",
            "range": "stddev: 0.00769669928707017",
            "extra": "mean: 25.208532775000236 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 31.726735403367524,
            "unit": "iter/sec",
            "range": "stddev: 0.012264038014263338",
            "extra": "mean: 31.51915844117572 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 147.24629746283583,
            "unit": "iter/sec",
            "range": "stddev: 0.004623036343326942",
            "extra": "mean: 6.7913422424247685 msec\nrounds: 132"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 127.47499947736497,
            "unit": "iter/sec",
            "range": "stddev: 0.0006251001258059071",
            "extra": "mean: 7.844675458716628 msec\nrounds: 109"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 66.55015454671417,
            "unit": "iter/sec",
            "range": "stddev: 0.001652854857690778",
            "extra": "mean: 15.026261123076141 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 43.56283599613958,
            "unit": "iter/sec",
            "range": "stddev: 0.0005907491752513142",
            "extra": "mean: 22.955346619045123 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 24.80332914490374,
            "unit": "iter/sec",
            "range": "stddev: 0.001660700805010779",
            "extra": "mean: 40.31716848000087 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 18.971925241733636,
            "unit": "iter/sec",
            "range": "stddev: 0.003747073718288609",
            "extra": "mean: 52.709463444450144 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 158.74200586717132,
            "unit": "iter/sec",
            "range": "stddev: 0.00015909931267904805",
            "extra": "mean: 6.299529822224612 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 128.29904460109674,
            "unit": "iter/sec",
            "range": "stddev: 0.0004160231529191096",
            "extra": "mean: 7.794290309091294 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 69.75817277905129,
            "unit": "iter/sec",
            "range": "stddev: 0.006638380752226194",
            "extra": "mean: 14.335237867645306 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 40.855450681724236,
            "unit": "iter/sec",
            "range": "stddev: 0.015286892702672469",
            "extra": "mean: 24.476538217392065 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 22.33864180918925,
            "unit": "iter/sec",
            "range": "stddev: 0.023248515402631266",
            "extra": "mean: 44.76547896428684 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 19.644423767350695,
            "unit": "iter/sec",
            "range": "stddev: 0.023401062019303854",
            "extra": "mean: 50.90503095652079 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.2432899260217427,
            "unit": "iter/sec",
            "range": "stddev: 0.02506403061191454",
            "extra": "mean: 445.773855799996 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 47.637842155787474,
            "unit": "iter/sec",
            "range": "stddev: 0.01914866483760634",
            "extra": "mean: 20.991714879312834 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.8805513963674,
            "unit": "iter/sec",
            "range": "stddev: 0.06301511837680196",
            "extra": "mean: 1.1356520518000082 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 18.67080860459428,
            "unit": "iter/sec",
            "range": "stddev: 0.03439261817396284",
            "extra": "mean: 53.5595442692253 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.606973656152416,
            "unit": "iter/sec",
            "range": "stddev: 0.00447252596027749",
            "extra": "mean: 116.18485659999465 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.277324734108409,
            "unit": "iter/sec",
            "range": "stddev: 0.007282615150225071",
            "extra": "mean: 189.4899500000065 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 188.4433853526284,
            "unit": "iter/sec",
            "range": "stddev: 0.00045870775734972334",
            "extra": "mean: 5.306633597824249 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 130.6695968210945,
            "unit": "iter/sec",
            "range": "stddev: 0.00031584507772132366",
            "extra": "mean: 7.652889611109338 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 250.76946479962612,
            "unit": "iter/sec",
            "range": "stddev: 0.00013491299630719646",
            "extra": "mean: 3.9877263398039156 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 231.0995137113197,
            "unit": "iter/sec",
            "range": "stddev: 0.0002504555115625382",
            "extra": "mean: 4.327140217392063 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 496.13289752275347,
            "unit": "iter/sec",
            "range": "stddev: 0.003135626139760459",
            "extra": "mean: 2.0155889782618948 msec\nrounds: 368"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 707.0418846801508,
            "unit": "iter/sec",
            "range": "stddev: 0.0001280358102443457",
            "extra": "mean: 1.4143433672990624 msec\nrounds: 422"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 695.6569238765836,
            "unit": "iter/sec",
            "range": "stddev: 0.00019597822303086466",
            "extra": "mean: 1.4374901847126729 msec\nrounds: 471"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 50.60180166097077,
            "unit": "iter/sec",
            "range": "stddev: 0.000258336248309548",
            "extra": "mean: 19.76214219999406 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 227.92353241453515,
            "unit": "iter/sec",
            "range": "stddev: 0.0002508749875344936",
            "extra": "mean: 4.387436388890522 msec\nrounds: 108"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 222.19004346104956,
            "unit": "iter/sec",
            "range": "stddev: 0.00023082881887353341",
            "extra": "mean: 4.500651714284859 msec\nrounds: 105"
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
          "id": "1fc3b73c17da45826dc821414583059459e7b1b1",
          "message": "Bump version: 0.4.2 → 0.4.3",
          "timestamp": "2023-08-28T09:05:29-04:00",
          "tree_id": "97900e0248f94133674d9f6b7fa7c7fdb41e244f",
          "url": "https://github.com/developmentseed/tipg/commit/1fc3b73c17da45826dc821414583059459e7b1b1"
        },
        "date": 1693228387523,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 300.2505540832046,
            "unit": "iter/sec",
            "range": "stddev: 0.00048005297011138",
            "extra": "mean: 3.330551722222244 msec\nrounds: 198"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 173.59223165657912,
            "unit": "iter/sec",
            "range": "stddev: 0.005851862433518302",
            "extra": "mean: 5.760626443113649 msec\nrounds: 167"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 322.4188014697722,
            "unit": "iter/sec",
            "range": "stddev: 0.00027853995620129513",
            "extra": "mean: 3.1015560985941857 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 188.93399570867356,
            "unit": "iter/sec",
            "range": "stddev: 0.00044086568812001125",
            "extra": "mean: 5.292853709302524 msec\nrounds: 172"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 387.6876327883827,
            "unit": "iter/sec",
            "range": "stddev: 0.0006923211721873868",
            "extra": "mean: 2.5793961824566245 msec\nrounds: 285"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 392.48382485841097,
            "unit": "iter/sec",
            "range": "stddev: 0.00028089576210376933",
            "extra": "mean: 2.547875700000507 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 455.34308435946076,
            "unit": "iter/sec",
            "range": "stddev: 0.0003155634730064095",
            "extra": "mean: 2.1961462342328484 msec\nrounds: 333"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 133.40078974334963,
            "unit": "iter/sec",
            "range": "stddev: 0.0003865204604214973",
            "extra": "mean: 7.496207495652045 msec\nrounds: 115"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 116.80265413744196,
            "unit": "iter/sec",
            "range": "stddev: 0.0008108032183274185",
            "extra": "mean: 8.561449287130905 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 80.09443682115811,
            "unit": "iter/sec",
            "range": "stddev: 0.0004271427779422232",
            "extra": "mean: 12.485261644736799 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 57.519451616185066,
            "unit": "iter/sec",
            "range": "stddev: 0.0012321058130755633",
            "extra": "mean: 17.38542305084522 msec\nrounds: 59"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 33.65774006565878,
            "unit": "iter/sec",
            "range": "stddev: 0.016259904227673587",
            "extra": "mean: 29.710848026314956 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 28.81407836170408,
            "unit": "iter/sec",
            "range": "stddev: 0.017779642607878697",
            "extra": "mean: 34.7052571818181 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 124.6410361456288,
            "unit": "iter/sec",
            "range": "stddev: 0.0005346811435373717",
            "extra": "mean: 8.023039850467981 msec\nrounds: 107"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 98.5933694694488,
            "unit": "iter/sec",
            "range": "stddev: 0.0011813782035111427",
            "extra": "mean: 10.14266989130411 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 53.70303550841789,
            "unit": "iter/sec",
            "range": "stddev: 0.0023904397578104774",
            "extra": "mean: 18.62092134146218 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 36.63746619224434,
            "unit": "iter/sec",
            "range": "stddev: 0.0023414305118767105",
            "extra": "mean: 27.29446394444403 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 22.45416710015916,
            "unit": "iter/sec",
            "range": "stddev: 0.001080474519179763",
            "extra": "mean: 44.53516336363738 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 18.70344332734434,
            "unit": "iter/sec",
            "range": "stddev: 0.0015963729476552472",
            "extra": "mean: 53.466090842107405 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 121.72143143302955,
            "unit": "iter/sec",
            "range": "stddev: 0.0005777024349690477",
            "extra": "mean: 8.215480119047026 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 98.65465130343503,
            "unit": "iter/sec",
            "range": "stddev: 0.0015368342845809009",
            "extra": "mean: 10.136369515151095 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 57.4863919889535,
            "unit": "iter/sec",
            "range": "stddev: 0.010459359028802618",
            "extra": "mean: 17.39542116666773 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 35.00115069946079,
            "unit": "iter/sec",
            "range": "stddev: 0.0204739857342182",
            "extra": "mean: 28.570489255811967 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 20.564875497466957,
            "unit": "iter/sec",
            "range": "stddev: 0.02904098229394478",
            "extra": "mean: 48.62660122222346 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 17.687019783595694,
            "unit": "iter/sec",
            "range": "stddev: 0.03266021290086232",
            "extra": "mean: 56.538637499997435 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.8609752533938722,
            "unit": "iter/sec",
            "range": "stddev: 0.042001150717214046",
            "extra": "mean: 537.3526585999969 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 36.67422060756109,
            "unit": "iter/sec",
            "range": "stddev: 0.02709997602444722",
            "extra": "mean: 27.267109796297376 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7896153747882001,
            "unit": "iter/sec",
            "range": "stddev: 0.05627361558888153",
            "extra": "mean: 1.2664393727999936 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 16.619669156275016,
            "unit": "iter/sec",
            "range": "stddev: 0.043674931223312355",
            "extra": "mean: 60.1696694799989 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.18113336889396,
            "unit": "iter/sec",
            "range": "stddev: 0.0042077136617225935",
            "extra": "mean: 122.23245299999235 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.0561447560816175,
            "unit": "iter/sec",
            "range": "stddev: 0.008666254420523573",
            "extra": "mean: 197.77914759999362 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 158.50974439803198,
            "unit": "iter/sec",
            "range": "stddev: 0.0004682611021182939",
            "extra": "mean: 6.308760409637099 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 110.5669886575283,
            "unit": "iter/sec",
            "range": "stddev: 0.0003176721264528653",
            "extra": "mean: 9.044290815384452 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 198.00644879782288,
            "unit": "iter/sec",
            "range": "stddev: 0.0008402895213875097",
            "extra": "mean: 5.050340562498867 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 183.51350693138318,
            "unit": "iter/sec",
            "range": "stddev: 0.00035392882666905194",
            "extra": "mean: 5.449190180720081 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 458.76189683331296,
            "unit": "iter/sec",
            "range": "stddev: 0.0005109164443670558",
            "extra": "mean: 2.1797799836967306 msec\nrounds: 368"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 610.1214367786964,
            "unit": "iter/sec",
            "range": "stddev: 0.00029843175731004593",
            "extra": "mean: 1.639017972028281 msec\nrounds: 429"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 598.2562612707826,
            "unit": "iter/sec",
            "range": "stddev: 0.0004707090284588973",
            "extra": "mean: 1.6715245033555617 msec\nrounds: 447"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 47.32148695429904,
            "unit": "iter/sec",
            "range": "stddev: 0.00016624255147059815",
            "extra": "mean: 21.13204940000628 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 185.79264537868679,
            "unit": "iter/sec",
            "range": "stddev: 0.000538486671580805",
            "extra": "mean: 5.382344376236085 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 174.31601980020636,
            "unit": "iter/sec",
            "range": "stddev: 0.0008914307320913378",
            "extra": "mean: 5.736707395832911 msec\nrounds: 96"
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
          "id": "70778c5e48b47736b07f7a7ce855324f7f4a915e",
          "message": "Merge pull request #126 from developmentseed/updatePydantic24\n\nupdate pydantic version",
          "timestamp": "2023-10-02T15:39:03+02:00",
          "tree_id": "d0a727160036d91e1388a3afb9bdc349dfc2891a",
          "url": "https://github.com/developmentseed/tipg/commit/70778c5e48b47736b07f7a7ce855324f7f4a915e"
        },
        "date": 1696254342444,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 301.9379705575961,
            "unit": "iter/sec",
            "range": "stddev: 0.0002923182501945342",
            "extra": "mean: 3.311938535432546 msec\nrounds: 127"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 182.62515111043646,
            "unit": "iter/sec",
            "range": "stddev: 0.0008113098322857138",
            "extra": "mean: 5.475697043477234 msec\nrounds: 138"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 291.4285889381081,
            "unit": "iter/sec",
            "range": "stddev: 0.0004361990185472074",
            "extra": "mean: 3.4313723428567755 msec\nrounds: 70"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 182.82306081542305,
            "unit": "iter/sec",
            "range": "stddev: 0.00030856679356151053",
            "extra": "mean: 5.4697694893621405 msec\nrounds: 141"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 394.53833368316396,
            "unit": "iter/sec",
            "range": "stddev: 0.00021151310010321208",
            "extra": "mean: 2.534607957266467 msec\nrounds: 234"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 376.6702991695437,
            "unit": "iter/sec",
            "range": "stddev: 0.0001382397548497694",
            "extra": "mean: 2.6548416538408524 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 438.32788171742857,
            "unit": "iter/sec",
            "range": "stddev: 0.00017569615810327798",
            "extra": "mean: 2.281397195364035 msec\nrounds: 302"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 136.27145152593295,
            "unit": "iter/sec",
            "range": "stddev: 0.0009761881057411929",
            "extra": "mean: 7.338294182693845 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 120.22869028504864,
            "unit": "iter/sec",
            "range": "stddev: 0.0003621502693073133",
            "extra": "mean: 8.317482271736578 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 77.63679109046586,
            "unit": "iter/sec",
            "range": "stddev: 0.00039539549827937777",
            "extra": "mean: 12.880491142849468 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 50.78454102076905,
            "unit": "iter/sec",
            "range": "stddev: 0.010480014081608787",
            "extra": "mean: 19.691031559998464 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 30.38872116883807,
            "unit": "iter/sec",
            "range": "stddev: 0.013700112759350123",
            "extra": "mean: 32.906945785709595 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 24.774494885805886,
            "unit": "iter/sec",
            "range": "stddev: 0.0188586471662266",
            "extra": "mean: 40.36409237037291 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 115.02832551545502,
            "unit": "iter/sec",
            "range": "stddev: 0.0018486892477239238",
            "extra": "mean: 8.693510885417885 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 104.84748215926247,
            "unit": "iter/sec",
            "range": "stddev: 0.00035230267510047913",
            "extra": "mean: 9.537663465117914 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 52.35530180274983,
            "unit": "iter/sec",
            "range": "stddev: 0.0016648603799764925",
            "extra": "mean: 19.100262352942405 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 34.19075209158947,
            "unit": "iter/sec",
            "range": "stddev: 0.0009613876028265024",
            "extra": "mean: 29.247674848485957 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 19.212997033495707,
            "unit": "iter/sec",
            "range": "stddev: 0.0063179148289532585",
            "extra": "mean: 52.04810047368519 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 15.571827448535542,
            "unit": "iter/sec",
            "range": "stddev: 0.004444334370019816",
            "extra": "mean: 64.21853846666181 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 126.26897445896068,
            "unit": "iter/sec",
            "range": "stddev: 0.0004447380915362727",
            "extra": "mean: 7.919601820517004 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 89.73205966497783,
            "unit": "iter/sec",
            "range": "stddev: 0.008507342118369211",
            "extra": "mean: 11.144288939021168 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 52.61483097566902,
            "unit": "iter/sec",
            "range": "stddev: 0.010357405035768878",
            "extra": "mean: 19.00604794230805 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.03616572099078,
            "unit": "iter/sec",
            "range": "stddev: 0.01874126012558669",
            "extra": "mean: 31.214721783786334 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 17.70944594856434,
            "unit": "iter/sec",
            "range": "stddev: 0.032142002658281314",
            "extra": "mean: 56.46704040907997 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 14.8852185909237,
            "unit": "iter/sec",
            "range": "stddev: 0.03243684124482536",
            "extra": "mean: 67.18073999999923 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.6890547792313966,
            "unit": "iter/sec",
            "range": "stddev: 0.029286454299408772",
            "extra": "mean: 592.0471095999915 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 34.28013334644516,
            "unit": "iter/sec",
            "range": "stddev: 0.02592763706933788",
            "extra": "mean: 29.171415113637522 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6669612142577269,
            "unit": "iter/sec",
            "range": "stddev: 0.06019047741716083",
            "extra": "mean: 1.4993375606000086 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.96734666626308,
            "unit": "iter/sec",
            "range": "stddev: 0.048015420530724676",
            "extra": "mean: 71.59555955000485 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.268757658794815,
            "unit": "iter/sec",
            "range": "stddev: 0.008274512014340717",
            "extra": "mean: 137.57509149999692 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.428451785595645,
            "unit": "iter/sec",
            "range": "stddev: 0.011929270081202526",
            "extra": "mean: 225.81255220000003 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 155.198785957175,
            "unit": "iter/sec",
            "range": "stddev: 0.0005192315261934151",
            "extra": "mean: 6.443349371791713 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 107.5298720099264,
            "unit": "iter/sec",
            "range": "stddev: 0.00019562732620752586",
            "extra": "mean: 9.29974137705369 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 204.1185320839941,
            "unit": "iter/sec",
            "range": "stddev: 0.0002051822306544784",
            "extra": "mean: 4.8991142048214575 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 172.7018745850407,
            "unit": "iter/sec",
            "range": "stddev: 0.0018416457142202852",
            "extra": "mean: 5.790325104477002 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 440.2154767298256,
            "unit": "iter/sec",
            "range": "stddev: 0.00048117555143984905",
            "extra": "mean: 2.2716148178809537 msec\nrounds: 302"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 568.8249660956095,
            "unit": "iter/sec",
            "range": "stddev: 0.00012122673357057292",
            "extra": "mean: 1.758010037540999 msec\nrounds: 293"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 505.861653401944,
            "unit": "iter/sec",
            "range": "stddev: 0.004013788143562567",
            "extra": "mean: 1.9768250731696142 msec\nrounds: 369"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 41.19383626185273,
            "unit": "iter/sec",
            "range": "stddev: 0.00023475003324113452",
            "extra": "mean: 24.275476399998297 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 192.82729404387894,
            "unit": "iter/sec",
            "range": "stddev: 0.00020920061155921182",
            "extra": "mean: 5.185987828945234 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 186.21117163830854,
            "unit": "iter/sec",
            "range": "stddev: 0.0008937369023382544",
            "extra": "mean: 5.370247075950806 msec\nrounds: 79"
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
          "id": "e75fd752f7b3105e1d6b8e7634605550ecef7e54",
          "message": "Bump version: 0.4.3 → 0.4.4",
          "timestamp": "2023-10-03T08:24:07+02:00",
          "tree_id": "c5a7e888fb82a1775ae5839cb0742d7e3316cf0b",
          "url": "https://github.com/developmentseed/tipg/commit/e75fd752f7b3105e1d6b8e7634605550ecef7e54"
        },
        "date": 1696314657819,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 267.73099803072216,
            "unit": "iter/sec",
            "range": "stddev: 0.0008079838263803516",
            "extra": "mean: 3.735092340279738 msec\nrounds: 144"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 169.58833127786977,
            "unit": "iter/sec",
            "range": "stddev: 0.0008104651717529764",
            "extra": "mean: 5.896632111801986 msec\nrounds: 161"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 269.71994438724937,
            "unit": "iter/sec",
            "range": "stddev: 0.0005836133451227648",
            "extra": "mean: 3.7075493333346308 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 175.05923181080325,
            "unit": "iter/sec",
            "range": "stddev: 0.0013245915849923455",
            "extra": "mean: 5.7123522687495765 msec\nrounds: 160"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 340.08493544916905,
            "unit": "iter/sec",
            "range": "stddev: 0.0004946614672628768",
            "extra": "mean: 2.9404419183673762 msec\nrounds: 245"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 342.0550585824008,
            "unit": "iter/sec",
            "range": "stddev: 0.0003146143409870563",
            "extra": "mean: 2.923505952943247 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 392.818909828259,
            "unit": "iter/sec",
            "range": "stddev: 0.000774885510089034",
            "extra": "mean: 2.5457022943147045 msec\nrounds: 299"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 132.92403592312527,
            "unit": "iter/sec",
            "range": "stddev: 0.000816070781249228",
            "extra": "mean: 7.523093871287024 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 121.99002399103077,
            "unit": "iter/sec",
            "range": "stddev: 0.0009263629026094873",
            "extra": "mean: 8.19739161682208 msec\nrounds: 107"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 76.84699859829705,
            "unit": "iter/sec",
            "range": "stddev: 0.0012248311285389785",
            "extra": "mean: 13.012869965518215 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 57.20867185895398,
            "unit": "iter/sec",
            "range": "stddev: 0.006542016572128997",
            "extra": "mean: 17.479867431033284 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 35.79934196751819,
            "unit": "iter/sec",
            "range": "stddev: 0.007428568660599457",
            "extra": "mean: 27.93347433333635 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 28.450108228330965,
            "unit": "iter/sec",
            "range": "stddev: 0.012534437074346625",
            "extra": "mean: 35.14925117241514 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 126.54939427588509,
            "unit": "iter/sec",
            "range": "stddev: 0.0008488161897162848",
            "extra": "mean: 7.902052836538606 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 91.91998848417087,
            "unit": "iter/sec",
            "range": "stddev: 0.0011282472183745795",
            "extra": "mean: 10.87902660227384 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 51.880737339217475,
            "unit": "iter/sec",
            "range": "stddev: 0.001577207100635283",
            "extra": "mean: 19.274976634614713 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 32.728019468667824,
            "unit": "iter/sec",
            "range": "stddev: 0.0022010778222656666",
            "extra": "mean: 30.554858382351863 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 18.40926388399906,
            "unit": "iter/sec",
            "range": "stddev: 0.0030869897023960142",
            "extra": "mean: 54.320477249999044 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 14.181040795726634,
            "unit": "iter/sec",
            "range": "stddev: 0.011605240708933706",
            "extra": "mean: 70.51668593333034 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 126.59373452455834,
            "unit": "iter/sec",
            "range": "stddev: 0.0005832197662749906",
            "extra": "mean: 7.899285093023357 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 99.72858206028634,
            "unit": "iter/sec",
            "range": "stddev: 0.0012702637284808275",
            "extra": "mean: 10.027215662160883 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 52.68987394664432,
            "unit": "iter/sec",
            "range": "stddev: 0.007714800082616045",
            "extra": "mean: 18.978978788460118 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 37.093799042431556,
            "unit": "iter/sec",
            "range": "stddev: 0.0018696312593765425",
            "extra": "mean: 26.958683818179452 msec\nrounds: 11"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.488802545516286,
            "unit": "iter/sec",
            "range": "stddev: 0.025491150159529744",
            "extra": "mean: 54.086791047617616 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 16.196885321134925,
            "unit": "iter/sec",
            "range": "stddev: 0.026767074128293548",
            "extra": "mean: 61.740265500004746 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.062646403676705,
            "unit": "iter/sec",
            "range": "stddev: 0.04013449166466239",
            "extra": "mean: 484.8140709999939 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 47.267283472342214,
            "unit": "iter/sec",
            "range": "stddev: 0.01647908518837106",
            "extra": "mean: 21.156282454546727 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.7881949772045831,
            "unit": "iter/sec",
            "range": "stddev: 0.06302266234795938",
            "extra": "mean: 1.2687216094000064 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 18.29548117433429,
            "unit": "iter/sec",
            "range": "stddev: 0.03360805299530729",
            "extra": "mean: 54.6583055384651 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.860587842113984,
            "unit": "iter/sec",
            "range": "stddev: 0.01707086466830246",
            "extra": "mean: 127.21694866666175 msec\nrounds: 9"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.024724967345072,
            "unit": "iter/sec",
            "range": "stddev: 0.019493243883916142",
            "extra": "mean: 199.01586783333394 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 160.4615561302861,
            "unit": "iter/sec",
            "range": "stddev: 0.00068328238606103",
            "extra": "mean: 6.232022324325796 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 103.89433998394951,
            "unit": "iter/sec",
            "range": "stddev: 0.0008893832393445805",
            "extra": "mean: 9.625163412698793 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 167.96417257013428,
            "unit": "iter/sec",
            "range": "stddev: 0.0007042617294150588",
            "extra": "mean: 5.953650619047613 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 159.10099372887805,
            "unit": "iter/sec",
            "range": "stddev: 0.000622944837639525",
            "extra": "mean: 6.285315864865602 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 373.68245396741054,
            "unit": "iter/sec",
            "range": "stddev: 0.0004600375574433743",
            "extra": "mean: 2.676068917293108 msec\nrounds: 266"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 488.77950311521084,
            "unit": "iter/sec",
            "range": "stddev: 0.0005091498456500569",
            "extra": "mean: 2.045912305296257 msec\nrounds: 321"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 479.89639078194614,
            "unit": "iter/sec",
            "range": "stddev: 0.0003604823372770729",
            "extra": "mean: 2.083783123208311 msec\nrounds: 349"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 42.521924304142814,
            "unit": "iter/sec",
            "range": "stddev: 0.0010290248144180314",
            "extra": "mean: 23.517280000015717 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 198.93270099366825,
            "unit": "iter/sec",
            "range": "stddev: 0.0004945340594391225",
            "extra": "mean: 5.026825629999507 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 196.4391672765982,
            "unit": "iter/sec",
            "range": "stddev: 0.00039154133398389937",
            "extra": "mean: 5.0906344893630076 msec\nrounds: 94"
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
          "id": "11b44114aa5f60011d027ec0c2c10863a978d1d3",
          "message": "Merge pull request #133 from developmentseed/patch/hide-map-elelemt\n\nhide map element in HTML pages when collections/items do not have spatial component",
          "timestamp": "2023-10-18T17:31:29+02:00",
          "tree_id": "9c4fe5b0d0128b91559a1be66be9a5764025fcd8",
          "url": "https://github.com/developmentseed/tipg/commit/11b44114aa5f60011d027ec0c2c10863a978d1d3"
        },
        "date": 1697643492717,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 245.78842355529304,
            "unit": "iter/sec",
            "range": "stddev: 0.00047675986020069333",
            "extra": "mean: 4.068539866667228 msec\nrounds: 150"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 146.7844615232402,
            "unit": "iter/sec",
            "range": "stddev: 0.0015306568696800708",
            "extra": "mean: 6.812710212120588 msec\nrounds: 132"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 232.69802470102965,
            "unit": "iter/sec",
            "range": "stddev: 0.0005391769180764781",
            "extra": "mean: 4.2974150781245335 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 146.1465621128356,
            "unit": "iter/sec",
            "range": "stddev: 0.0007820394135744702",
            "extra": "mean: 6.84244627819523 msec\nrounds: 133"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 322.66195288265413,
            "unit": "iter/sec",
            "range": "stddev: 0.00048566778171638396",
            "extra": "mean: 3.099218829694744 msec\nrounds: 229"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 272.16161187851674,
            "unit": "iter/sec",
            "range": "stddev: 0.0006340402992621338",
            "extra": "mean: 3.6742874687498706 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 330.0025334880132,
            "unit": "iter/sec",
            "range": "stddev: 0.0004491120556264463",
            "extra": "mean: 3.0302797661288965 msec\nrounds: 248"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 107.88222189601002,
            "unit": "iter/sec",
            "range": "stddev: 0.000954130633661728",
            "extra": "mean: 9.269367857142592 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 88.81248473575877,
            "unit": "iter/sec",
            "range": "stddev: 0.00132049696777434",
            "extra": "mean: 11.259678219512395 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 60.76418874531718,
            "unit": "iter/sec",
            "range": "stddev: 0.0012624289183398969",
            "extra": "mean: 16.457061645162923 msec\nrounds: 62"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 42.03670323802795,
            "unit": "iter/sec",
            "range": "stddev: 0.01110872178855118",
            "extra": "mean: 23.78873515217443 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 26.18532353558364,
            "unit": "iter/sec",
            "range": "stddev: 0.01729365839408987",
            "extra": "mean: 38.18933146428703 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 21.546270857264798,
            "unit": "iter/sec",
            "range": "stddev: 0.02338308830002849",
            "extra": "mean: 46.41174366666926 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 91.12423236173998,
            "unit": "iter/sec",
            "range": "stddev: 0.001067989287990261",
            "extra": "mean: 10.97402934523777 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 79.95594143339117,
            "unit": "iter/sec",
            "range": "stddev: 0.001163674427587834",
            "extra": "mean: 12.50688794444462 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 36.720544915185094,
            "unit": "iter/sec",
            "range": "stddev: 0.005363783957623249",
            "extra": "mean: 27.232711342103986 msec\nrounds: 38"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 25.35853760910675,
            "unit": "iter/sec",
            "range": "stddev: 0.0023609443999235524",
            "extra": "mean: 39.43445065384529 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 15.208231038547824,
            "unit": "iter/sec",
            "range": "stddev: 0.0022025993527433506",
            "extra": "mean: 65.75386693332916 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 12.423616003741902,
            "unit": "iter/sec",
            "range": "stddev: 0.0023675637095660652",
            "extra": "mean: 80.49186321428537 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 92.33223796147803,
            "unit": "iter/sec",
            "range": "stddev: 0.0018863512955781384",
            "extra": "mean: 10.830453393940374 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 79.32969890199547,
            "unit": "iter/sec",
            "range": "stddev: 0.0021686412898205727",
            "extra": "mean: 12.605619507460979 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 45.641394234289336,
            "unit": "iter/sec",
            "range": "stddev: 0.01140696524740737",
            "extra": "mean: 21.90993541666882 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 28.670557892687896,
            "unit": "iter/sec",
            "range": "stddev: 0.022547161955654246",
            "extra": "mean: 34.878986441175556 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 15.859431209293096,
            "unit": "iter/sec",
            "range": "stddev: 0.03507810791449347",
            "extra": "mean: 63.05396371428715 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 12.67505661420302,
            "unit": "iter/sec",
            "range": "stddev: 0.04489551776575911",
            "extra": "mean: 78.89511111764591 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.4399636624133039,
            "unit": "iter/sec",
            "range": "stddev: 0.06418297720040653",
            "extra": "mean: 694.4619687999989 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 33.80724152911537,
            "unit": "iter/sec",
            "range": "stddev: 0.02690112325881413",
            "extra": "mean: 29.579461522726803 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6161029343074929,
            "unit": "iter/sec",
            "range": "stddev: 0.08157959383656917",
            "extra": "mean: 1.6231054006000023 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 15.673638238255727,
            "unit": "iter/sec",
            "range": "stddev: 0.03387820522232193",
            "extra": "mean: 63.801396000019395 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.777147794558584,
            "unit": "iter/sec",
            "range": "stddev: 0.009895997495781175",
            "extra": "mean: 147.5546985714118 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.3459813803623915,
            "unit": "iter/sec",
            "range": "stddev: 0.013763509380835476",
            "extra": "mean: 230.09762640000417 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 121.77490875020004,
            "unit": "iter/sec",
            "range": "stddev: 0.002121986612389241",
            "extra": "mean: 8.21187229999347 msec\nrounds: 70"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 93.78509752115387,
            "unit": "iter/sec",
            "range": "stddev: 0.0006674114081744083",
            "extra": "mean: 10.66267484313745 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 152.31525949713432,
            "unit": "iter/sec",
            "range": "stddev: 0.0014490631734695226",
            "extra": "mean: 6.565330376624637 msec\nrounds: 77"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 146.40447056483603,
            "unit": "iter/sec",
            "range": "stddev: 0.0003742159393846497",
            "extra": "mean: 6.8303925156243395 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 370.0128514986745,
            "unit": "iter/sec",
            "range": "stddev: 0.00032572998328144446",
            "extra": "mean: 2.7026088308816005 msec\nrounds: 272"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 481.58671074523033,
            "unit": "iter/sec",
            "range": "stddev: 0.0002892323228773966",
            "extra": "mean: 2.076469258158208 msec\nrounds: 337"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 452.45314501714483,
            "unit": "iter/sec",
            "range": "stddev: 0.00040447071646847736",
            "extra": "mean: 2.2101736080585916 msec\nrounds: 273"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 37.196535229025855,
            "unit": "iter/sec",
            "range": "stddev: 0.0006023757341254087",
            "extra": "mean: 26.88422440000977 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 163.84278739431238,
            "unit": "iter/sec",
            "range": "stddev: 0.0006357925872708522",
            "extra": "mean: 6.103411788236666 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 159.63107260619202,
            "unit": "iter/sec",
            "range": "stddev: 0.0005139844505959196",
            "extra": "mean: 6.264444532468865 msec\nrounds: 77"
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
          "id": "7859298f02f3c4490aad28893f4e0c8fd36f96c8",
          "message": "Merge pull request #135 from developmentseed/splitRouteRegistration\n\nsplit route registration to allow endpoint overriding",
          "timestamp": "2023-10-27T10:06:56+02:00",
          "tree_id": "5bb78a3695981577eced4686d1152f69a9826657",
          "url": "https://github.com/developmentseed/tipg/commit/7859298f02f3c4490aad28893f4e0c8fd36f96c8"
        },
        "date": 1698394459788,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 220.68157813717056,
            "unit": "iter/sec",
            "range": "stddev: 0.0007502643968261362",
            "extra": "mean: 4.531415845587361 msec\nrounds: 136"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 148.47257981974167,
            "unit": "iter/sec",
            "range": "stddev: 0.0008123597158507053",
            "extra": "mean: 6.735250382354001 msec\nrounds: 136"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 252.72387294563813,
            "unit": "iter/sec",
            "range": "stddev: 0.00038720609109610274",
            "extra": "mean: 3.956887761905674 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 134.5087597393702,
            "unit": "iter/sec",
            "range": "stddev: 0.0015114615902210584",
            "extra": "mean: 7.4344600451126155 msec\nrounds: 133"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 288.25088288318966,
            "unit": "iter/sec",
            "range": "stddev: 0.0016257866257088033",
            "extra": "mean: 3.469200128713009 msec\nrounds: 202"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 298.075546545562,
            "unit": "iter/sec",
            "range": "stddev: 0.00035385316623880565",
            "extra": "mean: 3.354854202530653 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 327.26360545809865,
            "unit": "iter/sec",
            "range": "stddev: 0.0016523082521522755",
            "extra": "mean: 3.0556407230196436 msec\nrounds: 278"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 96.2987953067582,
            "unit": "iter/sec",
            "range": "stddev: 0.002204943101332048",
            "extra": "mean: 10.384345897729215 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 80.40159414153521,
            "unit": "iter/sec",
            "range": "stddev: 0.0026800672351834005",
            "extra": "mean: 12.437564337836967 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 58.531584317016915,
            "unit": "iter/sec",
            "range": "stddev: 0.0016400179365324544",
            "extra": "mean: 17.084792965518098 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 38.866539902145234,
            "unit": "iter/sec",
            "range": "stddev: 0.014157972081790576",
            "extra": "mean: 25.72907190909487 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.907027708731757,
            "unit": "iter/sec",
            "range": "stddev: 0.019372200768028175",
            "extra": "mean: 38.59956500000029 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 21.335317875191613,
            "unit": "iter/sec",
            "range": "stddev: 0.01923320042541863",
            "extra": "mean: 46.87063983999906 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 83.98169938783379,
            "unit": "iter/sec",
            "range": "stddev: 0.002288313015565636",
            "extra": "mean: 11.90735609411671 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 66.4753393423663,
            "unit": "iter/sec",
            "range": "stddev: 0.011292047026715026",
            "extra": "mean: 15.043172549292674 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 38.54819484591522,
            "unit": "iter/sec",
            "range": "stddev: 0.0035324029495408735",
            "extra": "mean: 25.941551971426893 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 23.335816065372818,
            "unit": "iter/sec",
            "range": "stddev: 0.006299641323748993",
            "extra": "mean: 42.85258322222826 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 14.785378826802837,
            "unit": "iter/sec",
            "range": "stddev: 0.004109042940664509",
            "extra": "mean: 67.63438473332901 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 11.653193698288948,
            "unit": "iter/sec",
            "range": "stddev: 0.007430726694220914",
            "extra": "mean: 85.81338523076563 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 85.61406566666777,
            "unit": "iter/sec",
            "range": "stddev: 0.0015012161551804285",
            "extra": "mean: 11.680323696966202 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 76.94395602725348,
            "unit": "iter/sec",
            "range": "stddev: 0.001239384812493619",
            "extra": "mean: 12.99647238888784 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 41.261825459180926,
            "unit": "iter/sec",
            "range": "stddev: 0.014753738540671961",
            "extra": "mean: 24.23547646938863 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 27.10345504102208,
            "unit": "iter/sec",
            "range": "stddev: 0.02509472318688555",
            "extra": "mean: 36.89566509090679 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 15.65505849060849,
            "unit": "iter/sec",
            "range": "stddev: 0.03902725672211685",
            "extra": "mean: 63.8771168181775 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 12.758922050504944,
            "unit": "iter/sec",
            "range": "stddev: 0.042385091625803825",
            "extra": "mean: 78.3765271111147 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.3883270148206364,
            "unit": "iter/sec",
            "range": "stddev: 0.05962367869609992",
            "extra": "mean: 720.2913933999866 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 30.550244423852476,
            "unit": "iter/sec",
            "range": "stddev: 0.03151164110766576",
            "extra": "mean: 32.7329623333304 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.5902697081104255,
            "unit": "iter/sec",
            "range": "stddev: 0.0644366862390597",
            "extra": "mean: 1.6941408075999789 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 12.415371883597395,
            "unit": "iter/sec",
            "range": "stddev: 0.056750057682529664",
            "extra": "mean: 80.54531184210059 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.438537775878401,
            "unit": "iter/sec",
            "range": "stddev: 0.014342954479440681",
            "extra": "mean: 155.31476785714307 msec\nrounds: 7"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 3.8063775578878936,
            "unit": "iter/sec",
            "range": "stddev: 0.021328767791010245",
            "extra": "mean: 262.7169755999944 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 124.98242690725061,
            "unit": "iter/sec",
            "range": "stddev: 0.000661774262968769",
            "extra": "mean: 8.00112483607075 msec\nrounds: 61"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 82.77155443663429,
            "unit": "iter/sec",
            "range": "stddev: 0.0013961704530674305",
            "extra": "mean: 12.08144521153761 msec\nrounds: 52"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 150.46192311933194,
            "unit": "iter/sec",
            "range": "stddev: 0.0012022013510878035",
            "extra": "mean: 6.646199777779632 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 120.51131852123363,
            "unit": "iter/sec",
            "range": "stddev: 0.003043357783039609",
            "extra": "mean: 8.297975760872651 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 356.56797395686675,
            "unit": "iter/sec",
            "range": "stddev: 0.0005276315931244648",
            "extra": "mean: 2.804514350806412 msec\nrounds: 248"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 436.4143079672186,
            "unit": "iter/sec",
            "range": "stddev: 0.0012679302329343404",
            "extra": "mean: 2.291400583674528 msec\nrounds: 245"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 453.54332551131944,
            "unit": "iter/sec",
            "range": "stddev: 0.0006331116567111344",
            "extra": "mean: 2.2048610215410216 msec\nrounds: 325"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 35.373267205113734,
            "unit": "iter/sec",
            "range": "stddev: 0.0011598324330563351",
            "extra": "mean: 28.26993600001515 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 153.39820597217022,
            "unit": "iter/sec",
            "range": "stddev: 0.0010115176145581949",
            "extra": "mean: 6.518981064103331 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 153.9934174363952,
            "unit": "iter/sec",
            "range": "stddev: 0.000817126359130067",
            "extra": "mean: 6.493784063289822 msec\nrounds: 79"
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
          "id": "8a54e31e7acc0a82167a0f3c9da294b7c3f7882f",
          "message": "Merge pull request #131 from developmentseed/patch/includes-excludes\n\nfix exclude/include tables",
          "timestamp": "2023-10-30T20:23:10+01:00",
          "tree_id": "4a6902147f17a1e35f7631de483acbf07682774c",
          "url": "https://github.com/developmentseed/tipg/commit/8a54e31e7acc0a82167a0f3c9da294b7c3f7882f"
        },
        "date": 1698694180089,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 240.21953147459286,
            "unit": "iter/sec",
            "range": "stddev: 0.00035240039769226893",
            "extra": "mean: 4.162858839418586 msec\nrounds: 137"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 152.5813676827347,
            "unit": "iter/sec",
            "range": "stddev: 0.0012273647671282803",
            "extra": "mean: 6.553880170213959 msec\nrounds: 141"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 236.6347245980547,
            "unit": "iter/sec",
            "range": "stddev: 0.00040479828454374197",
            "extra": "mean: 4.225922470586638 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 152.99146735001906,
            "unit": "iter/sec",
            "range": "stddev: 0.0005593091036420572",
            "extra": "mean: 6.5363122357155135 msec\nrounds: 140"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 319.28436973855673,
            "unit": "iter/sec",
            "range": "stddev: 0.0006054822068501102",
            "extra": "mean: 3.1320042406674697 msec\nrounds: 241"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 284.2290434124812,
            "unit": "iter/sec",
            "range": "stddev: 0.0005772017622583643",
            "extra": "mean: 3.5182892923042064 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 333.4470449719176,
            "unit": "iter/sec",
            "range": "stddev: 0.0013297239168036164",
            "extra": "mean: 2.998976944252778 msec\nrounds: 287"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 119.08399608378124,
            "unit": "iter/sec",
            "range": "stddev: 0.0005063463324822539",
            "extra": "mean: 8.397434020407347 msec\nrounds: 98"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 104.12935760142868,
            "unit": "iter/sec",
            "range": "stddev: 0.000904033315217505",
            "extra": "mean: 9.603439635416322 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 71.68163022378047,
            "unit": "iter/sec",
            "range": "stddev: 0.0006835865850530904",
            "extra": "mean: 13.95057557812418 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 47.669144661690915,
            "unit": "iter/sec",
            "range": "stddev: 0.009759764345513492",
            "extra": "mean: 20.97793042222646 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 31.29104716668051,
            "unit": "iter/sec",
            "range": "stddev: 0.009362209670602143",
            "extra": "mean: 31.958022838712317 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 25.44347707255588,
            "unit": "iter/sec",
            "range": "stddev: 0.015811881674654697",
            "extra": "mean: 39.30280429629765 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 102.13898595112923,
            "unit": "iter/sec",
            "range": "stddev: 0.0017838449240502392",
            "extra": "mean: 9.790580851061838 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 82.86055588157778,
            "unit": "iter/sec",
            "range": "stddev: 0.0008973623131004267",
            "extra": "mean: 12.068468396822908 msec\nrounds: 63"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 43.04521553769777,
            "unit": "iter/sec",
            "range": "stddev: 0.0023060487706052044",
            "extra": "mean: 23.231385590907973 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 26.52119400059654,
            "unit": "iter/sec",
            "range": "stddev: 0.005842445459578478",
            "extra": "mean: 37.70569303846226 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 16.145611012622723,
            "unit": "iter/sec",
            "range": "stddev: 0.0028230589679194428",
            "extra": "mean: 61.93633670588216 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 12.391881666527588,
            "unit": "iter/sec",
            "range": "stddev: 0.008115825567969807",
            "extra": "mean: 80.69799461539053 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 106.97646333192887,
            "unit": "iter/sec",
            "range": "stddev: 0.0006542832903851717",
            "extra": "mean: 9.347850628574049 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 92.1592853151175,
            "unit": "iter/sec",
            "range": "stddev: 0.0009483579825505519",
            "extra": "mean: 10.850778590358312 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 49.108282039401736,
            "unit": "iter/sec",
            "range": "stddev: 0.009174676000236644",
            "extra": "mean: 20.363163981131656 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 29.815957162415916,
            "unit": "iter/sec",
            "range": "stddev: 0.01903371849429721",
            "extra": "mean: 33.53908762857145 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.618411294503932,
            "unit": "iter/sec",
            "range": "stddev: 0.025098534534298923",
            "extra": "mean: 53.71027549999367 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 15.961083880176076,
            "unit": "iter/sec",
            "range": "stddev: 0.025686011197741575",
            "extra": "mean: 62.652386736844115 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.8175237331540628,
            "unit": "iter/sec",
            "range": "stddev: 0.038106712417492694",
            "extra": "mean: 550.1991427999883 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 38.916788998275464,
            "unit": "iter/sec",
            "range": "stddev: 0.019223539147694396",
            "extra": "mean: 25.695850704545883 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6877473664366971,
            "unit": "iter/sec",
            "range": "stddev: 0.07448212168269079",
            "extra": "mean: 1.454022288999988 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 15.279647085961418,
            "unit": "iter/sec",
            "range": "stddev: 0.041019507920175884",
            "extra": "mean: 65.44653776190789 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 7.391875188601499,
            "unit": "iter/sec",
            "range": "stddev: 0.013514663713418727",
            "extra": "mean: 135.28366949999793 msec\nrounds: 8"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.494810215263886,
            "unit": "iter/sec",
            "range": "stddev: 0.018398741981674092",
            "extra": "mean: 222.4788038000156 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 138.32568351447543,
            "unit": "iter/sec",
            "range": "stddev: 0.0006364198686434687",
            "extra": "mean: 7.229315443038115 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 97.39432135331413,
            "unit": "iter/sec",
            "range": "stddev: 0.0006999323638653883",
            "extra": "mean: 10.267539073169713 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 166.0384197436887,
            "unit": "iter/sec",
            "range": "stddev: 0.0008852895453109733",
            "extra": "mean: 6.022702465752726 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 163.22413704467482,
            "unit": "iter/sec",
            "range": "stddev: 0.00042917925579649707",
            "extra": "mean: 6.126544873239536 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 383.9450141409382,
            "unit": "iter/sec",
            "range": "stddev: 0.00045522711059247826",
            "extra": "mean: 2.604539616792421 msec\nrounds: 274"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 482.69566786521494,
            "unit": "iter/sec",
            "range": "stddev: 0.0007622084050351511",
            "extra": "mean: 2.0716987256642088 msec\nrounds: 339"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 447.7310877713822,
            "unit": "iter/sec",
            "range": "stddev: 0.003658147758521166",
            "extra": "mean: 2.2334835067575516 msec\nrounds: 296"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 40.68475568403995,
            "unit": "iter/sec",
            "range": "stddev: 0.0004386873975191705",
            "extra": "mean: 24.5792308000091 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 172.36545739745924,
            "unit": "iter/sec",
            "range": "stddev: 0.000543839364241205",
            "extra": "mean: 5.801626469125365 msec\nrounds: 81"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 172.11135225052283,
            "unit": "iter/sec",
            "range": "stddev: 0.0004988526174331316",
            "extra": "mean: 5.8101919886400895 msec\nrounds: 88"
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
          "id": "a284292cb76b2ef70de6d81fbf729729c39ad9f3",
          "message": "Merge pull request #136 from developmentseed/refactorCatalogParams\n\nRefactor catalog params",
          "timestamp": "2023-10-31T15:14:07+01:00",
          "tree_id": "69bdd6d66da19d3e26a77fe17b2cc959e56c6b02",
          "url": "https://github.com/developmentseed/tipg/commit/a284292cb76b2ef70de6d81fbf729729c39ad9f3"
        },
        "date": 1698762033920,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 389.8174657849523,
            "unit": "iter/sec",
            "range": "stddev: 0.0001346513331121",
            "extra": "mean: 2.5653032195116228 msec\nrounds: 205"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 235.81724379810439,
            "unit": "iter/sec",
            "range": "stddev: 0.0001314043223951821",
            "extra": "mean: 4.240571995049492 msec\nrounds: 202"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 386.9907532429826,
            "unit": "iter/sec",
            "range": "stddev: 0.00012887457842136315",
            "extra": "mean: 2.5840410697671707 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 226.57826331125347,
            "unit": "iter/sec",
            "range": "stddev: 0.00016911503432068357",
            "extra": "mean: 4.413486030768482 msec\nrounds: 195"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 497.36579735757243,
            "unit": "iter/sec",
            "range": "stddev: 0.00012218872577341353",
            "extra": "mean: 2.0105926167678705 msec\nrounds: 334"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 474.5252825568808,
            "unit": "iter/sec",
            "range": "stddev: 0.00012230952747538322",
            "extra": "mean: 2.10736927358582 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 560.1728217671863,
            "unit": "iter/sec",
            "range": "stddev: 0.00009868798011117214",
            "extra": "mean: 1.785163365914976 msec\nrounds: 399"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 171.72340015031662,
            "unit": "iter/sec",
            "range": "stddev: 0.0001975764018515539",
            "extra": "mean: 5.823318191490841 msec\nrounds: 141"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 150.89509342585401,
            "unit": "iter/sec",
            "range": "stddev: 0.0005174120591189715",
            "extra": "mean: 6.627120718748714 msec\nrounds: 128"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 92.37633529510073,
            "unit": "iter/sec",
            "range": "stddev: 0.004799516181177598",
            "extra": "mean: 10.825283302324683 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 65.4199256164811,
            "unit": "iter/sec",
            "range": "stddev: 0.005496999397562707",
            "extra": "mean: 15.285862687500096 msec\nrounds: 64"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 40.93348370299044,
            "unit": "iter/sec",
            "range": "stddev: 0.006767118864512801",
            "extra": "mean: 24.42987768292352 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 31.877819596559092,
            "unit": "iter/sec",
            "range": "stddev: 0.012522450839551913",
            "extra": "mean: 31.369774114285423 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 164.99236600027038,
            "unit": "iter/sec",
            "range": "stddev: 0.0001625180883885496",
            "extra": "mean: 6.0608864776104925 msec\nrounds: 134"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 131.78887347828973,
            "unit": "iter/sec",
            "range": "stddev: 0.0003126913356476361",
            "extra": "mean: 7.587893982299919 msec\nrounds: 113"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 71.00074025478915,
            "unit": "iter/sec",
            "range": "stddev: 0.0004241045785840394",
            "extra": "mean: 14.084360196970593 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 44.912298902681094,
            "unit": "iter/sec",
            "range": "stddev: 0.0004133500660856742",
            "extra": "mean: 22.2656159767476 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.38712730341501,
            "unit": "iter/sec",
            "range": "stddev: 0.0015488591510809668",
            "extra": "mean: 39.390041576916914 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 21.20231606184937,
            "unit": "iter/sec",
            "range": "stddev: 0.0009630622441218977",
            "extra": "mean: 47.164658666670924 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 161.2583038976123,
            "unit": "iter/sec",
            "range": "stddev: 0.00015107003155602982",
            "extra": "mean: 6.2012310425572235 msec\nrounds: 47"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 131.41922491054981,
            "unit": "iter/sec",
            "range": "stddev: 0.00038299977072516665",
            "extra": "mean: 7.6092367816097495 msec\nrounds: 87"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 71.18975022809582,
            "unit": "iter/sec",
            "range": "stddev: 0.0060196890867636015",
            "extra": "mean: 14.046965985917156 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 50.012686611030425,
            "unit": "iter/sec",
            "range": "stddev: 0.00017634477829479224",
            "extra": "mean: 19.994926642862 msec\nrounds: 14"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 25.74513671846712,
            "unit": "iter/sec",
            "range": "stddev: 0.015851254043987614",
            "extra": "mean: 38.84228741666362 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 19.446041680188895,
            "unit": "iter/sec",
            "range": "stddev: 0.02196395036197749",
            "extra": "mean: 51.424347249999634 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.451994014029415,
            "unit": "iter/sec",
            "range": "stddev: 0.009399100052411144",
            "extra": "mean: 407.8313381999976 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 50.561971751322865,
            "unit": "iter/sec",
            "range": "stddev: 0.01543572328009663",
            "extra": "mean: 19.77770971666738 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.9127396645615509,
            "unit": "iter/sec",
            "range": "stddev: 0.039552382563250214",
            "extra": "mean: 1.0956026552000082 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 20.11363481067079,
            "unit": "iter/sec",
            "range": "stddev: 0.030565646770264313",
            "extra": "mean: 49.71751796296286 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 9.071946454832053,
            "unit": "iter/sec",
            "range": "stddev: 0.007972027740308708",
            "extra": "mean: 110.22992749999787 msec\nrounds: 10"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.354829871847516,
            "unit": "iter/sec",
            "range": "stddev: 0.011692305686138053",
            "extra": "mean: 186.7472961666626 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 197.51129716783083,
            "unit": "iter/sec",
            "range": "stddev: 0.00011718955652817509",
            "extra": "mean: 5.0630015312504995 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 132.2249070318908,
            "unit": "iter/sec",
            "range": "stddev: 0.0002176113631555468",
            "extra": "mean: 7.562871643833442 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 253.74316349195954,
            "unit": "iter/sec",
            "range": "stddev: 0.00010642252659784684",
            "extra": "mean: 3.9409928773576093 msec\nrounds: 106"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 232.08461437687794,
            "unit": "iter/sec",
            "range": "stddev: 0.0002772635786773613",
            "extra": "mean: 4.308773344087852 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 504.3077044734148,
            "unit": "iter/sec",
            "range": "stddev: 0.0028841331379532574",
            "extra": "mean: 1.982916364611511 msec\nrounds: 373"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 714.4151473564792,
            "unit": "iter/sec",
            "range": "stddev: 0.00011123610818711978",
            "extra": "mean: 1.3997463571429842 msec\nrounds: 476"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 708.851850379112,
            "unit": "iter/sec",
            "range": "stddev: 0.00007234887368660502",
            "extra": "mean: 1.4107320160978272 msec\nrounds: 497"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 51.44201801933845,
            "unit": "iter/sec",
            "range": "stddev: 0.0002227153087666646",
            "extra": "mean: 19.439361799999233 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 230.92654791968474,
            "unit": "iter/sec",
            "range": "stddev: 0.00007775541167608782",
            "extra": "mean: 4.3303812792793135 msec\nrounds: 111"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 224.97888641484812,
            "unit": "iter/sec",
            "range": "stddev: 0.00008029404899892052",
            "extra": "mean: 4.444861542056251 msec\nrounds: 107"
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
          "id": "e921266dfb1b19ebc012d7533e860faa2b3f5623",
          "message": "Bump version: 0.4.4 → 0.5.0",
          "timestamp": "2023-11-02T17:32:55+01:00",
          "tree_id": "8e887aaebeff2c81401c50f20adc14c644e60389",
          "url": "https://github.com/developmentseed/tipg/commit/e921266dfb1b19ebc012d7533e860faa2b3f5623"
        },
        "date": 1698943176295,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 293.42886200801485,
            "unit": "iter/sec",
            "range": "stddev: 0.00024045578576869213",
            "extra": "mean: 3.4079810457523623 msec\nrounds: 153"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 188.14398200895758,
            "unit": "iter/sec",
            "range": "stddev: 0.00042374904812340143",
            "extra": "mean: 5.315078320987114 msec\nrounds: 162"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 303.645174208001,
            "unit": "iter/sec",
            "range": "stddev: 0.00019365798169811426",
            "extra": "mean: 3.2933176119406617 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 176.6114781868409,
            "unit": "iter/sec",
            "range": "stddev: 0.0006546231929774913",
            "extra": "mean: 5.662146142857597 msec\nrounds: 133"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 384.900489262013,
            "unit": "iter/sec",
            "range": "stddev: 0.00026244042473215165",
            "extra": "mean: 2.598074120189727 msec\nrounds: 208"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 334.12418168617126,
            "unit": "iter/sec",
            "range": "stddev: 0.0012252263822878898",
            "extra": "mean: 2.9928992117644984 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 439.300669384239,
            "unit": "iter/sec",
            "range": "stddev: 0.00011051197326519732",
            "extra": "mean: 2.2763452680408722 msec\nrounds: 291"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 134.19494161802075,
            "unit": "iter/sec",
            "range": "stddev: 0.00031980952054504283",
            "extra": "mean: 7.451845710000384 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 116.57354154161746,
            "unit": "iter/sec",
            "range": "stddev: 0.0005372619829352517",
            "extra": "mean: 8.578275882979794 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 73.55090333517322,
            "unit": "iter/sec",
            "range": "stddev: 0.000609660303639253",
            "extra": "mean: 13.596026080644805 msec\nrounds: 62"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 46.34591364676102,
            "unit": "iter/sec",
            "range": "stddev: 0.011726430740309525",
            "extra": "mean: 21.576875312498817 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 30.37556231335655,
            "unit": "iter/sec",
            "range": "stddev: 0.01295063263507246",
            "extra": "mean: 32.92120125000242 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 23.035061841776095,
            "unit": "iter/sec",
            "range": "stddev: 0.02458787468503056",
            "extra": "mean: 43.412082279996866 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 117.21021517800867,
            "unit": "iter/sec",
            "range": "stddev: 0.0011887688326538918",
            "extra": "mean: 8.531679585105165 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 97.98819309229839,
            "unit": "iter/sec",
            "range": "stddev: 0.0011802128905443144",
            "extra": "mean: 10.205311154763985 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 51.13752535890581,
            "unit": "iter/sec",
            "range": "stddev: 0.0013609028601046808",
            "extra": "mean: 19.555111300000476 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 30.19627876449558,
            "unit": "iter/sec",
            "range": "stddev: 0.005624907952156107",
            "extra": "mean: 33.116663407405944 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 19.292190253325632,
            "unit": "iter/sec",
            "range": "stddev: 0.0024498010819929248",
            "extra": "mean: 51.83444631578924 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 15.691931612233255,
            "unit": "iter/sec",
            "range": "stddev: 0.007668066831190365",
            "extra": "mean: 63.72701747058412 msec\nrounds: 17"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 113.0514878059637,
            "unit": "iter/sec",
            "range": "stddev: 0.002135802661984695",
            "extra": "mean: 8.8455271081116 msec\nrounds: 37"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 100.24428834397597,
            "unit": "iter/sec",
            "range": "stddev: 0.0006230612064676178",
            "extra": "mean: 9.975630696969215 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 53.316957037093324,
            "unit": "iter/sec",
            "range": "stddev: 0.01039158699432431",
            "extra": "mean: 18.75575905999824 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 32.663034911719635,
            "unit": "iter/sec",
            "range": "stddev: 0.019416513078056988",
            "extra": "mean: 30.615648628572345 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 18.248391109090893,
            "unit": "iter/sec",
            "range": "stddev: 0.030384417989211425",
            "extra": "mean: 54.799351571428396 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 15.194979943306432,
            "unit": "iter/sec",
            "range": "stddev: 0.03161556040412173",
            "extra": "mean: 65.81120894736763 msec\nrounds: 19"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.6350827734034699,
            "unit": "iter/sec",
            "range": "stddev: 0.038851249124264395",
            "extra": "mean: 611.5898328000071 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 36.93079490092688,
            "unit": "iter/sec",
            "range": "stddev: 0.024912160451704964",
            "extra": "mean: 27.077673326086526 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6703506117925453,
            "unit": "iter/sec",
            "range": "stddev: 0.06727684582985545",
            "extra": "mean: 1.491756675399995 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.694799041522431,
            "unit": "iter/sec",
            "range": "stddev: 0.047982091766014805",
            "extra": "mean: 73.02042161904053 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 6.902917670983559,
            "unit": "iter/sec",
            "range": "stddev: 0.0038100940547580913",
            "extra": "mean: 144.86627940001426 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 4.326357306281979,
            "unit": "iter/sec",
            "range": "stddev: 0.012670070922241499",
            "extra": "mean: 231.14133420001508 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 145.67015910157846,
            "unit": "iter/sec",
            "range": "stddev: 0.0006185525821461466",
            "extra": "mean: 6.864823970588799 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 108.35328327960536,
            "unit": "iter/sec",
            "range": "stddev: 0.0006943120639907678",
            "extra": "mean: 9.229069666670853 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 195.99017972973544,
            "unit": "iter/sec",
            "range": "stddev: 0.0005625669112904051",
            "extra": "mean: 5.102296458827528 msec\nrounds: 85"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 187.1695772009401,
            "unit": "iter/sec",
            "range": "stddev: 0.00040874841401580017",
            "extra": "mean: 5.342748618416911 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 441.1386174977845,
            "unit": "iter/sec",
            "range": "stddev: 0.00008127211902349351",
            "extra": "mean: 2.2668611641215524 msec\nrounds: 262"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 492.4643154297184,
            "unit": "iter/sec",
            "range": "stddev: 0.004462101570374504",
            "extra": "mean: 2.030603982193943 msec\nrounds: 337"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 532.7969254762388,
            "unit": "iter/sec",
            "range": "stddev: 0.00021381212034333785",
            "extra": "mean: 1.8768877074621877 msec\nrounds: 335"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 40.134198485387394,
            "unit": "iter/sec",
            "range": "stddev: 0.0011771144265524062",
            "extra": "mean: 24.916406399995594 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 185.9609818775343,
            "unit": "iter/sec",
            "range": "stddev: 0.0004695337976789282",
            "extra": "mean: 5.377472144444559 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 182.4968335261223,
            "unit": "iter/sec",
            "range": "stddev: 0.0005136992803556794",
            "extra": "mean: 5.479547127905985 msec\nrounds: 86"
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
          "id": "f5d4c57e2be4fe84f26a65230901f6269db41437",
          "message": "Merge pull request #140 from developmentseed/nullfix\n\nadd fix for using is null",
          "timestamp": "2023-11-15T16:51:20+01:00",
          "tree_id": "dff5b35fca98c934000533631f3ab4cfd15a95d3",
          "url": "https://github.com/developmentseed/tipg/commit/f5d4c57e2be4fe84f26a65230901f6269db41437"
        },
        "date": 1700063832981,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 234.19558862359992,
            "unit": "iter/sec",
            "range": "stddev: 0.0007096140451321241",
            "extra": "mean: 4.269935253166548 msec\nrounds: 158"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 145.26760205974784,
            "unit": "iter/sec",
            "range": "stddev: 0.001110479401059739",
            "extra": "mean: 6.883847367348329 msec\nrounds: 147"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 243.2225315545225,
            "unit": "iter/sec",
            "range": "stddev: 0.0006439897350665763",
            "extra": "mean: 4.111461194029357 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 143.23781833345964,
            "unit": "iter/sec",
            "range": "stddev: 0.0009532839027454591",
            "extra": "mean: 6.98139647500066 msec\nrounds: 120"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 304.8818598037252,
            "unit": "iter/sec",
            "range": "stddev: 0.0005417464543250425",
            "extra": "mean: 3.279959000000109 msec\nrounds: 239"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 283.12505480370027,
            "unit": "iter/sec",
            "range": "stddev: 0.0008778816292424868",
            "extra": "mean: 3.5320081463413127 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 298.2872240037227,
            "unit": "iter/sec",
            "range": "stddev: 0.0013712089721707593",
            "extra": "mean: 3.3524734535312173 msec\nrounds: 269"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 103.12735570809903,
            "unit": "iter/sec",
            "range": "stddev: 0.002123457622727346",
            "extra": "mean: 9.696748191920001 msec\nrounds: 99"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 94.9247498818027,
            "unit": "iter/sec",
            "range": "stddev: 0.001524495810003594",
            "extra": "mean: 10.534660362499437 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 63.31610471746825,
            "unit": "iter/sec",
            "range": "stddev: 0.008367569883390633",
            "extra": "mean: 15.793770075753104 msec\nrounds: 66"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 44.15354782969055,
            "unit": "iter/sec",
            "range": "stddev: 0.0029359979658351355",
            "extra": "mean: 22.648236645834412 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 25.4908716091016,
            "unit": "iter/sec",
            "range": "stddev: 0.016401326292430587",
            "extra": "mean: 39.22972958064513 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 23.207172858548542,
            "unit": "iter/sec",
            "range": "stddev: 0.019369897646956673",
            "extra": "mean: 43.09012588888621 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 93.70515426254825,
            "unit": "iter/sec",
            "range": "stddev: 0.0020338046274040126",
            "extra": "mean: 10.671771556964146 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 75.1566828193599,
            "unit": "iter/sec",
            "range": "stddev: 0.001912450490465613",
            "extra": "mean: 13.305536679998417 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 40.459923805882276,
            "unit": "iter/sec",
            "range": "stddev: 0.003156650371882264",
            "extra": "mean: 24.71581520513429 msec\nrounds: 39"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 24.99863804919744,
            "unit": "iter/sec",
            "range": "stddev: 0.0037182253741879384",
            "extra": "mean: 40.00217924000481 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 14.402675685305299,
            "unit": "iter/sec",
            "range": "stddev: 0.0033780917877960026",
            "extra": "mean: 69.4315432666637 msec\nrounds: 15"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 11.640403522574845,
            "unit": "iter/sec",
            "range": "stddev: 0.00479146804929302",
            "extra": "mean: 85.90767476923352 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 88.79897630767107,
            "unit": "iter/sec",
            "range": "stddev: 0.0017370165450902482",
            "extra": "mean: 11.261391083329563 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 78.15054847258315,
            "unit": "iter/sec",
            "range": "stddev: 0.0021369176246238825",
            "extra": "mean: 12.795815506666864 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 44.43790618832984,
            "unit": "iter/sec",
            "range": "stddev: 0.01246089175283311",
            "extra": "mean: 22.503310479165133 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 26.751163186241005,
            "unit": "iter/sec",
            "range": "stddev: 0.025575509296598953",
            "extra": "mean: 37.38155208571762 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 16.97621638489322,
            "unit": "iter/sec",
            "range": "stddev: 0.030431974673749224",
            "extra": "mean: 58.90594095453914 msec\nrounds: 22"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 13.523342658667882,
            "unit": "iter/sec",
            "range": "stddev: 0.038663264296602204",
            "extra": "mean: 73.94621472221905 msec\nrounds: 18"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 1.5802754418830738,
            "unit": "iter/sec",
            "range": "stddev: 0.060688746543796704",
            "extra": "mean: 632.8010760000097 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 29.65758319603349,
            "unit": "iter/sec",
            "range": "stddev: 0.03124534376208584",
            "extra": "mean: 33.71818915216745 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.6456399086018754,
            "unit": "iter/sec",
            "range": "stddev: 0.09076728056696547",
            "extra": "mean: 1.548850971999991 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 13.518558702254527,
            "unit": "iter/sec",
            "range": "stddev: 0.052929330747369406",
            "extra": "mean: 73.97238285714788 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 5.763190322904954,
            "unit": "iter/sec",
            "range": "stddev: 0.01208561364578674",
            "extra": "mean: 173.51500539998597 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 3.7462575149667914,
            "unit": "iter/sec",
            "range": "stddev: 0.017930390889685347",
            "extra": "mean: 266.93306479996863 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 86.41023099894556,
            "unit": "iter/sec",
            "range": "stddev: 0.0032103252880456234",
            "extra": "mean: 11.572703700007498 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 61.93057139236294,
            "unit": "iter/sec",
            "range": "stddev: 0.015458616069852672",
            "extra": "mean: 16.147114058813873 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 102.60389826951581,
            "unit": "iter/sec",
            "range": "stddev: 0.0031372282494998255",
            "extra": "mean: 9.746218388050325 msec\nrounds: 67"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 110.13926008037951,
            "unit": "iter/sec",
            "range": "stddev: 0.002769751510082749",
            "extra": "mean: 9.079414545460002 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 284.879652097171,
            "unit": "iter/sec",
            "range": "stddev: 0.0015284162720615405",
            "extra": "mean: 3.5102542166083 msec\nrounds: 277"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 399.9397056262399,
            "unit": "iter/sec",
            "range": "stddev: 0.0013881513886409484",
            "extra": "mean: 2.500376896647869 msec\nrounds: 358"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 382.022420299441,
            "unit": "iter/sec",
            "range": "stddev: 0.0015673098671692876",
            "extra": "mean: 2.617647412463826 msec\nrounds: 337"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 36.054068267125345,
            "unit": "iter/sec",
            "range": "stddev: 0.0006502642671058779",
            "extra": "mean: 27.73612100002083 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 141.9559763943754,
            "unit": "iter/sec",
            "range": "stddev: 0.0019845069146193083",
            "extra": "mean: 7.044437475614603 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 135.023357229028,
            "unit": "iter/sec",
            "range": "stddev: 0.0018019594767435098",
            "extra": "mean: 7.4061260253201215 msec\nrounds: 79"
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
          "id": "a849919901ff6a23cb48fc30f97e0777bef1f195",
          "message": "Bump version: 0.5.0 → 0.5.1",
          "timestamp": "2023-11-15T16:53:38+01:00",
          "tree_id": "3b5c531215c1d410c180459ac5660aeb33a047bb",
          "url": "https://github.com/developmentseed/tipg/commit/a849919901ff6a23cb48fc30f97e0777bef1f195"
        },
        "date": 1700063967578,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 382.806278197355,
            "unit": "iter/sec",
            "range": "stddev: 0.0001423069510272549",
            "extra": "mean: 2.6122873551317567 msec\nrounds: 214"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 232.95078343010547,
            "unit": "iter/sec",
            "range": "stddev: 0.00013359126803253658",
            "extra": "mean: 4.292752251249843 msec\nrounds: 199"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 373.54754707926065,
            "unit": "iter/sec",
            "range": "stddev: 0.00015596683171788955",
            "extra": "mean: 2.6770353809546408 msec\nrounds: 84"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 224.10947920908686,
            "unit": "iter/sec",
            "range": "stddev: 0.00018306927755248374",
            "extra": "mean: 4.462104876282509 msec\nrounds: 194"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 487.6460509988866,
            "unit": "iter/sec",
            "range": "stddev: 0.0004264257342418436",
            "extra": "mean: 2.0506676880733794 msec\nrounds: 327"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 461.91043883417757,
            "unit": "iter/sec",
            "range": "stddev: 0.0002239025298015566",
            "extra": "mean: 2.164921846156832 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 562.1405676843289,
            "unit": "iter/sec",
            "range": "stddev: 0.00011701578249821452",
            "extra": "mean: 1.7789144877399277 msec\nrounds: 367"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 166.69630197648746,
            "unit": "iter/sec",
            "range": "stddev: 0.00023539458810225463",
            "extra": "mean: 5.998933318515069 msec\nrounds: 135"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 145.5298772371822,
            "unit": "iter/sec",
            "range": "stddev: 0.0004712269409230203",
            "extra": "mean: 6.8714412393148425 msec\nrounds: 117"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 87.17064881168929,
            "unit": "iter/sec",
            "range": "stddev: 0.006029585731316838",
            "extra": "mean: 11.471751256093706 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 67.07399181551307,
            "unit": "iter/sec",
            "range": "stddev: 0.00021865853402424173",
            "extra": "mean: 14.908908400002474 msec\nrounds: 60"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 37.29118745975828,
            "unit": "iter/sec",
            "range": "stddev: 0.010906842720268787",
            "extra": "mean: 26.81598704999999 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 31.58277246262352,
            "unit": "iter/sec",
            "range": "stddev: 0.011528304239487306",
            "extra": "mean: 31.66283141175922 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 161.28744182825056,
            "unit": "iter/sec",
            "range": "stddev: 0.0002666653412337647",
            "extra": "mean: 6.200110738099904 msec\nrounds: 126"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 128.89482784275992,
            "unit": "iter/sec",
            "range": "stddev: 0.00028026798092749906",
            "extra": "mean: 7.75826320370209 msec\nrounds: 108"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 68.75859268861592,
            "unit": "iter/sec",
            "range": "stddev: 0.0005538695478454092",
            "extra": "mean: 14.543636815381852 msec\nrounds: 65"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 42.99420804143516,
            "unit": "iter/sec",
            "range": "stddev: 0.0005336066906901252",
            "extra": "mean: 23.258946857126936 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 23.873068985401076,
            "unit": "iter/sec",
            "range": "stddev: 0.009899488944567011",
            "extra": "mean: 41.88820467998994 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 20.838918514939927,
            "unit": "iter/sec",
            "range": "stddev: 0.0005850598146163452",
            "extra": "mean: 47.98713519048869 msec\nrounds: 21"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 148.6623167129659,
            "unit": "iter/sec",
            "range": "stddev: 0.0010745775185470976",
            "extra": "mean: 6.726654219514009 msec\nrounds: 41"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 126.8054822318386,
            "unit": "iter/sec",
            "range": "stddev: 0.00028811483408544157",
            "extra": "mean: 7.886094373835502 msec\nrounds: 107"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 68.35094780479139,
            "unit": "iter/sec",
            "range": "stddev: 0.006595283227284339",
            "extra": "mean: 14.630375029414006 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 40.35907543109377,
            "unit": "iter/sec",
            "range": "stddev: 0.014847249019205706",
            "extra": "mean: 24.777574543483514 msec\nrounds: 46"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 22.418734439622483,
            "unit": "iter/sec",
            "range": "stddev: 0.022887827676313827",
            "extra": "mean: 44.60555089285582 msec\nrounds: 28"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 19.37105701468562,
            "unit": "iter/sec",
            "range": "stddev: 0.022983864761737482",
            "extra": "mean: 51.623409050000646 msec\nrounds: 20"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.272016326803971,
            "unit": "iter/sec",
            "range": "stddev: 0.007066257496891757",
            "extra": "mean: 440.13768219997473 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 48.450585526839,
            "unit": "iter/sec",
            "range": "stddev: 0.017758495730921527",
            "extra": "mean: 20.639585448271912 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 0.8764594498627782,
            "unit": "iter/sec",
            "range": "stddev: 0.05506706220985974",
            "extra": "mean: 1.1409540967999874 sec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 18.718676673420536,
            "unit": "iter/sec",
            "range": "stddev: 0.03231175443588404",
            "extra": "mean: 53.42257988888411 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 8.822666783305488,
            "unit": "iter/sec",
            "range": "stddev: 0.003759629063835979",
            "extra": "mean: 113.34441439998955 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 5.287075421831119,
            "unit": "iter/sec",
            "range": "stddev: 0.00867832470845651",
            "extra": "mean: 189.14048320000347 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 193.20459780570806,
            "unit": "iter/sec",
            "range": "stddev: 0.000290711798510228",
            "extra": "mean: 5.1758602608703335 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 130.49229512522413,
            "unit": "iter/sec",
            "range": "stddev: 0.0002557798865398671",
            "extra": "mean: 7.663287698636701 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 248.87228236910036,
            "unit": "iter/sec",
            "range": "stddev: 0.00028613367241870843",
            "extra": "mean: 4.018125242717502 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 229.16800045602122,
            "unit": "iter/sec",
            "range": "stddev: 0.00013245019878651518",
            "extra": "mean: 4.363610966671179 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 532.0732591561483,
            "unit": "iter/sec",
            "range": "stddev: 0.00011424170606726235",
            "extra": "mean: 1.8794404394349173 msec\nrounds: 355"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 703.5823068657693,
            "unit": "iter/sec",
            "range": "stddev: 0.00016375257865859568",
            "extra": "mean: 1.4212978215081549 msec\nrounds: 465"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 646.7638906843715,
            "unit": "iter/sec",
            "range": "stddev: 0.0027417802610439296",
            "extra": "mean: 1.5461592930642007 msec\nrounds: 447"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 50.66683328617669,
            "unit": "iter/sec",
            "range": "stddev: 0.00014957839506358995",
            "extra": "mean: 19.736777200023425 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 229.32430153927305,
            "unit": "iter/sec",
            "range": "stddev: 0.0002401936714849597",
            "extra": "mean: 4.360636850468046 msec\nrounds: 107"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 222.29711069893008,
            "unit": "iter/sec",
            "range": "stddev: 0.00007944567290429753",
            "extra": "mean: 4.498484019229374 msec\nrounds: 104"
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
          "id": "76956abaca663aa2aba13a399f5490481cbdab84",
          "message": "Merge pull request #143 from hrodmn/extents-optional\n\nmake calculating spatial/datetime extents optional",
          "timestamp": "2023-11-28T12:22:14+01:00",
          "tree_id": "a48b90acaccec71d475c081fb50396f70dd0b164",
          "url": "https://github.com/developmentseed/tipg/commit/76956abaca663aa2aba13a399f5490481cbdab84"
        },
        "date": 1701170846126,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 437.36004349553735,
            "unit": "iter/sec",
            "range": "stddev: 0.00011080690173811668",
            "extra": "mean: 2.2864457210303066 msec\nrounds: 233"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 260.64512188771465,
            "unit": "iter/sec",
            "range": "stddev: 0.0002968330150865635",
            "extra": "mean: 3.836634243363272 msec\nrounds: 226"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 422.1014153400645,
            "unit": "iter/sec",
            "range": "stddev: 0.00043156897608188146",
            "extra": "mean: 2.369098902912594 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 258.7334447788722,
            "unit": "iter/sec",
            "range": "stddev: 0.00022471444347124187",
            "extra": "mean: 3.864981586955853 msec\nrounds: 230"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 571.0508881605241,
            "unit": "iter/sec",
            "range": "stddev: 0.00025662693373450403",
            "extra": "mean: 1.7511574200001894 msec\nrounds: 350"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 540.8202516043875,
            "unit": "iter/sec",
            "range": "stddev: 0.00011101146281807812",
            "extra": "mean: 1.8490431840032215 msec\nrounds: 125"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 642.0685692060706,
            "unit": "iter/sec",
            "range": "stddev: 0.00008078517826884528",
            "extra": "mean: 1.5574660526312913 msec\nrounds: 399"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 203.56963766313788,
            "unit": "iter/sec",
            "range": "stddev: 0.000165913488217064",
            "extra": "mean: 4.912323917650116 msec\nrounds: 170"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 182.70935925687922,
            "unit": "iter/sec",
            "range": "stddev: 0.00031428238113862526",
            "extra": "mean: 5.473173372547684 msec\nrounds: 153"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 107.15078986286188,
            "unit": "iter/sec",
            "range": "stddev: 0.004907177674848777",
            "extra": "mean: 9.332642356438631 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 78.04496618793475,
            "unit": "iter/sec",
            "range": "stddev: 0.00573368043433692",
            "extra": "mean: 12.813126186664855 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 47.70378762966075,
            "unit": "iter/sec",
            "range": "stddev: 0.00903663725247838",
            "extra": "mean: 20.96269603921829 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 39.530511883042266,
            "unit": "iter/sec",
            "range": "stddev: 0.010124084985763988",
            "extra": "mean: 25.296915024998157 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 199.5593191423578,
            "unit": "iter/sec",
            "range": "stddev: 0.00013799073556076285",
            "extra": "mean: 5.01104134999899 msec\nrounds: 160"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 145.33519027561132,
            "unit": "iter/sec",
            "range": "stddev: 0.0003787560572182384",
            "extra": "mean: 6.880646030074451 msec\nrounds: 133"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 82.64664685243574,
            "unit": "iter/sec",
            "range": "stddev: 0.0005165972672350386",
            "extra": "mean: 12.099704441554465 msec\nrounds: 77"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 45.289850359120926,
            "unit": "iter/sec",
            "range": "stddev: 0.0010316156301392525",
            "extra": "mean: 22.080002297879307 msec\nrounds: 47"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 26.25715873534627,
            "unit": "iter/sec",
            "range": "stddev: 0.0024495535873021237",
            "extra": "mean: 38.08485183333422 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 24.07963804366603,
            "unit": "iter/sec",
            "range": "stddev: 0.0027914028766460545",
            "extra": "mean: 41.52886343999853 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 188.1760959708611,
            "unit": "iter/sec",
            "range": "stddev: 0.0001938312371030836",
            "extra": "mean: 5.314171254540477 msec\nrounds: 55"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 151.47749297202267,
            "unit": "iter/sec",
            "range": "stddev: 0.004144444767195917",
            "extra": "mean: 6.6016408139570695 msec\nrounds: 129"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 85.91273501015905,
            "unit": "iter/sec",
            "range": "stddev: 0.006367270043649123",
            "extra": "mean: 11.639717905404263 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 51.22597680408626,
            "unit": "iter/sec",
            "range": "stddev: 0.01283788426036565",
            "extra": "mean: 19.52134566070843 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 28.652406822230613,
            "unit": "iter/sec",
            "range": "stddev: 0.020248881356368733",
            "extra": "mean: 34.90108199999895 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 22.842062170925985,
            "unit": "iter/sec",
            "range": "stddev: 0.024080805075948963",
            "extra": "mean: 43.77888443333404 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.7829238631831106,
            "unit": "iter/sec",
            "range": "stddev: 0.008039696662181859",
            "extra": "mean: 359.33430060001683 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 57.272200276481534,
            "unit": "iter/sec",
            "range": "stddev: 0.017038588391705953",
            "extra": "mean: 17.460478123286695 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 1.0700909433031949,
            "unit": "iter/sec",
            "range": "stddev: 0.04603929406306228",
            "extra": "mean: 934.5000126000173 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 22.968334298870985,
            "unit": "iter/sec",
            "range": "stddev: 0.03111503208210472",
            "extra": "mean: 43.53820294444056 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 2.6694504490852764,
            "unit": "iter/sec",
            "range": "stddev: 1.0022086408731061",
            "extra": "mean: 374.6089388333331 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 6.865664079997288,
            "unit": "iter/sec",
            "range": "stddev: 0.0070586681244644185",
            "extra": "mean: 145.6523343333155 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 230.25471019710434,
            "unit": "iter/sec",
            "range": "stddev: 0.00010842130164619543",
            "extra": "mean: 4.343016475728 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 163.13860460485148,
            "unit": "iter/sec",
            "range": "stddev: 0.00012399056033946868",
            "extra": "mean: 6.129756978258851 msec\nrounds: 92"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 316.0901609853901,
            "unit": "iter/sec",
            "range": "stddev: 0.0000629162091013092",
            "extra": "mean: 3.1636543095253775 msec\nrounds: 126"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 284.9526298688193,
            "unit": "iter/sec",
            "range": "stddev: 0.00009090292013838987",
            "extra": "mean: 3.5093552232185385 msec\nrounds: 112"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 655.8112001328196,
            "unit": "iter/sec",
            "range": "stddev: 0.00009042096950624519",
            "extra": "mean: 1.5248290968459715 msec\nrounds: 444"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 828.4738632284487,
            "unit": "iter/sec",
            "range": "stddev: 0.0022997731241019906",
            "extra": "mean: 1.2070386820691452 msec\nrounds: 541"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 886.3171288876208,
            "unit": "iter/sec",
            "range": "stddev: 0.00007125454850494415",
            "extra": "mean: 1.128264328203899 msec\nrounds: 585"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 64.11648395558406,
            "unit": "iter/sec",
            "range": "stddev: 0.00016702066706758637",
            "extra": "mean: 15.596613200011689 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 284.7909867052577,
            "unit": "iter/sec",
            "range": "stddev: 0.00004575984558862273",
            "extra": "mean: 3.511347081482402 msec\nrounds: 135"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 268.414174710928,
            "unit": "iter/sec",
            "range": "stddev: 0.0003285819872133372",
            "extra": "mean: 3.725585659091821 msec\nrounds: 132"
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
          "id": "a575d7f4861ee29aed63da3fa303146c44e707ab",
          "message": "Bump version: 0.5.1 → 0.5.2",
          "timestamp": "2023-11-28T12:31:45+01:00",
          "tree_id": "01ea782f867df0b738cb75f97cc026d1a0261d9e",
          "url": "https://github.com/developmentseed/tipg/commit/a575d7f4861ee29aed63da3fa303146c44e707ab"
        },
        "date": 1701171412331,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 458.0449024274386,
            "unit": "iter/sec",
            "range": "stddev: 0.00010918640874740576",
            "extra": "mean: 2.1831920728741556 msec\nrounds: 247"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 277.12070622952837,
            "unit": "iter/sec",
            "range": "stddev: 0.00010947682505751163",
            "extra": "mean: 3.608535838428972 msec\nrounds: 229"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 446.3699662093272,
            "unit": "iter/sec",
            "range": "stddev: 0.0001250171685975216",
            "extra": "mean: 2.240294096155756 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 265.874493002194,
            "unit": "iter/sec",
            "range": "stddev: 0.00016707792090581752",
            "extra": "mean: 3.7611731336399687 msec\nrounds: 217"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 594.308273319994,
            "unit": "iter/sec",
            "range": "stddev: 0.00007278010358797539",
            "extra": "mean: 1.6826284352625342 msec\nrounds: 363"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 572.0643596710179,
            "unit": "iter/sec",
            "range": "stddev: 0.00009182438270505807",
            "extra": "mean: 1.7480550625021962 msec\nrounds: 128"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 655.5782203133098,
            "unit": "iter/sec",
            "range": "stddev: 0.00007303010484966523",
            "extra": "mean: 1.5253709916142215 msec\nrounds: 477"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 200.55961959033866,
            "unit": "iter/sec",
            "range": "stddev: 0.00018735993136506846",
            "extra": "mean: 4.986048547771437 msec\nrounds: 157"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 182.94820250484938,
            "unit": "iter/sec",
            "range": "stddev: 0.0001367093044571038",
            "extra": "mean: 5.4660280139866 msec\nrounds: 143"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 110.2371941598387,
            "unit": "iter/sec",
            "range": "stddev: 0.004384245703992375",
            "extra": "mean: 9.071348446605485 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 82.56282667007434,
            "unit": "iter/sec",
            "range": "stddev: 0.00020940021736277065",
            "extra": "mean: 12.111988413333469 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 46.718988730461945,
            "unit": "iter/sec",
            "range": "stddev: 0.009302286803722656",
            "extra": "mean: 21.404572897956907 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 37.60045939668524,
            "unit": "iter/sec",
            "range": "stddev: 0.012378894884455774",
            "extra": "mean: 26.59541973809388 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 194.53521659196625,
            "unit": "iter/sec",
            "range": "stddev: 0.00022517091871336262",
            "extra": "mean: 5.140457432432299 msec\nrounds: 148"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 143.37321354443745,
            "unit": "iter/sec",
            "range": "stddev: 0.00031243240202121115",
            "extra": "mean: 6.974803558337328 msec\nrounds: 120"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 80.97992615013335,
            "unit": "iter/sec",
            "range": "stddev: 0.00047723860909878687",
            "extra": "mean: 12.348739342464235 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 48.85082730626285,
            "unit": "iter/sec",
            "range": "stddev: 0.001386674871887685",
            "extra": "mean: 20.47048238775265 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 28.294564473959205,
            "unit": "iter/sec",
            "range": "stddev: 0.0031514065088821272",
            "extra": "mean: 35.34247720689768 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 24.473946518680194,
            "unit": "iter/sec",
            "range": "stddev: 0.0024308490863622642",
            "extra": "mean: 40.859777119997034 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 193.78952131830897,
            "unit": "iter/sec",
            "range": "stddev: 0.00017057117079702992",
            "extra": "mean: 5.160237732139551 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 151.05860670242495,
            "unit": "iter/sec",
            "range": "stddev: 0.00039880752340590026",
            "extra": "mean: 6.619947196851426 msec\nrounds: 127"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 69.53872834919254,
            "unit": "iter/sec",
            "range": "stddev: 0.01029585023027358",
            "extra": "mean: 14.38047579729162 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 43.190919494094324,
            "unit": "iter/sec",
            "range": "stddev: 0.01763297255638058",
            "extra": "mean: 23.15301483999974 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 25.800014915228143,
            "unit": "iter/sec",
            "range": "stddev: 0.025381373271567163",
            "extra": "mean: 38.759667515144045 msec\nrounds: 33"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 21.27914380896533,
            "unit": "iter/sec",
            "range": "stddev: 0.025864003327739863",
            "extra": "mean: 46.99437199999936 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.7761819559002903,
            "unit": "iter/sec",
            "range": "stddev: 0.02511816561376896",
            "extra": "mean: 360.20693740000524 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 58.66444635704361,
            "unit": "iter/sec",
            "range": "stddev: 0.016442221537231867",
            "extra": "mean: 17.04609967532633 msec\nrounds: 77"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 1.0938432776905906,
            "unit": "iter/sec",
            "range": "stddev: 0.05387222248069638",
            "extra": "mean: 914.2077484000083 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 23.146352225708732,
            "unit": "iter/sec",
            "range": "stddev: 0.028758614854600326",
            "extra": "mean: 43.203351882345274 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 12.274425726216633,
            "unit": "iter/sec",
            "range": "stddev: 0.005435479451426277",
            "extra": "mean: 81.47020661537961 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 6.599705874867952,
            "unit": "iter/sec",
            "range": "stddev: 0.007177347862071177",
            "extra": "mean: 151.52190400000336 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 224.52168736658487,
            "unit": "iter/sec",
            "range": "stddev: 0.00026495069841626136",
            "extra": "mean: 4.45391272321619 msec\nrounds: 112"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 159.8986367654484,
            "unit": "iter/sec",
            "range": "stddev: 0.00026312300611504503",
            "extra": "mean: 6.253962011363967 msec\nrounds: 88"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 293.97201901668944,
            "unit": "iter/sec",
            "range": "stddev: 0.00013997175378123008",
            "extra": "mean: 3.4016842941206176 msec\nrounds: 119"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 285.1357497218763,
            "unit": "iter/sec",
            "range": "stddev: 0.00011184787339643658",
            "extra": "mean: 3.5071014454532894 msec\nrounds: 110"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 596.9966162249265,
            "unit": "iter/sec",
            "range": "stddev: 0.0037606408661245293",
            "extra": "mean: 1.6750513701793524 msec\nrounds: 389"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 931.7453152208391,
            "unit": "iter/sec",
            "range": "stddev: 0.000052139424769584425",
            "extra": "mean: 1.0732546583966278 msec\nrounds: 524"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 914.4357725391797,
            "unit": "iter/sec",
            "range": "stddev: 0.00005602300514662616",
            "extra": "mean: 1.0935705164106035 msec\nrounds: 579"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 60.154392263204635,
            "unit": "iter/sec",
            "range": "stddev: 0.00023908781755158505",
            "extra": "mean: 16.623889999993935 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 273.12115536697524,
            "unit": "iter/sec",
            "range": "stddev: 0.00018164309509855479",
            "extra": "mean: 3.661378770371576 msec\nrounds: 135"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 267.32651452053614,
            "unit": "iter/sec",
            "range": "stddev: 0.00022040136568244231",
            "extra": "mean: 3.740743793385222 msec\nrounds: 121"
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
          "id": "02d9211af4b4f128ca5b802c8938d262bd8696cd",
          "message": "Merge pull request #145 from developmentseed/patch/allow-postgres-date-type\n\npatch: allow postgres date type",
          "timestamp": "2023-11-29T10:53:10+01:00",
          "tree_id": "8558710b896f8291847acb3ec6ceba41374b1951",
          "url": "https://github.com/developmentseed/tipg/commit/02d9211af4b4f128ca5b802c8938d262bd8696cd"
        },
        "date": 1701251872615,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 446.3991717999409,
            "unit": "iter/sec",
            "range": "stddev: 0.0000658446374091126",
            "extra": "mean: 2.240147525291919 msec\nrounds: 257"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 267.10819936339084,
            "unit": "iter/sec",
            "range": "stddev: 0.00011493977620021064",
            "extra": "mean: 3.7438012100839213 msec\nrounds: 238"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 448.9423983335552,
            "unit": "iter/sec",
            "range": "stddev: 0.00010301589694702737",
            "extra": "mean: 2.227457249998963 msec\nrounds: 100"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 257.9047957857,
            "unit": "iter/sec",
            "range": "stddev: 0.0001716352175930695",
            "extra": "mean: 3.877399786047122 msec\nrounds: 215"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 589.6936531025995,
            "unit": "iter/sec",
            "range": "stddev: 0.00012579375758035023",
            "extra": "mean: 1.6957957657143246 msec\nrounds: 350"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 531.9354048015432,
            "unit": "iter/sec",
            "range": "stddev: 0.0001283854640178445",
            "extra": "mean: 1.879927508064789 msec\nrounds: 124"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 698.7443636186025,
            "unit": "iter/sec",
            "range": "stddev: 0.00005283370889611801",
            "extra": "mean: 1.4311385566264585 msec\nrounds: 415"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 214.98133975640405,
            "unit": "iter/sec",
            "range": "stddev: 0.00008306385648232228",
            "extra": "mean: 4.651566508670486 msec\nrounds: 173"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 169.70517276815312,
            "unit": "iter/sec",
            "range": "stddev: 0.0038483651358327134",
            "extra": "mean: 5.89257229870167 msec\nrounds: 154"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 115.90002175266146,
            "unit": "iter/sec",
            "range": "stddev: 0.00008630963316737728",
            "extra": "mean: 8.628126076922298 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 81.26510845343645,
            "unit": "iter/sec",
            "range": "stddev: 0.005014543007347321",
            "extra": "mean: 12.305404115383457 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 48.84570711721997,
            "unit": "iter/sec",
            "range": "stddev: 0.009082446244322475",
            "extra": "mean: 20.472628179999504 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 41.49833095145368,
            "unit": "iter/sec",
            "range": "stddev: 0.00978351862787873",
            "extra": "mean: 24.0973546904775 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 199.4639889362589,
            "unit": "iter/sec",
            "range": "stddev: 0.00012783052288604983",
            "extra": "mean: 5.013436286584853 msec\nrounds: 164"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 154.51557647508338,
            "unit": "iter/sec",
            "range": "stddev: 0.00030666165588286496",
            "extra": "mean: 6.471839427536656 msec\nrounds: 138"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 80.96999647437832,
            "unit": "iter/sec",
            "range": "stddev: 0.00101825739188042",
            "extra": "mean: 12.350253717948899 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 48.53827697448815,
            "unit": "iter/sec",
            "range": "stddev: 0.0016916015085104718",
            "extra": "mean: 20.60229703921305 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.112875448169238,
            "unit": "iter/sec",
            "range": "stddev: 0.008605099261110956",
            "extra": "mean: 39.82021103333675 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 23.849661204085134,
            "unit": "iter/sec",
            "range": "stddev: 0.0030853441296837566",
            "extra": "mean: 41.92931679166634 msec\nrounds: 24"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 197.78819018861535,
            "unit": "iter/sec",
            "range": "stddev: 0.00016100739520228573",
            "extra": "mean: 5.055913596491161 msec\nrounds: 57"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 158.39461950644903,
            "unit": "iter/sec",
            "range": "stddev: 0.0002544193398271572",
            "extra": "mean: 6.313345763359626 msec\nrounds: 131"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 89.59700256937923,
            "unit": "iter/sec",
            "range": "stddev: 0.005459272902010412",
            "extra": "mean: 11.161087662789305 msec\nrounds: 86"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 53.61894352318782,
            "unit": "iter/sec",
            "range": "stddev: 0.012199514873105183",
            "extra": "mean: 18.65012501724403 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 28.931400984167425,
            "unit": "iter/sec",
            "range": "stddev: 0.020229140488379687",
            "extra": "mean: 34.5645204166658 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 23.81793617225717,
            "unit": "iter/sec",
            "range": "stddev: 0.021825096158289058",
            "extra": "mean: 41.98516583333477 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.806772355256823,
            "unit": "iter/sec",
            "range": "stddev: 0.02338249312793861",
            "extra": "mean: 356.2811205999992 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 61.24045905798834,
            "unit": "iter/sec",
            "range": "stddev: 0.01504572913897825",
            "extra": "mean: 16.329074200000758 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 1.0991914475437834,
            "unit": "iter/sec",
            "range": "stddev: 0.04631333251449179",
            "extra": "mean: 909.7596258000067 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 23.577250838796267,
            "unit": "iter/sec",
            "range": "stddev: 0.027909015033623575",
            "extra": "mean: 42.41376599999964 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 12.188121201876559,
            "unit": "iter/sec",
            "range": "stddev: 0.006662528400853824",
            "extra": "mean: 82.04710007692029 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 7.038311065705665,
            "unit": "iter/sec",
            "range": "stddev: 0.006724215329916271",
            "extra": "mean: 142.07954019999534 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 234.78712832652076,
            "unit": "iter/sec",
            "range": "stddev: 0.00019331445122131496",
            "extra": "mean: 4.259177268905859 msec\nrounds: 119"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 160.90484311599081,
            "unit": "iter/sec",
            "range": "stddev: 0.0001231878157313325",
            "extra": "mean: 6.214853329673453 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 311.40560158471027,
            "unit": "iter/sec",
            "range": "stddev: 0.00010980293138498397",
            "extra": "mean: 3.2112460241919396 msec\nrounds: 124"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 275.0767559695683,
            "unit": "iter/sec",
            "range": "stddev: 0.00010854497337897819",
            "extra": "mean: 3.6353489646018287 msec\nrounds: 113"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 665.4710104453665,
            "unit": "iter/sec",
            "range": "stddev: 0.00008743959964225335",
            "extra": "mean: 1.5026950600458915 msec\nrounds: 433"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 824.4788401635739,
            "unit": "iter/sec",
            "range": "stddev: 0.0021883586642658277",
            "extra": "mean: 1.2128874038800115 msec\nrounds: 567"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 861.1365624807787,
            "unit": "iter/sec",
            "range": "stddev: 0.00007570714486754801",
            "extra": "mean: 1.1612559999997918 msec\nrounds: 569"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 63.703568236858516,
            "unit": "iter/sec",
            "range": "stddev: 0.00014814905422661003",
            "extra": "mean: 15.697707800006809 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 284.5473303140062,
            "unit": "iter/sec",
            "range": "stddev: 0.00009076759014144651",
            "extra": "mean: 3.5143538296299286 msec\nrounds: 135"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 277.9992071162712,
            "unit": "iter/sec",
            "range": "stddev: 0.00005916234714721183",
            "extra": "mean: 3.597132561539131 msec\nrounds: 130"
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
          "id": "2ac83aeef52b7ab83b4eb05121fd273d554e3076",
          "message": "Bump version: 0.5.2 → 0.5.3",
          "timestamp": "2023-11-29T10:55:09+01:00",
          "tree_id": "9f083fb4cbafa9ff6993c80a00262f23fa214250",
          "url": "https://github.com/developmentseed/tipg/commit/2ac83aeef52b7ab83b4eb05121fd273d554e3076"
        },
        "date": 1701252006243,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 430.77723381953564,
            "unit": "iter/sec",
            "range": "stddev: 0.0001427593880386329",
            "extra": "mean: 2.3213854435467387 msec\nrounds: 248"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 267.0781182280883,
            "unit": "iter/sec",
            "range": "stddev: 0.00011684257650308938",
            "extra": "mean: 3.7442228761923007 msec\nrounds: 210"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 436.6146856412463,
            "unit": "iter/sec",
            "range": "stddev: 0.00010664094910025677",
            "extra": "mean: 2.2903489802028125 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 253.17379360432074,
            "unit": "iter/sec",
            "range": "stddev: 0.00028028081505039777",
            "extra": "mean: 3.949855890546381 msec\nrounds: 201"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 593.5697842107745,
            "unit": "iter/sec",
            "range": "stddev: 0.00010272167058116522",
            "extra": "mean: 1.6847218753387614 msec\nrounds: 369"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 535.9743784212369,
            "unit": "iter/sec",
            "range": "stddev: 0.00012271321393513774",
            "extra": "mean: 1.8657608278694109 msec\nrounds: 122"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 636.6612828140617,
            "unit": "iter/sec",
            "range": "stddev: 0.0001076055741431188",
            "extra": "mean: 1.5706939105515736 msec\nrounds: 436"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 196.36327058301163,
            "unit": "iter/sec",
            "range": "stddev: 0.000556792584819951",
            "extra": "mean: 5.092602078947626 msec\nrounds: 152"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 175.46451266392626,
            "unit": "iter/sec",
            "range": "stddev: 0.00021874716195718715",
            "extra": "mean: 5.699158107915173 msec\nrounds: 139"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 101.4497075946731,
            "unit": "iter/sec",
            "range": "stddev: 0.006361500469906952",
            "extra": "mean: 9.857100860214878 msec\nrounds: 93"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 82.51817815223268,
            "unit": "iter/sec",
            "range": "stddev: 0.00022857554941894565",
            "extra": "mean: 12.118541906671302 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 44.39658935071613,
            "unit": "iter/sec",
            "range": "stddev: 0.011421592159710262",
            "extra": "mean: 22.524252755102005 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 36.42404363746911,
            "unit": "iter/sec",
            "range": "stddev: 0.012578275242743398",
            "extra": "mean: 27.454392761909286 msec\nrounds: 42"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 163.54451206089215,
            "unit": "iter/sec",
            "range": "stddev: 0.005566359250402769",
            "extra": "mean: 6.114543297103558 msec\nrounds: 138"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 125.50110572580776,
            "unit": "iter/sec",
            "range": "stddev: 0.0003074596505884357",
            "extra": "mean: 7.968057286959523 msec\nrounds: 115"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 69.64994271676666,
            "unit": "iter/sec",
            "range": "stddev: 0.0009617361591813258",
            "extra": "mean: 14.357513602940445 msec\nrounds: 68"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 43.48064646570258,
            "unit": "iter/sec",
            "range": "stddev: 0.0013468196221713734",
            "extra": "mean: 22.998738088882774 msec\nrounds: 45"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 25.18601330682485,
            "unit": "iter/sec",
            "range": "stddev: 0.0037158163417560083",
            "extra": "mean: 39.70457681482373 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 21.21854821532415,
            "unit": "iter/sec",
            "range": "stddev: 0.0030635550049321414",
            "extra": "mean: 47.128577782611664 msec\nrounds: 23"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 169.24249378095777,
            "unit": "iter/sec",
            "range": "stddev: 0.0003736547842326591",
            "extra": "mean: 5.908681547166581 msec\nrounds: 53"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 116.93556110903585,
            "unit": "iter/sec",
            "range": "stddev: 0.0015299955303991928",
            "extra": "mean: 8.551718489361471 msec\nrounds: 94"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 69.87179226779635,
            "unit": "iter/sec",
            "range": "stddev: 0.009003588939974867",
            "extra": "mean: 14.311927138884862 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 40.91028653956797,
            "unit": "iter/sec",
            "range": "stddev: 0.019240306977257985",
            "extra": "mean: 24.443730039211808 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 24.21262076244538,
            "unit": "iter/sec",
            "range": "stddev: 0.028512401151250776",
            "extra": "mean: 41.30077490624373 msec\nrounds: 32"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 20.89810887618546,
            "unit": "iter/sec",
            "range": "stddev: 0.02920708127763965",
            "extra": "mean: 47.85121974072758 msec\nrounds: 27"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.458784888768435,
            "unit": "iter/sec",
            "range": "stddev: 0.020171167532252374",
            "extra": "mean: 406.7049559999873 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 52.395109782189536,
            "unit": "iter/sec",
            "range": "stddev: 0.020245601539474047",
            "extra": "mean: 19.085750638887415 msec\nrounds: 72"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 1.082642492428485,
            "unit": "iter/sec",
            "range": "stddev: 0.060819075605293406",
            "extra": "mean: 923.6659442000018 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 21.42466275390803,
            "unit": "iter/sec",
            "range": "stddev: 0.03349835283271804",
            "extra": "mean: 46.675180444443264 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 11.50519336029624,
            "unit": "iter/sec",
            "range": "stddev: 0.002172232286704629",
            "extra": "mean: 86.91727019999007 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 6.588185557709031,
            "unit": "iter/sec",
            "range": "stddev: 0.008661053502689751",
            "extra": "mean: 151.78686016666157 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 222.31135499355335,
            "unit": "iter/sec",
            "range": "stddev: 0.0002249275844316056",
            "extra": "mean: 4.4981957850466 msec\nrounds: 107"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 145.16367497302954,
            "unit": "iter/sec",
            "range": "stddev: 0.0003243057810678037",
            "extra": "mean: 6.8887757228920625 msec\nrounds: 83"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 285.4542857950102,
            "unit": "iter/sec",
            "range": "stddev: 0.00014704953442734397",
            "extra": "mean: 3.5031878999992236 msec\nrounds: 120"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 262.7481731339261,
            "unit": "iter/sec",
            "range": "stddev: 0.00012153208172375498",
            "extra": "mean: 3.8059256057711477 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 667.6300562933377,
            "unit": "iter/sec",
            "range": "stddev: 0.00008122325098724689",
            "extra": "mean: 1.4978355012234925 msec\nrounds: 409"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 850.4544667293693,
            "unit": "iter/sec",
            "range": "stddev: 0.00008835299549306776",
            "extra": "mean: 1.1758419046768542 msec\nrounds: 556"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 842.7682153341113,
            "unit": "iter/sec",
            "range": "stddev: 0.0000872608054334348",
            "extra": "mean: 1.1865658692450272 msec\nrounds: 543"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 62.480162548426755,
            "unit": "iter/sec",
            "range": "stddev: 0.000153683299068508",
            "extra": "mean: 16.005079999990812 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 274.69637461216803,
            "unit": "iter/sec",
            "range": "stddev: 0.00011565149407513787",
            "extra": "mean: 3.6403829552241334 msec\nrounds: 134"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 267.31162665496504,
            "unit": "iter/sec",
            "range": "stddev: 0.00006958704097959902",
            "extra": "mean: 3.740952133334474 msec\nrounds: 120"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "bitner@dbspatial.com",
            "name": "David Bitner",
            "username": "bitner"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c856a09ebc00dc85f60c43c50117fb28057991ac",
          "message": "Merge pull request #147 from developmentseed/sampledataloads\n\nUse multi-values inserts rather than separate inserts for data loads.",
          "timestamp": "2023-12-12T09:04:22-06:00",
          "tree_id": "260cd9620875e447c65b6ae607e9c638530c52ab",
          "url": "https://github.com/developmentseed/tipg/commit/c856a09ebc00dc85f60c43c50117fb28057991ac"
        },
        "date": 1702393777040,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 451.11688247223907,
            "unit": "iter/sec",
            "range": "stddev: 0.00007835506907661326",
            "extra": "mean: 2.2167204085108434 msec\nrounds: 235"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 275.44669214548856,
            "unit": "iter/sec",
            "range": "stddev: 0.00011639042005491921",
            "extra": "mean: 3.6304665422222926 msec\nrounds: 225"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 442.1058997535948,
            "unit": "iter/sec",
            "range": "stddev: 0.00010770005572863974",
            "extra": "mean: 2.261901504950158 msec\nrounds: 101"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 268.2110281298112,
            "unit": "iter/sec",
            "range": "stddev: 0.00017794437928591157",
            "extra": "mean: 3.7284074669592293 msec\nrounds: 227"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 626.4460787395608,
            "unit": "iter/sec",
            "range": "stddev: 0.00007028967264159233",
            "extra": "mean: 1.5963065839793387 msec\nrounds: 387"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 548.7506565041868,
            "unit": "iter/sec",
            "range": "stddev: 0.00012060080945292356",
            "extra": "mean: 1.8223212822568535 msec\nrounds: 124"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 643.3176028042922,
            "unit": "iter/sec",
            "range": "stddev: 0.00009567950856429384",
            "extra": "mean: 1.554442153674779 msec\nrounds: 449"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 195.41325373316582,
            "unit": "iter/sec",
            "range": "stddev: 0.00018549718488123523",
            "extra": "mean: 5.1173601631212104 msec\nrounds: 141"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 169.2214728702105,
            "unit": "iter/sec",
            "range": "stddev: 0.00027975517270805106",
            "extra": "mean: 5.909415531248685 msec\nrounds: 128"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 102.69938761156509,
            "unit": "iter/sec",
            "range": "stddev: 0.006393220692589393",
            "extra": "mean: 9.737156406250946 msec\nrounds: 96"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 76.69784369198476,
            "unit": "iter/sec",
            "range": "stddev: 0.0002772779190627118",
            "extra": "mean: 13.038176197181723 msec\nrounds: 71"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 42.90359395289442,
            "unit": "iter/sec",
            "range": "stddev: 0.011862036977029968",
            "extra": "mean: 23.30807067347179 msec\nrounds: 49"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 36.413191307406294,
            "unit": "iter/sec",
            "range": "stddev: 0.01397618294534741",
            "extra": "mean: 27.462575075000473 msec\nrounds: 40"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 181.54216719681364,
            "unit": "iter/sec",
            "range": "stddev: 0.00024532656019549424",
            "extra": "mean: 5.508362136692349 msec\nrounds: 139"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 143.90328028706244,
            "unit": "iter/sec",
            "range": "stddev: 0.00034905067405616305",
            "extra": "mean: 6.949111917429338 msec\nrounds: 109"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 72.96999977102881,
            "unit": "iter/sec",
            "range": "stddev: 0.0007906472472036013",
            "extra": "mean: 13.704262068492273 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 47.56216822025003,
            "unit": "iter/sec",
            "range": "stddev: 0.001538579660852751",
            "extra": "mean: 21.025113812499423 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 28.86952130860312,
            "unit": "iter/sec",
            "range": "stddev: 0.000931789422439416",
            "extra": "mean: 34.63860690000426 msec\nrounds: 30"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 21.971374859679273,
            "unit": "iter/sec",
            "range": "stddev: 0.003934791723374337",
            "extra": "mean: 45.51376535999793 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 189.27540527302082,
            "unit": "iter/sec",
            "range": "stddev: 0.0002356347229254411",
            "extra": "mean: 5.2833066111127716 msec\nrounds: 54"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 137.64554285113752,
            "unit": "iter/sec",
            "range": "stddev: 0.0004860800987251103",
            "extra": "mean: 7.265037278261102 msec\nrounds: 115"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 71.29720816861021,
            "unit": "iter/sec",
            "range": "stddev: 0.01238411808906792",
            "extra": "mean: 14.0257946374998 msec\nrounds: 80"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 46.0070617416865,
            "unit": "iter/sec",
            "range": "stddev: 0.016306430225711356",
            "extra": "mean: 21.7357936399992 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 26.39074034698652,
            "unit": "iter/sec",
            "range": "stddev: 0.024291132342821584",
            "extra": "mean: 37.89207831428598 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 20.907364614211506,
            "unit": "iter/sec",
            "range": "stddev: 0.029563699110600732",
            "extra": "mean: 47.83003589655021 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.4276305325236276,
            "unit": "iter/sec",
            "range": "stddev: 0.011260204286383147",
            "extra": "mean: 411.92429679999805 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 56.18857748058414,
            "unit": "iter/sec",
            "range": "stddev: 0.018337467236737393",
            "extra": "mean: 17.79721154794403 msec\nrounds: 73"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 1.0894067011404691,
            "unit": "iter/sec",
            "range": "stddev: 0.04277193750756119",
            "extra": "mean: 917.9308323999919 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 21.628339012947862,
            "unit": "iter/sec",
            "range": "stddev: 0.03329531910802866",
            "extra": "mean: 46.2356355428564 msec\nrounds: 35"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 11.898910926951489,
            "unit": "iter/sec",
            "range": "stddev: 0.0018371403099538442",
            "extra": "mean: 84.04130480000163 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 6.929693997256209,
            "unit": "iter/sec",
            "range": "stddev: 0.0077624856622357415",
            "extra": "mean: 144.3065163333254 msec\nrounds: 6"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 244.9958830553431,
            "unit": "iter/sec",
            "range": "stddev: 0.0001963127270453062",
            "extra": "mean: 4.081701241380068 msec\nrounds: 116"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 167.28739926307236,
            "unit": "iter/sec",
            "range": "stddev: 0.0001273650909482363",
            "extra": "mean: 5.977736544444825 msec\nrounds: 90"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 306.3714255645521,
            "unit": "iter/sec",
            "range": "stddev: 0.00017054464944322865",
            "extra": "mean: 3.264011968992523 msec\nrounds: 129"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 275.3000723894217,
            "unit": "iter/sec",
            "range": "stddev: 0.00008230694429310651",
            "extra": "mean: 3.6324000619421004 msec\nrounds: 113"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 632.4768830575055,
            "unit": "iter/sec",
            "range": "stddev: 0.00004675281467188926",
            "extra": "mean: 1.5810854543265243 msec\nrounds: 416"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 933.2791353495787,
            "unit": "iter/sec",
            "range": "stddev: 0.00006539062535279966",
            "extra": "mean: 1.0714907921148686 msec\nrounds: 558"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 916.3387523507879,
            "unit": "iter/sec",
            "range": "stddev: 0.00006169460544311746",
            "extra": "mean: 1.0912994756956271 msec\nrounds: 576"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 63.5496713700608,
            "unit": "iter/sec",
            "range": "stddev: 0.00019330962016710212",
            "extra": "mean: 15.735722599993098 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 283.78729486198796,
            "unit": "iter/sec",
            "range": "stddev: 0.00005679182113578549",
            "extra": "mean: 3.5237659264708174 msec\nrounds: 136"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 266.31264243088134,
            "unit": "iter/sec",
            "range": "stddev: 0.00040013720638054856",
            "extra": "mean: 3.754985083967764 msec\nrounds: 131"
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
          "id": "15996fb1e6aa79ffa8ccdd604d01256644a7cff9",
          "message": "Merge pull request #148 from RemcoMeeuwissen/fix-decimal-error-again\n\nFix decimal error again",
          "timestamp": "2023-12-19T12:58:08+01:00",
          "tree_id": "54821fc7c3aa4a1d13ba4267f6f6fc87b36acb88",
          "url": "https://github.com/developmentseed/tipg/commit/15996fb1e6aa79ffa8ccdd604d01256644a7cff9"
        },
        "date": 1702987365172,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 435.9514360341827,
            "unit": "iter/sec",
            "range": "stddev: 0.000060307302868804564",
            "extra": "mean: 2.2938334808503544 msec\nrounds: 235"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 281.5024580702409,
            "unit": "iter/sec",
            "range": "stddev: 0.00011974779744722718",
            "extra": "mean: 3.5523668491394793 msec\nrounds: 232"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 446.08590451185785,
            "unit": "iter/sec",
            "range": "stddev: 0.00010601229778811884",
            "extra": "mean: 2.2417206862751655 msec\nrounds: 102"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 256.91665460963566,
            "unit": "iter/sec",
            "range": "stddev: 0.00013882731625021366",
            "extra": "mean: 3.892312865117367 msec\nrounds: 215"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 586.0992672724752,
            "unit": "iter/sec",
            "range": "stddev: 0.00007551769667415097",
            "extra": "mean: 1.7061956153838764 msec\nrounds: 364"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 579.6656051034835,
            "unit": "iter/sec",
            "range": "stddev: 0.00011936382580926132",
            "extra": "mean: 1.7251325439974607 msec\nrounds: 125"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 629.7244585524945,
            "unit": "iter/sec",
            "range": "stddev: 0.00024112502770289826",
            "extra": "mean: 1.587996125001454 msec\nrounds: 424"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 198.49257222754395,
            "unit": "iter/sec",
            "range": "stddev: 0.00009084999890844366",
            "extra": "mean: 5.037971893747439 msec\nrounds: 160"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 189.46687816128255,
            "unit": "iter/sec",
            "range": "stddev: 0.00011719896272829972",
            "extra": "mean: 5.277967366669524 msec\nrounds: 150"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 110.13470645176149,
            "unit": "iter/sec",
            "range": "stddev: 0.004546654623199202",
            "extra": "mean: 9.079789942855076 msec\nrounds: 105"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 85.14850334965467,
            "unit": "iter/sec",
            "range": "stddev: 0.0001962055158944589",
            "extra": "mean: 11.744187632912231 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 47.6006784683237,
            "unit": "iter/sec",
            "range": "stddev: 0.009800930526584194",
            "extra": "mean: 21.00810392157454 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 40.09971310295935,
            "unit": "iter/sec",
            "range": "stddev: 0.011697257226506587",
            "extra": "mean: 24.937834279073687 msec\nrounds: 43"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 180.26040963054797,
            "unit": "iter/sec",
            "range": "stddev: 0.0036549491908171093",
            "extra": "mean: 5.54752983225516 msec\nrounds: 155"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 155.51121656349383,
            "unit": "iter/sec",
            "range": "stddev: 0.00034578667717687745",
            "extra": "mean: 6.4304043277271195 msec\nrounds: 119"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 81.37226588454892,
            "unit": "iter/sec",
            "range": "stddev: 0.0008300460557320898",
            "extra": "mean: 12.289199386665738 msec\nrounds: 75"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 48.87016441353051,
            "unit": "iter/sec",
            "range": "stddev: 0.0018568234599842476",
            "extra": "mean: 20.462382560004926 msec\nrounds: 50"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 28.61996038284842,
            "unit": "iter/sec",
            "range": "stddev: 0.0028061421386611036",
            "extra": "mean: 34.94064934482884 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 25.173482754321242,
            "unit": "iter/sec",
            "range": "stddev: 0.0012247566213696355",
            "extra": "mean: 39.72434047999741 msec\nrounds: 25"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 197.73714135141188,
            "unit": "iter/sec",
            "range": "stddev: 0.00016455543548886425",
            "extra": "mean: 5.057218857143449 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 162.23010774950419,
            "unit": "iter/sec",
            "range": "stddev: 0.0002427354058966823",
            "extra": "mean: 6.16408392913156 msec\nrounds: 127"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 86.46337618619724,
            "unit": "iter/sec",
            "range": "stddev: 0.006519678297792077",
            "extra": "mean: 11.565590474358983 msec\nrounds: 78"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 49.58995540294053,
            "unit": "iter/sec",
            "range": "stddev: 0.014605241957150983",
            "extra": "mean: 20.165374053566968 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 25.625001608630356,
            "unit": "iter/sec",
            "range": "stddev: 0.026595139422349673",
            "extra": "mean: 39.024387794114546 msec\nrounds: 34"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 24.17623685621419,
            "unit": "iter/sec",
            "range": "stddev: 0.02178942309200299",
            "extra": "mean: 41.36293030000502 msec\nrounds: 10"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.624053722012623,
            "unit": "iter/sec",
            "range": "stddev: 0.027355530247824753",
            "extra": "mean: 381.0897587999875 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 57.33871103702906,
            "unit": "iter/sec",
            "range": "stddev: 0.017475787943240992",
            "extra": "mean: 17.4402246216209 msec\nrounds: 74"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 1.081171786601764,
            "unit": "iter/sec",
            "range": "stddev: 0.05337065203356814",
            "extra": "mean: 924.9223965999931 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 22.89576161070418,
            "unit": "iter/sec",
            "range": "stddev: 0.03109527343044481",
            "extra": "mean: 43.676205972221595 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 11.476171439954234,
            "unit": "iter/sec",
            "range": "stddev: 0.00866264082770143",
            "extra": "mean: 87.13707400000186 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 6.8351315992707935,
            "unit": "iter/sec",
            "range": "stddev: 0.006439565078744144",
            "extra": "mean: 146.30296219997945 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 239.32044732261457,
            "unit": "iter/sec",
            "range": "stddev: 0.00008804503573708402",
            "extra": "mean: 4.1784979561397675 msec\nrounds: 114"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 166.89096061714804,
            "unit": "iter/sec",
            "range": "stddev: 0.00016010985375969594",
            "extra": "mean: 5.991936269658274 msec\nrounds: 89"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 316.03552141700504,
            "unit": "iter/sec",
            "range": "stddev: 0.00005449438900137956",
            "extra": "mean: 3.1642012755917777 msec\nrounds: 127"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 288.08644873880314,
            "unit": "iter/sec",
            "range": "stddev: 0.0001266103780287504",
            "extra": "mean: 3.471180280703385 msec\nrounds: 114"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 697.5262663682869,
            "unit": "iter/sec",
            "range": "stddev: 0.00004594191953542338",
            "extra": "mean: 1.4336377685195443 msec\nrounds: 432"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 910.7010144680078,
            "unit": "iter/sec",
            "range": "stddev: 0.0000664299094150174",
            "extra": "mean: 1.0980552169299567 msec\nrounds: 567"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 857.8695073505762,
            "unit": "iter/sec",
            "range": "stddev: 0.00007824392352964996",
            "extra": "mean: 1.1656784527618615 msec\nrounds: 561"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 62.52219537938716,
            "unit": "iter/sec",
            "range": "stddev: 0.000551966960954111",
            "extra": "mean: 15.994319999992967 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 281.37211589805355,
            "unit": "iter/sec",
            "range": "stddev: 0.00005183935046100662",
            "extra": "mean: 3.55401243939296 msec\nrounds: 132"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 273.0739501552143,
            "unit": "iter/sec",
            "range": "stddev: 0.00014549630817725084",
            "extra": "mean: 3.6620116984121096 msec\nrounds: 126"
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
          "id": "bebcd766833529c14e933e923e10cfd311e9e5d8",
          "message": "update changelog and add tests",
          "timestamp": "2023-12-19T13:04:37+01:00",
          "tree_id": "b0140daa540321a2a2d189ad1981cc125e37934b",
          "url": "https://github.com/developmentseed/tipg/commit/bebcd766833529c14e933e923e10cfd311e9e5d8"
        },
        "date": 1702987777485,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-1]",
            "value": 450.57793771032283,
            "unit": "iter/sec",
            "range": "stddev: 0.00005389416332686623",
            "extra": "mean: 2.2193718695629996 msec\nrounds: 230"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[json-10]",
            "value": 271.8001673636887,
            "unit": "iter/sec",
            "range": "stddev: 0.00008763869318132923",
            "extra": "mean: 3.6791735991167593 msec\nrounds: 227"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-1]",
            "value": 465.21132282568055,
            "unit": "iter/sec",
            "range": "stddev: 0.00010029409940509132",
            "extra": "mean: 2.1495607499964273 msec\nrounds: 104"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collections[html-10]",
            "value": 263.08163734042245,
            "unit": "iter/sec",
            "range": "stddev: 0.00015349235579792392",
            "extra": "mean: 3.8011014759879256 msec\nrounds: 229"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[json]",
            "value": 607.4123338105962,
            "unit": "iter/sec",
            "range": "stddev: 0.00011339485148012151",
            "extra": "mean: 1.6463281108016168 msec\nrounds: 361"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_collection[html]",
            "value": 573.616994525261,
            "unit": "iter/sec",
            "range": "stddev: 0.00009172269189500036",
            "extra": "mean: 1.7433235234385336 msec\nrounds: 128"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_queryables",
            "value": 628.5263719635607,
            "unit": "iter/sec",
            "range": "stddev: 0.00007240846893013688",
            "extra": "mean: 1.5910231369861692 msec\nrounds: 438"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-1]",
            "value": 199.80622867819324,
            "unit": "iter/sec",
            "range": "stddev: 0.00008839685077211488",
            "extra": "mean: 5.00484898101247 msec\nrounds: 158"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-10]",
            "value": 185.78349875343562,
            "unit": "iter/sec",
            "range": "stddev: 0.00017657827756025426",
            "extra": "mean: 5.382609363639769 msec\nrounds: 143"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-50]",
            "value": 111.55455152471748,
            "unit": "iter/sec",
            "range": "stddev: 0.004519994573625681",
            "extra": "mean: 8.964224106789825 msec\nrounds: 103"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-100]",
            "value": 83.59265611764903,
            "unit": "iter/sec",
            "range": "stddev: 0.0004600349457591224",
            "extra": "mean: 11.962773363638444 msec\nrounds: 77"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-200]",
            "value": 47.95606461698888,
            "unit": "iter/sec",
            "range": "stddev: 0.008662467633695242",
            "extra": "mean: 20.852419980386394 msec\nrounds: 51"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[geojson-250]",
            "value": 41.19286246177921,
            "unit": "iter/sec",
            "range": "stddev: 0.009289003140091501",
            "extra": "mean: 24.27605027273475 msec\nrounds: 44"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-1]",
            "value": 191.73553027335456,
            "unit": "iter/sec",
            "range": "stddev: 0.0002044194656981503",
            "extra": "mean: 5.215517429525526 msec\nrounds: 149"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-10]",
            "value": 151.7774077391798,
            "unit": "iter/sec",
            "range": "stddev: 0.00041584555770949114",
            "extra": "mean: 6.588595858208613 msec\nrounds: 134"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-50]",
            "value": 73.96137431262115,
            "unit": "iter/sec",
            "range": "stddev: 0.000783748587043167",
            "extra": "mean: 13.520570828946251 msec\nrounds: 76"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-100]",
            "value": 48.57218102099342,
            "unit": "iter/sec",
            "range": "stddev: 0.0016158408639696368",
            "extra": "mean: 20.587916354173785 msec\nrounds: 48"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-200]",
            "value": 28.61654101177704,
            "unit": "iter/sec",
            "range": "stddev: 0.002342142703157328",
            "extra": "mean: 34.94482437931452 msec\nrounds: 29"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[csv-250]",
            "value": 23.788855520302725,
            "unit": "iter/sec",
            "range": "stddev: 0.003037465863889347",
            "extra": "mean: 42.03649053846011 msec\nrounds: 26"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-1]",
            "value": 188.01190816357277,
            "unit": "iter/sec",
            "range": "stddev: 0.00014329037297035685",
            "extra": "mean: 5.318812035724818 msec\nrounds: 56"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-10]",
            "value": 159.38239749168338,
            "unit": "iter/sec",
            "range": "stddev: 0.00024030895799269917",
            "extra": "mean: 6.27421858208765 msec\nrounds: 134"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-50]",
            "value": 81.09667484366,
            "unit": "iter/sec",
            "range": "stddev: 0.007635807022878468",
            "extra": "mean: 12.330961804880689 msec\nrounds: 82"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-100]",
            "value": 48.01078706361587,
            "unit": "iter/sec",
            "range": "stddev: 0.014733538886028906",
            "extra": "mean: 20.828652500009362 msec\nrounds: 58"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-200]",
            "value": 31.182097572006374,
            "unit": "iter/sec",
            "range": "stddev: 0.016433284128585315",
            "extra": "mean: 32.069683499988365 msec\nrounds: 12"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_items[html-250]",
            "value": 23.29605350809298,
            "unit": "iter/sec",
            "range": "stddev: 0.0232027646486896",
            "extra": "mean: 42.925725580626896 msec\nrounds: 31"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-NewfoundlandandLabrador]",
            "value": 2.7346651795950248,
            "unit": "iter/sec",
            "range": "stddev: 0.030901866369906276",
            "extra": "mean: 365.6754792000129 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[geojson-Saskatchewan]",
            "value": 60.54968334631705,
            "unit": "iter/sec",
            "range": "stddev: 0.015528789547092085",
            "extra": "mean: 16.515363000008573 msec\nrounds: 79"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-NewfoundlandandLabrador]",
            "value": 1.1073743001592522,
            "unit": "iter/sec",
            "range": "stddev: 0.019826523293475642",
            "extra": "mean: 903.0370307999647 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_item[html-Saskatchewan]",
            "value": 22.67784613256113,
            "unit": "iter/sec",
            "range": "stddev: 0.03060638807829517",
            "extra": "mean: 44.0958984444377 msec\nrounds: 36"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WGS1984Quad]",
            "value": 11.587506575384534,
            "unit": "iter/sec",
            "range": "stddev: 0.007560537915872931",
            "extra": "mean: 86.29984315385943 msec\nrounds: 13"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[0/0/0-WebMercatorQuad]",
            "value": 6.978817534308477,
            "unit": "iter/sec",
            "range": "stddev: 0.006856216135834172",
            "extra": "mean: 143.29075020000346 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WGS1984Quad]",
            "value": 242.43164760882198,
            "unit": "iter/sec",
            "range": "stddev: 0.00007759814038138578",
            "extra": "mean: 4.124874000004984 msec\nrounds: 116"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[4/8/5-WebMercatorQuad]",
            "value": 161.42025501386829,
            "unit": "iter/sec",
            "range": "stddev: 0.0002515745795162676",
            "extra": "mean: 6.1950094175857044 msec\nrounds: 91"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WGS1984Quad]",
            "value": 295.9808349427319,
            "unit": "iter/sec",
            "range": "stddev: 0.00016246986369450436",
            "extra": "mean: 3.37859713178215 msec\nrounds: 129"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tile[6/33/25-WebMercatorQuad]",
            "value": 268.77410018133793,
            "unit": "iter/sec",
            "range": "stddev: 0.00012847775844592244",
            "extra": "mean: 3.7205965877118166 msec\nrounds: 114"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets]",
            "value": 653.1012394470268,
            "unit": "iter/sec",
            "range": "stddev: 0.000077329162224221",
            "extra": "mean: 1.5311561816154082 msec\nrounds: 446"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WGS1984Quad]",
            "value": 885.5913939726863,
            "unit": "iter/sec",
            "range": "stddev: 0.0000936015339646252",
            "extra": "mean: 1.1291889316065804 msec\nrounds: 541"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/tileMatrixSets/WebMercatorQuad]",
            "value": 879.7679817043255,
            "unit": "iter/sec",
            "range": "stddev: 0.00007658487612870918",
            "extra": "mean: 1.1366633257813676 msec\nrounds: 574"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles]",
            "value": 63.67330237135339,
            "unit": "iter/sec",
            "range": "stddev: 0.00024351897433529798",
            "extra": "mean: 15.705169400007435 msec\nrounds: 5"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WGS1984Quad]",
            "value": 282.73079331025355,
            "unit": "iter/sec",
            "range": "stddev: 0.00009328283469893937",
            "extra": "mean: 3.536933449278211 msec\nrounds: 138"
          },
          {
            "name": "tests/benchmarks.py::test_benchmark_tilematrixset_endpoints[/collections/public.landsat_wrs/tiles/WebMercatorQuad]",
            "value": 276.8286160785777,
            "unit": "iter/sec",
            "range": "stddev: 0.00013119248626011887",
            "extra": "mean: 3.6123433124997106 msec\nrounds: 128"
          }
        ]
      }
    ]
  }
}