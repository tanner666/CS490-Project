/*
  Warnings:

  - Added the required column `pomodoroLength` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pomodoroLong` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pomodoroShort` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pomodoroLength" INTEGER NOT NULL,
ADD COLUMN     "pomodoroLong" INTEGER NOT NULL,
ADD COLUMN     "pomodoroShort" INTEGER NOT NULL;
