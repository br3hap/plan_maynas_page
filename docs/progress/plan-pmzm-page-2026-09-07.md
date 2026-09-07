# Sesión PMZM Iquitos — 2026-09-07

## Objetivo
Ajustar la página `src/pages/pmzm-iquitos.html` (sección Consulta Pública,
cronograma y mapa) y desplegar al VPS
(`/home/munimaynas/planmaynas2.munimaynas.gob.pe/`).

## Cambios (local)

### 1. Foto de taller en Consulta Pública
- `src/pages/pmzm-iquitos.html` — columna derecha (`.consulta-right`):
  ```html
  <figure class="consulta-imagen consulta-foto">
    <img src="../docs/img/consulta_publica/img_1.JPG" ... />
  </figure>
  ```
- La imagen ya existía en el repo (`src/docs/img/consulta_publica/img_1.JPG`).

### 2. Balance de columnas
- Estado inicial: texto corto a la izquierda, foto + fecha a la derecha
  (columna izquierda vacía).
- Solución: tarjeta de fecha movida a `.consulta-left` (texto + fecha),
  foto sola en `.consulta-right` con `height:100% + object-fit:cover`.

### 3. Hora y Lugar (agregado, luego retirado)
- Se agregaron como tarjetas separadas, luego fusionadas dentro de la
  tarjeta `¿Cuándo es la Consulta Pública?` como sub-filas `.detalle-sub`
  (reloj + pin pequeños).
- Icono principal cambiado de reloj a calendario, agrandado a 36px
  (`.detalle-fecha > svg`).
- **Al final de la sesión se retiraron** Hora (`5:00 p.m. a 8:00 p.m.`) y
  Lugar (`Hotel de Turistas – Malecón Tarapacá #128`) a pedido del usuario.
  La tarjeta quedó solo con la fecha. Cambio aplicado en local y desplegado
  a prod.

### 4. Nueva sección CRONOGRAMA 2026
- `section#cronograma-pmzm` antes de `section#consulta-pmzm`:
  título `CRONOGRAMA 2026 DE CONSTRUCCIÓN DEL PLAN MAESTRO` + figura
  `../docs/img/pmzm/cronograma-2026-construccion-plan-maestro.png`
  (reusa `galeria-item pmzm-figura` con lightbox).
- El usuario guardó la imagen con ese nombre exacto en
  `src/docs/img/pmzm/`.

### 5. Tamaño compacto (cronograma y mapa)
- `src/style/pmzm-iquitos.css`:
  - `#cronograma-pmzm .pmzm-figura`: `max-width:680px`, img `max-height:62vh`.
  - `.pmzm-mapa-figura`: `max-width:680px` centrado, img `max-height:62vh`
    + `object-fit:contain`. Zoom modal intacto.
- Objetivo: título + imagen completa visibles sin scroll.

### 6. Párrafos justificados
- `#root p { text-align:justify; }`, excepto hints
  (`.galeria-overlay p`, `.pmzm-mapa-hint`, `.pmzm-zoom-hint` centrados).

### 7. Reorden de secciones
- Orden final: `cronograma-pmzm` → `zona-monumental` (mapa) →
  `consulta-pmzm`. (El mapa pasó después del cronograma.)

### 8. Fix H1 hero tapado por header fijo
- Causa: `.header{position:fixed}` (90px+) vs `#inicio{padding-top:48px}`.
- Fix: `#inicio{padding-top:calc(var(--header-height) + var(--spacing-xl));}`.

## Despliegues al VPS (skill `docs/SKILLS/plan-maynas-vps-upload.md`)
Flujo: `scp` como `ubuntu` a `/tmp/` → `sudo cp` + `chown munimaynas` +
`chmod 644` → `rm /tmp/`.
- 5 imágenes `src/docs/img/pmzm/`: `1pmzm.png`,
  `2_que-regula-y-propone-el-PMZM2.png`,
  `cronograma-2026-construccion-plan-maestro.png`, `FINAL_Mapa_Diptico.png`,
  `FINAL_Mapa_Diptico_preview.webp`.
- `src/pages/pmzm-iquitos.html` (varias veces, última sin hora/lugar).
- `src/style/pmzm-iquitos.css` (varias veces, último con fix hero).
- Verificado con `grep`/`ls -lh` en VPS. Sitio estático: sin reinicio,
  solo `Ctrl+F5` por caché de navegador/CSS.

## Estado final
- Local y prod sincronizados en los archivos tocados.
- Pendiente: nada abierto de esta sesión.
