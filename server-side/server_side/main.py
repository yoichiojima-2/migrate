from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.get_config import get_config


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/cities")
def cities() -> list[str]:
    return get_config().get("cities")
