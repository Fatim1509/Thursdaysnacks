import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * ContentCard Component
 * Displays a single content item (movie, TV show, or anime) as a card
 */
export default function ContentCard({ item, type = 'movie' }) {
  const router = useRouter();

  // Determine detail page URL based on type
  const getDetailUrl = () => {
    if (type === 'movie') return `/detail/movie/${item.id}`;
    if (type === 'tv') return `/detail/tv/${item.id}`;
    if (type === 'anime') return `/detail/anime/${item.id}`;
    return '/';
  };

  // Handle card click
  const handleClick = () => {
    router.push(getDetailUrl());
  };

  // Format rating color
  const getRatingColor = (rating) => {
    if (rating >= 7.5) return 'bg-green-600';
    if (rating >= 6) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div
      onClick={handleClick}
      className="content-card relative flex-shrink-0 w-48 md:w-56 bg-dark-gray rounded-lg overflow-hidden shadow-lg cursor-pointer"
    >
      {/* Poster Image */}
      <div className="relative h-72 md:h-80 bg-medium-gray">
        {item.poster ? (
          <img
            src={item.poster}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-light-gray">
            <span className="text-4xl">🎬</span>
          </div>
        )}

        {/* Rating Badge */}
        {item.rating > 0 && (
          <div
            className={`absolute top-2 right-2 ${getRatingColor(
              item.rating
            )} text-white text-xs font-bold px-2 py-1 rounded-full`}
          >
            ⭐ {item.rating}
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm mb-1 truncate" title={item.title}>
          {item.title}
        </h3>
        
        {/* Genres */}
        {item.genres && item.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {item.genres.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-medium-gray text-light-gray px-2 py-1 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Release Date */}
        {item.releaseDate && (
          <p className="text-light-gray text-xs">
            {new Date(item.releaseDate).getFullYear() || item.releaseDate}
          </p>
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
        <div className="text-center px-4">
          <p className="text-white text-sm font-semibold mb-2">{item.title}</p>
          <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
