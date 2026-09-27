const studentModel = require('../data/students');
const ApiError = require('../utils/ApiError');

// GET /api/students
function getAllStudents(req, res) {
  const students = studentModel.getAllStudents();
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
}

// GET /api/students/:id
function getStudentById(req, res, next) {
  const student = studentModel.getStudentById(req.studentId);

  if (!student) {
    return next(new ApiError(404, `Student with id ${req.studentId} not found`));
  }

  res.status(200).json({ success: true, data: student });
}

// POST /api/students
function createStudent(req, res, next) {
  const { name, age, email, course } = req.body;

  if (studentModel.emailExists(email)) {
    return next(new ApiError(409, `A student with email ${email} already exists`));
  }

  const newStudent = studentModel.createStudent({ name, age, email, course });
  res.status(201).json({ success: true, data: newStudent });
}

// PUT /api/students/:id
function updateStudent(req, res, next) {
  const existing = studentModel.getStudentById(req.studentId);

  if (!existing) {
    return next(new ApiError(404, `Student with id ${req.studentId} not found`));
  }

  const { email } = req.body;
  if (email && studentModel.emailExists(email, req.studentId)) {
    return next(new ApiError(409, `A student with email ${email} already exists`));
  }

  const updated = studentModel.updateStudent(req.studentId, req.body);
  res.status(200).json({ success: true, data: updated });
}

// DELETE /api/students/:id
function deleteStudent(req, res, next) {
  const deleted = studentModel.deleteStudent(req.studentId);

  if (!deleted) {
    return next(new ApiError(404, `Student with id ${req.studentId} not found`));
  }

  res.status(200).json({ success: true, message: `Student with id ${req.studentId} deleted` });
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
