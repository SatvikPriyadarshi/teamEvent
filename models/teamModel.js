const connection = require('../db');

const Team = {
  getAllTeams: (callback) => {
    connection.query('SELECT * FROM teams', callback);
  },
  
  getTeamsByGameId: (game_id) => { 
    return new Promise((resolve, reject) => { 
    connection.query('SELECT * FROM teams WHERE game_id = ?', [game_id], (err, results) => { 
      if (err) return reject(err); 
      resolve(results); 
    }); 
  }); 
}
};

module.exports = Team;
