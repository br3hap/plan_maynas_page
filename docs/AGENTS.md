# Plan Maynas - Agent Instructions

## Project Type
Static website (HTML + CSS + vanilla JS). No build system, no package manager, no tests, no linting.

## Structure
- `index.html` — Main page
- `publicaciones.html` — News/publications page
- `styles.css` — All styles
- `script.js` — All JavaScript
- `src/docs/` — PDFs and images

## How to Preview
Open `index.html` directly in a browser, or serve locally:
```bash
npx serve .
```

## Project Skills
Project-specific skills are stored in `docs/SKILLS/`. Load them when relevant:
- `plan-maynas-dark-mode.md` — Fix dark mode color contrast issues
- `title-subtitle-fix.md` — Remove redundant h1 titles, use h2 subtitle instead
- `context7-mcp.md` — Use Context7 for library documentation