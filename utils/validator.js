const { check, validationResult } = require("express-validator");

const userValidationRules = () => {
  return check("username")
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 chars")
    .trim()
    .escape();
};

const exerciseValidationRules = () => {
  return [
    check("description")
      .notEmpty()
      .withMessage((_, { path }) => {
        return `${path} should not be empty`;
      })
      .trim()
      .escape(),
    check("duration")
      .notEmpty()
      .isInt()
      .withMessage("duration should be an integer"),
  ];
};

const queryLogValidationRules = () => {
  return [
    check("limit").optional().isInt().withMessage("limit must be a number"),
    check(["from", "to"])
      .optional()
      .isISO8601()
      .withMessage((_, { path }) => `'${path}' should be a valid date value`)
      .trim(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
  exerciseValidationRules,
  queryLogValidationRules,
};
