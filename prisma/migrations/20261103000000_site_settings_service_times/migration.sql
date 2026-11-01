CREATE TABLE "SiteSetting" (
  "id" TEXT NOT NULL DEFAULT 'singleton',
  "address" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "facebookUrl" TEXT NOT NULL DEFAULT '',
  "instagramUrl" TEXT NOT NULL DEFAULT '',
  "youtubeUrl" TEXT NOT NULL DEFAULT '',
  "givingInstructions" TEXT NOT NULL DEFAULT '',
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "ServiceTime" (
  "id" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "time" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ServiceTime_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "ServiceTime_order_idx" ON "ServiceTime"("order");
