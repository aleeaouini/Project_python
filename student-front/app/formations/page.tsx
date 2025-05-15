"use client";
import { useEffect, useState } from "react";
// Using window.location instead of Next.js router
import { Book, ArrowRight, Loader2, AlertCircle, Info } from "lucide-react";

type Formation = {
  id: number;
  name: string;
  department_id: number;
};

export default function FormationsPage() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const studentId = typeof window !== "undefined" ? localStorage.getItem("studentId") : null;

      if (!studentId) {
        setError("⚠️ Aucun ID étudiant trouvé dans le localStorage.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/students/${studentId}/formations`);
        if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`);

        const data: Formation[] = await res.json();
        setFormations(data);
      } catch (err: any) {
        console.error("Erreur lors du fetch :", err);
        setError(err.message || "❌ Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormationClick = (id: number) => {
    window.location.href = `/formations/${id}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center text-blue-800">
          <Book className="mr-2" size={28} />
          Formations disponibles
        </h1>
        <p className="text-gray-600 mt-2">
          Découvrez les programmes de formation à votre disposition
        </p>
      </header>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
          <span className="ml-2 text-lg text-gray-600">Chargement des formations...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-start">
          <AlertCircle className="text-red-500 mt-1 flex-shrink-0" size={20} />
          <p className="ml-2 text-red-700">{error}</p>
        </div>
      )}

      {!loading && !error && formations.length === 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start">
          <Info className="text-blue-500 mt-1 flex-shrink-0" size={20} />
          <p className="ml-2 text-blue-700">Aucune formation n'est disponible pour le moment.</p>
        </div>
      )}

      {!loading && !error && formations.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {formations.map((formation) => (
            <div
              key={formation.id}
              onClick={() => handleFormationClick(formation.id)}
              className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800">
                  {formation.name}
                </h3>
                <ArrowRight className="text-blue-500" size={18} />
              </div>
              <div className="mt-2 text-sm text-gray-500">
                ID de département: {formation.department_id}
              </div>
              <div className="mt-4 text-blue-600 text-sm font-medium">
                Voir les détails
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}