const connection = require('../db');

const Event = {
  insertEvents: (events) => {
    return new Promise((resolve, reject) => {
      const values = events.map(event => [
        event.game_id, event.first_team_id, event.second_team_id, event.is_active
      ]);

      const sql = `
        INSERT INTO events (game_id, first_team_id, second_team_id, is_active)
        VALUES ?
      `;

      connection.query(sql, [values], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = Event;
