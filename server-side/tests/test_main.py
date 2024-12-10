import os
from fastapi.testclient import TestClient
from server_side.main import app

client = TestClient(app)


def test_city():
    response = client.get("/cities")
    assert response.status_code == 200
