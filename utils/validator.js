const { validationResult } = require("express-validator");
const User = require("../models/user");

const createUserSchema = {
  username: {
    in: ["body"],
    custom: {
      options: (value) => {
        if (value.length) {
          return User.findOne({
            username: value,
          }).then((user) => {
            if (user) {
              return Promise.reject("User already exist");
            }
          });
        }

        return true;
      },
    },
    isString: {
      errorMessage: "username must be a string",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "username must be at least 3 chars",
    },
    trim: true,
    escape: true,
  },
};

const createExerciseSchema = {
  _id: {
    in: ["params"],
    custom: {
      options: (value) => {
        return User.findByPk(value).then((user) => {
          if (!user) {
            return Promise.reject("User doesn't exist");
          }
        });
      },
    },
  },
  description: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Description field cannot be empty",
    },
    isString: {
      errorMessage: "Description must be a string",
    },
    trim: true,
    escape: true,
  },
  duration: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Duration field cannot be empty",
    },
    isInt: {
      errorMessage: "Duration must be an integer",
    },
  },
  date: {
    in: ["body"],
    optional: true,
    matches: {
      options: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/i,
      errorMessage: "Date must be in a correct format, e.g. 2022-10-13"
    },
    trim: true,
  },
};

const getExercisesLogSchema = {
  _id: {
    in: ["params"],
    notEmpty: true,
    errorMessage: "UserId is missed",
  },
  limit: {
    in: ["params"],
    optional: true,
    isInt: true,
    errorMessage: "Limit must be a valid number",
  },
  from: {
    in: ["params"],
    optional: true,
    matches: {
      options: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/i,
      errorMessage: "'From' must be in a correct format, e.g. 2022-10-13"
    },
  },
  to: {
    in: ["params"],
    optional: true,
    matches: {
      options: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/i,
      errorMessage: "'To' must be in a correct format, e.g. 2022-10-13"
    },
  },
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  createUserSchema,
  createExerciseSchema,
  getExercisesLogSchema,
  validate,
};
