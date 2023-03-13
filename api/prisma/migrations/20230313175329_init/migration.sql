-- CreateTable
CREATE TABLE "PartsOfContests" (
    "contestId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PartsOfContests_pkey" PRIMARY KEY ("contestId","userId")
);

-- AddForeignKey
ALTER TABLE "PartsOfContests" ADD CONSTRAINT "PartsOfContests_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartsOfContests" ADD CONSTRAINT "PartsOfContests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
