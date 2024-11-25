import os
from pathlib import Path

import yaml


def get_config():
    return yaml.safe_load((Path(os.getenv("APP_ROOT")) / "config.yml").open())
