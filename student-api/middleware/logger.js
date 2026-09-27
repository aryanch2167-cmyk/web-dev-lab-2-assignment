/**
 * Logs every incoming request: method, url, and timestamp.
 * Demonstrates a basic custom middleware used app-wide.
 */
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = requestLogger;
