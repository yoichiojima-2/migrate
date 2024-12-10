import requests
import pandas as pd
from collection.task import Task
from utils.utils import df_to_json


class CpiTask(Task):
    output_path = "raw/cpi.json"

    def extract(self) -> pd.DataFrame:
        url = "https://api.worldbank.org/v2/country/all/indicator/FP.CPI.TOTL"
        print(f"[CpiTask.extract] url: {url}")
        response = requests.get(
            url,
            params={
                "format": "json",
                "date": "2010:2024",
                "per_page": 10000,
            },
        )
        if response.status_code == 200:
            data = response.json()
            return pd.DataFrame(data[1])
        else:
            raise RuntimeError(f"Failed to fetch data: {response.status_code}")

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df = df[pd.notna(df["value"])].copy()
        df["country_name"] = df["country"].apply(lambda x: x["value"])
        df["country_id"] = df["country"].apply(lambda x: x["id"])
        df = df[["countryiso3code", "country_name", "date", "value"]]
        df["feature"] = "cpi"

        # fmt: off
        return (
            df
            .rename(columns={"country_name": "country", "date": "year"})
            [["country", "countryiso3code", "year", "feature", "value"]]
        )
        # fmt: on

    def load(self, df: pd.DataFrame) -> None:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = CpiTask()
    task.run()
