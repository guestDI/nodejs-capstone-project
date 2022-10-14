const { db } = require('../db/db') 
const { v4: uuidv4 } = require('uuid')
const { getExercisesLog } = require('../services/user_service')

const addUser = (req, res) => {
    db.run(`INSERT INTO user (_id, username) VALUES (?,?)`,
        [uuidv4(), req.body.username],
        function (err) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "user_id": this.lastID
            })
        });
}

const getExerciseLog = (req, res) => {
    const userId = req.params.userId

   const limit = req.query.limit ? `LIMIT ${req.query.limit}` : ''

    const sql = `SELECT b.username, b._id, a.description, a.duration, a.date FROM Exercises as a INNER JOIN User AS b 
    ON a.user_id = b._id WHERE a.user_id = '${userId}' ${limit};`

    db.all(sql, [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }

        res.send( getExercisesLog(rows) );
      });
}

const addExercise = (req, res) => {
    const userId = req.params._id
    const { description, duration, date } = req.body

    const dated = date ? new Date(date) : new Date()

    db.run(`INSERT INTO exercises (_id, user_id, description, duration, date) VALUES (?,?,?,?,?)`,
    [uuidv4(), userId, description, duration, dated.toISOString() ],
    function (err) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.status(201).json({
            "exercise_id": this.lastID
        })
    });
}  

const getUsers = (_, res) => {
  const sql = "SELECT * FROM User ORDER BY username";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send({ rows });
  });
}

module.exports = {
    addExercise,
    addUser,
    getUsers,
    getExerciseLog
}  