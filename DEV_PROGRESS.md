# Developer Progress Log

This file tracks each completed step in the Photo Caption Contest backend project. Update this file after finishing each step to keep a clear record of your progress.


## Progress Checklist

- [x] Project initialized (npm, git)
- [ ] Dependencies installed
- [ ] Project structure created
- [x] Database models defined
- [x] Sequelize & PostgreSQL configured
- [ ] Authentication implemented
- [ ] CRUD endpoints created
- [ ] Local cache added
- [ ] Swagger documentation set up
- [ ] Endpoints tested with Postman
- [ ] Deployment to Render completed

---



## Step Log

- **[2026-05-06]** Initialized project with npm and git. Created GitHub repo using GitHub CLI. Installed all required dependencies (Express, Sequelize, pg, bcrypt, jsonwebtoken, dotenv, swagger-jsdoc, swagger-ui-express, node-cache, etc.).
- **[2026-05-06]** Configured Sequelize and PostgreSQL. Set up config/config.json, created the database, and verified connection with `npx sequelize-cli db:migrate:status` (no errors).
- **[2026-05-06]** Generated models and migration files for User, Image, and Caption. Added foreign key constraints. Ran `npx sequelize-cli db:migrate` to create the schema in PostgreSQL.
