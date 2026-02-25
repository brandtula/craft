import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Craft Bags
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Premium paper bag manufacturing for businesses that care about quality and sustainability.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quote" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                  Request a Quote
                </Link>
              </li>
              <li className="text-zinc-600 dark:text-zinc-400">
                Custom Printing
              </li>
              <li className="text-zinc-600 dark:text-zinc-400">
                Bulk Orders
              </li>
              <li className="text-zinc-600 dark:text-zinc-400">
                Eco-Friendly Options
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Email: info@craftbags.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Fri 9AM-5PM</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-8 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <p>&copy; {new Date().getFullYear()} Craft Bags. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
