import pandas as pd
from collection.task import Task
from utils.utils import get_data_dir, df_to_json


class WeatherTask(Task):
    input_path = "raw/weather.json"
    output_path = "cleanse/weather.json"

    def extract(self) -> pd.DataFrame:
        return pd.read_json(get_data_dir() / self.input_path)

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        # add country column
        city_to_country_df = pd.read_json(get_data_dir() / "master/city_to_country.json")
        df = df.merge(city_to_country_df, on="city", how="left")
        return df[["country", "city", "feature", "value"]]

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = WeatherTask()
    task.run()

