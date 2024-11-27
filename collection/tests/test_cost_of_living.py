import os
from pathlib import Path
from pprint import pprint
import json
from collection.cost_of_living import CostOfLivingTask
from tests.test_lib import run_and_check_output


def test_cost_of_living():
    run_and_check_output(CostOfLivingTask, CostOfLivingTask.output_name)
    output = Path(os.getenv("APP_ROOT")) / "data/cost_of_living_cleansed.json"
    pprint(json.load(output.open())[:5])
    assert output.exists()