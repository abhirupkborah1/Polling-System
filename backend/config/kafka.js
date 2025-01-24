const kafka = require("kafka-node");
require("dotenv").config();

const client = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_BROKER,
});

module.exports = client;
