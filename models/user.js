const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const User = sequelize.define('User', {
    _id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
        },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    } 
}, {
    timestamps: false
})

module.exports = User