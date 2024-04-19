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
    await queryInterface.bulkInsert('Orders', [
      {
        userId: 1,
        stateId: 1,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        stateId: 2,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        stateId: 3,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        stateId: 1,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        stateId: 2,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        stateId: 3,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        stateId: 1,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        stateId: 2,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        stateId: 3,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        stateId: 1,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        stateId: 2,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        stateId: 3,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        stateId: 1,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        stateId: 2,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        stateId: 3,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        stateId: 1,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        stateId: 2,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        stateId: 3,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        stateId: 1,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        stateId: 2,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        stateId: 3,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Orders", null, {})
  }
};
