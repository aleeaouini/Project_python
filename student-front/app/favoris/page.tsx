"use client";

import { useEffect, useState } from "react";
import { Heart, Trash2, Loader2, AlertTriangle } from "lucide-react";

interface Favori {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  addedAt: string;
}

export default function FavorisPage() {
  const [favoris, setFavoris] = useState<Favori[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("studentId") || "" : "";

  useEffect(() => {
    if (!userId) return;

    const fetchFavoris = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/favoris/${userId}`);
        if (!res.ok) throw new Error("Erreur lors de la récupération");
        const data = await res.json();
        setFavoris(data);
      } catch (err) {
        console.error("Erreur favoris:", err);
        setError("❌ Impossible de récupérer vos favoris.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoris();
  }, [userId]);

  const removeFavori = async (courseId: string) => {
    setRemoving(courseId);
    try {
      const response = await fetch(
        `http://localhost:8081/api/favoris?studentId=${userId}&courseId=${courseId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      setFavoris((prev) => prev.filter((f) => f.courseId !== courseId));
    } catch (error) {
      console.error(error);
      setError("❌ Impossible de retirer le cours des favoris.");
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-10 border-b pb-6 border-gray-200">
        <div className="flex items-center gap-3">
          <Heart className="text-pink-600" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">Mes cours favoris</h1>
        </div>
        <p className="mt-2 text-gray-600 text-sm">
          Retrouvez tous les cours que vous avez ajoutés à vos favoris.
        </p>
      </header>

      {loading && (
        <div className="flex justify-center items-center h-40 text-gray-600">
          <Loader2 className="animate-spin mr-3" />
          Chargement de vos favoris...
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <AlertTriangle size={20} />
          <span>{error}</span>
        </div>
      )}

      {!loading && favoris.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-6 py-6 rounded-lg flex flex-col items-center gap-2">
          <Heart size={32} />
          <p className="text-center font-medium">
            Vous n’avez encore ajouté aucun cours aux favoris.
          </p>
        </div>
      )}

      <ul className="grid md:grid-cols-2 gap-6">
        {favoris.map((favori) => (
          <li
            key={favori.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex justify-between items-start hover:shadow-md transition"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {favori.courseName}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Ajouté le : {new Date(favori.addedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => removeFavori(favori.courseId)}
              disabled={removing === favori.courseId}
              className={`ml-4 text-sm flex items-center gap-2 px-3 py-1.5 rounded-md transition ${
                removing === favori.courseId
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-red-50 text-red-600 hover:bg-red-100"
              }`}
            >
              {removing === favori.courseId ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
              Retirer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
