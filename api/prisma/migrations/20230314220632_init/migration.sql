/*
  Warnings:

  - The primary key for the `PartsOfContests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PartsOfContests" DROP CONSTRAINT "PartsOfContests_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PartsOfContests_pkey" PRIMARY KEY ("id");
