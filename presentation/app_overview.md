# Sign to Migrate - App Overview

## 1. What is this app?

**Sign to Migrate** helps people research which country/city is a good place to live by comparing:
- 💰 Cost of living (rent, food, transportation)
- 😊 Quality of life (happiness, safety, healthcare)
- 💼 Job market (unemployment rates, earnings)
- 🏠 Living conditions (climate, pollution, crime)

## 2. Architecture Overview

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│  Data Sources   │ --> │ Data Pipeline │ --> │  Backend API │
│  (Websites)     │     │   (Python)    │     │  (FastAPI)   │
└─────────────────┘     └──────────────┘     └──────────────┘
                                                      |
                                                      v
                                              ┌──────────────┐
                                              │   Frontend   │
                                              │   (React)    │
                                              └──────────────┘
```

### Components:

#### 1. Data Pipeline (Python + Luigi)
- **What it does**: Collects data from websites about cities
- **Technology**: Python, Luigi (workflow tool), BeautifulSoup (web scraping)
- **Output**: JSON/Parquet files with city data

#### 2. Backend API (Python + FastAPI)  
- **What it does**: Serves data to the frontend
- **Technology**: FastAPI (modern Python web framework)
- **Endpoints**: 
  - `/cities_and_countries` - List all cities
  - `/cost_of_living` - Get living costs
  - `/happiness_qol` - Get quality of life data

#### 3. Frontend (React + TypeScript)
- **What it does**: Shows data in a user-friendly way
- **Technology**: React, TypeScript, Charts
- **Features**: City comparison, cost calculator, rankings

## 3. Development Flow

### For a Junior Python Developer:

#### Step 1: Understand the Data Pipeline
```python
# Example: Luigi task that scrapes cost of living data
class ScrapeCostOfLiving(luigi.Task):
    def run(self):
        # Scrape data from website
        data = scrape_numbeo_data()
        # Save to file
        save_to_json(data)
```

#### Step 2: Work with the API
```python
# Example: FastAPI endpoint
@app.get("/cost_of_living")
def get_cost_of_living(city: str):
    # Read data from file
    data = load_city_data(city)
    # Return to frontend
    return data
```

#### Step 3: Test Your Changes
1. Run data pipeline: `python -m luigi --module tasks ScrapeCostOfLiving`
2. Start backend: `uvicorn main:app --reload`
3. Test API: `http://localhost:8000/cost_of_living?city=Tokyo`

### Common Tasks:

1. **Add new data source**:
   - Create new Luigi task in `data_collection/`
   - Add scraping logic
   - Update master data task

2. **Add new API endpoint**:
   - Create route in `backend/routers/`
   - Add service logic
   - Test with FastAPI docs

3. **Fix data issues**:
   - Check logs in `logs/`
   - Update scraping logic if website changed
   - Re-run pipeline

## 4. Key Files to Know

```
migrate/
├── data_collection/        # Luigi pipeline tasks
│   ├── tasks.py           # Main pipeline
│   └── scrapers/          # Web scraping code
├── backend/
│   ├── main.py            # FastAPI app
│   ├── routers/           # API endpoints
│   └── services/          # Business logic
├── frontend/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   └── components/    # UI components
└── data/                  # Stored city data
```

## 5. Getting Started

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run data pipeline**:
   ```bash
   python -m luigi --module data_collection.tasks AllTasks
   ```

3. **Start backend**:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

4. **View API docs**:
   Open http://localhost:8000/docs

## 6. Tips for Junior Developers

- Start by understanding the data pipeline - it's all Python!
- Use FastAPI's automatic docs to test endpoints
- Luigi shows task dependencies visually
- Check `logs/` when something goes wrong
- The frontend just displays what the API returns

## Example: Adding a New City

1. Add city to `CITIES` list in `data_collection/constants.py`
2. Run the pipeline to collect data
3. Test API returns data for new city
4. Frontend automatically shows it!

---

This app shows how Python can power the entire backend of a modern web application, from data collection to serving APIs. The React frontend is just the presentation layer - all the logic is in Python!