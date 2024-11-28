import os
from fastapi.testclient import TestClient
from server_side.main import app

client = TestClient(app)

def test_summary_valid_city(monkeypatch):
    monkeypatch.setenv("APP_ROOT", os.getenv("APP_ROOT"))
    response = client.get(f"/summary?city=tokyo")
    assert response.status_code == 200