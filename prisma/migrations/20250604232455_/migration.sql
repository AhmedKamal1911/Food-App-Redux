/*
  Warnings:

  - You are about to drop the column `emailVerificationExpries` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerificationExpries",
ADD COLUMN     "emailVerificationExpires" TIMESTAMP(3);
