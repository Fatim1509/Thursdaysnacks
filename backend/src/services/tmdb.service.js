const axios = require('axios');

/**
 * TMDB Service
 * Handles all communication with The Movie Database (TMDB) API
 * API Documentation: https://developers.themoviedb.org/3
 */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

/**
 * Make a request to TMDB API
 */
const tmdbRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
      params: {
        api_key: TMDB_API_KEY,
        ...params
      }
    });
    return response.data;
  } catch (error) {
    console.error('TMDB API Error:', error.message);
    throw new Error('Failed to fetch data from TMDB');
  }
};

/**
 * Get trending movies
 */
const getTrendingMovies = async () => {
  return await tmdbRequest('/trending/movie/week');
};

/**
 * Get popular movies
 */
const getPopularMovies = async () => {
  return await tmdbRequest('/movie/popular');
};

/**
 * Get top rated movies
 */
const getTopRatedMovies = async () => {
  return await tmdbRequest('/movie/top_rated');
};

/**
 * Get movie details by ID
 */
const getMovieDetails = async (id) => {
  const movie = await tmdbRequest(`/movie/${id}`, {
    append_to_response: 'videos,watch/providers'
  });
  return movie;
};

/**
 * Search movies
 */
const searchMovies = async (query) => {
  return await tmdbRequest('/search/movie', { query });
};

/**
 * Get trending TV shows
 */
const getTrendingTV = async () => {
  return await tmdbRequest('/trending/tv/week');
};

/**
 * Get popular TV shows
 */
const getPopularTV = async () => {
  return await tmdbRequest('/tv/popular');
};

/**
 * Get TV show details by ID
 */
const getTVDetails = async (id) => {
  const tv = await tmdbRequest(`/tv/${id}`, {
    append_to_response: 'videos,watch/providers'
  });
  return tv;
};

/**
 * Search TV shows
 */
const searchTV = async (query) => {
  return await tmdbRequest('/search/tv', { query });
};

/**
 * Get genre list for movies
 */
const getMovieGenres = async () => {
  return await tmdbRequest('/genre/movie/list');
};

/**
 * Get genre list for TV shows
 */
const getTVGenres = async () => {
  return await tmdbRequest('/genre/tv/list');
};

/**
 * Format TMDB image URL
 */
const formatImageUrl = (path) => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}${path}`;
};

/**
 * Get YouTube trailer URL from videos array
 */
const getTrailerUrl = (videos) => {
  if (!videos || !videos.results || videos.results.length === 0) {
    return null;
  }
  
  // Find official trailer or teaser
  const trailer = videos.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  ) || videos.results.find(
    video => video.type === 'Teaser' && video.site === 'YouTube'
  );
  
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};

/**
 * Extract watch providers for US region
 */
const getWatchProviders = (providers) => {
  if (!providers || !providers.results || !providers.results.US) {
    return [];
  }
  
  const usProviders = providers.results.US;
  const providerList = [];
  
  // Prioritize: flatrate (streaming) > buy > rent
  if (usProviders.flatrate) {
    providerList.push(...usProviders.flatrate.map(p => p.provider_name));
  }
  if (usProviders.buy) {
    providerList.push(...usProviders.buy.map(p => p.provider_name));
  }
  if (usProviders.rent) {
    providerList.push(...usProviders.rent.map(p => p.provider_name));
  }
  
  // Remove duplicates
  return [...new Set(providerList)];
};

module.exports = {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMovieDetails,
  searchMovies,
  getTrendingTV,
  getPopularTV,
  getTVDetails,
  searchTV,
  getMovieGenres,
  getTVGenres,
  formatImageUrl,
  getTrailerUrl,
  getWatchProviders
};
