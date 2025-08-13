"""
Refactored FastAPI application with layered architecture.

This replaces the original 83-line main.py with a clean, maintainable
layered architecture including proper error handling, validation,
and separation of concerns.
"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from contextlib import asynccontextmanager

from .core import settings, APIError
from .api import cities_router, comparison_router
from .services import CityService, ComparisonService


# Configure logging
logging.basicConfig(
    level=logging.INFO if not settings.debug else logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""

    # Startup
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"Data directory: {settings.data_dir}")

    # Warm up caches
    try:
        city_service = CityService()
        cities = city_service.get_all_cities()
        logger.info(f"Loaded {len(cities)} cities")
    except Exception as e:
        logger.error(f"Failed to load cities: {e}")

    yield

    # Shutdown
    logger.info("Shutting down application")


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""

    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="API for migration comparison data",
        lifespan=lifespan,
        docs_url="/docs" if settings.debug else None,
        redoc_url="/redoc" if settings.debug else None,
    )

    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=settings.allow_credentials,
        allow_methods=settings.allowed_methods,
        allow_headers=settings.allowed_headers,
    )

    # Add routers
    app.include_router(cities_router)
    app.include_router(comparison_router)

    # Legacy endpoints for backward compatibility
    add_legacy_endpoints(app)

    # Add exception handlers
    add_exception_handlers(app)

    return app


def add_legacy_endpoints(app: FastAPI):
    """Add legacy endpoints for backward compatibility."""

    @app.get("/cities_and_countries")
    async def legacy_cities_and_countries():
        """Legacy endpoint for cities and countries."""
        city_service = CityService()
        cities = city_service.get_all_cities()
        return [{"city": city.city, "country": city.country} for city in cities]

    @app.get("/country")
    async def legacy_country(city: str):
        """Legacy endpoint for country lookup."""
        city_service = CityService()
        country = city_service.get_country_by_city(city.lower().strip())
        return {"country": country}

    @app.get("/happiness_qol")
    async def legacy_happiness_qol(city: str):
        """Legacy endpoint for happiness and QOL data."""
        comparison_service = ComparisonService()
        data = comparison_service.get_happiness_qol_comparison(city.lower().strip())
        return [item.dict() for item in data]

    @app.get("/cost_of_living")
    async def legacy_cost_of_living(city: str):
        """Legacy endpoint for cost of living data."""
        comparison_service = ComparisonService()
        data = comparison_service.get_cost_of_living_comparison(city.lower().strip())
        return [item.dict() for item in data]


def add_exception_handlers(app: FastAPI):
    """Add custom exception handlers."""

    @app.exception_handler(APIError)
    async def api_error_handler(request: Request, exc: APIError):
        """Handle API errors."""
        logger.error(f"API Error: {exc.detail}")
        return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        """Handle HTTP exceptions."""
        logger.error(f"HTTP Error: {exc.detail}")
        return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        """Handle unexpected exceptions."""
        logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
        return JSONResponse(
            status_code=500, content={"detail": "Internal server error"}
        )


# Create the application instance
app = create_app()


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "version": settings.app_version}


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": f"Welcome to {settings.app_name}",
        "version": settings.app_version,
        "docs": "/docs" if settings.debug else "Docs disabled in production",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "server_side.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="info",
    )
