import { useState, useEffect } from 'react';
import Head from 'next/head';
import ContentCard from '../components/ContentCard';
import { moviesAPI } from '../services/api';

/**
 * Movies Page
 * Displays movie categories and grid
 */
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('trending');
  const [loading, setLoading] = useState(true);

  // Fetch movies based on selected category
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        let response;
        switch (category) {
          case 'popular':
            response = await moviesAPI.getPopular();
            break;
          case 'top-rated':
            response = await moviesAPI.getTopRated();
            break;
          default:
            response = await moviesAPI.getTrending();
        }

        setMovies(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <>
      <Head>
        <title>Movies - StreamFinder</title>
        <meta name="description" content="Discover popular and trending movies" />
      </Head>

      <div className="min-h-screen py-8 px-4 md:px-8">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Movies</h1>

          {/* Category Filter */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setCategory('trending')}
              className={`px-6 py-2 rounded-md transition ${
                category === 'trending'
                  ? 'bg-primary text-white'
                  : 'bg-dark-gray text-light-gray hover:bg-medium-gray'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setCategory('popular')}
              className={`px-6 py-2 rounded-md transition ${
                category === 'popular'
                  ? 'bg-primary text-white'
                  : 'bg-dark-gray text-light-gray hover:bg-medium-gray'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setCategory('top-rated')}
              className={`px-6 py-2 rounded-md transition ${
                category === 'top-rated'
                  ? 'bg-primary text-white'
                  : 'bg-dark-gray text-light-gray hover:bg-medium-gray'
              }`}
            >
              Top Rated
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
            </div>
          ) : (
            /* Movies Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <ContentCard key={movie.id} item={movie} type="movie" />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && movies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-light-gray text-lg">No movies found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
