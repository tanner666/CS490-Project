-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "endingDate" TIMESTAMP(3),
ADD COLUMN     "isRepeated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "completionStatus" SET DEFAULT false;

-- CreateTable
CREATE TABLE "PomodoroTimer" (
    "id" SERIAL NOT NULL,
    "pomodoro" INTEGER NOT NULL,
    "short" INTEGER NOT NULL,
    "long" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PomodoroTimer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PomodoroTimer" ADD CONSTRAINT "PomodoroTimer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
