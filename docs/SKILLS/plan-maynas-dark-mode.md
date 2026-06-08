---
name: plan-maynas-dark-mode
description: Fix dark mode color contrast issues in Plan Maynas website. Handles inline hardcoded colors (#171b46, white) that become invisible when dark mode is enabled on pages with CSS wrapper divs.
---

## When to Use This Skill

Activate this skill when the user reports visual issues related to dark/light mode toggle, such as:

- " texto no se ve en modo oscuro" / "text invisible in dark mode"
- "letras muy oscuras" / "text too dark"
- "colores no cuadran" / "colors don't match"
- "contraste" / "contrast"
- "dark mode" / "modo oscuro"
- Similar complaints about text visibility after toggling dark mode

## Problem Anatomy

### Root Cause
Many pages in Plan Maynas use inline `style="color: #171b46;"` (dark blue) which is hardcoded. This color works on light backgrounds but becomes invisible when dark mode changes the page background to dark colors.

### Key Structural Pattern
The site uses CSS wrapper classes that provide full-width backgrounds:
- `.proyecto-destacado` - white background
- `.hitos-del-proyecto` - green (#3db877) background with WHITE text
- `.planes-territoriales` - white background
- `.participamos-div` - blue (#4888c8) background with WHITE text
- `.aliados-container` - white background
- `.recursos-div` - orange-red (#EC643B) background with WHITE text
- `.instrumentos-pilares-wrapper` - white background (created during fix)

### The Bug Pattern
1. Content that should have white text (because its wrapper has colored background) uses inline `style="color: #171b46;"`
2. User toggles dark mode
3. Wrapper background changes to dark gray (`--bg-alt: #2D2F3D`)
4. Dark inline text becomes nearly invisible on dark background

## Fix Workflow

### Step 1: Identify the Problem Section
- Ask user which specific text/section is affected
- Look for inline styles like `style="color: #171b46;"` or `style="color: white;"`
- Check if the affected content is inside a colored wrapper div

### Step 2: Analyze the Page Structure
Read the HTML of the affected page and identify:
1. Which wrapper div contains the problematic content
2. Whether the wrapper changes background in dark mode
3. Whether the text color should be white (for colored backgrounds) or dark (for white/light backgrounds)

### Step 3: Choose the Fix Strategy

**Option A: If the section has NO wrapper div**
Create a wrapper div with appropriate styling (see existing patterns like `.hitos-del-proyecto`)

**Option B: If the section HAS a wrapper but wrong text color**
Add dark mode CSS rules targeting the wrapper class:
```css
.dark-mode .WRAPPER-CLASS {
  background: var(--bg-alt);
}
.dark-mode .WRAPPER-CLASS ul,
.dark-mode .WRAPPER-CLASS li {
  color: white !important;
}
```

**Option C: If content is OUTSIDE any colored wrapper but should have its own background**
Extract the content into a dedicated wrapper div with consistent background

### Step 4: Add Dark Mode CSS Rules
Add rules in `styles.css` following the established patterns:
- Background should use `var(--bg-alt)` for dark mode
- Text should be `white` for colored wrapper sections
- Use `!important` to override inline styles if necessary

### Step 5: Verify
- Toggle dark mode and verify text is visible
- Toggle back to light mode and verify original colors are preserved

## CSS Pattern Reference

Existing wrapper classes and their behaviors:

| Class | Light BG | Dark BG | Text Color |
|-------|----------|---------|------------|
| `.hitos-del-proyecto` | #3db877 | stays green? | white |
| `.participamos-div` | #4888c8 | stays blue? | white |
| `.recursos-div` | #EC643B | stays orange? | white |
| `.planes-territoriales` | #ffffff | var(--bg-alt) | dark |
| `.proyecto-destacado` | (inherits) | (inherits) | dark |
| `.instrumentos-pilares-wrapper` | #ffffff | var(--bg-alt) | dark |

## Trigger Words

When user mentions these, apply this skill:
- "muy oscuro" / "too dark"
- "no se ve" / "not visible"
- "dark mode"
- "contraste" / "contrast"
- "color" + "modo oscuro"
- "letras" + "oscuro"
- Screenshot showing text blending into background

## Maintenance Note

When creating NEW standalone pages from `index.html`, always:
1. Check which wrapper divs contain each section
2. Copy ALL structural wrapper divs that provide styling
3. Verify dark mode works correctly before considering the page complete
4. Run the site in both light and dark mode to verify all text is readable