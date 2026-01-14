/**
 * Data Formatter Utility
 * Normalizes data from different sources (TMDB, AniList) into a unified format
 */

/**
 * Format TMDB movie data to unified format
 */
const formatMovie = (movie, genres = []) => {
  // Get genre names from IDs
  const genreNames = movie.genre_ids
    ? movie.genre_ids.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : null;
      }).filter(Boolean)
    : movie.genres
    ? movie.genres.map(g => g.name)
    : [];
  
  return {
    id: movie.id,
    title: movie.title || movie.original_title,
    description: movie.overview || 'No description available.',
    poster: movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    rating: movie.vote_average ? parseFloat(movie.vote_average.toFixed(1)) : 0,
    genres: genreNames,
    releaseDate: movie.release_date || 'Unknown',
    trailer: null, // Will be populated in detail view
    providers: [] // Will be populated in detail view
  };
};

/**
 * Format TMDB TV show data to unified format
 */
const formatTVShow = (tv, genres = []) => {
  // Get genre names from IDs
  const genreNames = tv.genre_ids
    ? tv.genre_ids.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : null;
      }).filter(Boolean)
    : tv.genres
    ? tv.genres.map(g => g.name)
    : [];
  
  return {
    id: tv.id,
    title: tv.name || tv.original_name,
    description: tv.overview || 'No description available.',
    poster: tv.poster_path 
      ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
      : null,
    rating: tv.vote_average ? parseFloat(tv.vote_average.toFixed(1)) : 0,
    genres: genreNames,
    releaseDate: tv.first_air_date || 'Unknown',
    trailer: null, // Will be populated in detail view
    providers: [] // Will be populated in detail view
  };
};

/**
 * Format AniList anime data to unified format
 */
const formatAnime = (anime) => {
  // Format date
  let releaseDate = 'Unknown';
  if (anime.startDate && anime.startDate.year) {
    const { year, month, day } = anime.startDate;
    if (month && day) {
      releaseDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    } else if (month) {
      releaseDate = `${year}-${String(month).padStart(2, '0')}`;
    } else {
      releaseDate = String(year);
    }
  }
  
  // Clean HTML from description
  let description = anime.description || 'No description available.';
  description = description
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
  
  // Get title (prefer English, fallback to Romaji)
  const title = anime.title.english || anime.title.romaji;
  
  // Convert AniList score (0-100) to 0-10 scale
  const rating = anime.averageScore 
    ? parseFloat((anime.averageScore / 10).toFixed(1))
    : 0;
  
  return {
    id: anime.id,
    title: title,
    description: description,
    poster: anime.coverImage?.extraLarge || anime.coverImage?.large || null,
    rating: rating,
    genres: anime.genres || [],
    releaseDate: releaseDate,
    trailer: null, // Will be populated in detail view
    providers: [] // Will be populated in detail view
  };
};

/**
 * Format movie details with trailer and providers
 */
const formatMovieDetails = (movie, trailerUrl, providers) => {
  const formatted = formatMovie(movie);
  formatted.trailer = trailerUrl;
  formatted.providers = providers;
  return formatted;
};

/**
 * Format TV show details with trailer and providers
 */
const formatTVDetails = (tv, trailerUrl, providers) => {
  const formatted = formatTVShow(tv);
  formatted.trailer = trailerUrl;
  formatted.providers = providers;
  return formatted;
};

/**
 * Format anime details with trailer and providers
 */
const formatAnimeDetails = (anime, trailerUrl, providers) => {
  const formatted = formatAnime(anime);
  formatted.trailer = trailerUrl;
  formatted.providers = providers;
  return formatted;
};

module.exports = {
  formatMovie,
  formatTVShow,
  formatAnime,
  formatMovieDetails,
  formatTVDetails,
  formatAnimeDetails
};
