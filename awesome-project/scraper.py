# scraper.py
import requests
from bs4 import BeautifulSoup

def scrape_books():
    url = "https://books.toscrape.com/catalogue/page-1.html"
    books = []
    while url:
        res = requests.get(url)
        soup = BeautifulSoup(res.text, "html.parser")

        for article in soup.select(".product_pod"):
            title = article.h3.a["title"]
            price = float(article.select_one(".price_color").text[2:])
            availability = article.select_one(".availability").text.strip()
            category = "Unknown"  # sera remplacé par scraping individuel si besoin

            books.append({
                "title": title,
                "price": price,
                "availability": availability,
                "category": category
            })

        next_btn = soup.select_one("li.next > a")
        if next_btn:
            next_url = next_btn["href"]
            url = "https://books.toscrape.com/catalogue/" + next_url
        else:
            break
    return books
