const S = require("sequelize");
const db = require("../db");

class Skill extends S.Model {}
Skill.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "skill" }
);

module.exports = Skill;
