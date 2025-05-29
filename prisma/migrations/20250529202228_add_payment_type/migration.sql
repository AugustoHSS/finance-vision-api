-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('M', 'USD');

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "payment_type" "PaymentType" NOT NULL DEFAULT 'USD';
