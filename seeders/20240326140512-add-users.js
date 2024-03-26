'use strict';

const bcrypt = require("bcrypt");
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
          password: await bcrypt.hash("password1", 10),
          location: "Antarktida",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      {
        name: "TikrasDarbuotojas2",
        password: await bcrypt.hash("password2", 10),
        location: "Antarktida",
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "KietasAdminas3",
        password: await bcrypt.hash("password3", 10),
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
