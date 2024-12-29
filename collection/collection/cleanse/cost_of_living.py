import pandas as pd
from collection.task import Task
from collection.cleanse.cleanse_utils import filter_by_country, OUTPUT_COLS
from utils.utils import get_data_dir, df_to_json


class CostOfLivingTask(Task):
    input_path = "raw/cost_of_living.json"
    output_path = "cleanse/cost_of_living.json"

    def extract(self) -> pd.DataFrame:
        return pd.read_json(get_data_dir() / self.input_path)

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df["city"] = df["city"].str.lower()
        df["country"] = df["country"].str.lower()
        df["feature"] = df["feature"].str.lower()

        df = filter_by_country(df)

        features = [
            "apartment (1 bedroom) outside of centre",
            "apartment (1 bedroom) in city centre",
            "average monthly net salary (after tax)",
            "basic (electricity, heating, cooling, water, garbage) for 85m2 apartment",
            "bottle of wine (mid-range)",
            "cappuccino (regular)",
            "cigarettes 20 pack (marlboro)",
            "coke/pepsi (0.33 liter bottle)",
            "international primary school, yearly for 1 child",
            "meal, inexpensive restaurant",
            "mobile phone monthly plan with calls and 10gb+ data",
            "monthly pass (regular price)",
            "one-way ticket (local transport)",
            "price per square meter to buy apartment outside of centre",
            "price per square meter to buy apartment in city centre",
            "water (1.5 liter bottle)",
        ]

        df = df[df["feature"].isin(features)]

        return df[OUTPUT_COLS]

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = CostOfLivingTask()
    task.run()
