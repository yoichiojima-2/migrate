# Development Guide

## Prerequisites

- Python 3.13+
- Node.js 18+
- Poetry (Python package manager)
- Docker (optional, for containerized deployment)

## Project Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd presentation
```

### 2. Backend Setup
```bash
cd server-side
poetry install
poetry run uvicorn server_side.main:app --reload
```
The API will be available at `http://localhost:8000`

### 3. Frontend Setup
```bash
cd client-side
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`

### 4. Data Pipeline Setup
```bash
cd collection
poetry install
poetry run python -m luigi --module collection.main AllTasks --local-scheduler
```

## Development Workflow

### Adding New Features

1. **New Data Source**
   - Add scraper in `collection/collection/raw/`
   - Add cleaner in `collection/collection/cleanse/`
   - Update Luigi tasks in `collection/collection/main.py`

2. **New API Endpoint**
   - Add endpoint in `server-side/server_side/main.py`
   - Follow the existing pattern for data access

3. **New Frontend Feature**
   - Add components in `client-side/src/components/`
   - Add pages in `client-side/src/pages/`
   - Update routing in `App.tsx`

### Code Style

- **Python**: Follow PEP 8, use `ruff` for linting
- **TypeScript**: Use ESLint configuration provided
- **Commits**: Use conventional commit messages

### Testing

```bash
# Backend tests
cd server-side
poetry run pytest

# Frontend tests
cd client-side
npm run test

# Data pipeline tests
cd collection
poetry run pytest
```

### Building for Production

#### Backend Docker Image
```bash
cd server-side
docker build -t city-data-backend .
docker run -p 8000:8000 city-data-backend
```

#### Frontend Build
```bash
cd client-side
npm run build
# Deploy dist/ folder to your hosting service
```

## API Documentation

When running in development mode, API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Common Tasks

### Update Data
```bash
cd collection
poetry run python -m luigi --module collection.main AllTasks --local-scheduler
```

### Add New City
1. Add city to data sources
2. Run data pipeline
3. Verify in API response

### Debug Data Issues
1. Check raw data in `~/.sign-to-migrate/data/raw/`
2. Check processed data in `~/.sign-to-migrate/data/cleanse/`
3. Check final data in `~/.sign-to-migrate/data/summary/`

## Environment Variables

### Backend
- `DEBUG`: Enable debug mode (default: false)
- `ALLOWED_ORIGINS`: CORS origins (default: ["*"])

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Data Not Updating
1. Check Luigi task logs
2. Verify external data sources are accessible
3. Check file permissions in data directory

### CORS Issues
1. Verify `ALLOWED_ORIGINS` in backend settings
2. Check browser console for specific error
3. Ensure frontend is using correct API URL