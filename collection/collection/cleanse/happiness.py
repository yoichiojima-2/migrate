import pandas as pd
from collection.task import Task
from collection.cleanse.cleanse_utils import filter_by_country, OUTPUT_COLS
from utils.utils import get_data_dir, df_to_json


class HappinessTask(Task):
    input_path = "raw/happiness.json"
    output_path = "cleanse/happiness.json"

    def extract(self) -> pd.DataFrame:
        return pd.read_json(get_data_dir() / self.input_path)

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df["country"] = df["country"].str.lower()
        df["feature"] = df["feature"].str.lower()
        df = df[df["year"] == 2017].drop(columns="year")
        df = df[df["feature"] != "happiness.rank"]

        df = filter_by_country(df)
        city_to_country_df = pd.read_json(get_data_dir() / "master/city_to_country.json")

        df_merged = df.merge(city_to_country_df, on="country", how="left")
        return df_merged[OUTPUT_COLS]

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = HappinessTask()
    task.run()
