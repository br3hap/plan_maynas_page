# Plan Maynas - Progreso del Proyecto

## Avances Recientes

### muestra-virtual.html
- [x] Corregidos paths de imágenes: `src="src/docs/` → `src="../docs/`
- [x] Eliminado h2 "Talleristas"
- [x] Eliminado h2 "Videos"
- [x] Creado `muestra-virtual.css` con estilos extraídos de `shared.css`
- [x] Fondo `.muestra-div` configurable: `#468AC4` (light) / `#3A7AA8` (dark)
- [x] Sección galería (slider) dentro del div azul
- [x] Secciones talleristas, videos y equipo dentro del div azul
- [x] Texto forzado a blanco en container de galería y secciones azules
- [x] Estilos dark mode para overlay de galería y video-info
- [x] Estilos dark mode para slider buttons y dots
- [x] Videos cambiados de `<iframe>` a `<video src="../video/..." controls>`

### participamos.html
- [x] Extraídos estilos de `shared.css` hacia `participamos.css`
- [x] Creado `.participamos-div` wrapper en el HTML
- [x] Fondo azul `#4888C8` para ambos modos (light y dark)
- [x] Texto (h1, p, h3) forzado a blanco en dark mode
- [x] Cards no cambian (mantienen estilos de `shared.css`)

### aliados.html → Integrado en planes-territoriales.html
- [x] Contenido completo migrado a `planes-territoriales.html` (sección "Nuestros Aliados")
- [x] CSS fusionado en `planes-territoriales.css`
- [x] Página y CSS originales eliminados tras validación
- [x] Historial preservado: `.aliados-div` con fondo blanco, texto oscuro forzado, grid de 16 aliados

### publicaciones.html - Header actualizado
- [x] Estructura del header alineada al patrón estándar de `src/pages/` (mismo layout que contacto, aliados, etc.)
- [x] Corrección del link activo en navegación

### recursos.html - Refactorización Completa
- [x] Estructura reestructurada con layout tipo card, basado en `contacto.html`
- [x] Eliminados estilos inline (`style="color: #171b46;"`) — ahora usa CSS variables para dark mode
- [x] Cards envueltas en `<a>` (toda la card es clickeable)
- [x] Removidos botones de texto redundantes "Descargar el Documento"
- [x] Icono de descarga es ahora el único CTA visual — escala y cambia de color en hover
- [x] Cards sin descripción se centran verticalmente; cards con `<p>` se alinean arriba (`:has()` selector)
- [x] `recursos.css` completado con: sticky footer, hover effects, responsive mobile

### pat-maynas.html - Layout Grid Refactored
- [x] Creado `.consulta-left` y `.consulta-right` wrappers para layout de 2 columnas
- [x] Movidos items "Duración", "Cómo Participo", "Puntos Físicos", "Audiencias Descentralizadas", "Audiencia Metropolitana" a columna izquierda
- [x] "Puntos Virtuales" + mapa se mantienen en columna derecha
- [x] Removido wrapper `.consulta-detalles` (ya no necesario)
- [x] CSS simplificado: flexbox column wrappers en lugar de grid placement con `grid-column`/`grid-row`
- [x] Ver `docs/progress/GRID_ISSUE.md` para detalles completos

### index.html - Cards Grid Centrado
- [x] Grid cambiado de CSS Grid a Flexbox para centrar filas incompletas
- [x] Máximo 5 cards por fila (`width: 220px`, `flex: 0 0 220px`)
- [x] `justify-content: center` en `.projects-grid`
- [x] Segunda fila (PDM Iquitos 2045, Consulta Pública, Muestra Virtual) ahora centrada
- [x] Responsive mobile: cards vuelven a 100% de ancho

### index.html - Refactorización Total
- [x] Removido código de secciones detalladas (ya existen en `src/pages/`)
- [x] Conservado solo: header, hero, projects grid (simplificado a link-cards), footer
- [x] Removida sección Contacto (existe página dedicada `src/pages/contacto.html`)
- [x] Creado `src/style/index.css` con estilos específicos del index.html
- [x] Extraídos: `.hero`, `.reading-progress`, `.theme-toggle`, `.typing-text`, `.animate-fade-in`
- [x] Actualizado `<head>` para cargar `src/style/shared.css` + `src/style/index.css`
- [x] Eliminado `styles.css` (era ~90% duplicado de `shared.css`)

### planes-territoriales.html - Unificación con Aliados
- [x] Contenido completo de `aliados.html` integrado en `planes-territoriales.html`
- [x] Sección "Nuestros Aliados" añadida tras "Planes Territoriales"
- [x] CSS de `aliados.css` fusionado en `planes-territoriales.css`
- [x] `.aliados-div` con fondo blanco y texto oscuro forzado
- [x] Grid de aliados (`aliados-grid`) con 16 tarjetas preservado

### Eliminación de Página Aliados (Integrada)
- [x] Eliminado `src/pages/aliados.html`
- [x] Eliminado `src/style/aliados.css`
- [x] Eliminado enlace "NUESTROS ALIADOS" de todos los headers:
  - `index.html`, `planes-territoriales.html`, `participamos.html`, `pdm-iquitos.html`,
  - `pat-maynas.html`, `recursos.html`, `publicaciones.html`, `contacto.html`, `muestra-virtual.html`

### planes-territoriales.html - Actualización Header y Hitos
- [x] Agregada sección `.hitos-del-proyecto` en CSS (`planes-territoriales.css`)
- [x] Fondo verde `#3DB877` para modo claro y oscuro
- [x] Texto forzado a blanco en ambos modos
- [x] Layout full-bleed (ancho completo) consistente con otras secciones
- [x] Mejorado el header de navegación (ver abajo)

### Header de Navegación - Mejora Visual
- [x] Enlaces del menú ahora tienen efecto underline (línea inferior) en hover y estado activo
- [x] Agregado `.menu li a` con padding, border-radius y estilos base
- [x] Hover: solo cambia color de texto a verde y muestra underline (`::after`)
- [x] Estado activo: color de texto verde, sin fondo ni borde adicional
- [x] Línea inferior usa `::after` con ancho 80%, animada con transición
- [x] Aplicado a `index.html` y todas las páginas en `src/pages/` (via `shared.css`)

### Fixes de Navegación y Layout (Mayo 2025)
- [x] Corregidos links en `src/pages/*`: `index.html` → `../index.html` (evita directory listing)
- [x] Corregido logo link en `src/pages/*`: `index.html#inicio` → `../index.html#inicio`
- [x] Actualizado card de Contacto en index: apunta a `src/pages/contacto.html`
- [x] Fix alineación botones "Ver más →" en cards del index: movidos dentro de `.project-info`, flexbox layout
- [x] Fix footer y layout de `contacto.css`: flexbox para sticky footer, cards estilizadas, social links circulares

---

## Problemas Encontrados y Soluciones

### aliados section (planes-territoriales) - Especificidad de CSS con dark mode
**Problema:** El texto (p, strong, li) desaparecía en dark mode porque el color del texto coincidía con el fondo oscuro, a pesar de tener reglas `!important`.

**Causa:** El tema dark mode se aplica via clase `.dark-mode` en `<body>`. Las reglas con `.aliados-div` (clase en un div) no tenían suficiente especificidad para override certain inherited styles.

**Solución:** Se aumentó la especificidad usando `#root .aliados-div` en lugar de solo `.aliados-div`, y se incluyó `page-title`, `p`, `h3`, `strong` y `li` en las reglas de color oscuro. Esta solución se migró junto con el contenido a `planes-territoriales.css`.

**Lección:** Cuando se usan `!important` y aún no funciona, verificar la especificidad real de los selectores. En este caso `body.dark-mode .aliados-div p` tiene mayor especificidad que `.aliados-div p`.

---

## Pendiente

### muestra-virtual.html
- [ ] Subir videos a `src/video/` (carpeta oculta de git, fue removida para reducir peso)
- [ ] Verificar que los videos se cargan correctamente con el nuevo path `../video/video_1.mp4`

### paths de imágenes
- [x] Corregido en todos los HTML (verificado con grep - no hay más `src="src/docs/`)

### generales
- [x] Verificar que todos los botones y links funcionan (links a index corregidos)
- [ ] Testear dark mode en todas las páginas
- [ ] Verificar responsividad en mobile
- [ ] Revisar si hay más estilos huérfanos en `shared.css` que pertenezcan a páginas específicas

---

## Estructura de Estilos Actual

```
src/style/
├── shared.css        ← estilos globales compartidos (todas las páginas)
├── index.css        ← estilos específicos de index.html (hero, popup, animaciones)
├── muestra-virtual.css ← estilos específicos de muestra-virtual.html
├── participamos.css ← estilos específicos de participamos.html
├── planes-territoriales.css ← estilos de planes-territoriales + aliados (unificado)
├── contacto.css     ← estilos específicos de contacto.html (footer sticky, cards, social links)
├── pat-maynas.css  ← (vacío, placeholder)
├── pdm-iquitos.css ← (vacío, placeholder)
├── publicaciones.css ← (vacío, placeholder)
└── recursos.css    ← estilos específicos de recursos.html (cards clickeables, sticky footer, hover effects)
```

> **Nota:** `aliados.css` fue eliminado. Sus estilos fueron fusionados en `planes-territoriales.css`.

---

## Explicación de Paths

Desde `src/pages/muestra-virtual.html`:

| Recurso | Path correcto | Notes |
|---------|--------------|-------|
| Imágenes slider | `../docs/img/slider/img_1.PNG` | `..` sube a `src/`, luego entra a `docs/` |
| Videos | `../video/video_1.mp4` | Cuando se restauren, van en `src/video/` |
| Logo | `../docs/logo-plan.png` | ✓ Funciona |

Desde `index.html` (raíz):

| Recurso | Path correcto | Notes |
|---------|--------------|-------|
| shared.css | `src/style/shared.css` | Estilos globales |
| index.css | `src/style/index.css` | Estilos específicos del index |
| Imágenes hero | `src/docs/pruebafoto.png` | Acceso directo |
| Logo | `src/docs/logo-plan.png` | Acceso directo |

---

## Notas Técnicas

- Los estilos de `.muestra-div` fueron extraídos de `shared.css` hacia `muestra-virtual.css`
- El div `.muestra-div` se usa en muestra-virtual.html para agrupar las secciones con fondo azul
- Los videos fueron cambiados de `<iframe>` a `<video>` tag con path `../video/video_1.mp4`
- La carpeta `src/video/` fue removida de git (ocultada) para reducir peso del repo
- **CSS Specificity Issue:** En dark mode, reglas como `.dark-mode .aliados-div p` superan en especificidad a `.aliados-div p` aunque ambas usen `!important`. Solución: usar `#root .aliados-div p` para mayor especificidad.
- **index.html Refactor:** El archivo `index.html` fue simplificado manteniendo solo header, hero y link-cards. El código de secciones detalladas fue removido (ya existe en `src/pages/`). El archivo `styles.css` fue eliminado ya que era ~90% duplicado de `shared.css`.