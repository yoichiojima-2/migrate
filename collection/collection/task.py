import luigi
from abc import ABC, abstractmethod
from utils.utils import get_data_dir


class Task(ABC):
    @property
    @abstractmethod
    def output_path(self) -> str:...

    @abstractmethod
    def extract(self) -> any:...

    @abstractmethod
    def transform(self) -> any:...

    @abstractmethod
    def load(self) -> None:...

    def run(self) -> None:
        data = self.extract()
        data = self.transform(data)
        self.load(data)

    def output(self) -> luigi.LocalTarget:
        return luigi.LocalTarget(get_data_dir() / self.output_path)