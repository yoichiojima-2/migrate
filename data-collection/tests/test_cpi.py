from data_collection.cpi import CpiTask
from tests.test_lib import run_and_check_output


def test_cpi():
    run_and_check_output(CpiTask, "cpi.json")
