import os
import json
from pathlib import Path
from pprint import pprint
from data_collection.cost_of_living import CostOfLivingTask


def test_cost_of_living():
    cost_of_living = CostOfLivingTask()
    df = cost_of_living.extract()
    df = cost_of_living.transform(df)
    cost_of_living.load(df)
    output = Path(os.getenv("DATA_DIR")) / "cost_of_living.json"
    pprint(json.load(output.open())[:5])
    assert output.exists()
