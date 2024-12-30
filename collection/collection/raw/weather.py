from datetime import datetime
import requests
import warnings
from tqdm import tqdm
from dataclasses import dataclass
import pandas as pd
from dotenv import load_dotenv
from collection.task import Task
from utils.utils import get_config, get_data_dir, df_to_json


load_dotenv()


@dataclass
class Coordinates:
    latitude: float
    logitude: float


def get_coordinates(city: str) -> Coordinates:
    path = get_data_dir() / "master/coordinates.json"
    df = pd.read_json(path)
    df_filtered = df[df["city"] == city.lower()].iloc[0]
    return Coordinates(latitude=df_filtered["lat"], logitude=df_filtered["lng"])


class WeatherTask(Task):
    output_path = "raw/weather.json"
    cities = get_config()["cities"]
    year = 2022

    @staticmethod
    def validate_yearmonth(yearmonth: str) -> bool:
        try:
            datetime.strptime(yearmonth, "%Y%m")
            return True
        except ValueError:
            return False

    def extract_by_city(self, city: str) -> pd.DataFrame:
        coordinates = get_coordinates(city)

        url = "https://power.larc.nasa.gov/api/temporal/monthly/point"
        params = {
            "parameters": "T2M,PRECTOT,RH2M,WS2M,T2M_MAX,T2M_MIN",
            "community": "ag",
            "longitude": coordinates.logitude,
            "latitude": coordinates.latitude,
            "start": self.year,
            "end": self.year,
            "format": "JSON",
        }
        res = requests.get(url, params=params)
        fetched_data = res.json().get("properties").get("parameter")

        data = []
        for feature, content in fetched_data.items():
            for yearmonth, value in content.items():
                if self.validate_yearmonth(yearmonth):
                    data.append({"city": city, "yearmonth": yearmonth, "feature": feature, "value": value})
                else:
                    warnings.warn(f"invalid yearmonth: {yearmonth}")

        return pd.DataFrame(data)

    def extract(self):
        return pd.concat(
            [self.extract_by_city(city) for city in tqdm(self.cities, desc="extracting weather data...")],
        )

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df["_dt"] = df["yearmonth"].apply(lambda x: datetime.strptime(x, "%Y%m"))
        df["year"] = df["_dt"].dt.year
        df["month"] = df["_dt"].dt.month
        df["city"] = df["city"].str.lower()

        # add country column
        city_to_country_df = pd.read_json(get_data_dir() / "master/city_and_country.json")
        df = df.merge(city_to_country_df, on="city", how="left")

        return df[["country", "city", "year", "month", "feature", "value"]]

    def load(self, df: pd.DataFrame) -> None:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = WeatherTask()
    task.run()
