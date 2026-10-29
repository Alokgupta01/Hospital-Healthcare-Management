document.getElementById('doctorForm').addEventListener('submit', function(e) {
    e.preventDefault();
});

    const name = document.getElementById('docName').value.trim();
    const specialization = document.getElementById('specialization').value;
    const experience = document.getElementById('experience').value.trim();
    const fee = document.getElementById('fee').value.trim();
    const phone = document.getElementById('docPhone').value.trim();
    
    if (!name || !specialization || !experience || !fee || !phone) {
        showAlert('alertBox', 'Please fill all fields!', 'error');
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        showAlert('alertBox', 'Enter a valid 10-digit phone number!', 'error');
        return;
    }
    
    const doctors = getData('doctors');

    doctors.push({
        id: generateId(),
        name,
        specialization,
        experience,
        fee,
        phone,
        available: true,
        addedOn: new Date().toLocaleDateString()
    });

    saveData('doctors', doctors);

    showAlert('alertBox', `Dr. ${name} added successfully!`, 'success');

    this.reset();
    loadDoctors();
    
function toggleAvailability(id) {
    const doctors = getData('doctors').map(d => {
        if (d.id === id) {
            d.available = !d.available;
        }
        return d;
    });

    saveData('doctors', doctors);
    loadDoctors(document.getElementById('searchInput').value);
}

function deleteDoctor(id) {
    if (!confirm('Remove this doctor?')) return;

    saveData(
        'doctors',
        getData('doctors').filter(d => d.id !== id)
    );

    showAlert('alertBox', 'Doctor removed.', 'success');
    loadDoctors();
}

function loadDoctors(filter = '') {
    const doctors = getData('doctors');
    const tbody = document.getElementById('doctorTable');

    const filtered = doctors.filter(d =>
        d.name.toLowerCase().includes(filter.toLowerCase()) ||
        d.specialization.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="no-data">
                    ${filter ? 'No doctor found.' : 'No doctors added yet.'}
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map((d, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><strong>Dr. ${d.name}</strong></td>
            <td>${d.specialization}</td>
            <td>${d.experience} yrs</td>
            <td>₹${d.fee}</td>
            <td>${d.phone}</td>
            <td>
                <span class="badge badge-${d.available ? 'available' : 'unavailable'}">
                    ${d.available ? 'Available' : 'Unavailable'}
                </span>
            </td>
            <td>
                <button class="btn btn-warning btn-sm"
                    onclick="toggleAvailability('${d.id}')">
                    Toggle
                </button>
                <button class="btn btn-danger btn-sm"
                    onclick="deleteDoctor('${d.id}')">
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

document.getElementById('searchInput').addEventListener('input', function() {
    loadDoctors(this.value);
});



