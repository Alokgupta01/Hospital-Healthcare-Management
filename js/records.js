
function loadRecords(search = "") {
    let patients = getData('patients');
    let table = document.getElementById('patientTable');
    let found = [];


    for (let i = 0; i < patients.length; i++) {
        if (patients[i].name.toLowerCase().includes(search.toLowerCase())) {
            found.push(patients[i]);
        }
    }


    if (found.length == 0) {
        table.innerHTML = "<tr><td colspan='8'>No patient records found.</td></tr>";
        return;
    }

    table.innerHTML = "";

    for (let i = 0; i < found.length; i++) {
        let p = found[i];

        table.innerHTML += "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + p.name + "</td>" +
            "<td>" + p.age + "</td>" +
            "<td>" + p.gender + "</td>" +
            "<td>" + p.bloodGroup + "</td>" +
            "<td>" + p.phone + "</td>" +
            "<td>" + p.address + "</td>" +
            "<td><button onclick=\"deletePatient('" + p.id + "')\">Delete</button></td>" +
            "</tr>";
    }
}


function savePatient(patient) {
    let patients = getData('patients');

    patients.push(patient);
    saveData('patients', patients);

    alert("Patient saved successfully!");
}


function deletePatient(id) {
    if (confirm("Do you want to delete this patient?")) {
        let patients = getData('patients');
        let updated = [];

        for (let i = 0; i < patients.length; i++) {
            if (String(patients[i].id) != String(id)) {
                updated.push(patients[i]);
            }
        }

        saveData('patients', updated);

        alert("Patient deleted successfully!");

        loadRecords(document.getElementById('searchInput').value);
    }
}


loadRecords();
