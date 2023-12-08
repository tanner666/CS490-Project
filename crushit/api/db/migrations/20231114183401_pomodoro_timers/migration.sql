/*
  Warnings:

  - Added the required column `taskId` to the `PomodoroTimer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PomodoroTimer" ADD COLUMN     "taskId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PomodoroTimer" ADD CONSTRAINT "PomodoroTimer_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
