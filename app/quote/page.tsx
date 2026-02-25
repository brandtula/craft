"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const bagTypes = [
  "Retail Paper Bags",
  "Food Service Bags",
  "Gift Bags",
  "Shopping Bags",
  "Eco-Friendly Bags",
  "Custom Printed Bags",
  "Other",
];

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    bagType: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    quantity: "",
    printingRequired: false,
    printingDetails: "",
    deliveryLocation: "",
    additionalNotes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend/API
    console.log("Quote request submitted:", formData);
    setSubmitted(true);
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        bagType: "",
        dimensions: { length: "", width: "", height: "" },
        quantity: "",
        printingRequired: false,
        printingDetails: "",
        deliveryLocation: "",
        additionalNotes: "",
      });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name.startsWith("dimensions.")) {
      const dimensionField = name.split(".")[1];
      setFormData({
        ...formData,
        dimensions: {
          ...formData.dimensions,
          [dimensionField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 py-16 dark:from-zinc-950 dark:to-zinc-900 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                Request a Quote
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Fill out the form below and we'll provide you with a detailed quote for your paper bag needs. 
                Our team typically responds within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Contact Information
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Full Name *
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Email Address *
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Phone Number *
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Company Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Product Details
                </h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="bagType" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Bag Type *
                    </label>
                    <div className="mt-2.5">
                      <select
                        name="bagType"
                        id="bagType"
                        required
                        value={formData.bagType}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select a bag type</option>
                        {bagTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Dimensions (in inches) *
                    </label>
                    <div className="mt-2.5 grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="dimensions.length" className="block text-xs text-zinc-600 dark:text-zinc-400">
                          Length
                        </label>
                        <input
                          type="number"
                          name="dimensions.length"
                          id="dimensions.length"
                          required
                          step="0.1"
                          min="0"
                          value={formData.dimensions.length}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                          placeholder="L"
                        />
                      </div>
                      <div>
                        <label htmlFor="dimensions.width" className="block text-xs text-zinc-600 dark:text-zinc-400">
                          Width
                        </label>
                        <input
                          type="number"
                          name="dimensions.width"
                          id="dimensions.width"
                          required
                          step="0.1"
                          min="0"
                          value={formData.dimensions.width}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                          placeholder="W"
                        />
                      </div>
                      <div>
                        <label htmlFor="dimensions.height" className="block text-xs text-zinc-600 dark:text-zinc-400">
                          Height
                        </label>
                        <input
                          type="number"
                          name="dimensions.height"
                          id="dimensions.height"
                          required
                          step="0.1"
                          min="0"
                          value={formData.dimensions.height}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                          placeholder="H"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Quantity *
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        required
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="e.g., 1000, 5000, 10000"
                      />
                    </div>
                    <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                      Please enter the approximate quantity you need
                    </p>
                  </div>
                </div>
              </div>

              {/* Printing & Delivery */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Printing & Delivery
                </h2>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="printingRequired"
                        name="printingRequired"
                        type="checkbox"
                        checked={formData.printingRequired}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:focus:ring-zinc-100"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="printingRequired" className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Printing Required
                      </label>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Check this box if you need custom printing on your bags
                      </p>
                    </div>
                  </div>

                  {formData.printingRequired && (
                    <div>
                      <label htmlFor="printingDetails" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                        Printing Details
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          name="printingDetails"
                          id="printingDetails"
                          rows={3}
                          value={formData.printingDetails}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                          placeholder="Describe your printing requirements (logos, colors, text, etc.)"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="deliveryLocation" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Delivery Location *
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="deliveryLocation"
                        id="deliveryLocation"
                        required
                        value={formData.deliveryLocation}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="additionalNotes" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Additional Notes
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        name="additionalNotes"
                        id="additionalNotes"
                        rows={4}
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="Any other requirements or questions..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-x-6">
                <Link
                  href="/products"
                  className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100"
                >
                  View Products
                </Link>
                <button
                  type="submit"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {submitted ? "Quote Requested!" : "Submit Quote Request"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
