const sqlite3 = require('sqlite3').verbose();
const util = require('util');
const path = require('path');

// Connect with SQLite database
const db_path = path.join(__dirname, '../db', 'exercises-db');

const db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Successful connected to the database');
});

// db.close((err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });

module.exports = { db };