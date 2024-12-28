from pathlib import Path
import luigi
from collection.main import All
from utils.utils import get_data_dir


def test_all():
    luigi.build([All()], local_scheduler=True)
    assert Path(get_data_dir() / All().success_marker).exists()
