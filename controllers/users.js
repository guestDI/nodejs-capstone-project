const { Op, Sequelize } = require('sequelize')
const { transformExercisesLog } = require('../utils')
const User = require('../models/user')
const Exercise = require('../models/exercise')
const sequelize = require('../db/database')

const createUser = (req, res) => {
    User.create({
        username: req.body.username,
    })
    .then(user => {
        res.json(user._id);
    })
    .catch(error => {
        res.status(404).send(error);
    })
}

const getExercisesLogByUser = (req, res) => {
    const userId = req.params.userId

    const { to, from, limit } = req.query

    if(limit === '' || to === '' || from === ''){
        res.status(400).send('Bad Request');
    }

    const exerciseAttributes = ['user.username', 'description', 'duration', 'date', 'user._id'];
    Exercise.findAll({
        attributes : exerciseAttributes,
        raw: true,
        where: { 
            UserId: userId,
            date: {
                [Op.lt]: new Date(new Date("2022-10-14").getTime() + 60 * 60 * 24 * 1000 - 1)
            }
        },
        include: { model: User, required: true, attributes: [] },
        limit
    })
    .then(exercises => {
        res.json(transformExercisesLog(exercises));
        // res.json(exercises)
    })
    .catch(error => {
        res.status(404).send(error);
    })
}

const addExercise = (req, res) => {
    const userId = req.params._id
    const { description, duration, date } = req.body

    const exerciseDate = date ? new Date(date) : new Date()

    Exercise.create({
        description,
        duration,
        date: exerciseDate,
        UserId: userId
    })
    .then(exercise => {
        res.json(exercise._id);
    })
    .catch(error => {
        res.status(404).send(error);
    })
}

const getExercise = (req, res) => {
    const exerciseId = req.params._id

    const exerciseAttributes = ['user.username', 'description', 'duration', 'date', '_id'];
    Exercise.findByPk(exerciseId, {
        attributes : exerciseAttributes,
        raw: true,
        include: { model: User, required: false, attributes: [] },
    })
        .then(exercise => {
            res.json(exercise);
        })
        .catch(error => {
            res.status(404).send(error);
        })
}


const getUsers = (_, res) => {
    User.findAll()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(404).send(error);
        })
  }

module.exports = {
    addExercise,
    createUser,
    getUsers,
    getExercisesLogByUser,
    getExercise
}  