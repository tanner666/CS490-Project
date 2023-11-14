-- DropForeignKey
ALTER TABLE "PomodoroTimer" DROP CONSTRAINT "PomodoroTimer_userId_fkey";

-- AlterTable
ALTER TABLE "PomodoroTimer" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "PomodoroTimer" ADD CONSTRAINT "PomodoroTimer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("firebaseUid") ON DELETE CASCADE ON UPDATE CASCADE;
