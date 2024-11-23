import os
from pathlib import Path
from dotenv import load_dotenv
import pandas as pd
import kagglehub
from task import Task


class WorldHappiness(Task):
    load_dotenv()

    def _read_and_attatch_year(path: Path) -> pd.DataFrame:
        df = pd.read_csv(path)
        df["Year"] = path.stem
        return df

    def extract(self) -> pd.DataFrame:
        path: str = kagglehub.dataset_download("unsdsn/world-happiness")
        return pd.concat(
            [self._read_and_attatch_year(p) for p in Path(path).glob("*.csv")]
        )

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        return df

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df.to_json(Path(os.getenv("DATA_DIR")) / "cpi.json", orient="records")
