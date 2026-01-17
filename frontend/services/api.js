import axios from 'axios';

/**
 * API Service
 * Handles all communication with the backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://thursdaysnacks-production.up.railway.app';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

/**
 * Movies API
 */
export const moviesAPI = {
  getTrending: () => apiClient.get('/api/movies/trending'),
  getPopular: () => apiClient.get('/api/movies/popular'),
  getTopRated: () => apiClient.get('/api/movies/top-rated'),
  getById: (id) => apiClient.get(`/api/movies/${id}`),
  search: (query) => apiClient.get(`/api/movies/search?q=${encodeURIComponent(query)}`),
};

/**
 * TV Shows API
 */
export const tvAPI = {
  getTrending: () => apiClient.get('/api/tv/trending'),
  getPopular: () => apiClient.get('/api/tv/popular'),
  getById: (id) => apiClient.get(`/api/tv/${id}`),
  search: (query) => apiClient.get(`/api/tv/search?q=${encodeURIComponent(query)}`),
};

/**
 * Anime API
 */
export const animeAPI = {
  getTrending: () => apiClient.get('/api/anime/trending'),
  getPopular: () => apiClient.get('/api/anime/popular'),
  getById: (id) => apiClient.get(`/api/anime/${id}`),
  search: (query) => apiClient.get(`/api/anime/search?q=${encodeURIComponent(query)}`),
};

/**
 * Generic search across all content types
 */
export const searchAll = async (query) => {
  try {
    const [movies, tv, anime] = await Promise.all([
      moviesAPI.search(query).catch(() => ({ data: { data: [] } })),
      tvAPI.search(query).catch(() => ({ data: { data: [] } })),
      animeAPI.search(query).catch(() => ({ data: { data: [] } })),
    ]);

    return {
      movies: movies.data.data || [],
      tv: tv.data.data || [],
      anime: anime.data.data || [],
    };
  } catch (error) {
    console.error('Search error:', error);
    return { movies: [], tv: [], anime: [] };
  }
};

export default apiClient;
