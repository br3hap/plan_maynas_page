---
name: title-subtitle-fix
description: Use this skill when the user reports unnecessary title banners with dark backgrounds that should be replaced by using the subtitle as the main title. Detects when a page has both a h1 title with dark background AND a h2 subtitle below it with the same text, indicating redundancy.
---

## When to Use This Skill

Activate this skill when the user reports issues like:

- "título innecesario con fondo oscuro" / "unnecessary title with dark background"
- "podría usar el subtítulo como título" / "use subtitle as title instead"
- "tenemos un título que no es necesario" / "we have a title that is not necessary"
- "eliminar título y usar subtítulo" / "remove title and use subtitle"
- The page shows both h1 (with dark background) AND h2 with similar text
- "no necesita el título porque ya dice..." / "doesn't need the title because it already says..."
- Screenshot showing redundant title banner

## Problem Anatomy

### The Redundancy Pattern
Many pages created from index.html get a page-level h1 title with dark background that duplicates content already shown in the h2 subtitle below it. For example:

```html
<!-- BEFORE (redundant) -->
<section id="consulta" class="section">
  <div class="container">
    <h1 class="page-title">PDM Iquitos</h1>  <!-- Dark bg, redundant -->
    <div class="consulta-pdm">
      <div class="container">
        <h2 class="section-title" style="color: #171b46;">Plan de Desarrollo Metropolitano de Iquitos 2045</h2>
```

```html
<!-- AFTER (clean) -->
<section id="consulta" class="section">
  <div class="container">
    <div class="consulta-pdm">
      <div class="container">
        <h2 class="section-title" style="color: #171b46;">Plan de Desarrollo Metropolitano de Iquitos 2045</h2>
```

### Why This Happens
When extracting a section from `index.html` into its own page, the h1 `page-title` gets copied along but the content already has an h2 `section-title` with the full descriptive name.

## Fix Workflow

### Step 1: Identify Redundant Titles
- Look for `h1 class="page-title"` near the top of a section
- Check if there's an `h2 class="section-title"` directly below with similar/same text
- If both exist with same content → remove the h1

### Step 2: Verify Background Consistency
- After removing h1, check if the section still has proper background
- The h2 subtitle should retain its inline color styles (e.g., `style="color: #171b46;"`)
- This ensures text visibility on colored backgrounds

### Step 3: Apply the Fix
Remove the h1 line that contains redundant content, keeping only the h2 subtitle.

### Step 4: Match Text Colors
If the original h1 had a specific background that required light text, and the h2 was using inline dark colors:
- Keep the inline `style="color: #171b46;"` on the h2 to maintain contrast
- This preserves the original visual appearance

## Trigger Words

When user mentions these, apply this skill:
- "título innecesario" / "unnecessary title"
- "subtítulo como título" / "subtitle as title"
- "eliminar título" / "remove title"
- "fondo oscuro" / "dark background"
- "no es necesario" / "not necessary"
- "ya dice en el subtítulo" / "already says in the subtitle"
- "duplicado" / "duplicate"
- Screenshot showing title banner that overlaps with visible subtitle

## Example Fix

**Problem:** `pdm-iquitos.html` had both:
- `h1 class="page-title">PDM Iquitos` (dark background, redundant)
- `h2 class="section-title" style="color: #171b46;">Plan de Desarrollo Metropolitano de Iquitos 2045`

**Solution:** Removed the h1, kept h2 with full descriptive title.