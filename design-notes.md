# Design Notes

This document defines the core design system used throughout the website. It serves as the reference for maintaining consistency across components, layouts, typography, spacing, and interactions.

---

# Design Philosophy

The interface is designed around four principles:

- **Simple** – Minimal visual clutter and clear hierarchy.
- **Modern** – Contemporary layouts, generous whitespace, and subtle motion.
- **Consistent** – Reusable components and standardized spacing.
- **Accessible** – High contrast, readable typography, visible focus states, and semantic HTML.

---

# Color Palette

## Primary

Used for branding, buttons, headings, and accents.

| Token | Value |
|-------|--------|
| Primary | `#074E40` |
| Primary 50 | `#E6F2EF` |
| Primary 100 | `#CCE5DF` |
| Primary 200 | `#99CBBF` |
| Primary 300 | `#66B19F` |
| Primary 400 | `#33977F` |
| Primary 500 | `#074E40` |
| Primary 600 | `#063F34` |
| Primary 700 | `#052F27` |
| Primary 800 | `#03201A` |
| Primary 900 | `#02100D` |

---

## Neutral

Used for body text, borders, backgrounds, and supporting elements.

| Token | Value |
|-------|--------|
| Neutral | `#1A1A1A` |
| Neutral 50 | `#F5F5F5` |
| Neutral 100 | `#E6E6E6` |
| Neutral 200 | `#CCCCCC` |
| Neutral 300 | `#B3B3B3` |
| Neutral 400 | `#999999` |
| Neutral 500 | `#666666` |
| Neutral 600 | `#4D4D4D` |
| Neutral 700 | `#333333` |
| Neutral 800 | `#262626` |
| Neutral 900 | `#1A1A1A` |

---

## Supporting Colors

| Token | Value |
|-------|--------|
| Secondary | `#FFFFFF` |
| Tertiary | `#F4F7F6` |

---

# Typography

## Font Families

### Headlines

- **Montserrat**
- Weight: **700–800**

### Body

- **Inter**
- Weight: **400–600**

---

## Typography Scale

### Display

Used for Hero sections.

| Property | Value |
|----------|-------|
| Size | **48px** |
| Desktop | **64px** |
| Weight | **800** |
| Line Height | **1.1** |

Utility:

```html
text-display
```

---

### Section Title

Used for section headings.

Examples:

- Ministries
- Upcoming Events
- Latest Message

| Property | Value |
|----------|-------|
| Mobile | **32px** |
| Desktop | **40px** |
| Weight | **700** |
| Line Height | **1.2** |

Utility:

```html
text-section-title
```

---

### Card Title

Used inside cards.

Examples:

- Event Card
- Ministry Card
- Sermon Card

| Property | Value |
|----------|-------|
| Mobile | **24px** |
| Desktop | **28px** |
| Weight | **700** |
| Line Height | **1.3** |

Utility:

```html
text-card-title
```

---

### Subtitle

Used for secondary headings.

| Property | Value |
|----------|-------|
| Mobile | **20px** |
| Desktop | **24px** |
| Weight | **700** |

Utility:

```html
text-subtitle
```

---

### Body Large

Used for introductory paragraphs.

| Property | Value |
|----------|-------|
| Size | **18px** |
| Weight | **400** |
| Line Height | **1.6** |

Utility:

```html
text-body-lg
```

---

### Body

Standard paragraph text.

| Property | Value |
|----------|-------|
| Size | **16px** |
| Weight | **400** |
| Line Height | **1.6** |

Utility:

```html
text-body
```

---

### Small Body

Supporting information.

| Property | Value |
|----------|-------|
| Size | **14px** |
| Weight | **400** |

Utility:

```html
text-body-sm
```

---

### Label

Buttons, Eyebrows, Badges.

| Property | Value |
|----------|-------|
| Size | **14px** |
| Weight | **600** |
| Letter Spacing | **0.1em** |
| Transform | **Uppercase** |

Utility:

```html
text-label
```

---

### Caption

Metadata.

| Property | Value |
|----------|-------|
| Size | **12px** |
| Weight | **500** |

Utility:

```html
text-caption
```

---

# Layout

## Container

Maximum Width

```
1280px
```

---

## Header

Height

```
64px
```

Fixed

Transparent over Hero

White background after scrolling

---

# 8-Point Grid System

Spacing throughout the site follows an 8-point system.

Preferred spacing values:

| Value | Usage |
|-------|------|
| 4 | Fine adjustments |
| 8 | Small spacing |
| 16 | Default spacing |
| 24 | Medium spacing |
| 32 | Component spacing |
| 40 | Large spacing |
| 48 | Large sections |
| 64 | Default section padding |
| 96 | Large sections |
| 128 | Hero spacing |

Whenever possible, spacing should be multiples of **8px**.

---

# Border Radius

| Token | Value |
|-------|-------|
| Small | 6px |
| Medium | 10px |
| Large | 16px |

---

# Shadows

Card Shadow

```
0 4px 24px rgba(0,0,0,0.08)
```

Used for:

- Cards
- Elevated Components

---

# Buttons

## Primary

- Filled Primary Green
- White Text

Used for:

- Main Call-to-Action

Examples

- Watch Live
- Plan Your Visit

---

## Secondary

- White Background
- Primary Border
- Primary Text

Used for secondary actions.

---

## Ghost

Text only.

Used for inline actions.

---

## Tonal

Light filled button.

Used on dark backgrounds.

---

## Outlined

Transparent

White Border

White Text

Used over Hero images.

---

# Cards

Cards use:

- White background
- Rounded corners
- Medium padding
- Light border
- Optional shadow
- Hover elevation

Examples

- Event Cards
- Sermon Cards
- Ministry Cards

---

# Imagery

Images should:

- Fill container
- Use object-cover
- Rounded corners
- Optional gradient overlay
- Maintain consistent aspect ratio

---

# Components

Reusable UI components include:

- Button
- ButtonLink
- Card
- EventCard
- ImageCard
- Container

Sections compose these components rather than duplicating styles.

---

# Interaction

Animations should be subtle.

Recommended duration:

```
200ms
```

or

```
300ms
```

Use:

- hover:scale-105
- shadow transitions
- opacity transitions

Avoid excessive animation.

---

# Accessibility

Always include:

- Semantic HTML
- Keyboard focus styles
- High contrast
- Descriptive alt text
- Visible hover states
- Large touch targets on mobile

---

# Responsive Design

Mobile-first.

Breakpoints:

- Mobile
- md
- lg
- xl

Typography scales upward only when additional space is available.

---

# Development Guidelines

- Use Tailwind CSS 4 utilities.
- Prefer reusable UI components over repeated markup.
- Keep components focused on a single responsibility.
- Use semantic utility names (`text-section-title`, `text-body-lg`, etc.) instead of repeating long utility strings.
- Follow the 8-point spacing system whenever possible.
- Favor composition over duplication.
- Maintain visual consistency across all pages.