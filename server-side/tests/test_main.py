import os
from fastapi.testclient import TestClient
from server_side.main import app

client = TestClient(app)


def test_summary(monkeypatch):
    monkeypatch.setenv("SIGN_TO_MIGRATE_ROOT", os.getenv("SIGN_TO_MIGRATE_ROOT"))
    response = client.get("/summary?city=tokyo")
    assert response.status_code == 200
