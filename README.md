# Golden Faith — Church Website

This is the website for Golden Faith Church International. It's built with
**Next.js** (App Router), **TypeScript**, **Tailwind CSS**, **Prisma** +
PostgreSQL for content that changes over time, and a password-protected
admin panel for editing that content without a code deploy.

## What's the look and feel?

We're calling it "retro-industrial" — think old civic signage and vintage
print design. In practice that means:

- A serif display face (**Zodiak**) for headlines, paired with a quiet
  humanist sans (**General Sans**) for body text
- **Sharp corners everywhere** — no rounded buttons or cards
- **Thick borders** instead of soft drop shadows
- **A "pressed button" effect** — buttons and cards have a hard shadow
  that disappears when you hover, like the element is physically being
  pushed in

If you want the full breakdown of colors, spacing, and component rules,
check out `design-notes.md` in this folder — that's the detailed style
guide.

## Getting started

You'll need [Node.js](https://nodejs.org) and a PostgreSQL database (the
project is set up for [Supabase](https://supabase.com), but any Postgres
works). Add a `.env` file with `DATABASE_URL` (pooled connection, used at
runtime) and `DIRECT_URL` (direct connection, used for migrations and
seeding — see `prisma.config.ts`). Then, from this folder:

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Once that's running, open `http://localhost:3000` for the public site.
For the admin panel, see "Admin access" below.

## How the project is organized

Everything lives inside the `src` folder. Here's the short version of
what's where:

- **`app/(site)/`** — The public pages (Home, About, Sermons, Events, and
  so on). Next.js turns each folder in here into a page automatically.
- **`app/admin/`** — The password-protected admin panel: a dashboard plus
  create/edit/delete screens for every content type.
- **`components/`** — Reusable building blocks. `layout/` has the header
  and footer that show up on every page. `ui/` has smaller pieces like
  buttons, cards, and form fields that get reused all over the site.
- **`sections/`** — Bigger chunks built from those smaller pieces, grouped
  by which page they belong to.
- **`config/site.ts`** — One file that controls the navigation menu,
  footer links, contact info, and service times.
- **`content/`** — Fixed page copy that doesn't change without a code
  deploy: headings, button labels, form messages, empty states. This is
  *not* where sermons, events, or ministries live — see below.
- **`server/queries/`** and **`server/mutations/`** — Everything that
  reads from or writes to the database: sermons, ministries, events,
  prayer teams, testimonies, staff/leaders, the live stream, core values,
  and "what to expect" items. This is the actual content of the site,
  and it's editable through `/admin` without touching code.
- **`lib/`** — Shared helpers: date formatting, image resizing, slug
  generation, the icon lookup table, the database client.

## Admin access

There's no public sign-up page. To create the first admin account, run:

```bash
npm run admin:create -- "you@goldenfaith.church" "a-strong-password" "Your Name"
```

Then sign in at `/admin/login`. From there you can create, edit, and
delete every content type listed above, including uploading images
(automatically resized before upload — see "Images" below).

## Making changes

- **Want to update a sermon, event, ministry, prayer team, testimony, or
  staff member?** Sign in to `/admin` and edit it there — no code changes
  or deploys needed.
- **Want to change contact info, service times, or menu links?** That's
  in `src/config/site.ts`.
- **Want to change fixed page copy** (headings, button labels, form
  success/error messages)? That's in `src/content/*.ts`, one file per
  page.
- **Want to change how something looks?** Look in `src/components/ui/`
  first — there's a good chance the button, card, or form style you want
  already exists as a reusable piece there, and changing it once updates
  it everywhere it's used.

One thing worth knowing: the public-facing forms (Giving, Prayer
Requests, Connect) write real rows to the database via Server Actions in
`src/lib/forms.ts`. Giving only records *intent* — no payment is actually
processed yet, since a payment provider isn't wired up.

## Images

New images (ministry photos, sermon thumbnails, event photos) uploaded
through `/admin` go straight to [Vercel Blob](https://vercel.com/docs/storage/vercel-blob),
not into this repo. `public/images/` is legacy at this point — it holds
the original launch placeholder images and the small set `prisma/seed.ts`
still points at for local dev fixtures, kept around so development
doesn't require a Blob token just to look at seed data. A one-time script
(`npm run backfill:images`) exists to migrate any database row still
pointing at a local `/images/...` path over to Blob storage.

## Seed data vs. production content

- **`prisma/seed.ts`** (`npm run db:seed`) — minimal fixture data for
  local development and CI. Just enough rows to exercise every code
  path. Safe to wipe and re-run against a throwaway database any time.
- **`scripts/bootstrap-production.ts`** (`npm run bootstrap:production`)
  — a one-time script for seeding a *fresh* production database with
  real starter content. Real content changes after that go through
  `/admin`, not this script.