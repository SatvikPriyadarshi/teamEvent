const connection = require('../db');

const Event = {
  insertEvents: async (events) => {
    try {
      const queries = events.map((event) => connection.query('INSERT INTO events SET ?', event));
      await Promise.all(queries); 
    } catch (err) {
      throw new Error("Error inserting events: " + err.message);
    }
  }
};

module.exports = Event;
