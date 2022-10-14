const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    "database",
    'user',
    'pass',
    {
      host: "localhost",
      dialect: "sqlite",
      storage: './db/exercises.sqlite',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  );

module.exports = sequelize  