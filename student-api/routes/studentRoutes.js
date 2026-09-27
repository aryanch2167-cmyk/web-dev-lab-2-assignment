const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');
const {
  validateCreateStudent,
  validateUpdateStudent,
  validateIdParam,
} = require('../middleware/validateStudent');

// /api/students
router.get('/', studentController.getAllStudents);
router.post('/', validateCreateStudent, studentController.createStudent);

// /api/students/:id
router
  .route('/:id')
  .get(validateIdParam, studentController.getStudentById)
  .put(validateIdParam, validateUpdateStudent, studentController.updateStudent)
  .delete(validateIdParam, studentController.deleteStudent);

module.exports = router;
