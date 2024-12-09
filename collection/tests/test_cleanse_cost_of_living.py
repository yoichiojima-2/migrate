from utils.utils import read_json
from collection.cleanse_cost_of_living import cleanse_cost_of_living


def test_cost_of_living():
    cleanse_cost_of_living()
    output = read_json("interim/cleanse_cost_of_living.json")
    assert len(output)
