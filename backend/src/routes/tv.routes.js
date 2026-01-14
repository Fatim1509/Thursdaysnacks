const express = require('express');
const router = express.Router();
const tvController = require('../controllers/tv.controller');
const { searchLimiter } = require('../middlewares/rateLimiter');

/**
 * TV Show Routes
 * All routes are prefixed with /api/tv
 */

// GET /api/tv/trending - Get trending TV shows
router.get('/trending', tvController.getTrendingTV);

// GET /api/tv/popular - Get popular TV shows
router.get('/popular', tvController.getPopularTV);

// GET /api/tv/search?q=query - Search TV shows (rate limited)
router.get('/search', searchLimiter, tvController.searchTV);

// GET /api/tv/:id - Get TV show details by ID
router.get('/:id', tvController.getTVById);

module.exports = router;
