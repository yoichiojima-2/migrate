import pandas as pd
from collection.task import Task
from utils.utils import get_data_dir, df_to_json
from collection.cleanse.cleanse_utils import OUTPUT_COLS


class WeatherTask(Task):
    input_path = "raw/weather.json"
    output_path = "cleanse/weather.json"

    def extract(self) -> pd.DataFrame:
        return pd.read_json(get_data_dir() / self.input_path)

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df["feature"] = df.apply(lambda x: f"{x['feature']}_{x['month']}", axis=1)
        return df[OUTPUT_COLS]

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = WeatherTask()
    task.run()
