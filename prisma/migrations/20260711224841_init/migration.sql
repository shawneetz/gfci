-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('Worship', 'Youth', 'Outreach');

-- CreateEnum
CREATE TYPE "PrayerCategory" AS ENUM ('Healing', 'Family', 'Guidance', 'Thanksgiving', 'Other');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('private', 'public');

-- CreateEnum
CREATE TYPE "GivingFrequency" AS ENUM ('one_time', 'monthly');

-- CreateEnum
CREATE TYPE "ConnectAudience" AS ENUM ('kids', 'youth', 'adults');

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT,
    "imageUrl" TEXT,
    "isLeadershipTeam" BOOLEAN NOT NULL DEFAULT false,
    "leadershipOrder" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ministry" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "leaderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ministry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sermon" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "videoUrl" TEXT,
    "summary" TEXT,
    "speakerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sermon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "category" "EventCategory" NOT NULL,
    "location" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerTeam" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PrayerTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnsweredPrayer" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "PrayerCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnsweredPrayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveStream" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "title" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiveStream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerRequestSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" "PrayerCategory" NOT NULL,
    "message" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'private',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrayerRequestSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GivingIntent" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "fund" TEXT NOT NULL,
    "frequency" "GivingFrequency" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GivingIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectRegistration" (
    "id" TEXT NOT NULL,
    "audience" "ConnectAudience" NOT NULL,
    "email" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "parentName" TEXT,
    "children" TEXT,
    "studentName" TEXT,
    "grade" TEXT,
    "fullName" TEXT,
    "socialMedia" TEXT,
    "additionalContact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConnectRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Person_isLeadershipTeam_idx" ON "Person"("isLeadershipTeam");

-- CreateIndex
CREATE UNIQUE INDEX "Ministry_slug_key" ON "Ministry"("slug");

-- CreateIndex
CREATE INDEX "Ministry_order_idx" ON "Ministry"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Sermon_slug_key" ON "Sermon"("slug");

-- CreateIndex
CREATE INDEX "Sermon_series_idx" ON "Sermon"("series");

-- CreateIndex
CREATE INDEX "Sermon_date_idx" ON "Sermon"("date");

-- CreateIndex
CREATE INDEX "Event_date_idx" ON "Event"("date");

-- CreateIndex
CREATE INDEX "Event_category_idx" ON "Event"("category");

-- CreateIndex
CREATE UNIQUE INDEX "PrayerTeam_slug_key" ON "PrayerTeam"("slug");

-- CreateIndex
CREATE INDEX "PrayerTeam_order_idx" ON "PrayerTeam"("order");

-- CreateIndex
CREATE INDEX "PrayerRequestSubmission_createdAt_idx" ON "PrayerRequestSubmission"("createdAt");

-- CreateIndex
CREATE INDEX "GivingIntent_createdAt_idx" ON "GivingIntent"("createdAt");

-- CreateIndex
CREATE INDEX "ConnectRegistration_audience_idx" ON "ConnectRegistration"("audience");

-- CreateIndex
CREATE INDEX "ConnectRegistration_createdAt_idx" ON "ConnectRegistration"("createdAt");

-- AddForeignKey
ALTER TABLE "Ministry" ADD CONSTRAINT "Ministry_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sermon" ADD CONSTRAINT "Sermon_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
