from fastapi.testclient import TestClient
from server_side.main import app

client = TestClient(app)


def test_cities_and_countries():
    response = client.get("/cities_and_countries")
    assert response.status_code == 200
