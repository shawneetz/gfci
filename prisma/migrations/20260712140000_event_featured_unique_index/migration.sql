-- Enforces "only one Event can be featured at a time" at the database
-- level. Previously enforced only by convention (see the comment on
-- Event.featured in schema.prisma and getFeaturedEvent() in
-- src/server/queries/events.ts) — a second featured: true row would
-- have silently made getFeaturedEvent() pick one arbitrarily instead
-- of erroring anywhere.
--
-- This is a PARTIAL unique index (WHERE "featured" = true), not a plain
-- unique index. A plain `@@unique([featured])` in schema.prisma would
-- be wrong here — it would also forbid having more than one
-- featured: false row, which is the normal case for every non-featured
-- event. Partial unique indexes aren't representable in the Prisma
-- schema DSL, so this exists only as a hand-written migration; there is
-- no matching `@@unique` in schema.prisma, by design (see the comment
-- there pointing back to this file).
--
-- Caveat for future maintainers: because schema.prisma has no
-- declaration for this index, running `prisma db pull` (introspection)
-- may report it as schema drift or fail to represent it. Don't "fix"
-- that by deleting the index — regenerate the migration by hand instead.
CREATE UNIQUE INDEX "Event_only_one_featured"
  ON "Event" ("featured")
  WHERE "featured" = true;`