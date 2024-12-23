from pathlib import Path
import luigi
from collection.main import Happiness
from utils.utils import get_data_dir


def test_cost_of_living():
    luigi.build([Happiness()], local_scheduler=True)
    assert Path(get_data_dir() / Happiness().output().path).exists()
