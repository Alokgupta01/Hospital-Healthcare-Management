
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var currentId = null;


  function seedRecords() {
    if (localStorage.getItem('hhms_records_seeded')) return;
    var R = function (n, pid, date, doc, bp, pulse, temp, spo2, dx, rx) {
      return { id: 'seed-r' + n, patientId: pid, date: date, doctor: doc, bp: bp, pulse: pulse, temp: temp, spo2: spo2, diagnosis: dx, rx: rx };
    };
    saveData('records', [
      R(1, 'seed-p1001', '2026-06-03', 'Suresh Nair',  '120/80', '72', '98.2', '99', 'General check-up. Advised regular exercise and reduced salt.', ''),
      R(2, 'seed-p1001', '2026-08-28', 'Anjali Mehra', '130/86', '82', '98.6', '98', 'Chest pain consultation. Advised ECG and blood tests.', 'Pantoprazole 40 mg - before breakfast - 10 days'),
      R(3, 'seed-p1001', '2026-09-12', 'Anjali Mehra', '124/82', '76', '98.4', '98', 'Cardiology follow-up. ECG normal.', 'Metoprolol 25 mg - once daily, morning - 4 weeks\nAtorvastatin 10 mg - once daily, night - 4 weeks'),
      R(4, 'seed-p1002', '2026-09-10', 'Vikram Rao',   '118/76', '80', '99.1', '97', 'Fracture follow-up. Healing well.', 'Calcium 500 mg - once daily - 30 days')
    ]);
    localStorage.setItem('hhms_records_seeded', '1');
  }

  function patientRecords(pid) {
    return getData('records').filter(function (r) { return String(r.patientId) === String(pid); })
      .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });   // newest first
  }

  function fillPatientSelect() {
    var patients = getData('patients');
    $('patientSelect').innerHTML = patients.length ? patients.map(function (p) {
      return '<option value="' + esc(p.id) + '">' + esc(p.name) + ' (' + esc(p.pid || '') + ')</option>';
    }).join('') : '<option value="">No patients registered</option>';
    var want = new URLSearchParams(location.search).get('patient');
    var found = patients.filter(function (p) { return String(p.id) === String(want); })[0];
    currentId = found ? found.id : (patients[0] ? patients[0].id : null);
    if (currentId) $('patientSelect').value = currentId;
  }

  function fillDoctorSelect() {
    var docs = getData('doctors');
    $('r-doctor').innerHTML = docs.length ? docs.map(function (d) {
      return '<option value="' + esc(d.name) + '">Dr. ' + esc(d.name) + '</option>';
    }).join('') : '<option value="">No doctors added</option>';
  }

  function render() {
    var p = getData('patients').filter(function (x) { return String(x.id) === String(currentId); })[0];
    if (!p) {
      $('recordArea').style.display = 'none';
      $('noPatient').style.display = 'block';
      return;
    }
    $('recordArea').style.display = 'block';
    $('noPatient').style.display = 'none';
    var recs = patientRecords(p.id);

    $('sumAvatar').textContent = initials(p.name);
    $('sumName').textContent = p.name;
    $('sumPid').textContent = 'Patient ID ' + (p.pid || '-');
    $('sumAge').textContent = p.age + ' / ' + p.gender;
    $('sumBlood').textContent = p.bloodGroup;
    $('sumStatus').textContent = p.status || 'Outpatient';
    $('sumLast').textContent = recs.length ? fmtDate(recs[0].date) : 'No visits yet';
    $('historyText').textContent = p.history || 'No medical history noted.';

 
    function latest(key) {
      for (var i = 0; i < recs.length; i++) if (recs[i][key]) return recs[i][key];
      return '--';
    }
    $('vBp').textContent = latest('bp');
    $('vPulse').textContent = latest('pulse');
    $('vTemp').textContent = latest('temp');
    $('vSpo2').textContent = latest('spo2');

    $('timeline').innerHTML = recs.length ? recs.map(function (r) {
      return '<li><time>' + esc(fmtDate(r.date)) + '</time>' +
        '<h4>' + esc(r.diagnosis) + '</h4>' +
        '<p>Dr. ' + esc(r.doctor) + (r.bp ? '. BP ' + esc(r.bp) : '') + (r.pulse ? ', pulse ' + esc(r.pulse) : '') + '. ' +
        '<a href="#" onclick="RecordsPage.remove(\'' + esc(r.id) + '\');return false;">Delete</a></p></li>';
    }).join('') : '<li><p class="muted">No visit records for this patient.</p></li>';

    var rx = recs.filter(function (r) { return r.rx; });
    $('rxBody').innerHTML = rx.length ? rx.map(function (r) {
      return '<tr><td>' + esc(fmtDate(r.date)) + '</td><td>' + esc(r.rx).replace(/\n/g, '<br>') + '</td><td>Dr. ' + esc(r.doctor) + '</td></tr>';
    }).join('') : '<tr><td colspan="3" class="no-data">No prescriptions yet</td></tr>';
  }

  function save() {
    if (!currentId) return showAlert('formMsg', 'Select a patient first.', 'error');
    var date = $('r-date').value, dx = $('r-diagnosis').value.trim();
    if (!date || !dx) return showAlert('formMsg', 'Visit date and diagnosis are required.', 'error');
    var recs = getData('records');
    recs.push({
      id: generateId(), patientId: currentId, date: date, doctor: $('r-doctor').value,
      bp: $('r-bp').value.trim(), pulse: $('r-pulse').value.trim(), temp: $('r-temp').value.trim(),
      spo2: $('r-spo2').value.trim(), diagnosis: dx, rx: $('r-rx').value.trim()
    });
    saveData('records', recs);
    $('recordForm').reset();
    location.hash = '#';
    showAlert('msg', 'Record saved successfully.', 'success');
    render();
  }

  function remove(id) {
    if (!confirm('Delete this visit record?')) return;
    saveData('records', getData('records').filter(function (r) { return String(r.id) !== String(id); }));
    render();
  }

  window.RecordsPage = { remove: remove };

  seedRecords();
  fillPatientSelect();
  fillDoctorSelect();
  $('patientSelect').addEventListener('change', function (e) { currentId = e.target.value; render(); });
  $('saveBtn').addEventListener('click', save);
  render();
})();
