# Doctors Module — HHMS
 
Part of the **Hospital and Healthcare Management System (HHMS)** group project.
College project — GLA University, Mathura. Built with **only HTML and CSS** (no JavaScript).
 
**Member:** Alok Kumar Singh
**Branch:** `feature/doctor`
**Files owned:** `doctors.html`, `doctors.css`
 
## What this page does
 
The Doctors page (`pages/doctors.html`) shows the hospital's doctor directory and duty schedule:
 
- **Doctor cards** — a grid of doctor profiles (name, specialization, availability) for doctors like
  Dr. Anjali Mehra, Dr. Vikram Rao, Dr. Neha Kapoor, Dr. Suresh Nair, Dr. Isha Bansal and Dr. Rahul Joshi
- **Search doctor by name** — a search box (design only, since the project has no JavaScript)
- **Weekly duty roster** — a table of doctors against Mon–Sat showing their duty schedule
- **Add doctor** — a form to add a new doctor (front-end form only, no backend)
All styling for this page is in `doctors.css`. Shared elements (navbar, footer, buttons, tables) come from
the shared `css/style.css`, which is owned by the team leader — do not edit that file from this branch.
 
## Files in this folder
 
| File | Purpose |
| --- | --- |
| `doctors.html` | The Doctors page markup |
| `doctors.css` | Styling specific to this page (doctor cards, roster table, add-doctor form) |
| `START-HERE.txt` | Git commands to push this module to your branch |
 
## How to preview
 
Open `doctors.html` in a browser. For the navbar/footer links to work correctly it should sit inside the full
project structure (`pages/doctors.html` next to the other pages and `../css/`), so preview it from within the
full project folder rather than standalone.
 
## Git workflow
 
```bash
git clone <repo-url>
cd Hospital-Healthcare-Management-System
git switch dev
git pull origin dev
git switch -c feature/doctor
 
# copy your files in:
#   pages/doctors.html
#   css/doctors.css
 
git add pages/doctors.html css/doctors.css
git commit -m "feat: add doctors page with directory, roster and add-doctor form"
git push -u origin feature/doctor
```
 
Then open a Pull Request on GitHub: base = `dev`, compare = `feature/doctor`.
 
**Rules**
- Only add your own two files (`pages/doctors.html`, `css/doctors.css`). Never `git add .`.
- Don't push your local copy of `css/style.css` — it's there only so the page previews correctly on your machine.
- Pull `dev` before you start working each time, to stay in sync with the rest of the team.
## Notes
 
- Search and the "Add doctor" form are visual only — there's no JavaScript in this project, so they don't
  actually filter or save data. Sample doctors are hard-coded in the HTML.
- Fonts load from the internet; offline you'll see the system font instead.
 