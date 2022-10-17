const { Op } = require("sequelize");
const { transformExercisesLog, parseDatabaseError } = require("../utils");
const User = require("../models/user");
const Exercise = require("../models/exercise");

const createUser = (req, res) => {
  User.create({
    username: req.body.username,
  })
    .then((user) => {
      res.json(user._id);
    })
    .catch((error) => {
      return res.send({
        errors: parseDatabaseError(error),
      });
    });
};

const getExercisesLogByUser = (req, res) => {
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

  Exercise.findAndCountAll({
    attributes: exerciseAttributes,
    raw: true,
    where: {
      UserId: userId,
      ...((from || to) && { date: dateFilter }),
    },
    include: { model: User, required: true, attributes: [] },
    limit,
  })
    .then((exercises) => {
      res.json(transformExercisesLog(exercises));
    })
    .catch((error) => {
      return res.status(400).send(error);
    });
};

const addExercise = (req, res) => {
  const userId = req.params._id;
  const { description, duration, date } = req.body;

  Exercise.create({
    description,
    duration,
    UserId: userId,
    ...(date && { date: new Date(date) }),
  })
    .then((exercise) => {
      res.json(exercise._id);
    })
    .catch((error) => {
      return res.status(400).send(error);
    });
};

const getUsers = (_, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      return res.status(402).send(error);
    });
};

module.exports = {
  addExercise,
  createUser,
  getUsers,
  getExercisesLogByUser,
};
