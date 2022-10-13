const { db } = require('../db/db') 

const addUser = (req, res) => {
    db.run(`INSERT INTO user (username) VALUES (?)`,
        [req.body.username],
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

    const sql = `SELECT a.* FROM Exercises as a INNER JOIN User AS b 
    ON a.user_id = b._id WHERE b._id = ${userId};`

    db.all(sql, [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }
        res.send({ rows });
      });
}

const addExercise = (req, res) => {
    const userId = req.params._id
    const { description, duration, date } = req.body

    const dateInMilliseconds = date ? new Date(date).getTime() : new Date().getTime()

    db.run(`INSERT INTO exercises (user_id, description, duration, date) VALUES (?,?,?,?)`,
    [userId, description, duration, dateInMilliseconds.toString()],
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