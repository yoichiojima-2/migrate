import os
from pathlib import Path
from pprint import pprint
import json
from cleansing.cost_of_living import cost_of_living


def test_cost_of_living():
    cost_of_living()
    output = Path(os.getenv("DATA_DIR")) / "cost_of_living_cleansed.json"
    pprint(json.load(output.open())[:5])
    assert output.exists()
