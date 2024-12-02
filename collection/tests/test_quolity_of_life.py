from collection.quolity_of_life import QuolityOfLifeTask
from tests.test_lib import run_and_check_output


def test_crime():
    run_and_check_output(QuolityOfLifeTask, QuolityOfLifeTask.output_name)
