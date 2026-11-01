// Central place for the handful of image URLs that live in Vercel Blob
// storage rather than shipping as files under public/images.
//
// Background: prisma/seed.ts and scripts/bootstrap-production.ts were
// written referencing local paths like "/images/event-youth-night.jpg"
// for images that were never actually added to public/images (this is
// exactly the case scripts/backfill-images.ts already warns about, but
// can't fix on its own — it only uploads files that already exist on
// disk, and these don't).
//
// The fix: upload each missing image to Vercel Blob yourself (dashboard,
// or `vercel blob put <file>`), then paste the resulting public URL into
// the matching field below. Once a value is filled in:
//   - prisma/seed.ts and scripts/bootstrap-production.ts will insert the
//     correct URL for any FUTURE fresh dev/CI or production database.
//   - scripts/sync-seed-images.ts (`npm run sync:seed-images`) will patch
//     any row that was already inserted by a prior seed/bootstrap run —
//     re-running seed.ts or bootstrap-production.ts on their own does
//     NOT fix existing rows, since every write in those scripts is an
//     upsert with an empty `update: {}` by design (see the comment atop
//     bootstrap-production.ts — that's what stops it from clobbering
//     admin edits, but it also means it won't pick up a corrected image
//     path here without help).
//
// Leave a value as "" if you haven't uploaded that image yet. Both
// consumers below treat "" as "not set" rather than writing an empty
// string into the database — seed.ts/bootstrap-production.ts fall back
// to the original (broken) local path, and sync-seed-images.ts skips
// that row and tells you it's still pending.

export const SEED_IMAGE_URLS = {
  // Sermon.thumbnail
  sermonFaithThatMoves: "", // "Faith That Moves" — used by both seed.ts and bootstrap-production.ts
  sermonTheWeightOfGrace: "", // "The Weight of Grace" — bootstrap-production.ts only

  // Event.image
  eventYouthNightWorship: "", // "Youth Night Worship" — used by both scripts
  eventCityServeDay: "", // "City Serve Day" — used by both scripts
  eventSundayGathering: "", // "Sunday Gathering" — bootstrap-production.ts only
  eventGfYouthNight: "", // "GF Youth Night" — bootstrap-production.ts only

} as const;