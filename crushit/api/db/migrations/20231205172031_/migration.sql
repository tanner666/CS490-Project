/*
  Warnings:

  - Added the required column `currentLong` to the `PomodoroTimer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPomo` to the `PomodoroTimer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentShort` to the `PomodoroTimer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PomodoroTimer" ADD COLUMN     "currentLong" INTEGER NOT NULL,
ADD COLUMN     "currentPomo" INTEGER NOT NULL,
ADD COLUMN     "currentShort" INTEGER NOT NULL;
