const express = require("express");
const router = express.Router();

const { createUser, getUsers, addExercise, getExercisesLogByUser } = require("../controllers/users");

router.post('/users', createUser);
router.get('/users', getUsers);
router.post('/users/:_id/exercises', addExercise);
router.get('/users/:userId/logs', getExercisesLogByUser);

module.exports = router;