import os
from pathlib import Path
from data_collection.cpi import CpiTask


def test_cpi():
    cpi = CpiTask()
    df = cpi.extract()
    df = cpi.transform(df)
    cpi.load(df)
    assert (Path(os.getenv("DATA_DIR")) / "cpi.json").exists()