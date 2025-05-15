from pydantic import BaseModel, ConfigDict
from typing import List
from typing import Optional

class DepartmentResponse(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)

class FormationResponse(BaseModel):
    id: int
    name: str
    department_id: int

    model_config = ConfigDict(from_attributes=True)

class StudentCreate(BaseModel):
    name: str
    email: str
    password: str
    age: int
    classe: str
    department_id: int  # Changer formation_id en department_id, basé sur ton modèle SQLAlchemy

class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    age: int
    classe: str
    department_id: int
    department: Optional[DepartmentResponse]  # Déclare 'department' comme optionnel

    model_config = ConfigDict(from_attributes=True)

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    student_id: int

class FormationCreate(BaseModel):
    name: str
    department_id: int

class CourseCreate(BaseModel):
    name: str
    content: str
    formation_id: int 

class CourseResponse(BaseModel):
    id: int
    name: str
    content: str
    formation_id: int  # 👈 Ajouter
    formation: Optional[FormationResponse]  # Si tu veux la formation en détail
    
    model_config = ConfigDict(from_attributes=True)

