from pathlib import Path
import luigi
from collection.main import CityAndCountry
from utils.utils import get_data_dir


def test_city_and_country():
    luigi.build([CityAndCountry()], local_scheduler=True)
    assert Path(get_data_dir() / CityAndCountry().output().path).exists()
