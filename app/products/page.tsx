import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const products = [
  {
    name: "Retail Paper Bags",
    description: "Perfect for clothing stores, boutiques, and retail shops. Available in various sizes with optional handles.",
    features: ["Multiple sizes", "Reinforced handles", "Custom printing", "Eco-friendly materials"],
  },
  {
    name: "Food Service Bags",
    description: "Food-safe paper bags ideal for restaurants, cafes, and takeout services. Grease-resistant options available.",
    features: ["Food-safe certified", "Grease-resistant", "Multiple sizes", "Quick turnaround"],
  },
  {
    name: "Gift Bags",
    description: "Elegant gift bags with premium finishes. Perfect for special occasions and premium brands.",
    features: ["Premium finishes", "Custom designs", "Various sizes", "Luxury feel"],
  },
  {
    name: "Shopping Bags",
    description: "Durable shopping bags with reinforced bottoms. Built to carry heavy items safely.",
    features: ["Reinforced bottom", "Strong handles", "High capacity", "Custom branding"],
  },
  {
    name: "Eco-Friendly Bags",
    description: "100% recycled and biodegradable options for environmentally conscious businesses.",
    features: ["100% recycled", "Biodegradable", "FSC certified", "Carbon neutral"],
  },
  {
    name: "Custom Printed Bags",
    description: "Full-color printing and custom branding to make your bags stand out and reinforce your brand identity.",
    features: ["Full-color printing", "Custom logos", "Brand colors", "Flexible designs"],
  },
];

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 py-16 dark:from-zinc-950 dark:to-zinc-900 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                Our Products
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Explore our comprehensive range of paper bag solutions designed for every business need.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      {product.name}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                      {product.description}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-zinc-600 dark:text-zinc-400">
                          <svg className="mr-2 h-5 w-5 flex-shrink-0 text-zinc-900 dark:text-zinc-100" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-zinc-200 bg-zinc-50 px-8 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <Link
                      href="/quote"
                      className="text-sm font-semibold text-zinc-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
                    >
                      Get a Quote <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                Need Something Custom?
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                We specialize in creating custom solutions tailored to your specific requirements. 
                Contact us to discuss your unique needs.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/quote"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-100"
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
