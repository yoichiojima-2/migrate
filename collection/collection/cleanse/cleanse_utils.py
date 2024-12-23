from utils.utils import get_data_dir
import pandas as pd


def filter_by_country(df):
    city_to_country_df = pd.read_json(get_data_dir() / "master/city_to_country.json")
    countries: list[str] = list(city_to_country_df["country"].unique())
    return df[df["country"].isin(countries)]
