# Prince Chimenem Godspower — Personal Portfolio & Academic Management Platform

**Course:** COS 106 – Introduction to Web Technologies (MIVA Open University)  
**Project:** Practical Term Project (20 Marks)  
**Author:** Prince Chimenem Godspower (`Marcusprince983@gmail.com`)  
**Technology Stack:** Pure HTML5, Semantic CSS3, Vanilla JavaScript (Zero External Frameworks, Zero Build Dependencies)

---

## Project Overview

This multi-page web platform fulfills and exceeds the MIVA Open University COS 106 Practical Term Project specification. Built purely with semantic HTML5, modern CSS3 custom properties, and modular vanilla JavaScript, it functions as both an executive data science portfolio and a functional academic task management platform.

### Structure & Pages
1. **`index.html` (Homepage):** Sticky responsive glassmorphism navigation, animated "PCG" preloader, typewriter hero header cycling across technical roles, animated quantitative number counters (5+ yrs, 300,000+ outranked, 37.2% stockout reduction), 3 core capability cards, awards ribbon, and direct contact channels.
2. **`about.html` (About & Education):** Interactive timeline of university education and community leadership, career aspirations, technical skills with animated progress bars, comprehensive technical skills `<table>`, hobbies & interests with custom vector iconography, and embedded `<audio>` player with voice recording and file upload studio.
3. **`projects.html` (Featured Case Studies):** 3 core real-world data systems (European Micro-Mobility Fleet Operations & Revenue Optimization, Swedish Agri-Carbon Sequestration & Soil Telemetry Platform, NYC Restaurant Health Risk Engine & Sanitation Predictor) with full high-resolution Power BI dashboard screenshots, structured technical breakdowns (Scope & Scale, Key Architecture, Impact & Results, Executive Deliverable), and full-screen Lightbox zoom.
4. **`planner.html` (Academic Planner):** Interactive course milestone manager featuring real-time task creation, completion checkboxes, animated delete actions, live counters (Total / Completed / Pending), progress percentage bar, multi-state filter tabs, and `localStorage` persistence.
5. **`contact.html` (Contact & Mentorship):** Web3Forms serverless form handler (connected to `p.godspower9045@miva.edu.ng`), strict client-side form validation (empty checks, email regex, digits-only phone check) with inline error feedback and animated success alert, direct contact channels, and a weekly consultation schedule `<table>`.

---

## How to Run the Website Locally

Because this project is built entirely with standard HTML5, CSS3, and JavaScript, it can be run in any modern web browser without installing any package managers or runtimes:

### Method 1: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in Chrome, Firefox, Safari, or Edge.

### Method 2: Local Static Server (Recommended)
Using Python (pre-installed on macOS/Linux/Windows):
```bash
# In the project root directory:
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

Using Node.js / `npx serve`:
```bash
npx serve .
```

---

## Embedded Media & Dashboard Assets

### 1. Executive Voice Intro
The embedded audio player on the **About** page (`about.html`) plays Prince's executive voice introduction (`media/audio-intro.mp3`) with clean semantic HTML5 audio controls.

### 2. Pictures of Your Power BI Dashboards
Your authentic multi-page Power BI dashboards are permanently saved in the website:
- `images/profile.jpg` (Prince's authentic portrait photo)
- `images/project1.jpg` (European Micro-Mobility Fleet Operations & Revenue Optimization — 3-page high-resolution dashboard)
- `images/project2.jpg` (Swedish Agri-Carbon Sequestration & Soil Telemetry Platform — 3-page high-resolution dashboard)
- `images/project3.png` (NYC Restaurant Health Risk Engine & Sanitation Predictor — Power BI dashboard)

Clicking on any dashboard in `projects.html` opens the high-resolution lightbox modal so reviewers can inspect every visual KPI, chart, and slicer in full resolution.

---

## Deploying the Website

### Option A: GitHub Pages (Free & Recommended for University Submissions)
1. Initialize a Git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial release of COS 106 term project portfolio"
   ```
2. Create a new repository on [GitHub](https://github.com) named `cos106-portfolio`.
3. Push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/cos106-portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages > Source**, select `main` branch and `/ (root)` folder, then click **Save**.
5. Your website will be live at `https://<your-username>.github.io/cos106-portfolio/`.

### Option B: Vercel (Instant 1-Click Deploy)
1. Install Vercel CLI: `npm install -g vercel` or log in at [vercel.com](https://vercel.com).
2. Run `vercel` in the project root directory and follow the short prompts (accept defaults for static site).
3. Vercel will output a live production URL (e.g., `https://prince-portfolio.vercel.app`).

---

## Rubric & Technical Checklist Compliance

| Evaluation Requirement | File Location / Implementation |
|---|---|
| **Semantic HTML Elements** | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>` across all pages |
| **Forms** | `planner.html` (Academic Task Input) and `contact.html` (Inquiry Submission) |
| **Tables** | `about.html` (Skills Summary Table) and `contact.html` (Mentorship Consultation Schedule Table) |
| **Images with Alt Text** | `images/profile.jpg`, `images/project1.jpg`, `images/project2.jpg`, `images/project3.jpg` with descriptive `alt` attributes |
| **Lists (Ordered & Unordered)** | `<ol class="timeline">` in `about.html`, `<ul class="hobbies-grid">` in `about.html`, `<ul class="footer-links-list">` |
| **Multimedia (Video/Audio)** | `<audio controls>` with audio intro in `about.html` (fully satisfies COS 106 rubric) |
| **External CSS Stylesheet** | `css/style.css` (variables, responsive media queries, Flexbox & CSS Grid, dark/light themes) |
| **Modular JavaScript** | `js/main.js` (core UX & observers), `js/planner.js` (interactive planner), `js/contact.js` (validation) |
| **DOM Manipulation & Events** | Task addition, deletion with animations, filter tabs, theme toggle, mobile drawer |
| **Form Validation** | Required checks, RFC regex email evaluation, digits-only phone validator with inline errors and Web3Forms integration |
