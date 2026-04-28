"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import * as opsService from '@/lib/services/ops-service';
import { Order, OrderStatus, FulfillmentStatus } from '@/lib/types';

export default function OrderDetailView() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit state
  const [editData, setEditData] = useState<Partial<Order>>({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await opsService.getOrderById(orderId);
        setOrder(data);
        if (data) {
          setEditData(data);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handleFulfillOrder = async () => {
    setIsProcessing(true);
    try {
      const updatedOrder = await opsService.updateOrder(orderId, { fulfill: 'Completed' });
      setOrder(updatedOrder);
    } catch (error) {
      console.error('Error fulfilling order:', error);
      alert('Failed to fulfill order.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateOrder = async () => {
    setIsProcessing(true);
    try {
      const updatedOrder = await opsService.updateOrder(orderId, editData);
      setOrder(updatedOrder);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: keyof Order, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
        <Link href="/ops" className="text-blue-600 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  const isLocked = order.fulfill === 'Completed';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/ops" className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Order #{order.id}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
              order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
              order.status === 'Production' ? 'bg-purple-50 text-purple-700 border-purple-200' :
              'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              {order.status}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
              order.fulfill === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
              order.fulfill === 'In Transit' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              'bg-yellow-50 text-yellow-700 border-yellow-200'
            }`}>
              {order.fulfill}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-800">Order Configuration</h2>
                {!isLocked && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg transition-colors font-medium border border-blue-100"
                  >
                    Edit Details
                  </button>
                )}
                {isLocked && (
                  <span className="text-sm text-green-600 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Locked
                  </span>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Customer / Company</label>
                      <input
                        type="text"
                        value={editData.customer || ''}
                        onChange={e => handleInputChange('customer', e.target.value)}
                        className="w-full border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Bag Type</label>
                      <input
                        type="text"
                        value={editData.bagType || ''}
                        onChange={e => handleInputChange('bagType', e.target.value)}
                        className="w-full border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Quantity</label>
                      <input
                        type="number"
                        value={editData.quantity || 0}
                        onChange={e => handleInputChange('quantity', parseInt(e.target.value))}
                        className="w-full border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Length</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editData.length || 0}
                        onChange={e => handleInputChange('length', parseFloat(e.target.value))}
                        className="w-full border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Width</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editData.width || 0}
                        onChange={e => handleInputChange('width', parseFloat(e.target.value))}
                        className="w-full border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Height</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editData.height || 0}
                        onChange={e => handleInputChange('height', parseFloat(e.target.value))}
                        className="w-full border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order Total ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editData.amount || 0}
                        onChange={e => handleInputChange('amount', parseFloat(e.target.value))}
                        className="w-full border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none border transition-all font-bold text-blue-600"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editData.printingRequired || false}
                          onChange={e => handleInputChange('printingRequired', e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Printing Required</span>
                      </label>
                    </div>
                    {editData.printingRequired && (
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Printing Details</label>
                        <textarea
                          value={editData.printingDetails || ''}
                          onChange={e => handleInputChange('printingDetails', e.target.value)}
                          className="w-full border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                          rows={2}
                        />
                      </div>
                    )}
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Internal Notes</label>
                      <textarea
                        value={editData.additionalNotes || ''}
                        onChange={e => handleInputChange('additionalNotes', e.target.value)}
                        className="w-full border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none border transition-all"
                        rows={3}
                        placeholder="Add internal notes about this order..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditData(order);
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateOrder}
                      disabled={isProcessing}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-all disabled:opacity-50"
                    >
                      {isProcessing ? 'Saving...' : 'Save Order'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 text-sm">
                    <div>
                      <p className="text-gray-400 font-medium uppercase text-[10px] tracking-widest mb-1">Bag Type</p>
                      <p className="text-gray-900 font-semibold text-base">{order.bagType}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium uppercase text-[10px] tracking-widest mb-1">Quantity</p>
                      <p className="text-gray-900 font-semibold text-base">{order.quantity.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium uppercase text-[10px] tracking-widest mb-1">Order Total</p>
                      <p className="text-blue-600 font-bold text-xl">${order.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium uppercase text-[10px] tracking-widest mb-1">Length</p>
                      <p className="text-gray-900 font-semibold text-base">{order.length}"</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium uppercase text-[10px] tracking-widest mb-1">Width</p>
                      <p className="text-gray-900 font-semibold text-base">{order.width}"</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium uppercase text-[10px] tracking-widest mb-1">Height</p>
                      <p className="text-gray-900 font-semibold text-base">{order.height}"</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium uppercase text-[10px] tracking-widest mb-1">Printing</p>
                      <p className="text-gray-900 font-semibold text-base">
                        {order.printingRequired ? (
                          <span className="text-purple-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Required
                          </span>
                        ) : 'Not Required'}
                      </p>
                    </div>
                  </div>

                  {order.printingRequired && order.printingDetails && (
                    <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
                      <p className="text-purple-700 font-bold text-[10px] uppercase tracking-widest mb-1">Printing Specs</p>
                      <p className="text-purple-900 text-sm italic">"{order.printingDetails}"</p>
                    </div>
                  )}

                  {order.additionalNotes && (
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                      <p className="text-amber-700 font-bold text-[10px] uppercase tracking-widest mb-1">Internal Notes</p>
                      <p className="text-amber-900 text-sm">{order.additionalNotes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Status Area */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Status Control</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Order Progress</label>
                  <select
                    disabled={isLocked}
                    value={isEditing ? editData.status : order.status}
                    onChange={e => isEditing ? handleInputChange('status', e.target.value) : opsService.updateOrder(order.id, { status: e.target.value as OrderStatus }).then(setOrder)}
                    className="w-full border-gray-200 rounded-xl px-4 py-2.5 outline-none border bg-gray-50 focus:bg-white transition-all text-sm font-medium disabled:opacity-50"
                  >
                    <option value="Production">Production</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {!isLocked && (
                  <button
                    onClick={handleFulfillOrder}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Mark Fulfilled</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Logistics</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Customer</p>
                  <p className="text-sm font-medium">{order.customer}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Destination</p>
                  <p className="text-sm font-medium">{order.deliveryLocation}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Created Date</p>
                  <p className="text-sm font-medium">{order.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
