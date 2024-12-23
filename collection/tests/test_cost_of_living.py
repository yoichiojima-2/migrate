from pathlib import Path
import luigi
from collection.main import CostOfLiving
from utils.utils import get_data_dir


def test_cost_of_living():
    luigi.build([CostOfLiving()], local_scheduler=True)
    assert Path(get_data_dir() / CostOfLiving().output().path).exists()
