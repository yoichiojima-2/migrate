from pathlib import Path
from collection.city_to_country import CityToCountryTask
from utils.utils import get_data_dir

def test_cost_of_living():
    CityToCountryTask().run()
    assert Path(get_data_dir() / CityToCountryTask.output_path).exists()

