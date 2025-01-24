const kafka = require("kafka-node");
const client = require("../config/kafka");

class KafkaProducer {
  constructor() {
    this.producer = new kafka.Producer(client);

    this.producer.on("ready", () => {
      console.log("Kafka Producer is connected and ready.");
    });

    this.producer.on("error", (err) => {
      console.error("Kafka Producer connection error:", err);
    });
  }

  sendVote(vote) {
    const payloads = [
      {
        topic: "votes",
        messages: JSON.stringify(vote),
        partition: 0,
      },
    ];

    console.log("Vote is going to send in Kafka");

    return new Promise((resolve, reject) => {
      this.producer.send(payloads, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}

module.exports = KafkaProducer;
