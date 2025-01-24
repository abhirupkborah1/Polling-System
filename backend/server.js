const express = require("express");
const http = require("http");
const sequelize = require("./config/database");
const WebSocketService = require("./services/websocketService");
const KafkaConsumer = require("./services/kafkaConsumer");
const KafkaProducer = require("./services/kafkaProducer");
const pollRoutes = require("./routes/pollRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const { createTopicIfNotExists } = require("./config/kafka-topic");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
app.set("io", io);

app.use(express.json());

//Health Check
app.get("/", (req, res) => {
  res.send("Polling System Backend is Running!");
});

//Routes
app.use("/polls", pollRoutes);
app.use("/leaderboard", leaderboardRoutes);

// Initialize
const PORT = process.env.PORT || 3000;
const ws = new WebSocketService(server);
const kafkaProducer = new KafkaProducer();
createTopicIfNotExists(process.env.KAFKA_TOPIC).then(() => {
  console.log(`Topic Successfully Created`);
});
const kafkaConsumer = new KafkaConsumer(ws.io);

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
