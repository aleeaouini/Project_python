from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from models import RecommendedBook, RecommendedBookResponse
from scraper import scrape_books
from database import get_db

book_router = APIRouter()

@book_router.post("/scrape-books", response_model=List[RecommendedBookResponse])
def scrape_books_endpoint(db: Session = Depends(get_db)):
    books_data = scrape_books()
    for book in books_data:
        db_book = RecommendedBook(**book.model_dump())
        db.add(db_book)
    db.commit()
    return books_data

@book_router.post("/scrape")
def scrape_and_save(db: Session = Depends(get_db)):
    books_data = scrape_books()
    for book in books_data:
        new_book = RecommendedBook(**book)
        db.add(new_book)
    db.commit()
    return {"message": f"{len(books_data)} livres insérés"}

@book_router.get("/recommendations", response_model=List[RecommendedBookResponse])
def get_recommendations(
    category: str = None,
    price_min: float = None,
    price_max: float = None,
    db: Session = Depends(get_db)
):
    query = db.query(RecommendedBook)

    if category:
        query = query.filter(RecommendedBook.category == category)
    if price_min is not None:
        query = query.filter(RecommendedBook.price >= price_min)
    if price_max is not None:
        query = query.filter(RecommendedBook.price <= price_max)

    books = query.all()
    return books
