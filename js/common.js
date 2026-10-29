// =====================================================
//  COMMON.JS - shared helpers + demo data
//  Owner: Alok Gupta (Team Leader)  |  Branch: feature/auth-admin
//  Sab pages isko pehle load karte hain (data localStorage mein rehta hai).
// =====================================================

function getData(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch (e) { return []; }
}
function saveData(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function generateId() { return Date.now().toString() + Math.floor(Math.random() * 1000); }

// Text ko HTML mein daalne se pehle escape karo (XSS se bachne ke liye)
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function initials(name) {
  return String(name || '?').replace(/^dr\.?\s*/i, '').trim().split(/\s+/)
    .slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
}
function fmtMoney(n) { return '\u20B9' + Number(n || 0).toLocaleString('en-IN'); }
function fmtDate(iso) {            // 2026-09-21 -> 21 Sep 2026
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return iso || '';
  var mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m[2] - 1];
  return (+m[3]) + ' ' + mon + ' ' + m[1];
}
function badgeFor(status) {        // status text -> badge class
  var map = {
    outpatient: 'green', admitted: 'blue', discharged: 'gray',
    available: 'green', unavailable: 'red',
    pending: 'amber', confirmed: 'blue', completed: 'green', cancelled: 'red',
    paid: 'green', unpaid: 'red'
  };
  return 'badge badge-' + (map[String(status).toLowerCase()] || 'gray');
}
function showAlert(id, msg, type) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = 'alert alert-' + (type || 'success');
  el.style.display = 'block';
  setTimeout(function () { el.style.display = 'none'; }, 3500);
}

// ---------- Demo data: purane static pages ka sample content ----------
// Pehli baar page khulne par ye data localStorage mein jaata hai, taaki
// pages pehle jaise hi dikhein. (Browser data clear karne par dobara aa jaata hai.)
function seedDemoData() {
  if (localStorage.getItem('hhms_seeded')) return;
  var P = function (n, name, age, gender, bg, city, status) {
    return { id: 'seed-p' + n, pid: 'P-' + n, name: name, age: String(age), gender: gender, bloodGroup: bg,
             phone: '98000000' + String(n).slice(-2), address: city, dob: '', history: '', status: status };
  };
  var patients = [
    P(1001, 'Rohan Sharma', 34, 'Male',   'B+',  'Mathura',    'Outpatient'),
    P(1002, 'Priya Verma',  27, 'Female', 'O+',  'Agra',       'Admitted'),
    P(1003, 'Mohit Kumar',  52, 'Male',   'A+',  'Vrindavan',  'Admitted'),
    P(1004, 'Sneha Gupta',  41, 'Female', 'AB+', 'Mathura',    'Outpatient'),
    P(1005, 'Amit Yadav',   60, 'Male',   'O-',  'Aligarh',    'Discharged'),
    P(1006, 'Kabir Singh',   8, 'Male',   'B-',  'Mathura',    'Outpatient')
  ];
  var D = function (key, name, spec, exp, fee, timing, avail) {
    return { id: 'seed-d-' + key, name: name, specialization: spec, experience: String(exp), fee: String(fee),
             phone: '9810000' + String(exp).padStart(3, '0'), timing: timing, available: avail };
  };
  var doctors = [
    D('anjali', 'Anjali Mehra', 'Cardiologist',      14, 800, '10 AM to 2 PM', true),
    D('vikram', 'Vikram Rao',   'Orthopedic',        11, 700, '11 AM to 4 PM', true),
    D('neha',   'Neha Kapoor',  'Pediatrician',       9, 600, '9 AM to 1 PM',  true),
    D('suresh', 'Suresh Nair',  'General Physician', 20, 500, '9 AM to 5 PM',  true),
    D('isha',   'Isha Bansal',  'Dermatologist',      6, 600, '12 PM to 6 PM', false),
    D('rahul',  'Rahul Joshi',  'Cardiologist',       8, 750, '2 PM to 7 PM',  true)
  ];
  var A = function (n, pId, pName, dKey, dName, dept, fee, time, status) {
    return { id: 'seed-a' + n, token: 'A-' + n, patientId: pId, doctorId: 'seed-d-' + dKey, patientName: pName,
             doctorName: dName, department: dept, doctorFee: fee, date: '2026-09-21', time: time, reason: '',
             status: status };
  };
  var appointments = [
    A(201, 'seed-p1001', 'Rohan Sharma', 'anjali', 'Anjali Mehra', 'Cardiologist',      800, '10:00 AM', 'Completed'),
    A(202, 'seed-p1004', 'Sneha Gupta',  'vikram', 'Vikram Rao',   'Orthopedic',        700, '11:30 AM', 'Pending'),
    A(203, 'seed-p1006', 'Kabir Singh',  'neha',   'Neha Kapoor',  'Pediatrician',      600, '12:15 PM', 'Confirmed'),
    A(204, null,         'Meena Devi',   'suresh', 'Suresh Nair',  'General Physician', 500, '02:00 PM', 'Confirmed'),
    A(205, null,         'Farhan Ali',   'suresh', 'Suresh Nair',  'General Physician', 500, '03:30 PM', 'Cancelled')
  ];
  var B = function (n, pName, dName, date, amount, status, items, appId) {
    return { id: 'seed-b' + n, invoice: 'INV-' + n, appointmentId: appId || null, patientName: pName,
             doctorName: dName || '', date: date, consultFee: amount, extra: 0, amount: amount,
             method: 'Cash', status: status, items: items || null };
  };
  var bills = [   // purane se naya (newest last)
    B(1038, 'Kabir Singh',  '', '2026-09-18',   600, 'Unpaid'),
    B(1039, 'Amit Yadav',   '', '2026-09-19',  9750, 'Paid'),
    B(1040, 'Priya Verma',  '', '2026-09-20', 18400, 'Unpaid'),
    B(1041, 'Sneha Gupta', 'Vikram Rao', '2026-09-21', 1200, 'Unpaid',
      [['Orthopedic consultation', 700], ['X-ray (knee)', 500]]),
    B(1042, 'Rohan Sharma', 'Anjali Mehra', '2026-09-21', 2200, 'Paid',
      [['Cardiology consultation', 800], ['ECG', 600], ['Lipid profile', 900], ['Discount', -100]], 'seed-a201')
  ];
  saveData('patients', patients);
  saveData('doctors', doctors);
  saveData('appointments', appointments);
  saveData('bills', bills);
  localStorage.setItem('hhms_seeded', '1');
}
seedDemoData();
