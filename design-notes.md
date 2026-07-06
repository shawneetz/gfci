# Design Notes

This document defines the core design system used throughout the website. It serves as the reference for maintaining consistency across components, layouts, typography, spacing, and interactions.

---

# Design Philosophy

The interface is designed around four principles:

- **Bold** – Strong condensed type, thick borders, and hard shadows instead of soft polish.
- **Retro-industrial** – Inspired by mid-century civic signage and print — sharp corners, no gradients.
- **Consistent** – Reusable components and standardized spacing.
- **Accessible** – High contrast, readable typography, visible focus states, and semantic HTML.

---

# Color Palette

Tokens are named by role (what they're *for*), not by shade — this keeps
the design consistent if colors change later.

## Surfaces

| Token | Value | Use |
|-------|--------|-----|
| `surface` | `#FFFFFF` | Default page & card background |
| `surface-alt` | `#F7F5F2` | Alternating section background |
| `surface-inverse` | `#121212` | Dark sections: hero, footer, page headers, live page |

## Text (Ink)

| Token | Value | Use |
|-------|--------|-----|
| `ink` | `#111111` | Headings, primary text |
| `ink-secondary` | `#444444` | Secondary body copy |
| `ink-muted` | `#666666` | Meta info, captions, dates |
| `ink-inverse` | `#FFFFFF` | Text on dark surfaces |
| `ink-inverse-secondary` | `#D7D7D7` | Faded text on dark surfaces |

## Borders

| Token | Value |
|-------|--------|
| `border` | `#DDDDDD` |

Borders are now a structural element, not a subtle divider — see
**Shadows & Borders** below.

## Brand

The single accent color. Used only for buttons, small labels/eyebrows,
links, and the Giving callout — never a full-section background.

| Token | Value |
|-------|--------|
| `brand` | `#074E40` |
| `brand-hover` | `#063F34` |
| `brand-active` | `#052F27` |
| `brand-subtle` | `#E6F2EF` |

Add a new token category only once a component actually needs it
(e.g. `danger` when the Connect form gets validation states).


# Typography

## Font Families

### Headlines

- **Big Shoulders**
- Weight: **700–800**
- Set in **uppercase** with tight letter-spacing — this is a condensed
  industrial display face modeled on old civic signage; it's designed
  to be set in caps and reads weak in lowercase.

### Body

- **Archivo**
- Weight: **400–700**

---

## Typography Scale

### Display

Used for Hero sections.

| Property | Value |
|----------|-------|
| Size | **48px** |
| Desktop | **64px** |
| Weight | **800** |
| Line Height | **1** |

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
| Weight | **800** |
| Line Height | **1.1** |

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
| Line Height | **1.15** |

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
| Line Height | **1.2** |

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
| All corners | **0px** |

No rounded corners anywhere in `ui/`. Sharp edges are a deliberate part
of the retro-industrial look and pair with the condensed headline type.
If a future component needs a rounded corner (e.g. an avatar), treat it
as an explicit exception, not a default.

---

# Shadows & Borders

Soft blurred shadows are gone. Elevation now comes from two things used
together:

## Border

```
2px solid var(--color-ink)
```

Every card, button, and image tile carries a visible 2px border instead
of relying on a shadow alone to define its edge.

## Hard offset shadow

```
4px 4px 0 0 var(--color-ink)
```

A flat, non-blurred shadow — no blur radius, no opacity fade. On hover,
the element translates into the shadow (`translate-x-[4px] translate-y-[4px]`)
and the shadow disappears, mimicking a physical button being pressed.

Used for:

- Cards
- Buttons
- Event cards

Larger elements (Cards) use a `6px 6px` offset; smaller ones (Buttons)
use `4px 4px`, so the effect scales with the size of the element.

---

# Buttons

## Primary

- Filled ink (near-black), white text
- 2px border, hard offset shadow that collapses on hover

Used for:

- Main Call-to-Action

Examples

- Watch Live
- Plan Your Visit

---

## Secondary

- White background
- Ink border, ink text
- Same hard offset shadow treatment as Primary

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

- Transparent background
- Ink-inverse border and text
- Hard offset shadow in ink-inverse

Used over Hero images and other dark surfaces.

---

# Cards

Cards use:

- White background
- **Sharp corners** (no radius)
- Medium padding
- 2px solid ink border
- Hard offset shadow (no blur)
- Hover: lifts up and shifts into its shadow

Examples

- Event Cards
- Sermon Cards
- Ministry Cards

---

# Imagery

Images should:

- Fill container
- Use object-cover
- **Sharp corners** (no radius)
- 2px ink border around the tile
- Optional gradient overlay for text legibility
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

Sections compose these components rather than duplicating styles. All
of them share the same visual language — sharp corners, 2px ink
borders, hard offset shadows — so a new component should follow that
pattern rather than introducing `rounded-xl` or `shadow-sm`.

---

# Interaction

Animations should be subtle and fast — closer to a mechanical snap
than a soft fade.

Recommended duration:

```
150ms
```

or

```
200ms
```

Use:

- translate on hover (buttons and cards shift into their shadow)
- hover:-translate-y-1 (cards lift slightly before shifting)
- border-color transitions where relevant

Avoid excessive animation, and avoid blur/opacity-based shadow
transitions — they clash with the flat, hard-edged shadow style.

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
- Default to `rounded-none` and the hard offset shadow pattern for any
  new component — don't reach for `rounded-xl` or `shadow-sm`.