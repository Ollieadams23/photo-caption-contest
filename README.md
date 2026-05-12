# Photo Caption Contest

A web application for uploading images and submitting creative captions. Built with Node.js, Express, PostgreSQL (Sequelize), Redis, and features user authentication, image management, and content moderation.

## Features
- User registration and login
- Upload images or add by URL
- Submit captions for images
- Admin panel for managing images
- Profanity filter for captions/comments
- Redis caching for fast image loading (optional; app still works if Redis is unavailable)

## Setup
1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure your database in `.env` and set up PostgreSQL
4. (Optional, for Redis):
    - If using Redis on Render, add the `REDIS_URL` environment variable in the Render dashboard. Example:
       ```
       REDIS_URL=redis://red-xxxx:password@redis-xxxx:6379
       ```
    - Locally, you can add `REDIS_URL` to your `.env` file if you want to use a non-default Redis server. If not set, the app defaults to a local Redis instance.
4. Run migrations and seeders:
   ```sh
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
   > **Note:**
   > - Make sure you have installed all dependencies (`npm install`) before running seeders. Seeders may hash passwords using bcrypt and read values from your `.env` file for Sequelize.
   > - To set up the default admin user, add the following variables to your `.env` file:
   >   - `ADMIN_USERNAME` (default: `admin`)
   >   - `ADMIN_PASSWORD` (default: `admin`)
   >   - `ADMIN_EMAIL` (default: `admin@admin.com`)
   >   If these variables are not set, the seeder will use the default values above.
5. Start the server:
   ```sh
   npm start
   ```

## Folder Structure
- `app.js` - Main server entry
- `models/` - Sequelize models
- `routes/` - Express route handlers
- `migrations/` & `seeders/` - DB schema/data
- `public/` - Static files (HTML, CSS, images)
- `private/` - Authenticated HTML pages

## API Documentation (Swagger)

Interactive API docs are available via Swagger UI:

- All main endpoints are documented using Swagger JSDoc comments in the route files.
- After starting the server, visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser to view and interact with the API documentation.
- The docs are always up-to-date with your code and support live testing of endpoints.

## Development
- See `DEV_GUIDE.md` for backend details
- See `DEV_PROGRESS.md` for development log

## License
MIT
