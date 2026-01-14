const express = require('express');
const router = express.Router();
const animeController = require('../controllers/anime.controller');
const { searchLimiter } = require('../middlewares/rateLimiter');

/**
 * Anime Routes
 * All routes are prefixed with /api/anime
 */

// GET /api/anime/trending - Get trending anime
router.get('/trending', animeController.getTrendingAnime);

// GET /api/anime/popular - Get popular anime
router.get('/popular', animeController.getPopularAnime);

// GET /api/anime/search?q=query - Search anime (rate limited)
router.get('/search', searchLimiter, animeController.searchAnime);

// GET /api/anime/:id - Get anime details by ID
router.get('/:id', animeController.getAnimeById);

module.exports = router;
