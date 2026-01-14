const tmdbService = require('../services/tmdb.service');
const formatter = require('../utils/formatter');

/**
 * Movies Controller
 * Handles all movie-related requests
 */

/**
 * Get trending movies
 * GET /api/movies/trending
 */
const getTrendingMovies = async (req, res, next) => {
  try {
    const data = await tmdbService.getTrendingMovies();
    const genres = await tmdbService.getMovieGenres();
    
    const movies = data.results.map(movie => 
      formatter.formatMovie(movie, genres.genres)
    );
    
    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get popular movies
 * GET /api/movies/popular
 */
const getPopularMovies = async (req, res, next) => {
  try {
    const data = await tmdbService.getPopularMovies();
    const genres = await tmdbService.getMovieGenres();
    
    const movies = data.results.map(movie => 
      formatter.formatMovie(movie, genres.genres)
    );
    
    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get top rated movies
 * GET /api/movies/top-rated
 */
const getTopRatedMovies = async (req, res, next) => {
  try {
    const data = await tmdbService.getTopRatedMovies();
    const genres = await tmdbService.getMovieGenres();
    
    const movies = data.results.map(movie => 
      formatter.formatMovie(movie, genres.genres)
    );
    
    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get movie details by ID
 * GET /api/movies/:id
 */
const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await tmdbService.getMovieDetails(id);
    
    // Extract trailer URL
    const trailerUrl = tmdbService.getTrailerUrl(movie.videos);
    
    // Extract watch providers
    const providers = tmdbService.getWatchProviders(movie['watch/providers']);
    
    // Format the response
    const formattedMovie = formatter.formatMovieDetails(movie, trailerUrl, providers);
    
    res.json({
      success: true,
      data: formattedMovie
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search movies
 * GET /api/movies/search?q=query
 */
const searchMovies = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const data = await tmdbService.searchMovies(q);
    const genres = await tmdbService.getMovieGenres();
    
    const movies = data.results.map(movie => 
      formatter.formatMovie(movie, genres.genres)
    );
    
    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMovieById,
  searchMovies
};
