# Sesión: Nuevas Publicaciones, Skill y Popup — 28 Septiembre 2026

## Resumen

Se agregaron 2 nuevas publicaciones a `src/pages/publicaciones.html` (2ª Sala Abierta
Ciudadana del PMZM y jornada de Ética e Integridad), se actualizó el skill
`plan-maynas-agregar-publicacion.md`, se desactivó temporalmente el popup de
`index.html` y se desplegó todo al VPS.

---

## Publicaciones Agregadas

Ambas en `src/pages/publicaciones.html`, insertadas al inicio del grid (orden
cronológico inverso).

| data-id | Fecha | Categoría | Título | Imagen |
|---------|-------|-----------|--------|--------|
| noticia25 | 28 Septiembre 2026 | `proyectos` | MAYNAS IMPULSA UNA CULTURA DE ÉTICA E INTEGRIDAD EN LA FUNCIÓN PÚBLICA | img_23.jpg |
| noticia24 | 19 Septiembre 2026 | `participacion` | Con participación ciudadana y articulación multiactor, Iquitos construye el futuro de su Zona Monumental | img_22.jpg |

### Origen de imágenes
Las fotos venían como adjunto de WhatsApp en `/home/mauri12/Documentos/` y se
copiaron a la convención del proyecto:
- `WhatsApp Image 2026-09-19 at 20.22.24.jpeg` → `img_22.jpg`
- `WhatsApp Image 2026-09-28 at 3.17.36 PM.jpeg` → `img_23.jpg`

A petición del usuario, la extensión se dejó como `.jpg` (no `.jpeg`).

### Secuencia de imágenes actual
```
src/docs/img/actualizaciones/
├── img_1.jpg … img_19.jpeg   ← anteriores
├── img_20.jpeg  ← noticia23 (25 Jul)
├── img_21.jpeg  ← noticia22 (13 Ago)
├── img_22.jpg   ← noticia24 (19 Sep)  [nuevo]
└── img_23.jpg   ← noticia25 (28 Sep)  [nuevo]
```

---

## Skill Actualizado

### `docs/SKILLS/plan-maynas-agregar-publicacion.md`
El skill traía contadores obsoletos (`img_14` / `noticia16`). Se sincronizó al
estado real:
- Convención imágenes: `img_1.jpg → img_23.jpg` (existentes), `img_24.jpg+` (nuevas)
- Último `data-id` usado: `noticia25`; siguiente `noticia26`, `noticia27`, …
- Ejemplo del template actualizado a `noticia26` / `img_24.jpg`

---

## Popup de `index.html` desactivado (temporal)

El popup de primera visita se comentó, no se borró, para poder restaurarlo.

| Archivo | Cambio |
|---------|--------|
| `index.html:16-27` | Bloque `<!-- Popup de primera vez -->` comentado (marcador `DESACTIVADO`) |
| `script.js:17-83` | Bloque JS del popup comentado (`showPopup`, `closePopup`, listeners, `inicioLink`) |
| `src/style/shared.css:3006-3108` | **Sin cambios** — CSS inerte, se necesita al restaurar |
| `src/docs/newpopup.jpeg` | **Sin cambios** — asset, se necesita al restaurar |

Para restaurar: quitar los comentarios en `index.html` y `script.js`.
`node --check script.js` pasó tras la edición.

---

## Despliegue al VPS

Skill: `docs/SKILLS/plan-maynas-vps-upload.md`
Flujo: `scp` como `ubuntu` a `/tmp/` → `sudo cp` + `chown munimaynas` + `chmod 644` → `rm /tmp/`

Base remota: `/home/munimaynas/planmaynas2.munimaynas.gob.pe/`

### Estado previo en VPS (8 Sep 2026)
- `publicaciones.html`: 23 noticias (noticia1–23)
- Faltaban `img_22.jpg`, `img_23.jpg`
- Popup activo en `index.html` y `script.js`

### Archivos subidos (28 Sep 2026)
| Archivo local | Destino en VPS |
|---------------|----------------|
| `src/docs/img/actualizaciones/img_22.jpg` (167 KB) | `src/docs/img/actualizaciones/` |
| `src/docs/img/actualizaciones/img_23.jpg` (87 KB) | `src/docs/img/actualizaciones/` |
| `src/pages/publicaciones.html` | `src/pages/` |
| `index.html` | raíz |
| `script.js` | raíz |

### Verificación en VPS
- 25 `noticia-card` en `publicaciones.html`
- `noticia24` y `noticia25` presentes; fechas top: 28 Sep → 19 Sep → 13 Ago
- `img_22.jpg` y `img_23.jpg` con owner `munimaynas` y `chmod 644`
- `index.html` con marcador `DESACTIVADO`; `script.js` sin `showPopup()` activo

Sitio estático: sin reinicio, solo `Ctrl+F5` por caché de navegador.

---

## Notas

- **Título en MAYÚSCULAS**: el título de `noticia25` se dejó en mayúsculas como
  lo escribió el usuario, a diferencia del resto del grid (caja baja). Si se
  quiere consistencia, cambiar a "Maynas impulsa una cultura de ética e
  integridad en la función pública" en `data-title` **y** `<h3>` a la vez.
- **Categoría**: `noticia25` quedó en `proyectos` (catch-all). Si prefiere otra
  categoría disponible (`participacion`, `reconocimiento`, etc.), ajustar
  `data-category`.
- `docs/sessions/` no existe; las sesiones se registran en `docs/progress/`.
- `img_21.jpeg` pesa 14.9 MB en el VPS — candidato a optimización futura.

---

## Estado final
- Local y VPS sincronizados en los archivos tocados.
- Pendiente: nada abierto de esta sesión.
