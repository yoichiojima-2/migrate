from pathlib import Path
from collection.city_to_country import CityToCountryTask
from collection.cost_of_living import CostOfLivingTask
from utils.utils import get_data_dir


def test_cost_of_living():
    CostOfLivingTask().run()
    CityToCountryTask().run()
    assert Path(get_data_dir() / CityToCountryTask.output_path).exists()
