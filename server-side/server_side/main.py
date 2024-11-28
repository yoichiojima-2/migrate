import os
from pathlib import Path
from fastapi import FastAPI
import pandas as pd


app = FastAPI()


@app.get("/summary")
def summary(city: str):
    return pd.read_json(
        Path(os.getenv("APP_ROOT")) / f"data/summary_{city}.json"
    ).to_dict(orient="records")
