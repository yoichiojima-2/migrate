import os
from pathlib import Path
from data_collection.cost_of_living import CostOfLivingTask


def test_cost_of_living():
    cost_of_living = CostOfLivingTask()
    df = cost_of_living.extract()
    df = cost_of_living.transform(df)
    cost_of_living.load(df)
    assert (Path(os.getenv("DATA_DIR")) / "cost_of_living.json").exists()
