"use server";

import { prisma } from '@/lib/prisma';
import { 
  Quote, 
  DetailedQuote, 
  Order, 
  Task, 
  QuoteStatus, 
  OrderStatus, 
  FulfillmentStatus, 
  TaskStatus, 
  Priority,
  BaseCraftData
} from '../types';

function mapBaseCraftData(o: any): BaseCraftData {
  return {
    id: o.id,
    customer: o.customer,
    items: o.items,
    bagType: o.bagType,
    length: o.length,
    width: o.width,
    height: o.height,
    quantity: o.quantity,
    printingRequired: o.printingRequired,
    printingDetails: o.printingDetails,
    deliveryLocation: o.deliveryLocation,
    additionalNotes: o.additionalNotes,
    amount: o.amount,
    date: (o.date || o.createdAt).toISOString().split('T')[0],
  };
}

function mapPrismaOrder(o: any): Order {
  return {
    ...mapBaseCraftData(o),
    status: (o.orderStatus === 'PRODUCTION' ? 'Production' :
      o.orderStatus === 'SHIPPING' ? 'Shipping' : 'Delivered') as OrderStatus,
    fulfill: (o.fulfillmentStatus === 'PENDING' ? 'Pending' :
      o.fulfillmentStatus === 'IN_TRANSIT' ? 'In Transit' : 'Completed') as FulfillmentStatus
  };
}

function mapPrismaQuote(q: any): Quote {
  return {
    ...mapBaseCraftData(q),
    status: (q.quoteStatus === 'PENDING_REVIEW' ? 'Pending Review' :
      q.quoteStatus === 'PENDING' ? 'Pending' :
      q.quoteStatus === 'AWAITING_APPROVAL' ? 'Awaiting Approval' : 'Approved') as QuoteStatus,
  };
}

export async function getQuotes(): Promise<Quote[]> {
  const quotes = await prisma.craft.findMany({
    where: { type: 'QUOTE' },
    orderBy: { createdAt: 'desc' }
  });

  return quotes.map(mapPrismaQuote);
}

export async function getOrders(): Promise<Order[]> {
  const orders = await prisma.craft.findMany({
    where: { type: 'ORDER' },
    orderBy: { date: 'desc' }
  });

  return orders.map(mapPrismaOrder);
}

export async function getActiveOrders(): Promise<Order[]> {
  const orders = await prisma.craft.findMany({
    where: {
      type: 'ORDER',
      NOT: {
        orderStatus: 'DELIVERED'
      }
    },
    orderBy: { date: 'desc' }
  });

  return orders.map(mapPrismaOrder);
}

export async function getTasks(): Promise<Task[]> {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return tasks.map((t: any) => ({
    id: t.id,
    title: t.title,
    status: (t.status === 'TO_DO' ? 'To Do' :
      t.status === 'IN_PROGRESS' ? 'In Progress' :
        t.status === 'REVIEW' ? 'Review' : 'Done') as TaskStatus,
    assignee: t.assignee,
    priority: (t.priority === 'URGENT' ? 'Urgent' :
      t.priority === 'HIGH' ? 'High' :
        t.priority === 'MEDIUM' ? 'Medium' : 'Low') as Priority,
    comments: t.comments
  }));
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<Quote> {
  const prismaStatus = status === 'Pending Review' ? 'PENDING_REVIEW' :
    status === 'Pending' ? 'PENDING' :
    status === 'Awaiting Approval' ? 'AWAITING_APPROVAL' : 'APPROVED';
  const updated = await prisma.craft.update({
    where: { id },
    data: { quoteStatus: prismaStatus as any }
  });

  return mapPrismaQuote(updated);
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const prismaStatus = status === 'Production' ? 'PRODUCTION' :
    status === 'Shipping' ? 'SHIPPING' : 'DELIVERED';
  const updated = await prisma.craft.update({
    where: { id },
    data: { orderStatus: prismaStatus as any }
  });

  return mapPrismaOrder(updated);
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const prismaStatus = status === 'To Do' ? 'TO_DO' :
    status === 'In Progress' ? 'IN_PROGRESS' :
      status === 'Review' ? 'REVIEW' : 'DONE';
  const updated = await prisma.task.update({
    where: { id },
    data: { status: prismaStatus as any }
  });

  return {
    id: updated.id,
    title: updated.title,
    status: (updated.status === 'TO_DO' ? 'To Do' :
      updated.status === 'IN_PROGRESS' ? 'In Progress' :
        updated.status === 'REVIEW' ? 'Review' : 'Done') as TaskStatus,
    assignee: updated.assignee,
    priority: (updated.priority === 'URGENT' ? 'Urgent' :
      updated.priority === 'HIGH' ? 'High' :
        updated.priority === 'MEDIUM' ? 'Medium' : 'Low') as Priority,
    comments: updated.comments
  };
}

export async function createQuote(data: {
  name: string,
  email: string,
  phone: string,
  company?: string,
  bagType: string,
  length: number,
  width: number,
  height: number,
  quantity: number,
  printingRequired: boolean,
  printingDetails?: string,
  deliveryLocation: string,
  additionalNotes?: string
}): Promise<Quote> {
  const customer = data.company || data.name;
  const items = `${data.quantity} ${data.bagType} (${data.length}x${data.width}x${data.height})`;

  const quote = await prisma.craft.create({
    data: {
      ...data,
      type: 'QUOTE',
      customer,
      items,
      quoteStatus: 'PENDING_REVIEW',
      amount: 0
    }
  });

  return mapPrismaQuote(quote);
}

export async function getQuoteById(id: string): Promise<DetailedQuote | null> {
  const q = await prisma.craft.findUnique({
    where: { id }
  });

  if (!q || q.type !== 'QUOTE') return null;

  return {
    ...mapPrismaQuote(q),
    name: q.name || '',
    email: q.email || '',
    phone: q.phone || '',
    company: q.company,
  };
}

export async function createOrderFromQuote(quoteId: string, finalAmount?: string): Promise<Order> {
  const quote = await prisma.craft.findUnique({
    where: { id: quoteId }
  });

  if (!quote || quote.type !== 'QUOTE') {
    throw new Error('Quote not found');
  }

  // Update existing craft object from QUOTE to ORDER
  const updated = await prisma.craft.update({
    where: { id: quoteId },
    data: { 
      type: 'ORDER',
      quoteStatus: 'APPROVED',
      orderStatus: 'PRODUCTION',
      fulfillmentStatus: 'PENDING',
      amount: finalAmount ? parseFloat(finalAmount) : quote.amount 
    }
  });

  return mapPrismaOrder(updated);
}

export async function getOrderById(id: string): Promise<Order | null> {
  const o = await prisma.craft.findUnique({
    where: { id }
  });

  if (!o || o.type !== 'ORDER') return null;

  return mapPrismaOrder(o);
}

export async function updateOrder(id: string, data: Partial<Order>): Promise<Order> {
  const updateData: any = {};
  
  if (data.status) {
    updateData.orderStatus = data.status === 'Production' ? 'PRODUCTION' : data.status === 'Shipping' ? 'SHIPPING' : 'DELIVERED';
  }
  if (data.fulfill) {
    updateData.fulfillmentStatus = data.fulfill === 'Pending' ? 'PENDING' : data.fulfill === 'In Transit' ? 'IN_TRANSIT' : 'COMPLETED';
  }
  
  if (data.customer !== undefined) updateData.customer = data.customer;
  if (data.items !== undefined) updateData.items = data.items;
  if (data.bagType !== undefined) updateData.bagType = data.bagType;
  if (data.length !== undefined) updateData.length = data.length;
  if (data.width !== undefined) updateData.width = data.width;
  if (data.height !== undefined) updateData.height = data.height;
  if (data.quantity !== undefined) updateData.quantity = data.quantity;
  if (data.printingRequired !== undefined) updateData.printingRequired = data.printingRequired;
  if (data.printingDetails !== undefined) updateData.printingDetails = data.printingDetails;
  if (data.deliveryLocation !== undefined) updateData.deliveryLocation = data.deliveryLocation;
  if (data.additionalNotes !== undefined) updateData.additionalNotes = data.additionalNotes;
  if (data.amount !== undefined) updateData.amount = typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount;

  const updated = await prisma.craft.update({
    where: { id },
    data: updateData
  });

  return mapPrismaOrder(updated);
}
