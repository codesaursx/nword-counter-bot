/*
  Warnings:

  - The primary key for the `count_tracker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[guildId]` on the table `count_tracker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guildId` to the `count_tracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "count_tracker" DROP CONSTRAINT "count_tracker_pkey",
ADD COLUMN     "guildId" TEXT NOT NULL,
ADD CONSTRAINT "count_tracker_pkey" PRIMARY KEY ("userId", "guildId");

-- CreateIndex
CREATE UNIQUE INDEX "count_tracker_guildId_key" ON "count_tracker"("guildId");
