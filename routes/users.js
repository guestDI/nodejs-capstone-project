const express = require("express");
const {
  userValidationRules,
  validate,
  exerciseValidationRules,
  queryLogValidationRules,
} = require("../utils/validator");

const router = express.Router();

const {
  createUser,
  getUsers,
  addExercise,
  getExercisesLogByUser,
} = require("../controllers/users");

router.post("/users", userValidationRules(), validate, createUser);
router.get("/users", getUsers);
router.post(
  "/users/:_id/exercises",
  exerciseValidationRules(),
  validate,
  addExercise
);
router.get(
  "/users/:userId/logs",
  queryLogValidationRules(),
  validate,
  getExercisesLogByUser
);

module.exports = router;
