const Sequelize = require("sequelize");
const sequelize = require("../db/database");
const Exercise = require("./exercise");

const User = sequelize.define(
  "user",
  {
    _id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Exercise, { onDelete: "CASCADE" });
Exercise.belongsTo(User, { constraints: true });

module.exports = User;
