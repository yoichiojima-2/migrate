from pathlib import Path
import luigi
from collection.main import Crime
from utils.utils import get_data_dir


def test_cost_of_living():
    luigi.build([Crime()], local_scheduler=True)
    assert Path(get_data_dir() / Crime().output().path).exists()
