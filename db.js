const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Satvik@123', 
  database: 'drafters' 
});

connection.getConnection()
  .then(() => {
    console.log("Successfully connected to the database!");
  })
  .catch((err) => {
    console.error("Database connection error: ", err.message);
  });

module.exports = connection;


