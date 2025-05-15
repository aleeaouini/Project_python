from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

def test_create_student():
    driver = webdriver.Chrome()  # ou Firefox si tu veux
    driver.get("http://localhost:3000")  # URL de ton interface Next.js

    # Attendre le chargement de la page
    time.sleep(2)

    # Exemple d’interaction (adapter selon ton interface)
    add_button = driver.find_element(By.ID, "add-student-button")
    add_button.click()

    time.sleep(1)

    name_input = driver.find_element(By.NAME, "name")
    name_input.send_keys("Selenium Test")

    email_input = driver.find_element(By.NAME, "email")
    email_input.send_keys("selenium@example.com")

    password_input = driver.find_element(By.NAME, "password")
    password_input.send_keys("securepass")

    age_input = driver.find_element(By.NAME, "age")
    age_input.send_keys("22")

    classe_input = driver.find_element(By.NAME, "classe")
    classe_input.send_keys("B")

    formation_input = driver.find_element(By.NAME, "formation_id")
    formation_input.send_keys("1")

    submit = driver.find_element(By.ID, "submit-button")
    submit.click()

    time.sleep(3)

    # Vérifie que l'étudiant a été ajouté (exemple)
    body_text = driver.find_element(By.TAG_NAME, "body").text
    assert "Selenium Test" in body_text

    driver.quit()
