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
      {
        name: "TikrąąąęėęsVartotojas1345345",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas14554",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas1543635",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas11346",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas145745",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas17776",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas1444444",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas13333",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas12222",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas1",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas12223",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas132321",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas14332",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas11231",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas13232",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas123123",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas11221",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas1232",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas12323",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TikrasVartotojas121312",
        password: await bcrypt.hash("password1", 10),
        location: "Antarktida",
        roleId: 1,
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
