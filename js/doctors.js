(function () {

    // Doctors module setup

    var $ = function (id) {
        return document.getElementById(id);
    };

    // Department list

    var DEPTS = [
        'Cardiology',
        'Orthopedics',
        'Pediatrics',
        'General medicine',
        'Dermatology'
    ];

    // Current filter and search

    var filter = 'All';
    var query = '';

    // Convert department into specialization

    function specFor(dept) {

        if (dept === 'Cardiology') {
            return 'Cardiologist';
        }

        if (dept === 'Orthopedics') {
            return 'Orthopedic';
        }

        if (dept === 'Pediatrics') {
            return 'Pediatrician';
        }

        if (dept === 'General medicine') {
            return 'General Physician';
        }

        if (dept === 'Dermatology') {
            return 'Dermatologist';
        }

        return dept;
    }

})();

    // Default doctors data

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

    // Save default doctors only if storage is empty

    if (getData('doctors').length === 0) {
        saveData('doctors', defaultDoctors);
    }

    // Display doctor cards

    function renderCards() {

        var all = getData('doctors');

        var q = query.toLowerCase();

        var list = all.filter(function (d) {

            if (filter !== 'All' &&
                d.specialization !== specFor(filter)) {
                return false;
            }

            return !q ||
                d.name.toLowerCase().includes(q) ||
                d.specialization.toLowerCase().includes(q);
        });

        $('doctorGrid').innerHTML = list.length
            ? list.map(function (d) {

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
                                <dd>${esc(fmtMoney(d.fee))}</dd>
                            </div>

                            <div>
                                <dt>Phone</dt>
                                <dd>${esc(d.phone)}</dd>
                            </div>

                        </dl>

                        <div class="doc-foot">

                            <span class="${badgeFor(
                                available ? 'Available' : 'Unavailable'
                            )}">
                                ${available ? 'Available today' : 'On leave'}
                            </span>

                            <a class="btn btn-primary btn-sm"
                               href="appointments.html?doctor=${encodeURIComponent(d.id)}">
                                Book
                            </a>

                        </div>

                    </article>
                `;

            }).join('')

            : '<p class="no-data">No doctors found</p>';
    }

    // Show doctors on page

    renderCards();

    // Doctor search functionality

    $('search').addEventListener('input', function () {

        query = $('search').value.trim();

        renderCards();

    });

    // Department filter buttons

    function renderChips() {

        var departments = ['All'].concat(DEPTS);

        $('chips').innerHTML = departments.map(function (dept) {

            return `
                <a href="#"
                   data-filter="${dept}"
                   class="${dept === filter ? 'on' : ''}">
                    ${dept}
                </a>
            `;

        }).join('');
    }

    // Handle department selection

    $('chips').addEventListener('click', function (e) {

        var selected = e.target.closest('a[data-filter]');

        if (!selected) {
            return;
        }

        e.preventDefault();

        filter = selected.getAttribute('data-filter');

        renderChips();
        renderCards();

    });

    // Display department buttons

    renderChips();

    // Add new doctor

    function addDoctor() {

        var name = $('d-name').value.trim();
        var exp = $('d-exp').value.trim();
        var fee = $('d-fee').value.trim();
        var phone = $('d-phone').value.trim();

        // Check required fields

        if (!name || !exp || !fee || !phone) {
            showAlert('formMsg', 'Please fill all required fields.', 'error');
            return;
        }

        // Validate experience

        if (+exp < 0 || +exp > 70) {
            showAlert('formMsg', 'Enter valid experience.', 'error');
            return;
        }

        // Validate fee

        if (+fee < 0) {
            showAlert('formMsg', 'Fee cannot be negative.', 'error');
            return;
        }

        // Validate phone number

        if (!/^\d{10}$/.test(phone)) {
            showAlert('formMsg', 'Enter valid 10-digit phone number.', 'error');
            return;
        }

        // Get availability timing

        var from = $('d-from').value;
        var to = $('d-to').value;

        if (from && to && from >= to) {
            showAlert('formMsg', 'Enter valid timing.', 'error');
            return;
        }

        var timing = '9 AM to 5 PM';

        if (from && to) {
            timing = from + ' to ' + to;
        }

        // Create doctor object

        var doctor = {
            id: generateId(),
            name: name.replace(/^Dr\.?\s*/i, ''),
            specialization: specFor($('d-dept').value),
            experience: exp,
            fee: fee,
            phone: phone,
            timing: timing,
            available: true
        };

        // Save doctor

        var doctors = getData('doctors');

        doctors.push(doctor);

        saveData('doctors', doctors);

        // Reset form

        $('doctorForm').reset();

        // Close popup

        location.hash = '';

        showAlert('msg', 'Doctor added successfully!', 'success');

        // Refresh cards

        renderCards();
        renderChips();
    }

    // Save button click

    $('saveBtn').addEventListener('click', addDoctor);

