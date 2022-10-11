const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const usersRoutes = require("./routes/users")

app.use(cors())
app.use('/api', usersRoutes)
app.use(express.static('public'))
app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use((_, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html')
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
