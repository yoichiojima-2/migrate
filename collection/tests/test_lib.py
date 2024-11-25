import os
from pathlib import Path
from collection.task import Task


def run_and_check_output(task_class: Task, output_name: str):
    task_class().run()
    output = Path(os.getenv("APP_ROOT")) / f"data/{output_name}"
    assert output.exists()
