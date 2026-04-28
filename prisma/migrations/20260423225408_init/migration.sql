-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('Pending Review', 'Awaiting Approval', 'Approved');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Production', 'Shipping', 'Delivered');

-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('Pending', 'In Transit', 'Completed');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('To Do', 'In Progress', 'Review', 'Done');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Urgent', 'High', 'Medium', 'Low');

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "QuoteStatus" NOT NULL DEFAULT 'Pending Review',
    "amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "OrderStatus" NOT NULL DEFAULT 'Production',
    "fulfill" "FulfillmentStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'To Do',
    "assignee" TEXT NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'Medium',
    "comments" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
