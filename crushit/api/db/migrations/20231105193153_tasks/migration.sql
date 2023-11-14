/*
  Warnings:

  - You are about to drop the `PomodoroTimer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PomodoroTimer" DROP CONSTRAINT "PomodoroTimer_userId_fkey";

-- DropTable
DROP TABLE "PomodoroTimer";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "taskName" TEXT NOT NULL,
    "priorityStatus" TEXT NOT NULL,
    "groupStatus" TEXT,
    "completionStatus" BOOLEAN NOT NULL,
    "description" TEXT,
    "pomodoroTimers" INTEGER NOT NULL,
    "pomodoroTimerType" TEXT,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
