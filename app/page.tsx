import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import EagleAnimation from "./components/EagleAnimation";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <EagleAnimation />
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 py-24 dark:from-zinc-950 dark:to-zinc-900 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
                Premium Paper Bags
                <span className="block text-zinc-600 dark:text-zinc-400">Manufactured with Care</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                We craft high-quality, eco-friendly paper bags that elevate your brand. 
                From retail to food service, we deliver custom solutions that meet your exact specifications.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/quote"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/products"
                  className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-100"
                >
                  View Products <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                Why Choose Craft Bags?
              </h2>
              <p className="mt-2 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Quality, sustainability, and service you can count on
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-zinc-900 dark:text-zinc-100">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100">
                      <svg className="h-6 w-6 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Premium Quality
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <p className="flex-auto">
                      Durable construction and attention to detail in every bag we manufacture. 
                      Built to last and impress your customers.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-zinc-900 dark:text-zinc-100">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100">
                      <svg className="h-6 w-6 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Eco-Friendly
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <p className="flex-auto">
                      Sustainable materials and processes that reduce environmental impact 
                      while maintaining the highest quality standards.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-zinc-900 dark:text-zinc-100">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100">
                      <svg className="h-6 w-6 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    Custom Solutions
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <p className="flex-auto">
                      Tailored to your brand with custom sizes, printing, and finishes. 
                      We work with you to create the perfect bag for your business.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-zinc-900 py-16 dark:bg-zinc-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white dark:text-zinc-900 sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-300 dark:text-zinc-700">
                Request a free quote today and discover how we can help elevate your brand with premium paper bags.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/quote"
                  className="rounded-full bg-white px-6 py-3 text-base font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-semibold leading-6 text-white dark:text-zinc-900"
                >
                  Contact Us <span aria-hidden="true">→</span>
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
