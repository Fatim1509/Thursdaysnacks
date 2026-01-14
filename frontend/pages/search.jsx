import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SearchBar from '../components/SearchBar';
import ContentCard from '../components/ContentCard';
import { searchAll } from '../services/api';

/**
 * Search Page
 * Displays search results across all content types
 */
export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Perform search when query changes
  useEffect(() => {
    if (q && q.trim()) {
      performSearch(q);
    }
  }, [q]);

  const performSearch = async (query) => {
    try {
      setLoading(true);
      setSearchPerformed(true);

      const results = await searchAll(query);

      setMovies(results.movies || []);
      setTVShows(results.tv || []);
      setAnime(results.anime || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalResults = movies.length + tvShows.length + anime.length;

  return (
    <>
      <Head>
        <title>{q ? `Search: ${q}` : 'Search'} - StreamFinder</title>
        <meta name="description" content="Search for movies, TV shows, and anime" />
      </Head>

      <div className="min-h-screen py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">Search</h1>
            <SearchBar initialQuery={q || ''} />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
            </div>
          )}

          {/* Search Results */}
          {!loading && searchPerformed && (
            <>
              {/* Results Summary */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white">
                  {totalResults > 0
                    ? `Found ${totalResults} results for "${q}"`
                    : `No results found for "${q}"`}
                </h2>
              </div>

              {/* Movies Results */}
              {movies.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Movies ({movies.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                      <ContentCard key={movie.id} item={movie} type="movie" />
                    ))}
                  </div>
                </div>
              )}

              {/* TV Shows Results */}
              {tvShows.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-white mb-4">
                    TV Shows ({tvShows.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {tvShows.map((tv) => (
                      <ContentCard key={tv.id} item={tv} type="tv" />
                    ))}
                  </div>
                </div>
              )}

              {/* Anime Results */}
              {anime.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Anime ({anime.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {anime.map((item) => (
                      <ContentCard key={item.id} item={item} type="anime" />
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Message */}
              {totalResults === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-light-gray text-lg mb-4">
                    No results found. Try a different search term.
                  </p>
                  <p className="text-light-gray text-sm">
                    Try searching for movie titles, TV shows, or anime names
                  </p>
                </div>
              )}
            </>
          )}

          {/* Initial State (No Search Yet) */}
          {!loading && !searchPerformed && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-light-gray text-lg">
                Enter a search term to find movies, TV shows, or anime
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
