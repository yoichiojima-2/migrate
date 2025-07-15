# City Data Comparison Platform - Architecture Overview

## System Architecture

```mermaid
graph TB
    subgraph "Frontend"
        UI[React + TypeScript]
        Pages[Pages<br/>- Home<br/>- Comparison<br/>- Cost of Living<br/>- Quality of Life]
        Viz[Chart.js<br/>Data Visualization]
        
        UI --> Pages
        UI --> Viz
    end
    
    subgraph "Backend API"
        FastAPI[FastAPI Server]
        Endpoints[API Endpoints<br/>- /cities_and_countries<br/>- /cost_of_living<br/>- /happiness_qol<br/>- /country]
        
        FastAPI --> Endpoints
    end
    
    subgraph "Data Layer"
        JSON[(JSON Files<br/>- cost_of_living.json<br/>- happiness_qol.json<br/>- city_and_country.json)]
    end
    
    subgraph "Data Pipeline"
        Luigi[Luigi Orchestrator]
        Tasks[Pipeline Tasks<br/>- Raw Data Collection<br/>- Data Cleansing<br/>- Data Summary]
        
        Luigi --> Tasks
    end
    
    subgraph "Data Sources"
        External[External Sources<br/>- Numbeo<br/>- Kaggle<br/>- Weather APIs]
    end
    
    UI -->|HTTP/REST| FastAPI
    FastAPI -->|Read| JSON
    Tasks -->|Write| JSON
    Tasks -->|Scrape/Fetch| External
    
    style UI fill:#e3f2fd
    style FastAPI fill:#fff3e0
    style Luigi fill:#f3e5f5
    style JSON fill:#e8f5e9
```

## Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Chart.js + react-chartjs-2** - Data visualization
- **Tailwind CSS 4** - Styling
- **React Router 7** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Python 3.13** - Runtime
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Pandas** - Data manipulation
- **Poetry** - Dependency management

### Data Pipeline
- **Luigi** - Task orchestration
- **BeautifulSoup4** - Web scraping
- **Requests** - HTTP requests
- **Pandas** - Data processing
- **scikit-learn** - Data analysis

### Infrastructure
- **Docker** - Containerization
- **Git + GitHub** - Version control

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant DataFiles
    participant Pipeline
    participant Sources
    
    Note over Pipeline,Sources: Periodic Data Collection
    Pipeline->>Sources: Fetch latest data
    Sources-->>Pipeline: Raw data
    Pipeline->>Pipeline: Clean & transform
    Pipeline->>DataFiles: Save as JSON
    
    Note over User,DataFiles: User Request Flow
    User->>Frontend: Select cities to compare
    Frontend->>Backend: GET /cost_of_living?city1=X&city2=Y
    Backend->>DataFiles: Read JSON files
    DataFiles-->>Backend: Data
    Backend-->>Frontend: Formatted response
    Frontend->>Frontend: Render charts
    Frontend-->>User: Display comparison
```

## Key Features

1. **Multi-city Comparison** - Compare cost of living, quality of life, and happiness metrics
2. **Real-time Data Visualization** - Interactive charts using Chart.js
3. **Automated Data Updates** - Luigi pipeline collects fresh data periodically
4. **RESTful API** - Clean API design with FastAPI
5. **Type Safety** - TypeScript frontend with Python type hints

## Project Structure

```
presentation/
├── client-side/          # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Route pages
│   │   ├── services/     # API integration
│   │   └── types/        # TypeScript types
│   └── package.json
├── server-side/          # FastAPI backend
│   ├── server_side/
│   │   └── main.py       # API endpoints
│   ├── Dockerfile
│   └── pyproject.toml
├── collection/           # Data pipeline
│   ├── collection/
│   │   ├── raw/          # Data fetching
│   │   ├── cleanse/      # Data cleaning
│   │   ├── summary/      # Data aggregation
│   │   └── main.py       # Luigi tasks
│   └── pyproject.toml
└── utils/                # Shared utilities
```