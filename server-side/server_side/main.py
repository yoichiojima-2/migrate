import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from utils.utils import get_config, get_data_dir


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/cities")
def cities() -> list[str]:
    return [city.lower() for city in get_config().get("cities")]


@app.get("/country")
def country(city: str) -> str | None:
    ref: Path = get_data_dir() / "global/city_to_country.json"
    mapping = json.loads(open(ref).read())
    return mapping.get(city, None)


@app.get("/happiness")
def happiness(country: str) -> dict:
    if not country:
        return {}

    df = pd.read_json(get_data_dir() / "raw/happiness.json")

    countries: list[str] = list(json.load((get_data_dir() / "global/city_to_country.json").open()).values())

    df["country"] = df["country"].str.lower()
    df["feature"] = df["feature"].str.lower()

    df = df[df["year"] == 2017].drop(columns="year")
    df = df[df["country"].isin(countries)]

    # fmt: off
    needle_df = (
        df[df["country"] == country]
        .rename(columns={"value": "needle_value"})
        .drop(columns="country")
    )

    haystack_df = (
        df[df["country"] != country]
        .rename(columns={"value": "haystack_value"})
    )
    # fmt: on
    merged_df = haystack_df.merge(needle_df, on=["feature"], how="left")
    merged_df["diff_amount"] = merged_df["haystack_value"] - merged_df["needle_value"]

    # fmt: off
    merged_df["diff_rate"] = (
        merged_df
        .apply(lambda x: x["haystack_value"] / x["needle_value"] if x["needle_value"] else 0, axis=1)
    )
    # fmt: on
    result = {"selected_country": country, "data": {}}

    for _, row in merged_df.iterrows():
        country = row["country"]
        feature = row["feature"]

        if country not in result["data"]:
            result["data"][country] = {}

        if feature not in result["data"][country]:
            result["data"][country][feature] = {}

        result["data"][country][feature] = {
            "value": round(row["needle_value"], 2),
            "value_in_current_country": round(row["haystack_value"], 2),
            "diff_amount": round(row["diff_amount"], 2),
            "diff_rate": round(row["diff_rate"], 2),
        }

    return result
