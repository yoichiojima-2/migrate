import os
import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # todo: replace with the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/summary")
def summary(city: str):
    return json.load((Path(os.getenv("SIGN_TO_MIGRATE_ROOT")) / f"data/summary_{city}.json").open())
