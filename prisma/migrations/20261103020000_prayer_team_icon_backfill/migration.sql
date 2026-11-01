-- Gives the existing prayer teams their proper icons.
-- The previous migration added the "icon" column with a default of 'Users',
-- so existing rows need this one-time update to match what the site used to
-- show (a hardcoded icon per slug).
-- Safe to run on a fresh database: with no matching rows, nothing changes.
UPDATE "PrayerTeam" SET "icon" = 'Baby' WHERE "slug" = 'kids';
UPDATE "PrayerTeam" SET "icon" = 'HeartHandshake' WHERE "slug" = 'adults';
