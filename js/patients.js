
function validatePatient() {
    let name = document.getElementById('name').value.trim();
    let age = document.getElementById('age').value;
    let gender = document.getElementById('gender').value;
    let bloodGroup = document.getElementById('bloodGroup').value;
    let phone = document.getElementById('phone').value.trim();
    let dob = document.getElementById('dob').value;
    let address = document.getElementById('address').value.trim();
    let history = document.getElementById('history').value.trim();

    if (name == "" || age == "" || gender == "" ||
        bloodGroup == "" || phone == "" || address == "") {
        alert("Please fill all required fields!");
    }
    else if (isNaN(age) || age < 1 || age > 120) {
        alert("Enter age between 1 and 120!");
    }
    else if (!/^\d{10}$/.test(phone)) {
        alert("Enter a valid 10-digit phone number!");
    }
    else {
        let patients = getData('patients');

        let patient = {
            id: Date.now(),
            name: name,
            age: age,
            gender: gender,
            bloodGroup: bloodGroup,
            phone: phone,
            dob: dob,
            address: address,
            history: history
        };

        patients.push(patient);
        saveData('patients', patients);

        alert("Patient registered successfully!");

        document.getElementById('patientForm').reset();
    }
}
