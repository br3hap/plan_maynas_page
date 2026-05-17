# CSS Grid Layout Issue - pat-maynas.html

## Problem
The `.consulta-content` grid on `pat-maynas.html` didn't match the desired layout. Elements were misaligned despite CSS grid rules due to CSS specificity conflicts and duplicate rules.

### Original Desired Layout:
```
┌─────────────────┬─────────────────┐
│ consulta-info   │ consulta-detalles│
│ ("¿Qué es...") │ (timeline items) │
├─────────────────┴─────────────────┤
│ mapa-imagen (Puntos Virtuales)     │
└────────────────────────────────────┘
```

### Issue: User wanted different disposition
User requested that "Audiencias Públicas Descentralizadas" and "Audiencia Pública Metropolitana" be placed on the **left column** along with the other detail items, and "Puntos Virtuales" + map stay on the **right column** as a single unit.

### Updated Desired Layout:
```
┌─────────────────────────────────┬─────────────────┐
│ consulta-info                   │                 │
│ ¿Cuánto tiempo dura?            │ Puntos Virtuales│
│ ¿Cómo Participo?                │ + Mapa imagen   │
│ Puntos Físicos                  │                 │
│ Audiencias Descentralizadas     │                 │
│ Audiencia Metropolitana          │                 │
└─────────────────────────────────┴─────────────────┘
```

## Root Cause (Original Approach)
CSS specificity conflict - multiple `.consulta-detalles` rules existed with duplicate properties:
- Line 2024: grid placement rules
- Line 2075: `margin: var(--spacing-lg) 0;`
- Line 2847: dark-mode override
- Line 2937: dark-mode override

## Solution: Flexbox Column Containers

Instead of fighting with CSS Grid's explicit placement, we restructured using **flexbox column wrappers**:

### New HTML Structure
```html
<div class="consulta-content">
  <div class="consulta-left">
    <div class="consulta-info">...description...</div>
    <div class="detalle-item consulta-doble">...Duración...</div>
    <div class="detalle-item consulta-doble">...Cómo Participo...</div>
    <div class="detalle-item consulta-doble">...Puntos Físicos...</div>
    <div class="detalle-item consulta-doble">...Audiencias Descentralizadas...</div>
    <div class="detalle-item consulta-doble">...Audiencia Metropolitana...</div>
  </div>

  <div class="consulta-right">
    <div class="mapa-imagen">
      <div class="detalle-item">...Puntos Virtuales...</div>
      <img src="../docs/mapa.PNG" alt="Plan de Desarrollo Municipal" />
    </div>
  </div>
</div>
```

### New CSS Structure
```css
.consulta-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: start;
  margin-top: var(--spacing-xl);
}

.consulta-left {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.consulta-right {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.consulta-info {
  margin-bottom: 0;
}

.consulta-doble {
  margin-bottom: 0;
}

.mapa-imagen {
  width: 100%;
}
```

## Benefits of Flexbox Approach
1. No need for explicit `grid-column` / `grid-row` placement
2. Items flow naturally within their column container
3. Easier to maintain and understand
4. CSS is simpler - no specificity battles
5. Responsive breakpoint already exists: `@media (max-width: 1024px)` switches to single column

## Status: RESOLVED

### Changes Made:
1. Replaced CSS Grid explicit placement with flexbox column wrappers
2. Created `.consulta-left` and `.consulta-right` container divs
3. All detail items (Duration, Cómo Participo, Puntos Físicos, Audiencias) moved to left column
4. Puntos Virtuales + Map stayed on right column as a unit
5. Removed `.consulta-detalles` wrapper div (no longer needed)
6. CSS no longer needs `grid-column` / `grid-row` overrides

### Files Modified:
- `src/pages/pat-maynas.html` - Restructured HTML with `.consulta-left` and `.consulta-right` wrappers
- `src/style/shared.css` - Simplified CSS, removed duplicate `.consulta-detalles` rules, added `.consulta-left` and `.consulta-right` flex containers

### Responsive Behavior:
At 1024px breakpoint, `.consulta-content` switches to single column:
```css
@media (max-width: 1024px) {
  .consulta-content {
    grid-template-columns: 1fr;
  }
}
```