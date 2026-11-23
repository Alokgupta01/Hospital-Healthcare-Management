
(function () {

    // Get HTML elements
    function $(id) {
        return document.getElementById(id);
    }

    // Department list
    var DEPTS = [
        'Cardiology',
        'Orthopedics',
        'Pediatrics',
        'General medicine',
        'Dermatology'
    ];

    var filter = 'All';
    var query = '';

    // Local storage functions
    function getDoctors() {
        try {
            return JSON.parse(localStorage.getItem('doctors')) || [];
        } catch (error) {
            return [];
        }
    }

    function saveDoctors(doctors) {
        localStorage.setItem('doctors', JSON.stringify(doctors));
    }

    function showMessage(id, message, type) {
        var element = $(id);

        if (element) {
            element.textContent = message;
            element.className = 'alert alert-' + type;
            element.style.display = 'block';
        } else {
            alert(message);
        }
    }

    // Convert department into specialization
    function specFor(dept) {
        if (dept === 'Cardiology') return 'Cardiologist';
        if (dept === 'Orthopedics') return 'Orthopedic';
        if (dept === 'Pediatrics') return 'Pediatrician';
        if (dept === 'General medicine') return 'General Physician';
        if (dept === 'Dermatology') return 'Dermatologist';

        return dept;
    }

    // Escape HTML
    function esc(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[char];
        });
    }

    // Generate initials
    function initials(name) {
        return String(name || '')
            .split(' ')
            .filter(Boolean)
            .map(function (word) {
                return word[0];
            })
            .join('')
            .substring(0, 2)
            .toUpperCase();
    }

    // Format fee
    function fmtMoney(amount) {
        return '₹' + Number(amount || 0);
    }

    // Default doctors
    var defaultDoctors = [
        {
            id: 'DOC101',
            name: 'Amit Sharma',
            specialization: 'Cardiologist',
            experience: 12,
            fee: 800,
            phone: '9876543210',
            timing: '9 AM to 2 PM',
            available: true
        },
        {
            id: 'DOC102',
            name: 'Neha Verma',
            specialization: 'Orthopedic',
            experience: 8,
            fee: 600,
            phone: '9876543211',
            timing: '10 AM to 4 PM',
            available: true
        },
        {
            id: 'DOC103',
            name: 'Rahul Gupta',
            specialization: 'Pediatrician',
            experience: 10,
            fee: 500,
            phone: '9876543212',
            timing: '9 AM to 1 PM',
            available: true
        },
        {
            id: 'DOC104',
            name: 'Priya Singh',
            specialization: 'General Physician',
            experience: 6,
            fee: 400,
            phone: '9876543213',
            timing: '2 PM to 7 PM',
            available: true
        },
        {
            id: 'DOC105',
            name: 'Ankit Kumar',
            specialization: 'Dermatologist',
            experience: 9,
            fee: 700,
            phone: '9876543214',
            timing: '11 AM to 5 PM',
            available: true
        },
        {
            id: 'DOC106',
            name: 'Meera Joshi',
            specialization: 'Cardiologist',
            experience: 15,
            fee: 1000,
            phone: '9876543215',
            timing: '10 AM to 3 PM',
            available: true
        }
    ];

    // Add default doctors only once
    if (getDoctors().length === 0) {
        saveDoctors(defaultDoctors);
    }

    // Display doctor cards
    function renderCards() {

        var all = getDoctors();
        var q = query.toLowerCase();

        var list = all.filter(function (d) {

            var matchesSearch =
                String(d.name || '').toLowerCase().includes(q) ||
                String(d.specialization || '').toLowerCase().includes(q) ||
                String(d.phone || '').includes(q);

            var matchesDepartment =
                filter === 'All' ||
                d.specialization === specFor(filter) ||
                d.department === filter;

            return matchesSearch && matchesDepartment;
        });

        var grid = $('doctorGrid');

        if (!grid) return;

        if (list.length === 0) {
            grid.innerHTML = '<p class="no-data">No doctors found</p>';
            return;
        }

        grid.innerHTML = list.map(function (d) {

            var available = d.available !== false;

            return `
                <article class="doc-card">

                    <div class="doc-top">

                        <span class="avatar avatar-lg">
                            ${esc(initials(d.name))}
                        </span>

                        <div>
                            <h3>Dr. ${esc(d.name)}</h3>
                            <span class="muted">
                                ${esc(d.specialization)}
                            </span>
                        </div>

                    </div>

                    <dl class="doc-facts">

                        <div>
                            <dt>Experience</dt>
                            <dd>${esc(d.experience)} years</dd>
                        </div>

                        <div>
                            <dt>Timing</dt>
                            <dd>${esc(d.timing)}</dd>
                        </div>

                        <div>
                            <dt>Consultation fee</dt>
                            <dd>${fmtMoney(d.fee)}</dd>
                        </div>

                        <div>
                            <dt>Phone</dt>
                            <dd>${esc(d.phone)}</dd>
                        </div>

                    </dl>

                    <div class="doc-foot">

                        <span class="${available ? 'badge badge-success' : 'badge badge-danger'}">
                            ${available ? 'Available today' : 'On leave'}
                        </span>

                        <a class="btn btn-primary btn-sm"
                           href="appointments.html?doctor=${encodeURIComponent(d.id)}">
                            Book
                        </a>

                    </div>

                    <div class="btn-row">

                        <button class="btn btn-outline btn-sm"
                                type="button"
                                data-action="toggle"
                                data-id="${esc(d.id)}">
                            ${available ? 'Mark on leave' : 'Mark available'}
                        </button>

                        <button class="btn btn-danger btn-sm"
                                type="button"
                                data-action="remove"
                                data-id="${esc(d.id)}">
                            Remove
                        </button>

                    </div>

                </article>
            `;

        }).join('');
    }

    // Search functionality
    var searchBox = $('search');

    if (searchBox) {
        searchBox.addEventListener('input', function () {
            query = searchBox.value.trim();
            renderCards();
        });
    }

    // Department filter buttons
    function renderChips() {

        var chips = $('chips');

        if (!chips) return;

        var departments = ['All'].concat(DEPTS);

        chips.innerHTML = departments.map(function (dept) {

            return `
                <a href="#"
                   data-filter="${esc(dept)}"
                   class="${dept === filter ? 'on' : ''}">
                    ${esc(dept)}
                </a>
            `;

        }).join('');
    }

    // Department selection
    var chips = $('chips');

    if (chips) {
        chips.addEventListener('click', function (e) {

            var selected = e.target.closest('a[data-filter]');

            if (!selected) return;

            e.preventDefault();

            filter = selected.getAttribute('data-filter');

            renderChips();
            renderCards();
        });
    }

    // Add new doctor
    function addDoctor() {

        var name = $('d-name').value.trim();
        var exp = $('d-exp').value.trim();
        var fee = $('d-fee').value.trim();
        var phone = $('d-phone').value.trim();

        if (!name || !exp || !fee || !phone) {
            showMessage('formMsg', 'Please fill all required fields.', 'error');
            return;
        }

        if (!Number.isFinite(Number(exp)) || Number(exp) < 0 || Number(exp) > 70) {
            showMessage('formMsg', 'Enter valid experience.', 'error');
            return;
        }

        if (!Number.isFinite(Number(fee)) || Number(fee) < 0) {
            showMessage('formMsg', 'Enter valid consultation fee.', 'error');
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            showMessage('formMsg', 'Enter valid 10-digit phone number.', 'error');
            return;
        }

        var from = $('d-from') ? $('d-from').value : '';
        var to = $('d-to') ? $('d-to').value : '';

        if (from && to && from >= to) {
            showMessage('formMsg', 'Enter valid timing.', 'error');
            return;
        }

        var timing = '9 AM to 5 PM';

        if (from && to) {
            timing = from + ' to ' + to;
        }

        var department = $('d-dept').value;

        var doctor = {
            id: 'DOC' + Date.now(),
            name: name.replace(/^Dr\.?\s*/i, ''),
            specialization: specFor(department),
            department: department,
            experience: Number(exp),
            fee: Number(fee),
            phone: phone,
            timing: timing,
            available: true
        };

        var doctors = getDoctors();

        doctors.push(doctor);

        saveDoctors(doctors);

        $('doctorForm').reset();

        location.hash = '';

        showMessage('msg', 'Doctor added successfully!', 'success');

        renderCards();
        renderChips();
    }

    // Save button
    var saveBtn = $('saveBtn');

    if (saveBtn) {
        saveBtn.addEventListener('click', addDoctor);
    }

    // Prevent form reload
    var doctorForm = $('doctorForm');

    if (doctorForm) {
        doctorForm.addEventListener('submit', function (e) {
            e.preventDefault();
        });
    }

    // Mark doctor available or unavailable
    function toggleDoctor(id) {

        var doctors = getDoctors();

        doctors = doctors.map(function (d) {

            if (d.id === id) {
                d.available = d.available === false;
            }

            return d;
        });

        saveDoctors(doctors);
        renderCards();
    }

    // Remove doctor
    function removeDoctor(id) {

        if (!confirm('Are you sure you want to remove this doctor?')) {
            return;
        }

        var doctors = getDoctors();

        doctors = doctors.filter(function (d) {
            return d.id !== id;
        });

        saveDoctors(doctors);

        showMessage('msg', 'Doctor removed successfully!', 'success');

        renderCards();
    }

    // Handle card buttons
    var doctorGrid = $('doctorGrid');

    if (doctorGrid) {
        doctorGrid.addEventListener('click', function (e) {

            var button = e.target.closest('button[data-action]');

            if (!button) return;

            var id = button.getAttribute('data-id');
            var action = button.getAttribute('data-action');

            if (action === 'toggle') {
                toggleDoctor(id);
            }

            if (action === 'remove') {
                removeDoctor(id);
            }
        });
    }

    // Initial display
    renderChips();
    renderCards();

})();
