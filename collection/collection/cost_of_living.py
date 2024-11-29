import os
import time
from pathlib import Path
import requests
from bs4 import BeautifulSoup
import pandas as pd
from collection.task import Task
from utils.get_config import get_config


class CostOfLivingTask(Task):
    output_name = "cost_of_living.json"
    cities = get_config()["cities"]

    @staticmethod
    def _scrap(city: str, currency: str = "JPY") -> pd.DataFrame:
        url = f"https://www.numbeo.com/cost-of-living/in/{city}?displayCurrency={currency}"
        print(f"[CostOfLivingTask._scrap] url: {url}")
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
        rows = soup.find("table", {"class": "data_wide_table"}).find_all("tr")
        cost = []
        for row in rows:
            cells = row.find_all("td")
            if len(cells) > 1:
                cost.append(
                    {
                        "item": cells[0].text.strip(),
                        "country": soup.find_all("a", class_="breadcrumb_link")[1].text,
                        "city": city,
                        "currency": currency,
                        "cost": float(cells[1].text.strip().replace("\xa0¥", "").replace(",", "")),
                    }
                )

        request_interval = 4
        print(f"waiting... {request_interval}s")
        time.sleep(request_interval)
        return pd.DataFrame(cost)

    def extract(self) -> pd.DataFrame:
        return pd.concat([self._scrap(city) for city in self.cities])

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        keys = ["item", "country", "city"]
        metrics = ["cost"]
        # just to join other tables. no political statement here
        df["country"] = df["country"].apply(lambda x: "China" if ("Hong Kong" in x) or ("Taiwan" in x) else x)
        return df[[*keys, *metrics]].groupby(keys).mean().reset_index()

    def load(self, df: pd.DataFrame) -> None:
        df.to_json(Path(os.getenv("SIGN_TO_MIGRATE_ROOT")) / f"data/{self.output_name}", orient="records", index=False, indent=2)


if __name__ == "__main__":
    task = CostOfLivingTask()
    task.run()
