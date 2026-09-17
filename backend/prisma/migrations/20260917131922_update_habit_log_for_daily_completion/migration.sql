/*
  Warnings:

  - You are about to drop the column `completedAt` on the `HabitLog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[habitId,date]` on the table `HabitLog` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HabitLog" DROP COLUMN "completedAt",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "HabitLog_habitId_date_key" ON "HabitLog"("habitId", "date");
