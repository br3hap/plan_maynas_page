---
name: plan-maynas-dark-mode-repair
description: Fix dark mode toggle not working on pages in src/pages/. Use when dark mode button fails to toggle on any page in src/pages/.
---

## When to Use This Skill

Activate this skill when:
- "dark mode not working" / "modo oscuro no funciona"
- "toggle button broken" / "botón de modo oscuro roto"
- "dark mode on src/pages/" / "modo oscuro en src/pages/"
- Dark mode works on index.html but not on pages in src/pages/
- "cannot change theme" / "no puedo cambiar el tema"

## Common Causes

### 1. Incorrect Script Path (Most Common)

**Directory structure:**
```
plan_maynas_page/
├── script.js          ← JavaScript is HERE (root level)
├── index.html
└── src/
    └── pages/
        └── participamos.html  ← Pages are HERE (2 levels deep)
```

Pages in `src/pages/` are TWO levels deep from root. The `script.js` is at root level.

**Wrong paths:**
- `script.js` (looks in src/pages/script.js - doesn't exist)
- `../script.js` (looks in src/script.js - wrong, script.js is not in src/)
- `src/script.js` (looks in src/script.js - wrong)

**Correct path:**
- `../../script.js` (goes up two levels to reach root where script.js lives)

### 2. Incorrect CSS Path

**Wrong path:**
```html
<link rel="stylesheet" href="../src/style/page.css" />
```

**Correct path:**
```html
<link rel="stylesheet" href="../style/page.css" />
```

### 3. Missing Dark Mode CSS Rules

If the toggle works but colors are wrong, dark mode CSS rules may be missing or incorrectly targeted.

## Repair Workflow

### Step 1: Check Script Path

```bash
# From src/pages/, script.js is at ../../script.js
node -e "const fs = require('fs'); console.log(fs.existsSync('../../script.js') ? 'OK' : 'FAIL');"
```

### Step 2: Fix Script Tag in HTML

In each page under `src/pages/`, the script tag should be:
```html
<script src="../../script.js"></script>
```

NOT:
```html
<script src="script.js"></script>
```

OR:
```html
<script src="../script.js"></script>
```

### Step 3: Verify CSS Path

CSS file location: `src/style/page.css`

From `src/pages/page.html`, the correct relative path is:
```html
<link rel="stylesheet" href="../style/page.css" />
```

NOT:
```html
<link rel="stylesheet" href="../src/style/page.css" />
```

### Step 4: Check Dark Mode CSS Rules

If toggle works but colors are wrong, check shared.css for dark mode rules:

```css
.dark-mode .class-name {
  background: var(--bg-alt);
}

.dark-mode .class-name h2,
.dark-mode .class-name p {
  color: white !important;
}
```

## Quick Fix All Pages Script

Run this to fix all pages at once:

```bash
# Fix script paths
for f in src/pages/*.html; do
  sed -i 's|src="script.js"|src="../../script.js"|g' "$f"
  sed -i 's|src="../script.js"|src="../../script.js"|g' "$f"
done

# Fix CSS paths
for f in src/pages/*.html; do
  sed -i 's|href="../src/style/|href="../style/|g' "$f"
done
```

## Pages Affected

All pages in `src/pages/`:
- `aliados.html`
- `contacto.html`
- `muestra-virtual.html`
- `participamos.html`
- `pat-maynas.html`
- `pdm-iquitos.html`
- `planes-territoriales.html`
- `publicaciones.html`
- `recursos.html`

## Verification

After fixes:
1. Open each page in browser
2. Click dark mode toggle
3. Verify:
   - Background changes to dark color
   - Text remains readable (white on dark backgrounds)
   - No console errors
4. Toggle back to light mode
5. Verify original colors return

## Dark Mode CSS Structure

Each page CSS file should include dark mode rules:

```css
@import url('shared.css');

/* Light mode styles */
.section-class {
  background: #ffffff;
  /* ... */
}

/* Dark mode overrides */
.dark-mode .section-class {
  background: #2D2F3D;
}

.dark-mode .section-class h2,
.dark-mode .section-class p {
  color: white !important;
}
```

## Trigger Words

- "dark mode not working"
- "modo oscuro no funciona"
- "toggle broken"
- "theme toggle fails"
- "dark mode button"
- "botón oscuro"
- "no cambia el tema"
- "theme not changing"
- "tema no cambia"