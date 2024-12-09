import os
from pathlib import Path
from collection.task import Task
from utils.utils import read_json


def run_and_check_output(task_class: Task, output_path: str):
    task_class().run()
    output = read_json(output_path)
    assert len(output)
