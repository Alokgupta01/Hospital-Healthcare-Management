// records.js — Author: Akendra
function loadRecords(filter = '') {
  const patients = getData('patients');
  const tbody    = document.getElementById('patientTable');
  const filtered = patients.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="no-data">${filter ? 'No patient found.' : 'No patients registered yet. <a href="patients.html">Register one →</a>'}</td></tr>`;
    return;
  }
  tbody.innerHTML = filtered.map((p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td>${p.bloodGroup}</td>
      <td>${p.phone}</td>
      <td>${p.address}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deletePatient('${p.id}')">🗑 Delete</button>
      </td>
    </tr>`).join('');
}

function deletePatient(id) {
  if (!confirm('Delete this patient record?')) return;
  let patients = getData('patients');
  patients = patients.filter(p => p.id !== id);
  saveData('patients', patients);
  showAlert('alertBox', '🗑 Patient deleted.', 'success');
  loadRecords(document.getElementById('searchInput').value);
}

document.getElementById('searchInput').addEventListener('input', function() { loadRecords(this.value); });
loadRecords();
