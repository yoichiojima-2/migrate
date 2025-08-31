"""
Utilities module - provides common utility functions.
"""

import json
import os
from pathlib import Path
import pandas as pd
import yaml


def get_root():
    """Get the root directory of the project."""
    # When installed in a virtualenv, we need to find the actual project root
    # Look for the main directory that contains config.yml
    current = Path.cwd()
    
    # First try current working directory and its parents
    test_path = current
    for _ in range(5):  # Check up to 5 levels up
        if (test_path / "config.yml").exists() or (test_path / "config.yaml").exists():
            return test_path
        if test_path.parent == test_path:
            break
        test_path = test_path.parent
    
    # Fallback to hardcoded path if we know the structure
    # This assumes we're running from collection directory
    main_path = Path("/Users/yo/Developer/repo/migrate/main")
    if main_path.exists():
        return main_path
    
    # Last resort - return current directory
    return current


def get_data_dir():
    """Get the data directory path."""
    root = get_root()
    data_dir = root / "data"
    data_dir.mkdir(exist_ok=True)
    return data_dir


def get_config():
    """Load configuration from config.yml or config.yaml."""
    root = get_root()
    
    # Try config.yml first, then config.yaml
    for config_name in ["config.yml", "config.yaml"]:
        config_path = root / config_name
        if config_path.exists():
            with open(config_path, 'r') as f:
                return yaml.safe_load(f)
    
    # Return empty config if file doesn't exist
    return {}


def read_json(filepath):
    """Read JSON file and return data."""
    with open(filepath, 'r') as f:
        return json.load(f)


def write_json(data, filepath):
    """Write data to JSON file."""
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)


def df_to_json(df, filepath):
    """Convert DataFrame to JSON and save to file."""
    # Convert DataFrame to JSON format
    df.to_json(filepath, orient='records', indent=2)


__all__ = [
    'get_root',
    'get_data_dir', 
    'get_config',
    'read_json',
    'df_to_json',
    'write_json',
]
