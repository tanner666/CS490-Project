/*
  Warnings:

  - Added the required column `firebaseUid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firebaseUid" TEXT NOT NULL,
ALTER COLUMN "username" SET DATA TYPE TEXT;
