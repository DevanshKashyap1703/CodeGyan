# CodeGyan Backend

## Project Setup

This is the backend API for CodeGyan built with Node.js/Express.

### Prerequisites
- Node.js (v14+)
- npm or yarn
- PostgreSQL or MongoDB

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/codegyan
JWT_SECRET=your_jwt_secret_key
```

### Development

```bash
npm run dev
```

The API will run on [http://localhost:5000](http://localhost:5000)

### Production

```bash
npm start
```

### Project Structure

```
.
├── routes/          # API routes
├── controllers/      # Route handlers
├── models/          # Database models
├── middleware/      # Custom middleware
├── utils/           # Helper functions
├── config/          # Configuration files
├── server.js        # Entry point
└── package.json
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

#### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

#### Lessons
- `GET /api/courses/:courseId/lessons` - Get lessons for course
- `GET /api/lessons/:id` - Get lesson details

#### Progress
- `GET /api/users/progress` - Get user progress
- `POST /api/progress` - Update progress

### Available Scripts

- `npm start` - Run production server
- `npm run dev` - Run development server with nodemon
- `npm test` - Run tests