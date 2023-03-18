-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "referralId" INTEGER NOT NULL,
    "reffererToken" TEXT NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
