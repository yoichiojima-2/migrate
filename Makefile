ROOT = $(shell echo ${HOME}/.sign-to-migrate)
PWD = $(shell pwd)
PROJECTS = utils collection server-side
VENV = $(PWD)/.venv

.PHONY: clean
clean:
	-rm poetry.lock
	-find . -name "__pycache__" -type d -print -exec rm -rf {} +
	-find . -name ".pytest_cache" -type d -print -exec rm -rf {} +
	-find . -name ".ruff_cache" -type d -print -exec rm -rf {} +
	-find . -name ".ipynb_checkpoints" -type d -print -exec rm -rf {} +
	-find . -name "node_modules" -type d -print -exec rm -rf {} +
	-find . -name "dist" -type d -print -exec rm -rf {} +
	-find . -name ".DS_Store" -type f -print -exec rm -rf {} +
	-find . -name ".venv" -type d -print -exec rm -rf {} +

.PHONY: lint
lint:
	-isort .
	-ruff check --fix .
	-ruff format .

.PHONY: pre-commit
pre-commit: lint clean

.PHONY: venv
venv: .venv/.installed
.venv/.installed: 
	python -m venv $(VENV)
	$(VENV)/bin/pip install --upgrade pip
	$(VENV)/bin/pip install pytest dateutils
	for project in $(PROJECTS); do $(VENV)/bin/pip install -e $$project; done
	touch $(VENV)/.installed

.PHONY: install
install: $(ROOT)/.installed
$(ROOT)/.installed:
	-mkdir ${ROOT}
	cp config.yml "${ROOT}/"
	@printf "sign-to-migrate installed.\n"
	touch $(ROOT)/.installed

.PHONY: uninstall
uninstall:
	rm -r ~/.sign-to-migrate

.PHONY: test
test: venv install
	cd utils && $(VENV)/bin/pytest -vvv
	cd collection && $(VENV)/bin/pytest -vvv
	cd server-side && $(VENV)/bin/pytest -vvv

