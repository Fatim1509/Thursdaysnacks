import { useState, useEffect } from 'react';
import Head from 'next/head';
import ContentRow from '../components/ContentRow';
import { moviesAPI, tvAPI, animeAPI } from '../services/api';

/**
 * Home Page
 * Displays trending content from all categories
 */
export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all trending content
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [moviesRes, tvRes, animeRes] = await Promise.all([
          moviesAPI.getTrending(),
          tvAPI.getTrending(),
          animeAPI.getTrending(),
        ]);

        setTrendingMovies(moviesRes.data.data || []);
        setTrendingTV(tvRes.data.data || []);
        setTrendingAnime(animeRes.data.data || []);
      } catch (error) {
        console.error('Failed to fetch trending content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>StreamFinder - Discover Entertainment</title>
        <meta name="description" content="Discover trending movies, TV shows, and anime" />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[60vh] md:h-[70vh] bg-gradient-to-b from-dark to-secondary">
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow">
              Discover Your Next Favorite
            </h1>
            <p className="text-lg md:text-xl text-light-gray mb-8 max-w-2xl">
              Find where to watch movies, TV shows, and anime on legal streaming platforms
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/movies"
                className="bg-primary text-white px-8 py-3 rounded-md hover:bg-red-700 transition font-semibold"
              >
                Browse Movies
              </a>
              <a
                href="/tv"
                className="bg-dark-gray text-white px-8 py-3 rounded-md hover:bg-medium-gray transition font-semibold"
              >
                Browse TV Shows
              </a>
              <a
                href="/anime"
                className="bg-dark-gray text-white px-8 py-3 rounded-md hover:bg-medium-gray transition font-semibold"
              >
                Browse Anime
              </a>
            </div>
          </div>
        </div>

        {/* Content Rows */}
        <div className="relative z-20 -mt-32">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
            </div>
          ) : (
            <>
              <ContentRow title="🔥 Trending Movies" items={trendingMovies} type="movie" />
              <ContentRow title="📺 Trending TV Shows" items={trendingTV} type="tv" />
              <ContentRow title="🎌 Trending Anime" items={trendingAnime} type="anime" />
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-xl font-bold text-white mb-2">Discover Content</h3>
              <p className="text-light-gray">
                Browse thousands of movies, TV shows, and anime with detailed information
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">Find Where to Watch</h3>
              <p className="text-light-gray">
                See which legal streaming platforms have your favorite content
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">100% Legal</h3>
              <p className="text-light-gray">
                We only redirect to official platforms - no piracy, no downloads
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
