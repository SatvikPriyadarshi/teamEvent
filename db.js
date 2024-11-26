const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Satvik@123', 
  database: 'drafters' 
});

connection.connect((err) => {
  if (err) {
    console.error("Oops! There was an error connecting to the database. Please try again.", err.stack);
    return;
  }
  console.log("Successfully connected to the database!");
});

module.exports = connection;
