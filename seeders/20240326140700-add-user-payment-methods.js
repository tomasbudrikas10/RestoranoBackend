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
    await queryInterface.bulkInsert("UserPaymentMethods", [
      {
        userId: 1,
        cardNumber: 1000_4000_7000_9000,
        cvc: 345,
      },
      {
        userId: 1,
        cardNumber: 2000_4000_7000_9000,
        cvc: 456,
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
    await queryInterface.bulkDelete("UserPaymentMethods", null, {})
  }
};
