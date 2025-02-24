

# importing modules
from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows the frontend to talk to the backend

# A function to fetch grades from HAC


def fetch_grades(s_number, password):
    login_url = "https://hac.nisd.net/HomeAccess/Account/LogOn"
    classwork_url = "https://hac.nisd.net/HomeAccess/Classes/Classwork"
    session = requests.Session()

    # Step 1: Fetch the login page to get the CSRF token
    login_page = session.get(login_url)
    soup = BeautifulSoup(login_page.text, "html.parser")
    csrf_token = soup.find(
        "input", {"name": "__RequestVerificationToken"})["value"]

    # Step 2: Submit login credentials with CSRF token
    payload = {
        "__RequestVerificationToken": csrf_token,
        "Database": "10",  # This value might be required (check the HTML form)
        "VerificationOption": "UsernamePassword",
        "LogOnDetails.UserName": s_number,
        "LogOnDetails.Password": password,
    }
    response = session.post(login_url, data=payload)
    print("Login Response:", response.text)  # Debug: Print the login response

    # Check if login failed
    if "Invalid" in response.text:
        return {"error": "Invalid credentials"}

    # Step 3: Fetch the Classwork page
    classwork_response = session.get(classwork_url)
    # Debug: Print the Classwork page HTML
    print("Classwork Page HTML:", classwork_response.text)

    # Step 4: Extract the iframe URL
    soup = BeautifulSoup(classwork_response.text, "html.parser")
    iframe = soup.find("iframe", id="sg-legacy-iframe")
    if not iframe:
        return {"error": "Unable to find iframe"}

    iframe_url = "https://hac.nisd.net" + iframe["src"]
    print("Iframe URL:", iframe_url)  # Debug: Print the iframe URL

    # Step 5: Fetch the iframe content
    iframe_response = session.get(iframe_url)
    # Debug: Print the iframe content
    print("Iframe Content:", iframe_response.text)

    # Step 6: Parse the iframe content
    iframe_soup = BeautifulSoup(iframe_response.text, "html.parser")
    grades = {}

    # Loop through each course section
    for course_section in iframe_soup.find_all("div", class_="AssignmentClass"):
        try:
            # Extract course name
            course_name = course_section.find(
                "a", class_="sg-header-heading").text.strip()

            # Extract course average
            course_avg = course_section.find(
                "span", class_="sg-header-heading sg-right").text.strip()

            # Extract assignments
            assignments = []
            for row in course_section.find_all("tr", class_="sg-asp-table-data-row"):
                cells = row.find_all("td")
                if len(cells) >= 6:  # Ensure there are enough columns
                    assignment_name = cells[2].text.strip()
                    # Clean up assignment name
                    assignment_name = assignment_name.replace(
                        "\r\n", "").replace("*", "").strip()

                    # Skip invalid assignments (e.g., "8.00")
                    if not assignment_name.replace(".", "").isdigit():
                        assignment = {
                            "date_due": cells[0].text.strip(),
                            "date_assigned": cells[1].text.strip(),
                            "assignment_name": assignment_name,
                            "category": cells[3].text.strip(),
                            "score": cells[4].text.strip(),
                            "total_points": cells[5].text.strip(),
                        }
                        assignments.append(assignment)

            # Add course and grades to the dictionary (only if there are valid assignments)
            if assignments:
                grades[course_name] = {
                    "average": course_avg,
                    "assignments": assignments,
                }
        except AttributeError as e:
            print("Error parsing course section:", e)
            continue

    return {"grades": grades}


@app.route('/login', methods=["POST"])
def login():

    data = request.json

    s_number = data.get("s_number")
    password = data.get("password")

    grades = fetch_grades(s_number, password)

    return jsonify(grades)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
