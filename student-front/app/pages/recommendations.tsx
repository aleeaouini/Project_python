"use client";
import { useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
  price: number;
  category: string;
  availability: string;
};

export default function Recommendations() {
  const [books, setBooks] = useState<Book[]>([]);
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const fetchBooks = async () => {
    try {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (priceMin) params.append("price_min", priceMin);
      if (priceMax) params.append("price_max", priceMax);

      const res = await fetch(`http://localhost:8000/recommendations?${params}`);
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des livres");
      }
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Erreur fetchBooks :", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Livres recommandés</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Prix min"
          value={priceMin}
          type="number"
          onChange={(e) => setPriceMin(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Prix max"
          value={priceMax}
          type="number"
          onChange={(e) => setPriceMax(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={fetchBooks}>Filtrer</button>
      </div>

      {books.length === 0 ? (
        <p>Aucun livre trouvé.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> – {book.price.toFixed(2)} € – {book.availability}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
