from pathlib import Path
import luigi
from collection.main import Cpi
from utils.utils import get_data_dir



def test_cost_of_living():
    luigi.build([Cpi()], local_scheduler=True)
    assert Path(get_data_dir() / Cpi().output().path).exists()