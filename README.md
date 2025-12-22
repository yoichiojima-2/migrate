# Migrate

A web app for comparing cities when considering relocation. Compare quality of life, cost of living, and other socioeconomic indicators across 24+ cities worldwide.

**Live Demo**: [yoichiojima-2.github.io/migrate](https://yoichiojima-2.github.io/migrate/)

## Features

- **City Comparison**: Side-by-side comparison of two cities
- **Quality of Life**: Safety, healthcare, environment, and more
- **Cost of Living**: Housing, groceries, transportation costs
- **Country Rankings**: Sortable rankings by various metrics
- **24+ Cities**: Tokyo, London, New York, Singapore, Berlin, and more

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite |
| Backend | Python |
| Data | Numbeo API, World Bank data |
| Deployment | GitHub Pages, Docker |
| CI/CD | GitHub Actions |

## Quick Start

```bash
# Frontend
cd client-side
npm install
npm run dev

# Backend (optional, for data collection)
cd server-side
pip install -r requirements.txt
python main.py
```

## Project Structure

```
migrate/
├── client-side/          # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route pages
│   │   ├── context/      # React context providers
│   │   └── hooks/        # Custom hooks
│   └── public/
├── server-side/          # Python backend
├── collection/           # Data collection scripts
├── assets/               # Static assets
└── docker-compose.yml    # Container setup
```

## Available Cities

Tokyo, London, New York, Singapore, Hong Kong, Berlin, Paris, Amsterdam, Barcelona, Stockholm, Copenhagen, Oslo, Dublin, Brisbane, Manchester, Bristol, Glasgow, Mumbai, Bangkok, Kuala Lumpur, Taipei, Shanghai, Seattle, Seoul

## Development

```bash
# Run frontend with hot reload
cd client-side && npm run dev

# Build for production
npm run build

# Run with Docker
docker compose up
```

## License

MIT
