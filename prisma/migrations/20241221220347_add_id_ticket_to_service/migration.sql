/*
  Warnings:

  - Added the required column `is_ticket` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "is_ticket" BOOLEAN NOT NULL;
