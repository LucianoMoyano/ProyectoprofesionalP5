"use strict";

//USERS
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "Emi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Diego",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pili",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lucho",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gonza",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
