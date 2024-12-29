import pandas as pd
from collection.task import Task
from collection.cleanse.cleanse_utils import filter_by_country, OUTPUT_COLS
from utils.utils import get_data_dir, df_to_json


class CrimeTask(Task):
    input_path = "raw/crime.json"
    output_path = "cleanse/crime.json"

    def extract(self) -> pd.DataFrame:
        return pd.read_json(get_data_dir() / self.input_path)

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df["city"] = df["city"].str.lower()
        df["country"] = df["country"].str.lower()
        df["feature"] = df["feature"].str.lower()

        df = filter_by_country(df)

        return df[OUTPUT_COLS]

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = CrimeTask()
    task.run()
