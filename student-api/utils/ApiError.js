/**
 * Custom error class so we can attach an HTTP status code to any error
 * we throw, and have the centralized error handler read it back off.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

module.exports = ApiError;
