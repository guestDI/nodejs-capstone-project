const app = require("./app");
const sequelize = require("./db/database");

sequelize
  .sync()
  .then(() => {
    console.log("Connection to database established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database: ", err);
  });

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
