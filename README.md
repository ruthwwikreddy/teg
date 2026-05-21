# TEG Website — The Education Group

This folder contains the **official website** for TEG (The Education Group), your overseas education consultancy.

**Live website:** [https://theeducationgroup.net/](https://theeducationgroup.net/)

You do **not** need to know programming to use most of this guide. It explains what each part does and how to keep the site running.

---

## What this website does

The site helps students and parents:

- Learn about studying abroad (UK, USA, Canada, Australia, Dubai, and more)
- Explore medical courses (MBBS, Nursing, Pharmacy, Dental)
- Read success stories and student photos
- Book **free counselling** via the contact form
- Find your phone, email, and office details

When someone fills in the contact form on the homepage or contact page, their details are saved so your team can follow up (see **Admin panel** below).

---

## Quick start — view the site on your computer

1. Open this project folder on your Mac or PC.
2. Double-click **`index.html`**.
3. It should open in your web browser (Chrome, Safari, or Edge).

That is enough to **preview** pages locally. The live site on the internet is updated separately (see **Publishing updates**).

---

## Main pages (what to edit)

| File | What visitors see |
|------|-------------------|
| `index.html` | Home page |
| `about.html` | About TEG, team, mission |
| `services.html` | Services you offer |
| `study-abroad.html` | Countries and study options |
| `happy-students.html` | Student photos and testimonials |
| `contact.html` | Contact form and details |
| `usa.html`, `canada.html`, `united-kingdom.html`, etc. | One page per country |
| `mbbs.html`, `nursing.html`, `pharmacy.html`, `dental.html` | Medical study pages |
| `btec.html` | BTEC programs |
| `privacy-policy.html` / `terms-of-service.html` | Legal pages |

**Shared design (change colours, fonts, layout for all pages):**

- `style.css` — look and feel
- `script.js` — menus, animations, small interactions
- `logo.png` — logo shown in the header

**Images:**

- `countries/` — flag or country images on study-abroad cards
- `medical/` — icons for medical programs
- `students/` — photos on Happy Students page
- `gemini/` — decorative background images on some pages
- `uni/` — partner university logos
- `pritpal.png` — photo on About / Home

To change a photo: replace the image file **keeping the same file name**, or edit the HTML page and change the `src="..."` path to your new file name.

---

## Admin panel (student enquiries)

Staff can view form submissions here:

1. Open **`admin.html`** in the browser (on the live site: `https://theeducationgroup.net/admin.html`).
2. Sign in with the admin password (set in your hosting environment — see your developer or `.env.example`).
3. Read, mark, or delete enquiries.

**Settings page:** `settings.html` — default reply email and similar options (for staff use).

> Keep the admin URL private. Do not link it from the public menu.

---

## Contact details on the site

These appear in several places (footer, contact page, schema for Google):

- **Email:** pritpal@theeducationgroup.net  
- **Website:** https://theeducationgroup.net/

If you change email or phone, search the project for the old text and update every occurrence, or ask your developer to do one global update.

---

## Publishing updates (going live)

The site is hosted on **Vercel** and connected to this GitHub repository. Typical flow:

1. Someone edits the HTML/CSS/images locally.
2. Changes are saved to **GitHub** (this repo).
3. Vercel automatically rebuilds and publishes the live site within a few minutes.

If you are not technical, send updated files to whoever manages GitHub/Vercel; they will deploy for you.

**Firebase** is used only for storing contact-form enquiries. Firebase settings live in `firebase-config.js` and environment variables — your developer should update those, not duplicate keys in public files.

---

## Files you can ignore

| Item | Why |
|------|-----|
| `.env` | Secret passwords and API keys — never share or upload |
| `.env.example` | Template showing which secrets are needed (no real passwords in GitHub) |
| `build.js` / `package.json` | Used when deploying with environment variables |
| `firebase.json`, `firestore.rules`, `.firebaserc` | Firebase security rules |
| `sitemap.xml`, `robots.txt` | Help Google find your pages |
| `vercel.json` | Hosting redirects (e.g. old `/testimonials` links) |

---

## Common tasks (non-technical)

**Update text on a page**  
Open the matching `.html` file in a text editor (or ask your developer). Change the words between tags like `<h1>`, `<p>`, and `<a>`. Save and publish.

**Add a student photo**  
Add the image file into the `students/` folder, then add a line on `happy-students.html` copying an existing `<img src="students/...">` line.

**Change university list on a country page**  
Edit that country’s HTML file (e.g. `canada.html`) — each university is usually a “card” block you can copy and paste.

**Broken image on the live site**  
Check the file exists in the folder and the name in HTML matches exactly (including spaces and capital letters).

---

## Getting help

- **Hosting / domain / email not working:** contact your Vercel or domain provider support, or your web developer.
- **Forms not saving:** check Firebase project and that environment variables are set on Vercel.
- **Design or new pages:** work with your web developer using this README and the live site as reference.

---

## License

This website is **proprietary**. All rights reserved by TEG — The Education Group.
