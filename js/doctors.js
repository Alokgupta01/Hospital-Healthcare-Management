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

