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
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas D",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas E",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas F",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas G",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas H",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas I",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas J",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas K",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas L",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas M",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas N",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas O",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas P",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas Q",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas R",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas S",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Produktas T",
        description: "Nelabai skanus maistinis produktas, pagamintas iš nelabai skanių ingredientų",
        price: 20.39,
        isAvailable: true,
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
