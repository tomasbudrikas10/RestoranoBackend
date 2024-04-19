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
    await queryInterface.bulkInsert("OrderItems", [
      {
        orderId: 1,
        productId: 1,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 2,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 2,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 2,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 3,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 4,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 5,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 6,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 7,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 8,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 9,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 10,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 11,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 12,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 13,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 14,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 15,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 16,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 17,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 18,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 19,
        quantity: 3,
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
    await queryInterface.bulkDelete("OrderItems", null, {})
  }
};
