# Migrate

Compare cities before you move. A full-stack web app that puts quality-of-life, cost-of-living, and happiness data for 24 cities worldwide side by side.

**Live demo**: [yoichiojima-2.github.io/migrate](https://yoichiojima-2.github.io/migrate/)

## Features

- **City comparison** — side-by-side view of two cities across all indicators
- **Quality of life** — safety, healthcare, pollution, climate, purchasing power
- **Cost of living** — housing, groceries, transport, and more, with per-item charts
- **Country rankings** — sortable rankings by metric
- **24 cities** — Tokyo, London, New York, Singapore, Berlin, Paris, Seoul, and more

## Architecture

```
collection/  ──►  assets/ (JSON)  ──►  server-side/  ──►  client-side/
Luigi ETL         versioned data       FastAPI on          React SPA on
pipeline                               Cloud Run           GitHub Pages
```

- **`client-side/`** — React + TypeScript SPA (Vite, Tailwind CSS, Chart.js). Fetches comparison data from the API with client-side caching and retry logic. Deployed to GitHub Pages via GitHub Actions.
- **`server-side/`** — FastAPI service (Python, pandas) exposing city/country lookups and comparison endpoints (`/happiness_qol`, `/cost_of_living`). Containerized and deployed to Google Cloud Run.
- **`collection/`** — Luigi-orchestrated data pipeline: raw extraction → cleansing → summary stages, writing JSON snapshots consumed by the API.
- **`utils/`** — shared Python helpers (config and data-directory handling).

### Data sources

Numbeo (cost of living, crime, quality of life), the World Happiness Report (via Kaggle), World Bank (CPI), ILOSTAT (labour indicators), and NASA POWER (climate).

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Chart.js |
| Backend | Python 3.13, FastAPI, pandas, Poetry |
| Data pipeline | Luigi, BeautifulSoup, kagglehub |
| Infrastructure | Docker, GitHub Pages, Google Cloud Run |
| CI/CD | GitHub Actions (tests + Pages deploy) |

## Running locally

### Full stack with Docker

```bash
docker compose up
```

- Frontend: http://localhost:5173
- API: http://localhost:8000 (docs at `/docs`)

### Frontend only

```bash
cd client-side
npm install
npm run dev
```

The frontend points at the deployed API by default, so this works without running the backend.

### Python environment (tests, pipeline)

```bash
make venv       # create a virtualenv with all Python packages
make test       # run test suites for utils, collection, server-side
make collect    # run the data-collection pipeline and refresh assets/
```

## License

[MIT](LICENSE)
