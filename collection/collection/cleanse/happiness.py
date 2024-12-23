from pathlib import Path
import pandas as pd
from collection.task import Task
from collection.cleanse.cleanse_utils import filter_by_country
from utils.utils import get_data_dir, df_to_json


class HappinessTask(Task):
    output_path = "cleansed/happiness.json"

    def extract(self) -> pd.DataFrame:
        return pd.read_json(get_data_dir() / "raw/happiness.json")

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df["country"] = df["country"].str.lower()
        df["feature"] = df["feature"].str.lower()
        df = df[df["year"] == 2017].drop(columns="year")
        df = df[df["feature"] != "happiness.rank"]

        df = filter_by_country(df)

        return df

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = HappinessTask()
    task.run()

