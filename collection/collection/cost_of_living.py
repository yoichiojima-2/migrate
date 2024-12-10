import time
import requests
from bs4 import BeautifulSoup
import pandas as pd
from collection.task import Task
from utils.utils import get_config, df_to_json


class CostOfLivingTask(Task):
    output_path = "raw/cost_of_living.json"

    @staticmethod
    def get_soup(city: str, currency: str = "JPY") -> BeautifulSoup:
        url = f"https://www.numbeo.com/cost-of-living/in/{city}?displayCurrency={currency}"
        print(f"[CostOfLivingTask.get_soup] url: {url}")
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

        return BeautifulSoup(response.text, "html.parser")

    def scrap(self, city: str, currency: str = "JPY") -> pd.DataFrame:
        soup = self.get_soup(city, currency)
        rows = soup.find("table", {"class": "data_wide_table"}).find_all("tr")
        cost = []
        for row in rows:
            cells = row.find_all("td")
            if len(cells) > 1:
                cost.append(
                    {
                        "feature": cells[0].text.strip(),
                        "country": soup.find_all("a", class_="breadcrumb_link")[1].text,
                        "city": city,
                        "currency": currency,
                        "value": float(cells[1].text.strip().replace("\xa0¥", "").replace(",", "")),
                    }
                )

        request_interval = 1
        time.sleep(request_interval)
        return pd.DataFrame(cost)

    def extract(self) -> pd.DataFrame:
        return pd.concat([self.scrap(city) for city in get_config()["cities"]])

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        keys = ["feature", "country", "city"]
        return (
            df[[*keys, "value"]]
            .groupby(keys)
            .mean()
            .reset_index()
        )

    def load(self, df: pd.DataFrame) -> None:
        df_to_json(df, self.output_path)


if __name__ == "__main__":
    task = CostOfLivingTask()
    task.run()
