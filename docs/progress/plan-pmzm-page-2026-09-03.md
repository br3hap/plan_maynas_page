# Plan de Diseño: Página PMZM Iquitos — 3 Septiembre 2026

## Resumen

Plan aprobado para reemplazar el placeholder "En Construcción" de `src/pages/pmzm-iquitos.html` con la página completa del Plan Maestro de la Zona Monumental de Iquitos, según el contenido definido en `pmzm_page_content.md`. La página reutiliza exclusivamente componentes existentes del sitio (familia de páginas de planes PDM/PAT), sin tocar `script.js` ni `shared.css`.

---

## Estructura de la página (7 bloques)

| # | Bloque | Patrón reutilizado |
|---|--------|--------------------|
| 1 | **Hero**: título principal + 2 párrafos intro | Banda beige full-bleed `.pmzm-hero` (copia del patrón `.consulta-pdm`, shared.css:2933) con `#E5D3C1` y texto `#171b46` (legible en light y dark, igual que PDM) |
| 2 | **¿Qué define el PMZM?** | Sección blanca estándar: `.section-title` + `.section-description` centrada (700px) |
| 3 | **¿Qué conforma la Zona Monumental?** + `1pmzm.png` (1920x1080) | Sección `.bg-alt`; `figure.galeria-item.pmzm-figura` → **lightbox existente gratis** (script.js:763) + `.galeria-overlay` "Haz clic para ampliar"; page CSS `object-fit: contain; height: auto` |
| 4 | **¿Qué regula la Zona Monumental?** + `2_que-regula-y-propone-el-PMZM2.png` (1366x768) | Igual que #3, fondo blanco (alternancia) |
| 5 | **¿Sabes si estás en la Zona Monumental?** + mapa `FINAL_Mapa_Diptico.png` (8740x12402, 12.3 MB) | Sección `.bg-alt` + **modal dedicado con zoom/pan** (decisión del usuario) |
| 6 | **Consulta Pública del PMZM** | **Estilo PAT Maynas** (decisión del usuario): fondo blanco, cards blanco/gris, iconos verdes |
| 7 | Footer | Sin cambios |

---

## Decisiones del usuario

1. **Consulta Pública**: estilo PAT Maynas — "sencillo con cards tonos blancos y grises y verdes botones o icons, dark mode similar al Pat Maynas también".
2. **Zoom del mapa**: modal con zoom/pan + preview optimizado (carga del original 12 MB solo al abrir).

---

## Detalle: Zoom del mapa (bloque 5)

- **Preview inline**: nuevo archivo `src/docs/img/pmzm/FINAL_Mapa_Diptico_preview.webp` generado con Python PIL (resize ~1100px ancho, WebP q85, objetivo <500KB). El original queda intacto.
- **Modal `#pmzm-zoom-modal`** (`role="dialog"`): toolbar con botones +, −, reset, % de zoom y cerrar; imagen original full-res; hint de uso.
- **JS vanilla inline** (~100 líneas, precedente: `muestra-virtual.html` duplica su slider inline):
  - Zoom con rueda del ratón (escala 0.2x–5x)
  - Arrastre para desplazar (pointer events)
  - Pinch táctil (2 punteros)
  - Doble clic para acercar
  - Escape / clic fuera para cerrar
  - Bloqueo de scroll del body mientras está abierto

---

## Detalle: Consulta Pública (bloque 6, estilo PAT)

- `section#consulta-pmzm.section` (fondo blanco, sin banda de color)
- `.consulta-header` > `h2.section-title` "CONSULTA PÚBLICA DEL PMZM DE IQUITOS"
- Grid `.consulta-content` (2 columnas):
  - **Izquierda**: `.consulta-info` "¿Qué es?" — párrafo con Ley N° 31313, D.S. N° 012-2022-Vivienda y duración de 30 días
  - **Derecha**: `.detalle-item` con SVG reloj verde — "¿Cuándo es la Consulta Pública?" → "Del 15 de octubre al 15 de noviembre del 2026"
- Debajo: h3 "¿Cómo Puedo Participar?" + `.planes-grid` con 3 `.plan-card` (patrón planes-territoriales, icono circular 64px gradiente verde):
  1. Sala Abierta Ciudadana (icono usuarios)
  2. Puntos físicos de Consulta Pública (icono map-pin)
  3. Plataforma digital para aportes (icono monitor)
- **Dark mode**: espejo de `pat-maynas.css` → `.dark-mode #consulta-pmzm { background: #2D2F3D }` + overrides `.detalle-item` / `.consulta-info`. Las `.plan-card` ya usan variables CSS y se adaptan solas.

---

## Archivos a tocar

| Archivo | Acción |
|---|---|
| `src/pages/pmzm-iquitos.html` | Reescribir body (conserva head/nav/footer; nav ya tiene `class="active"` correcto). Modal + JS inline al final del body |
| `src/style/pmzm-iquitos.css` | Reescribir: `@import shared.css` + sticky footer + `.pmzm-hero` + `.pmzm-figura` + modal zoom + dark overrides PAT-style. Elimina la paleta oscura inconsistente actual (`#1a1a2e`/`#4a90d9`) |
| `src/docs/img/pmzm/FINAL_Mapa_Diptico_preview.webp` | **Nuevo** (generado con PIL; original intacto) |

### Fixes menores incluidos (solo en esta página)

- Favicon: `src/docs/img.png` → `../docs/img.png` (path roto heredado de copy-paste)
- Logo header: `../index.html#inicio` → `../../index.html#inicio` (`src/index.html` no existe)
- Meta description actualizada al contenido real

---

## Detalles técnicos

- Imágenes con `loading="lazy"` + alt texts descriptivos; aria-labels en el modal
- `p` hereda el justificado global del sitio; `<br/><br/>` según convención
- Anchors con id (`#consulta-pmzm`, etc.) para deep-links futuros
- Tooling verificado: Python 3 + PIL 10.2.0 disponible para el resize del preview

---

## Pendiente

- [x] Implementar `pmzm-iquitos.html` completo
- [x] Reescribir `pmzm-iquitos.css`
- [x] Generar `FINAL_Mapa_Diptico_preview.webp` con PIL (1100x1561, 133 KB — bajo el objetivo de 500 KB)
- [x] Verificar con `npx serve .`: assets 200 (sin 404), HTML bien formado, JS inline sin errores de sintaxis, lógica de zoom validada (centrado, límites 0.2x–5x), lightbox en imágenes 1-2, nav `active`, favicon/logo/meta corregidos. Pendiente de revisión visual: light/dark mode, responsive 768px e interacción real del zoom en navegador.
