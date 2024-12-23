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


def city_to_country(city: str) -> str:
    df = pd.read_json(get_data_dir() / "master/city_to_country.json")
    return df[df["city"] == city]["country"].iloc[0]


@app.get("/cities")
def cities() -> list[str]:
    return [city.lower() for city in get_config().get("cities")]


@app.get("/country")
def country(city: str) -> str | None:
    return city_to_country(city)


@app.get("/summary")
def summary(city: str) -> list:
    qol_df = pd.read_json(get_data_dir() / "cleansed/quality_of_life.json")

    city_country_df = qol_df[["city", "country"]].drop_duplicates()
    raw_happiness_df = pd.read_json(get_data_dir() / "cleansed/happiness.json")
    happiness_df = city_country_df.merge(raw_happiness_df, on="country", how="left")

    df = pd.concat([happiness_df, qol_df])

    needle_df = (
        df[df["city"] == city]
        .rename(columns={"value": "needle_value"})
        .drop(columns=["city", "country"])
    )
    haystack_df = df[df["city"] != city].rename(columns={"value": "haystack_value"})

    merged_df = haystack_df.merge(needle_df, on=["feature"], how="left")
    merged_df["diff_amount"] = (
        merged_df["haystack_value"] - merged_df["needle_value"]
    ).round(2)

    # fmt: off
    merged_df["diff_rate"] = (
        merged_df
        .apply(lambda x: (x["haystack_value"] / x["needle_value"] - 1) * 100 if x["needle_value"] else 0, axis=1)
    )
    # fmt: on
    merged_df["value"] = merged_df["haystack_value"].round(2)
    merged_df["value_in_current_city"] = merged_df["needle_value"].round(2)
    merged_df["diff_rate"] = merged_df["diff_rate"].round(2)

    return merged_df[
        [
            "country",
            "city",
            "feature",
            "value",
            "value_in_current_city",
            "diff_amount",
            "diff_rate",
        ]
    ].to_dict(orient="records")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
