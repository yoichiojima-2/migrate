import os
import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.get_config import get_config


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # todo: replace with the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app_root = Path(os.getenv("SIGN_TO_MIGRATE_ROOT"))

@app.get("/cities")
def cities() -> list[str]:
    return get_config().get("cities")

@app.get("/summary")
def summary(city: str):
    return json.load((app_root / f"data/summary_{city}.json").open())