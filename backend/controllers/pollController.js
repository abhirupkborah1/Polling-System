const PollService = require("../services/poll");

class PollController {
  static async createPoll(req, res) {
    try {
      const poll = await PollService.createPoll(req);
      res.status(201).json(poll);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPollResults(req, res) {
    try {
      const { id } = req.params;
      const results = await PollService.getPollResults(id);
      res.json(results);
    } catch (error) {
      if (error.status === 404) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  static async votePoll(req, res) {
    try {
      const { id } = req.params;
      const { option } = req.body;
      const vote = await PollService.votePoll(id, option);
      res.status(201).json(vote);
    } catch (error) {
      if (error.status === 404) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PollController;
