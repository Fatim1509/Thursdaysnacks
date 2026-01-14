/**
 * Error Handler Middleware
 * Centralized error handling for the API
 */

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Don't expose stack traces in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const errorResponse = {
    error: {
      message: err.message || 'An unexpected error occurred',
      status: err.status || 500
    }
  };
  
  // Only include stack trace in development
  if (isDevelopment && err.stack) {
    errorResponse.error.stack = err.stack;
  }
  
  res.status(err.status || 500).json(errorResponse);
};

/**
 * 404 Not Found Handler
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler
};
