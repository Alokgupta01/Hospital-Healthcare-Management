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