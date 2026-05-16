---
name: plan-maynas-css-refactor
description: Refactor shared CSS by extracting page-specific styles into dedicated CSS files. Use when moving styles from shared.css to individual page CSS files (e.g., aliadas.css, contacto.css, etc.).
---

## When to Use This Skill

Activate this skill when:
- "refactor shared css" / "extraer estilos"
- "move styles to page css" / "pasar estilos a css de pagina"
- Moving page-specific styles from shared.css to individual page CSS files
- CSS specificity conflicts between pages
- Cleaning up shared.css

## Refactoring Process

### Step 1: Identify Page-Specific Styles

1. Read `src/pages/<page-name>.html` to find all CSS classes used
2. Read `src/style/shared.css` to find definitions of those classes
3. Identify which classes are ONLY used by that page (not shared across pages)

**Key identifiers for page-specific styles:**
- Classes named after the page: `.planes-territoriales`, `.pat-maynas`, `.pdm-iquitos`
- Wrapper div classes with unique backgrounds: `.proyecto-destacado`, `.instrumentos-pilares-wrapper`
- Any class appearing in only one HTML file

### Step 2: Check for Cross-Page Usage

Before extracting, verify the style is NOT used elsewhere:

```bash
grep -r "classname" src/pages/*.html src/style/*.css
```

If found in multiple pages, KEEP in shared.css.

### Step 3: Extract to Page CSS File

For each page-specific style block:

1. Copy the CSS rules (light mode + dark mode rules together)
2. Paste into the page's dedicated CSS file
3. Replace original in shared.css with a comment

**Example extraction:**

Original in shared.css:
```css
.planes-territoriales {
  background: #ffffff;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 10px 30px var(--shadow-lg);
  margin-bottom: var(--spacing-xl);
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-left: calc(50vw - 50%);
  padding-right: calc(50vw - 50%);
  border-left: none;
  border-right: none;
  border-radius: 0;
}

.dark-mode .planes-territoriales {
  background: #2D2F3D;
}

.dark-mode .planes-territoriales h2,
.dark-mode .planes-territoriales p,
.dark-mode .planes-territoriales ul,
.dark-mode .planes-territoriales li {
  color: white !important;
}
```

Becomes in page CSS (planes-territoriales.css):
```css
@import url('shared.css');

/* Page-specific styles for planes-territoriales.html */

.planes-territoriales {
  background: #ffffff;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 10px 30px var(--shadow-lg);
  margin-bottom: var(--spacing-xl);
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-left: calc(50vw - 50%);
  padding-right: calc(50vw - 50%);
  border-left: none;
  border-right: none;
  border-radius: 0;
}

.dark-mode .planes-territoriales {
  background: #2D2F3D;
}

.dark-mode .planes-territoriales h2,
.dark-mode .planes-territoriales p,
.dark-mode .planes-territoriales ul,
.dark-mode .planes-territoriales li {
  color: white !important;
}
```

Becomes comment in shared.css:
```css
/* .planes-territoriales moved to planes-territoriales.css */
```

### Step 4: Verify Structure

Each page CSS file should follow this structure:
```css
@import url('shared.css');

/* Page-specific styles for <page-name>.html */

/* Section Name */
.section-class {
  /* light mode styles */
}

.dark-mode .section-class {
  /* dark mode overrides */
}

/* Another Section */
.another-class {
  /* styles */
}
```

### Step 5: Remove Duplicate Dark Mode Rules

When extracting, ensure BOTH light and dark mode rules are moved together:
- Light mode: `.class { ... }`
- Dark mode: `.dark-mode .class { ... }`

Do NOT separate them or leave partial rules in shared.css.

## Known Page-Specific Classes Reference

Use this reference to identify which styles belong to which pages:

| Page | Page-Specific Classes |
|------|----------------------|
| `planes-territoriales.html` | `.proyecto-destacado`, `.instrumentos-pilares-wrapper`, `.planes-territoriales` |
| `pat-maynas.html` | `.consulta-content`, `.consulta-detalles`, `.consulta-info`, `.consulta-header` |
| `pdm-iquitos.html` | (TBD - check for PDM-specific classes) |
| `participamos.html` | `.participamos-div` |
| `aliados.html` | `.aliados-container` |
| `recursos.html` | `.recursos-div` |
| `muestra-virtual.html` | `.muestra-div`, `.equipo-div` |
| `contacto.html` | (typically uses shared styles only) |

## Common Patterns to Extract

1. **Full-width wrapper divs with margins:**
   ```css
   .class-name {
     background: #color;
     padding: var(--spacing-xl);
     margin-left: calc(-50vw + 50%);
     margin-right: calc(-50vw + 50%);
     padding-left: calc(50vw - 50%);
     padding-right: calc(50vw - 50%);
   }
   ```

2. **Dark mode text color overrides:**
   ```css
   .dark-mode .class-name h2,
   .dark-mode .class-name p,
   .dark-mode .class-name li {
     color: white !important;
   }
   ```

## Verification Steps

After refactoring:
1. Open the page in browser
2. Toggle dark mode ON - verify all sections have correct colors
3. Toggle dark mode OFF - verify all sections return to light mode
4. Check browser console for 404 errors on CSS files
5. Verify all pages load without layout breakage

## Trigger Words

- "refactor shared css"
- "extraer estilos"
- "mover estilos"
- "page specific css"
- "css especifico de pagina"
- "limpiar shared.css"