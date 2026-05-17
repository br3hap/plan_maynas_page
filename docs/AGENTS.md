# Plan Maynas - Agent Instructions

## Project Type
Static website (HTML + CSS + vanilla JS). No build system, no package manager, no tests, no linting.

## Structure
- `index.html` — Main page (root level)
- `src/pages/` — Secondary pages (aliados, contacto, muestra-virtual, participamos, pat-maynas, pdm-iquitos, planes-territoriales, recursos, publicaciones)
- `src/style/` — Per-page CSS files (import shared.css as base)
- `src/docs/` — PDFs and images
- `styles.css`, `script.js` — Root-level assets (used by `index.html` only)
- `docs/SKILLS/` — Project-specific skills (load when relevant)
- `docs/progress/` — Detailed historical notes, error resolutions, current state

## How to Preview
```bash
npx serve .
```
Or open `index.html` directly in a browser.

## Path Quirks (Most Common Bug Source)
- Pages in `src/pages/` are **2 levels deep** from root. `script.js` is at root → use `../../script.js` (not `script.js` or `../script.js`).
- CSS files live in `src/style/` (not `src/pages/style/`). From a page: `../style/<page>.css`.

## Dark Mode
- Toggle adds `.dark-mode` class to `<body>` via `script.js`.
- Inline `style="color: #171b46;"` (hardcoded dark blue) throughout HTML → invisible on dark backgrounds.
- Colored wrapper divs (`.hitos-del-proyecto`, `.participamos-div`, `.recursos-div`, etc.) have white text in light mode but dark backgrounds in dark mode.
- CSS specificity wins over `!important`: `.dark-mode .class p` (0,3,1) beats `.class p` (0,2,1). Use `#root .class p` (1,2,0) to override.

## Project Skills (load from `docs/SKILLS/` when relevant)
- `plan-maynas-dark-mode.md` — Dark mode color contrast issues
- `plan-maynas-dark-mode-repair.md` — Toggle broken on src/pages/ (wrong paths)
- `plan-maynas-css-specificity.md` — CSS specificity conflicts, text disappearing
- `plan-maynas-css-refactor.md` — Extracting page styles from shared.css
- `title-subtitle-fix.md` — Redundant h1 vs h2 subtitle
- `context7-mcp.md` — Use Context7 for library documentation

## Detailed History
See `docs/progress/` for error resolutions, current state, and architectural decisions:
- `progress.md` — Recent fixes (muestra-virtual, participamos, aliados paths, CSS specificity lessons)
- `REFACTORING.md` — Multi-page architecture decisions, CSS file structure
- `STYLING_FIX.md` — Wrapper divs essential for styling (lesson learned)
- `GRID_ISSUE.md` — pat-maynas grid layout resolved (CSS specificity, duplicate rules)