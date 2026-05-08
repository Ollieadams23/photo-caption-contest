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
        url: '/images/dog.png',
        description: 'Funny dog',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: '/images/koala.png',
        description: 'Funny koala',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: '/images/scared_cat.png',
        description: 'Scared cat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: '/images/depp.png',
        description: 'J Depp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: '/images/seals.png',
        description: 'Funny seals',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },



async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Images', {
    url: [
      '/images/dog.png',
      '/images/koala.png',
      '/images/scared_cat.png',
      '/images/depp.png',
      '/images/seals.png'
    ]
  }, {});
}
};