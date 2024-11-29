import os
from pathlib import Path
import pandas as pd


def cleanse():
    # fmt: off
    (
        pd.read_json(f"{os.getenv('SIGN_TO_MIGRATE_ROOT')}/data/cost_of_living.json")
        .pivot(index=["city", "country"], columns="item", values="cost")
        .reset_index()
        .to_json(
            Path(os.getenv("SIGN_TO_MIGRATE_ROOT")) / "data/cost_of_living_cleansed.json",
            orient="records",
            index=False,
        )
    )
    # fmt: on


if __name__ == "__main__":
    cleanse()
