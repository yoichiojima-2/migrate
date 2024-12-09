from collection.summarize import summarize
from utils.utils import get_config, read_json


def test_summarize():
    for city in get_config()["cities"]:
        summarize(city)
        # fmt: off
        output = read_json("interim/cleanse_cost_of_living.json")
        assert len(output)
        # fmt: on
