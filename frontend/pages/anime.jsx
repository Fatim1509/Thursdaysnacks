import { useState, useEffect } from 'react';
import Head from 'next/head';
import ContentCard from '../components/ContentCard';
import { animeAPI } from '../services/api';

/**
 * Anime Page
 * Displays anime categories and grid
 */
export default function Anime() {
  const [animeList, setAnimeList] = useState([]);
  const [category, setCategory] = useState('trending');
  const [loading, setLoading] = useState(true);

  // Fetch anime based on selected category
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);

        let response;
        switch (category) {
          case 'popular':
            response = await animeAPI.getPopular();
            break;
          default:
            response = await animeAPI.getTrending();
        }

        setAnimeList(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [category]);

  return (
    <>
      <Head>
        <title>Anime - StreamFinder</title>
        <meta name="description" content="Discover popular and trending anime" />
      </Head>

      <div className="min-h-screen py-8 px-4 md:px-8">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Anime</h1>

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
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
            </div>
          ) : (
            /* Anime Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {animeList.map((anime) => (
                <ContentCard key={anime.id} item={anime} type="anime" />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && animeList.length === 0 && (
            <div className="text-center py-20">
              <p className="text-light-gray text-lg">No anime found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
