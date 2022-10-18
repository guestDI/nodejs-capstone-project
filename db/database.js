const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "exercises",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "sqlite",
    storage: "./db/exercises.sqlite",
    sync: { force: false },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  }
);

module.exports = sequelize;
