const ApiError = require('../utils/ApiError');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the request body for creating a new student.
 * All fields are required.
 */
function validateCreateStudent(req, res, next) {
  const { name, age, email, course } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('name is required and must be a non-empty string');
  }

  if (age === undefined || age === null || typeof age !== 'number' || age <= 0) {
    errors.push('age is required and must be a positive number');
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    errors.push('email is required and must be a valid email address');
  }

  if (!course || typeof course !== 'string' || !course.trim()) {
    errors.push('course is required and must be a non-empty string');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, `Validation failed: ${errors.join('; ')}`));
  }

  next();
}

/**
 * Validates the request body for updating a student.
 * Fields are optional here (partial update), but whatever IS
 * provided must be well-formed.
 */
function validateUpdateStudent(req, res, next) {
  const { name, age, email, course } = req.body;
  const errors = [];

  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, 'Request body cannot be empty'));
  }

  if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
    errors.push('name must be a non-empty string');
  }

  if (age !== undefined && (typeof age !== 'number' || age <= 0)) {
    errors.push('age must be a positive number');
  }

  if (email !== undefined && (typeof email !== 'string' || !EMAIL_REGEX.test(email))) {
    errors.push('email must be a valid email address');
  }

  if (course !== undefined && (typeof course !== 'string' || !course.trim())) {
    errors.push('course must be a non-empty string');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, `Validation failed: ${errors.join('; ')}`));
  }

  next();
}

/**
 * Validates that :id in the route is a positive integer.
 */
function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return next(new ApiError(400, 'id must be a positive integer'));
  }
  req.studentId = id;
  next();
}

module.exports = { validateCreateStudent, validateUpdateStudent, validateIdParam };
