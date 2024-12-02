from collection.crime import CrimeTask
from tests.test_lib import run_and_check_output

def test_crime():
    run_and_check_output(CrimeTask, CrimeTask.output_name)
