# Developer Progress Log

This file tracks each completed step in the Photo Caption Contest backend project. Update this file after finishing each step to keep a clear record of your progress.


## Progress Checklist
- **[2026-05-11]** Refactored Sequelize config to use environment variables via .env and config.js. Ensured dotenv is loaded for all CLI operations (migrations, seeders). Updated .sequelizerc to point to config.js. Removed config.json to prevent conflicts.
- **[2026-05-11]** Updated demo-user seeder to hash the admin password from .env using bcrypt at runtime. Seeder now uses ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_EMAIL from .env, with defaults if not set.
- **[2026-05-11]** Fixed persistent "password must be a string" error by ensuring .env is loaded in config.js and models/index.js, and by removing config.json. Verified CLI and app both use environment variables.
- **[2026-05-11]** Updated README to document .env admin variables and their defaults. Added onboarding notes for dependency install and seeder requirements.

- [x] Project initialized (npm, git)
- [x] Dependencies installed
- [x] Project structure created
- [x] Database models defined
- [x] Sequelize & PostgreSQL configured
- [x] Authentication implemented
- [x] CRUD endpoints created
- [x] Local cache added (Redis installed and configured for caching images and captions)

- **[2026-05-08]** Installed and configured Redis for local caching. Added instructions for installing Redis server and the Node.js redis client. Documented that Redis can be used for both development and production, and is suitable for caching images and captions.
- [x] Swagger documentation set up
- [x] Endpoints tested with Postman
- [x] Deployment to Render completed

---





- **[2026-05-07]** Added authentication endpoints (register, login, logout) using bcrypt for password hashing and express-session for user sessions. Created routes/auth.js and mounted it in app.js. Documented that bcrypt hashes include a unique salt for each password, ensuring even identical passwords have different hashes. Salt is stored as part of the hash string and is handled automatically by bcrypt during verification.

- **[2026-05-06]** Initialized project with npm and git. Created GitHub repo using GitHub CLI. Installed all required dependencies (Express, Sequelize, pg, bcrypt, jsonwebtoken, dotenv, swagger-jsdoc, swagger-ui-express, node-cache, etc.).
- **[2026-05-06]** Configured Sequelize and PostgreSQL. Set up config/config.json, created the database, and verified connection with `npx sequelize-cli db:migrate:status` (no errors).
- **[2026-05-07]** Implemented endpoints for retrieving all images, retrieving a single image (with captions), retrieving all captions for an image, and posting a caption to an image. Added error handling for not found and invalid requests.
