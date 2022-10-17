const express = require("express");
const router = express.Router();

const { getExerciseById, getExercises } = require("../controllers/exercises");

router.get("/exercises/:_id", getExerciseById);
router.get("/exercises", getExercises);

module.exports = router;
