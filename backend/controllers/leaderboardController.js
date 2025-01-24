const Leaderboard = require("../services/leaderboard")

class LeaderboardController {
  static async getLeaderboard(req, res) {
    try {
      const leaderboardService = new Leaderboard(req.app.get('io'));
      const leaderboard = await leaderboardService.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = LeaderboardController;
