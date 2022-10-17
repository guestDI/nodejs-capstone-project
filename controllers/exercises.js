const User = require('../models/user')
const Exercise = require('../models/exercise')

const getExerciseById = (req, res) => {
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

const getExercises = (_, res) => {
    Exercise.findAll()
        .then(exercises => {
            res.json(exercises);
        })
        .catch(error => {
            res.status(404).send(error);
        })
}

module.exports = {
    getExerciseById,
    getExercises
}