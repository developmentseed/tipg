# Development - Contributing

Issues and pull requests are more than welcome: https://github.com/developmentseed/tifeatures/issues

**dev install**

```bash
$ git clone https://github.com/developmentseed/tifeatures.git
$ cd tifeatures
$ pip install -e .[dev]
```

**pre-commit**

This repo is set to use `pre-commit` to run *isort*, *flake8*, *pydocstring*, *black* ("uncompromising Python code formatter") and mypy when committing new code.

```bash
$ pre-commit install
```
