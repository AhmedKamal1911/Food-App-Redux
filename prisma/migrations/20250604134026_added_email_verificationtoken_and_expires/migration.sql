-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerificationExpries" TIMESTAMP(3),
ADD COLUMN     "emailVerificationToken" TEXT;
