import pandas as pd
from sklearn.preprocessing import StandardScaler
from collection.task import Task
from utils.utils import get_data_dir, df_to_json


class HappinessQOLTask(Task):
    output_path = "summary/happiness_qol.json"

    def extract(self):
        qol_df = pd.read_json(get_data_dir() / "cleanse/quality_of_life.json")
        happiness_df = pd.read_json(get_data_dir() / "cleanse/happiness.json")
        return pd.concat([happiness_df, qol_df])
        
    def transform(df: pd.DataFrame) -> pd.DataFrame:
        df = df.pivot(index=["country", "city"], columns="feature", values="value")

        feature_mapping = {
            "happiness.score": "Happiness Score",
            "quality of life index:": "Quality of Life",
            "safety index": "Safety",
            "freedom": "Freedom",
            "economy..gdp.per.capita.": "GDP per Capita",
            "cost of living index": "Cost of Living",
            "purchasing power index": "Purchasing Power",
            "climate index": "Climate",
            "pollution index": "Pollution",
            "generosity": "Generosity",
            "family": "Family Support",
            "health care index": "Health Care",
            "health..life.expectancy.": "Life Expectancy",
            "trust..government.corruption.": "Trust in Government",
            "dystopia.residual": "Dystopia Residual",
            "property price to income ratio": "Property Price",
            "traffic commute time index": "Traffic Commute Time",
        }

        df = df[feature_mapping.keys()]

        scaler = StandardScaler()
        df = pd.DataFrame(scaler.fit_transform(df), columns=df.columns, index=df.index)
        df = df.melt(ignore_index=False).reset_index()

        df["feature"] = df["feature"].apply(lambda x: feature_mapping[x])
    
        return df

    def load(self, df: pd.DataFrame):
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = HappinessQOLTask()
    task.run()
