import os
import time
from pathlib import Path
import requests
from bs4 import BeautifulSoup
import pandas as pd
from collection.task import Task
from utils.get_config import get_config


class QuolityOfLifeTask(Task):
    output_name = "quolity_of_life.json"
    cities = get_config()["cities"]

    @staticmethod
    def _scrap(city: str) -> pd.DataFrame:
        url = f"https://www.numbeo.com/quality-of-life/in/{city}"
        print(f"[QuolityOfLifeTask._scrap] url: {url}")
        response = requests.get(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.122 Safari/537.36"
            },
        )
        if response.status_code != 200:
            print("status code:", response.status_code)
            print("response headers:", response.headers)
            print("response content:", response.text)
            raise RuntimeError("Failed to fetch data")

        soup = BeautifulSoup(response.text, "html.parser")
        tables = soup.find_all("table")
        qol_table = tables[1]
        other_metrics_tables = tables[2]
        data = []

        for row in other_metrics_tables.find_all("tr"):
            cells = row.find_all("td")
            if len(cells) > 1:
                data.append(
                    {
                        "feature": cells[0].text.strip().replace("\u0192", "").replace("\u00a0", ""),
                        "country": soup.find_all("a", class_="breadcrumb_link")[1].text,
                        "city": city,
                        "value": float(cells[1].text.strip()),
                    }
                )

        request_interval = 4
        print(f"waiting... {request_interval}s")
        time.sleep(request_interval)
        return pd.DataFrame(data)

    def extract(self) -> pd.DataFrame:
        return pd.concat([self._scrap(city) for city in self.cities])

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        keys = ["feature", "country", "city"]
        metrics = ["value"]
        # just to join other tables. no political statement here
        df["country"] = df["country"].apply(lambda x: "China" if ("Hong Kong" in x) or ("Taiwan" in x) else x)
        return df[[*keys, *metrics]].groupby(keys).mean().reset_index()

    def load(self, df: pd.DataFrame) -> None:
        df.to_json(
            Path(os.getenv("SIGN_TO_MIGRATE_ROOT")) / f"data/{self.output_name}", orient="records", index=False, indent=2
        )


if __name__ == "__main__":
    task = QuolityOfLifeTask()
    task.run()
