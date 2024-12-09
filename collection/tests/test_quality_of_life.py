from collection.quality_of_life import QualityOfLifeTask
from tests.test_lib import run_and_check_output


def test_crime():
    run_and_check_output(QualityOfLifeTask, QualityOfLifeTask.output_path)
