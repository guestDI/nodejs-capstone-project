const { Op } = require("sequelize");
const {
  transformExercisesLog,
  parseDatabaseError,
  transformExerciseResponse,
} = require("../utils");
const User = require("../models/user");
const Exercise = require("../models/exercise");

const getUsers = async (_, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
    });

    res.json(user);
  } catch (error) {
    return res.send(parseDatabaseError(error));
  }
};

const getExercisesLogByUser = async (req, res, next) => {
  const userId = req.params.userId;

  const { to, from, limit } = req.query;

  const dateFilter = {
    ...(to && {
      [Op.lt]: new Date(new Date(to).getTime() + 60 * 60 * 24 * 1000 - 1),
    }),
    ...(from && { [Op.gt]: new Date(from) }),
  };

  const exerciseAttributes = [
    "user.username",
    "description",
    "duration",
    "date",
    "user._id",
  ];

  try {
    const exercises = await Exercise.findAndCountAll({
      attributes: exerciseAttributes,
      raw: true,
      where: {
        userId: userId,
        ...((from || to) && { date: dateFilter }),
      },
      include: { model: User, required: true, attributes: [] },
      limit,
    });

    res.json(transformExercisesLog(exercises));
  } catch (error) {
    next(error);
  }
};

const addExercise = async (req, res) => {
  const userId = req.params._id;
  const { description, duration, date } = req.body;

  try {
    const exercise = await Exercise.create({
      description,
      duration: parseInt(duration),
      userId: userId,
      ...(date && { date: new Date(date) }),
    });

    res.json(transformExerciseResponse(exercise));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addExercise,
  createUser,
  getUsers,
  getExercisesLogByUser,
};
