from pathlib import Path
import luigi
from collection.main import SummariseCostOfLiving
from utils.utils import get_data_dir


def test_summarise_cost_of_living():
    luigi.build([SummariseCostOfLiving()], local_scheduler=True)
    assert Path(get_data_dir() / SummariseCostOfLiving().output().path).exists()
