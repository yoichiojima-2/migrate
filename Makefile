ROOT = $(shell echo ${HOME}/.sign-to-migrate)
PWD = $(shell pwd)
PROJECTS = utils collection server-side
VENV = $(ROOT)/.venv

.PHONY: clean
clean:
	-rm poetry.lock
	-find . -name "__pycache__" -type d -print -exec rm -rf {} +
	-find . -name ".pytest_cache" -type d -print -exec rm -rf {} +
	-find . -name ".ruff_cache" -type d -print -exec rm -rf {} +
	-find . -name ".ipynb_checkpoints" -type d -print -exec rm -rf {} +
	-find . -name "node_modules" -type d -print -exec rm -rf {} +
	-find . -name "dist" -type d -print -exec rm -rf {} +

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
	@for project in $(PROJECTS); do $(VENV)/bin/pip install -e $$project; done
	touch $(VENV)/.installed

.PHONY: cleansing-test-data
cleansing-test-data: venv
	$(VENV)/bin/python $(PWD)/collection/collection/cost_of_living.py
	$(VENV)/bin/python $(PWD)/collection/collection/happiness.py

.PHONY: test
test: venv cleansing-test-data
	@for project in $(PROJECTS); do cd $(PWD)/$$project && $(VENV)/bin/pytest -vvv; done

.PHONY: install
install:
	-mkdir ${ROOT}
	cp config.yml "${ROOT}/"
	@printf "sign-to-migrate installed.\n"

.PHONY: uninstall
uninstall:
	rm -r ~/.sign-to-migrate
