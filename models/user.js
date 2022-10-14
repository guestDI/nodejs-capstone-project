const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const User = sequelize.define('User', {
    _id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
        },
    username: Sequelize.STRING,
}, {
    timestamps: false
})

module.exports = User