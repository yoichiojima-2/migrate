import os
from pathlib import Path

import pandas as pd
import yaml


def get_root() -> Path:
    # this is just too handy
    return Path(os.getenv("SIGN_TO_MIGRATE_ROOT"))


def get_config() -> dict[str, any]:
    return yaml.safe_load((get_root() / "config.yml").open())


def df_to_json(df: pd.DataFrame, path: str) -> None:
    output_path = get_root() / f"data/{path}"

    if not output_path.suffix == ".json":
        raise ValueError(f"output path must be a json: {output_path}")

    df.to_json(output_path, orient="records", index=False, indent=2)
    print(f"Dataframe saved to {output_path}")