# Photo Caption Contest Backend - Developer Guide

Welcome! This guide explains the backend structure, setup, and how to add or alter features for the Photo Caption Contest platform.

## Table of Contents
- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Architecture](#architecture)
- [Key Libraries](#key-libraries)
- [Adding or Modifying Features](#adding-or-modifying-features)
- [Authentication Details](#authentication-details)
- [Database & Models](#database--models)
- [Testing](#testing)
- [Deployment](#deployment)

---

## Project Overview
This backend is built with Node.js, Express, Sequelize (PostgreSQL), and supports user authentication, image/caption endpoints, and session management.

## Setup Instructions
1. Clone the repo and install dependencies:
   ```sh
   npm install
   ```
2. Set up your `.env` file with database credentials and (optionally) a Redis connection URL.
3. Run migrations and seeders:
   ```sh
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
4. (Optional, for Redis on Render):
    - If deploying to Render and using a managed Redis instance, add the `REDIS_URL` environment variable in the Render dashboard. Example:
       ```
       REDIS_URL=redis://red-xxxx:password@redis-xxxx:6379
       ```
    - Locally, you can add `REDIS_URL` to your `.env` file if you want to use a non-default Redis server.
5. Start the server:
   ```sh
   npm start
   ```

## Architecture
- `app.js`: Main entry, middleware, routes, DB connection.
- `models/`: Sequelize models (User, Image, Caption).
- `migrations/` & `seeders/`: DB schema and demo data.
- `routes/`: Express routers (images, captions, auth).
- `controllers/`: (If present) Business logic for routes.
- `public/`: Static files (HTML, CSS, JS).

## Key Libraries
- **express**: Web framework
- **sequelize**: ORM for PostgreSQL
- **bcrypt**: Password hashing
- **express-session**: Session management
- **redis**: Caching image lists and metadata for performance. If Redis is unavailable, the app will still run, but caching will be disabled.
- **multer**: File upload handling for images
- **bad-words** or **leo-profanity**: Profanity filter for captions/comments

## Adding or Modifying Features
- Add new endpoints in `routes/` and (optionally) `controllers/`.
- Update or add Sequelize models in `models/` and run migrations if schema changes.
- Use `bcrypt` for password handling.
- Use a profanity filter (see `routes/captions.js`) to block inappropriate captions/comments.
- Redis cache is automatically invalidated when images are added or deleted.
- Update `DEV_PROGRESS.md` after major changes.

## Authentication Details
- Registration hashes passwords with bcrypt and stores only the hash.
- Login compares the provided password with the stored hash.
- Sessions are managed with express-session.
- See `routes/auth.js` for implementation.

## Database & Models
- Models: User, Image, Caption (see `models/`)
- Use migrations for schema changes.
- Use seeders for demo/test data.

## Testing
- Use Postman or similar tools to test endpoints.
- Check error handling for all routes.

## API Documentation (Swagger UI)
Interactive API documentation is available via Swagger UI:

- All main endpoints are documented using Swagger JSDoc comments in the route files.
- After starting the server, open your browser and go to:
   - Local: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
   - Render: `https://your-app.onrender.com/api-docs` (replace with your actual Render URL)
- The Swagger UI allows you to view, explore, and test API endpoints directly from your browser.
- The docs are always up-to-date with your code and support live testing of endpoints.

## Deployment
- Prepare for deployment to Render or similar platforms.
- Set environment variables for production, including `REDIS_URL` if using Redis on Render. If `REDIS_URL` is not set, the app will default to a local Redis instance.

---

For more details, see `DEV_PROGRESS.md` for a step-by-step log of development progress.
