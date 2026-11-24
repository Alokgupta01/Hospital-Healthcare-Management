
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var filter = 'All', query = '', editingId = null;

  function nextPid(list) {
    var max = 1000;
    list.forEach(function (p) {
      var n = parseInt(String(p.pid || '').replace(/\D/g, ''), 10);
      if (n > max) max = n;
    });
    return 'P-' + (max + 1);
  }

  function render() {
    var all = getData('patients');
    var q = query.toLowerCase();
    var list = all.filter(function (p) {
      var st = p.status || 'Outpatient';
      if (filter !== 'All' && st !== filter) return false;
      return !q || String(p.name).toLowerCase().indexOf(q) > -1 ||
             String(p.pid || '').toLowerCase().indexOf(q) > -1 ||
             String(p.phone || '').indexOf(q) > -1;
    });

    // filter chips with counts
    var names = ['All', 'Outpatient', 'Admitted', 'Discharged'];
    $('chips').innerHTML = names.map(function (n) {
      var c = n === 'All' ? all.length : all.filter(function (p) { return (p.status || 'Outpatient') === n; }).length;
      return '<a href="#" data-filter="' + n + '" class="' + (n === filter ? 'on' : '') + '">' + n + ' (' + c + ')</a>';
    }).join('');

    $('patientBody').innerHTML = list.length ? list.map(function (p) {
      var st = p.status || 'Outpatient';
      return '<tr>' +
        '<td>' + esc(p.pid || '-') + '</td>' +
        '<td><div class="person"><span class="avatar">' + esc(initials(p.name)) + '</span><div>' + esc(p.name) +
          '<small>' + esc(p.address || '') + '</small></div></div></td>' +
        '<td>' + esc(p.age) + ' / ' + esc(p.gender) + '</td>' +
        '<td><span class="blood">' + esc(p.bloodGroup) + '</span></td>' +
        '<td>' + esc(p.phone) + '</td>' +
        '<td><span class="' + badgeFor(st) + '">' + esc(st) + '</span></td>' +
        '<td><div class="btn-row">' +
          '<a class="btn btn-outline btn-sm" href="records.html?patient=' + encodeURIComponent(p.id) + '">View record</a>' +
          '<a class="btn btn-outline btn-sm" href="#add-patient" onclick="PatientsPage.edit(\'' + esc(p.id) + '\')">Edit</a>' +
          '<button class="btn btn-danger btn-sm" type="button" onclick="PatientsPage.remove(\'' + esc(p.id) + '\')">Delete</button>' +
        '</div></td></tr>';
    }).join('') : '<tr><td colspan="7" class="no-data">No patients found</td></tr>';

    $('countText').textContent = 'Showing ' + list.length + ' of ' + all.length + ' patients';
  }

  function resetForm() {
    editingId = null;
    $('patientForm').reset();
    $('modalTitle').textContent = 'Register new patient';
    $('saveBtn').textContent = 'Save patient';
  }

  function edit(id) {
    var p = getData('patients').filter(function (x) { return String(x.id) === String(id); })[0];
    if (!p) return;
    editingId = p.id;
    $('modalTitle').textContent = 'Edit patient ' + (p.pid || '');
    $('saveBtn').textContent = 'Update patient';
    $('p-name').value = p.name || '';
    $('p-age').value = p.age || '';
    $('p-gender').value = p.gender || 'Male';
    $('p-blood').value = p.bloodGroup || 'A+';
    $('p-phone').value = p.phone || '';
    $('p-address').value = p.address || '';
    $('p-status').value = p.status || 'Outpatient';
    $('p-history').value = p.history || '';
  }

  function save() {
    var name = $('p-name').value.trim();
    var age = $('p-age').value.trim();
    var phone = $('p-phone').value.trim();
    var address = $('p-address').value.trim();

    if (!name || !age || !phone || !address) return showAlert('formMsg', 'Please fill all required fields.', 'error');
    if (isNaN(age) || +age < 0 || +age > 120) return showAlert('formMsg', 'Enter an age between 0 and 120.', 'error');
    if (!/^\d{10}$/.test(phone)) return showAlert('formMsg', 'Enter a valid 10-digit phone number.', 'error');

    var patients = getData('patients');
    var data = {
      name: name, age: age, gender: $('p-gender').value, bloodGroup: $('p-blood').value,
      phone: phone, address: address, status: $('p-status').value, history: $('p-history').value.trim()
    };

    if (editingId) {
      patients = patients.map(function (p) {
        return String(p.id) === String(editingId) ? Object.assign({}, p, data) : p;
      });
      showAlert('msg', 'Patient updated successfully.', 'success');
    } else {
      data.id = generateId();
      data.pid = nextPid(patients);
      data.dob = '';
      patients.push(data);
      showAlert('msg', 'Patient ' + data.pid + ' registered successfully.', 'success');
    }
    saveData('patients', patients);
    location.hash = '#';
    resetForm();
    render();
  }

  function remove(id) {
    if (!confirm('Do you want to delete this patient?')) return;
    saveData('patients', getData('patients').filter(function (p) { return String(p.id) !== String(id); }));
    showAlert('msg', 'Patient deleted.', 'success');
    render();
  }

  window.PatientsPage = { edit: edit, remove: remove };

  $('search').addEventListener('input', function (e) { query = e.target.value.trim(); render(); });
  $('chips').addEventListener('click', function (e) {
    var a = e.target.closest('a[data-filter]');
    if (!a) return;
    e.preventDefault();
    filter = a.getAttribute('data-filter');
    render();
  });
  $('newBtn').addEventListener('click', resetForm);
  $('saveBtn').addEventListener('click', save);
  render();
})();
