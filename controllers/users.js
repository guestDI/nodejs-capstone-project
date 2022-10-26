const { Op } = require("sequelize");
const {
  transformExercisesLog,
  transformError,
  transformExercise,
} = require("../utils");
const User = require("../models/user");
const Exercise = require("../models/exercise");

const getUsers = async (_, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
    });

    res.status(200).json(user);
  } catch (error) {
    return res.status(400).send(transformError(error));
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
      order: [["date", "ASC"]],
      include: { model: User, required: true, attributes: [] },
      limit,
    });

    res.status(200).json(transformExercisesLog(exercises));
  } catch (error) {
    return next(transformError(error));
  }
};

const createExercise = async (req, res, next) => {
  const userId = req.params._id;
  const { description, duration, date } = req.body;

  try {
    const exercise = await Exercise.create({
      description,
      duration: parseInt(duration),
      userId: userId,
      ...(date && { date: new Date(date) }), // todays's date will be applied if date doen't exist
    });

    res.status(200).json(transformExercise(exercise));
  } catch (error) {
    return next(transformError(error));
  }
};

module.exports = {
  createExercise,
  createUser,
  getUsers,
  getExercisesLogByUser,
};
