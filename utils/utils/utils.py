"""
Utilities module - main entry point.

This module provides backward compatibility while offering enhanced functionality
through the new modular design.
"""

# Backward compatibility imports
from .config import get_root, get_data_dir, get_config
from .io import read_json, df_to_json, write_json
from .validation import DataValidator, CityDataValidator, ValidationError

# New enhanced functionality
from .config import ConfigManager, get_config_manager
from .io import (
    read_json_file, 
    write_json_file, 
    read_dataframe_from_json, 
    write_dataframe_to_json
)

__all__ = [
    # Backward compatibility
    'get_root',
    'get_data_dir', 
    'get_config',
    'read_json',
    'df_to_json',
    'write_json',
    
    # Enhanced functionality
    'ConfigManager',
    'get_config_manager',
    'read_json_file',
    'write_json_file',
    'read_dataframe_from_json',
    'write_dataframe_to_json',
    'DataValidator',
    'CityDataValidator',
    'ValidationError'
]
