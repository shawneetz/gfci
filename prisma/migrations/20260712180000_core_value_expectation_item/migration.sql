-- CreateTable
CREATE TABLE "CoreValue" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CoreValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpectationItem" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ExpectationItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CoreValue_order_idx" ON "CoreValue"("order");

-- CreateIndex
CREATE INDEX "ExpectationItem_order_idx" ON "ExpectationItem"("order");