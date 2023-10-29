/*
  Warnings:

  - You are about to drop the column `passHash` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passHash",
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;
