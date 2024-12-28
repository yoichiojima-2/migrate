from pathlib import Path
import luigi
from collection.main import Coordinates
from utils.utils import get_data_dir


def test_cost_of_living():
    luigi.build([Coordinates()], local_scheduler=True)
    assert Path(get_data_dir() / Coordinates().output().path).exists()
