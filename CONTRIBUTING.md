# Development - Contributing

Issues and pull requests are more than welcome: https://github.com/developmentseed/tipg/issues

We recommand using [`uv`](https://docs.astral.sh/uv) as project manager for development.

See https://docs.astral.sh/uv/getting-started/installation/ for installation 

**dev install**

```bash
git clone https://github.com/developmentseed/tipg.git
cd tipg

uv sync
```

You can then run the tests with the following command:

```sh
uv run pytest --cov tipg --cov-report term-missing --asyncio-mode=strict
```

and run benchmark

```sh
uv run pytest tests/benchmarks.py --benchmark-only --benchmark-columns 'min, max, mean, median' --asyncio-mode=strict
```

**pre-commit**

This repo is set to use `pre-commit` to run *isort*, *flake8*, *pydocstring*, *black* ("uncompromising Python code formatter") and mypy when committing new code.

```bash
# Install pre-commit command
uv run pre-commit install

# Setup pre-commit withing your local environment
uv run pre-commit run --all-files 
```
