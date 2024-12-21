from pathlib import Path
import luigi
from collection.main import QualityOfLife
from utils.utils import get_data_dir



def test_quolity_of_life():
    luigi.build([QualityOfLife()], local_scheduler=True)
    assert Path(get_data_dir() / QualityOfLife().output().path).exists()