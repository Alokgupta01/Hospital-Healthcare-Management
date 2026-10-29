# Hospital and Healthcare Management System (HHMS)

A multi-page hospital management website built with **HTML, CSS and vanilla JavaScript**. Data is stored in the browser (`localStorage`), so no backend or installation is needed.
College project - GLA University, Mathura.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Patients | `pages/patients.html` |
| Medical records | `pages/records.html` |
| Doctors | `pages/doctors.html` |
| Appointments | `pages/appointments.html` |
| Billing | `pages/billing.html` |
| Admin dashboard | `pages/admin.html` |

## Folder structure

```
Hospital-Healthcare-Management-System/
  index.html
  pages/   (admin, patients, records, doctors, appointments, billing)
  css/     (style.css shared + one CSS file per page)
  js/      (common.js shared + one JS file per module)
```

## Team

| Member | Module | Branch |
| --- | --- | --- |
| Alok Gupta (Team Leader) | Setup, home page, admin dashboard, shared CSS and `js/common.js`, `js/admin.js` | `feature/auth-admin` |
| Akendra | Patients and medical records (`js/patients.js`, `js/records.js`) | `feature/patient` |
| Alok Kumar Singh | Doctors (`js/doctors.js`) | `feature/doctor` |
| Ananya Vatsa | Appointments and billing (`js/appointments.js`, `js/billing.js`) | `feature/appointment-billing` |

## How to run

Open `index.html` in any browser. No installation needed.

The first time a page opens, `js/common.js` fills the browser storage with sample patients, doctors,
appointments and bills. To start with empty data, clear the site data for the page in your browser.
