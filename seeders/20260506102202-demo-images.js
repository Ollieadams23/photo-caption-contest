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
      },
      {
        url: '/public/images/depp.png',
        description: 'J Depp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: '/public/images/seals.png',
        description: 'Funny seals',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },



async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Images', {
    url: [
      '/public/images/dog.png',
      '/public/images/koala.png',
      '/public/images/scared_cat.png',
      '/public/images/depp.png',
      '/public/images/seals.png'
    ]
  }, {});
}
};