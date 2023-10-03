-- CreateTable
CREATE TABLE "count_tracker" (
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "count_tracker_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "count_tracker_userId_key" ON "count_tracker"("userId");
