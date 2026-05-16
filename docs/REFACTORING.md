# Refactoring Process - Plan Maynas Website

## Date
May 2026

## Objective
Transform the single-page application (index.html) into a multi-page structure where each header navigation item has its own dedicated page.

## Problem Identified
The website had only two pages:
- `index.html` - Main page with all sections (many linked from header via anchor links `#planes`, `#participaciones`, etc.)
- `publicaciones.html` - News/publications page

The header navigation had items like:
- INICIO → `#inicio` (same page)
- PLANES TERRITORIALES → `#planes` (same page anchor)
- PARTICIPAMOS → `#participaciones` (same page anchor)
- NUESTROS ALIADOS → `#aliados` (same page anchor)
- RECURSOS → `#recursos` (same page anchor)
- NOTICIAS Y ACTUALIZACIONES → `publicaciones.html` (separate page)
- MUESTRA VIRTUAL → `#muestra` (same page anchor)
- PDM IQUITOS → `#consulta` (same page anchor)
- PAT MAYNAS → `#consulta-pat` (same page anchor)
- CONTACTO → `#contacto` (same page anchor)

Many sections lacked dedicated pages, making navigation unintuitive and content hard to access.

## Solution
Create separate HTML pages for each header section that didn't have one.

## Pages Created

### 1. `planes-territoriales.html`
- Contains: Full "Planes Territoriales" section content from index.html
- Includes: About project info, three management tools, three work pillars, project milestones, and the three territorial plans grid (PAT Maynas, PDM Iquitos, PMZUM Iquitos)
- Links to: pat-maynas.html and pdm-iquitos.html for detailed plan info

### 2. `participamos.html`
- Contains: Full "Participamos" section with description and timeline of 5 participation spaces
- Includes: CCLP, Mesa de trabajo nuclear local, Mesa de trabajo intergubernamental, Comité consultivo, Sala abierta ciudadana

### 3. `aliados.html`
- Contains: Full "Nuestros Aliados" section with text list and visual grid of allies
- Includes: Partner logos and descriptions for all municipalities, colleges, and institutions

### 4. `recursos.html`
- Contains: Resources section with PDF downloads for both PDM Iquitos and PAT Maynas
- Includes: Participation plans, diagnostics, and other official documents

### 5. `muestra-virtual.html`
- Contains: Full "Muestra Virtual" section with description, gallery slider, tallerista profiles, videos, and team info
- Includes: "La Ciudad de mis Sueños, Taller de Ideas Urbanas" content

### 6. `pdm-iquitos.html`
- Contains: Full PDM Iquitos section with ordinance, executive summary, and all annex documents
- Includes: Tomo I Diagnostico, Tomo II Lineamientos, and all 6 annexes with download links

### 7. `pat-maynas.html`
- Contains: Full PAT Maynas public consultation section with details about participation process
- Includes: Timeline, physical and virtual participation points, public audience schedules, and download links

### 8. `contacto.html`
- Contains: Contact section with email, address, and social media links

## Header Navigation Update
All pages (including index.html and publicaciones.html) now have consistent navigation with proper links:

```html
<li><a href="index.html#inicio">INICIO</a></li>
<li><a href="planes-territoriales.html">PLANES TERRITORIALES</a></li>
<li><a href="participamos.html">PARTICIPAMOS</a></li>
<li><a href="aliados.html">NUESTROS ALIADOS</a></li>
<li><a href="recursos.html">RECURSOS</a></li>
<li><a href="publicaciones.html">NOTICIAS Y ACTUALIZACIONES</a></li>
<li><a href="muestra-virtual.html">MUESTRA VIRTUAL</a></li>
<li><a href="pdm-iquitos.html">PDM IQUITOS</a></li>
<li><a href="pat-maynas.html">PAT MAYNAS</a></li>
<li><a href="contacto.html">CONTACTO</a></li>
```

## Files Structure After Refactoring

```
plan_maynas_page/
├── index.html              (Home - Hero + Projects overview)
├── publicaciones.html      (News/Publications)
├── planes-territoriales.html
├── participamos.html
├── aliados.html
├── recursos.html
├── muestra-virtual.html
├── pdm-iquitos.html
├── pat-maynas.html
├── contacto.html
├── styles.css
├── script.js
└── src/
    └── docs/
        └── (images, PDFs, etc.)
```

## Key Design Decisions

1. **Consistent Page Structure**: Each new page follows the same template with:
   - Reading progress indicator
   - Theme toggle button
   - Logo linking to index.html#inicio
   - Standardized navigation menu with `active` class on current page
   - Page title (h1.page-title)
   - Section content
   - Footer with copyright and visitor counter

2. **Cross-linking**: Related pages link to each other (e.g., planes-territoriales.html links to pat-maynas.html and pdm-iquitos.html)

3. **Navigation**: All pages have the same navigation structure with proper file links instead of anchor links for off-page items

4. **No Content Removal from index.html**: Content sections remain in index.html as they are still visible when scrolling; they can be cleaned up in a future refactoring if desired

## Next Steps (Optional)
- Remove duplicate content from index.html now that dedicated pages exist
- Add breadcrumb navigation for better UX
- Consider adding a "back to top" button on longer pages
- Add smooth scrolling for anchor links on same-page sections