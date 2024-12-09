from utils.utils import read_json, df_to_json


def cleanse_cost_of_living():
    # fmt: off
    df = (
        read_json("raw/cost_of_living.json")
        .pivot(index=["city", "country"], columns="feature", values="value")
        .reset_index()
    )
    df_to_json(df, "interim/cleanse_cost_of_living.json")
    # fmt: on


if __name__ == "__main__":
    cleanse_cost_of_living()
