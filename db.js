const mysql = require('mysql2');


const con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'drafters',
 
});

con.getConnection((err, connection) => {
  if (err) {
    console.error("Oops! There was an error connecting to the database:", err.stack);
    process.exit(1); // Exit the application if the connection fails
  } else {
    console.log("Successfully connected to the database!");

  }
});

module.exports = con;
