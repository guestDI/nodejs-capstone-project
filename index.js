const express = require('express')
const fs = require('fs')
const path = require('path');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const { db } = require('./db/db')
const sequelize = require('./db/database')

const usersRoutes = require("./routes/users")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/api', usersRoutes)
app.use(express.static('public'))
app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use((_, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html')
})

// const db_sql_path = path.join(__dirname, 'db', 'repository.sql');
// const init_sql = fs.readFileSync(db_sql_path, 'utf-8')

const init_sql = `
CREATE TABLE IF NOT EXISTS User (
  _id VARCHAR(100) PRIMARY KEY,
  username VARCHAR(60) NOT NULL unique
);

CREATE TABLE IF NOT EXISTS Exercises (
  _id VARCHAR(100) PRIMARY KEY,
  user_id INTEGER,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL,
  date TEXT,
  FOREIGN KEY (user_id) REFERENCES user (_id)
);
`

// db.exec(init_sql, err => {
//   if (err) {
//     return console.error(err.message);
//   }

  // const sql_insert = `INSERT INTO User (username) VALUES
  // ('Mrs. Bridge'),
  // ('Libertine');`;

  // db.run(sql_insert, err => {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   console.log("Successful creation of 2 users");
  // });
// });

sequelize
  .sync({
    logging: console.log
  })
  .then(() => {
    console.log('Connection to database established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database: ', err);
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
