import os
import requests
import pandas as pd
from tqdm import tqdm
from collection.task import Task
from utils.utils import get_config, df_to_json


class CoordinatesTask(Task):
    output_path = "raw/coordinates.json"
    cities = get_config()["cities"]
    if key := os.getenv("OPENCAGEDATA_API_KEY"):
        api_key = key
    else:
        raise RuntimeError("API key is not set")

    def extract_by_city(self, city: str) -> pd.DataFrame:
        url = "https://api.opencagedata.com/geocode/v1/json"
        params = {
            "q": "tokyo",
            "key": self.api_key,
        }
        res = requests.get(url, params=params)
        data = res.json().get("results")[0].get("geometry")
        data["city"] = city
        return data

    def extract(self) -> pd.DataFrame:
        return pd.DataFrame(
            [
                self.extract_by_city(city)
                for city in tqdm(self.cities, desc="extracting coordinates...")
            ]
        )

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df["city"] = df["city"].str.lower()
        return df

    def load(self, df: pd.DataFrame) -> None:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = CoordinatesTask()
    task.run()