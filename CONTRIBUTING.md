# Development - Contributing

Issues and pull requests are more than welcome: https://github.com/developmentseed/tifeatures/issues

**dev install**

```bash
$ git clone https://github.com/developmentseed/tifeatures.git
$ cd tifeatures
$ pip install -e .["test,dev"]
```

You can then run the tests with the following command:

```sh
python -m pytest --cov tifeatures --cov-report term-missing --asyncio-mode=strict
```

and run benchmark

```sh
python -m pytest tests/benchmarks.py --benchmark-only --benchmark-columns 'min, max, mean, median' --asyncio-mode=strict
```

**pre-commit**

This repo is set to use `pre-commit` to run *isort*, *flake8*, *pydocstring*, *black* ("uncompromising Python code formatter") and mypy when committing new code.

```bash
# Install pre-commit command
$ pip install pre-commit

# Setup pre-commit withing your local environment
$ pre-commit install
```
