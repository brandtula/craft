"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import * as opsService from '@/lib/services/ops-service';
import { DetailedQuote } from '@/lib/types';

export default function QuoteDetailView() {
  const params = useParams();
  const router = useRouter();
  const quoteId = params.id as string;
  
  const [quote, setQuote] = useState<DetailedQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [finalAmount, setFinalAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await opsService.getQuoteById(quoteId);
        setQuote(data);
        if (data) {
          setFinalAmount(data.amount.toString());
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      } finally {
        setLoading(false);
      }
    };
    if (quoteId) {
      fetchQuote();
    }
  }, [quoteId]);

  const handleCreateOrder = async () => {
    if (!finalAmount) {
      alert('Please enter a final amount before creating an order.');
      return;
    }
    
    setIsProcessing(true);
    try {
      await opsService.createOrderFromQuote(quoteId, finalAmount);
      alert('Order created successfully!');
      router.push('/ops');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSellerContacted = async () => {
    setIsProcessing(true);
    try {
      await opsService.updateQuoteStatus(quoteId, 'Awaiting Approval');
      setQuote(prev => prev ? { ...prev, status: 'Awaiting Approval' } : null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quote Not Found</h2>
        <Link href="/ops" className="text-blue-600 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-800">Review Quote</h1>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
            quote.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
            quote.status === 'Awaiting Approval' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
            'bg-blue-50 text-blue-700 border-blue-200'
          }`}>
            {quote.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Customer Details */}
          <div className="col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Customer Info</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 font-medium">Name</p>
                  <p className="text-gray-900">{quote.name}</p>
                </div>
                {quote.company && (
                  <div>
                    <p className="text-gray-500 font-medium">Company</p>
                    <p className="text-gray-900">{quote.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500 font-medium">Email</p>
                  <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">{quote.email}</a>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Phone</p>
                  <a href={`tel:${quote.phone}`} className="text-blue-600 hover:underline">{quote.phone}</a>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Delivery Location</p>
                  <p className="text-gray-900">{quote.deliveryLocation}</p>
                </div>
              </div>
              <div className="mt-6">
                <a href={`mailto:${quote.email}?subject=Regarding Your Quote ${quote.id}`} 
                   className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact Customer</span>
                </a>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Request Details</h2>
              
              <div className="grid grid-cols-2 gap-6 text-sm mb-6">
                <div>
                  <p className="text-gray-500 font-medium">Bag Type</p>
                  <p className="text-gray-900 font-medium">{quote.bagType}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Quantity</p>
                  <p className="text-gray-900 font-medium">{quote.quantity.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs">Length</p>
                  <p className="text-gray-900 font-medium">{quote.length}"</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs">Width</p>
                  <p className="text-gray-900 font-medium">{quote.width}"</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs">Height</p>
                  <p className="text-gray-900 font-medium">{quote.height}"</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Printing Required</p>
                  <p className="text-gray-900">
                    {quote.printingRequired ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">Yes</span>
                    ) : 'No'}
                  </p>
                </div>
              </div>

              {quote.printingRequired && quote.printingDetails && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-1">Printing Details</p>
                  <p className="text-slate-800 text-sm">{quote.printingDetails}</p>
                </div>
              )}

              {quote.additionalNotes && (
                <div className="p-4 bg-yellow-50/50 rounded-xl border border-yellow-100/50">
                  <p className="text-yellow-800/60 font-medium text-xs uppercase tracking-wider mb-1">Additional Notes</p>
                  <p className="text-yellow-900 text-sm">{quote.additionalNotes}</p>
                </div>
              )}
            </div>

            {/* Pricing & Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm border border-blue-100">
              <h2 className="text-lg font-semibold mb-4 text-blue-900 border-b border-blue-200 pb-2">Pricing & Fulfillment</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="finalAmount" className="block text-sm font-medium text-blue-900 mb-1">Calculated Cost ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      id="finalAmount"
                      className="block w-full pl-7 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-lg font-medium text-gray-900 shadow-sm"
                      placeholder="0.00"
                      value={finalAmount}
                      onChange={(e) => setFinalAmount(e.target.value)}
                    />
                  </div>
                  <p className="mt-2 text-xs text-blue-700">Set the final amount to be sent to the customer.</p>
                </div>
                
                <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSellerContacted}
                    disabled={isProcessing || quote.status === 'Awaiting Approval' || quote.status === 'Approved'}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 disabled:opacity-50 text-gray-700 px-4 py-3 rounded-xl font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <span>Seller Contacted</span>
                  </button>
                  <button
                    onClick={handleCreateOrder}
                    disabled={isProcessing}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isProcessing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <span>Approve & Create Order</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
