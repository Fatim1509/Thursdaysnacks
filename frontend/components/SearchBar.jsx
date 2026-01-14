/**
 * SearchBar Component
 * Standalone search bar component for search page
 */
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies, TV shows, or anime..."
          className="w-full px-6 py-4 bg-dark-gray text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
