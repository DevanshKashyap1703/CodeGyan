# CodeGyan API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Courses

#### Get All Courses
```http
GET /courses
```

**Response:**
```json
{
  "success": true,
  "courses": [
    {
      "id": "1",
      "title": "JavaScript Fundamentals",
      "description": "Learn JS from scratch",
      "level": "Beginner",
      "duration": "40 hours",
      "thumbnail": "url"
    }
  ]
}
```

#### Get Course by ID
```http
GET /courses/:id
```

#### Create Course (Admin)
```http
POST /courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Python Basics",
  "description": "Learn Python programming",
  "level": "Beginner",
  "duration": "30 hours"
}
```

### Lessons

#### Get Lesson
```http
GET /lessons/:id
```

#### Get Lessons for Course
```http
GET /lessons/course/:courseId
```

### Progress

#### Get User Progress
```http
GET /progress
Authorization: Bearer <token>
```

#### Update Progress
```http
POST /progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "1",
  "lessonId": "5",
  "completed": true
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Email is required"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```