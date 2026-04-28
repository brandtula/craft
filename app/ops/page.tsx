"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as opsService from '@/lib/services/ops-service';
import { Quote, Order, Task } from '@/lib/types';

// --- ICONS ---
const IconInbox = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
);
const IconClipboardList = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const IconKanban = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
  </svg>
);

export default function OpsDashboard() {
  const [activeTab, setActiveTab] = useState('quotes');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'quotes') {
          const data = await opsService.getQuotes();
          setQuotes(data);
        } else if (activeTab === 'orders') {
          const data = await opsService.getOrders();
          setOrders(data);
        } else if (activeTab === 'tasks') {
          const data = await opsService.getTasks();
          setTasks(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);



  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-10 transition-all">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            CRAFT OPS
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Internal System</p>
        </div>

        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <button
                onClick={() => setActiveTab('quotes')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'quotes' ? 'bg-blue-600 shadow-lg shadow-blue-500/30' : 'hover:bg-slate-800 text-slate-300'}`}
              >
                <IconInbox />
                <span className="font-medium">Quote Inbox</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'orders' ? 'bg-blue-600 shadow-lg shadow-blue-500/30' : 'hover:bg-slate-800 text-slate-300'}`}
              >
                <IconClipboardList />
                <span className="font-medium">Order Inbox</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'tasks' ? 'bg-blue-600 shadow-lg shadow-blue-500/30' : 'hover:bg-slate-800 text-slate-300'}`}
              >
                <IconKanban />
                <span className="font-medium">Task Board</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold shadow-md">
              A
            </div>
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-slate-400">Ops Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-0">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize tracking-tight">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors border border-blue-200 shadow-sm">
              + New Item
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-8 relative">

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* QUOTES VIEW */}
              {activeTab === 'quotes' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Pending</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{quotes.filter(q => q.status === 'Pending Review').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Needs Action</p>
                      <p className="text-3xl font-bold text-orange-600 mt-2">{quotes.filter(q => q.status === 'Awaiting Approval').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Approved Today</p>
                      <p className="text-3xl font-bold text-green-600 mt-2">{quotes.filter(q => q.status === 'Approved').length}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-sm">
                          <th className="py-4 px-6 font-medium">Quote ID</th>
                          <th className="py-4 px-6 font-medium">Customer</th>
                          <th className="py-4 px-6 font-medium">Items</th>
                          <th className="py-4 px-6 font-medium">Amount</th>
                          <th className="py-4 px-6 font-medium">Status</th>
                          <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {quotes.map((quote) => (
                          <tr key={quote.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="py-4 px-6 font-medium text-gray-900">{quote.id}</td>
                            <td className="py-4 px-6 text-gray-600">{quote.customer}</td>
                            <td className="py-4 px-6 text-gray-600">{quote.items}</td>
                            <td className="py-4 px-6 text-gray-900 font-medium">${quote.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${quote.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                  quote.status === 'Awaiting Approval' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                    'bg-blue-50 text-blue-700 border-blue-200'
                                }`}>
                                {quote.status}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <Link
                                href={`/ops/quotes/${quote.id}`}
                                className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                              >
                                Review
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ORDERS VIEW */}
              {activeTab === 'orders' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-sm">
                          <th className="py-4 px-6 font-medium">Order ID</th>
                          <th className="py-4 px-6 font-medium">Customer</th>
                          <th className="py-4 px-6 font-medium">Items</th>
                          <th className="py-4 px-6 font-medium">Date</th>
                          <th className="py-4 px-6 font-medium">Status</th>
                          <th className="py-4 px-6 font-medium">Fulfillment</th>
                          <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                            <td className="py-4 px-6 text-gray-600">{order.customer}</td>
                            <td className="py-4 px-6 text-gray-600">{order.items}</td>
                            <td className="py-4 px-6 text-gray-500 text-sm">{order.date}</td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                                  order.status === 'Production' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                    'bg-blue-50 text-blue-700 border-blue-200'
                                }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${order.fulfill === 'Completed' ? 'bg-green-500' :
                                    order.fulfill === 'In Transit' ? 'bg-blue-500' : 'bg-yellow-500'
                                  }`}></div>
                                <span className="text-sm text-gray-700">{order.fulfill}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right space-x-2">
                              <Link
                                href={`/ops/orders/${order.id}`}
                                className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TASKS KANBAN VIEW */}
              {activeTab === 'tasks' && (
                <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex space-x-6 overflow-x-auto pb-4 h-full">
                    {['To Do', 'In Progress', 'Review', 'Done'].map((statusColumn) => (
                      <div key={statusColumn} className="w-80 flex-shrink-0 flex flex-col bg-gray-100/50 rounded-2xl p-4 border border-gray-200/60">
                        <div className="flex items-center justify-between mb-4 px-2">
                          <h3 className="font-semibold text-gray-700">{statusColumn}</h3>
                          <span className="bg-gray-200 text-gray-600 text-xs py-1 px-2.5 rounded-full font-medium">
                            {tasks.filter(t => t.status === statusColumn).length}
                          </span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                          {tasks.filter(t => t.status === statusColumn).map((task) => (
                            <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
                              <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${task.priority === 'Urgent' ? 'bg-red-50 text-red-700 border-red-200' :
                                    task.priority === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                      task.priority === 'Medium' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                        'bg-gray-50 text-gray-700 border-gray-200'
                                  }`}>
                                  {task.priority}
                                </span>
                                <span className="text-xs text-gray-400 font-mono">{task.id}</span>
                              </div>
                              <h4 className="text-gray-900 font-medium text-sm mb-4 leading-relaxed group-hover:text-blue-600 transition-colors">
                                {task.title}
                              </h4>

                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600 border border-white shadow-sm">
                                    {task.assignee.charAt(0)}
                                  </div>
                                  <span className="text-xs text-gray-500 font-medium">{task.assignee}</span>
                                </div>

                                <div className="flex items-center text-gray-400 space-x-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                  <span className="text-xs font-medium">{task.comments}</span>
                                </div>
                              </div>
                            </div>
                          ))}

                          <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium text-sm hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2">
                            <span>+ Add Task</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </div>
  );
}
