'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  
    // Insert demo images
    await queryInterface.bulkInsert('Images', [
      {
        url: '/public/images/dog.png',
        description: 'Funny dog',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: '/public/images/koala.png',
        description: 'Funny koala',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: '/public/images/scared_cat.png',
        description: 'Scared cat',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },



  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
