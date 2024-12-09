import os
from pathlib import Path

import pandas as pd
import yaml


def get_root() -> Path:
    # this is just too handy
    return Path().home() / ".sign-to-migrate"


def get_config() -> dict[str, any]:
    return yaml.safe_load((get_root() / "config.yml").open())


def _get_data_dir() -> Path:
    return get_root() / "data"


def json_to_df(path: str) -> None:
    path = _get_data_dir() / path

    if not path.suffix == ".json":
        raise ValueError(f"output path must be a json: {path}")

    return pd.read_json(path)


def df_to_json(df: pd.DataFrame, path: str) -> None:
    path = _get_data_dir() / path

    if not path.suffix == ".json":
        raise ValueError(f"output path must be a json: {path}")

    df.to_json(path, orient="records", index=False, indent=2)
    print(f"[df_to_json] saved: {path}")
