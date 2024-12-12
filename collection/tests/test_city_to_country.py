from collection.cost_of_living import CostOfLivingTask
from collection import city_to_country
from utils.utils import get_data_dir


def test_city_to_country():
    city_to_country.main()
    output_path = get_data_dir() / "global/city_to_country.json"
    assert output_path.exists()
