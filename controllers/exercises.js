const User = require("../models/user");
const Exercise = require("../models/exercise");
const { transformExercise } = require("../utils/index");

const getExerciseById = async (req, res, next) => {
  const exerciseId = req.params._id;

  const exerciseAttributes = [
    "user.username",
    "description",
    "duration",
    "date",
    "_id",
  ];

  try {
    const exercise = await Exercise.findByPk(exerciseId, {
      attributes: exerciseAttributes,
      raw: true,
      include: { model: User, required: false, attributes: [] },
    });

    if (!exercise) {
      return res.status(404).send("Not Found");
    }
    res.status(200).json(exercise);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

const getExercises = async (_, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    const transformedExercises = exercises.map((ex) => transformExercise(ex));
    res.status(200).json(transformedExercises);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

module.exports = {
  getExerciseById,
  getExercises,
};
