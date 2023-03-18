/*
  Warnings:

  - You are about to drop the `Referral` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_referralId_fkey";

-- DropTable
DROP TABLE "Referral";

-- CreateTable
CREATE TABLE "Referring" (
    "id" SERIAL NOT NULL,
    "referralId" INTEGER NOT NULL,
    "referrerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referring_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referring_referralId_referrerId_key" ON "Referring"("referralId", "referrerId");

-- AddForeignKey
ALTER TABLE "Referring" ADD CONSTRAINT "Referring_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referring" ADD CONSTRAINT "Referring_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
