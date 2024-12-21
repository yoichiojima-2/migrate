from pathlib import Path
import luigi
from collection.main import CityToCountry
from utils.utils import get_data_dir



def test_cost_of_living():
    luigi.build([CityToCountry()], local_scheduler=True)
    assert Path(get_data_dir() / CityToCountry().output().path).exists()
