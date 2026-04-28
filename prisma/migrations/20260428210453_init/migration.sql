/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quote` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CraftType" AS ENUM ('QUOTE', 'ORDER');

-- AlterEnum
ALTER TYPE "QuoteStatus" ADD VALUE 'Pending';

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Quote";

-- CreateTable
CREATE TABLE "Craft" (
    "id" TEXT NOT NULL,
    "type" "CraftType" NOT NULL DEFAULT 'QUOTE',
    "customer" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "bagType" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "printingRequired" BOOLEAN NOT NULL DEFAULT false,
    "printingDetails" TEXT,
    "deliveryLocation" TEXT NOT NULL,
    "additionalNotes" TEXT,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "quoteStatus" "QuoteStatus" DEFAULT 'Pending Review',
    "orderStatus" "OrderStatus",
    "fulfillmentStatus" "FulfillmentStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Craft_pkey" PRIMARY KEY ("id")
);
