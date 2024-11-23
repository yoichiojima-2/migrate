import pandas as pd
import kagglehub


def read_and_attatch_year(path: Path) -> pd.DataFrame:
    df = pd.read_csv(path)
    df["Year"] = path.stem
    return df


path: str = kagglehub.dataset_download("unsdsn/world-happiness")
happiness_df = pd.concat([read_and_attatch_year(p) for p in Path(path).glob("*.csv")])
