import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="relative flex flex-col items-start justify-center">
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Craft Bag USA
            </span>
            {/* The landing spot for the eagle animation */}
            <div id="eagle-landing-spot" className="absolute -bottom-10 left-4 h-10 w-10"></div>
          </Link>
          <div className="hidden space-x-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Contact
            </Link>
            <Link
              href="/quote"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Request Quote
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-zinc-600 dark:text-zinc-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
