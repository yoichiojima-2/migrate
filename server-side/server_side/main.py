from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from utils.utils import get_config, get_data_dir


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yoichiojima-2.github.io", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["Content-Type", "Authorization"],
)


def make_compare_df(
    df: pd.DataFrame,
    city: str,
    round_decimals: int = 1,
    additional_keys: list[str] = [],
) -> pd.DataFrame:
    rest_df = df[df["city"] != city]
    current_df = (
        df[df["city"] == city]
        .rename(columns={"value": "value_in_current_city"})
        .drop(columns=["country", "city"])
    )

    # fmt: off
    merged_df = rest_df.merge(current_df, on=["feature", *additional_keys], how="left")
    merged_df["diff"] = (merged_df["value"] - merged_df["value_in_current_city"])

    merged_df["diff_rate"] = (
        merged_df
        .apply(lambda x: (x["value"] / x["value_in_current_city"] - 1) * 100 if x["value_in_current_city"] else 0, axis=1)
    )

    merged_df["value"] = merged_df["value"].round(round_decimals)
    merged_df["value_in_current_city"] = merged_df["value_in_current_city"].round(round_decimals)
    merged_df["diff"] = merged_df["diff"].round(round_decimals)
    merged_df["diff_rate"] = merged_df["diff_rate"].round(round_decimals)

    return merged_df[["country", "city", "feature", *additional_keys, "value", "value_in_current_city", "diff", "diff_rate"]]
    # fmt: on


@app.get("/cities")
def cities() -> list[str]:
    return [city.lower() for city in get_config().get("cities")]


@app.get("/cities_and_countries")
def cities_and_countries() -> list[dict[str, str]]:
    df = pd.read_json(get_data_dir() / "master/city_and_country.json")
    return df.to_dict(orient="records")


@app.get("/country")
def country(city: str) -> str | None:
    df = pd.read_json(get_data_dir() / "master/city_and_country.json")
    return df[df["city"] == city]["country"].iloc[0]


@app.get("/happiness_qol")
def happiness_qol(city: str) -> list:
    df = pd.read_json(get_data_dir() / "summary/happiness_qol.json")
    return make_compare_df(df, city).drop(columns="diff_rate").to_dict(orient="records")


@app.get("/cost_of_living")
def cost_of_living(city: str) -> list:
    df = pd.read_json(get_data_dir() / "summary/cost_of_living.json")
    return (
        make_compare_df(df, city, round_decimals=0, additional_keys=["description"])
        .drop(columns="diff")
        .to_dict(orient="records")
    )


if __name__ == "__main__":
    import os
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=int(os.getenv("PORT", "8000")), reload=True)
