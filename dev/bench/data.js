window.BENCHMARK_DATA = {
  "lastUpdate": 1690275532617,
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
      }
    ]
  }
}