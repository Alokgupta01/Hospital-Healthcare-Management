document.getElementById('doctorForm').addEventListener('submit', function(e) {
    e.preventDefault();
});

    const name = document.getElementById('docName').value.trim();
    const specialization = document.getElementById('specialization').value;
    const experience = document.getElementById('experience').value.trim();
    const fee = document.getElementById('fee').value.trim();
    const phone = document.getElementById('docPhone').value.trim();
