# CSS Grid Layout Issue - pat-maynas.html

## Problem
The `.consulta-content` grid on `pat-maynas.html` doesn't match `index.html` layout.

### Expected Layout (per like i want (user)):
```
┌──────────────────────────────────────────────────────────────┐
│ CONSULTA PÚBLICA DEL PAT MAYNAS                             │
├───────────────────────────────┬──────────────────────────────┤
│ consulta-info                 │ consulta-detalles            │
│                               │                              │
│ ¿Qué es la Consulta Pública?  │ Puntos Virtuales             │
│ Texto descriptivo             │ Botón descargar documento    │
│                               │ Botón visor PAT Maynas       │
│ ┌ Duración ┐                  │ Botón resultados             │
│ ┌ Cómo participo ┐            │                              │
│ ┌ Puntos físicos ┐            │ ┌──────────────────────────┐ │
│ ┌ Audiencias desc. ┐          │ │                          │ │
│ ┌ Audiencia metro. ┐          │ │        mapa-imagen        │ │
│                               │ │                          │ │
│                               │ └──────────────────────────┘ │
└───────────────────────────────┴──────────────────────────────┘
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

## Status: UNRESOLVED
Need to investigate why grid placement with `!important` still doesn't work properly.