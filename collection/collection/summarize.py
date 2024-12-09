import os
import json
from pathlib import Path

import pandas as pd
from tqdm import tqdm

from utils.utils import get_config, read_json, get_data_dir


def summarize(current_city):
    cost_of_living_df = read_json(str("interim/cleanse_cost_of_living.json"))
    cost_of_living_cols = [
        "city",
        "country",
        "Apartment (1 bedroom) Outside of Centre",
        "Apartment (1 bedroom) in City Centre",
        "Apartment (3 bedrooms) Outside of Centre",
        "Apartment (3 bedrooms) in City Centre",
        "Average Monthly Net Salary (After Tax)",
        "Basic (Electricity, Heating, Cooling, Water, Garbage) for 85m2 Apartment",
        "Cappuccino (regular)",
        "Cigarettes 20 Pack (Marlboro)",
        "Mobile Phone Monthly Plan with Calls and 10GB+ Data",
        "McMeal at McDonalds (or Equivalent Combo Meal)",
        "Price per Square Meter to Buy Apartment Outside of Centre",
        "Price per Square Meter to Buy Apartment in City Centre",
        "Water (1.5 liter bottle)",
    ]

    # fmt: off
    df = (
        cost_of_living_df
        [[i for i in cost_of_living_df.columns if i in cost_of_living_cols]]
        .merge(
            read_json(str("raw/happiness.json"))
            .rename(columns={"Country": "country"})
            .drop(columns=["Year", "Happiness.Rank"]),
            on=["country"],
            how="left",
        )
        .melt(id_vars=["city", "country"], var_name="feature", value_name="value")
    )
    # fmt: on

    current_city_val_name = "value_in_current_city"
    current_df = (
        df[df["city"] == current_city]
        .drop(columns=["city", "country"])
        .rename(columns={"value": current_city_val_name})
    )

    rest_df = df[df["city"] != current_city]

    # fmt: off
    diff_df = rest_df.merge(current_df, on="feature", how="left")
    diff_df["diff_amount"] = diff_df["value"] - diff_df[current_city_val_name]
    diff_df["diff_rate"] = round(diff_df["value"] / diff_df[current_city_val_name] - 1, 2)
    diff_df = diff_df[["city", "feature", "value", current_city_val_name, "diff_amount", "diff_rate"]]

    nested_result = {}
    for city, group in diff_df.groupby("city"):
        city_data = {
            row["feature"]: {
                "value": row["value"],
                "value_in_current_city": row[current_city_val_name],
                "diff_amount": row["diff_amount"],
                "diff_rate": row["diff_rate"],
            }
            for _, row in group.iterrows()
        }
        nested_result[city.lower()] = city_data

    output_dir = get_data_dir() / f"production"
    json.dump(
        nested_result,
        (output_dir / f"summary_{current_city.lower().replace("-", "_")}.json").open("w"),
        indent=2,
    )
    # fmt: on


def main():
    for city in tqdm(get_config()["cities"]):
        summarize(city)


if __name__ == "__main__":
    main()
