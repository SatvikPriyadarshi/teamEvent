const Team = require('../models/teamModel');
const Event = require('../models/eventModel');

exports.getAllTeams = async (req, res) => {
  try {
    const results = await Team.getAllTeams();
    res.json(results);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch teams", details: err.message });
  }
};

exports.createEventsFromTeams = async (req, res) => {
  try {
    const { game_id, season_id } = req.query;
    if (!game_id || !season_id) {
      return res.status(400).send({ error: "Missing game_id or season_id in query parameters" });
    }
    
    const teams = await Team.getTeamsByGameId(game_id);
    const totalTeams = teams.length;
    const totalEvents = Math.floor(totalTeams / 2);
    const events = [];
    let currentTimestamp = Math.floor(Date.now() / 1000); 

    for (let i = 0; i < totalEvents; i++) {
      const team1 = teams[i * 2];
      const team2 = teams[i * 2 + 1];

      if (team1 && team2) {
        events.push({
          event: `Event ${i + 1}`,
          team1: {
            id: team1.id,
            abbreviation: team1.abbreviation,
            location: team1.location,
            nickname: team1.nickname,
            bye_week: team1.bye_week,
            colors: team1.colors,
            status: team1.status
          },
          team2: {
            id: team2.id,
            abbreviation: team2.abbreviation,
            location: team2.location,
            nickname: team2.nickname,
            bye_week: team2.bye_week,
            colors: team2.colors,
            status: team2.status
          },
          eventDetails: {
            event_stat_id: 0,
            round_stat_id: 0,
            status_stat_id: 1,
            game_id: parseInt(game_id),
            season_id: parseInt(season_id),
            week: 1,
            event_type_id: 1,
            first_team_id: team1.id,
            second_team_id: team2.id,
            winner_team_id: 0,
            is_active: 'Y',
            is_tba: 'N',
            is_duplicate: 'N',
            is_duplicate_partner: 0,
            duplicate_game_number: '0',
            first_team_location: 'home',
            first_team: team1.abbreviation,
            second_team: team2.abbreviation,
            second_team_location: 'away',
            start_time: currentTimestamp,
            actual_start_time: currentTimestamp,
            game_started_time: 0,
            is_penalty_shot: 'N',
            is_under_review: 'N',
            is_shootout: 'N',
            is_game_started: 'N',
            is_completed: 'N',
            minutes: 0,
            period: 0,
            first_team_score: 0,
            second_team_score: 0,
            stat_fatching_time: 0,
            seconds: 0,
            division: '',
            event_time_remaining: 0,
            weatherDesc: '',
            precipitation: 0.000,
            temperature: 0,
            wind: '',
            name: '',
            sr_id: '',
            original_sr_id: '',
            scored_events: 1,
            is_projection: 0,
            created: new Date(),
            modified: new Date(),
            cron_time: 0,
            projection_time: 0
          }
        });
      
        currentTimestamp += 86400;
      }
    }

    const eventInserts = events.map(event => event.eventDetails);
    await Event.insertEvents(eventInserts);

    const extractedEvents = events.map(event => ({
      event: event.event,
      team1: event.team1,
      team2: event.team2,
      eventDetails: event.eventDetails
    }));

    res.json({
      message: 'Events created successfully!',
      status: 'success',
      totalTeams: totalTeams,
      totalEvents: events.length,
      events: extractedEvents
    });
  } catch (err) {
    res.status(500).send({ error: "Failed to create events", details: err.message });
  }
};
