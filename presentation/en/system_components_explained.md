# System Components Explained (For Data Scientists)

## Overview
This city data comparison platform is like a research paper that automatically updates itself. Instead of manually collecting data, cleaning it, and creating visualizations, we built a system that does this automatically and presents results through a web interface.

## The Four Main Components

### 1. Collection (Data Pipeline)
**What it is:** The data collection and processing engine
**Think of it as:** Your research assistant that gathers data from multiple sources, cleans it, and organizes it for analysis

**What it does:**
- Automatically collects data from various sources (Numbeo, Kaggle, weather APIs)
- Cleans and standardizes the data (like your data preprocessing steps)
- Saves processed data in a structured format (JSON files)
- Runs on a schedule to keep data fresh

**Why we need it:** Instead of manually downloading and cleaning data every time, this component automates the entire data preparation process.

### 2. Server-side (Backend API)
**What it is:** The data server that provides information to the web interface
**Think of it as:** A librarian that knows exactly where to find specific data and delivers it when requested

**What it does:**
- Receives requests for specific data (e.g., "Show me cost of living for Tokyo vs New York")
- Retrieves the relevant data from processed files
- Formats and returns the data in a standardized way
- Handles multiple simultaneous requests efficiently

**Why we need it:** The web interface needs a way to request specific data. This component acts as the bridge between your data files and the user interface.

### 3. Client-side (Frontend Web Interface)
**What it is:** The interactive web application that users see and interact with
**Think of it as:** Your research presentation, but interactive and always up-to-date

**What it does:**
- Displays data in charts, tables, and visualizations
- Allows users to select different cities for comparison
- Provides interactive controls (dropdowns, buttons, filters)
- Makes the data accessible to non-technical users

**Why we need it:** Raw data files aren't user-friendly. This component makes your data accessible to anyone through a web browser, like creating an interactive dashboard for your research.

### 4. Utils (Shared Utilities)
**What it is:** Common functions and tools used by other components
**Think of it as:** Your personal library of frequently-used functions and utilities

**What it does:**
- Provides configuration management
- Contains helper functions used across different components
- Ensures consistency across the entire system

**Why we need it:** Prevents code duplication and ensures all components use the same configuration and utilities.

## How They Work Together

```
Data Sources → Collection → Server-side → Client-side → User
     ↓              ↓            ↓           ↓
  Raw data → Clean data → API responses → Visualizations
```

1. **Collection** automatically gathers and processes data from external sources
2. **Server-side** serves this processed data when requested
3. **Client-side** requests data and presents it as interactive visualizations
4. **Utils** supports all components with shared functionality

## Real-World Analogy
Think of this system like an automated research lab:

- **Collection** = Research assistants who gather data from libraries and surveys
- **Server-side** = Data analysts who organize and retrieve specific information when asked
- **Client-side** = The presentation room where findings are displayed with charts and graphs
- **Utils** = The lab's shared equipment and protocols that everyone uses

## Benefits for Data Scientists
- **Automation:** No more manual data collection and cleaning
- **Scalability:** Easy to add new data sources or cities
- **Reproducibility:** Same process runs consistently every time
- **Accessibility:** Your analysis is available to anyone with a web browser
- **Real-time:** Data stays current without manual intervention

## Technical Translation
If you're curious about the technical details:
- **Collection** uses Luigi (like Apache Airflow) for pipeline orchestration
- **Server-side** uses FastAPI (like Flask but faster) for the web API
- **Client-side** uses React (like Shiny for R, but for web applications)
- **Utils** is standard Python modules for shared functionality

This system essentially automates the entire data science workflow from collection to presentation, making your research continuously available and up-to-date.