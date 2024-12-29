import requests
from tqdm import tqdm
from dataclasses import dataclass
import pandas as pd
from collection.task import Task
from utils.utils import get_config, get_data_dir, df_to_json


@dataclass
class Coordinates:
    latitude: float
    logitude: float


def get_coordinates(city: str) -> Coordinates:
    path = get_data_dir() / "global/coordinates.json"
    df = pd.read_json(path)
    df_filtered = df[df["city"] == city.lower()].iloc[0]
    return Coordinates(latitude=df_filtered["lat"], logitude=df_filtered["lng"])


class WeatherTask(Task):
    output_path = "raw/weather.json"
    cities = get_config()["cities"]

    def extract_by_city(self, city: str) -> pd.DataFrame:
        coordinates = get_coordinates(city)

        url = "https://power.larc.nasa.gov/api/temporal/monthly/point"
        params = {
            "parameters": "T2M,PRECTOT,RH2M,WS2M,T2M_MAX,T2M_MIN",
            "community": "ag",
            "longitude": coordinates.logitude,
            "latitude": coordinates.latitude,
            "start": 2022,
            "end": 2022,
            "format": "JSON",
        }
        res = requests.get(url, params=params)
        fetched_data = res.json().get("properties").get("parameter")

        data = []
        for feature, content in fetched_data.items():
            for yearmonth, value in content.items():
                data.append({"city": city, "feature": feature, "yearmonth": yearmonth, "value": value})

        return pd.DataFrame(data)

    def extract(self):
        return pd.concat(
            [self.extract_by_city(city) for city in tqdm(self.cities, desc="extracting weather data...")],
        )

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        return df

    def load(self, df: pd.DataFrame) -> None:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = WeatherTask()
    task.run()
