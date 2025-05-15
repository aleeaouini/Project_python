from fastapi.testclient import TestClient
from main import app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base, SessionLocal
import models
from unittest.mock import MagicMock
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
client = TestClient(app)
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
app.dependency_overrides[SessionLocal] = override_get_db
def test_add_student():
    student_data = {
        "name": "Johhn Doe",
        "email": "johhn.doe@example.com",
        "password": "securepassword",
        "age": kk,
        "classe": "A",
        "formation_id": 1
    }
    response = client.post("/students", json=student_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == student_data["name"]
    assert data["email"] == student_data["email"]
    assert data["age"] == student_data["age"]
    assert data["classe"] == student_data["classe"]
    assert "id" in data
