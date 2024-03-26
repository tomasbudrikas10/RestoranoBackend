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
    await queryInterface.bulkInsert("OrderStates", [
      {
        name: "Sukurtas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Priimtas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Paruoštas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vežamas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Atliktas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Atšauktas",
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
    await queryInterface.bulkDelete("OrderStates", null, {})
  }
};
