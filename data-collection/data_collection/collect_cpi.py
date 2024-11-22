import requests
import pandas as pd
import sqlite3

API_URL = "https://api.worldbank.org/v2/country/all/indicator/FP.CPI.TOTL"
DB_NAME = "dataset.db"
TABLE_NAME = "cpi"

PARAMS = {
    "format": "json",
    "date": "2010:2024",
    "per_page": 10000,
}


def fetch_cpi_data(api_url, params):
    """Fetch CPI data from the World Bank API."""
    response = requests.get(api_url, params=params)
    if response.status_code == 200:
        data = response.json()
        return data[1]  # Extract records part
    else:
        raise RuntimeError(f"Failed to fetch data: {response.status_code}")


def clean_cpi_data(raw_data):
    """Clean and preprocess the raw CPI data."""
    df = pd.DataFrame(raw_data)

    # Filter rows with non-null CPI values
    df = df[pd.notna(df["value"])]

    # Extract country information
    df["country_name"] = df["country"].apply(lambda x: x["value"])
    df["country_id"] = df["country"].apply(lambda x: x["id"])

    # Select relevant columns
    df = df[["countryiso3code", "country_name", "date", "value"]]
    return df


def save_to_sqlite(df, db_name, table_name):
    """Save the DataFrame to an SQLite database."""
    with sqlite3.connect(db_name) as conn:
        # Write DataFrame to SQLite
        df.to_sql(table_name, conn, if_exists="replace", index=False)
        print(f"Data saved to {db_name}, table: {table_name}")

        # Optional: Verify the first few rows
        verify_df = pd.read_sql(f"SELECT * FROM {table_name} LIMIT 5;", conn)
        print("Sample data from database:")
        print(verify_df)


def main():
    """Main function to orchestrate the workflow."""
    try:
        print("Fetching data...")
        raw_data = fetch_cpi_data(API_URL, PARAMS)

        print("Cleaning data...")
        clean_data = clean_cpi_data(raw_data)

        print("Saving data to SQLite...")
        save_to_sqlite(clean_data, DB_NAME, TABLE_NAME)

        print("Process completed successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")


# Run the main function
if __name__ == "__main__":
    main()
