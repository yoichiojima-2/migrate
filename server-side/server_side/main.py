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
    return get_config().get("cities")


@app.get("/happiness")
def happiness(country: str):
    df = pd.read_json(get_data_dir() / "raw/happiness.json")

    df = df[df["year"] == 2017].drop(columns="year")
    df["country"] = df["country"].str.lower()
    df["feature"] = df["feature"].str.lower()

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

    result = {}
    for _, row in merged_df.iterrows():
        country = row["country"]
        feature = row["feature"]
        if country not in result:
            result[country] = {}

        result[country][feature] = {
            "haystack_value": row["haystack_value"],
            "needle_value": row["needle_value"],
            "diff_amount": row["diff_amount"],
            "diff_rate": row["diff_rate"]
        }

    return result
