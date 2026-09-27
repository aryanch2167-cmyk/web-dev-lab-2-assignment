# Student Management REST API

A REST API built with Express.js for managing student records (CRUD),
demonstrating routing, middleware, and error handling — no database,
just in-memory array/JSON data (as required by the assignment).

## Project structure

```
student-api/
├── app.js                        # App entry point (creates server, mounts middleware/routes)
├── routes/studentRoutes.js       # Modular routing for /api/students
├── controllers/studentController.js  # Request handlers / business logic
├── data/students.js              # In-memory array acting as the "database"
├── middleware/
│   ├── logger.js                 # Custom logger middleware (method, url, timestamp)
│   ├── validateStudent.js        # Input validation middleware
│   └── errorHandler.js           # 404 handler + centralized error handler
└── utils/ApiError.js             # Custom error class (statusCode + message)
```

## Setup

```bash
npm install
npm start          # or: npm run dev  (auto-restarts on file changes)
```

Server runs at `http://localhost:3000` by default.

## Data model

```json
{
  "id": 1,
  "name": "Aryan Sharma",
  "age": 20,
  "email": "aryan@example.com",
  "course": "Computer Science"
}
```

## Required APIs

| Method | Endpoint             | Status codes         |
|--------|-----------------------|-----------------------|
| GET    | `/api/students`       | 200                   |
| GET    | `/api/students/:id`   | 200 / 404             |
| POST   | `/api/students`       | 201 / 400 / 409       |
| PUT    | `/api/students/:id`   | 200 / 400 / 404 / 409 |
| DELETE | `/api/students/:id`   | 200 / 404             |

(409 is used for duplicate email — an extra touch beyond the required 200/201/400/404.)

## Testing with Postman

1. Open Postman → create a new request.
2. **GET all students**
   - Method: `GET`, URL: `http://localhost:3000/api/students`
3. **GET one student**
   - Method: `GET`, URL: `http://localhost:3000/api/students/1`
4. **Create a student**
   - Method: `POST`, URL: `http://localhost:3000/api/students`
   - Body tab → raw → JSON:
     ```json
     { "name": "Neha Singh", "age": 20, "email": "neha@example.com", "course": "AI" }
     ```
5. **Update a student**
   - Method: `PUT`, URL: `http://localhost:3000/api/students/1`
   - Body tab → raw → JSON:
     ```json
     { "age": 22 }
     ```
6. **Delete a student**
   - Method: `DELETE`, URL: `http://localhost:3000/api/students/1`

Every response has the shape `{ "success": true/false, ... }`.

## Error handling

| Status | When                                       |
|--------|---------------------------------------------|
| 400    | Invalid input (bad/missing fields, bad `:id`) |
| 404    | Student or route not found                  |
| 409    | Duplicate email                             |
| 500    | Unexpected server error                     |
