'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  async up (queryInterface, Sequelize) {
    const password = process.env.ADMIN_PASSWORD || 'admin';
    const passwordHash = await bcrypt.hash(password, 10);
    await queryInterface.bulkInsert('Users', [
      {
        username: process.env.ADMIN_USERNAME || 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@admin.com',
        passwordHash: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
