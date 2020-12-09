"use strict";

//SKILLS
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("skills", [
      {
        name: "React",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Angular",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Java",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Python",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("skills", null, {});
  },
};
