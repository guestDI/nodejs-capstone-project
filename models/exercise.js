const Sequelize = require("sequelize");
const sequelize = require("../db/database");

const Exercise = sequelize.define(
  "exercise",
  {
    _id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        isInt: true,
      },
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Exercise;
