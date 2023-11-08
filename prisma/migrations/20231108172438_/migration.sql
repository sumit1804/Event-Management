/*
  Warnings:

  - Added the required column `resourcePrice` to the `EventResource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventResource" ADD COLUMN     "resourcePrice" INTEGER NOT NULL;
