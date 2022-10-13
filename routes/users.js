const express = require("express");
const router = express.Router();

const { addUser, getUsers, addExercise, getExerciseLog } = require("../controllers/users");

router.post('/users', addUser);
router.get('/users', getUsers);
router.post('/users/:_id/exercises', addExercise);
router.get('/users/:userId/logs', getExerciseLog);

module.exports = router;