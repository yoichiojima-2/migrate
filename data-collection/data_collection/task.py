class Task:
    def extract(self) -> list[dict]:
        raise NotImplementedError

    def transform(self) -> list[dict]:
        raise NotImplementedError

    def load(self) -> None:
        raise NotImplementedError
