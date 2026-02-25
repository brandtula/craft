import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const values = [
  {
    title: "Quality First",
    description: "We never compromise on quality. Every bag is manufactured to the highest standards using premium materials and rigorous quality control processes.",
  },
  {
    title: "Sustainability",
    description: "We're committed to environmental responsibility. Our eco-friendly processes and materials help reduce your carbon footprint while maintaining exceptional quality.",
  },
  {
    title: "Customer Focus",
    description: "Your success is our success. We work closely with each client to understand their needs and deliver solutions that exceed expectations.",
  },
  {
    title: "Innovation",
    description: "We continuously invest in new technologies and techniques to improve our products and processes, ensuring we stay ahead of industry standards.",
  },
];

const stats = [
  { label: "Years of Experience", value: "15+" },
  { label: "Happy Customers", value: "500+" },
  { label: "Bags Manufactured", value: "10M+" },
  { label: "Countries Served", value: "25+" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 py-16 dark:from-zinc-950 dark:to-zinc-900 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                About Craft Bags
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Your trusted partner in premium paper bag manufacturing
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                    Our Story
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    Founded with a vision to provide businesses with high-quality, sustainable paper bag solutions, 
                    Craft Bags has grown from a small local manufacturer to a trusted partner for businesses worldwide.
                  </p>
                  <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    Our commitment to excellence, combined with our passion for sustainability, has made us a 
                    preferred choice for retailers, restaurants, and brands that value quality and environmental responsibility.
                  </p>
                  <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    Today, we continue to innovate and expand our capabilities while maintaining the personal 
                    service and attention to detail that sets us apart.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                    Our Mission
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    To deliver exceptional paper bag solutions that help businesses succeed while minimizing 
                    environmental impact. We believe that quality and sustainability go hand in hand.
                  </p>
                  <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    Every bag we manufacture is a reflection of our values: quality craftsmanship, 
                    environmental responsibility, and unwavering commitment to customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-zinc-900 py-16 dark:bg-zinc-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-8 lg:max-w-none lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-white dark:text-zinc-900 sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-zinc-300 dark:text-zinc-700">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                Our Values
              </h2>
              <p className="mt-2 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                The principles that guide everything we do
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                {values.map((value, index) => (
                  <div key={index} className="flex flex-col">
                    <dt className="text-base font-semibold leading-7 text-zinc-900 dark:text-zinc-100">
                      {value.title}
                    </dt>
                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                      <p className="flex-auto">{value.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                Let's Work Together
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Ready to experience the Craft Bags difference? Get in touch with us today.
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
