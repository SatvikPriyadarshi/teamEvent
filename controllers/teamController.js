const Team = require('../models/teamModel');
const Event = require('../models/eventModel');

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
