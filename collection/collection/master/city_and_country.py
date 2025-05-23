import pandas as pd
from utils.utils import get_data_dir, df_to_json
from collection.task import Task


class CityAndCountryTask(Task):
    output_path = "master/city_and_country.json"

    def extract(self) -> pd.DataFrame:
        return pd.read_json(get_data_dir() / "raw/cost_of_living.json")

    def transform(self, df: pd.DataFrame) -> dict[str, str]:
        mapping_df = df[["country", "city"]].drop_duplicates()
        mapping_df["country"] = mapping_df["country"].str.lower()
        mapping_df["city"] = mapping_df["city"].str.lower()
        return mapping_df

    def load(self, data: dict[str, str]):
        df_to_json(data, self.output_path)


if __name__ == "__main__":
    CityAndCountryTask().run()
