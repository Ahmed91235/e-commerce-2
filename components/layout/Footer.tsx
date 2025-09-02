import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">ECommerce</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted online shopping destination. Quality products, fast delivery, 
              and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              {/* Social media links */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/electronics" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/fashion" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/home-garden" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/categories/sports" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-gray-700 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay in the loop</h3>
              <p className="text-gray-300 text-sm">
                Subscribe to receive exclusive deals, new product announcements, and style inspiration.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} ECommerce. All rights reserved.
            </div>
            
            {/* Trust signals */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Money Back Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <svg className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}