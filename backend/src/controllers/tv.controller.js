const tmdbService = require('../services/tmdb.service');
const formatter = require('../utils/formatter');

/**
 * TV Shows Controller
 * Handles all TV show-related requests
 */

/**
 * Get trending TV shows
 * GET /api/tv/trending
 */
const getTrendingTV = async (req, res, next) => {
  try {
    const data = await tmdbService.getTrendingTV();
    const genres = await tmdbService.getTVGenres();
    
    const tvShows = data.results.map(tv => 
      formatter.formatTVShow(tv, genres.genres)
    );
    
    res.json({
      success: true,
      count: tvShows.length,
      data: tvShows
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get popular TV shows
 * GET /api/tv/popular
 */
const getPopularTV = async (req, res, next) => {
  try {
    const data = await tmdbService.getPopularTV();
    const genres = await tmdbService.getTVGenres();
    
    const tvShows = data.results.map(tv => 
      formatter.formatTVShow(tv, genres.genres)
    );
    
    res.json({
      success: true,
      count: tvShows.length,
      data: tvShows
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get TV show details by ID
 * GET /api/tv/:id
 */
const getTVById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tv = await tmdbService.getTVDetails(id);
    
    // Extract trailer URL
    const trailerUrl = tmdbService.getTrailerUrl(tv.videos);
    
    // Extract watch providers
    const providers = tmdbService.getWatchProviders(tv['watch/providers']);
    
    // Format the response
    const formattedTV = formatter.formatTVDetails(tv, trailerUrl, providers);
    
    res.json({
      success: true,
      data: formattedTV
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search TV shows
 * GET /api/tv/search?q=query
 */
const searchTV = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const data = await tmdbService.searchTV(q);
    const genres = await tmdbService.getTVGenres();
    
    const tvShows = data.results.map(tv => 
      formatter.formatTVShow(tv, genres.genres)
    );
    
    res.json({
      success: true,
      count: tvShows.length,
      data: tvShows
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrendingTV,
  getPopularTV,
  getTVById,
  searchTV
};
