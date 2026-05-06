'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'demo_user',
        email: 'email@example.com',
        passwordHash: '$2b$10$abcdefghijklmnopqrstuv', // Example hash, replace with a real hash for production
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
