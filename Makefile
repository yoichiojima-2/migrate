.PHONY: clean
clean:
	-rm poetry.lock
	-find . -name "__pycache__" -type d -print -exec rm -rf {} +
	-find . -name ".pytest_cache" -type d -print -exec rm -rf {} +
	-find . -name ".ruff_cache" -type d -print -exec rm -rf {} +
	-find . -name ".ipynb_checkpoints" -type d -print -exec rm -rf {} +

.PHONY: lint
lint:
	-isort .
	-ruff check --fix .
	-ruff format .

.PHONY: pre-commit
pre-commit: lint clean

.PHONY: venv
venv:
	python -m venv .venv
	.venv/bin/pip install --upgrade pip
	.venv/bin/pip install pytest
	.venv/bin/pip install -e data-collection
	.venv/bin/pip install -e server-side

.PHONY: test
test: venv
	.venv/bin/pytest -vvv
