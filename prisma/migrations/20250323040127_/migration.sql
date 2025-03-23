/*
  Warnings:

  - A unique constraint covering the columns `[name,productId]` on the table `Extra` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,productId]` on the table `Size` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Extra_name_productId_key" ON "Extra"("name", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_productId_key" ON "Size"("name", "productId");
