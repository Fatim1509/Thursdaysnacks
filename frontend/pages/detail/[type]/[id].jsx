import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TrailerModal from '../../../components/TrailerModal';
import { moviesAPI, tvAPI, animeAPI } from '../../../services/api';

/**
 * Detail Page
 * Displays detailed information about a movie, TV show, or anime
 * Route: /detail/[type]/[id]
 */
export default function DetailPage() {
  const router = useRouter();
  const { type, id } = router.query;

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch content details
  useEffect(() => {
    if (!type || !id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        switch (type) {
          case 'movie':
            response = await moviesAPI.getById(id);
            break;
          case 'tv':
            response = await tvAPI.getById(id);
            break;
          case 'anime':
            response = await animeAPI.getById(id);
            break;
          default:
            throw new Error('Invalid content type');
        }

        setContent(response.data.data);
      } catch (err) {
        console.error('Failed to fetch details:', err);
        setError('Failed to load content details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  // Error state
  if (error || !content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-white mb-4">Content Not Found</h1>
        <p className="text-light-gray mb-8">{error || 'The requested content could not be found'}</p>
        <button
          onClick={() => router.back()}
          className="bg-primary text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Get content type label
  const getTypeLabel = () => {
    if (type === 'movie') return 'Movie';
    if (type === 'tv') return 'TV Show';
    if (type === 'anime') return 'Anime';
    return 'Content';
  };

  // Get rating color
  const getRatingColor = (rating) => {
    if (rating >= 7.5) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <>
      <Head>
        <title>{content.title} - StreamFinder</title>
        <meta name="description" content={content.description} />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section with Backdrop */}
        <div className="relative h-[60vh] md:h-[70vh]">
          {/* Background Image */}
          {content.poster && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${content.poster})`,
                filter: 'blur(10px) brightness(0.3)',
              }}
            ></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent"></div>
        </div>

        {/* Content Details */}
        <div className="relative -mt-48 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="w-64 h-96 bg-dark-gray rounded-lg overflow-hidden shadow-2xl">
                {content.poster ? (
                  <img
                    src={content.poster}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-light-gray">
                    <span className="text-6xl">🎬</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              {/* Type Badge */}
              <div className="mb-3">
                <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {getTypeLabel()}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {content.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Rating */}
                {content.rating > 0 && (
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">⭐</span>
                    <span className={`text-2xl font-bold ${getRatingColor(content.rating)}`}>
                      {content.rating}
                    </span>
                    <span className="text-light-gray ml-1">/10</span>
                  </div>
                )}

                {/* Release Date */}
                {content.releaseDate && (
                  <div className="text-light-gray">
                    📅 {new Date(content.releaseDate).getFullYear() || content.releaseDate}
                  </div>
                )}
              </div>

              {/* Genres */}
              {content.genres && content.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {content.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-dark-gray text-white px-4 py-2 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
                <p className="text-light-gray text-lg leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {/* Watch Trailer */}
                {content.trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="bg-primary text-white px-6 py-3 rounded-md hover:bg-red-700 transition font-semibold flex items-center"
                  >
                    ▶️ Watch Trailer
                  </button>
                )}
              </div>

              {/* Where to Watch */}
              {content.providers && content.providers.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Where to Watch (US)
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {content.providers.map((provider, index) => (
                      <div
                        key={index}
                        className="bg-dark-gray text-white px-5 py-3 rounded-lg font-medium hover:bg-medium-gray transition cursor-pointer"
                      >
                        {provider}
                      </div>
                    ))}
                  </div>
                  <p className="text-light-gray text-sm mt-4">
                    ℹ️ Click on a platform to visit their website
                  </p>
                </div>
              )}

              {/* No Providers */}
              {(!content.providers || content.providers.length === 0) && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Where to Watch
                  </h2>
                  <p className="text-light-gray">
                    Streaming information not available at this time.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trailer Modal */}
        {showTrailer && content.trailer && (
          <TrailerModal
            trailerUrl={content.trailer}
            onClose={() => setShowTrailer(false)}
          />
        )}
      </div>
    </>
  );
}
