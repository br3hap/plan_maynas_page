---
name: plan-maynas-css-specificity
description: Fix CSS specificity issues with dark mode when text disappears or wrong colors appear. Use when elements have correct CSS but don't display properly.
---

## When to Use This Skill

Activate this skill when:
- "text disappears in dark mode" / "texto desaparece en modo oscuro"
- "color doesn't change" / "color no cambia"
- CSS `!important` rules not working
- Elements become invisible after dark mode toggle
- "can see text for a second then it disappears"
- Specificity conflicts between dark mode and page-specific styles

## Problem Description

When extracting page-specific styles from `shared.css` into separate files like `aliados.css` or `participamos.css`, specificity conflicts can occur:

```
body.dark-mode .aliados-div p  (specificity: 0,3,2)
vs
.aliados-div p                 (specificity: 0,2,0)
```

Even with `!important`, higher specificity wins in CSS.

## Diagnosis Workflow

### Step 1: Identify the Problem

Does the element have the correct CSS rule applied?
```bash
# Check if color rule exists in the CSS file
grep -n "color.*171b46" src/style/aliados.css
grep -n "color.*white" src/style/aliados.css
```

### Step 2: Check Specificity

In browser DevTools:
1. Right-click the problematic element → Inspect
2. Look at Styles panel
3. Find which rule is crossed out or has strikethrough
4. Note the specificity of winning vs losing rules

### Step 3: Force Higher Specificity

If `.aliados-div p` doesn't work, use `#root .aliados-div p` instead:

```css
/* Low specificity - can be overridden */
.aliados-div p {
  color: #171b46 !important;
}

/* Higher specificity - harder to override */
#root .aliados-div p {
  color: #171b46 !important;
}

/* Even higher - use when dark mode is still winning */
html body #root .aliados-div p {
  color: #171b46 !important;
}
```

## Solution Patterns

### Pattern 1: Use ID for Specificity Boost

```css
/* Instead of just class */
.aliados-div { }

/* Use ID selector for higher specificity */
#root .aliados-div { }
```

### Pattern 2: Match Dark Mode Specificity

```css
/* If dark mode uses: */
.dark-mode .aliados-div p { }

/* Your override needs at least this much: */
.dark-mode .aliados-div p,
#root .aliados-div p {
  color: #171b46 !important;
}
```

### Pattern 3: Combine Selectors

When one selector isn't enough, chain the same selector:
```css
/* Double the same class = higher specificity */
.aliados-div.aliados-div p {
  color: #171b46 !important;
}
```

## Common Scenarios

### Scenario 1: Background color wrong in dark mode

**Symptom:** Background should be white always but changes to dark in dark mode.

**Solution:** Force background with high specificity:
```css
#root .aliados-div {
  background: #FFFFFF !important;
}
```

### Scenario 2: Text disappears (same as background)

**Symptom:** Text visible for a second, then disappears. Background is dark, text is dark too.

**Solution:** Force text color:
```css
#root .aliados-div p,
#root .aliados-div li,
#root .aliados-div strong {
  color: #171b46 !important;
}
```

### Scenario 3: Only h1/h3 works, p doesn't

**Symptom:** h1 shows correct color but p tags still wrong.

**Solution:** h1 might have `.page-title` class with higher specificity. Add that class to your rule:
```css
#root .aliados-div .page-title,
#root .aliados-div p,
#root .aliados-div h3 {
  color: #171b46 !important;
}
```

### Scenario 4: Card content wrong in dark mode

**Symptom:** Cards invert colors in dark mode but text inside doesn't adjust.

**Solution:** Add specific card rules:
```css
.dark-mode #root .aliados-div .aliado-card h3 {
  color: white !important;
}
```

## CSS Refactor Workflow

When extracting styles from `shared.css` to page-specific CSS:

### Step 1: Create Page CSS File
```css
@import url('shared.css');

.page-div {
  background: #4888C8;
  padding: var(--spacing-xl);
  /* ... full-width layout styles ... */
}
```

### Step 2: Add Dark Mode Overrides
```css
/* Force background for both modes */
#root .page-div {
  background: #4888C8 !important;
}

/* Force text color in dark mode */
.dark-mode #root .page-div h1,
.dark-mode #root .page-div p {
  color: white !important;
}

/* Force text color in light mode */
#root .page-div h1,
#root .page-div p {
  color: #171b46 !important;
}
```

### Step 3: Verify HTML Structure

Make sure the wrapper div exists in HTML:
```html
<div class="page-div">
  <section class="section">
    <div class="container">
      <h1 class="page-title">Title</h1>
      <p>Content</p>
    </div>
  </section>
</div>
```

### Step 4: Test Both Modes

1. Open page in light mode - verify colors
2. Toggle dark mode - verify colors
3. Check ALL text elements (h1, p, li, strong, h3)
4. Check cards if present
5. Verify no elements become invisible

## Quick Reference

| Specificity Level | Selector Example | When to Use |
|-------------------|-------------------|-------------|
| 0,1,0 | `.class` | Normal styling |
| 0,2,0 | `.parent .child` | Normal overrides |
| 0,3,0 | `.parent .child .grandchild` | Safe overrides |
| 1,0,0 | `#id` | When classes get overridden |
| 1,1,0 | `#id .class` | Dark mode conflicts |
| 1,2,0 | `#id .parent .child` | Persistent issues |

## Trigger Words

- "text disappears"
- "texto desaparece"
- "can see for a second then vanishes"
- "se ve un segundo y desaparece"
- "wrong color in dark mode"
- "color incorrecto modo oscuro"
- "specificity"
- "!important not working"
- "css conflict"
- "color coincide with background"
- "can't see text"

## Files to Check

When problems occur, check:
- `src/style/aliados.css`
- `src/style/participamos.css`
- `src/style/muestra-virtual.css`
- `src/style/shared.css` (for base dark mode rules)
- HTML file for wrapper div existence