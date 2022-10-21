const express = require("express");
const { checkSchema } = require("express-validator");
const router = express.Router();
const { validate, getExerciseSchema } = require("../utils/validator");

const { getExerciseById, getExercises } = require("../controllers/exercises");

router.get(
  "/exercises/:_id",
  checkSchema(getExerciseSchema),
  validate,
  getExerciseById
);
router.get("/exercises", getExercises);

module.exports = router;
