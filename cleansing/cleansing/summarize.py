import os
import pandas as pd
from pathlib import Path
from cleansing import cost_of_living
from utils.get_config import get_config


def summarize(current_city):
    input_path = f"{os.getenv('SIGN_TO_MIGRATE_ROOT')}/data/cost_of_living_cleansed.json"

    if not Path(input_path).exists():
        cost_of_living.cleanse()

    cost_of_living_df = pd.read_json(input_path)
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
            pd.read_json(f"{os.getenv('SIGN_TO_MIGRATE_ROOT')}/data/happiness.json")
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
    diff_df = diff_df[["city", "feature", current_city_val_name, "diff_amount", "diff_rate"]]

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

    # f"{os.getenv('SIGN_TO_MIGRATE_ROOT')}/data/summary_{current_city.lower().replace("-", "_")}.json",
    # fmt: on


def main():
    for city in get_config()["cities"]:
        summarize(city)


if __name__ == "__main__":
    main()
