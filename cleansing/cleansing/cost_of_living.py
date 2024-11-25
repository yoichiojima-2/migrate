import os
from pathlib import Path
import pandas as pd

def cleanse():
    df = pd.read_json(f"{os.getenv('DATA_DIR')}/cost_of_living.json")
    df = df.pivot(index = "city", columns = "item", values = "cost")
    df.to_json(Path(os.getenv("DATA_DIR")) / "cost_of_living_cleansed.json", orient="records", index=False)

if __name__ == "__main__":
    cleanse()