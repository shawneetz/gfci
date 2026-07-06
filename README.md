# Golden Faith — Church Website

A Next.js 15 (App Router) scaffold for the Golden Faith church website, built
around the design tokens from the brand style guide:

- **Colors:** Primary `#074E40`, Secondary `#FFFFFF`, Tertiary `#F4F7F6`, Neutral `#1A1A1A`
- **Type:** Big Shoulders Display (headlines), Archivo (body/labels)
- **Feel:** retro-industrial, bold and condensed, with a hint of brutalism —
  sharp corners, thick borders, and hard offset shadows instead of soft ones

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Structure

```
src
├── app
│   ├── (site)              # public-facing route group (shares header/footer)
│   │   ├── about/
│   │   ├── connect/
│   │   ├── events/
│   │   ├── giving/
│   │   ├── live/
│   │   ├── ministries/
│   │   ├── sermons/
│   │   ├── layout.tsx      # injects Header + Footer
│   │   └── page.tsx        # Home page (fully built out)
│   ├── globals.css
│   └── layout.tsx           # root layout, fonts
├── components
│   ├── layout/               # Header (sticky + hamburger), Footer
│   ├── sections/              # Page-level building blocks (Hero, Mission, PageHero, etc.)
│   └── ui/                    # Button, Container, Card — shared primitives
├── config/
│   └── site.ts                # nav links, service times, contact info
├── data/                       # sermons, ministries, events, announcements
├── lib/
│   └── utils.ts                 # cn() class merger, formatDate()
└── types/
    └── index.ts                  # shared TS interfaces
```

## What's built

- **Home page** is fully functional: Hero, Mission, Latest Sermon, Giving CTA,
  Ministries preview, and Announcements — all wired to real (sample) data.
- **Every other page** (About, Connect, Events, Giving, Live, Ministries,
  Sermons) is scaffolded using the shared `PageHero` component and existing
  `Card` primitive, so they already look consistent with Home. They contain
  placeholder copy marking where to add real content.
- **Header** is sticky, includes a working mobile hamburger menu (client
  component, closes on route change, locks scroll while open).
- **Footer** is standardized site-wide with nav, service times, and contact
  info pulled from `config/site.ts`.

## Design direction

The UI primitives (`Button`, `Card`, `EventCard`, `ImageCard`, `PageHero`)
share one visual language on purpose:

- **Sharp corners.** No rounded corners anywhere in `ui/` — `rounded-none` is
  the default, matching the condensed, industrial headline type.
- **2px borders instead of soft shadows.** Cards and buttons are defined by
  a hard black border, not a blurred drop shadow.
- **Hard offset shadow that collapses on interaction.** Buttons and cards
  carry a flat, non-blurred shadow (`shadow-[4px_4px_0_0_var(--color-ink)]`);
  on hover the element shifts into that shadow and it disappears, like a
  physical button being pressed.

Extend new components with this same pattern rather than reaching for
`rounded-xl` or `shadow-sm` — that would clash with the rest of the site.

## Extending

- Add new sermons/ministries/events/announcements by editing the files in
  `src/data/`.
- Update contact info, nav links, or service times in `src/config/site.ts`.
- All cards, buttons, and section spacing come from the shared `ui/` and
  `sections/` components — extend those rather than writing one-off styles
  per page to keep the site visually unified.
- Swap the CSS-gradient placeholders (Hero background, sermon/ministry/event
  thumbnails) for real photography by dropping images into `public/images`
  and updating the relevant component/data file.
# gfci-website
# gfci