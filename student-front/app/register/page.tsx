"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Department {
  id: number;
  name: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [grade, setGrade] = useState("");
  const [department, setDepartment] = useState<Department | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Ajout du state pour l'email
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const deptRes = await fetch("http://localhost:8000/departments");
        const deptData = await deptRes.json();
        if (Array.isArray(deptData)) {
          setDepartments(deptData);
        } else {
          console.error("Données de départements invalides :", deptData);
          setDepartments([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!department) {
      alert("Veuillez sélectionner un département valide.");
      return;
    }

    setIsLoading(true);
    const newStudent = {
      name,
      email,  // Utilisation de l'email du formulaire
      password,
      age,
      classe: grade,
      department_id: department.id,  // Envoi de l'ID du département
    };

    try {
      const response = await fetch("http://localhost:8000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Étudiant ajouté avec succès");
        setName("");
        setAge(0);
        setGrade("");
        setDepartment(null);
        setPassword("");
        setEmail("");  // Réinitialisation du champ email

        // Redirection vers la page de connexion
        router.push("/login");
      } else {
        alert(`Erreur lors de l'ajout de l'étudiant: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant", error);
      alert("Une erreur est survenue lors de l'ajout de l'étudiant.");
    } finally {
      setIsLoading(false);
    }
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white text-center">Inscription Étudiant</h1>
        </div>

        <div className="px-6 py-8">
          {isLoading && (
            <div className="text-center mb-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Chargement en cours...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
              <input
                id="name"
                type="text"
                required
                placeholder="Entrez votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Âge</label>
              <input
                id="age"
                type="number"
                min="16"
                required
                value={age || ""}
                onChange={(e) => setAge(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Niveau d'études</label>
              <input
                id="grade"
                type="text"
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Département</label>
              <select
                id="department"
                value={department?.id || ""}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value);
                  const selectedDept = departments.find(dept => dept.id === selectedId);
                  setDepartment(selectedDept || null);
                }}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Sélectionner un département</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm"
              >
                {isLoading ? "Traitement en cours..." : "S'inscrire"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
