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
