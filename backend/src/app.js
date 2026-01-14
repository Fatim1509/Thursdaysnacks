const express = require('express');
const cors = require('cors');
const securityMiddleware = require('./middlewares/security');
const { apiLimiter } = require('./middlewares/rateLimiter');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

// Import routes
const moviesRoutes = require('./routes/movies.routes');
const tvRoutes = require('./routes/tv.routes');
const animeRoutes = require('./routes/anime.routes');

/**
 * Express Application Setup
 */
const app = express();

// Security middleware
app.use(securityMiddleware);

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Entertainment Discovery API'
  });
});

// API Routes
app.use('/api/movies', moviesRoutes);
app.use('/api/tv', tvRoutes);
app.use('/api/anime', animeRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Entertainment Discovery API',
    version: '1.0.0',
    endpoints: {
      movies: {
        trending: '/api/movies/trending',
        popular: '/api/movies/popular',
        topRated: '/api/movies/top-rated',
        details: '/api/movies/:id',
        search: '/api/movies/search?q=query'
      },
      tv: {
        trending: '/api/tv/trending',
        popular: '/api/tv/popular',
        details: '/api/tv/:id',
        search: '/api/tv/search?q=query'
      },
      anime: {
        trending: '/api/anime/trending',
        popular: '/api/anime/popular',
        details: '/api/anime/:id',
        search: '/api/anime/search?q=query'
      }
    },
    attribution: {
      movies_tv: 'Powered by The Movie Database (TMDB)',
      anime: 'Anime data from AniList'
    }
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
