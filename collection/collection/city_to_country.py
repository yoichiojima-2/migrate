import json
import pandas as pd
from utils.utils import get_data_dir, write_json
from collection.task import Task


class CityToCountryTask(Task):
    output_path = "global/city_to_country.json"

    def extract(self):
        return pd.read_json(get_data_dir() / "raw/cost_of_living.json")

    def transform(self, df: pd.DataFrame):
        mapping_df = df[["country", "city"]].drop_duplicates()
        mapping_df["country"] = mapping_df["country"].str.lower()
        mapping_df["city"] = mapping_df["city"].str.lower()
        return mapping_df

    def load(self, df: pd.DataFrame):
        self.output_path
        data = df.set_index("city").to_dict()["country"]
        write_json(data, self.output_path)

if __name__ == "__main__":
    CityToCountryTask().run()