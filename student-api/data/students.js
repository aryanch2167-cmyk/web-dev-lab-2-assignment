/**
 * In-memory "database" for student records.
 * In a real project this would be replaced with MongoDB/MySQL/etc,
 * but the same functions would still be exported so the rest of the
 * app doesn't need to change.
 */

let students = [
  { id: 1, name: 'Aryan Sharma', age: 20, email: 'aryan@example.com', course: 'Computer Science' },
  { id: 2, name: 'Priya Verma', age: 21, email: 'priya@example.com', course: 'Information Technology' },
  { id: 3, name: 'Rohan Gupta', age: 22, email: 'rohan@example.com', course: 'Electronics' },
];

// Keeps track of the next id to assign, independent of array length,
// so ids stay unique even after deletions.
let nextId = 4;

function getAllStudents() {
  return students;
}

function getStudentById(id) {
  return students.find((s) => s.id === id);
}

function createStudent({ name, age, email, course }) {
  const newStudent = { id: nextId++, name, age, email, course };
  students.push(newStudent);
  return newStudent;
}

function updateStudent(id, updates) {
  const student = getStudentById(id);
  if (!student) return null;

  Object.assign(student, updates);
  return student;
}

function deleteStudent(id) {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return false;

  students.splice(index, 1);
  return true;
}

function emailExists(email, excludeId = null) {
  return students.some((s) => s.email === email && s.id !== excludeId);
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  emailExists,
};
