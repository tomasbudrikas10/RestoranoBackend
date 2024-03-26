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
    await queryInterface.bulkInsert("Products", [
      {
        name: "Produktas A",
        description: "Labai skanus maistinis produktas, pagamintas iš skanių ingredientų",
        price: 10.50,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas B",
        description: "Labai skanus maistinis produktas, pagamintas iš skanių ingredientų",
        price: 15.50,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas C",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: false,
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
    await queryInterface.bulkDelete('Products', null, {})
  }
};
