const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies.controller');
const { searchLimiter } = require('../middlewares/rateLimiter');

/**
 * Movie Routes
 * All routes are prefixed with /api/movies
 */

// GET /api/movies/trending - Get trending movies
router.get('/trending', moviesController.getTrendingMovies);

// GET /api/movies/popular - Get popular movies
router.get('/popular', moviesController.getPopularMovies);

// GET /api/movies/top-rated - Get top rated movies
router.get('/top-rated', moviesController.getTopRatedMovies);

// GET /api/movies/search?q=query - Search movies (rate limited)
router.get('/search', searchLimiter, moviesController.searchMovies);

// GET /api/movies/:id - Get movie details by ID
router.get('/:id', moviesController.getMovieById);

module.exports = router;
