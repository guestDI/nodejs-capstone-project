const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const usersRoutes = require("./routes/users");
const exercisesRoutes = require("./routes/exercises");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", usersRoutes);
app.use("/api", exercisesRoutes);
app.use(express.static("public"));
app.get("/", (_, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use((_, res) => {
  return res.status(404).sendFile(__dirname + "/views/404.html");
});

module.exports = app;
