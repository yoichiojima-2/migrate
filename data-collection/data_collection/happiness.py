import os
from pathlib import Path
import pandas as pd
import kagglehub
from data_collection.task import Task


class HappinessTask(Task):
    @staticmethod
    def _read_and_attatch_year(path: Path) -> pd.DataFrame:
        df = pd.read_csv(path)
        df["Year"] = path.stem
        return df

    def extract(self) -> pd.DataFrame:
        path: str = kagglehub.dataset_download("unsdsn/world-happiness")
        return pd.concat([self._read_and_attatch_year(p) for p in Path(path).glob("*.csv")])

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        return df[
            [
                "Country",
                "Year",
                "Happiness.Rank",
                "Happiness.Score",
                "Economy..GDP.per.Capita.",
                "Family",
                "Health..Life.Expectancy.",
                "Freedom",
                "Generosity",
                "Trust..Government.Corruption.",
                "Dystopia.Residual",
            ]
        ][df["Happiness.Rank"].notna()]

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df.to_json(Path(os.getenv("DATA_DIR")) / "happiness.json", orient="records")


if __name__ == "__main__":
    task = HappinessTask()
    task.run()
