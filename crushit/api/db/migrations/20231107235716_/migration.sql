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
