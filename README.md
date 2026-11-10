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
Deployment is automatic: every push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and publishes it to GitHub Pages.

One-time setup: in the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

Live URL: `https://mritunjaysharma001.github.io/Portfolio/`

The workflow sets the base path from the repo name. If you rename the repo to `mritunjaySharma001.github.io`, the site moves to `https://mritunjaysharma001.github.io/` with no code change.

Manual fallback: `npm run deploy` pushes a build to a `gh-pages` branch. Its `--base-href` in `package.json` must match the repo name.
