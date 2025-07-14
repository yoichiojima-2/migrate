# Development Guide for Junior Python Developers

## Quick Start Example

Let's walk through a real example: Adding weather data to the app.

### 1. Create a Data Scraper

```python
# data_collection/scrapers/weather_scraper.py
import requests
from bs4 import BeautifulSoup

def scrape_weather_data(city):
    """Scrape average temperature for a city"""
    url = f"https://weather-site.com/{city}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find temperature data
    temp = soup.find('div', class_='avg-temp').text
    return {
        'city': city,
        'avg_temperature': float(temp),
        'unit': 'celsius'
    }
```

### 2. Create a Luigi Task

```python
# data_collection/tasks.py
import luigi
import json

class ScrapeWeatherData(luigi.Task):
    """Task to scrape weather for all cities"""
    
    def output(self):
        return luigi.LocalTarget('data/raw/weather_data.json')
    
    def run(self):
        weather_data = []
        for city in CITIES:
            data = scrape_weather_data(city)
            weather_data.append(data)
        
        # Save to file
        with self.output().open('w') as f:
            json.dump(weather_data, f)
```

### 3. Add API Endpoint

```python
# backend/routers/weather.py
from fastapi import APIRouter
import json

router = APIRouter()

@router.get("/weather/{city}")
def get_weather(city: str):
    """Get weather data for a city"""
    # Load data
    with open('data/processed/weather_data.json') as f:
        data = json.load(f)
    
    # Find city
    city_weather = next(
        (item for item in data if item['city'] == city), 
        None
    )
    
    if not city_weather:
        return {"error": "City not found"}
    
    return city_weather
```

### 4. Register the Router

```python
# backend/main.py
from routers import weather

app.include_router(weather.router, prefix="/api")
```

## Common Patterns

### Pattern 1: Data Pipeline Structure
```
Raw Data → Clean Data → Master Data → Summary Data
```

Each step is a Luigi task that depends on the previous one.

### Pattern 2: API Structure
```
Router (handles HTTP) → Service (business logic) → Data Access
```

### Pattern 3: Error Handling
```python
# Always handle missing data
try:
    data = load_data(city)
except FileNotFoundError:
    return {"error": "Data not available"}
```

## Debugging Tips

### 1. Pipeline Issues
```bash
# Check Luigi task status
python -m luigi --module tasks ScrapeWeatherData --local-scheduler

# View task dependencies
python -m luigi --module tasks AllTasks --local-scheduler
```

### 2. API Issues
```bash
# Test endpoint directly
curl http://localhost:8000/api/weather/Tokyo

# Check API docs
# Open http://localhost:8000/docs in browser
```

### 3. Data Issues
```python
# Quick data check script
import json

with open('data/raw/weather_data.json') as f:
    data = json.load(f)
    print(f"Cities: {len(data)}")
    print(f"Sample: {data[0]}")
```

## Project Structure Explained

```
migrate/
├── data_collection/          # Where you'll spend most time
│   ├── tasks.py             # Luigi pipeline definitions
│   ├── scrapers/            # Web scraping functions
│   │   ├── numbeo.py        # Cost of living scraper
│   │   └── weather.py       # Weather scraper (you create this!)
│   └── constants.py         # City lists, configurations
│
├── backend/                 # FastAPI application
│   ├── main.py             # App setup and configuration
│   ├── routers/            # API endpoints (one file per feature)
│   │   ├── cities.py       # City-related endpoints
│   │   └── weather.py      # Weather endpoints (you create this!)
│   └── services/           # Business logic (optional)
│
├── data/                   # Generated data files
│   ├── raw/               # Direct from scrapers
│   ├── cleaned/           # After cleaning
│   └── processed/         # Ready for API
│
└── logs/                  # Debug here when things break
```

## Step-by-Step Workflow

### Adding a New Feature (e.g., Weather)

1. **Plan the data structure**
   ```python
   {
       "city": "Tokyo",
       "avg_temperature": 16.5,
       "rainfall_days": 120,
       "sunny_days": 200
   }
   ```

2. **Write the scraper**
   - Create `scrapers/weather.py`
   - Test with one city first

3. **Create Luigi task**
   - Add to `tasks.py`
   - Test: `python -m luigi --module tasks ScrapeWeatherData`

4. **Add to master pipeline**
   ```python
   class AllTasks(luigi.Task):
       def requires(self):
           return [
               ExistingTask(),
               ScrapeWeatherData()  # Add here
           ]
   ```

5. **Create API endpoint**
   - New file: `routers/weather.py`
   - Register in `main.py`

6. **Test everything**
   ```bash
   # Run pipeline
   python -m luigi --module tasks AllTasks
   
   # Start API
   cd backend && uvicorn main:app
   
   # Test endpoint
   curl http://localhost:8000/api/weather/Tokyo
   ```

## FAQ for Beginners

**Q: Where do I start if I want to add new data?**
A: Start in `data_collection/scrapers/` - create a function to get your data

**Q: How do I know if my scraper works?**
A: Test it standalone first:
```python
from scrapers.weather import scrape_weather_data
print(scrape_weather_data("Tokyo"))
```

**Q: What if the website I'm scraping changes?**
A: Update your scraper and re-run the pipeline. Check `logs/` for errors.

**Q: How do I add a new city?**
A: Add to `CITIES` list in `data_collection/constants.py`

**Q: Frontend looks complicated, do I need to learn React?**
A: No! Focus on Python. The frontend will automatically use your API data.

## Remember

- You're building the data and API layers - that's where Python shines
- Luigi helps you organize data collection into manageable tasks
- FastAPI makes creating APIs super easy with automatic documentation
- Test each part separately before connecting them
- The frontend is just displaying your Python work!

Happy coding! 🐍