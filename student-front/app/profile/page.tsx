"use client";

import { useState, useEffect } from "react";
import { User, Mail, Calendar, GraduationCap, Building2, LogOut, Loader2, AlertCircle } from "lucide-react";

interface Department {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  classe: string;
  department_id: number;
  department?: Department; // relation facultative
}

const ProfilePage = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      const studentId = localStorage.getItem("studentId");
      const token = localStorage.getItem("access_token");

      if (!studentId || !token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/students/${studentId}`);
        if (!response.ok) {
          throw new Error("Échec du chargement des données de l'étudiant");
        }

        const data: Student = await response.json();
        setStudent(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
            <h2 className="text-xl font-bold text-red-700">Erreur</h2>
          </div>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-6">
          <div className="flex justify-center mb-4">
            <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
              <User className="h-14 w-14 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center">
            {student?.name || "Profil Étudiant"}
          </h1>
          <p className="text-indigo-200 text-center mt-2">
            ID: {student?.id}
          </p>
        </div>

        <div className="px-6 py-8">
          {student && (
            <div className="space-y-4">
              <div className="flex items-center border-b border-gray-100 pb-3">
                <Mail className="h-5 w-5 text-indigo-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>
              
              <div className="flex items-center border-b border-gray-100 pb-3">
                <Calendar className="h-5 w-5 text-indigo-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Âge</p>
                  <p className="font-medium">{student.age} ans</p>
                </div>
              </div>
              
              <div className="flex items-center border-b border-gray-100 pb-3">
                <GraduationCap className="h-5 w-5 text-indigo-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Classe</p>
                  <p className="font-medium">{student.classe}</p>
                </div>
              </div>
              
              <div className="flex items-center border-b border-gray-100 pb-3">
                <Building2 className="h-5 w-5 text-indigo-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Département</p>
                  {student.department ? (
                    <p className="font-medium">{student.department.name}</p>
                  ) : (
                    <p className="text-amber-600">Département non disponible</p>
                  )}
                  <p className="text-xs text-gray-400">ID: {student.department_id}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;