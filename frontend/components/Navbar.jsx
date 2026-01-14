import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

/**
 * Navbar Component
 * Main navigation bar with logo, menu items, and search
 */
export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-secondary shadow-lg' : 'bg-gradient-to-b from-black to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-primary text-3xl font-bold">STREAM</span>
              <span className="text-white text-3xl font-bold">FINDER</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-white hover:text-light-gray transition ${
                router.pathname === '/' ? 'font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className={`text-white hover:text-light-gray transition ${
                router.pathname === '/movies' ? 'font-semibold' : ''
              }`}
            >
              Movies
            </Link>
            <Link
              href="/tv"
              className={`text-white hover:text-light-gray transition ${
                router.pathname === '/tv' ? 'font-semibold' : ''
              }`}
            >
              TV Shows
            </Link>
            <Link
              href="/anime"
              className={`text-white hover:text-light-gray transition ${
                router.pathname === '/anime' ? 'font-semibold' : ''
              }`}
            >
              Anime
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-dark-gray text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-48 md:w-64"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-light-gray hover:text-white"
              >
                🔍
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-secondary border-t border-medium-gray">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-white text-sm hover:text-primary">
            Home
          </Link>
          <Link href="/movies" className="text-white text-sm hover:text-primary">
            Movies
          </Link>
          <Link href="/tv" className="text-white text-sm hover:text-primary">
            TV
          </Link>
          <Link href="/anime" className="text-white text-sm hover:text-primary">
            Anime
          </Link>
        </div>
      </div>
    </nav>
  );
}
