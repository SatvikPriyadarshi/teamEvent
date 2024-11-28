const connection = require('../db');

const Team = {
  getAllTeams: async () => {
    try {
      const [results] = await connection.query('SELECT * FROM teams');
      return results;
    } catch (err) {
      throw new Error("Error fetching all teams: " + err.message);
    }
  },

  getTeamsByGameId: async (game_id) => {
    try {
      const [results] = await connection.query('SELECT DISTINCT abbreviation, id, location, nickname, bye_week, colors, status FROM teams WHERE game_id = ?', [game_id]);
      return results;
    } catch (err) {
      throw new Error("Error fetching teams by game_id: " + err.message);
    }
  }
};

module.exports = Team;
