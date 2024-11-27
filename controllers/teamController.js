const Team = require('../models/teamModel');
const Event = require('../models/eventModel');
const mysql = require('mysql2/promise'); 
const con = require('../db');
exports.getAllTeams = (req, res) => {
  Team.getAllTeams((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};
exports.getTeamsByGameId = async (req, res) => {
  try {
    const game_id = req.params.game_id;
    const results = await Team.getTeamsByGameId(game_id);

    const totalTeams = results.length;
    const half = Math.ceil(totalTeams / 2);
    
    const team1 = results.slice(0, half);
    const team2 = results.slice(half);
    const events = [
      { event: `Game ${game_id} - Team 1`, teams: team1 },
      { event: `Game ${game_id} - Team 2`, teams: team2 }
    ];
    const eventInserts = events.map(event => ({
      game_id: game_id,
      first_team_id: event.teams[0].id,
      second_team_id: event.teams[1].id,
      is_active: 'Y'
    }));
    const result = await Event.insertEvents(eventInserts);
    const rowsInserted = {
      team1: team1.length,
      team2: team2.length
    };

    res.json({rowsInserted, events });
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.updateEvents = async (req, res) => {
  try {
    let  { game_id } = req.params; 
    const updateFields = req.body;
    if (!game_id) {
      return res.status(400).send({ message: "game_id is required to update the event." });
    }
    const fields = Object.keys(updateFields);
    if (fields.length === 0) {
      return res.status(400).send({ message: "No fields provided to update." });
    }
    if (updateFields.actual_start_time ) {
    const actual_start_time_unix_timestamp=Date.parse(updateFields.actual_start_time);
    updateFields.actual_start_time = Math.floor(actual_start_time_unix_timestamp / 1000)
    }
    if ( updateFields.start_time) {
    const time_unix_timestamp=Date.parse(updateFields.start_time);
    updateFields.start_time= Math.floor(time_unix_timestamp / 1000)
    }
    const updateQuery = `UPDATE events SET modified='${getCurrentDateTime()}' ,${fields.map(field => `${field} = ?`).join(", ")} WHERE game_id = ?;`;
    const values = [...fields.map(field => updateFields[field]), game_id];
    con.query(updateQuery, values, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Database error.", error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Event not found or no changes made." });
      }
      res.send({ message: "Event updated successfully.", result });
    });
  } catch (err) {
    console.error("Error in updateEvents controller:", err);
    res.status(500).send({ message: "An internal server error occurred.", error: err.message });
  }
};
const getCurrentDateTime = () => {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
};
