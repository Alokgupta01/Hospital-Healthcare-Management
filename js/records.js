
function loadRecords() {
    let patients = getData('patients');
    let table = document.getElementById('patientTable');

    if (patients.length == 0) {
        table.innerHTML = "<tr><td colspan='7'>No patient records found.</td></tr>";
        return;
    }

    table.innerHTML = "";

    for (let i = 0; i < patients.length; i++) {
        let p = patients[i];

        table.innerHTML += "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + p.name + "</td>" +
            "<td>" + p.age + "</td>" +
            "<td>" + p.gender + "</td>" +
            "<td>" + p.bloodGroup + "</td>" +
            "<td>" + p.phone + "</td>" +
            "<td>" + p.address + "</td>" +
            "</tr>";
    }
}

loadRecords();
