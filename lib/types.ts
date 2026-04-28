export type QuoteStatus = 'Pending Review' | 'Pending' | 'Awaiting Approval' | 'Approved';
export type OrderStatus = 'Production' | 'Shipping' | 'Delivered';
export type FulfillmentStatus = 'Pending' | 'In Transit' | 'Completed';
export type TaskStatus = 'To Do' | 'In Progress' | 'Review' | 'Done';
export type Priority = 'Urgent' | 'High' | 'Medium' | 'Low';

export interface BaseCraftData {
  id: string;
  customer: string;
  items: string;
  bagType: string;
  length: number;
  width: number;
  height: number;
  quantity: number;
  printingRequired: boolean;
  printingDetails?: string | null;
  deliveryLocation: string;
  additionalNotes?: string | null;
  amount: number;
  date: string;
}

export interface Quote extends BaseCraftData {
  status: QuoteStatus;
}

export interface DetailedQuote extends Quote {
  name: string;
  email: string;
  phone: string;
  company?: string | null;
}

export interface Order extends BaseCraftData {
  status: OrderStatus;
  fulfill: FulfillmentStatus;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: string;
  priority: Priority;
  comments: number;
}
