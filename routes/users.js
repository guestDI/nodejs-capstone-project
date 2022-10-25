const express = require("express");
const { checkSchema } = require("express-validator");
const {
  validate,
  createUserSchema,
  createExerciseSchema,
  getExercisesLogSchema,
} = require("../utils/validator");

const router = express.Router();

const {
  createUser,
  getUsers,
  createExercise,
  getExercisesLogByUser,
} = require("../controllers/users");

router.post("/users", checkSchema(createUserSchema), validate, createUser);
router.get("/users", getUsers);
router.post(
  "/users/:_id/exercises",
  checkSchema(createExerciseSchema),
  validate,
  createExercise
);
router.get(
  "/users/:userId/logs",
  checkSchema(getExercisesLogSchema),
  validate,
  getExercisesLogByUser
);

module.exports = router;
