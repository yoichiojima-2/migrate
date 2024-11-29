import os
import pandas as pd
from pathlib import Path
from cleansing import cost_of_living
from utils.get_config import get_config


def summarize(current_city):
    cleansed_cost_of_living_path = (
        f"{os.getenv('SIGN_TO_MIGRATE_ROOT')}/data/cost_of_living_cleansed.json"
    )

    if not Path(cleansed_cost_of_living_path).exists():
        cost_of_living.cleanse()

    cost_of_living_df = pd.read_json(cleansed_cost_of_living_path)
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

    output_df = rest_df.merge(diff_df, on=["city", "feature"], how="left")
    output_df.to_json(
        f"{os.getenv('SIGN_TO_MIGRATE_ROOT')}/data/summary_{current_city.lower().replace("-", "_")}.json",
        orient="records",
        indent=2,
    )
    # fmt: on


def main():
    for city in get_config()["cities"]:
        summarize(city)


if __name__ == "__main__":
    main()
