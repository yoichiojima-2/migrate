import os
from pathlib import Path
from cleansing.summarize import summarize
from utils.get_config import get_config


def test_summarize():
    for city in get_config()["cities"]:
        summarize(city)
        # fmt: off
        assert Path(f"{os.getenv('APP_ROOT')}/data/summary_{city.lower().replace('-', '_')}.json").exists()
        # fmt: on
