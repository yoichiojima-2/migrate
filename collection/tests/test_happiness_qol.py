from pathlib import Path
import luigi
from collection.main import HappinessQOL
from utils.utils import get_data_dir


def test_happiness_qol():
    luigi.build([HappinessQOL()], local_scheduler=True)
    assert Path(get_data_dir() / HappinessQOL().output().path).exists()
