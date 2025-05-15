import requests

API_URL = "http://127.0.0.1:8000"  # À adapter selon ton déploiement

def test_student_creation_and_retrieval():
    # 1. Créer un département
    dept_data = {"name": "Sciences"}
    dept_response = requests.post(f"{API_URL}/departments", json=dept_data)
    assert dept_response.status_code in [200, 201], f"Erreur création département: {dept_response.text}"
    dept_id = dept_response.json().get("id")

    # 2. Créer une formation liée à ce département
    formation_data = {
        "name": "Informatique",
        "department_id": dept_id
    }
    form_response = requests.post(f"{API_URL}/formations", json=formation_data)
    assert form_response.status_code in [200, 201], f"Erreur création formation: {form_response.text}"
    formation_id = form_response.json().get("id")

    # 3. Créer un étudiant
    student_data = {
        "name": "John Regression",
        "email": "john.regression@example.com",
        "password": "securepassword",
        "age": 22,
        "classe": "B",
        "formation_id": formation_id
    }

    response = requests.post(f"{API_URL}/students", json=student_data)
    assert response.status_code == 200, f"Erreur création étudiant: {response.text}"
    created_student = response.json()

    # 4. Récupérer l'étudiant par son ID
    get_response = requests.get(f"{API_URL}/students/{created_student['id']}")
    assert get_response.status_code == 200, f"Erreur récupération étudiant: {get_response.text}"
    fetched_student = get_response.json()

    # 5. Vérification des données
    assert fetched_student["name"] == student_data["name"]
    assert fetched_student["email"] == student_data["email"]
    print("✅ Test réussi : étudiant créé et récupéré correctement.")

# Tu peux appeler la fonction ici pour l'exécuter (ou l'intégrer dans un vrai test pytest)
if __name__ == "__main__":
    test_student_creation_and_retrieval()
