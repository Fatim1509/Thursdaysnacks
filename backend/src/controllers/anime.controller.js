const anilistService = require('../services/anilist.service');
const formatter = require('../utils/formatter');

/**
 * Anime Controller
 * Handles all anime-related requests
 */

/**
 * Get trending anime
 * GET /api/anime/trending
 */
const getTrendingAnime = async (req, res, next) => {
  try {
    const animeList = await anilistService.getTrendingAnime();
    
    const anime = animeList.map(a => formatter.formatAnime(a));
    
    res.json({
      success: true,
      count: anime.length,
      data: anime
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get popular anime
 * GET /api/anime/popular
 */
const getPopularAnime = async (req, res, next) => {
  try {
    const animeList = await anilistService.getPopularAnime();
    
    const anime = animeList.map(a => formatter.formatAnime(a));
    
    res.json({
      success: true,
      count: anime.length,
      data: anime
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get anime details by ID
 * GET /api/anime/:id
 */
const getAnimeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const anime = await anilistService.getAnimeDetails(id);
    
    // Extract trailer URL
    const trailerUrl = anilistService.getAnimeTrailerUrl(anime.trailer);
    
    // Extract watch providers
    const providers = anilistService.getAnimeProviders(anime.externalLinks);
    
    // Format the response
    const formattedAnime = formatter.formatAnimeDetails(anime, trailerUrl, providers);
    
    res.json({
      success: true,
      data: formattedAnime
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search anime
 * GET /api/anime/search?q=query
 */
const searchAnime = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const animeList = await anilistService.searchAnime(q);
    
    const anime = animeList.map(a => formatter.formatAnime(a));
    
    res.json({
      success: true,
      count: anime.length,
      data: anime
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrendingAnime,
  getPopularAnime,
  getAnimeById,
  searchAnime
};
