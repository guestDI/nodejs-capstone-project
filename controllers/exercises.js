const User = require("../models/user");
const Exercise = require("../models/exercise");
const { transformExerciseResponse } = require("../utils/index");

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
      res.status(404).send("Not Found");
      next();
    }
    res.json(exercise);
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    error.statusCode = 400;
    next(error);
  }
};

const getExercises = async (_, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    const transformedExercises = exercises.map((ex) =>
      transformExerciseResponse(ex)
    );
    res.json(transformedExercises);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = {
  getExerciseById,
  getExercises,
};
