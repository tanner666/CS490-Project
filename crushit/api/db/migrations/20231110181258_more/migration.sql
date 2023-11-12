-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "endingDate" TIMESTAMP(3),
ADD COLUMN     "isRepeated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "completionStatus" SET DEFAULT false;
