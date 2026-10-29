
function addDoctor() {

    let name = document.getElementById("docName").value;
    let specialization = document.getElementById("specialization").value;
    let experience = document.getElementById("experience").value;
    let fee = document.getElementById("fee").value;
    let phone = document.getElementById("docPhone").value;

    if (name === "" || specialization === "" ||
        experience === "" || fee === "" || phone === "") {
        alert("Please fill all fields!");
        return;
    }

    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    let doctor = {
        name: name,
        specialization: specialization,
        experience: experience,
        fee: fee,
        phone: phone
    };

    doctors.push(doctor);

    localStorage.setItem("doctors", JSON.stringify(doctors));

    alert("Doctor added successfully!");

    document.getElementById("doctorForm").reset();

    showDoctors();
}


function showDoctors() {

    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    let table = document.getElementById("doctorTable");

    table.innerHTML = "";

    for (let i = 0; i < doctors.length; i++) {

        table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${doctors[i].name}</td>
                <td>${doctors[i].specialization}</td>
                <td>${doctors[i].experience}</td>
                <td>${doctors[i].fee}</td>
                <td>${doctors[i].phone}</td>
            </tr>
        `;
    }
}

showDoctors();
