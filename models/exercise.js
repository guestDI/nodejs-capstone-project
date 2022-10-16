const Sequelize = require('sequelize');
const sequelize = require('../db/database')
const User = require('./user')

const Exercise = sequelize.define('Exercise', {
    _id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
        },
    description: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    date: Sequelize.DATE,
}, {
    timestamps: false
})

Exercise.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })

module.exports = Exercise