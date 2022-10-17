const Sequelize = require("sequelize");
const sequelize = require("../db/database");
const User = require("./user");

const Exercise = sequelize.define(
  "Exercise",
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

Exercise.belongsTo(User, { constraints: true });
User.hasMany(Exercise);

module.exports = Exercise;
