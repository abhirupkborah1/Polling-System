const express = require("express");
const LeaderboardController = require("../controllers/leaderboardController");

const router = express.Router();

router.get("/", LeaderboardController.getLeaderboard);

module.exports = router;
