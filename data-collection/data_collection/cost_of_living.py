import os
from pathlib import Path
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import pandas as pd
from data_collection.task import Task


class CostOfLivingTask(Task):
    load_dotenv()

    @staticmethod
    def _scrap(city: str, currency: str = "JPY") -> pd.DataFrame:
        url = f"https://www.numbeo.com/cost-of-living/in/{city}?displayCurrency={currency}"
        # fmt: off
        headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.122 Safari/537.36"}
        # fmt: on
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, "html.parser")

        table = soup.find("table", {"class": "data_wide_table"})
        rows = table.find_all("tr")

        cost = []
        for row in rows:
            cells = row.find_all("td")
            if len(cells) > 1:
                cost.append(
                    {"item": cells[0].text.strip(), "cost": float(cells[1].text.strip().replace("\xa0¥", "").replace(",", ""))}
                )

        return pd.DataFrame(cost)

    def extract(self) -> pd.DataFrame:
        cities = ["Tokyo", "London", "New-York", "Brisbane", "Bristol", "Manchester"]
        return pd.concat([self._scrap(city) for city in cities])

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        return df

    def load(self, df: pd.DataFrame) -> pd.DataFrame:
        df.to_json(Path(os.getenv("DATA_DIR")) / "cost_of_living.json", orient="records")
