import pandas as pd
from collection.task import Task
from utils.utils import get_data_dir, df_to_json


class CostOfLivingTask(Task):
    output_path = "summary/cost_of_living.json"

    def extract(self):
        df = pd.read_json(get_data_dir() / "cleanse/cost_of_living.json")

        features = {
            "apartment (1 bedroom) outside of centre": ("apartment", "1 bedroom, outside of centre"),
            "apartment (1 bedroom) in city centre": ("apartment", "1 bedroom, in city centre"),
            "price per square meter to buy apartment outside of centre": (
                "apartment",
                "price per m2, outside of centre",
            ),
            "price per square meter to buy apartment in city centre": ("apartment", "price per m2, city centre"),
            "average monthly net salary (after tax)": ("salary", "monthly"),
            "basic (electricity, heating, cooling, water, garbage) for 85m2 apartment": (
                "basic",
                "85m2 apartment, electricity, water, etc",
            ),
            "loaf of fresh white bread (500g)": ("bread", "loaf of fresh white, 500g"),
            "mcmeal at mcdonalds (or equivalent combo meal)": ("eating-out", "mcmeal at mcdonalds"),
            "meal for 2 people, mid-range restaurant, three-course": (
                "eating-out",
                "for 2 people, mid-range",
            ),
            "meal, inexpensive restaurant": ("eating-out", "inexpensive restaurant"),
            "water (1.5 liter bottle)": ("water", "1.5 liter bottle"),
            "bottle of wine (mid-range)": ("wine", "1 bottle, mid-range"),
            "cappuccino (regular)": ("coffee", "cappuccino, regular"),
            "cigarettes 20 pack (marlboro)": ("cigarettes", "20 pack, marlboro"),
            "coke/pepsi (0.33 liter bottle)": ("coke", "pepsi, 0.33 liter bottle"),
            "monthly pass (regular price)": ("commute", "monthly pass, regular price"),
            "one-way ticket (local transport)": ("public transportation", "one-way ticket"),
            "international primary school, yearly for 1 child": ("school", "international primary per year"),
            "mobile phone monthly plan with calls and 10gb+ data": ("internet", "monthly plan / 10gb"),
        }
        df["description"] = df["feature"].apply(lambda x: features[x][1])
        df["feature"] = df["feature"].apply(lambda x: features[x][0])

        return df[["country", "city", "feature", "description", "value"]]

    def load(self, df: pd.DataFrame):
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = CostOfLivingTask()
    task.run()
