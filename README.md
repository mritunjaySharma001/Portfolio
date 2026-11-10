# Mritunjay Sharma — Developer Portfolio

Responsive personal portfolio built with **Angular 18** (standalone components, signals, SCSS).
Dark theme by default with a light/dark toggle, scroll-reveal animations and a typing hero.

## Run locally
```bash
npm install
npm start            # http://localhost:4200
```

## Edit content
All text lives in one file: `src/app/data/portfolio.data.ts` (profile, skills, experience, projects, education).

## Assets
Drop these into `public/assets/`:
- `profile.jpg` — square photo (≥ 640×640). Falls back to "MS" initials if missing.
- `Mritunjay_Sharma_Resume.pdf` — used by every "Download Resume" button.

## Deploy to GitHub Pages
1. Create an empty GitHub repo named `mritunjay-portfolio`.
2. `git remote add origin https://github.com/<your-username>/mritunjay-portfolio.git`
3. `git add -A && git commit -m "Portfolio" && git push -u origin main`
4. `npm run deploy` — builds and pushes to the `gh-pages` branch.
5. In the repo: **Settings → Pages → Source: `gh-pages` branch**.

Site URL: `https://<your-username>.github.io/mritunjay-portfolio/`
(If you rename the repo, update `--base-href` in the `deploy` script in `package.json`.)
