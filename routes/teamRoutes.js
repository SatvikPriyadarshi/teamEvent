
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/teams', teamController.getAllTeams);
router.post('/game/:game_id', teamController.getTeamsByGameId);
router.put('/update/:game_id', teamController.updateEvents);

module.exports = router;
