# Golden Faith — Church Website

This is the website for Golden Faith Church International. It's built with
**Next.js** (a popular framework for building fast, modern websites),
**TypeScript** (JavaScript with some extra safety nets), and **Tailwind CSS**
(a way to style pages quickly without writing separate CSS files for
everything).

## What's the look and feel?

We're calling it "retro-industrial" — think old civic signage and vintage
print design. In practice that means:

- **Bold, condensed headlines** in all-caps (the font is called Big Shoulders
  Display)
- **Sharp corners everywhere** — no rounded buttons or cards
- **Thick black borders** instead of soft drop shadows
- **A "pressed button" effect** — buttons and cards have a hard shadow that
  disappears when you hover, like the element is physically being pushed in

Body text (paragraphs, labels, etc.) uses a font called Archivo.

If you want the full breakdown of colors, spacing, and component rules,
check out `design-notes.md` in this folder — that's the detailed style guide.

## Getting started

You'll need [Node.js](https://nodejs.org) installed. Then, from this folder,
run:

```bash
npm install
npm run dev
```

Once that's running, open `http://localhost:3000` in your browser and you
should see the site.

## How the project is organized

Everything lives inside the `src` folder. Here's the short version of what's
where:

- **`app/`** — This is where the actual pages live (Home, About, Sermons,
  Events, and so on). Next.js turns each folder in here into a page on the
  site automatically.
- **`components/`** — Reusable building blocks. `layout/` has the header and
  footer that show up on every page. `ui/` has smaller pieces like buttons,
  cards, and form fields that get reused all over the site.
- **`sections/`** — Bigger chunks built from those smaller pieces, grouped by
  which page they belong to (e.g. everything for the Events page lives in
  `sections/events-page/`).
- **`config/site.ts`** — One file that controls the navigation menu, footer
  links, contact info, and service times. Change something here and it
  updates everywhere it's used.
- **`data/`** — This is where the actual content lives: sermons, ministries,
  events, staff/leader names, prayer teams, and testimonies. Think of these
  as simple lists you can edit without touching any page code.
- **`lib/`** — Small helper functions, like formatting a date nicely or
  handling what happens when someone submits a form.
- **`types/`** — Defines the "shape" of the data (what fields a sermon or
  event is supposed to have). Mostly useful for keeping things consistent
  behind the scenes.

## What pages exist right now

- **Home** — hero section, mission statement, latest sermon, upcoming events,
  ministries preview, and a giving/prayer call-to-action
- **About** — mission statement, core values, and leadership info
- **Sermons** — a list of past messages, plus a dedicated page for each one
- **Ministries** — a list of ministries (Kids, Youth, Connect Groups), plus a
  dedicated page for each one
- **Events** — upcoming events with filters, a featured event, and an
  archive of past events
- **Prayer Requests** — a form to submit a request, info on prayer teams you
  can join, and answered-prayer testimonials
- **Giving** — a donation form with preset amounts, fund selection, and
  one-time/monthly options
- **Connect** — a "plan your visit" page with separate sign-up forms for
  kids, youth, and adults
- **Live** — the live stream page, with sermon notes and chat alongside the
  video

The header navigation groups some of these together — "Watch" covers Sermons
and Live, and "Get Involved" covers Ministries, Events, Prayer Requests, and
Connect — so the menu doesn't get too crowded.

## Making changes

- **Want to update text, add a sermon, or add an event?** You probably just
  need to edit a file in `src/data/`. No need to touch the page layouts.
- **Want to change contact info, service times, or menu links?** That's all
  in `src/config/site.ts`.
- **Want to change how something looks?** Look in `src/components/ui/` first
  — there's a good chance the button, card, or form style you want to change
  already exists as a reusable piece there, and changing it once will update
  it everywhere it's used.

One thing worth knowing: the forms (Giving, Prayer Requests, Connect) don't
actually send anything anywhere yet. They're fully working on the screen —
you can type, submit, and see a success message — but behind the scenes
they just log the submission instead of saving it or emailing anyone. That's
intentional for now; when a real backend or email service is ready, there's
one file (`src/lib/forms.ts`) where that gets wired up, so none of the forms
themselves need to change.

## A note on fonts and images

The headline font (Big Shoulders Display) is loaded from font files sitting
in `src/app/fonts/`, and the body font (Archivo) comes from Google Fonts
automatically. Images used across the site live in `public/images/` — if
you're swapping in real photos, that's where they go.