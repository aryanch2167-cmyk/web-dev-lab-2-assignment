/**
 * Handles requests to routes that don't exist.
 * Must be mounted AFTER all real routes.
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

/**
 * Centralized error handler. Any middleware/controller that calls
 * next(err) ends up here instead of duplicating try/catch + res.json
 * logic everywhere.
 *
 * Express recognizes this as an error handler specifically because
 * it takes 4 arguments (err, req, res, next).
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode === 500) {
    // Log unexpected errors server-side for debugging; don't leak
    // stack traces to the client.
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { notFoundHandler, errorHandler };
