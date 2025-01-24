const { Vote } = require("../models/vote");
const { Poll } = require("../models/poll");
const KafkaProducer = require("./kafkaProducer");
const kafkaProducer = new KafkaProducer();
const NotFoundError = require('../utils/error');

class PollService {
  static async createPoll(req) {
    const { title, options } = req.body;
    const poll = await Poll.create({ title, options });
    return poll;
  }

  static async getPollResults(pollId) {
    const poll = await Poll.findByPk(pollId);

    if (!poll) {
      throw new NotFoundError(`Poll with ID ${pollId} not found`);
    }

    const votes = await Vote.findAll({ where: { pollId } });

    const results = poll.options.reduce((acc, option) => {
      acc[option.toLowerCase()] = 0;
      return acc;
    }, {});

    votes.forEach((vote) => {
      const option = vote.option.toLowerCase();
      results[option]++;
    });

    return results;
  }

  static async votePoll(pollId, option) {
    const poll = await Poll.findByPk(pollId);

    if (!poll) {
      throw new NotFoundError(`Poll with ID ${pollId} not found`);
    }

    const vote = { pollId, option };
    await kafkaProducer.sendVote(vote);

    return vote;
  }
}

module.exports = PollService;
