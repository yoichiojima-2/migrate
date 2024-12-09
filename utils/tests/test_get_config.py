import pandas as pd
from utils.utils import get_config, get_root, df_to_json


def test_get_config():
    assert get_config()

def test_get_root():
    assert get_root()

def test_df_to_json():
    df = pd.DataFrame([{"test": "data"}])
    df_to_json(df, "test.json")
    assert (get_root() / "data/test.json").exists()
    (get_root() / "data/test.json").unlink()
    try:
        df_to_json(df, "test.csv")
    except ValueError as e:
        assert "output path must be a json" in str(e)