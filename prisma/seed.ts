import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  // Clear existing data to avoid duplicates if re-running seed
  await prisma.task.deleteMany();
  await prisma.craft.deleteMany();

  // Seed Quotes (as Craft objects of type QUOTE)
  const craft1 = await prisma.craft.create({
    data: {
      id: 'quote-1',
      type: 'QUOTE',
      name: 'John Smith',
      email: 'john@ecoretailers.com',
      phone: '555-0123',
      company: 'EcoRetailers Inc.',
      bagType: 'Retail Paper Bags',
      length: 12.0,
      width: 6.0,
      height: 15.0,
      quantity: 5000,
      printingRequired: false,
      deliveryLocation: 'New York, NY',
      customer: 'EcoRetailers Inc.',
      items: '5,000 Large Kraft Paper Bags',
      amount: 2500.00,
      quoteStatus: 'PENDING_REVIEW',
    },
  });

  const craft2 = await prisma.craft.create({
    data: {
      id: 'quote-2',
      type: 'QUOTE',
      name: 'Maria Garcia',
      email: 'maria@gourmetdelights.com',
      phone: '555-0456',
      company: 'Gourmet Delights',
      bagType: 'Custom Printed Bags',
      length: 8.0,
      width: 4.0,
      height: 10.0,
      quantity: 10000,
      printingRequired: true,
      printingDetails: 'Full color logo on both sides',
      deliveryLocation: 'Chicago, IL',
      customer: 'Gourmet Delights',
      items: '10,000 Custom Printed Lunch Bags',
      amount: 4200.00,
      quoteStatus: 'APPROVED',
    },
  });

  const craft3 = await prisma.craft.create({
    data: {
      id: 'quote-3',
      type: 'QUOTE',
      name: 'David Lee',
      email: 'david@urbanfashion.co',
      phone: '555-0789',
      company: 'Urban Fashion Co.',
      bagType: 'Gift Bags',
      length: 10.0,
      width: 5.0,
      height: 12.0,
      quantity: 2500,
      printingRequired: true,
      printingDetails: 'Gold foil stamp',
      deliveryLocation: 'Los Angeles, CA',
      customer: 'Urban Fashion Co.',
      items: '2,500 Luxury Gift Bags',
      amount: 1850.00,
      quoteStatus: 'AWAITING_APPROVAL',
    },
  });

  // Seed Orders (as Craft objects of type ORDER)
  const craftOrder1 = await prisma.craft.create({
    data: {
      id: 'order-1',
      type: 'ORDER',
      customer: "Nature's Best Market",
      items: '8,000 Grocery Sacks',
      bagType: 'Grocery Sacks',
      length: 10.0,
      width: 5.0,
      height: 12.0,
      quantity: 8000,
      deliveryLocation: 'Seattle, WA',
      orderStatus: 'PRODUCTION',
      fulfillmentStatus: 'PENDING',
      amount: 3200.00,
    },
  });

  const craftOrder2 = await prisma.craft.create({
    data: {
      id: 'order-2',
      type: 'ORDER',
      customer: 'Boutique Blooms',
      items: '1,500 Floral Handle Bags',
      bagType: 'Handle Bags',
      length: 8.0,
      width: 4.0,
      height: 10.0,
      quantity: 1500,
      deliveryLocation: 'Portland, OR',
      orderStatus: 'SHIPPING',
      fulfillmentStatus: 'IN_TRANSIT',
      amount: 950.00,
    },
  });

  const craftOrder3 = await prisma.craft.create({
    data: {
      id: 'order-3',
      type: 'ORDER',
      customer: 'Coffee Culture',
      items: '20,000 Pastry Bags',
      bagType: 'Pastry Bags',
      length: 6.0,
      width: 3.0,
      height: 8.0,
      quantity: 20000,
      deliveryLocation: 'Austin, TX',
      orderStatus: 'DELIVERED',
      fulfillmentStatus: 'COMPLETED',
      amount: 5500.00,
    },
  });

  console.log('Crafts seeded');

  // Seed Tasks
  await prisma.task.create({
    data: {
      id: 'task-1',
      title: 'Review custom artwork for Gourmet Delights',
      status: 'IN_PROGRESS',
      assignee: 'Sarah Miller',
      priority: 'HIGH',
      comments: 3,
    },
  });

  await prisma.task.create({
    data: {
      id: 'task-2',
      title: 'Schedule maintenance for Press #4',
      status: 'TO_DO',
      assignee: 'James Chen',
      priority: 'MEDIUM',
      comments: 0,
    },
  });

  await prisma.task.create({
    data: {
      id: 'task-3',
      title: 'Update inventory for raw kraft paper',
      status: 'DONE',
      assignee: 'James Chen',
      priority: 'LOW',
      comments: 1,
    },
  });

  await prisma.task.create({
    data: {
      id: 'task-4',
      title: 'Urgent: Fix shipping label printer in Warehouse B',
      status: 'TO_DO',
      assignee: 'Mark Wilson',
      priority: 'URGENT',
      comments: 5,
    },
  });

  console.log('Tasks seeded');
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
