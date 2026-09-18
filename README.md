# Louis Lim — Portfolio

A static portfolio site for Louis Lim Chee Keat (Web Programmer), showcasing live client projects.

## Structure
- `index.html` — single-page site (hero, about, skills, work, experience, contact)
- `assets/css/style.css` — all styling
- `assets/js/main.js` — nav, scroll reveal, filters, lightbox, contact form
- `assets/img/` — project screenshots + profile photo
- `assets/Louis-Lim-Resume.pdf` — downloadable résumé

No build step — plain HTML/CSS/JS.

## Run locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000

## Deploy
Push this folder to a GitHub repo and import it into Vercel as a static site (no framework preset / build command needed, output directory = `/`).

## Notes
Two of the ten listed projects (`Landing Page Build`, `Business Website Build`) currently sit on temporary cPanel staging URLs that are unreachable, so those cards use a placeholder graphic instead of a live screenshot. Swap in the real project name + screenshot in `index.html` once they're on a permanent domain.
