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
2. Set up your `.env` file with database credentials.
3. Run migrations and seeders:
   ```sh
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
4. Start the server:
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
- **redis**: Caching image lists and metadata for performance
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

## Deployment
- Prepare for deployment to Render or similar platforms.
- Set environment variables for production.

---

For more details, see `DEV_PROGRESS.md` for a step-by-step log of development progress.
