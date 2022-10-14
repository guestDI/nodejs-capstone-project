const { getExercisesLog } = require('../services/user_service')
const User = require('../models/user')
const Exercise = require('../models/exercise')

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

const getExerciseLog = (req, res) => {
    const userId = req.params.userId

    const limit = req.query.limit

    Exercise.findAndCountAll({
        where: { UserId: userId },
        include: { model: User, required: true },
        limit
    })
    .then(exercises => {
        res.json(exercises);
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
    getExerciseLog
}  