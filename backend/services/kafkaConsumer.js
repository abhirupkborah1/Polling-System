const kafka = require("kafka-node");
const client = require("../config/kafka");
const { Vote } = require("../models/vote");
const WebSocketService = require("./websocketService");
const LeaderboardService = require("./leaderboard");
require("dotenv").config();

class KafkaConsumer {
  constructor(io) {
    this.consumer = new kafka.Consumer(
      client,
      [{ topic: process.env.KAFKA_TOPIC, partition: 0 }],
      { autoCommit: true }
    );

    this.websocketService = new WebSocketService(io);
    this.leaderboardService = new LeaderboardService(io, "kafka");

    this.consumer.on("message", async (message) => {
      try {
        const vote = JSON.parse(message.value);
        console.log("Vote is retrive by Kafka");
        await this.processVote(vote);
      } catch (error) {
        console.error("Error processing vote:", error);
      }
    });
  }

  async processVote(vote) {
    const newVote = await Vote.create(vote);
    const updatedPollResults = await this.calculatePollResults(vote.pollId);

    await this.leaderboardService.getLeaderboard();

    this.websocketService.broadcastPollUpdate(vote.pollId, updatedPollResults);
  }

  async calculatePollResults(pollId) {
    const votes = await Vote.findAll({ where: { pollId } });
    const results = votes.reduce((acc, vote) => {
      acc[vote.option] = (acc[vote.option] || 0) + 1;
      return acc;
    }, {});
    return results;
  }
}

module.exports = KafkaConsumer;
