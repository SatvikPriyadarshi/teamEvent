const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/teams', teamController.getAllTeams);
router.get('/createEvents', teamController.createEventsFromTeams);

module.exports = router;
