require('dotenv').config();
const app = require('./app');

/**
 * Server Configuration and Startup
 */

// Validate required environment variables
if (!process.env.TMDB_API_KEY) {
  console.error('ERROR: TMDB_API_KEY is not set in environment variables');
  console.error('Please create a .env file and add your TMDB API key');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🎬 Entertainment Discovery API');
  console.log('='.repeat(50));
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}`);
  console.log(`🔒 TMDB API Key: ${process.env.TMDB_API_KEY ? 'Configured ✓' : 'Missing ✗'}`);
  console.log('='.repeat(50));
  console.log('\n📋 Available Endpoints:');
  console.log('  Movies:');
  console.log('    GET /api/movies/trending');
  console.log('    GET /api/movies/popular');
  console.log('    GET /api/movies/top-rated');
  console.log('    GET /api/movies/:id');
  console.log('    GET /api/movies/search?q=query');
  console.log('  TV Shows:');
  console.log('    GET /api/tv/trending');
  console.log('    GET /api/tv/popular');
  console.log('    GET /api/tv/:id');
  console.log('    GET /api/tv/search?q=query');
  console.log('  Anime:');
  console.log('    GET /api/anime/trending');
  console.log('    GET /api/anime/popular');
  console.log('    GET /api/anime/:id');
  console.log('    GET /api/anime/search?q=query');
  console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
