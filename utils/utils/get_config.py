import os
from pathlib import Path

import yaml


def get_config():
    return yaml.safe_load((Path(os.getenv("SIGN_TO_MIGRATE_ROOT")) / "config.yml").open())
