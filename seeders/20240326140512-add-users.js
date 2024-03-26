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
    await queryInterface.bulkInsert("Users", [
        {
          name: "TikrasVartotojas1",
          password: "password",
          location: "Antarktida",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      {
        name: "TikrasDarbuotojas2",
        password: "password",
        location: "Antarktida",
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "KietasAdminas3",
        password: "password",
        location: "Antarktida",
        roleId: 3,
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
    await queryInterface.bulkDelete("User", null, {})
  }
};
