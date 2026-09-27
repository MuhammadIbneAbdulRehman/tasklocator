Sure — here is the **raw Markdown (`README.md`) format** you can copy directly into your file:

````md
# Todo-app-backend

Backend project that helps us track our habits and tasks.

## Features

- User signup & signin with JWT auth
- Get logged-in user profile
- Password hashing with bcrypt
- MongoDB with Mongoose
- Protected routes with JWT middleware
- Task management
- Create, read, update, and delete tasks
- Tasks are linked to their creator
- Habit tracking
- Environment-based configuration
- Request logging with Morgan

## Tech Stack

| Layer | Tech |
|-------|------|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) |
| Hashing | bcryptjs |
| Logger | Morgan |
| Env | dotenv |

## Project Structure

```text
Todo-app-backend/
├── index.js
├── src/
│   ├── app.js
│   ├── controller/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── router/
│   │   ├── auth.route.js
│   │   └── task.route.js
│   ├── models/
│   │   ├── user.models.js
│   │   └── UserTask.model.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── dbconfig/
│   │   └── db.config.js
│   └── envconfigure/
│       └── url.configure.js
└── .env
````

## Installation

```bash
git clone <your-repo-url>
cd Todo-app-backend
npm install
```

## Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Use the exact environment variable names configured in your project.

## Run the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Server runs at:

```text
http://localhost:5000
```

# API Endpoints

## Authentication

Base URL:

```text
http://localhost:5000/api/auth
```

---

## POST `/signup`

Register a new user.

### Body

```json
{
  "name": "john_doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Success — 201

```json
{
  "message": "User Registerd successfully!!!",
  "user": {
    "id": "...",
    "name": "john_doe",
    "email": "john@example.com"
  }
}
```

### Errors

| Status | Message                           |
| ------ | --------------------------------- |
| 400    | All fields are required           |
| 409    | Username or email already exist!! |
| 500    | Server Error during signUp        |

---

## POST `/signin`

Authenticate a user and get a JWT.

### Body

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Success — 200

```json
{
  "message": "Signed in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "john_doe",
    "email": "john@example.com"
  }
}
```

### Errors

| Status | Message                            |
| ------ | ---------------------------------- |
| 400    | Email and password are required!!! |
| 401    | Invalid credentials!!!             |
| 500    | Server error during signIn         |

---

# Get My Profile

## GET `/me`

Get the profile of the currently logged-in user.

### Request

```text
GET http://localhost:5000/api/auth/me
```

### Header

```text
Authorization: Bearer <token>
```

### Success — 200

```json
{
  "message": "Profile fetched successfully",
  "user": {
    "_id": "...",
    "name": "john_doe",
    "email": "john@example.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

The password is not returned.

### User Not Found — 404

```json
{
  "message": "User not found"
}
```

### Server Error — 500

```json
{
  "message": "Server error while fetching profile"
}
```

---

# Task API

Base URL:

```text
http://localhost:5000/api/task
```

All task routes require authentication.

### Authorization Header

```text
Authorization: Bearer <token>
```

---

## POST `/createtask`

Create a new task for the logged-in user.

### Request

```text
POST http://localhost:5000/api/task/createtask
```

### Body

```json
{
  "title": "Learn MongoDB",
  "description": "Practice CRUD operations"
}
```

### Success — 201

```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "...",
    "title": "Learn MongoDB",
    "description": "Practice CRUD operations",
    "creator": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

The `creator` field contains the ID of the logged-in user.

### Error — 400

```json
{
  "message": "Title and description are required"
}
```

---

## GET `/gettasks`

Get all tasks created by the logged-in user.

### Request

```text
GET http://localhost:5000/api/task/gettasks
```

### Success — 200

```json
{
  "message": "Tasks fetched successfully",
  "tasks": [
    {
      "_id": "...",
      "title": "Learn MongoDB",
      "description": "Practice CRUD operations",
      "creator": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

Only tasks belonging to the logged-in user are returned.

---

## GET `/gettask/:id`

Get one task by ID.

### Request

```text
GET http://localhost:5000/api/task/gettask/TASK_ID
```

### Success — 200

```json
{
  "message": "Task fetched successfully",
  "task": {
    "_id": "...",
    "title": "Learn MongoDB",
    "description": "Practice CRUD operations",
    "creator": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Task Not Found — 404

```json
{
  "message": "Task not found"
}
```

The controller checks both the task ID and the logged-in user's ID.

---

## PUT `/updatetask/:id`

Update an existing task.

### Request

```text
PUT http://localhost:5000/api/task/updatetask/TASK_ID
```

### Body

Update title:

```json
{
  "title": "Learn Advanced MongoDB"
}
```

Update description:

```json
{
  "description": "Practice advanced MongoDB CRUD operations"
}
```

Update both:

```json
{
  "title": "Learn Advanced MongoDB",
  "description": "Practice advanced MongoDB CRUD operations"
}
```

### Success — 200

```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "...",
    "title": "Learn Advanced MongoDB",
    "description": "Practice advanced MongoDB CRUD operations",
    "creator": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Task Not Found — 404

```json
{
  "message": "Task not found"
}
```

---

## DELETE `/deletetask/:id`

Delete a task belonging to the logged-in user.

### Request

```text
DELETE http://localhost:5000/api/task/deletetask/TASK_ID
```

### Success — 200

```json
{
  "message": "Task deleted successfully"
}
```

### Task Not Found — 404

```json
{
  "message": "Task not found"
}
```

---

# Task API Summary

| Method | Endpoint                   | Purpose              |
| ------ | -------------------------- | -------------------- |
| POST   | `/api/task/createtask`     | Create task          |
| GET    | `/api/task/gettasks`       | Get all user's tasks |
| GET    | `/api/task/gettask/:id`    | Get one task         |
| PUT    | `/api/task/updatetask/:id` | Update task          |
| DELETE | `/api/task/deletetask/:id` | Delete task          |

# Usage Example (fetch)

## Signup

```js
const res = await fetch("http://localhost:5000/api/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "john_doe",
    email: "john@example.com",
    password: "secret123"
  })
});

const data = await res.json();
```

## Signin

```js
const res = await fetch("http://localhost:5000/api/auth/signin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "john@example.com",
    password: "secret123"
  })
});

const { token, user } = await res.json();
```

## Get My Profile

```js
const res = await fetch("http://localhost:5000/api/auth/me", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

const data = await res.json();
```

## Create Task

```js
const res = await fetch("http://localhost:5000/api/task/createtask", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({
    title: "Learn MongoDB",
    description: "Practice CRUD operations"
  })
});

const data = await res.json();
```

## Get Tasks

```js
const res = await fetch("http://localhost:5000/api/task/gettasks", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

const data = await res.json();
```

# JWT

* **Payload:** `{ id, name, email }`
* **Expiry:** 4 days
* **Header on protected routes:**

```text
Authorization: Bearer <token>
```

## JWT Flow

```text
Signup
   ↓
Signin
   ↓
JWT Token
   ↓
Send Token with Protected Request
   ↓
Auth Middleware
   ↓
Verify Token
   ↓
req.user.id
   ↓
Access User/Profile/Tasks
```

# User Schema

| Field     | Type   | Rules            |
| --------- | ------ | ---------------- |
| name      | String | required, unique |
| email     | String | required, unique |
| password  | String | required, hashed |
| createdAt | Date   | auto             |
| updatedAt | Date   | auto             |

# Task Schema

| Field       | Type     | Rules                          |
| ----------- | -------- | ------------------------------ |
| title       | String   | required, minimum 3 characters |
| description | String   | required                       |
| creator     | ObjectId | required, references User      |
| createdAt   | Date     | auto                           |
| updatedAt   | Date     | auto                           |

The `creator` field connects the task with the user who created it.

# Task Ownership

Tasks are linked to the logged-in user using:

```js
creator: req.user.id
```

When getting tasks:

```js
Task.find({
    creator: req.user.id
})
```

The same user ID check is used when getting, updating, and deleting a task.

This means users can only work with their own tasks.

# Roadmap

* [x] User signup
* [x] User signin
* [x] Password hashing
* [x] JWT authentication
* [x] Auth middleware
* [x] Get logged-in user profile
* [x] User model
* [x] Task model
* [x] Create task
* [x] Get all user's tasks
* [x] Get task by ID
* [x] Update task
* [x] Delete task
* [ ] Habit model (create, update, delete)
* [ ] Mark habit as done per day
* [ ] Mark task as complete
* [ ] Filter tasks by status / due date
* [ ] Habit streak tracking

# Notes

* Passwords are hashed with bcrypt before saving.
* Password is never returned in any response.
* Duplicate email/username returns `409`.
* Same `401` message is used for wrong email or wrong password.
* Protected routes require a valid JWT.
* Tasks are connected to their creator using MongoDB ObjectId.
* Users can only access their own tasks.
* `createdAt` and `updatedAt` are automatically created by Mongoose.
* Old tasks created before adding the `creator` field may not have a creator ID.

# License

ISC

```
```
