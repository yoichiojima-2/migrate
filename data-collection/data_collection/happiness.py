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
        # fmt: off
        return pd.concat([self._read_and_attatch_year(p) for p in Path(path).glob("*.csv")])

        # fmt: on

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        return df.rename(columns={"Country or region": "country", "Year": "year"})

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df.to_json(Path(os.getenv("DATA_DIR")) / "happiness.json", orient="records")


if __name__ == "__main__":
    task = HappinessTask()
    task.run()
