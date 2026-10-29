
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function generateId() {
    return Date.now().toString();
}

function showAlert(elementId, message, type) {
    const alertBox = document.getElementById(elementId);

    if (!alertBox) {
        alert(message);
        return;
    }

    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    alertBox.style.display = 'block';
}
