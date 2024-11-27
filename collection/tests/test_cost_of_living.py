import os
from pathlib import Path
from pprint import pprint
import json
from collection.cost_of_living import CostOfLivingTask
from tests.test_lib import run_and_check_output


def test_cost_of_living():
    run_and_check_output(CostOfLivingTask, CostOfLivingTask.output_name)