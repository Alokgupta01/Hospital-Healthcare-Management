
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
function esc(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char];
    });
}

function initials(name) {
    return String(name || '')
        .split(' ')
        .filter(Boolean)
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}

function fmtMoney(amount) {
    return '₹' + Number(amount || 0);
}

function badgeFor(status) {
    return status === 'Available'
        ? 'badge badge-success'
        : 'badge badge-danger';
}