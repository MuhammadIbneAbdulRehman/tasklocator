# Todo-app-backend

Backend project that helps us track our habits and tasks.

## Features

- User signup & signin with JWT auth
- Password hashing with bcrypt
- MongoDB with Mongoose
- Habit tracking
- Task management
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

```
Todo-app-backend/
├── index.js
├── src/
│   ├── app.js
│   ├── controller/
│   │   └── auth.controller.js
│   ├── router/
│   │   └── auth.route.js
│   ├── models/
│   │   └── user.models.js
│   ├── dbconfig/
│   │   └── db.config.js
│   └── envconfigure/
│       └── url.configure.js
└── .env
```

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

## Run the Server

**Development**
```bash
npm run dev
```

**Production**
```bash
npm start
```

Server runs at: `http://localhost:5000`

## API Endpoints

Base URL: `http://localhost:5000/api/auth`

### POST `/signup`

Register a new user.

**Body**
```json
{
  "name": "john_doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success — 201**
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

**Errors**

| Status | Message |
|--------|---------|
| 400 | All fields are required |
| 409 | Username or email already exist!! |
| 500 | Server Error during signUp |

### POST `/signin`

Authenticate a user and get a JWT.

**Body**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success — 200**
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

**Errors**

| Status | Message |
|--------|---------|
| 400 | Email and password are required!!! |
| 401 | Invalid credentials!!! |
| 500 | Server error during signIn |

## Usage Example (fetch)

**Signup**
```js
const res = await fetch("http://localhost:5000/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "john_doe",
    email: "john@example.com",
    password: "secret123"
  })
});
const data = await res.json();
```

**Signin**
```js
const res = await fetch("http://localhost:5000/api/auth/signin", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "john@example.com",
    password: "secret123"
  })
});
const { token, user } = await res.json();
```

## JWT

- **Payload:** `{ id, name, email }`
- **Expiry:** 4 days
- **Header on protected routes:**
  ```
  Authorization: Bearer <token>
  ```

## User Schema

| Field | Type | Rules |
|-------|------|-------|
| name | String | required, unique |
| email | String | required, unique |
| password | String | required, hashed |
| createdAt | Date | auto |
| updatedAt | Date | auto |

## Roadmap

- [x] User signup
- [x] User signin
- [ ] Habit model (create, update, delete)
- [ ] Task model (create, update, delete)
- [ ] Mark habit as done per day
- [ ] Mark task as complete
- [ ] Auth middleware for protected routes
- [ ] Filter tasks by status / due date
- [ ] Habit streak tracking

## Notes

- Passwords are hashed with bcrypt (10 rounds) before saving
- Password is never returned in any response
- Duplicate email/username returns `409`
- Same `401` message for wrong email or wrong password

## License

ISC