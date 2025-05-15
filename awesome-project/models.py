from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy import Column, Integer, String, Float
from pydantic import BaseModel


class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    age = Column(Integer)
    classe = Column(String)
    department_id = Column(Integer, ForeignKey("departments.id"))  # Ajout de department_id pour référencer le département

    department = relationship("Department", back_populates="students")  # Relation avec le département

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    students = relationship("Student", back_populates="department")  # Relation avec les étudiants
    formations = relationship("Formation", back_populates="department")  # Relation avec les formations

class Formation(Base):
    __tablename__ = "formations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    department_id = Column(Integer, ForeignKey("departments.id"))

    department = relationship("Department", back_populates="formations")  # Relation avec le département
    courses = relationship("Course", back_populates="formation")

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    content = Column(Text)
    formation_id = Column(Integer, ForeignKey("formations.id"))  # 👈 Ajouter ceci

    formation = relationship("Formation", back_populates="courses")  # 👈 Et ceci


class RecommendedBook(Base):
    __tablename__ = "recommended_books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    price = Column(Float)
    category = Column(String)
    availability = Column(String)

class RecommendedBookResponse(BaseModel):
    title: str
    author: str
    description: str
