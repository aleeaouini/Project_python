"use client";

import { useEffect, useState } from "react";
import { BookOpen, Star, AlertTriangle, Loader2, BookX, Heart } from "lucide-react";

type Course = {
  id: number;
  name: string;
  content: string;
};

export default function CoursesPage() {
  const [id, setId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>(""); 
  const [submitting, setSubmitting] = useState<number | null>(null);

  // Récupération de l'ID de formation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split('/');
      setId(pathParts[pathParts.length - 1]);
    }
  }, []);

  // Load user ID from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("studentId");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  const addFavori = async (courseId: number, courseName: string) => {
    if (!userId) {
      alert("🔒 Veuillez vous connecter pour ajouter aux favoris.");
      return;
    }

    setSubmitting(courseId);
    
    try {
      const response = await fetch("http://localhost:8081/api/favoris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: userId,
          courseId,
          courseName,
          addedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout du favori");
      alert("✅ Cours ajouté aux favoris !");
    } catch (error) {
      alert("❌ Impossible d'ajouter aux favoris");
      console.error(error);
    } finally {
      setSubmitting(null);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchCourses = async () => {
      try {
        const res = await fetch(`http://localhost:8000/formations/${id}/courses`);
        if (!res.ok) throw new Error(`Erreur: ${res.status}`);
        const data = await res.json();
        setCourses(data);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-8 pb-4 border-b border-gray-200">
        <div className="flex items-center">
          <BookOpen className="text-blue-600 mr-3" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">
            {id ? `Cours de la formation ${id}` : "Chargement..."}
          </h1>
        </div>
        <p className="mt-2 text-gray-600">
          Explorez les cours disponibles et ajoutez vos favoris
        </p>
      </header>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
          <span className="ml-2 text-lg text-gray-600">Chargement des cours...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={20} />
            <p className="ml-2 text-red-700">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 flex flex-col items-center justify-center text-center h-40">
          <BookX className="text-amber-500 mb-3" size={32} />
          <p className="text-amber-700 font-medium">Aucun cours disponible pour cette formation.</p>
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="space-y-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
                <div className="text-gray-600 mb-4 prose prose-sm max-w-none">
                  {course.content}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => addFavori(course.id, course.name)}
                    disabled={submitting === course.id}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                      submitting === course.id
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    }`}
                  >
                    {submitting === course.id ? (
                      <Loader2 className="animate-spin mr-2" size={16} />
                    ) : (
                      <Heart className="mr-2" size={16} />
                    )}
                    Ajouter aux favoris
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
