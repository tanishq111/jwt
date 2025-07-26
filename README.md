# JWT Authentication API

A simple Node.js authentication API using JWT (JSON Web Tokens) for user registration, login, and protected routes.

## Features

- User registration with password hashing (bcrypt)
- User login with JWT token generation
- Protected routes with JWT authentication middleware
- In-memory user storage (for demonstration purposes)

## Technologies Used

- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt for password hashing
- dotenv for environment variables

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tanishq111/jwt.git
cd jwt
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=3000
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=1h
```

4. Start the server:
```bash
node index.js
```

## API Endpoints

### Register User
- **POST** `/api/auth/register`
- **Body**: 
```json
{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "your_password"
}
```

### Login User
- **POST** `/api/auth/login`
- **Body**:
```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

### Get User Profile (Protected)
- **GET** `/api/auth/profile`
- **Headers**: `Authorization: Bearer <your_jwt_token>`

## Project Structure

```
├── index.js              # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not committed)
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── models/
│   └── User.js           # User model with in-memory storage
└── routes/
    └── routes.js         # API routes
```

## Usage Example

1. Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
```

2. Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

3. Access protected route:
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <your_token_here>"
```

## Note

This project uses in-memory storage for demonstration purposes. In a production environment, you should use a proper database like MongoDB, PostgreSQL, or MySQL.
