/*
  Warnings:

  - A unique constraint covering the columns `[resourceName]` on the table `EventResource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EventResource_resourceName_key" ON "EventResource"("resourceName");
