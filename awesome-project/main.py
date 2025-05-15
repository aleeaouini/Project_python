from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from schemas import StudentCreate, StudentResponse, DepartmentResponse, FormationResponse, FormationCreate, CourseCreate, CourseResponse
from typing import List , Optional
from sqlalchemy.orm import joinedload
from models import Student
from models import RecommendedBook
from database import get_db






models.Base.metadata.create_all(bind=engine)

# Créez des routeurs pour chaque ressource
student_router = APIRouter()
formation_router = APIRouter()
course_router = APIRouter()

app = FastAPI()
app.include_router(course_router)



# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:4200"],
    allow_credentials=True,
    allow_methods=['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    allow_headers=["*"],
)

# Middleware CORS pour autoriser les requêtes depuis les applications front-end

# Fonction pour obtenir une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🧑‍🎓 Students Routes
@app.get("/students", response_model=List[StudentResponse])
def get_students(db: Session = Depends(get_db)):
    return db.query(Student).options(joinedload(Student.department)).all()

@app.post("/login")
def login(student_credentials: dict, db: Session = Depends(get_db)):
    email = student_credentials.get("email")
    password = student_credentials.get("password")

    # Chercher l'étudiant dans la base de données avec l'email
    student = db.query(models.Student).filter(models.Student.email == email).first()
    
    # Vérification des informations d'identification
    if not student or student.password != password:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")

    # Si l'étudiant existe et les informations sont correctes, retourner les informations
    return {
        "access_token": "fake-token",  # Ici tu peux générer un vrai token pour sécuriser l'authentification
        "student_id": student.id       # Retourner l'ID de l'étudiant
    }



@student_router.post("/students", response_model=StudentResponse)
def add_student(student: StudentCreate, db: Session = Depends(get_db)):
    new_student = models.Student(**student.model_dump())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@student_router.get("/students/{student_id}", response_model=StudentResponse)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Étudiant non trouvé")
    return student

# 🏛️ Departments Routes
@formation_router.get("/departments", response_model=list[DepartmentResponse])
def get_departments(db: Session = Depends(get_db)):
    return db.query(models.Department).all()

# 🎓 Formations Routes
@formation_router.get("/formations", response_model=list[FormationResponse])
def get_formations(db: Session = Depends(get_db)):
    return db.query(models.Formation).filter(models.Formation.name != None, models.Formation.department_id != None).all()

@formation_router.post("/formations", response_model=FormationResponse)
def add_formation(formation: FormationCreate, db: Session = Depends(get_db)):
    new_formation = models.Formation(**formation.model_dump())
    db.add(new_formation)
    db.commit()
    db.refresh(new_formation)
    return new_formation


# 🎓 Courses Routes
@course_router.get("/courses", response_model=list[CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(models.Course).options(joinedload(models.Course.formation)).all()
    return courses

@course_router.post("/courses", response_model=CourseResponse)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    new_course = models.Course(
        name=course.name,
        content=course.content,
        formation_id=course.formation_id
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course



# Ajouter une redirection depuis / vers /docs
@app.get("/")
def root():
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/docs")

@app.get("/students/{student_id}/formations")
def get_formations_by_student_department(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Étudiant non trouvé")

    formations = db.query(models.Formation).filter(models.Formation.department_id == student.department_id).all()
    if not formations:
        raise HTTPException(status_code=404, detail="Aucune formation trouvée pour cet étudiant")
    return formations

@app.get("/formations/{formation_id}/courses", response_model=List[CourseResponse])
def get_courses_by_formation(formation_id: int, db: Session = Depends(get_db)):
    courses = db.query(models.Course).filter(models.Course.formation_id == formation_id).all()
    return courses


@student_router.delete("/students/{student_id}", status_code=204)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Étudiant non trouvé")
    
    db.delete(student)
    db.commit()
    return {"message": "Étudiant supprimé avec succès"}






# Associez les routers à l'app principale
app.include_router(student_router)
app.include_router(formation_router)
app.include_router(course_router)










