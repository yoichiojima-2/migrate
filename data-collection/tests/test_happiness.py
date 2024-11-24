import os
import json
from pathlib import Path
from pprint import pprint
from data_collection.happiness import HappinessTask


def test_happiness():
    HappinessTask().run()
    output = Path(os.getenv("DATA_DIR")) / "happiness.json"
    pprint(json.load(output.open()))
    assert output.exists()
