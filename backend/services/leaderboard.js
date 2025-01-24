const { Poll } = require("../models/poll");
const { Vote } = require("../models/vote");
const WebSocketService = require("../services/websocketService");

class Leaderboard {
  constructor(io, source = null) {
    this.websocketService = new WebSocketService(io);
    this.source = source;
  }
  async getLeaderboard() {
    const polls = await Poll.findAll();
    const leaderboard = {};

    for (const poll of polls) {
      const votes = await Vote.findAll({ where: { pollId: poll.id } });
      votes.forEach((vote) => {
        leaderboard[vote.option] = (leaderboard[vote.option] || 0) + 1;
      });
    }

    const sortedLeaderboard = Object.entries(leaderboard)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    if (this.source === "kafka") {
      this.websocketService.broadcastLeaderboard(leaderboard);
    }

    return sortedLeaderboard;
  }
}

module.exports = Leaderboard;
