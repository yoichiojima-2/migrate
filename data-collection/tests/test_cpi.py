import os
import json
from pathlib import Path
from pprint import pprint
from data_collection.cpi import CpiTask


def test_cpi():
    CpiTask().run()
    output = Path(os.getenv("DATA_DIR")) / "cpi.json"
    pprint(json.load(output.open())[:5])
    assert output.exists()
