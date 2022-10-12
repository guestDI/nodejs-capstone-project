const express = require('express')
const fs = require('fs')
const path = require('path');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const { db } = require('./db/db')

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

const db_sql_path = path.join(__dirname, 'db', 'repository.sql');
const init_sql = fs.readFileSync(db_sql_path, 'utf-8')

db.run(init_sql, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'User' table");
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
