# CSS Grid Layout Issue - pat-maynas.html

## Problem
The `.consulta-content` grid on `pat-maynas.html` doesn't match `index.html` layout.

### Expected Layout (per index.html):
```
┌─────────────────┬─────────────────┐
│ consulta-info   │ consulta-detalles│
│ ("¿Qué es...") │ (timeline items) │
├─────────────────┴─────────────────┤
│ mapa-imagen (Puntos Virtuales)   │
└───────────────────────────────────┘
```

### Actual Behavior:
Elements appear misaligned or in wrong columns despite CSS grid rules.

## Root Cause
CSS specificity conflict - multiple `.consulta-detalles` rules exist:
- Line 2024: grid placement rules
- Line 2075: `margin: var(--spacing-lg) 0;`
- Line 2847: dark-mode override
- Line 2937: dark-mode override

## Current CSS (styles.css)
```css
.consulta-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: start;
  margin-top: var(--spacing-xl);
}

.consulta-detalles {
  grid-column: 2 !important;
  grid-row: 1 !important;
  margin: var(--spacing-lg) 0;
}

.consulta-info {
  grid-column: 1 !important;
  grid-row: 1 !important;
}

.mapa-imagen {
  grid-column: 1 !important;
  grid-row: 2 !important;
}
```

## HTML Structure (pat-maynas.html)
```html
<div class="consulta-content">
  <div class="consulta-info">...</div>
  <div class="consulta-detalles">...</div>
  <div class="mapa-imagen">...</div>
</div>
```

## Status: RESOLVED

### Changes Made:
1. Removed duplicate `.consulta-detalles` rules
2. Removed `!important` flags (unnecessary)
3. Added `grid-template-rows: auto auto` for explicit row sizing
4. Consolidated grid placement + margin into single rule

### Current CSS (styles.css lines 2016-2038):
```css
.consulta-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: var(--spacing-xl);
  align-items: start;
  margin-top: var(--spacing-xl);
}

.consulta-detalles {
  grid-column: 2;
  grid-row: 1;
  margin: var(--spacing-lg) 0;
}

.consulta-info {
  grid-column: 1;
  grid-row: 1;
}

.mapa-imagen {
  grid-column: 1;
  grid-row: 2;
  width: 100%;
}
```