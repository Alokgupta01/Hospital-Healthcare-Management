document.getElementById('patientForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name       = document.getElementById('name').value.trim();
  const age        = document.getElementById('age').value.trim();
  const gender     = document.getElementById('gender').value;
  const bloodGroup = document.getElementById('bloodGroup').value;
  const phone      = document.getElementById('phone').value.trim();
  const dob        = document.getElementById('dob').value;
  const address    = document.getElementById('address').value.trim();
  const history    = document.getElementById('history').value.trim();

  if (!name || !age || !gender || !bloodGroup || !phone || !address) {
    showAlert('alertBox', '⚠️ Please fill all required fields!', 'error'); return;
  }
  if (phone.length !== 10 || isNaN(phone)) {
    showAlert('alertBox', '⚠️ Enter a valid 10-digit phone number!', 'error'); return;
  }
  if (parseInt(age) < 1 || parseInt(age) > 120) {
    showAlert('alertBox', '⚠️ Enter a valid age between 1–120!', 'error'); return;
  }

  const patients = getData('patients');
  patients.push({ id: generateId(), name, age, gender, bloodGroup, phone, dob, address, history, registeredOn: new Date().toLocaleDateString() });
  saveData('patients', patients);
  showAlert('alertBox', `✅ Patient "${name}" registered successfully!`, 'success');
  this.reset();
});
