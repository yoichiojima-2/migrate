from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from pathlib import Path
from typing import List, Dict, Any

app = FastAPI(title="Migration API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data directory path - check both local and container paths
DATA_DIR = "/.migrate/assets"

def load_json_data(filename: str) -> List[Dict[str, Any]]:
    """Load JSON data from data directory."""
    file_path = os.path.join(DATA_DIR, filename)
    print(file_path)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Data file not found: {filename}")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail=f"Invalid JSON in file: {filename}")

@app.get("/cities_and_countries")
async def get_cities_and_countries():
    """Get all cities and countries."""
    try:
        data = load_json_data("master/city_and_country.json")
        return [{"city": item["city"], "country": item["country"]} for item in data]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/country")
async def get_country(city: str):
    """Get country for a specific city."""
    city = city.lower().strip()
    try:
        data = load_json_data("master/city_and_country.json")
        for item in data:
            if item["city"].lower() == city:
                return {"country": item["country"]}
        raise HTTPException(status_code=404, detail=f"City not found: {city}")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/happiness_qol")
async def get_happiness_qol(city: str):
    """Get happiness and quality of life data."""
    city = city.lower().strip()
    try:
        data = load_json_data("summary/happiness_qol.json")
        result = [item for item in data if item.get("city", "").lower() == city]
        if not result:
            raise HTTPException(status_code=404, detail=f"No data found for city: {city}")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/cost_of_living")
async def get_cost_of_living(city: str):
    """Get cost of living data."""
    city = city.lower().strip()
    try:
        data = load_json_data("summary/cost_of_living.json")
        result = [item for item in data if item.get("city", "").lower() == city]
        if not result:
            raise HTTPException(status_code=404, detail=f"No data found for city: {city}")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Migration API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server_side.main:app", host="0.0.0.0", port=8000, reload=True)
