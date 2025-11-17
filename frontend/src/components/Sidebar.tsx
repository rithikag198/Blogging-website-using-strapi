import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="space-y-8">
      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
        <div className="space-y-2">
          <Link
            href="/"
            className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            About
          </Link>
          <Link
            href="/categories"
            className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            All Categories
          </Link>
          <Link
            href="/tags"
            className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            All Tags
          </Link>
        </div>
      </div>
    </div>
  );
}
