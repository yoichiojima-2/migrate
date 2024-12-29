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
    df = pd.read_json(get_data_dir() / "master/city_to_country.json")
    return df[df["city"] == city]["country"].iloc[0]


@app.get("/summary")
def summary(city: str) -> list:
    qol_df = pd.read_json(get_data_dir() / "cleanse/quality_of_life.json")
    crime_df = pd.read_json(get_data_dir() / "cleanse/crime.json")
    cost_of_living_df = pd.read_json(get_data_dir() / "cleanse/cost_of_living.json")
    happiness_df = pd.read_json(get_data_dir() / "cleanse/happiness.json")
    weather_df = pd.read_json(get_data_dir() / "cleanse/weather.json")

    df = pd.concat([happiness_df, qol_df, crime_df, cost_of_living_df, weather_df])

    needle_df = (
        df[df["city"] == city]
        .rename(columns={"value": "needle_value"})
        .drop(columns=["city", "country"])
    )
    haystack_df = df[df["city"] != city].rename(columns={"value": "haystack_value"})

    # fmt: off
    merged_df = haystack_df.merge(needle_df, on=["feature"], how="left")
    merged_df["diff_amount"] = (merged_df["haystack_value"] - merged_df["needle_value"])
    # fmt: on

    # fmt: off
    merged_df["diff_rate"] = (
        merged_df
        .apply(lambda x: (x["haystack_value"] / x["needle_value"] - 1) * 100 if x["needle_value"] else 0, axis=1)
    )

    decimals = 1
    merged_df["value"] = merged_df["haystack_value"].round(decimals)
    merged_df["value_in_current_city"] = merged_df["needle_value"].round(decimals)
    merged_df["diff_amount"] = merged_df["diff_amount"].round(decimals)
    merged_df["diff_rate"] = merged_df["diff_rate"].round(decimals)

    return (
        merged_df[
            [
                "country",
                "city",
                "feature",
                "value",
                "value_in_current_city",
                "diff_amount",
                "diff_rate",
            ]
        ]
        .to_dict(orient="records")
    )
    # fmt: on


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
