const express = require('express')
const fs = require('fs')
const path = require('path');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
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
