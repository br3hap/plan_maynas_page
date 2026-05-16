# Muestra Virtual Page - Styling Fix Process

## Date
May 2026

## Problem
The `muestra-virtual.html` page was blank/white in light mode when viewed directly, unlike the same content in `index.html` which displayed correctly with blue background and white text.

## Root Cause Analysis

### Issue 1: Missing `.muestra-div` Wrapper
In `index.html`, the Muestra Virtual section is wrapped in a `<div class="muestra-div">` which applies the distinctive blue background styling:

```css
.muestra-div {
  background: #4888c8;
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
```

The standalone `muestra-virtual.html` page was missing this wrapper, so the section had no special background styling and appeared white in light mode.

### Issue 2: Text Color Contrast
The section uses `style="color: white;"` for text. This works fine on the blue background (`.muestra-div`) but would be invisible on a white background.

## Solution Applied

### Structural Fix
Added the `.muestra-div` wrapper around the Muestra Virtual section in `muestra-virtual.html`:

```html
<div class="muestra-div">
  <section id="muestra" class="section">
    <div class="container" style="color: white;">
      <h1 class="page-title">Muestra Virtual</h1>
      ...
    </div>
  </section>
</div>
```

Also added closing `</div>` before the gallery section to properly close the wrapper.

## Files Affected
- `muestra-virtual.html` - Added `.muestra-div` wrapper around main content section

## Lesson Learned
When extracting content from `index.html` into standalone pages, all structural wrapper divs that provide styling must be included. Classes like `.muestra-div`, `.participamos-div`, `.aliados-container`, `.recursos-div`, etc. are not just semantic containers - they provide essential background styling that makes the content readable and visually distinctive.

## Key CSS Classes Used for Page-Level Styling

| Class | Background Color | Used For |
|-------|------------------|----------|
| `.muestra-div` | #4888c8 (blue) | Muestra Virtual section |
| `.participamos-div` | (inherits dark styling) | Participamos section |
| `.aliados-container` | #ffffff (white) | Nuestros Aliados section |
| `.recursos-div` | #EC643B (orange-red) | Recursos section |
| `.equipo-div` | #EC643B (orange-red) | Equipo section |
| `.consulta-pdm` | (light styling) | PDM Iquitos section |
| `.bg-alt` | (alternate background) | Gallery, Talleristas, Equipo |

## Maintenance Note
When creating new standalone pages from index.html content, ensure all structural wrapper divs are copied along with the content. These wrappers are essential for maintaining the visual identity and readability of each section.