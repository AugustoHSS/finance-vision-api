/*
  Warnings:

  - You are about to drop the column `date` on the `tips` table. All the data in the column will be lost.
  - Added the required column `tip_date` to the `tips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tips" DROP COLUMN "date",
ADD COLUMN     "tip_date" TIMESTAMP(3) NOT NULL;
