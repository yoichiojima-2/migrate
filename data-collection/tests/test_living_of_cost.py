import os
import json
from pathlib import Path
from pprint import pprint
from data_collection.cost_of_living import CostOfLivingTask


def test_cost_of_living():
    CostOfLivingTask().run()
    output = Path(os.getenv("DATA_DIR")) / "cost_of_living.json"
    pprint(json.load(output.open()))
    assert output.exists()
