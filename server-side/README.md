# Migration API Server

Minimal FastAPI server that provides migration comparison data.

## Endpoints

- `GET /cities_and_countries` - Get all cities and countries
- `GET /country?city=<city>` - Get country for a specific city
- `GET /happiness_qol?city=<city>` - Get happiness and quality of life data for a city
- `GET /cost_of_living?city=<city>` - Get cost of living data for a city
- `GET /health` - Health check endpoint
- `GET /` - Root endpoint with API info

## Setup

```bash
poetry install
poetry run uvicorn server_side.main:app --reload
```

## Test

```bash
poetry run pytest
```