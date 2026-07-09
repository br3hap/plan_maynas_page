# Sesión: Nuevas Publicaciones y Skill — 7 Junio 2026

## Resumen

Se creó un skill para documentar el proceso de agregar publicaciones y se añadieron 4 nuevas noticias a `publicaciones.html`.

---

## Skill Creado

### `plan-maynas-agregar-publicacion.md`
- **Ubicación:** `docs/SKILLS/plan-maynas-agregar-publicacion.md`
- **Contenido:** Documenta la estructura HTML del `<article class="noticia-card">`, convención de imágenes (`img_15.jpg` en adelante), categorías disponibles, orden cronológico inverso, y workflow completo para agregar una nueva publicación.

---

## Publicaciones Agregadas

Todas en `src/pages/publicaciones.html`, categoría `proyectos`, insertadas al inicio del grid (orden cronológico inverso).

| data-id | Fecha | Título | Imagen |
|---------|-------|--------|--------|
| noticia20 | 30 Mayo 2026 | Patrimonio, cultura y turismo: Plan Maynas impulsa nuevas acciones para la Zona Monumental | img_18.jpg |
| noticia19 | 19 Mayo 2026 | Iquitos se posiciona en agenda nacional de movilidad urbana sostenible del MTC | img_17.jpg |
| noticia18 | 15 Mayo 2026 | Muni Maynas articula acciones con el Ejército del Perú para la puesta en valor del patrimonio en la Zona Monumental de Iquitos | img_16.jpg |
| noticia17 | 13 Mayo 2026 | Plan Maynas articula con el Ministerio de Cultura acciones para la elaboración del Plan Maestro de la Zona Monumental | img_15.jpg |

### Secuencia de imágenes usadas
```
src/docs/img/actualizaciones/
├── img_15.jpg  ← noticia17 (13 Mayo)
├── img_16.jpg  ← noticia18 (15 Mayo)
├── img_17.jpg  ← noticia19 (19 Mayo)
└── img_18.jpg  ← noticia20 (30 Mayo)
```

---

## Pendiente

- [ ] Colocar las imágenes `img_15.jpg` a `img_18.jpg` en `src/docs/img/actualizaciones/`
- [ ] Verificar que las 4 noticias se muestran correctamente en el grid y el modal
