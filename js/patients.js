
function validatePatient() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let gender = document.getElementById('gender').value;
    let bloodGroup = document.getElementById('bloodGroup').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;

    if (name == "" || age == "" || gender == "" ||
        bloodGroup == "" || phone == "" || address == "") {
        alert("Please fill all required fields!");
    }
    else if (age < 1 || age > 120) {
        alert("Enter age between 1 and 120!");
    }
    else if (phone.length != 10 || isNaN(phone)) {
        alert("Enter a valid 10-digit phone number!");
    }
    else {
        alert("Patient details are valid!");
    }
}
