---
name: plan-maynas-agregar-publicacion
description: Agregar una nueva publicación/noticia al grid de publicaciones.html. Define la estructura HTML del card, convención de imágenes (img_15.jpg en adelante), categorías disponibles y orden cronológico inverso (más reciente primero).
---

## When to Use This Skill

Activate this skill when the user wants to:

- "agregar una publicación" / "add a news post"
- "crear una noticia nueva" / "create a new news article"
- "añadir al grid de publicaciones" / "add to publications grid"
- "nueva entrada en noticias" / "new entry in news section"
- Any request involving editing `src/pages/publicaciones.html`

## File Locations

| Elemento | Ruta |
|----------|------|
| Página de publicaciones | `src/pages/publicaciones.html` |
| Imágenes de noticias | `src/docs/img/actualizaciones/` |
| CSS de publicaciones | `src/style/publicaciones.css` |

## Convención de Imágenes

Las imágenes se almacenan en `src/docs/img/actualizaciones/` con el patrón:

```
img_1.jpg  →  img_14.jpg  (existentes)
img_15.jpg  →  img_N.jpg  (nuevas, continuar la numeración)
```

**IMPORTANTE**: Antes de crear una nueva publicación, verificar cuál es el último número usado en la carpeta `src/docs/img/actualizaciones/` y usar el siguiente número consecutivo. No reutilizar números existentes.

Desde la página HTML, la ruta de la imagen es relativa:
```html
<img src="../docs/img/actualizaciones/img_15.jpg" alt="descripción" />
```

## Categorías Disponibles

Usar el valor del atributo `data-category`:

| Valor | Etiqueta visible en filtros |
|-------|---------------------------|
| `consulta` | Consulta Pública |
| `audiencias` | Audiencias |
| `participacion` | Participación |
| `reconocimiento` | Reconocimiento |
| `proyectos` | Proyectos |

## Estructura del Card (Template)

Cada noticia es un `<article class="noticia-card">` con los siguientes atributos de datos:

```html
<article class="noticia-card" data-id="noticiaXX" data-category="CATEGORIA" data-title="TÍTULO COMPLETO">
  <div class="noticia-imagen">
    <img src="../docs/img/actualizaciones/img_NN.jpg" alt="descripción breve" />
  </div>
  <div class="noticia-fecha">DD Mes Año</div>
  <h3>TÍTULO COMPLETO</h3>
  <button type="button" class="noticia-link ver-publicacion">Ver publicación →</button>
  <div class="full-content" hidden>
    <p>CONTENIDO COMPLETO DE LA PUBLICACIÓN (puede contener múltiples párrafos y <br/> para saltos de línea)</p>
  </div>
</article>
```

### Atributos `data-*`

- **`data-id`**: Identificador único. Seguir la secuencia `noticia17`, `noticia18`, etc. (último usado: `noticia16`).
- **`data-category`**: Una de las categorías listadas arriba.
- **`data-title`**: Título exacto que aparecerá en el `<h3>` (usado por filtros y búsqueda) y en el modal.

### Formato de Fecha

Usar el formato: `DD Mes Año` en español. Ejemplos:
- `23 Marzo 2026`
- `07 Febrero 2026`
- `11 Agosto 2025`

### Contenido Completo (`full-content`)

- Va dentro de `<div class="full-content" hidden>`.
- Puede contener múltiples párrafos `<p>...</p>`.
- Usar `<br/>` o `<br/><br/>` para saltos de línea dentro de un mismo párrafo.
- Este contenido se muestra en el modal al hacer clic en "Ver publicación →".

## Ubicación en el Grid

Las publicaciones van en **orden cronológico inverso**: la más reciente **primero** (arriba).

Insertar el nuevo `<article>` inmediatamente después del comentario de apertura del grid:

```html
<div class="noticias-grid" id="publicacionesGrid">
  <!-- INSERTAR NUEVA PUBLICACIÓN AQUÍ (la más reciente) -->
  <article class="noticia-card" ...>
```

## Workflow Completo

### Paso 1: Verificar última imagen

Revisar la carpeta `src/docs/img/actualizaciones/` para saber el siguiente número disponible.

```bash
ls src/docs/img/actualizaciones/
```

### Paso 2: Colocar la imagen

Copiar la imagen de la nueva publicación a `src/docs/img/actualizaciones/img_NN.jpg` (o `.jpeg`, `.JPG`, `.png` según corresponda).

### Paso 3: Insertar el card en publicaciones.html

1. Leer `src/pages/publicaciones.html`.
2. Ubicar `<div class="noticias-grid" id="publicacionesGrid">` (aprox. línea 83).
3. Insertar el nuevo `<article class="noticia-card">` justo después de la apertura del grid (debajo del comentario si lo hay), para que quede como la primera noticia visible.
4. Asignar `data-id="noticiaXX"` con el número consecutivo siguiente.
5. Completar título, fecha, categoría, imagen, alt text y contenido completo.

### Paso 4: Verificar

- Abrir `publicaciones.html` en el navegador.
- Confirmar que la nueva noticia aparece primero en el grid.
- Confirmar que el modal abre correctamente al hacer clic en "Ver publicación →".
- Confirmar que los filtros de categoría funcionan con la nueva publicación.
- Confirmar que la búsqueda encuentra la publicación por título.

## Ejemplo Completo

```html
<article class="noticia-card" data-id="noticia17" data-category="consulta" data-title="Plan Maynas lanza nueva etapa de participación ciudadana">
  <div class="noticia-imagen">
    <img src="../docs/img/actualizaciones/img_15.jpg" alt="Participación ciudadana Plan Maynas" />
  </div>
  <div class="noticia-fecha">05 Junio 2026</div>
  <h3>Plan Maynas lanza nueva etapa de participación ciudadana</h3>
  <button type="button" class="noticia-link ver-publicacion">Ver publicación →</button>
  <div class="full-content" hidden>
    <p>Primer párrafo del contenido completo de la noticia.</p>
    <p>Segundo párrafo con más detalles e información relevante sobre la publicación.</p>
  </div>
</article>
```

## Notas

- El `data-title` debe coincidir **exactamente** con el texto del `<h3>`.
- El `alt` de la imagen debe ser descriptivo y en español.
- No dejar `data-id` duplicados.
- No modificar las publicaciones existentes a menos que sea explícitamente solicitado.
- Los estilos visuales (tamaño de imagen, colores, tipografía) se manejan desde `src/style/publicaciones.css`. No añadir estilos inline al article.
