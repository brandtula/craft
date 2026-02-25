"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend/API
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                Contact Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 lg:max-w-none lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Phone
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Company
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                      Message
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
                        placeholder="Tell us about your needs..."
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="block w-full rounded-md bg-zinc-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      {submitted ? "Message Sent!" : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Get in touch
                </h2>
                <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  We're here to help! Reach out to us through any of the following channels, 
                  and our team will get back to you promptly.
                </p>
                <dl className="mt-10 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <svg className="h-7 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                      </svg>
                    </dt>
                    <dd>
                      123 Manufacturing Street<br />
                      Industrial District, City 12345<br />
                      Country
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <svg className="h-7 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </dt>
                    <dd>
                      <a className="hover:text-zinc-900 dark:hover:text-zinc-100" href="tel:+15551234567">
                        (555) 123-4567
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <svg className="h-7 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </dt>
                    <dd>
                      <a className="hover:text-zinc-900 dark:hover:text-zinc-100" href="mailto:info@craftbags.com">
                        info@craftbags.com
                      </a>
                    </dd>
                  </div>
                </dl>
                <div className="mt-10">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Business Hours</h3>
                  <dl className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex justify-between">
                      <dt>Monday - Friday</dt>
                      <dd>9:00 AM - 5:00 PM</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Saturday</dt>
                      <dd>10:00 AM - 2:00 PM</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Sunday</dt>
                      <dd>Closed</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                Ready for a Quote?
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Get a detailed quote for your paper bag needs in minutes.
              </p>
              <div className="mt-10">
                <Link
                  href="/quote"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
