# Sincronización de Header y Footer en Plan Maynas

## Proposito
Este proyecto es un sitio web estático multipágina. El **header** (navegación) y el **footer** tienen el **mismo código** en `index.html` (raíz) y en **todas** las páginas de `src/pages/`. Cualquier cambio en uno debe replicarse en todos los demás.

---

## Archivos que deben mantenerse sincronizados

Cuando el usuario pide modificar, agregar o eliminar algo del **header** o **footer**, siempre se deben editar **todos** estos archivos:

1. `index.html` (raíz del proyecto)
2. `src/pages/planes-territoriales.html`
3. `src/pages/participamos.html`
4. `src/pages/pdm-iquitos.html`
5. `src/pages/pat-maynas.html`
6. `src/pages/recursos.html`
7. `src/pages/publicaciones.html`
8. `src/pages/contacto.html`
9. `src/pages/muestra-virtual.html`

> **Nota:** `aliados.html` fue eliminado (su contenido fue integrado en `planes-territoriales.html`). No debe existir.

---

## Diferencias clave de rutas entre `index.html` y `src/pages/`

### Regla general de rutas

Desde cualquier archivo dentro de `src/pages/`:

- **Para ir a `index.html`** (raíz del sitio): usa `../../index.html`  
  → Sube dos niveles: `src/pages/` → `src/` → raíz del proyecto.
- **Para ir a otra página dentro de `src/pages/`**: usa solo el nombre del archivo  
  → Ejemplo: desde `src/pages/contacto.html`, ir a `src/pages/recursos.html` = `href="recursos.html"`.
- **Para ir a una imagen en `src/docs/`**: usa `../docs/nombre-imagen.png`  
  → Sube un nivel: de `src/pages/` a `src/`, luego entra a `docs/`.

### Logo del header

| Ubicación | Link del logo (`href`) | Imagen del logo (`src`) |
|-----------|------------------------|-------------------------|
| `index.html` | `href="#inicio"` | `src="src/docs/logo-plan.png"` |
| `src/pages/*.html` | `href="../index.html#inicio"` | `src="../docs/logo-plan.png"` |

### Links del menú de navegación

| Página destino | En `index.html` (raíz) | En `src/pages/*.html` |
|----------------|------------------------|----------------------|
| INICIO | `href="index.html"` | `href="../../index.html"` |
| PLANES TERRITORIALES | `href="src/pages/planes-territoriales.html"` | `href="planes-territoriales.html"` |
| PARTICIPAMOS | `href="src/pages/participamos.html"` | `href="participamos.html"` |
| RECURSOS | `href="src/pages/recursos.html"` | `href="recursos.html"` |
| NOTICIAS Y ACTUALIZACIONES | `href="src/pages/publicaciones.html"` | `href="publicaciones.html"` |
| MUESTRA VIRTUAL | `href="src/pages/muestra-virtual.html"` | `href="muestra-virtual.html"` |
| PDM IQUITOS | `href="src/pages/pdm-iquitos.html"` | `href="pdm-iquitos.html"` |
| PAT MAYNAS | `href="src/pages/pat-maynas.html"` | `href="pat-maynas.html"` |
| CONTACTO | `href="src/pages/contacto.html"` | `href="contacto.html"` |

> **Ejemplo práctico de agregar nueva página:** Si creas `src/pages/nueva-pagina.html`, desde esa página el link a INICIO será `href="../../index.html"`, y el link a PLANES TERRITORIALES será `href="planes-territoriales.html"`.

### Clase `active` en el menú

- La página actual debe tener `class="active"` en su `<a>` correspondiente.
- Ejemplo: en `planes-territoriales.html`, el link a PLANES TERRITORIALES lleva `class="active"`.

---

## Estructura del header (bloque común)

```html
<!-- Reading Progress Indicator -->
<div class="reading-progress" role="progressbar" ...>
  <div class="reading-progress-fill"></div>
</div>

<!-- Theme Toggle Button -->
<button class="theme-toggle" aria-label="Cambiar tema" aria-pressed="false">
  <svg ...>...</svg>
</button>

<header class="header">
  <div class="container">
    <div class="logo">
      <a href="..."><img src="..." alt="Plan Maynas Logo" style="width: 250px"/></a>
    </div>
    <nav class="nav-menu" style="text-align: center;font-size: small;" aria-label="Navegación principal">
      <button class="menu-toggle" ...>...</button>
      <ul class="menu" role="list">
        <!-- 9 items de navegación -->
      </ul>
    </nav>
  </div>
</header>
```

---

## Estructura del footer (bloque común)

```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <p>&copy; 2026 OSTI. Todos los derechos reservados.</p>
      <div class="visitor-counter">...</div>
    </div>
  </div>
</footer>
```

> El footer es **idéntico** en `index.html` y en todas las páginas de `src/pages/` (mismo HTML, mismas rutas absolutas/relativas donde aplica).

---

## Workflow obligatorio para cambios en header/footer

### Paso 1: Identificar el cambio
¿Es un cambio en el **header** (logo, menú, botón tema, reading progress) o en el **footer**?

### Paso 2: Editar `index.html`
Aplicar el cambio primero en `index.html` (raíz), usando las rutas de la columna "En `index.html`" de la tabla de arriba.

### Paso 3: Replicar en `src/pages/`
Aplicar el **mismo** cambio en **cada uno** de los 8 archivos de `src/pages/`, adaptando las rutas según la columna "En `src/pages/*.html`" de la tabla.

### Paso 4: Validaciones post-cambio
Después de editar, ejecutar estas validaciones:

1. **Verificar que no quedó ningún `<li>` huérfano** en los menús (si eliminaste un enlace, asegúrate de borrar todo el `<li>...</li>`).
2. **Verificar rutas de imágenes:**
   ```bash
   grep -rn 'src="src/docs/' src/pages/   # No debe haber resultados
   ```
3. **Verificar links rotos a `aliados.html`:**
   ```bash
   grep -rn 'aliados\.html' src/pages/ index.html   # No debe haber resultados
   ```
4. **Verificar clase `active`:** Solo la página actual debe tener `class="active"`.
5. **Verificar que la cantidad de `<li>` sea la misma** en todos los headers (debe haber 9 items de menú actualmente).
6. **Verificar que no queden etiquetas HTML mal cerradas** (usar validación visual del bloque `<header>...</header>`).

### Caso especial: Agregar una nueva página al sitio

Cuando se crea una **nueva página** en `src/pages/`:

1. **Crear el archivo** en `src/pages/nueva-pagina.html` con el header y footer completos.
2. **Copiar el header** de cualquier página existente en `src/pages/` (ej: `planes-territoriales.html`).
3. **Adaptar la clase `active`:** En la nueva página, el link a sí misma lleva `class="active"`.
4. **Replicar el nuevo enlace** en **todos** los demás archivos:
   - En `index.html`: agregar `<li><a href="src/pages/nueva-pagina.html">NUEVA PÁGINA</a></li>`
   - En `src/pages/*.html`: agregar `<li><a href="nueva-pagina.html">NUEVA PÁGINA</a></li>`
5. **Validar:** ejecutar los comandos de validación del Paso 4.

> **Importante:** La nueva página hereda el mismo header/footer que las demás. No debe tener rutas de `index.html` (como `src/docs/` o `index.html` sin `../../`).

### Paso 5: Actualizar `docs/progress/progress.md`
Si el cambio es significativo (ej: eliminar/agregar un enlace de navegación, modificar el footer, crear nueva página), documentarlo en `docs/progress/progress.md`.

---

## Errores comunes a evitar

| Error | Consecuencia | Solución |
|-------|-------------|----------|
| Copiar el header de `index.html` tal cual a `src/pages/` | Rutas rotas (`src/docs/...` no existe desde `src/pages/`) | Adaptar rutas: `src/docs/` → `../docs/`, `index.html` → `../../index.html` |
| Olvidar adaptar el `href` del logo | El logo no redirige correctamente al inicio | Usar `href="../index.html#inicio"` en páginas, `href="#inicio"` en index |
| Dejar `class="active"` en el link incorrecto | Indica visualmente la página equivocada | Solo la página actual debe tener `active` |
| Eliminar solo el texto del enlace pero no el `<li>` | Queda un item vacío en el menú | Eliminar todo el `<li>...</li>` |
| No replicar el cambio en todas las páginas | Navegación inconsistente entre páginas | Siempre editar los 9 archivos |
| Nueva página con rutas de `index.html` | Links rotos, imágenes no cargan, logo sin funcionar | Desde `src/pages/`: usar `../../index.html`, `../docs/`, y nombres de archivo sin prefijo para otras páginas |
| Agregar nueva página solo en su propio header | Los demás headers no tienen link a la nueva página | Replicar el nuevo `<li>` en `index.html` y en **todas** las páginas de `src/pages/` |

---

## Comando de utilidad para validar sincronización

```bash
# Verificar que todos los headers tienen la misma cantidad de items de menú
for f in index.html src/pages/*.html; do echo "$f: $(grep -c '<li><a' "$f")"; done

# Verificar que ninguna página referencia a aliados.html
for f in index.html src/pages/*.html; do grep -l 'aliados\.html' "$f"; done

# Verificar rutas de logo rotas en src/pages/
grep -rn 'src="src/docs/' src/pages/
```
