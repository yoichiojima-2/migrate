class Task:
    def extract(self) -> any:
        raise NotImplementedError

    def transform(self) -> any:
        raise NotImplementedError

    def load(self) -> None:
        raise NotImplementedError

    def run(self) -> None:
        data = self.extract()
        data = self.transform(data)
        self.load(data)
