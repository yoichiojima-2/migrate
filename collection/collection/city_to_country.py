import json
import pandas as pd
from utils.utils import get_data_dir, df_to_json


def main():
    output_path = get_data_dir() / "global/city_to_country.json"

    df = pd.read_json(get_data_dir() / "raw/cost_of_living.json")

    mapping_df = (
        df[["country", "city"]]
        .drop_duplicates()
    )

    mapping_df["country"] = mapping_df["country"].str.lower()
    mapping_df["city"] = mapping_df["city"].str.lower()

    mapping = (
        mapping_df
        .set_index("city")
        .to_dict()
        ["country"]
    )

    with open(output_path, "w") as f:
        json.dump(mapping, f, indent=2)

    print(f"[city_to_country] saved: {output_path}")


if __name__ == "__main__":
    main()
