/*
  Warnings:

  - You are about to drop the column `date` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `bagType` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryLocation` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "date",
ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "bagType" TEXT NOT NULL,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "deliveryLocation" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "length" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "printingDetails" TEXT,
ADD COLUMN     "printingRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 'TBD';
