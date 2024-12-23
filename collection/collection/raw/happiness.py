from pathlib import Path
import pandas as pd
import kagglehub
from collection.task import Task
from utils.utils import df_to_json


class HappinessTask(Task):
    output_path = "raw/happiness.json"

    @staticmethod
    def _read_and_attatch_year(path: Path) -> pd.DataFrame:
        df = pd.read_csv(path)
        df["Year"] = path.stem
        return df

    def extract(self) -> pd.DataFrame:
        path: str = kagglehub.dataset_download("unsdsn/world-happiness")
        return pd.concat([self._read_and_attatch_year(p) for p in Path(path).glob("*.csv")])

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        # fmt: off
        return (
            df[[
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
            ]]
            [df["Happiness.Rank"].notna()]
            .melt(id_vars=["Country", "Year"], var_name="feature", value_name="value")
            .rename(columns={"Country": "country", "Year": "year"})
        )
        # fmt: on

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = HappinessTask()
    task.run()
