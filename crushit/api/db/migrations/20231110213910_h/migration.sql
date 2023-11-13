/*
  Warnings:

  - You are about to drop the column `endingDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `groupStatus` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isRepeated` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `priorityStatus` on the `Task` table. All the data in the column will be lost.
  - Added the required column `taskOrder` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImportanceGroup" AS ENUM ('TopPriority', 'Important', 'Other');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "endingDate",
DROP COLUMN "groupStatus",
DROP COLUMN "isRepeated",
DROP COLUMN "priorityStatus",
ADD COLUMN     "ImportanceGroup" "ImportanceGroup",
ADD COLUMN     "taskOrder" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pomodorosCompleted" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "TaskDate" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "TaskDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskDate" ADD CONSTRAINT "TaskDate_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
