from fastapi.testclient import TestClient
from server_side.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data

def test_cities_and_countries():
    response = client.get("/cities_and_countries")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:
        assert "city" in data[0]
        assert "country" in data[0]
