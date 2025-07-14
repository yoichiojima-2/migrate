from pathlib import Path
import json

import pandas as pd
import yaml


def get_root() -> Path:
    # this is just too handy
    return Path().home() / ".sign-to-migrate"


def get_config() -> dict[str, any]:
    return yaml.safe_load((get_root() / "config.yml").open())


def get_data_dir() -> Path:
    return get_root() / "data"


def read_json(path: str) -> None:
    output_path = get_data_dir() / path

    if not output_path.suffix == ".json":
        raise ValueError(f"output path must be a json: {path}")

    return pd.read_json(output_path)


def df_to_json(df: pd.DataFrame, path: str) -> None:
    output_path = get_data_dir() / path

    if not output_path.suffix == ".json":
        raise ValueError(f"output path must be a json: {path}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_json(output_path, orient="records", index=False, indent=2)
    print(f"[df_to_json] saved: {output_path}")


def write_json(data: any, path: str) -> None:
    output_path = get_data_dir() / path
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(data, f, indent=2)

    print(f"[write_json] saved: {output_path}")
