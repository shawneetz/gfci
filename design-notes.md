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
# Design Direction: Modern Heritage

*Adopted 2026-07-11 — tracked in `design-checklist.md` §1.*

The current system (Big Shoulders + Archivo, hard offset shadows, sharp
corners) is one generation of the identity. The next pass isn't a
redesign — it's the same institution with its edges sanded down in the
right places. The reference point is a well-kept civic institution that's
been quietly renovated: the original materials (thick rules, sharp
corners, condensed civic-signage lettering) stay as the signature move,
but get used with more restraint instead of being the default texture on
every surface.

**What stays exactly as-is:**
- The full color palette — brown/ink/cream/near-black. Nothing in this
  direction touches a hex value beyond the two conflicts already resolved
  in §0.
- Big Shoulders Display for structural/UI headlines (nav, buttons,
  section titles).
- The hard-offset-shadow / sharp-corner signature — it stays the
  recognizable move, just applied more deliberately (see design-checklist.md
  §3–§4) rather than by default on every bordered surface.

**What's introduced:**
- A warmer editorial serif for moments that carry emotional or
  institutional weight — the mission statement, testimonies/answered
  prayers, sermon pull-quotes. Structural and UI text keeps the existing
  industrial sans; this is additive, not a wholesale typeface swap. See
  design-checklist.md §2 and §11 for the shortlisted pairing.
- A general "quieter chrome" pass on borders, shadows, and spacing
  anywhere the hard-shadow signature isn't the point — the shadow stays
  reserved for things that are genuinely clickable or the single most
  important surface on a page, not applied reflexively to every panel.

**Why this direction and not something else:** it's timeless over
trendy — it leans on print and civic-institution reference points
(ledger books, engraved plaques, archive typography) rather than this
year's SaaS-template look (soft gradients, blur, glow, a single acid
accent, rounded-2xl everywhere), so it won't date the way that aesthetic
will. See design-checklist.md §9 ("will this age well?") for the filter
this direction is meant to pass.

This section is the reference implementation sections should build
against — if a task in design-checklist.md §2–§8 seems to conflict with
it, the direction here wins; flag the conflict rather than quietly
picking one.

# Color Palette

Tokens are named by role (what they're *for*), not by shade — this keeps
the design consistent if colors change later.

## Surfaces

| Token | Value | Use |
|-------|--------|-----|
| `surface` | `#FFFFFF` | Default page & card background |
| `surface-alt` | `#F7F5F2` | Alternating section background; also the `light` PageHero background |
| `surface-inverse` | `#121212` | Dark sections: hero, footer, page headers, live page |

## Text (Ink)

| Token | Value | Use |
|-------|--------|-----|
| `ink` | `#111111` | Headings, primary text |
| `ink-secondary` | `#444444` | Secondary body copy |
| `ink-muted` | `#666666` | Meta info, captions, dates, disabled affordances |
| `ink-inverse` | `#FFFFFF` | Text on dark surfaces |
| `ink-inverse-secondary` | `#D7D7D7` | Faded text on dark surfaces |

## Borders

| Token | Value |
|-------|--------|
| `border` | `#D8D3CD` |

Borders are now a structural element, not a subtle divider — see
**Shadows & Borders** below.

## Brand

The single accent color. Used only for buttons, small labels/eyebrows,
links, and the Giving callout — never a full-section background.

| Token | Value |
|-------|--------|
| `brand` | `#342B25` |
| `brand-hover` | `#463831` |
| `brand-active` | `#241D19` |
| `brand-subtle` | `#F3F0ED` |

> **2026-07-11:** this table previously documented a green brand color
> (`#074E40` and matching hover/active/subtle values) that was never
> actually implemented in `globals.css`. The code's brown has always been
> what renders on the live site — this table now matches it.

### Contrast Validation

*Verified 2026-07-11, alongside the §0 brand/border documentation fix.*

Every brand-involving text/background pairing in active use, checked
against WCAG 2.x contrast ratios:

| Pairing | Where used | Ratio | Result |
|---|---|---|---|
| `brand` on `brand-subtle` | `AmountOption` selected state | 12.18:1 | AA + AAA |
| `inverse` on `brand` fill | Form submit buttons, `ConnectHero` CTA | 13.82:1 | AA + AAA |
| `brand` on white/`surface` | `FieldLabel`, `ArrowLink`, brand-tone `IconEyebrow` | 13.82:1 | AA + AAA |
| `brand-hover` on white/`surface` | `ArrowLink` hover state | 11.22:1 | AA + AAA |

All four clear AA (4.5:1) and AAA (7:1) by a wide margin — the brown is
dark enough that neither direction is close to the threshold. Nothing
here needed adjustment once the brand token itself was corrected to
match the code.

`Button`'s `disabled:opacity-60` state is exempt from this check under
WCAG SC 1.4.11 (inactive components have no contrast minimum) and wasn't
audited further.

**Hover/active ramp** — `brand-active` (0.0133 luminance) < `brand`
(0.0260) < `brand-hover` (0.0436) is the correct, monotonic
darken-on-press / lighten-on-hover ordering. These were manually picked
and remain manually picked; the ramp is already well-formed, so there's
no need to derive them from `brand` programmatically (e.g. via
`color-mix()`) right now. Worth revisiting only if `brand` itself
changes again.

## Tone System

Most colored components (`Button`, `Badge`, `IconEyebrow`, `CtaCard`,
`QuoteCard`) don't take raw color props — they take a shared `Tone`, defined
once in `components/ui/button.tsx` and reused everywhere:

```ts
export type Tone = "ink" | "inverse" | "grey" | "grey2" | "brand" | "transparent";
```

| Tone | Maps to | Typical use |
|------|---------|-------------|
| `ink` | `--color-ink` | Primary fill/border/shadow |
| `inverse` | `--color-ink-inverse` | White fill, or text on a dark fill |
| `grey` | `--color-border` | Light neutral fill/shadow |
| `grey2` | `--color-ink-muted` | Darker neutral fill/shadow |
| `brand` | `--color-brand` | Accent — Giving, primary form submits |
| `transparent` | — | No fill / no shadow |

A component that needs colorable fill/text/border/shadow should accept
`Tone` props (`fill`, `text`, `border`, `shadow`) and resolve them via the
shared `toneVar` map, rather than inventing its own color prop or hardcoding
Tailwind color classes. This is why `Badge` and `IconEyebrow` both import
`Tone` from `button.tsx` instead of declaring their own local tone union —
one source of truth for "what colors exist," even though the type happens to
live in a file named after a different component.

---

# Typography

## Font Families

### Headlines

- **Zodiak** (self-hosted via `next/font/local`; see `src/app/fonts/zodiak`)
- Weight: **700–900**
- An editorial serif with bracketed, slab-like details — reads like an
  engraved plaque or a century-old newspaper masthead, continuing the
  "civic signage" lineage the previous condensed grotesk claimed, but as a
  proper serif. Unlike Big Shoulders, Zodiak is **not** forced uppercase —
  every `h1`–`h6` now renders in its natural mixed case by default.
  Reserve `uppercase` for short strings (nav labels, eyebrows, buttons,
  badges); those render in the body face, not the headline face. The rare
  cases where headline-font text is still forced uppercase (the wordmark,
  footer section labels) carry a small positive `tracking-[0.02em]` bump
  at the component level to keep the caps from feeling cramped.
- Fallback stack: `Georgia, "Times New Roman", serif`

### Body

- **General Sans** (self-hosted via `next/font/local`; see
  `src/app/fonts/general-sans`)
- Weight: **400–700**
- A quiet humanist sans that stays out of the way of the serif headlines
  and holds up cleanly at small sizes — confirmed at `text-body-sm`'s 14px,
  which carries most of the site's meta info (dates, speaker names,
  captions).
- Fallback stack: `"Helvetica Neue", Arial, sans-serif`
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
1280px
Within that outer container, two narrower widths repeat across several
pages and are centralized as shared constants (`src/lib/layout.ts`)
rather than hand-typed per section:

| Constant | Value | Used by |
|---|---|---|
| `FORM_PAGE_MAX_WIDTH` | `max-w-xl` | Giving (all sections), Prayer Requests' form + urgent-line sections |
| `CONTENT_MAX_WIDTH` | `max-w-2xl` | About (all sections), Prayer Requests' team list, Events list + archive |

**Layout audit, 2026-07-11:** every page in each family above was already
using the same literal value — this just gives that agreement a name so
a future edit to one section can't quietly drift from its siblings, the
way `home-page/ministries.tsx`'s section padding had (see below). Widths
used by only one page/pattern (`max-w-3xl` for the Ministry/Sermon detail
pages, `max-w-md` for the Events feature/photo blocks) were checked too
and don't need a shared constant — centralize a width once more than one
page relies on it, not before.

---

## Header

Height
64px

Fixed

Transparent over Hero

White background after scrolling

Grouped nav entries (e.g. "Watch," "Get Involved") open a dropdown on
desktop and an inline accordion on mobile — see **Dropdowns & Accordions**
below.

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

**Grid audit, 2026-07-11:** everything added since the "Modern Heritage"
pass (`TiltCard`, `lib/icon-sizes.ts`, the header/footer `tracking-[0.02em]`
additions, `CtaCard`'s border-width fix, the new `Panel`/`QuoteCard`/
`CtaCard` shadow defaults) only touches typography, borders, shadows, and
icon sizing — none of it introduces a new padding/margin/gap value, so
there's nothing to fix here this cycle. (Icon sizes in `icon-sizes.ts` are
a separate 16/20/24 scale for SVG dimensions, not page spacing, so they're
intentionally not measured against this table.) The one pre-existing
exception, `CardBody`'s `p-5` (20px, not a multiple of 8), predates this
audit window and stays a known, separately-tracked item rather than
something changed here.
---

# Section Padding Weight

Every full-width page section uses one of three padding utilities:

| Class | Mobile | Desktop | Use for |
|---|---|---|---|
| `section-sm` | 48px | 64px | A single info row — one icon, one line or two of text (`UrgentPrayerLine`, `SecurityInfo`) |
| `section` | 64px | 96px | The default — most page content |
| `section-lg` | 96px | 128px | Reserved for a section that needs to visually anchor a page; unused so far |

**Layout audit, 2026-07-11:** every section was checked against this
table. One mismatch was found and fixed: `home-page/ministries.tsx` was
using a hardcoded `py-16` instead of the `section` class, so unlike every
other Home section it never got the 96px desktop bump — on a wide screen
it visually pinched between `UpcomingEvents` and `CtaSection` above and
below it. Fixed to use `section` directly.

`MissionStatement`'s content (an eyebrow plus a single quote) is lighter
than most `section`-weight blocks, but it's kept at `section` rather than
downgraded to `section-sm` on purpose — per the Modern Heritage direction
above, a pull-quote is exactly the kind of moment meant to carry
emotional/institutional weight and earns generous surrounding space
regardless of how little text it holds.

No section is under-padded for its content — the specific failure mode
this audit watches for (a section that grew heavier over time while
still sitting in `section-sm`).
---

# Border Radius

| Token | Value |
|-------|-------|
| All corners | **0px** |

No rounded corners anywhere in `ui/`. Sharp edges are a deliberate part
of the retro-industrial look and pair with the condensed headline type.
If a future component needs a rounded corner (e.g. an avatar), treat it
as an explicit exception, not a default.

`CtaCard` is the one component with a `radius` prop at all (for a possible
future exception), but its **default is `"none"`**, not `"lg"` — an earlier
version defaulted to `"lg"` and quietly broke this rule on every CTA card
that didn't override it. If you add a new `radius`-style escape hatch to a
component, default it to `"none"` for the same reason.

---

# Shadows & Borders

Soft blurred shadows are gone. Elevation now comes from two things used
together:

## Border
2px solid var(--color-ink)

Every card, button, and image tile carries a visible 2px border instead
of relying on a shadow alone to define its edge.

## Hard offset shadow
4px 4px 0 0 var(--color-ink)

A flat, non-blurred shadow — no blur radius, no opacity fade. On hover,
the element translates into the shadow (`translate-x-[4px] translate-y-[4px]`)
and the shadow disappears, mimicking a physical button being pressed.

Used for:

- Cards
- Buttons
- Event cards

Larger elements (Cards) use a `6px 6px` offset; smaller ones (Buttons)
use `4px 4px`, so the effect scales with the size of the element.

The same `6px 6px` treatment is reused for floating overlays that aren't
cards — the desktop nav dropdown, for instance — so anything that "lifts off"
the page reads consistently regardless of what triggered it.

## Shadow discipline

The hard offset shadow is reserved for two cases only: an element that's
**actually clickable**, or **the single most important surface** on its
page. It is not a default decoration for every bordered container.

The most common mistake is a container that holds exactly one button —
giving the container *and* the button their own shadows creates two
competing signals about what's actually interactive. In that pattern,
the button keeps its shadow; the container goes flat
(`shadow={false}` on `Panel`, or omit the `shadow` prop on `CtaCard` to
use its `"transparent"` default).

Static, non-interactive content (testimonials, informational panels
sitting beside something else) defaults to no shadow — `QuoteCard`
follows this via its own `"transparent"` default, same as `CtaCard`.

Floating overlays (`Modal`, the desktop nav dropdown) are the one
exception that doesn't use a boolean — they're always the sole focal
surface while open, so they're always shadowed.

This was audited component-by-component in design-checklist.md §3; that
audit is the canonical list if a new component's shadow default is ever
in question.

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

## Disabled

- `opacity: 0.6`
- `cursor: not-allowed`
- Hover press/shadow-collapse effect suppressed (`pointer-events: none`)

Used while a form is submitting, so the button visibly stops inviting
interaction rather than staying pressable while a request is in flight.

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

`Panel` uses the same border/shadow treatment as `Card` but never lifts or
shifts on hover — reserve `Panel` for static content containers (a form, an
info block) and `Card` for anything that's actually clickable. Mixing the
two up is a common way to accidentally imply an element is interactive when
it isn't, or vice versa.

**Audit confirmed, 2026-07-11:** every `Card` in the codebase is wrapped
in a `Link` (sermons list, sermon detail, latest sermon, featured event),
and no `Panel` is wrapped in a `Link` or given a click handler anywhere.
Re-check this any time a new `Card` or `Panel` is added — the rule is
easy to violate by copy-pasting the "wrong" one for a new use case.
---

# Imagery

Images should:

- Fill container
- Use object-cover
- **Sharp corners** (no radius)
- 2px ink border around the tile
- Optional gradient overlay for text legibility
- Maintain consistent aspect ratio

**Exception:** the three full-bleed hero background images (`Hero`,
`ConnectHero`, `EventsHero`) intentionally skip the border — they're
edge-to-edge page backgrounds, not bordered tiles, and a 2px frame around
a full-bleed photo would fight the effect. Every other content image in
the codebase (cards, ministry tiles, the photo grid, detail-page heroes)
carries the border. Audited 2026-07-11; no other exceptions found.

## Gradient Overlays

Every overlay fades the same direction — `bg-linear-to-t`, dark at the
bottom, transparent at the top — so a photo with text on it always reads
as "darkens toward the caption." What used to vary was the *opacity* at
each stop, picked separately per component. Three named strengths
(`src/lib/overlays.ts`) replace that:

| Constant | Value | Use |
|---|---|---|
| `HERO_OVERLAY` | `/70` → `/30` | Full-bleed hero backgrounds (`Hero`, `ConnectHero`, `EventsHero`) |
| `CARD_OVERLAY` | `/90` → `/40` | A bordered tile with its own heading + description overlaid on the photo (`MinistryCard`, `WhyWeGive`) |
| `TILE_OVERLAY` | `/70` → `/10` | A small tile with only a single-line title, no supporting copy (`ImageCard`) |

**Audit, 2026-07-11:** direction was already consistent everywhere; two
components had drifted on strength and were brought back in line —
`ConnectHero` (was `/80`→`/40`, alone against `Hero`/`EventsHero`'s
`/70`→`/30`) and `MinistryCard` (was `/90`→`/30`, alone against
`WhyWeGive`'s `/90`→`/40`). `PhotoGrid` has no overlay to unify — it
carries no captions on top of its images, so there was nothing hand-tuned
there in the first place. `LatestSermon`'s dark scrim behind its centered
play button (`bg-surface-inverse/25`) is a different pattern — a flat
tint for icon contrast, not a bottom-anchored text-legibility gradient —
and is correctly excluded from this table.

---

# Page Hero

`PageHero` is a single fixed style — dark `surface-inverse` background,
`ink-inverse` title, `ink-inverse-secondary` eyebrow/description. Every
top-level content page (About, Sermons, Ministries, Prayer Requests,
Giving, Events Archive) uses it as-is with no per-page variation, so a
hero always looks the same no matter which page you land on.

Pages with their own full-bleed photo hero (Connect, Events) don't use
`PageHero` at all — they're a deliberately different pattern (dark text
over an image rather than a flat dark panel) and aren't expected to match.
---

# Tabs (Segmented Control)

A plain two-or-three-way segmented control (`components/ui/tabs.tsx`), used
where a user picks between a small number of mutually exclusive views —
Connect's Kids/Youth/Adults registration, and the Live page's mobile
Video/Notes/Chat switcher.

- Full-width, sharp corners, 2px ink border container
- Selected segment: filled `ink`, `ink-inverse` text
- Unselected segments: no fill, `ink-secondary` text
- No animation between states — a plain color swap, consistent with the
  "mechanical snap" interaction principle below

Not for primary page navigation (that's the header) — Tabs are for switching
between views of content that live on the same page.

---

# Dropdowns & Accordions (Navigation)

Grouped nav entries (e.g. "Watch," "Get Involved") need a way to reveal
their sub-links without introducing a whole new visual language:

- **Desktop dropdown** — a floating panel below the trigger, `border-2
  border-ink` + `6px 6px 0 0` hard shadow (the same panel treatment as a
  Card), sharp corners. Opens on hover, and toggles on click so it's still
  reachable without a mouse.
- **Mobile accordion** — inline within the mobile nav list, not floating.
  Expands/collapses under its own label; sub-links are indented and rendered
  in `ink-muted` at rest, `brand` when active.

Both reuse the site's existing border/shadow tokens rather than introducing
drop-shadow blur, rounded corners, or a slide/fade transition — the goal is
that a dropdown reads as "the same design system, in a new arrangement,"
not as a distinct UI kit bolted onto the header.

---

# Form Status Feedback

`FormStatusBanner` is the one shared success/error banner for all forms
(Giving, Prayer Request, Connect registrations) — every form shows the same
banner shape after submitting rather than each inventing its own confirmation
UI:

- `2px` border, sharp corners, same family as Panel/Card
- **Success:** `border-brand`, `bg-brand-subtle`, `text-brand`, check-circle icon
- **Error:** `border-ink`, `bg-surface-alt`, `text-ink`, alert-circle icon

Error state deliberately doesn't use a red/danger color — there's no
`danger` token yet (see the Color Palette note above: add one only once a
component actually needs it, e.g. real field-level validation). Until then,
error banners stay within the neutral ink palette rather than introducing
an off-system red.

---

# Components

Reusable UI components include:

- Button / ButtonLink
- Card
- EventCard
- ImageCard
- Container
- Panel
- PageHero
- Tabs
- FormStatusBanner
- Modal
- Badge, Pill
- MetaRow, IconInfoRow, IconEyebrow, FeatureItem

Sections compose these components rather than duplicating styles. All
of them share the same visual language — sharp corners, 2px ink
borders, hard offset shadows, the shared `Tone` system — so a new component
should follow that pattern rather than introducing `rounded-xl` or
`shadow-sm`, or a bespoke color prop where a `Tone` prop would do.

---

# Interaction

Animations should be subtle and fast — closer to a mechanical snap
than a soft fade.

Recommended duration:
150ms

or
200ms

Use:

- translate on hover (buttons and cards shift into their shadow)
- hover:-translate-y-1 (cards lift slightly before shifting)
- border-color transitions where relevant
- opacity-only for disabled states (no transition needed — the state
  change should be immediate and obvious)

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
- `aria-expanded` / `aria-selected` on any disclosure or tab-like control
  (dropdowns, accordions, Tabs) so assistive tech can track open/selected
  state the same way sighted users see it visually

**Alt text audit, 2026-07-11:** every `Image` in the codebase has an
`alt` prop — nothing was silently missing one. `MinistryCard` (via
`data/ministries.ts`'s `imageAlt` field) and `PhotoGrid`'s callers are the
model to copy: a real, unique description of the photo, separate from any
caption rendered next to it. Three spots weren't following that model —
`ImageCard`, `FeaturedEvent`, and `LatestSermon` were all passing the same
string as both the visible heading *and* the image's `alt`, which makes a
screen reader announce that string twice in a row for no reason. Since
each of those images sits directly beside/below its own duplicate
heading, the correct fix per WCAG is an empty `alt=""` (marks the image
as decorative so the reader skips straight to the one, real heading)
rather than inventing a new description that wasn't otherwise needed.
---

# Responsive Design

Mobile-first.

Breakpoints:

- Mobile
- md
- lg
- xl

Typography scales upward only when additional space is available.

Where a feature can't reasonably fit multiple panels side-by-side below
`lg` (e.g. the Live page's video/notes/chat), prefer a `Tabs` switcher over
hiding content outright with `hidden lg:block` — mobile visitors should
still be able to reach every feature, just one view at a time instead of
three side-by-side.

---

# Caching Strategy

*Added Phase 16, 2026-07-12.*

## The current tradeoff

As of Phase 9, every public page carries `export const dynamic =
"force-dynamic"`. That's a deliberate choice, not an oversight: it means
every request re-runs its Prisma queries and always reflects whatever's
currently in the database, with no CDN or Next.js Data Cache layer sitting
in front of it. The cost is a DB round-trip on every page view — acceptable
at current traffic, and simplest to reason about while the admin UI
(Phase 14–15) was still being built and tested against always-fresh reads.

That tradeoff is being narrowed, not abandoned: it's still the default for
anything time-sensitive, and only loosened where the content genuinely
doesn't change minute-to-minute.

## Where ISR has been adopted

Five routes moved from `force-dynamic` to `export const revalidate = 300`
(a 5-minute cache window) in Phase 16:

| Route | Why it qualifies |
|---|---|
| `/about` | Leadership roster and core values change on the order of weeks |
| `/ministries` | New ministries are rare; existing ones are edited occasionally |
| `/ministries/[slug]` | Same reasoning, per-ministry |
| `/sermons` | New sermons publish roughly weekly |
| `/sermons/[slug]` | Same reasoning, per-sermon |

Everything else stays `force-dynamic` on purpose:

| Route | Why it stays dynamic |
|---|---|
| `/` | Surfaces the latest sermon and nearest upcoming events — "just published, show up instantly" matters here more than anywhere else |
| `/events`, `/events/archive` | Time-sensitive by nature; a stale event list is actively misleading |
| `/live` | Whatever's live right now has to be right now |
| `/prayer-requests` | A submitted request or a newly answered prayer should never wait behind a cache window |
| `/connect`, `/giving` | Both read the ministries list for form/fund options and are cheap, low-traffic pages — no measured benefit to caching them yet |

## Cache busting

A 5-minute window is a ceiling, not the expected delay, because every
mutation that touches ISR'd content calls `revalidatePath()` after a
successful write:

- `src/server/mutations/ministries.ts` → `revalidatePath("/ministries")`
  and `revalidatePath("/ministries/[slug]", "page")` on create, update,
  and delete.
- `src/server/mutations/sermons.ts` → `revalidatePath("/sermons")` and
  `revalidatePath("/sermons/[slug]", "page")`, same three operations.
- `src/server/mutations/core-values.ts` → `revalidatePath("/about")`.
- `src/server/mutations/people.ts` → `revalidatePath("/about")`,
  `revalidatePath("/ministries/[slug]", "page")`, `revalidatePath("/sermons")`,
  and `revalidatePath("/sermons/[slug]", "page")` — a `Person`'s
  `displayName`/`title` surfaces in the About leadership grid, every
  ministry's "Ministry Leader" row, and the sermons list/detail speaker
  credit, so an edit here has to bust all three rather than trying to
  track which specific ministries or sermons reference that person.

The `"/ministries/[slug]"` / `"/sermons/[slug]"` calls use Next's dynamic
route-pattern form (with the `"page"` type argument) rather than a
specific slug string, so they invalidate every generated detail page in
one call instead of requiring the mutation to know which slug(s) changed.

Mutations for content whose only public page is already `force-dynamic`
(events, prayer teams, testimonies, live stream, expectation items) don't
call `revalidatePath()` — there's nothing cached there to bust.

## If this needs revisiting

If a future content type moves onto ISR, or an existing ISR page's
revalidate window needs shortening, update both this section and the two
tables above so they stay the single source of truth for "what's cached
and why," rather than that knowledge living only in scattered `export
const revalidate` lines across the page files.

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
- When a component needs colorable fill/text/border/shadow, accept `Tone`
  props resolved via `toneVar` rather than inventing a new color prop or a
  local tone union — see **Tone System** above.

  # Seed & Fixture Data

*Added 2026-07-14 (Phase 17).*

Two separate scripts populate the database, and they are not
interchangeable:

| Script | Command | Purpose | Safe to re-run? |
|---|---|---|---|
| `prisma/seed.ts` | `npm run db:seed` | Minimal dev/CI fixture data — just enough rows to exercise every code path (both `isLeadershipTeam` branches, a multi-entry sermon series, a featured *and* a past event, etc.) | Yes, freely — meant for throwaway dev/CI databases |
| `scripts/bootstrap-production.ts` | `npm run bootstrap:production` | The original hand-written starter content, for seeding a *fresh* production database once | Technically yes (every write is `upsert` with an empty `update: {}`, so an existing row is never touched) — but only meant to run once, right after the production DB is created |

Real content changes after that first production bootstrap go through
`/admin`, not either of these scripts. `prisma/seed.ts` should never grow
back into a hand-synced copy of production content — if a new code path
needs exercising, add the smallest possible fixture row for it, not a
"real" one.