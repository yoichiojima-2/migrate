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


def make_compare_df(df: pd.DataFrame, city: str) -> pd.DataFrame:
    round_decimals = 1

    rest_df = df[df["city"] != city]
    current_df = (
        df[df["city"] == city]
        .rename(columns={"value": "value_in_current_city"})
        .drop(columns=["country", "city"])
    )

    # fmt: off
    merged_df = rest_df.merge(current_df, on=["feature"], how="left")
    merged_df["diff_amount"] = (merged_df["value"] - merged_df["value_in_current_city"])

    merged_df["diff_rate"] = (
        merged_df
        .apply(lambda x: (x["value"] / x["value_in_current_city"] - 1) * 100 if x["value_in_current_city"] else 0, axis=1)
    )

    merged_df["value"] = merged_df["value"].round(round_decimals)
    merged_df["value_in_current_city"] = merged_df["value_in_current_city"].round(round_decimals)
    merged_df["diff_amount"] = merged_df["diff_amount"].round(round_decimals)
    merged_df["diff_rate"] = merged_df["diff_rate"].round(round_decimals)

    return merged_df[["country", "city", "feature", "value", "value_in_current_city", "diff_amount", "diff_rate"]]
    # fmt: on


@app.get("/cities")
def cities() -> list[str]:
    return [city.lower() for city in get_config().get("cities")]


@app.get("/country")
def country(city: str) -> str | None:
    df = pd.read_json(get_data_dir() / "master/city_to_country.json")
    return df[df["city"] == city]["country"].iloc[0]


@app.get("/happiness_qol")
def happiness_qol(city: str) -> list:
    df = pd.read_json(get_data_dir() / "summary/happiness_qol.json")
    return make_compare_df(df, city).to_dict(orient="records")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
