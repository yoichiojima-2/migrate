import os
from pathlib import Path
from data_collection.happiness import HappinessTask


def test_happiness():
    happiness = HappinessTask()
    df = happiness.extract()
    df = happiness.transform(df)
    happiness.load(df)
    assert (Path(os.getenv("DATA_DIR")) / "happiness.json").exists()