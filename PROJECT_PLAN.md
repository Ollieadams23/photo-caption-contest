# Photo Caption Contest Backend Plan

## 1. Initialize the Project
- Create a new Node.js project (`npm init`).
- Set up Git version control (`git init`, create `.gitignore`).

## 2. Install Dependencies
- Express (server)
- Sequelize & pg/pg-hstore (PostgreSQL ORM)
- bcrypt (password hashing)
- jsonwebtoken (JWT authentication)
- dotenv (environment variables)
- swagger-jsdoc & swagger-ui-express (API docs)
- node-cache (local cache)
- Other utilities as needed (e.g., cors, body-parser)

## 3. Project Structure Example
```
/models           # Sequelize models
/routes           # Express routes
/controllers      # Business logic
/middleware       # Auth, error handling
/docs             # Swagger config
/config           # DB config
app.js or server.js (entry point)
```

## 4. Database Design (Sequelize Models)
- **User**: id, username, email, passwordHash, createdAt, updatedAt
- **Image**: id, url, description, createdAt, updatedAt
- **Caption**: id, text, userId (FK), imageId (FK), createdAt, updatedAt

## 5. Authentication & Authorization
- Register: `POST /auth/register`
- Login: `POST /auth/login` (returns JWT)
- Middleware to protect routes (e.g., captions creation)

## 6. CRUD Endpoints
- Images: `GET /images` (public)
- Captions: `GET /images/:id/captions` (public), `POST /images/:id/captions` (auth required)
- Users: `GET /users/:id` (optional, for profile)

## 7. Integrate Sequelize & PostgreSQL
- Configure Sequelize to connect to your PostgreSQL database.
- Sync models and test DB connection.

## 8. Localized Cache
- Use node-cache to cache frequently requested data (e.g., `GET /images`).

## 9. Swagger Documentation
- Set up Swagger UI at `/api-docs`.
- Document all endpoints, request/response schemas, and authentication.

## 10. Testing
- Use Postman to test all endpoints (register, login, CRUD, auth).

## 11. Deployment
- Prepare for deployment (set up scripts, environment variables).
- Deploy to Render (connect to hosted PostgreSQL, set up build/start commands).
