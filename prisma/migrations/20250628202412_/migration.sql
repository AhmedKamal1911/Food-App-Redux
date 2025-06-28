/*
  Warnings:

  - You are about to drop the `ProductOrderExtra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qty` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductOrderExtra" DROP CONSTRAINT "ProductOrderExtra_extraId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOrderExtra" DROP CONSTRAINT "ProductOrderExtra_productOrderId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Extra" ADD COLUMN     "productOrderId" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "ProductOrder" ADD COLUMN     "qty" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProductOrderExtra";

-- DropTable
DROP TABLE "Transaction";

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_productOrderId_fkey" FOREIGN KEY ("productOrderId") REFERENCES "ProductOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
