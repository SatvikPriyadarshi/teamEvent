
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/teams', teamController.getAllTeams);
router.get('/game/:game_id', teamController.getTeamsByGameId);

module.exports = router;
