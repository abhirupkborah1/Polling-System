const kafka = require("kafka-node");
require("dotenv").config();

// Function to create topic
async function createTopicIfNotExists(topicName) {
  try {
    const client = new kafka.KafkaClient({
      kafkaHost: process.env.KAFKA_BROKER,
    });

    const topicsToCreate = [
      {
        topic: topicName,
        partitions: process.env.KAFKA_PARTITION,
        replicationFactor: 1,
      },
    ];

    client.createTopics(topicsToCreate, (error, result) => {
      if (error) {
        console.error(`Error creating topic: ${error}`);
      } else {
        console.log(
          `Topic created or already exists: ${JSON.stringify(result)}`
        );
      }
      client.close();
    });
  } catch (err) {
    console.error(`Failed to create topic: ${err}`);
  }
}

module.exports = { createTopicIfNotExists };
