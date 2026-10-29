// =====================================================
//  ADMIN.JS - Admin dashboard logic
//  Author: Alok Gupta (Team Leader)  |  Branch: feature/auth-admin
// =====================================================
(function () {
  var patients     = getData('patients');
  var doctors      = getData('doctors');
  var appointments = getData('appointments');
  var bills        = getData('bills');

  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  function empty(cols, msg) {
    return '<tr><td colspan="' + cols + '" class="no-data">' + msg + '</td></tr>';
  }
  function fill(id, rows, cols, msg, fn) {
    var tb = document.getElementById(id);
    if (tb) tb.innerHTML = rows.length ? rows.map(fn).join('') : empty(cols, msg);
  }

  // Stats cards
  setText('totalPatients', patients.length.toLocaleString('en-IN'));
  setText('totalDoctors', doctors.length);
  setText('totalAppointments', appointments.length);
  setText('pendingBills', bills.filter(function (b) { return b.status === 'Unpaid'; }).length);

  // Recent patients (last 5, newest first)
  fill('recentPatients', patients.slice(-5).reverse(), 5, 'No patients registered yet', function (p) {
    return '<tr><td><div class="person"><span class="avatar">' + esc(initials(p.name)) + '</span>' + esc(p.name) + '</div></td>' +
           '<td>' + esc(p.age) + '</td><td>' + esc(p.gender) + '</td><td>' + esc(p.bloodGroup) + '</td>' +
           '<td><span class="' + badgeFor(p.status || 'Outpatient') + '">' + esc(p.status || 'Outpatient') + '</span></td></tr>';
  });

  // Recent appointments
  fill('recentAppointments', appointments.slice(-5).reverse(), 5, 'No appointments yet', function (a) {
    return '<tr><td>' + esc(a.patientName) + '</td><td>Dr. ' + esc(a.doctorName) + '</td>' +
           '<td>' + esc(a.department || '-') + '</td><td>' + esc(fmtDate(a.date)) + ', ' + esc(a.time) + '</td>' +
           '<td><span class="' + badgeFor(a.status) + '">' + esc(a.status) + '</span></td></tr>';
  });

  // Doctors overview
  fill('recentDoctors', doctors.slice(-5).reverse(), 4, 'No doctors added yet', function (d) {
    return '<tr><td>Dr. ' + esc(d.name) + '</td><td>' + esc(d.specialization) + '</td><td>' + esc(fmtMoney(d.fee)) + '</td>' +
           '<td><span class="' + badgeFor(d.available ? 'Available' : 'Unavailable') + '">' +
           (d.available ? 'Available' : 'Unavailable') + '</span></td></tr>';
  });

  // Recent bills
  fill('recentBills', bills.slice(-5).reverse(), 5, 'No bills generated yet', function (b) {
    return '<tr><td>' + esc(b.invoice || '-') + '</td><td>' + esc(b.patientName) + '</td><td>' + esc(fmtDate(b.date)) + '</td>' +
           '<td>' + esc(fmtMoney(b.amount)) + '</td>' +
           '<td><span class="' + badgeFor(b.status) + '">' + esc(b.status) + '</span></td></tr>';
  });
})();
