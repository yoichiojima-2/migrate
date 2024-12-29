import pandas as pd
from sklearn.preprocessing import StandardScaler
from collection.task import Task
from utils.utils import get_data_dir, df_to_json


class HappinessQOLTask(Task):
    output_path = "summary/happiness_qol.json"

    def extract(self):
        qol_df = pd.read_json(get_data_dir() / "cleanse/quality_of_life.json")
        happiness_df = pd.read_json(get_data_dir() / "cleanse/happiness.json")

        df = pd.concat([happiness_df, qol_df])
        df = df.pivot(index=["country", "city"], columns="feature", values="value")
        scaler = StandardScaler()
        df = pd.DataFrame(scaler.fit_transform(df), columns=df.columns, index=df.index)
        df = df.melt(ignore_index=False).reset_index()

        feature_mapping = {
            "happiness.score": "Happiness Score",
            "economy..gdp.per.capita.": "GDP per Capita",
            "family": "Family Support",
            "health..life.expectancy.": "Life Expectancy",
            "freedom": "Freedom Index",
            "generosity": "Generosity Index",
            "trust..government.corruption.": "Trust in Government",
            "dystopia.residual": "Dystopia Residual",
            "climate index": "Climate Index",
            "cost of living index": "Cost of Living Index",
            "health care index": "Health Care Index",
            "pollution index": "Pollution Index",
            "property price to income ratio": "Property Price-to-Income Ratio",
            "purchasing power index": "Purchasing Power Index",
            "quality of life index:": "Quality of Life Index",
            "safety index": "Safety Index",
            "traffic commute time index": "Traffic Commute Time Index",
        }
        df["feature"] = df["feature"].apply(lambda x: feature_mapping[x])
        return df

    def load(self, df: pd.DataFrame):
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = HappinessQOLTask()
    task.run()
